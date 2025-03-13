from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.schema import EmailRequest
from db.database import get_db
from services.email_service import send_email
from db.models import User

router = APIRouter(prefix="/email", tags=["Email"])



@router.post("/send/{email}")
def send_email_to_user(email: str, request: EmailRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).scalar()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    try:
        send_email(email, request.subject, request.content)
        return {"message": "Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
