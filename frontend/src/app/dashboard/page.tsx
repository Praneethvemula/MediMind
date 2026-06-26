"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function DashboardOverview() {
  const [metricsToast, setMetricsToast] = useState<string | null>(null)

  const handleLogMetric = (metric: string) => {
    setMetricsToast(`Successfully logged ${metric}!`)
    setTimeout(() => setMetricsToast(null), 3000)
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 relative">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Good morning, John</h1>
        <p className="text-slate-400">Here is your daily health overview.</p>
      </header>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Water Intake", value: "1.2L", goal: "2.5L", color: "from-blue-500/20 to-blue-400/5", border: "border-blue-500/20", icon: "💧" },
          { label: "Sleep", value: "6.5h", goal: "8h", color: "from-indigo-500/20 to-indigo-400/5", border: "border-indigo-500/20", icon: "🌙" },
          { label: "Heart Rate", value: "72 bpm", goal: "Normal", color: "from-rose-500/20 to-rose-400/5", border: "border-rose-500/20", icon: "❤️" },
          { label: "Medications", value: "1 Pending", goal: "2 Taken", color: "from-teal-500/20 to-teal-400/5", border: "border-teal-500/20", icon: "💊" },
        ].map((stat, i) => (
          <div key={i} className={`bg-gradient-to-br ${stat.color} border ${stat.border} rounded-2xl p-5 relative overflow-hidden`}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-300 mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-xs text-slate-400">/ {stat.goal}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        <button onClick={() => handleLogMetric('Water (250ml)')} className="flex-shrink-0 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-full px-6 py-2 text-sm font-medium transition-colors cursor-pointer">
          💧 Log Water
        </button>
        <button onClick={() => handleLogMetric('Exercise (30 mins)')} className="flex-shrink-0 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 rounded-full px-6 py-2 text-sm font-medium transition-colors cursor-pointer">
          🏃‍♂️ Log Exercise
        </button>
        <button onClick={() => handleLogMetric('Weight')} className="flex-shrink-0 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 rounded-full px-6 py-2 text-sm font-medium transition-colors cursor-pointer">
          ⚖️ Log Weight
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Memory/Recent Interactions */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Recent AI Insights</h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold">AI</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">Symptom Analysis Complete</span>
                    <span className="text-xs text-slate-500">2 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">
                    Based on your reported headache and slight fever, it is likely a mild viral infection. However, given your history of migraines, please monitor if the pain concentrates on one side. I have notified Dr. Smith.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold">Dr</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">Dr. Smith Replied</span>
                    <span className="text-xs text-slate-500">1 hour ago</span>
                  </div>
                  <p className="text-sm text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">
                    Take paracetamol and rest. If it persists beyond 24 hours, come in for a checkup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reminders / Appointments */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Upcoming</h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-white/5">
              <div className="bg-orange-500/20 text-orange-400 p-2 rounded-lg text-xs font-bold text-center min-w-[50px]">
                <div>OCT</div>
                <div className="text-lg">24</div>
              </div>
              <div>
                <h4 className="font-medium text-sm">Follow-up Checkup</h4>
                <p className="text-xs text-slate-400 mt-1">Dr. Smith • 10:00 AM</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 pb-4 border-b border-white/5">
              <div className="bg-teal-500/20 text-teal-400 p-2 rounded-lg text-xl flex items-center justify-center min-w-[50px]">
                💊
              </div>
              <div>
                <h4 className="font-medium text-sm">Take Amoxicillin</h4>
                <p className="text-xs text-slate-400 mt-1">1 Tablet • After Lunch (1:00 PM)</p>
              </div>
            </div>
            
            <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10">
              View All Reminders
            </Button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {metricsToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full border border-slate-700 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-5">
          {metricsToast}
        </div>
      )}
    </div>
  )
}
