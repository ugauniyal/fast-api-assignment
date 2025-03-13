from sqlalchemy.orm import Session
from db import models, schema
from core.security import hash_password

def create_user(db: Session, user: schema.UserCreate):
    hashed_password = hash_password(user.password)
    db_user = models.User(email=user.email, name=user.name, phone_number=user.phone_number, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user