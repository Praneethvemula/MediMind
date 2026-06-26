from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
import models, schemas
from database import engine, get_db
from fastapi.middleware.cors import CORSMiddleware
from routers import chat_router, patient_router, doctor_router

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="MediMind AI API", description="The Healthcare Assistant That Never Forgets")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update this in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router.router)
app.include_router(patient_router.router)
app.include_router(doctor_router.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to MediMind AI API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
