from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Float, Text, Enum
from sqlalchemy.orm import relationship
from database import Base
import enum
from datetime import datetime, timezone

class RoleEnum(str, enum.Enum):
    PATIENT = "patient"
    DOCTOR = "doctor"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.PATIENT)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    patient_profile = relationship("Patient", back_populates="user", uselist=False)
    doctor_profile = relationship("Doctor", back_populates="user", uselist=False)

class Patient(Base):
    __tablename__ = "patients"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    first_name = Column(String)
    last_name = Column(String)
    age = Column(Integer)
    gender = Column(String)
    blood_group = Column(String)
    height = Column(Float)
    weight = Column(Float)
    
    user = relationship("User", back_populates="patient_profile")
    appointments = relationship("Appointment", back_populates="patient")
    symptoms = relationship("Symptom", back_populates="patient")
    reports = relationship("Report", back_populates="patient")
    medical_history = relationship("MedicalHistory", back_populates="patient")
    allergies = relationship("Allergy", back_populates="patient")
    medications = relationship("Medication", back_populates="patient")
    health_metrics = relationship("HealthMetric", back_populates="patient")
    reminders = relationship("Reminder", back_populates="patient")
    conversations = relationship("Conversation", back_populates="patient")
    emergency_contacts = relationship("EmergencyContact", back_populates="patient")

class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    first_name = Column(String)
    last_name = Column(String)
    specialization = Column(String)
    experience_years = Column(Integer)
    
    user = relationship("User", back_populates="doctor_profile")
    appointments = relationship("Appointment", back_populates="doctor")

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    appointment_date = Column(DateTime)
    status = Column(String, default="scheduled")
    notes = Column(Text)
    
    patient = relationship("Patient", back_populates="appointments")
    doctor = relationship("Doctor", back_populates="appointments")

class Symptom(Base):
    __tablename__ = "symptoms"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    description = Column(Text)
    severity = Column(String)
    recorded_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    patient = relationship("Patient", back_populates="symptoms")

class Report(Base):
    __tablename__ = "reports"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    file_url = Column(String)
    report_type = Column(String)
    summary = Column(Text)
    uploaded_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    patient = relationship("Patient", back_populates="reports")

class MedicalHistory(Base):
    __tablename__ = "medical_history"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    condition_name = Column(String)
    diagnosed_date = Column(DateTime)
    notes = Column(Text)
    
    patient = relationship("Patient", back_populates="medical_history")

class Allergy(Base):
    __tablename__ = "allergies"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    allergen = Column(String)
    severity = Column(String)
    
    patient = relationship("Patient", back_populates="allergies")

class Medication(Base):
    __tablename__ = "medications"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    name = Column(String)
    dosage = Column(String)
    frequency = Column(String)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    is_active = Column(Boolean, default=True)
    
    patient = relationship("Patient", back_populates="medications")

class HealthMetric(Base):
    __tablename__ = "health_metrics"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    metric_type = Column(String) # water_intake, sleep, exercise, weight
    value = Column(Float)
    unit = Column(String)
    recorded_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    patient = relationship("Patient", back_populates="health_metrics")

class Reminder(Base):
    __tablename__ = "reminders"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    title = Column(String)
    description = Column(Text)
    reminder_time = Column(DateTime)
    is_completed = Column(Boolean, default=False)
    
    patient = relationship("Patient", back_populates="reminders")

class Conversation(Base):
    __tablename__ = "conversations"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    role = Column(String) # user or ai
    content = Column(Text)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    patient = relationship("Patient", back_populates="conversations")

class EmergencyContact(Base):
    __tablename__ = "emergency_contacts"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    name = Column(String)
    relationship_type = Column(String)
    phone_number = Column(String)
    
    patient = relationship("Patient", back_populates="emergency_contacts")
