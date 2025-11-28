from fastapi import APIRouter

router = APIRouter()

@router.post("/scan")
def run_scan():
    """
    Trigger a system scan.
    """
    return {"status": "scanning", "message": "System scan initiated"}

@router.get("/status")
def get_system_status():
    """
    Get overall system status.
    """
    return {"status": "protected", "uptime": "4d 12h 30m"}
