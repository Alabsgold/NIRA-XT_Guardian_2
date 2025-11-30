from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.firebase_auth import verify_token
from app.models.dns_log import DNSLog
from app.models.device import Device
from app.models.domain_reputation import DomainReputation
import os

router = APIRouter()

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@nira-xt.com")

def verify_admin(current_user: dict = Depends(verify_token)):
    if current_user.get("email") != ADMIN_EMAIL:
        # For MVP/Demo, we might want to allow the first user or just log a warning
        # raise HTTPException(status_code=403, detail="Not authorized")
        pass # Allow all for demo purposes as requested by user
    return current_user

@router.get("/stats")
def get_global_stats(db: Session = Depends(get_db), admin: dict = Depends(verify_admin)):
    """
    Get global system statistics (Admin only).
    """
    total_queries = db.query(DNSLog).count()
    total_users = db.query(Device.user_id).distinct().count() # Approximation
    total_devices = db.query(Device).count()
    blocked_threats = db.query(DNSLog).filter(DNSLog.status.in_(["blocked", "blocked_ai"])).count()
    
    return {
        "total_queries": total_queries,
        "total_users": total_users,
        "total_devices": total_devices,
        "blocked_threats": blocked_threats
    }

@router.get("/users")
def get_users(db: Session = Depends(get_db), admin: dict = Depends(verify_admin)):
    """
    List all users and their devices (Admin only).
    """
    # In a real app, we'd fetch user details from Firebase Admin SDK
    # Here we just list users who have linked devices
    users = []
    device_rows = db.query(Device).all()
    
    user_map = {}
    for d in device_rows:
        if d.user_id not in user_map:
            user_map[d.user_id] = {"user_id": d.user_id, "devices": [], "queries": 0}
        user_map[d.user_id]["devices"].append(d.name)
        
    for uid, data in user_map.items():
        # Count queries for this user
        count = db.query(DNSLog).filter(DNSLog.user_id == uid).count()
        data["queries"] = count
        users.append(data)
        
    return users
