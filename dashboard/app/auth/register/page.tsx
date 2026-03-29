"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Shield, Mail, Lock, Eye, EyeOff, ArrowRight,
  AlertCircle, User, Building2, Phone, CheckCircle,
} from "lucide-react";
import { BrandLogo } from "../../../components/BrandLogo";

const ROLES = [
  { id: "ngo", label: "NGO Coordinator", desc: "Submit proofs, manage milestones" },
  { id: "verifier", label: "Community Verifier", desc: "Attest on-field deliveries" },
  { id: "donor", label: "Donor / Supporter", desc: "Donate and track fund usage" },
  { id: "observer", label: "Government Observer", desc: "Read-only audit access" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [form, setForm] = useState({ name: "", org: "", email: "", phone: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(k: string, v: string) { setForm((p) => ({ ...p, [k]: v })); }

  function nextStep() {
    if (step === 1 && !role) { setError("Please select your role."); return; }
    if (step === 2) {
      if (!form.name || !form.email || !form.password) { setError("Please fill all required fields."); return; }
      if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
      if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    }
    setError("");
    setStep((s) => s + 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-blue-700 text-white text-xs py-2 px-6 text-center font-medium">
        Sahayog Governance Portal · Polygon zkEVM · Encrypted Registration
      </div>

      <div className="flex flex-1 items-center justify-center p-6 py-10">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-orange-50/50 flex items-center justify-center mb-4 shadow-sm border border-orange-100">
              <BrandLogo className="w-10 h-10" color="#F45A2C" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">Create Your Account</h1>
            <p className="text-slate-500 text-sm mt-1.5">Join the relief governance network</p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-0 mb-8">
            {["Choose Role", "Your Details", "Verification"].map((s, i) => (
              <div key={s} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step > i + 1
                        ? "bg-emerald-500 text-white"
                        : step === i + 1
                        ? "bg-blue-700 text-white"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {step > i + 1 ? <CheckCircle size={14} /> : i + 1}
                  </div>
                  <span className={`text-[10px] font-semibold whitespace-nowrap ${step === i + 1 ? "text-blue-700" : "text-slate-400"}`}>{s}</span>
                </div>
                {i < 2 && (
                  <div className={`w-16 h-0.5 mx-2 mb-4 transition-all ${step > i + 1 ? "bg-emerald-400" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="gov-card"
          >
            {error && (
              <div className="flex items-center gap-2.5 p-3 mb-5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle size={15} className="shrink-0" /> {error}
              </div>
            )}

            {/* Step 1 — Role Selection */}
            {step === 1 && (
              <div className="space-y-3">
                <p className="font-semibold text-slate-900 mb-4">Select your role in the protocol:</p>
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => { setRole(r.id); setError(""); }}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      role === r.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="font-semibold text-slate-900 text-sm">{r.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{r.desc}</div>
                  </button>
                ))}
                <button type="button" onClick={nextStep} className="btn-primary w-full py-3 mt-2">
                  Continue <ArrowRight size={16} />
                </button>

                <div className="relative my-4">
                  <div className="divider" />
                  <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-slate-400 font-medium">
                    or
                  </span>
                </div>

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
                  Sign up with Google
                </button>
              </div>
            )}

            {/* Step 2 — Details */}
            {step === 2 && (
              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="form-label">Full Name *</label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text" placeholder="Rajesh Kumar Sharma"
                        value={form.name} onChange={(e) => update("name", e.target.value)}
                        className="form-input pl-10" required
                      />
                    </div>
                  </div>

                  {(role === "ngo" || role === "observer") && (
                    <div className="col-span-2">
                      <label className="form-label">Organisation / NGO Name</label>
                      <div className="relative">
                        <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text" placeholder="Assam Relief Foundation"
                          value={form.org} onChange={(e) => update("org", e.target.value)}
                          className="form-input pl-10"
                        />
                      </div>
                    </div>
                  )}

                  <div className="col-span-2">
                    <label className="form-label">Email Address *</label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email" placeholder="you@ngo.org.in"
                        value={form.email} onChange={(e) => update("email", e.target.value)}
                        className="form-input pl-10" required
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="form-label">Phone Number</label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel" placeholder="+91 98765 43210"
                        value={form.phone} onChange={(e) => update("phone", e.target.value)}
                        className="form-input pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Password *</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPw ? "text" : "password"} placeholder="Min. 8 characters"
                        value={form.password} onChange={(e) => update("password", e.target.value)}
                        className="form-input pl-10 pr-10" required
                      />
                      <button type="button" onClick={() => setShowPw(!showPw)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Confirm Password *</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password" placeholder="Re-enter password"
                        value={form.confirm} onChange={(e) => update("confirm", e.target.value)}
                        className="form-input pl-10" required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 py-3">
                    Back
                  </button>
                  <button type="submit" className="btn-primary flex-1 py-3">
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}

            {/* Step 3 — Verification */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="font-semibold text-blue-900 text-sm mb-1">Gitcoin Passport Verification</div>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    To prevent Sybil attacks, we require a Gitcoin Passport score ≥ 15. 
                    This takes ~5 minutes and requires real credentials (GitHub, ENS, Twitter, etc.).
                  </p>
                  <button type="button" className="btn-primary text-xs py-2 px-4 mt-3 bg-blue-700">
                    Connect Gitcoin Passport ↗
                  </button>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                  <div className="font-semibold text-orange-900 text-sm mb-1">Anon-Aadhaar Verification (Optional)</div>
                  <p className="text-xs text-orange-700 leading-relaxed">
                    Required for high-stakes DAO votes (&gt;₹10L disbursements). Uses ZK-proof — 
                    your Aadhaar number is never revealed on-chain.
                  </p>
                  <button type="button" className="btn-secondary text-xs py-2 px-4 mt-3 border-orange-300 text-orange-700 hover:bg-orange-100">
                    Verify with Anon-Aadhaar
                  </button>
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" id="terms" className="mt-1 w-4 h-4 rounded border-slate-300" required />
                  <label htmlFor="terms" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 underline">Terms of Service</a>,{" "}
                    <a href="#" className="text-blue-600 underline">Privacy Policy</a>, and confirm that 
                    I am authorised to represent the organisation listed above.
                  </label>
                </div>

                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setStep(2)} className="btn-secondary flex-1 py-3">
                    Back
                  </button>
                  <button type="submit" disabled={loading} className="btn-primary flex-1 py-3 disabled:opacity-60">
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Account…
                      </>
                    ) : (
                      <>Create Account <ArrowRight size={16} /></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <div className="py-4 border-t border-slate-200 bg-white text-center text-xs text-slate-400">
        Sahayog Protocol · Registered Section 8 Company · CIN: U85300AS2025NPL000001
      </div>
    </div>
  );
}
