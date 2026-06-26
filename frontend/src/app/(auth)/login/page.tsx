import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 text-slate-50 selection:bg-teal-500/30">
      <Link href="/" className="absolute top-6 left-6 text-sm text-slate-400 hover:text-white transition-colors">
        ← Back to Home
      </Link>
      
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-500/20 rounded-full blur-[50px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-[50px] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center mb-4">
              <span className="font-bold text-slate-950 text-xl">M</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-sm text-slate-400 mt-2">Sign in to access your medical memory.</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all placeholder:text-slate-500"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <Link href="#" className="text-xs text-teal-400 hover:text-teal-300 transition-colors">Forgot password?</Link>
              </div>
              <input 
                type="password" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all placeholder:text-slate-500"
                placeholder="••••••••"
              />
            </div>
            
            <Link href="/dashboard" className={buttonVariants({ className: "w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold rounded-xl h-12 mt-4 flex items-center justify-center" })}>
              Sign In
            </Link>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-teal-400 hover:text-teal-300 font-medium transition-colors">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
