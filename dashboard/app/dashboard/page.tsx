"use client";

import { motion } from "framer-motion";
import {
  DollarSign, Users, FileText, CheckCircle,
  TrendingUp, TrendingDown, ArrowUpRight,
  ShieldCheck, GitCommit, Landmark, AlertTriangle, Clock,
  Bell, Search,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";
import { useState } from "react";
import { CreateProposalModal } from "../../components/CreateProposalModal";

const STATS = [
  {
    label: "State Relief Fund (SDRF)",
    value: "₹4.82 Cr",
    change: "+12.5%",
    positive: true,
    sub: "Allocated to active disaster zones",
    icon: DollarSign,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    label: "On-Ground Nodal Agencies",
    value: "142",
    change: "+3 this week",
    positive: true,
    sub: "Verified NGOs & Block Officers",
    icon: Users,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
  {
    label: "Pending Resolutions",
    value: "24",
    change: "5 Pending Approval",
    positive: null,
    sub: "DAO governance mandates",
    icon: FileText,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    label: "Verification Consensus",
    value: "92%",
    change: "Oracle validation",
    positive: true,
    sub: "Milestone cryptographic proof",
    icon: CheckCircle,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
];

const flowData = [
  { name: "Oct 10", allocated: 4200, released: 2400 },
  { name: "Oct 12", allocated: 4800, released: 3100 },
  { name: "Oct 14", allocated: 5200, released: 4800 },
  { name: "Oct 16", allocated: 5600, released: 3900 },
  { name: "Oct 18", allocated: 6100, released: 5200 },
  { name: "Oct 20", allocated: 6800, released: 5400 },
  { name: "Oct 22", allocated: 7200, released: 6100 },
];

const trancheData = [
  { stage: "State Notified", count: 45 },
  { stage: "Block Verified", count: 32 },
  { stage: "DAO Mandated", count: 28 },
  { stage: "SDRF Released", count: 18 },
  { stage: "Audit Closed", count: 12 },
];

const FEED = [
  { type: "GOVERNANCE", title: "SDRF Tranche Sanctioned", desc: "Order #2024/482: Medical kit allocation released to NDMA-Siliguri Wallet (0x8A...2F).", time: "2h ago", status: "success", icon: Landmark, color: "text-blue-600", iconBg: "bg-blue-50" },
  { type: "ORACLE", title: "Geo-Spatial Consensus Met", desc: "Chainlink DON cryptographically verified field delivery at Lat: 26.65, Lon: 88.35 (Siliguri Relief Camp).", time: "5h ago", status: "verified", icon: ShieldCheck, color: "text-emerald-600", iconBg: "bg-emerald-50" },
  { type: "SYSTEM", title: "Treasury Route Locked", desc: "₹12L locked in Sahayog Vault for 'Assam Flood Response Q3'. Hash: 0x9f2a...88b2.", time: "12h ago", status: "locked", icon: GitCommit, color: "text-indigo-600", iconBg: "bg-indigo-50" },
  { type: "ALERT", title: "Nodal Agency Inactivity", desc: "Governance voting weight decayed by 10% for 12 block officers (Inactive >180 days).", time: "1d ago", status: "admin", icon: AlertTriangle, color: "text-amber-600", iconBg: "bg-amber-50" },
  { type: "GOVERNANCE", title: "Resolution #481 — Dispute", desc: "UMA dispute window opened for Cyclone Dana procurement anomaly. 3 days remaining.", time: "1d ago", status: "dispute", icon: Clock, color: "text-purple-600", iconBg: "bg-purple-50" },
];

const DISASTERS = [
  { id: "NDMA-ASM-2024-F", name: "Assam Floods – Morigaon", raised: 1200000, released: 840000, status: "Active" },
  { id: "NDMA-WB-2024-C", name: "Cyclone Dana – Midnapore", raised: 860000, released: 610000, status: "Active" },
  { id: "NDMA-ASM-2024-L", name: "Landslide – Dima Hasao", raised: 420000, released: 180000, status: "Active" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xl text-xs">
      <p className="font-bold text-slate-900 mb-2">{label}</p>
      {payload.map((e: any, i: number) => (
        <p key={i} style={{ color: e.color }} className="font-medium">
          {e.name}: ₹{e.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      <CreateProposalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-2xl font-black text-slate-900 border-l-4 border-[#0f2c59] pl-3 leading-tight tracking-tight uppercase">Operations Command Center</h1>
          <p className="text-slate-500 text-sm mt-1.5 pl-4">
            Eastern India Relief Operations · <span className="text-[#0f2c59] font-bold">Sahayog Protocol v1.02</span>
          </p>
        </motion.div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-400 hover:border-slate-300 cursor-pointer transition-all shadow-sm">
            <Search size={15} />
            <span>Search hash or address…</span>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary text-sm py-2.5 px-5">
            + Create Proposal
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="stat-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{s.label}</p>
                <p className="text-2xl font-black text-slate-900 mt-2">{s.value}</p>
                <p className={`text-xs font-semibold mt-1.5 flex items-center gap-1 ${
                  s.positive === true ? "text-emerald-600" : s.positive === false ? "text-red-500" : "text-amber-600"
                }`}>
                  {s.positive === true && <TrendingUp size={11} />}
                  {s.positive === false && <TrendingDown size={11} />}
                  {s.change}
                </p>
              </div>
              <div className={`p-2.5 ${s.bg} border ${s.border} rounded-xl`}>
                <s.icon size={18} className={s.color} />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 font-medium">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Capital Flow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="gov-card xl:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-900">Capital Flow Dynamics</h3>
              <p className="text-xs text-slate-500 mt-0.5">Weekly allocation vs actual tranche release (INR)</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />Allocated</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />Released</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={flowData}>
                <defs>
                  <linearGradient id="gAlloc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gRel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 600 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="allocated" name="Allocated" stroke="#1D4ED8" fill="url(#gAlloc)" strokeWidth={2.5} dot={false} />
                <Area type="monotone" dataKey="released" name="Released" stroke="#059669" fill="url(#gRel)" strokeWidth={2.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Tranche Lifecycle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42 }}
          className="gov-card"
        >
          <div className="mb-6">
            <h3 className="font-bold text-slate-900">Tranche Lifecycle</h3>
            <p className="text-xs text-slate-500 mt-0.5">Distribution across verification stages</p>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trancheData} layout="vertical" barCategoryGap={8}>
                <XAxis type="number" hide />
                <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 11, fontWeight: 600 }} width={68} />
                <Tooltip cursor={{ fill: "#F8FAFC" }} content={({ active, payload }) => active && payload?.length ? (
                  <div className="bg-white p-2 rounded-lg border border-slate-200 shadow text-xs font-bold text-slate-900">{payload[0].value} milestones</div>
                ) : null} />
                <Bar dataKey="count" fill="#1D4ED8" radius={[0, 4, 4, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="border-t border-slate-100 pt-4 mt-2">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-slate-500 uppercase tracking-tight">Efficiency Score</span>
              <span className="text-emerald-600 font-black">8.4 / 10</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill bg-emerald-500" style={{ width: "84%" }} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="gov-card xl:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-900 uppercase tracking-tight">Decentralized Audit Ledger</h3>
              <p className="text-xs text-slate-500 mt-0.5">Real-time immutable public records</p>
            </div>
            <button className="btn-ghost text-xs flex items-center gap-1">
              View All <ArrowUpRight size={13} />
            </button>
          </div>
          <div className="space-y-4">
            {FEED.map((item, i) => (
              <div key={i} className="flex gap-3 group">
                <div className={`p-2 ${item.iconBg} rounded-lg shrink-0 h-fit mt-0.5`}>
                  <item.icon size={14} className={item.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900 leading-snug">{item.title}</p>
                    <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap shrink-0">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  <span className={`badge mt-2 ${
                    item.type === "GOVERNANCE" ? "badge-blue" :
                    item.type === "ORACLE" ? "badge-green" :
                    item.type === "ALERT" ? "badge-amber" : "badge-gray"
                  }`}>{item.type}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Active Disaster Pools */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="gov-card flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-900">Active Pools</h3>
              <p className="text-xs text-slate-500 mt-0.5">Live disaster relief fund status</p>
            </div>
            <span className="badge badge-green"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Live</span>
          </div>
          <div className="space-y-5 flex-1">
            {DISASTERS.map((d) => {
              const pct = Math.round((d.released / d.raised) * 100);
              return (
                <div key={d.id}>
                  <div className="flex items-start justify-between mb-1.5">
                    <span className="text-sm font-semibold text-slate-900 leading-snug">{d.name}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mb-2">
                    <span>₹{(d.released / 100000).toFixed(1)}L released</span>
                    <span className="font-bold text-slate-700">{pct}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill bg-blue-600" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 mt-1.5">{d.id}</p>
                </div>
              );
            })}
          </div>

          {/* Network Health */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Network Health</h4>
            <div className="space-y-2.5">
              {[
                { label: "Throughput", val: "42 TPS", color: "text-emerald-600" },
                { label: "Oracle Consensus", val: "98.4%", color: "text-emerald-600" },
                { label: "Sequencer Uptime", val: "99.97%", color: "text-emerald-600" },
                { label: "Pending UMA Disputes", val: "2", color: "text-amber-600" },
              ].map((m) => (
                <div key={m.label} className="flex justify-between text-xs">
                  <span className="text-slate-500">{m.label}</span>
                  <span className={`font-bold ${m.color}`}>{m.val}</span>
                </div>
              ))}
            </div>
            <div className="progress-bar mt-3">
              <div className="progress-fill bg-emerald-500" style={{ width: "98%" }} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
