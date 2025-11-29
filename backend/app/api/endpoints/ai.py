from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
from app.core.ai_service import ai_service
from app.core.dns_state import dns_state

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Dict]] = []

class DomainRequest(BaseModel):
    domain: str

@router.post("/chat")
async def chat_with_ai(request: ChatRequest):
    """
    Chat with the NIRA-XT AI Assistant.
    """
    response = ai_service.get_chat_response(request.message, request.history)
    return {"response": response}

@router.post("/analyze-domain")
async def analyze_domain(request: DomainRequest):
    """
    Analyze a specific domain for threats.
    """
    analysis = ai_service.analyze_domain(request.domain)
    return analysis

@router.get("/insights")
async def get_insights():
    """
    Get AI-generated insights based on recent DNS logs.
    """
    logs = list(dns_state.query_log)
    insights = ai_service.generate_insights(logs)
    return {"insights": insights}
