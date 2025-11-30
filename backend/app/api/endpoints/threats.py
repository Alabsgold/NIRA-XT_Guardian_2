from fastapi import APIRouter, Depends
from typing import Dict
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.dns_log import DNSLog

router = APIRouter()

class Stats(BaseModel):
    total_queries: str
    threats_blocked: str
    domains_blocked: str
    avg_response_time: str

from app.core.firebase_auth import verify_token

@router.get("/stats", response_model=Stats)
def get_stats(db: Session = Depends(get_db), current_user: dict = Depends(verify_token)):
    """
    Get dashboard statistics for the current user.
    """
    user_id = current_user["uid"]
    
    total = db.query(DNSLog).filter(DNSLog.user_id == user_id).count()
    blocked = db.query(DNSLog).filter(DNSLog.user_id == user_id, DNSLog.status.in_(["blocked", "blocked_ai"])).count()
    
    # Calculate average response time
    avg_time = 0
    times = db.query(DNSLog.response_time_ms).filter(DNSLog.user_id == user_id).all()
    if times:
        avg_time = sum([t[0] for t in times]) // len(times)

    return {
        "total_queries": f"{total:,}",
        "threats_blocked": f"{blocked:,}",
        "domains_blocked": f"{blocked:,}", 
        "avg_response_time": f"{avg_time}ms"
    }
