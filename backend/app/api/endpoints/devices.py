from fastapi import APIRouter
from typing import List
from pydantic import BaseModel

router = APIRouter()

class Device(BaseModel):
    name: str
    status: str
    queries: int

@router.get("", response_model=List[Device])
def get_devices():
    """
    Get list of connected devices.
    """
    return [
        {"name": "MacBook Pro", "status": "active", "queries": 2340},
        {"name": "iPhone 14 Pro", "status": "active", "queries": 1876},
        {"name": "iPad Air", "status": "active", "queries": 654},
        {"name": "Smart TV", "status": "muted", "queries": 234},
        {"name": "Gaming PC", "status": "warning", "queries": 3421},
    ]
