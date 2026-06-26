from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    role: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class PatientBase(BaseModel):
    first_name: str
    last_name: str
    age: int
    gender: str
    blood_group: str
    height: float
    weight: float

class PatientCreate(PatientBase):
    pass

class PatientResponse(PatientBase):
    id: int
    user_id: int
    
    class Config:
        from_attributes = True

class SymptomCreate(BaseModel):
    description: str
    severity: str

class SymptomResponse(SymptomCreate):
    id: int
    patient_id: int
    recorded_at: datetime

    class Config:
        from_attributes = True

class ConversationCreate(BaseModel):
    role: str
    content: str

class ConversationResponse(ConversationCreate):
    id: int
    patient_id: int
    timestamp: datetime

    class Config:
        from_attributes = True

class DoctorBase(BaseModel):
    first_name: str
    last_name: str
    specialization: str
    experience_years: int

class DoctorResponse(DoctorBase):
    id: int
    user_id: int
    
    class Config:
        from_attributes = True

class HealthMetricCreate(BaseModel):
    metric_type: str
    value: float
    unit: str

class ReportCreate(BaseModel):
    file_url: str
    report_type: str
    summary: str

class MedicationCreate(BaseModel):
    name: str
    dosage: str
    frequency: str
    start_date: datetime
