from fastapi import APIRouter, Depends, Request, HTTPException
from typing import List
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.firebase_auth import verify_token
from app.models.device import Device
from app.models.dns_log import DNSLog

router = APIRouter()

class DeviceCreate(BaseModel):
    name: str
    ip_address: str = None # Optional, if not provided use request IP

class DeviceResponse(BaseModel):
    id: int
    name: str
    ip_address: str
    status: str
    queries: int

    class Config:
        from_attributes = True

@router.post("/link", response_model=DeviceResponse)
def link_device(
    device_in: DeviceCreate,
    request: Request,
    db: Session = Depends(get_db),
    current_user: dict = Depends(verify_token)
):
    """
    Link a device (IP address) to the current user.
    """
    user_id = current_user["uid"]
    ip = device_in.ip_address or request.client.host
    
    # Check if IP is already linked
    existing = db.query(Device).filter(Device.ip_address == ip).first()
    if existing:
        if existing.user_id == user_id:
            return {
                "id": existing.id,
                "name": existing.name,
                "ip_address": existing.ip_address,
                "status": "active",
                "queries": 0 # TODO: Count real queries
            }
        else:
            raise HTTPException(status_code=400, detail="IP address already linked to another account.")

    new_device = Device(
        user_id=user_id,
        ip_address=ip,
        name=device_in.name
    )
    db.add(new_device)
    db.commit()
    db.refresh(new_device)
    
    return {
        "id": new_device.id,
        "name": new_device.name,
        "ip_address": new_device.ip_address,
        "status": "active",
        "queries": 0
    }

@router.get("/check")
def check_device_status(
    request: Request,
    db: Session = Depends(get_db),
    current_user: dict = Depends(verify_token)
):
    """
    Check if the current request IP is linked to the user.
    """
    user_id = current_user["uid"]
    ip = request.client.host
    
    device = db.query(Device).filter(Device.ip_address == ip).first()
    
    if device and device.user_id == user_id:
        return {"linked": True, "device": {"id": device.id, "name": device.name, "ip": device.ip_address}}
    elif device:
        return {"linked": False, "error": "IP linked to another account", "ip": ip}
    else:
        return {"linked": False, "ip": ip}

@router.get("", response_model=List[DeviceResponse])
def get_devices(
    db: Session = Depends(get_db),
    current_user: dict = Depends(verify_token)
):
    """
    Get list of connected devices for current user.
    """
    user_id = current_user["uid"]
    devices = db.query(Device).filter(Device.user_id == user_id).all()
    
    results = []
    for d in devices:
        # Count queries for this device IP
        count = db.query(DNSLog).filter(DNSLog.client_ip == d.ip_address).count()
        results.append({
            "id": d.id,
            "name": d.name,
            "ip_address": d.ip_address,
            "status": "active",
            "queries": count
        })
        
    return results
