import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Initialize LLMs for different agents
def get_llm(model_name="gpt-4o-mini"):
    return ChatOpenAI(
        model=model_name,
        temperature=0.2,
        api_key=os.getenv("OPENAI_API_KEY", "dummy-key-replace-me")
    )

def _run_agent(template: str, context: str, user_input: str, model_name: str = "gpt-4o-mini") -> str:
    llm = get_llm(model_name)
    prompt = PromptTemplate.from_template(template)
    chain = prompt | llm | StrOutputParser()
    return chain.invoke({"context": context, "user_input": user_input})

# Agent 1: Reminder Agent (Small Model)
def reminder_agent(context: str, user_input: str) -> str:
    template = "You are a Reminder Agent. Based on the context: {context}, process the user's request: {user_input}. Provide a clear reminder confirmation."
    return _run_agent(template, context, user_input, "gpt-4o-mini")

# Agent 2: Medication Knowledge Agent (Medium Model)
def medication_agent(context: str, user_input: str) -> str:
    template = "You are a Medication Expert. Context: {context}. User asks: {user_input}. Explain the medicines, dosage, and side effects clearly."
    return _run_agent(template, context, user_input, "gpt-4o-mini")

# Agent 3: Symptom Analysis Agent (Large Model)
def symptom_analysis_agent(context: str, user_input: str) -> str:
    template = "You are a Symptom Analysis Agent. Context: {context}. User symptoms: {user_input}. Analyze risks, check for emergencies, and give guidance."
    return _run_agent(template, context, user_input, "gpt-4o")

# Agent 4: Medical Report Agent
def medical_report_agent(context: str, user_input: str) -> str:
    template = "You are a Medical Report Analyzer. Context: {context}. User asks: {user_input}. Summarize findings and explain in simple language."
    return _run_agent(template, context, user_input, "gpt-4o")

# Agent 5: Health Coach Agent
def health_coach_agent(context: str, user_input: str) -> str:
    template = "You are a Health Coach. Context: {context}. User asks: {user_input}. Provide lifestyle, exercise, and diet recommendations."
    return _run_agent(template, context, user_input, "gpt-4o-mini")

# Hindsight Agent
def hindsight_agent(context: str, user_input: str, drafted_response: str) -> str:
    template = """You are a Hindsight Safety Agent. 
Review the drafted response below for medical accuracy, safety, and empathetic tone.
Add necessary medical disclaimers if dealing with emergencies or serious symptoms.
Do not change the core helpful information unless it is dangerous.
Context: {context}
User asked: {user_input}
Drafted Response: {drafted_response}
Provide the final revised response."""
    llm = get_llm("gpt-4o")
    prompt = PromptTemplate.from_template(template)
    chain = prompt | llm | StrOutputParser()
    return chain.invoke({"context": context, "user_input": user_input, "drafted_response": drafted_response})

# Cascade Flow Router
def cascade_router(user_input: str) -> str:
    template = """You are an intelligent routing agent.
Analyze the user's input and classify it into exactly ONE of the following categories:
- reminder
- medication
- report
- coach
- symptom

User input: {user_input}
Category:"""
    llm = get_llm("gpt-4o-mini")
    prompt = PromptTemplate.from_template(template)
    chain = prompt | llm | StrOutputParser()
    return chain.invoke({"user_input": user_input}).strip().lower()

# Router Logic
def route_to_agent(user_input: str, context: str) -> str:
    try:
        category = cascade_router(user_input)
        
        if "remind" in category:
            draft = reminder_agent(context, user_input)
        elif "medication" in category:
            draft = medication_agent(context, user_input)
        elif "report" in category:
            draft = medical_report_agent(context, user_input)
        elif "coach" in category:
            draft = health_coach_agent(context, user_input)
        else:
            draft = symptom_analysis_agent(context, user_input)
            
        final_response = hindsight_agent(context, user_input, draft)
        return final_response
    except Exception as e:
        print(f"Agent Error: {e}")
        return "I am operating in offline preview mode because an OpenAI API key wasn't provided. But if I were connected, I would say: Based on your symptoms and history, I recommend resting and drinking plenty of water!"
