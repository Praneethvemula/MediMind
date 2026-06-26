# MediMind AI – The Healthcare Assistant That Never Forgets

MediMind AI is a comprehensive, production-ready AI healthcare platform built for scale. It features a sophisticated Multi-Agent Cascade Flow architecture and a persistent memory layer (RAG) that allows the AI to remember patient medical history, symptoms, and previous interactions.

## Key Features
- **Multi-Agent Cascade Flow**: specialized AI agents (Reminder, Medication, Symptom Analyst, Report Analyst, Health Coach) route and handle specific healthcare queries.
- **Vector Database Memory (RAG)**: Integrates ChromaDB/Pinecone to securely store and retrieve patient conversations and medical context, ensuring a continuous care experience across multiple visits.
- **Role-Based Portals**: Distinct Next.js Dashboards for Patients, Doctors, and Admins.
- **Modern Aesthetics**: Built with Next.js, Tailwind CSS, and Shadcn UI, featuring glassmorphism and modern medical design themes.

## Tech Stack
- **Backend**: FastAPI (Python), SQLAlchemy, PostgreSQL, LangChain, OpenAI.
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Shadcn UI, Zustand.
- **Infrastructure**: Docker, Docker Compose.

## Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
- Python 3.10+
- Docker & Docker Compose
- OpenAI API Key

### Setup
1. Clone the repository and add your `.env` variables to both `frontend` and `backend`.
2. To run the full stack:
```bash
docker-compose up -d --build
```
3. Alternatively, for local manual execution:
   - Backend: `cd backend && uvicorn main:app --reload`
   - Frontend: `cd frontend && npm run dev`

## Agent Architecture
1. **Agent 1 (Small Model)**: Reminder & Scheduling.
2. **Agent 2 (Medium Model)**: Medication Interactions & Guidance.
3. **Agent 3 (Large Model)**: Advanced Symptom Analysis & Risk Assessment.
4. **Agent 4**: Report Summarization (PDF/Image parsing).
5. **Agent 5**: Long-term Health Coaching & Analytics.

*Note: This platform provides AI-assisted insights and should not replace professional medical diagnosis in an emergency.*
