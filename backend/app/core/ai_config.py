from pydantic_settings import BaseSettings

class AISettings(BaseSettings):
    GOOGLE_API_KEY: str
    MODEL_NAME: str = "gemini-flash-latest"

    class Config:
        env_file = ".env"

ai_settings = AISettings()
