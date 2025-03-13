from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    name: str
    phone_number: str
    password: str

class UserResponse(BaseModel):
    email: EmailStr
    name: str
    phone_number: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None


class LoginSchema(BaseModel):
    email: EmailStr
    password: str

class EmailRequest(BaseModel):
    subject: str
    content: str