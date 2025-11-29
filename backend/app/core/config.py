from pydantic_settings import BaseSettings
from typing import List, Union

class Settings(BaseSettings):
    PROJECT_NAME: str = "NIRA-XT Guardian 2"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "YOUR_SUPER_SECRET_KEY_CHANGE_IN_PRODUCTION_FOR_HACKATHON_DEMO_ONLY"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # CORS
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = []

    @property
    def cors_origins(self) -> List[str]:
        if self.BACKEND_CORS_ORIGINS:
            return self.BACKEND_CORS_ORIGINS
        return [
            "http://localhost:5173",
            "http://localhost:3000",
            "http://127.0.0.1:5173",
        ]

    class Config:
        case_sensitive = True

settings = Settings()
