from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.endpoints import auth, dns, devices, threats, system
from app.core.dns_server import run_dns_background

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

@app.on_event("startup")
async def startup_event():
    run_dns_background()

# Set all CORS enabled origins
if settings.cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.cors_origins],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(dns.router, prefix=f"{settings.API_V1_STR}/dns", tags=["dns"])
app.include_router(devices.router, prefix=f"{settings.API_V1_STR}/devices", tags=["devices"])
app.include_router(threats.router, prefix=f"{settings.API_V1_STR}/threats", tags=["threats"])
app.include_router(system.router, prefix=f"{settings.API_V1_STR}/system", tags=["system"])
from app.api.endpoints import ai
app.include_router(ai.router, prefix=f"{settings.API_V1_STR}/ai", tags=["ai"])

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

# ... (existing code)

# Mount static files
# Check if static directory exists (it will in the Docker container)
static_dir = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(static_dir):
    app.mount("/assets", StaticFiles(directory=os.path.join(static_dir, "assets")), name="assets")

@app.get("/")
async def serve_spa():
    # Serve index.html for the root
    if os.path.exists(os.path.join(static_dir, "index.html")):
        return FileResponse(os.path.join(static_dir, "index.html"))
    return {"message": "Welcome to NIRA-XT Guardian 2 Backend (Frontend not built)", "team": "X-CODERS"}

# Catch-all for SPA routing (must be last)
@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    # If API route, let it 404 naturally (FastAPI handles this if defined before)
    # But since this is a catch-all, we need to be careful.
    # Actually, FastAPI matches specific routes first.
    # So if it's not an API route, serve index.html
    if full_path.startswith("api"):
        raise HTTPException(status_code=404, detail="Not Found")
    
    if os.path.exists(os.path.join(static_dir, "index.html")):
        return FileResponse(os.path.join(static_dir, "index.html"))
    return {"message": "Not Found"}
