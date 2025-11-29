import google.generativeai as genai
from app.core.ai_config import ai_settings
from typing import List, Dict

class AIService:
    def __init__(self):
        genai.configure(api_key=ai_settings.GOOGLE_API_KEY)
        self.model = genai.GenerativeModel(ai_settings.MODEL_NAME)
        self.chat_session = None

    def get_chat_response(self, message: str, history: List[Dict] = []) -> str:
        """
        Get a response from the AI Assistant.
        """
        # Simple stateless chat for now, or use history if provided
        # For a "Parental Control Expert" persona
        system_prompt = """
        You are NIRA-XT Guardian, an expert AI assistant for a parental control and DNS filtering system.
        Your goal is to help parents and network admins understand threats, configure devices, and interpret logs.
        Be helpful, concise, and security-focused.
        """
        
        full_prompt = f"{system_prompt}\n\nUser: {message}"
        
        try:
            response = self.model.generate_content(full_prompt)
            return response.text
        except Exception as e:
            return f"I'm sorry, I encountered an error connecting to my brain: {str(e)}"

    def analyze_domain(self, domain: str) -> Dict:
        """
        Analyze a domain for potential threats.
        """
        prompt = f"""
        Analyze the domain '{domain}' for potential security threats.
        Consider: Phishing, Malware, Cybersquatting, DGA, Adult Content.
        Return a JSON response with:
        - risk_score (0-100)
        - category (e.g., Safe, Phishing, Malware)
        - reason (Short explanation)
        """
        try:
            response = self.model.generate_content(prompt)
            # In a real app, we'd parse JSON strictly. For now, return text.
            return {"analysis": response.text}
        except Exception as e:
            return {"error": str(e)}

    def generate_insights(self, logs: List[Dict]) -> str:
        """
        Generate insights from a list of DNS logs.
        """
        if not logs:
            return "No logs available to analyze."

        log_summary = str(logs[:50]) # Limit to 50 for token limits
        prompt = f"""
        Analyze these DNS query logs and provide 3 key insights for a parent or admin.
        Focus on: Unusual activity, most blocked categories, and potential security risks.
        Logs: {log_summary}
        """
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Error generating insights: {str(e)}"

ai_service = AIService()
