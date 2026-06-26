"use client"
import { useState } from "react"
import { buttonVariants } from "@/components/ui/button"

export default function MedicationsPage() {
  const [medications, setMedications] = useState([
    { id: 1, name: "Lisinopril", dosage: "10mg", frequency: "Once daily in the morning", nextDose: "Tomorrow 8:00 AM", takenToday: true },
    { id: 2, name: "Metformin", dosage: "500mg", frequency: "Twice daily with meals", nextDose: "Today 7:00 PM", takenToday: false },
    { id: 3, name: "Vitamin D3", dosage: "2000 IU", frequency: "Once daily", nextDose: "Today 12:00 PM", takenToday: false },
  ])

  const [toast, setToast] = useState<string | null>(null)

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  const handleMarkTaken = (id: number, name: string) => {
    setMedications(prev => prev.map(med => {
      if (med.id === id) {
        return { ...med, takenToday: true, nextDose: "Tomorrow " + med.nextDose.split(" ").slice(1).join(" ") }
      }
      return med
    }))
    showToast(`Successfully marked ${name} as taken!`)
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Medications</h1>
          <p className="text-slate-400 mt-1">Track your active prescriptions and daily schedule.</p>
        </div>
        <button 
          onClick={() => showToast("Refill request sent to your doctor.")}
          className={buttonVariants({ className: "bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl cursor-pointer" })}
        >
          Request Refill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {medications.map((med) => (
          <div key={med.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-400 to-orange-400 flex items-center justify-center text-xl shadow-lg shadow-rose-500/20">
                    💊
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{med.name}</h3>
                    <p className="text-teal-400 font-medium text-sm">{med.dosage}</p>
                  </div>
                </div>
                {med.takenToday ? (
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 transition-all">
                    ✓ Taken
                  </span>
                ) : (
                  <span className="bg-amber-500/20 text-amber-400 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 transition-all">
                    ⏳ Pending
                  </span>
                )}
              </div>
              
              <div className="bg-slate-900/50 rounded-xl p-4 space-y-2 border border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Frequency</span>
                  <span className="text-white font-medium">{med.frequency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Next Dose</span>
                  <span className="text-white font-medium">{med.nextDose}</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => handleMarkTaken(med.id, med.name)}
              className={`w-full mt-6 py-3 rounded-xl text-sm font-semibold transition-all ${med.takenToday ? 'bg-white/5 text-slate-500 cursor-not-allowed' : 'bg-white text-slate-950 hover:bg-slate-200 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)]'}`} 
              disabled={med.takenToday}
            >
              {med.takenToday ? 'Done for today' : 'Mark as Taken'}
            </button>
          </div>
        ))}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full border border-slate-700 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-5">
          {toast}
        </div>
      )}
    </div>
  )
}
