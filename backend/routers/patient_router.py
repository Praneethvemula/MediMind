from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, database, auth

router = APIRouter(prefix="/patients", tags=["patients"])

@router.post("/symptoms", response_model=schemas.SymptomResponse)
def add_symptom(
    symptom: schemas.SymptomCreate,
    current_user: models.User = Depends(auth.get_current_patient),
    db: Session = Depends(database.get_db)
):
    patient = current_user.patient_profile
    if not patient:
        raise HTTPException(status_code=404, detail="Patient profile not found")
        
    db_symptom = models.Symptom(**symptom.model_dump(), patient_id=patient.id)
    db.add(db_symptom)
    db.commit()
    db.refresh(db_symptom)
    return db_symptom

@router.post("/reports")
def upload_report(
    report: schemas.ReportCreate,
    current_user: models.User = Depends(auth.get_current_patient),
    db: Session = Depends(database.get_db)
):
    patient = current_user.patient_profile
    if not patient:
        raise HTTPException(status_code=404, detail="Patient profile not found")
        
    db_report = models.Report(**report.model_dump(), patient_id=patient.id)
    db.add(db_report)
    db.commit()
    return {"message": "Report uploaded successfully"}

@router.post("/metrics")
def track_metric(
    metric: schemas.HealthMetricCreate,
    current_user: models.User = Depends(auth.get_current_patient),
    db: Session = Depends(database.get_db)
):
    patient = current_user.patient_profile
    if not patient:
        raise HTTPException(status_code=404, detail="Patient profile not found")
        
    db_metric = models.HealthMetric(**metric.model_dump(), patient_id=patient.id)
    db.add(db_metric)
    db.commit()
    return {"message": "Metric recorded"}

@router.get("/recommendations")
def get_recommendations(
    current_user: models.User = Depends(auth.get_current_patient),
    db: Session = Depends(database.get_db)
):
    # Mock AI response based on history for now
    return {"recommendation": "Stay hydrated and get 8 hours of sleep based on your recent activity."}
