from sqlalchemy import Column, String
from db.database import Base

class User(Base):
    __tablename__ = "users"
    email = Column(String, primary_key=True, index=True)
    name = Column(String)
    phone_number = Column(String)
    password = Column(String)