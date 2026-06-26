from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import schemas, models, database, agents, memory

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/", response_model=schemas.ConversationResponse)
def chat_with_ai(chat_req: schemas.ConversationCreate, patient_id: int, db: Session = Depends(database.get_db)):
    # Verify patient exists, create a mock one if missing for easy local testing
    patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
    if not patient:
        print(f"Patient {patient_id} not found, auto-creating a mock patient and user...")
        # Check if user exists
        user = db.query(models.User).filter(models.User.id == 1).first()
        if not user:
            user = models.User(id=1, email="johndoe@example.com", hashed_password="hashed_password", role=models.RoleEnum.PATIENT)
            db.add(user)
            db.commit()
            
        mock_patient = models.Patient(
            id=patient_id,
            first_name="John",
            last_name="Doe",
            age=30,
            gender="Male",
            blood_group="O+",
            height=180.0,
            weight=75.0,
            user_id=1
        )
        db.add(mock_patient)
        try:
            db.commit()
        except Exception:
            db.rollback()
            raise HTTPException(status_code=500, detail="Failed to auto-create mock patient")

    # 1. Save user message to Postgres
    user_msg = models.Conversation(
        patient_id=patient_id,
        role="user",
        content=chat_req.content
    )
    db.add(user_msg)
    db.commit()
    db.refresh(user_msg)
    
    # 2. Retrieve past memory for this patient from ChromaDB
    context = memory.retrieve_memory(patient_id, chat_req.content)
    
    # 3. Route to the appropriate Agent based on input
    ai_response_text = agents.route_to_agent(chat_req.content, context)
    
    # 4. Save AI response to Postgres
    ai_msg = models.Conversation(
        patient_id=patient_id,
        role="ai",
        content=ai_response_text
    )
    db.add(ai_msg)
    db.commit()
    db.refresh(ai_msg)
    
    # 5. Add this new exchange to ChromaDB for future memory
    memory.add_memory(patient_id, f"Patient: {chat_req.content}\nAI: {ai_response_text}")
    
    return ai_msg

@router.get("/{patient_id}", response_model=list[schemas.ConversationResponse])
def get_chat_history(patient_id: int, db: Session = Depends(database.get_db)):
    return db.query(models.Conversation).filter(models.Conversation.patient_id == patient_id).order_by(models.Conversation.timestamp.asc()).all()
