import socket
import threading
import dns.message
import dns.query
import dns.rdatatype
from app.core.dns_state import dns_state

UPSTREAM_DNS = "8.8.8.8"

def handle_query(data, addr, sock):
    try:
        request = dns.message.from_wire(data)
        qname = request.question[0].name.to_text()
        qtype = dns.rdatatype.to_text(request.question[0].rdtype)
        
        # Check blocklist
        if dns_state.is_blocked(qname):
            print(f"🚫 Blocked: {qname}")
            dns_state.add_query(qname, qtype, "blocked")
            
            # Create blocked response (NXDOMAIN or Refused)
            response = dns.message.make_response(request)
            response.set_rcode(dns.rcode.NXDOMAIN)
            sock.sendto(response.to_wire(), addr)
            return

        # Forward to upstream
        # print(f"Forwarding: {qname}")
        try:
            upstream_response = dns.query.udp(request, UPSTREAM_DNS, timeout=2)
            dns_state.add_query(qname, qtype, "allowed")
            sock.sendto(upstream_response.to_wire(), addr)
        except Exception as e:
            print(f"Upstream error: {e}")
            
    except Exception as e:
        print(f"DNS Error: {e}")

def start_dns_server(port=53):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.bind(("0.0.0.0", port))
        print(f"✅ DNS Server started on port {port}")
        
        while True:
            data, addr = sock.recvfrom(512)
            threading.Thread(target=handle_query, args=(data, addr, sock)).start()
            
    except PermissionError:
        print(f"❌ Permission denied for port {port}. Trying 5353...")
        start_dns_server(5353)
    except Exception as e:
        print(f"❌ Failed to start DNS server: {e}")

def run_dns_background():
    threading.Thread(target=start_dns_server, daemon=True).start()
