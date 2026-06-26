from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, database, auth
from agents import get_llm
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

router = APIRouter(prefix="/doctors", tags=["doctors"])

@router.get("/patients")
def get_patients(
    current_user: models.User = Depends(auth.get_current_doctor),
    db: Session = Depends(database.get_db)
):
    # In a real app, you'd filter by doctor_id. For the mockup, return all patients.
    patients = db.query(models.Patient).all()
    return patients

@router.get("/patients/{patient_id}/history")
def get_patient_history(
    patient_id: int,
    current_user: models.User = Depends(auth.get_current_doctor),
    db: Session = Depends(database.get_db)
):
    patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
        
    return {
        "symptoms": patient.symptoms,
        "reports": patient.reports,
        "metrics": patient.health_metrics
    }

@router.get("/patients/{patient_id}/ai-summary")
def get_ai_summary(
    patient_id: int,
    current_user: models.User = Depends(auth.get_current_doctor),
    db: Session = Depends(database.get_db)
):
    patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
        
    # Gather context
    symptoms = [s.description for s in patient.symptoms]
    
    template = """You are a medical AI assistant.
Summarize the following patient symptoms into a brief clinical note for the doctor.
Symptoms: {symptoms}
Clinical Summary:"""
    
    llm = get_llm("gpt-4o-mini")
    prompt = PromptTemplate.from_template(template)
    chain = prompt | llm | StrOutputParser()
    
    summary = chain.invoke({"symptoms": ", ".join(symptoms) if symptoms else "No symptoms recorded."})
    return {"ai_summary": summary}

@router.post("/patients/{patient_id}/prescriptions")
def add_prescription(
    patient_id: int,
    medication: schemas.MedicationCreate,
    current_user: models.User = Depends(auth.get_current_doctor),
    db: Session = Depends(database.get_db)
):
    db_med = models.Medication(**medication.model_dump(), patient_id=patient_id)
    db.add(db_med)
    db.commit()
    return {"message": "Prescription added"}
