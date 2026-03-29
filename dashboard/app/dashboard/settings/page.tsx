"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User, Bell, Shield, Key, Globe, Save,
  CheckCircle, Wallet, Smartphone, Eye, EyeOff,
} from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [notifs, setNotifs] = useState({ proposals: true, milestones: true, oracles: false, dao: true });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900">Account Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your profile, notifications, and security preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="gov-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-blue-50 rounded-xl"><User size={18} className="text-blue-600" /></div>
            <div><h3 className="font-bold text-slate-900">Profile Information</h3>
              <p className="text-xs text-slate-500 mt-0.5">Your public governance identity</p></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="form-label">Full Name</label><input className="form-input" defaultValue="Rajesh Kumar Sharma" /></div>
            <div><label className="form-label">Organisation</label><input className="form-input" defaultValue="Pratham Health Initiative" /></div>
            <div><label className="form-label">Email</label><input type="email" className="form-input" defaultValue="rajesh@pratham.org.in" /></div>
            <div><label className="form-label">Phone</label><input type="tel" className="form-input" defaultValue="+91 98765 43210" /></div>
            <div className="sm:col-span-2">
              <label className="form-label">Region</label>
              <select className="form-input">
                <option>Assam</option><option>West Bengal</option><option>Multi-region</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Wallet */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }} className="gov-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-indigo-50 rounded-xl"><Wallet size={18} className="text-indigo-600" /></div>
            <div><h3 className="font-bold text-slate-900">Wallet & Identity</h3>
              <p className="text-xs text-slate-500 mt-0.5">Connected wallet and ZK identity proofs</p></div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Connected Wallet</p>
                <p className="font-mono font-semibold text-slate-900 text-sm">0x82F4…4E5A</p>
              </div>
              <span className="badge badge-green"><CheckCircle size={10} />Connected</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Gitcoin Passport</p>
                <p className="text-sm font-semibold text-slate-900">Score: 24 / 15 minimum</p>
              </div>
              <span className="badge badge-green"><CheckCircle size={10} />Verified</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Anon-Aadhaar ZK</p>
                <p className="text-sm font-semibold text-slate-900">ZK proof linked · High-stakes votes enabled</p>
              </div>
              <span className="badge badge-green"><CheckCircle size={10} />Verified</span>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="gov-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-amber-50 rounded-xl"><Bell size={18} className="text-amber-600" /></div>
            <div><h3 className="font-bold text-slate-900">Notifications</h3>
              <p className="text-xs text-slate-500 mt-0.5">Choose which events trigger alerts</p></div>
          </div>
          <div className="space-y-4">
            {[
              { key: "proposals", label: "New Proposals", desc: "When a new DAO proposal is submitted" },
              { key: "milestones", label: "Milestone Updates", desc: "When a NGO submits proof of utilization" },
              { key: "oracles", label: "Oracle Events", desc: "Chainlink verification results and UMA disputes" },
              { key: "dao", label: "Voting Reminders", desc: "24h before active proposal deadline" },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{n.label}</p>
                  <p className="text-xs text-slate-500">{n.desc}</p>
                </div>
                <button
                  onClick={() => setNotifs((prev) => ({ ...prev, [n.key]: !prev[n.key as keyof typeof prev] }))}
                  className={`relative w-11 h-6 rounded-full transition-colors ${notifs[n.key as keyof typeof notifs] ? "bg-blue-600" : "bg-slate-200"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${notifs[n.key as keyof typeof notifs] ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.21 }} className="gov-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-red-50 rounded-xl"><Shield size={18} className="text-red-600" /></div>
            <div><h3 className="font-bold text-slate-900">Security</h3>
              <p className="text-xs text-slate-500 mt-0.5">Password, 2FA, and session management</p></div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="form-label">Current Password</label>
              <div className="relative">
                <Key size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type={showKey ? "text" : "password"} placeholder="••••••••••" className="form-input pl-10 pr-10" />
                <button onClick={() => setShowKey(!showKey)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="form-label">New Password</label><input type="password" placeholder="••••••••" className="form-input" /></div>
              <div><label className="form-label">Confirm New Password</label><input type="password" placeholder="••••••••" className="form-input" /></div>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-2">
                <Smartphone size={16} className="text-slate-500" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500">Protect your account with TOTP</p>
                </div>
              </div>
              <button className="btn-secondary text-xs py-1.5 px-3">Enable 2FA</button>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button onClick={handleSave} className={`btn-primary px-8 py-3 text-sm transition-all ${saved ? "bg-emerald-600 border-emerald-600" : ""}`}>
            {saved ? <><CheckCircle size={16} />Settings Saved!</> : <><Save size={16} />Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
}
