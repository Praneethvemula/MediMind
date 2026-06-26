import Link from "next/link"

export default function DoctorDashboardPage() {
  const patients = [
    { id: 1, name: "John Doe", age: 45, condition: "Hypertension", lastVisit: "2 days ago", risk: "Medium" },
    { id: 2, name: "Sarah Jenkins", age: 32, condition: "Asthma", lastVisit: "1 week ago", risk: "Low" },
    { id: 3, name: "Robert Fox", age: 58, condition: "Type 2 Diabetes", lastVisit: "Today", risk: "High" },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">My Patients</h1>
        <p className="text-slate-400 mt-1">Overview of your assigned patients and their health status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map(patient => (
          <Link key={patient.id} href={`/doctor-dashboard/patient/${patient.id}`}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group relative overflow-hidden h-full flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-xl">
                    👤
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    patient.risk === 'Low' ? 'bg-emerald-500/20 text-emerald-400' :
                    patient.risk === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-rose-500/20 text-rose-400'
                  }`}>
                    {patient.risk} Risk
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1">{patient.name}, {patient.age}</h3>
                <p className="text-teal-400 font-medium text-sm mb-4">{patient.condition}</p>
                
                <p className="text-sm text-slate-400">Last seen: {patient.lastVisit}</p>
              </div>
              
              <div className="mt-6 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                View Details →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
