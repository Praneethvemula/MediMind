FROM python:3.10-slim

WORKDIR /app

# Install system dependencies for psycopg2 and other packages
RUN apt-get update && apt-get install -y \
    libpq-dev gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt || true
# Alternatively, since we didn't create requirements.txt with all dependencies explicitly:
RUN pip install fastapi uvicorn sqlalchemy psycopg2-binary "pydantic[email]" python-jose[cryptography] passlib[bcrypt] python-multipart langchain langchain-openai chromadb sentence-transformers pypdf python-dotenv

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
