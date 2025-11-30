from fastapi import APIRouter, WebSocket, Depends
from typing import List, Dict
import asyncio
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.database import get_db, SessionLocal
from app.models.dns_log import DNSLog

router = APIRouter()

class DNSQuery(BaseModel):
    id: str
    timestamp: str
    domain: str
    type: str
    device: str
    status: str
    responseTime: int

    class Config:
        from_attributes = True

from app.core.firebase_auth import verify_token

@router.get("/live", response_model=List[DNSQuery])
def get_live_dns_queries(db: Session = Depends(get_db), current_user: dict = Depends(verify_token)):
    """
    Get a snapshot of recent DNS queries for the current user.
    """
    user_id = current_user["uid"]
    logs = db.query(DNSLog).filter(DNSLog.user_id == user_id).order_by(DNSLog.timestamp.desc()).limit(50).all()
    
    return [
        DNSQuery(
            id=str(log.id),
            timestamp=log.timestamp, # Already string in new model
            domain=log.domain,
            type=log.type, # Changed from query_type
            device=log.client_ip,
            status=log.status,
            responseTime=log.response_time
        ) for log in logs
    ]

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    last_id = 0
    try:
        while True:
            # Create a new session for each poll
            db = SessionLocal()
            try:
                # Fetch latest log that is newer than what we last saw
                latest_log = db.query(DNSLog).order_by(DNSLog.id.desc()).first()
                
                if latest_log and latest_log.id > last_id:
                    last_id = latest_log.id
                    query_data = DNSQuery(
                        id=str(latest_log.id),
                        timestamp=latest_log.timestamp.strftime("%H:%M:%S"),
                        domain=latest_log.domain,
                        type=latest_log.query_type,
                        device=latest_log.client_ip,
                        status=latest_log.status,
                        responseTime=latest_log.response_time_ms
                    )
                    await websocket.send_json(query_data.dict())
            finally:
                db.close()
                
            await asyncio.sleep(1) # Poll every 1 second
    except Exception:
        pass
