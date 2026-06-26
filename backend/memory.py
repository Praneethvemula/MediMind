import chromadb
from langchain_openai import OpenAIEmbeddings
import os

# Initialize ChromaDB client (local persistent storage)
# We store the DB inside a 'chroma_db' folder in the backend
CHROMA_DB_DIR = os.path.join(os.path.dirname(__file__), "chroma_db")
chroma_client = chromadb.PersistentClient(path=CHROMA_DB_DIR)

# Get or create a collection for patient memory
collection_name = "patient_medical_memory"
memory_collection = chroma_client.get_or_create_collection(name=collection_name)

def get_embeddings():
    return OpenAIEmbeddings(
        api_key=os.getenv("OPENAI_API_KEY", "dummy-key-replace-me")
    )

def add_memory(patient_id: int, text: str, metadata: dict = None):
    """
    Adds a new piece of memory to the vector database for a specific patient.
    """
    if metadata is None:
        metadata = {}
    
    metadata["patient_id"] = patient_id
    
    try:
        embeddings_model = get_embeddings()
        embedding = embeddings_model.embed_query(text)
    except Exception as e:
        print(f"Memory Embed Error: {e}")
        # Use a dummy embedding (1536 zeros for text-embedding-ada-002) if OpenAI fails
        embedding = [0.0] * 1536
    
    # We use a simple UUID or a combination for the ID
    import uuid
    doc_id = str(uuid.uuid4())
    
    memory_collection.add(
        ids=[doc_id],
        embeddings=[embedding],
        metadatas=[metadata],
        documents=[text]
    )
    return doc_id

def retrieve_memory(patient_id: int, query: str, n_results: int = 5) -> str:
    """
    Retrieves the most relevant memory snippets for a specific patient based on the query.
    Returns them as a formatted string context.
    """
    try:
        embeddings_model = get_embeddings()
        query_embedding = embeddings_model.embed_query(query)
    except Exception as e:
        print(f"Memory Retrieve Error: {e}")
        return "No relevant past medical history found (Offline Mode)."
        
    results = memory_collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results,
        where={"patient_id": patient_id}
    )
    
    if not results["documents"] or not results["documents"][0]:
        return "No relevant past medical history found."
    
    # Combine the retrieved documents into a single context string
    context_parts = []
    for doc, meta in zip(results["documents"][0], results["metadatas"][0]):
        # You can include meta info if needed, e.g. date
        context_parts.append(f"- {doc}")
        
    return "\n".join(context_parts)
