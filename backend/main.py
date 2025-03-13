from contextlib import asynccontextmanager
from fastapi import FastAPI
from api.routes import auth_routes, user_routes, email_routes
from db.database import engine, Base, get_db
from sqlalchemy.orm import Session
from sqlalchemy.sql import text

from fastapi.middleware.cors import CORSMiddleware



Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        db: Session = next(get_db())
        db.execute(text("SELECT 1"))
        print("✅ Database connection successful!")
        db.close()
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
    yield

app = FastAPI(title="User Management API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

app.get("/")(lambda: "Hello, World!")

app.include_router(auth_routes.router)
app.include_router(user_routes.router)
app.include_router(email_routes.router)