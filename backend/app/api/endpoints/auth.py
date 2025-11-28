from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.core import security
from app.core.config import settings
from app.models.user import Token

router = APIRouter()

@router.post("/login/access-token", response_model=Token)
def login_access_token(form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    # MOCK AUTHENTICATION FOR DEMO
    # In a real app, verify against DB
    if form_data.username != "admin@example.com" or form_data.password != "admin":
         raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            subject=1, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }
