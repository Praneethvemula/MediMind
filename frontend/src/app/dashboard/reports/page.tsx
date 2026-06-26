"use client"
import { useState } from "react"
import { buttonVariants } from "@/components/ui/button"

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState<any>(null)
  const [uploadToast, setUploadToast] = useState<string | null>(null)

  const handleUpload = () => {
    setUploadToast("Uploading report...")
    setTimeout(() => {
      setUploadToast("Report successfully analyzed and uploaded!")
      setTimeout(() => setUploadToast(null), 3000)
    }, 1500)
  }
  
  const reports = [
    { id: 1, title: "Complete Blood Count (CBC)", date: "Oct 24, 2025", doctor: "Dr. Sarah Jenkins", status: "Normal", type: "PDF" },
    { id: 2, title: "Chest X-Ray", date: "Sep 12, 2025", doctor: "Dr. Mark Spencer", status: "Reviewed", type: "Image" },
    { id: 3, title: "Lipid Panel", date: "Aug 05, 2025", doctor: "Dr. Sarah Jenkins", status: "Attention Needed", type: "PDF" },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Medical Reports</h1>
          <p className="text-slate-400 mt-1">View and manage your lab results and medical documents.</p>
        </div>
        <button 
          onClick={handleUpload}
          className={buttonVariants({ className: "bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold rounded-xl cursor-pointer" })}
        >
          + Upload Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400 text-lg">
                {report.type === "PDF" ? "📄" : "🖼️"}
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                report.status === 'Normal' ? 'bg-emerald-500/20 text-emerald-400' : 
                report.status === 'Reviewed' ? 'bg-blue-500/20 text-blue-400' : 
                'bg-rose-500/20 text-rose-400'
              }`}>
                {report.status}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-1">{report.title}</h3>
            <div className="text-sm text-slate-400 mb-4 space-y-1">
              <p>📅 {report.date}</p>
              <p>👨‍⚕️ {report.doctor}</p>
            </div>
            
            <button 
              onClick={() => setActiveReport(report)}
              className="w-full py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors text-white border border-white/5 cursor-pointer"
            >
              View Document
            </button>
          </div>
        ))}
      </div>

      {/* Document Modal */}
      {activeReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-950/50">
              <h2 className="font-bold text-white">{activeReport.title}</h2>
              <button 
                onClick={() => setActiveReport(null)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-8 h-[60vh] flex flex-col items-center justify-center bg-slate-900/50">
              <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center text-4xl mb-4 border border-white/5 shadow-inner">
                {activeReport.type === "PDF" ? "📄" : "🖼️"}
              </div>
              <p className="text-slate-300 text-lg">Secure Document Viewer</p>
              <p className="text-slate-500 text-sm mt-2">The contents of {activeReport.title} would be displayed here.</p>
              <button 
                onClick={() => setActiveReport(null)}
                className="mt-8 px-6 py-2 bg-teal-500/20 text-teal-400 border border-teal-500/30 rounded-lg hover:bg-teal-500/30 transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {uploadToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full border border-slate-700 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-5">
          {uploadToast}
        </div>
      )}
    </div>
  )
}
