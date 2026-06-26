"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hello John. I'm MediMind, your personal healthcare assistant. I've reviewed your recent symptom logs and Dr. Smith's notes. How are you feeling today?" }
  ])
  const [input, setInput] = useState("")

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input;
    // Add user message
    const newMessages = [...messages, { role: "user", content: userMessage }]
    setMessages(newMessages)
    setInput("")

    try {
      const response = await fetch("http://localhost:8000/chat/?patient_id=1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "user",
          content: userMessage
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessages([...newMessages, { role: "ai", content: data.content }]);
    } catch (error) {
      console.error("Error communicating with AI:", error);
      setMessages([...newMessages, { role: "ai", content: "Sorry, I am having trouble connecting to the server right now." }]);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <header className="h-16 border-b border-white/10 flex items-center px-6 shrink-0 bg-slate-900/30">
        <div>
          <h2 className="font-semibold">MediMind AI Assistant</h2>
          <p className="text-xs text-teal-400">Memory Active • Dr. Smith Notified</p>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 max-w-3xl ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === "ai" ? "bg-gradient-to-tr from-teal-400 to-blue-500 text-slate-950 font-bold text-xs" : "bg-slate-700 text-white text-xs font-medium"
            }`}>
              {msg.role === "ai" ? "AI" : "JD"}
            </div>
            
            {/* Message Bubble */}
            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
              msg.role === "user" 
                ? "bg-teal-500 text-slate-950 rounded-tr-sm" 
                : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-sm"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-slate-950/50 backdrop-blur-md border-t border-white/10 shrink-0">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms, ask about your medications, or request a summary..."
            className="w-full bg-white/5 border border-white/10 rounded-full pl-6 pr-32 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all placeholder:text-slate-500 shadow-inner"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button type="button" className="p-2 text-slate-400 hover:text-white transition-colors" title="Voice Input">
              🎤
            </button>
            <Button type="submit" className="bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-full px-6 shadow-lg shadow-teal-500/20 h-10">
              Send
            </Button>
          </div>
        </form>
        <p className="text-center text-xs text-slate-500 mt-3">
          MediMind AI can make mistakes. Always consult your doctor for medical emergencies.
        </p>
      </div>
    </div>
  )
}
