from collections import deque
from typing import List, Set, Dict
import time

class DNSState:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DNSState, cls).__new__(cls)
            cls._instance.query_log = deque(maxlen=100)  # Keep last 100 queries
            cls._instance.blocklist = {
                "malware.badsite.xyz",
                "phishing.scam.net",
                "doubleclick.net",
                "ads.google.com"
            }
            cls._instance.stats = {
                "total": 0,
                "blocked": 0,
                "allowed": 0
            }
        return cls._instance

    def add_query(self, domain: str, type: str, status: str, device: str = "Local Device"):
        query = {
            "id": f"query-{int(time.time()*1000)}",
            "timestamp": time.strftime("%H:%M:%S"),
            "domain": domain,
            "type": type,
            "device": device,
            "status": status,
            "responseTime": 0  # Placeholder for now
        }
        self.query_log.appendleft(query)
        
        self.stats["total"] += 1
        if status == "blocked":
            self.stats["blocked"] += 1
        else:
            self.stats["allowed"] += 1

    def is_blocked(self, domain: str) -> bool:
        # Simple suffix match for now
        domain = domain.lower().rstrip('.')
        for blocked in self.blocklist:
            if domain == blocked or domain.endswith("." + blocked):
                return True
        return False

    def get_logs(self) -> List[Dict]:
        return list(self.query_log)

dns_state = DNSState()
