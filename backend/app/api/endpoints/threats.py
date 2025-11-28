from fastapi import APIRouter
from typing import Dict
from pydantic import BaseModel

router = APIRouter()

class Stats(BaseModel):
    total_queries: str
    threats_blocked: str
    domains_blocked: str
    avg_response_time: str

@router.get("/stats", response_model=Stats)
def get_stats():
    """
    Get dashboard statistics.
    """
    return {
        "total_queries": "48,392",
        "threats_blocked": "1,247",
        "domains_blocked": "892",
        "avg_response_time": "12ms"
    }
