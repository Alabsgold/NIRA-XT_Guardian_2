from fastapi import APIRouter
import socket

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

@router.get("/ip")
def get_local_ip():
    """
    Get the local IP address of the server.
    """
    try:
        # Connect to a dummy external address to get the local interface IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        return {"ip": local_ip}
    except Exception:
        return {"ip": "127.0.0.1"}
