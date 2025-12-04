import asyncio
import logging
import socket
import threading
import time
from datetime import datetime

import dns.message
import dns.query
import dns.rdatatype

from app.core.cache import reputation_cache
from app.core.config import settings
from app.core.database import SessionLocal
from app.core.dns_state import dns_state
from app.models.dns_log import DNSLog
from app.models.domain_reputation import DomainReputation

logger = logging.getLogger(__name__)

# Simple per-IP rate limiter (queries per second)
_rate_window: dict[str, list[float]] = {}

def handle_query(data, addr, sock):
    start_time = time.time()
    try:
        request = dns.message.from_wire(data)
        qname = request.question[0].name.to_text()
        qtype = dns.rdatatype.to_text(request.question[0].rdtype)
        
        # Resolve User from IP
        user_id = None
        try:
            db = SessionLocal()
            from app.models.device import Device
            device = db.query(Device).filter(Device.ip_address == addr[0]).first()
            if device:
                user_id = device.user_id
                print(f"Query from User: {user_id} ({addr[0]})")
            db.close()
        except Exception as e:
            print(f"User resolution failed: {e}")

        # Rate limiting
        now = time.time()
        timestamps = _rate_window.get(addr[0], [])
        timestamps = [t for t in timestamps if now - t < 1]
        if len(timestamps) >= settings.DNS_RATE_LIMIT_PER_SEC:
            logger.warning(f"Rate limit exceeded from {addr[0]}")
            return
        timestamps.append(now)
        _rate_window[addr[0]] = timestamps

        # Check blocklist (Static)
        if dns_state.is_blocked(qname):
            print(f"[BLOCKED STATIC] {qname}")
            # ... (existing blocking logic) ...
            response = dns.message.make_response(request)
            response.set_rcode(dns.rcode.NXDOMAIN)
            sock.sendto(response.to_wire(), addr)
            
            duration = int((time.time() - start_time) * 1000)
            log_query_to_db(qname, qtype, "blocked", addr[0], duration, user_id)
            return

        # Check AI Reputation (Dynamic)
        try:
            cached = reputation_cache.get(qname)
            if cached and int(cached.get("risk_score", 0)) > 70:
                print(f"[BLOCKED AI CACHE] {qname} (Risk: {cached.get('risk_score')})")
                response = dns.message.make_response(request)
                response.set_rcode(dns.rcode.NXDOMAIN)
                sock.sendto(response.to_wire(), addr)
                
                duration = int((time.time() - start_time) * 1000)
                log_query_to_db(qname, qtype, "blocked_ai_cache", addr[0], duration, user_id)
                return

            db = SessionLocal()
            reputation = db.query(DomainReputation).filter(DomainReputation.domain == qname).first()
            if reputation and reputation.risk_score > 70:  # Block if risk > 70
                print(f"[BLOCKED AI] {qname} (Risk: {reputation.risk_score})")
                response = dns.message.make_response(request)
                response.set_rcode(dns.rcode.NXDOMAIN)
                sock.sendto(response.to_wire(), addr)
                
                duration = int((time.time() - start_time) * 1000)
                log_query_to_db(qname, qtype, "blocked_ai", addr[0], duration, user_id)
                db.close()
                return
            db.close()
        except Exception as e:
            logger.warning(f"Reputation check failed: {e}")

        # Forward to upstream
        try:
            upstream_response = dns.query.udp(request, settings.UPSTREAM_DNS, timeout=2)
            sock.sendto(upstream_response.to_wire(), addr)
            
            # Log to DB
            duration = int((time.time() - start_time) * 1000)
            log_query_to_db(qname, qtype, "allowed", addr[0], duration, user_id)
            
            # Trigger Async AI Analysis
            from app.core.ai_service import ai_service
            try:
                loop = asyncio.get_running_loop()
                loop.create_task(ai_service.analyze_domain_async(qname))
            except RuntimeError:
                # Fallback if not in async loop
                threading.Thread(target=ai_service.analyze_domain, args=(qname,), daemon=True).start()
            
        except Exception as e:
            logger.error(f"Upstream error: {e}")
            
    except Exception as e:
        logger.error(f"DNS Error: {e}")

def start_dns_server(port=53):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.bind(("0.0.0.0", port))
        print(f"DNS Server started on port {port}")
        
        while True:
            data, addr = sock.recvfrom(512)
            threading.Thread(target=handle_query, args=(data, addr, sock)).start()
            
    except (PermissionError, OSError) as e:
        if port == 53:
            print(f"Port {port} unavailable ({e}). Trying 5353...")
            start_dns_server(5353)
        else:
            print(f"Failed to start DNS server on port {port}: {e}")
    except Exception as e:
        print(f"Failed to start DNS server: {e}")

def run_dns_background():
    threading.Thread(target=start_dns_server, daemon=True).start()


def log_query_to_db(domain: str, qtype: str, status: str, client_ip: str, response_time: int, user_id: str | None):
    try:
        db = SessionLocal()
        log_entry = DNSLog(
            user_id=user_id,
            timestamp=datetime.utcnow().isoformat(),
            domain=domain,
            type=qtype,
            status=status,
            client_ip=client_ip,
            response_time=response_time,
        )
        db.add(log_entry)
        db.commit()
    except Exception as exc:
        logger.debug(f"Failed to log DNS query: {exc}")
    finally:
        try:
            db.close()
        except Exception:
            pass
