"use client"
import { useState } from "react"
import { buttonVariants } from "@/components/ui/button"

export default function AppointmentsPage() {
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  const appointments = [
    { id: 1, doctor: "Dr. Sarah Jenkins", specialty: "Cardiologist", date: "Oct 30, 2025", time: "10:00 AM", type: "In-Person", status: "Confirmed", location: "Heart Center, Floor 4" },
    { id: 2, doctor: "Dr. Mark Spencer", specialty: "General Practitioner", date: "Nov 15, 2025", time: "2:30 PM", type: "Video Call", status: "Upcoming", location: "MediMind Telehealth" },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Appointments</h1>
          <p className="text-slate-400 mt-1">Manage your upcoming doctor visits and consultations.</p>
        </div>
        <button 
          onClick={() => showToast("Booking portal is launching soon!")}
          className={buttonVariants({ className: "bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold rounded-xl cursor-pointer" })}
        >
          Book New Appointment
        </button>
      </div>

      <div className="space-y-4">
        {appointments.map((apt) => (
          <div key={apt.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-white/10 transition-colors">
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 p-0.5 shadow-lg">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-xl">
                  👨‍⚕️
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{apt.doctor}</h3>
                <p className="text-sm text-teal-400">{apt.specialty}</p>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/50 p-4 rounded-xl border border-white/5">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Date</p>
                <p className="text-sm font-medium text-white">{apt.date}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Time</p>
                <p className="text-sm font-medium text-white">{apt.time}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Type</p>
                <p className="text-sm font-medium text-white flex items-center gap-1">
                  {apt.type === 'Video Call' ? '🎥' : '🏥'} {apt.type}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Status</p>
                <span className="text-xs font-medium px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-400 inline-block">
                  {apt.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => showToast(`Rescheduling flow for ${apt.doctor} opened.`)}
                className="px-4 py-2.5 rounded-xl border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer text-white"
              >
                Reschedule
              </button>
              {apt.type === 'Video Call' ? (
                <button 
                  onClick={() => showToast(`Connecting to secure video call with ${apt.doctor}...`)}
                  className="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium transition-colors shadow-lg shadow-blue-500/20 cursor-pointer"
                >
                  Join Call
                </button>
              ) : (
                <button 
                  onClick={() => showToast(`Opening map for ${apt.location}...`)}
                  className="px-4 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-200 text-sm font-medium transition-colors cursor-pointer shadow-lg"
                >
                  Get Directions
                </button>
              )}
            </div>

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
