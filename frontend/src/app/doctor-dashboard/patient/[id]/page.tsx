"use client"
import { useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [prescriptionToast, setPrescriptionToast] = useState(false)

  const handlePrescribe = (e: React.FormEvent) => {
    e.preventDefault()
    setPrescriptionToast(true)
    setTimeout(() => setPrescriptionToast(false), 3000)
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <Link href="/doctor-dashboard" className="text-sm text-slate-400 hover:text-white transition-colors">
        ← Back to Patients
      </Link>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-3xl">👤</div>
          <div>
            <h1 className="text-2xl font-bold text-white">John Doe</h1>
            <p className="text-slate-400">45 yrs • Male • Blood: O+ • 180cm • 82kg</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg transition-colors cursor-pointer">
            Start Call
          </button>
        </div>
      </div>

      <div className="flex border-b border-white/10 space-x-6">
        {["overview", "history", "prescriptions"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium capitalize transition-colors cursor-pointer ${activeTab === tab ? 'text-teal-400 border-b-2 border-teal-400' : 'text-slate-400 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-6 rounded-2xl relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">✨</span>
                <h2 className="text-lg font-bold text-white">AI Clinical Summary</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Patient reports mild chest tightness after exercise, logging this symptom twice in the past week. 
                Recent CBC and Lipid Panel (Oct 24) show elevated LDL cholesterol. 
                Blood pressure readings logged by patient average 135/85 over the last month. 
                <br/><br/>
                <strong className="text-teal-400">Recommendation:</strong> Review statin dosage and recommend stress test if chest tightness persists.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h2 className="text-lg font-bold text-white mb-4">Recent Vitals Logged</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Blood Pressure</p>
                  <p className="text-lg font-semibold text-white">135/85</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Heart Rate</p>
                  <p className="text-lg font-semibold text-white">72 bpm</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Weight</p>
                  <p className="text-lg font-semibold text-white">82 kg</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Water Intake</p>
                  <p className="text-lg font-semibold text-white">2.1 L</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h2 className="text-lg font-bold text-white mb-4">Current Medications</h2>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-sm">
                  <span className="text-white">Lisinopril 10mg</span>
                  <span className="text-teal-400">Active</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-white">Aspirin 81mg</span>
                  <span className="text-teal-400">Active</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === "prescriptions" && (
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl max-w-2xl">
          <h2 className="text-lg font-bold text-white mb-4">Add New Prescription</h2>
          <form onSubmit={handlePrescribe} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-300">Medication Name</label>
              <input type="text" className="w-full mt-1 bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-300">Dosage</label>
                <input type="text" className="w-full mt-1 bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500" required />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">Frequency</label>
                <input type="text" className="w-full mt-1 bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500" required />
              </div>
            </div>
            <button type="submit" className="w-full py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold rounded-lg mt-4 cursor-pointer">
              E-Prescribe
            </button>
          </form>
        </div>
      )}

      {activeTab === "history" && (
        <div className="text-slate-400 p-8 text-center bg-white/5 border border-white/10 rounded-2xl">
          Detailed medical history and historical reports will appear here.
        </div>
      )}

      {/* Toast Notification */}
      {prescriptionToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-emerald-500/90 text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-5">
          Prescription successfully sent to pharmacy.
        </div>
      )}
    </div>
  )
}
