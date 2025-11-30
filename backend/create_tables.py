from app.core.database import engine, Base
from app.models.dns_log import DNSLog
from app.models.device import Device
from app.models.domain_reputation import DomainReputation
import os

print(f"Creating tables in {os.path.abspath('sql_app.db')}...")
Base.metadata.create_all(bind=engine)
print("Tables created successfully.")
