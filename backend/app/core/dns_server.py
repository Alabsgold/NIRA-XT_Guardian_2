import socket
import threading
import dns.message
import dns.query
import dns.rdatatype
import time
from app.core.dns_state import dns_state
from app.core.database import SessionLocal, engine, Base
from app.models.dns_log import DNSLog
from app.models.domain_reputation import DomainReputation

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
            db = SessionLocal()
            reputation = db.query(DomainReputation).filter(DomainReputation.domain == qname).first()
            if reputation and reputation.risk_score > 70: # Block if risk > 70
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
            print(f"Reputation check failed: {e}")

        # Forward to upstream
        try:
            upstream_response = dns.query.udp(request, UPSTREAM_DNS, timeout=2)
            sock.sendto(upstream_response.to_wire(), addr)
            
            # Log to DB
            duration = int((time.time() - start_time) * 1000)
            log_query_to_db(qname, qtype, "allowed", addr[0], duration, user_id)
            
            # Trigger Async AI Analysis
            from app.core.ai_service import ai_service
            threading.Thread(target=ai_service.analyze_domain, args=(qname,)).start()
            
        except Exception as e:
            print(f"Upstream error: {e}")
            
    except Exception as e:
        print(f"DNS Error: {e}")

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
