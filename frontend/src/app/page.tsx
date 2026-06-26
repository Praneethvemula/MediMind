import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-teal-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full border-b border-white/10 bg-slate-950/50 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center">
              <span className="font-bold text-slate-950">M</span>
            </div>
            <span className="font-bold text-xl tracking-tight">MediMind AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className={buttonVariants({ className: "bg-teal-500 hover:bg-teal-400 text-slate-950 font-medium rounded-full px-6" })}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-teal-300">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              The Healthcare Assistant That Never Forgets
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tighter">
              Your Health <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                Perfectly Remembered.
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
              Experience the next generation of patient care. MediMind AI analyzes your symptoms, 
              remembers your medical history across visits, and empowers your doctors with intelligent insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/signup" className={buttonVariants({ size: "lg", className: "bg-white text-slate-950 hover:bg-slate-200 rounded-full font-semibold px-8 h-12" })}>
                Join as a Patient
              </Link>
              <Link href="/doctor-login" className={buttonVariants({ size: "lg", className: "bg-black text-white hover:bg-slate-900 border border-white/20 rounded-full h-12" })}>
                I&apos;m a Doctor
              </Link>
            </div>
          </div>

          {/* Abstract Hero Image/Graphic */}
          <div className="relative h-[500px] w-full hidden lg:block">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[80px]" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-80 h-96 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 p-0.5">
                    <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-xs font-bold">AI</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">MediMind Assistant</div>
                    <div className="text-xs text-teal-400">Online</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-3 text-sm text-slate-300 w-[85%]">
                    I notice you have an appointment tomorrow. Have your allergy symptoms improved since we last spoke on Tuesday?
                  </div>
                  <div className="bg-teal-500/20 border border-teal-500/30 rounded-lg p-3 text-sm text-white w-[85%] ml-auto">
                    Yes, the new medication helped a lot.
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-sm text-slate-300 w-[85%]">
                    Excellent. I&apos;ve updated your health log. I will remind Dr. Smith to review this before your visit.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-24 bg-slate-900/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Multi-Agent Intelligence</h2>
            <p className="text-slate-400">A cascade of specialized AI agents working together for your health.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Medication Expert", desc: "Get detailed explanations about your prescriptions, dosages, and interactions." },
              { title: "Symptom Analyst", desc: "Advanced risk assessment and emergency detection powered by LLMs." },
              { title: "Report Analyzer", desc: "Upload PDFs and let AI break down complex medical jargon into simple terms." }
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-4 text-xl font-bold">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
