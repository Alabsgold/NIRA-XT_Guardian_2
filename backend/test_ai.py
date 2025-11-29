import google.generativeai as genai
from app.core.ai_config import ai_settings

genai.configure(api_key=ai_settings.GOOGLE_API_KEY)
model = genai.GenerativeModel(ai_settings.MODEL_NAME)

print(f"Testing model: {ai_settings.MODEL_NAME}")
try:
    response = model.generate_content("Hello, are you working?")
    print("Response received:")
    print(response.text)
except Exception as e:
    print(f"Error: {e}")
