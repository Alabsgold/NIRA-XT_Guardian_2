from sqlalchemy import Column, Integer, String, DateTime, Text
from app.core.database import Base
from datetime import datetime

class DomainReputation(Base):
    __tablename__ = "domain_reputation"

    id = Column(Integer, primary_key=True, index=True)
    domain = Column(String, unique=True, index=True)
    risk_score = Column(Integer) # 0-100
    category = Column(String) # Safe, Phishing, Malware, Adult, etc.
    analysis_summary = Column(Text)
    last_analyzed = Column(DateTime, default=datetime.utcnow)
