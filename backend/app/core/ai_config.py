from pydantic_settings import BaseSettings

class AISettings(BaseSettings):
    GOOGLE_API_KEY: str = "AIzaSyDW0vV8RJ3UVkutqN9XMyxGBNG5_puXynY"
    MODEL_NAME: str = "gemini-flash-latest"

    class Config:
        env_file = ".env"

ai_settings = AISettings()
