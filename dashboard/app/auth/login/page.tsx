"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { BrandLogo } from "../../../components/BrandLogo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    // Simulate auth — replace with real NextAuth / JWT call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-blue-700 text-white text-xs py-2 px-6 text-center font-medium">
        Sahayog Governance Portal · Polygon zkEVM · All sessions are encrypted end-to-end
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-orange-50/50 flex items-center justify-center mb-4 shadow-sm border border-orange-100">
              <BrandLogo className="w-10 h-10" color="#F45A2C" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">Sign in to Sahayog</h1>
            <p className="text-slate-500 text-sm mt-1.5 text-center">
              Governance dashboard for registered NGOs, verifiers & donors
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="gov-card"
          >
            {error && (
              <div className="flex items-center gap-2.5 p-3 mb-5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle size={15} className="shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@ngo.org.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input pl-10"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="password" className="form-label mb-0">Password</label>
                  <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-blue-600"
                />
                <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
                  Keep me signed in for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-[15px] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating…
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="divider" />
              <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-slate-400 font-medium">
                or continue with
              </span>
            </div>

            <div className="space-y-3">
              {/* Google Login */}
              <button
                type="button"
                className="btn-secondary w-full py-3 text-[14px] bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 gap-3 text-slate-700"
                onClick={() => router.push("/dashboard")}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign in with Google
              </button>

              {/* Aadhaar OTP Login */}
              <button
                type="button"
                className="btn-secondary w-full py-3 text-[14px] bg-slate-900 text-white border-slate-900 hover:bg-slate-800 gap-3"
                onClick={() => router.push("/dashboard")}
              >
                <div className="w-5 h-5 rounded bg-orange-500 flex items-center justify-center">
                  <span className="text-white text-[10px] font-black">आ</span>
                </div>
                Sign in with Anon-Aadhaar
              </button>
            </div>
          </motion.div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              Register as NGO / Verifier
            </Link>
          </p>

          <p className="text-center text-xs text-slate-400 mt-4">
            By signing in you agree to the{" "}
            <a href="#" className="underline hover:text-slate-600 transition-colors">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="underline hover:text-slate-600 transition-colors">Privacy Policy</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 border-t border-slate-200 bg-white text-center text-xs text-slate-400">
        Sahayog Protocol · Registered Section 8 Company · CIN: U85300AS2025NPL000001
      </div>
    </div>
  );
}
