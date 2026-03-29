"use client";

import { motion } from "framer-motion";
import {
  Shield, Users, TrendingUp, Clock, CheckCircle,
  ArrowUpRight, Info, Zap, Award, Lock,
  BarChart2, PieChart,
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, PieChart as RPieChart, Pie, Cell, Tooltip,
} from "recharts";

const VOTERS = [
  { address: "0x82F4…4E5A", name: "Rajesh Kumar", role: "NGO Coordinator", tokens: 4200, votes: 64, passport: 24, aadhaar: true },
  { address: "0xD3A9…77CC", name: "Priya Sharma", role: "Community Verifier", tokens: 1800, votes: 42, passport: 18, aadhaar: true },
  { address: "0x1BCD…9F2A", name: "Arjun Das", role: "Donor", tokens: 9600, votes: 97, passport: 31, aadhaar: false },
  { address: "0x44EF…C302", name: "Sunita Bora", role: "NGO Coordinator", tokens: 600, votes: 24, passport: 16, aadhaar: true },
  { address: "0x9FFA…AB12", name: "Govt Observer #4", role: "Gov Observer", tokens: 200, votes: 14, passport: 22, aadhaar: true },
];

const radarData = [
  { subject: "Sybil Resist.", A: 92 },
  { subject: "Participation", A: 74 },
  { subject: "Decentralisation", A: 81 },
  { subject: "Speed", A: 68 },
  { subject: "Integrity", A: 95 },
  { subject: "Transparency", A: 98 },
];

const distributionData = [
  { name: "NGO Coordinators", value: 38, color: "#1D4ED8" },
  { name: "Community Verifiers", value: 29, color: "#059669" },
  { name: "Donors", value: 22, color: "#D97706" },
  { name: "Gov Observers", value: 11, color: "#7C3AED" },
];

const TIMELINE = [
  { step: "Proposal Created", desc: "1,000 RELIEF tokens required to create. Snapshot taken at block N.", done: true },
  { step: "Voting Delay (1 day)", desc: "Prevents flash-loan manipulation. No voting during this window.", done: true },
  { step: "Active Voting (2 days)", desc: "Quadratic-weighted votes. Gitcoin Passport gate enforced (score ≥ 15).", done: true },
  { step: "Timelock (48 hours)", desc: "Guardian can veto malicious proposals. Community can flag for review.", done: false },
  { step: "Execution", desc: "MilestoneManager.approveTranche() called automatically by the timelock contract.", done: false },
];

export default function GovernancePage() {
  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">DAO Governance</h1>
          <p className="text-slate-500 text-sm mt-0.5">Protocol parameters, voter registry, and governance health metrics</p>
        </div>
        <span className="badge badge-green"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Governance Active</span>
      </div>

      {/* Key Params */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Voting Period", value: "2 Days", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Quorum Required", value: "10%", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Timelock Delay", value: "48 Hours", icon: Lock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Proposal Threshold", value: "1,000 RELIEF", icon: Zap, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((p) => (
          <div key={p.label} className="stat-card">
            <div className={`p-2.5 ${p.bg} rounded-xl w-fit mb-3`}><p.icon size={18} className={p.color} /></div>
            <p className="text-xl font-black text-slate-900">{p.value}</p>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wide">{p.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Radar Health */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="gov-card"
        >
          <h3 className="font-bold text-slate-900 mb-1">Governance Health</h3>
          <p className="text-xs text-slate-500 mb-4">Multi-dimension protocol score</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#64748B", fontWeight: 600 }} />
                <Radar name="Score" dataKey="A" stroke="#1D4ED8" fill="#1D4ED8" fillOpacity={0.12} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-semibold">Overall Gov. Score</span>
            <span className="text-emerald-600 font-black text-lg">84.7 / 100</span>
          </div>
        </motion.div>

        {/* Voter Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.07 }}
          className="gov-card"
        >
          <h3 className="font-bold text-slate-900 mb-1">Token Distribution</h3>
          <p className="text-xs text-slate-500 mb-4">Governance power by role</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RPieChart>
                <Pie data={distributionData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {distributionData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => `${val}%`} />
              </RPieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {distributionData.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="text-slate-600 truncate">{d.name}</span>
                <span className="font-bold text-slate-900 ml-auto">{d.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Proposal Lifecycle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="gov-card"
        >
          <h3 className="font-bold text-slate-900 mb-1">Proposal Lifecycle</h3>
          <p className="text-xs text-slate-500 mb-5">On-chain governance flow</p>
          <div className="space-y-4">
            {TIMELINE.map((t, i) => (
              <div key={i} className="flex gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                  t.done ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400 border-2 border-slate-200"
                }`}>
                  {t.done ? <CheckCircle size={12} /> : i + 1}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${t.done ? "text-slate-900" : "text-slate-400"}`}>{t.step}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quadratic Voting Explainer */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="gov-card mb-6 bg-blue-50 border-blue-200"
      >
        <div className="flex gap-4 items-start">
          <div className="p-2.5 bg-blue-100 rounded-xl shrink-0"><BarChart2 size={20} className="text-blue-700" /></div>
          <div>
            <h3 className="font-bold text-blue-900 mb-1">Quadratic Voting: How It Works</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              Vote weight = <strong>√(RELIEF token balance)</strong>. A whale with 10,000 tokens gets{" "}
              <strong>√10,000 = 100 votes</strong>. Ten community members with 100 tokens each get{" "}
              <strong>10 × √100 = 100 votes</strong>. Equal influence — whale advantage eliminated.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[
                { tokens: "10,000", votes: "100", label: "1 Whale" },
                { tokens: "1,000", votes: `${Math.floor(10 * 31.6)}`, label: "10 × 100 holders" },
                { tokens: "100", votes: "10", label: "1 Community" },
              ].map((ex) => (
                <div key={ex.label} className="bg-white rounded-xl p-3 border border-blue-200">
                  <p className="text-xs font-semibold text-blue-600">{ex.label}</p>
                  <p className="text-xs text-slate-500 mt-1">{ex.tokens} tokens</p>
                  <p className="text-lg font-black text-blue-900">{ex.votes} votes</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Voter Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="gov-card"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-slate-900">Registered Voters</h3>
            <p className="text-xs text-slate-500 mt-0.5">All wallets with governance power on Sahayog</p>
          </div>
          <button className="btn-ghost text-sm flex items-center gap-1">
            Full Registry <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Wallet / Name</th>
                <th>Role</th>
                <th>RELIEF Balance</th>
                <th>Quadratic Votes</th>
                <th>Passport Score</th>
                <th>Aadhaar ZK</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {VOTERS.map((v) => (
                <tr key={v.address}>
                  <td>
                    <div className="font-semibold text-slate-900 text-sm">{v.name}</div>
                    <div className="font-mono text-[11px] text-slate-400">{v.address}</div>
                  </td>
                  <td><span className="badge badge-gray text-[11px]">{v.role}</span></td>
                  <td className="font-bold text-slate-900">{v.tokens.toLocaleString()}</td>
                  <td className="font-black text-blue-700">{v.votes}</td>
                  <td>
                    <span className={`badge ${v.passport >= 15 ? "badge-green" : "badge-amber"}`}>
                      {v.passport} / 15
                    </span>
                  </td>
                  <td>
                    {v.aadhaar ? (
                      <span className="badge badge-green"><CheckCircle size={10} />Verified</span>
                    ) : (
                      <span className="badge badge-gray">Not linked</span>
                    )}
                  </td>
                  <td>
                    <button className="btn-ghost text-xs px-2">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
