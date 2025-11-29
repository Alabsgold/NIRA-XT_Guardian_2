import google.generativeai as genai
from app.core.ai_config import ai_settings

genai.configure(api_key=ai_settings.GOOGLE_API_KEY)

print("Listing available models...")
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)
except Exception as e:
    print(f"Error: {e}")
