from sqlalchemy import Column, Integer, String, DateTime
from app.core.database import Base
from sqlalchemy import Column, Integer, String, DateTime
from app.core.database import Base

class DNSLog(Base):
    __tablename__ = "dns_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=True) # Link to Firebase UID
    timestamp = Column(String)
    domain = Column(String, index=True)
    type = Column(String)
    status = Column(String)
    client_ip = Column(String)
    response_time = Column(Integer)
