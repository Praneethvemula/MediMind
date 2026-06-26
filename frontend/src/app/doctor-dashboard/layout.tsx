import Link from "next/link"

export default function DoctorDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-slate-900/50 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center">
              <span className="font-bold text-slate-950 text-sm">M</span>
            </div>
            <span className="font-bold tracking-tight">MediMind Doctor</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            { name: "My Patients", href: "/doctor-dashboard", icon: "👥" },
            { name: "Appointments", href: "/doctor-dashboard/appointments", icon: "📅" },
            { name: "Messages", href: "/doctor-dashboard/messages", icon: "✉️" },
            { name: "Settings", href: "/doctor-dashboard/settings", icon: "⚙️" },
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 border border-white/10 flex items-center justify-center">
              👨‍⚕️
            </div>
            <div>
              <div className="text-sm font-medium text-white">Dr. Smith</div>
              <div className="text-xs text-slate-500">Cardiologist</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 border-b border-white/10 bg-slate-950/50 backdrop-blur-md flex md:hidden items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center">
              <span className="font-bold text-slate-950 text-sm">M</span>
            </div>
            <span className="font-bold tracking-tight">MediMind Doctor</span>
          </div>
          <button className="text-slate-400 hover:text-white">☰</button>
        </header>

        <div className="flex-1 overflow-auto bg-slate-950/30">
          {children}
        </div>
      </main>
    </div>
  )
}
