from fastapi import APIRouter, WebSocket
from typing import List, Dict
import random
import time
import asyncio
from pydantic import BaseModel

router = APIRouter()

class DNSQuery(BaseModel):
    id: str
    timestamp: str
    domain: str
    type: str
    device: str
    status: str
    responseTime: int

@router.get("/live", response_model=List[DNSQuery])
def get_live_dns_queries():
    """
    Get a snapshot of recent DNS queries.
    """
    # Simulate fetching from a database or in-memory cache
    return generate_mock_queries(10)

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Simulate live streaming data
            data = generate_mock_queries(1)[0]
            await websocket.send_json(data.dict())
            await asyncio.sleep(2) # Send every 2 seconds
    except Exception:
        pass

# Helper to generate mock data (moving logic from frontend to backend)
def generate_mock_queries(count: int) -> List[DNSQuery]:
    domains = [
        "api.github.com", "cdn.cloudflare.com", "analytics.google.com",
        "ads.doubleclick.net", "tracker.fb.com", "api.stripe.com",
        "fonts.googleapis.com", "malware.badsite.xyz", "phishing.scam.net",
        "cdn.jsdelivr.net"
    ]
    devices = ["MacBook Pro", "iPhone 14", "iPad Air", "Smart TV", "Gaming PC"]
    types = ["A", "AAAA", "CNAME", "MX", "TXT"]
    
    results = []
    for i in range(count):
        domain = random.choice(domains)
        is_malicious = any(x in domain for x in ["malware", "phishing", "tracker", "ads"])
        
        query = DNSQuery(
            id=f"query-{random.randint(1000, 9999)}-{int(time.time())}",
            timestamp=time.strftime("%H:%M:%S"),
            domain=domain,
            type=random.choice(types),
            device=random.choice(devices),
            status="blocked" if is_malicious else ("allowed" if random.random() > 0.3 else "cached"),
            responseTime=random.randint(5, 55)
        )
        results.append(query)
    return results
