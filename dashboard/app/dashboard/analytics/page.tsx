"use client";

import { motion } from "framer-motion";
import {
  TrendingUp, DollarSign, Users, CheckCircle,
  Download, Shield, ArrowUpRight, BarChart2,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const monthlyData = [
  { month: "Jan", donated: 4200, released: 3100, beneficiaries: 820 },
  { month: "Feb", donated: 5800, released: 4200, beneficiaries: 1100 },
  { month: "Mar", donated: 3900, released: 3600, beneficiaries: 890 },
  { month: "Apr", donated: 7200, released: 5800, beneficiaries: 1450 },
  { month: "May", donated: 6100, released: 5200, beneficiaries: 1280 },
  { month: "Jun", donated: 8400, released: 7100, beneficiaries: 1780 },
  { month: "Jul", donated: 12000, released: 9400, beneficiaries: 2350 },
  { month: "Aug", donated: 9800, released: 8200, beneficiaries: 2050 },
];

const donorMix = [
  { name: "UPI / Retail", value: 42, color: "#1D4ED8" },
  { name: "Crypto (USDC)", value: 28, color: "#059669" },
  { name: "Corporate CSR", value: 19, color: "#7C3AED" },
  { name: "Anonymous ZK", value: 11, color: "#D97706" },
];

const oracleData = [
  { week: "W1", consensus: 96.2, disputed: 2 },
  { week: "W2", consensus: 98.4, disputed: 1 },
  { week: "W3", consensus: 97.1, disputed: 3 },
  { week: "W4", consensus: 99.2, disputed: 0 },
  { week: "W5", consensus: 98.7, disputed: 1 },
  { week: "W6", consensus: 97.9, disputed: 2 },
  { week: "W7", consensus: 99.5, disputed: 0 },
];

const regionData = [
  { region: "Morigaon", amount: 120, pct: 33 },
  { region: "Midnapore", amount: 86, pct: 24 },
  { region: "Goalpara", amount: 65, pct: 18 },
  { region: "Purulia", amount: 48, pct: 13 },
  { region: "Dima Hasao", amount: 42, pct: 12 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xl text-xs">
      <p className="font-bold text-slate-900 mb-2">{label}</p>
      {payload.map((e: any, i: number) => (
        <p key={i} style={{ color: e.color }} className="font-medium">{e.name}: {e.value.toLocaleString()}</p>
      ))}
    </div>
  );
};

export default function AnalyticsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Transparency Analytics</h1>
          <p className="text-slate-500 text-sm mt-0.5">Complete on-chain capital flow, oracle health, and beneficiary data</p>
        </div>
        <button className="btn-secondary text-sm flex items-center gap-2">
          <Download size={15} /> Export Report
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Utilisation Rate", value: "82.4%", sub: "Funds released vs allocated", positive: true, color: "text-emerald-600", bg: "bg-emerald-50", icon: TrendingUp },
          { label: "Avg Release Time", value: "4.2 days", sub: "Proposal to disbursement", positive: true, color: "text-blue-600", bg: "bg-blue-50", icon: BarChart2 },
          { label: "Oracle Accuracy", value: "98.7%", sub: "7-node Chainlink consensus", positive: true, color: "text-indigo-600", bg: "bg-indigo-50", icon: Shield },
          { label: "Unique Donors", value: "3,241", sub: "Across UPI + crypto channels", positive: true, color: "text-purple-600", bg: "bg-purple-50", icon: Users },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`p-2.5 ${s.bg} rounded-xl w-fit mb-3`}><s.icon size={18} className={s.color} /></div>
            <p className="text-xl font-black text-slate-900">{s.value}</p>
            <p className={`text-xs font-semibold mt-1 ${s.positive ? "text-emerald-600" : "text-slate-400"}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Monthly Flow + Donor Mix */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="gov-card xl:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-900">Monthly Capital Flow</h3>
              <p className="text-xs text-slate-500 mt-0.5">Donations received vs funds disbursed (₹ thousands)</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />Donated</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />Released</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="gDon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gRel2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} tickFormatter={(v) => `₹${v}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="donated" name="Donated" stroke="#1D4ED8" fill="url(#gDon)" strokeWidth={2.5} dot={false} />
                <Area type="monotone" dataKey="released" name="Released" stroke="#059669" fill="url(#gRel2)" strokeWidth={2.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Donor Mix */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.07 }}
          className="gov-card"
        >
          <h3 className="font-bold text-slate-900 mb-1">Donation Channels</h3>
          <p className="text-xs text-slate-500 mb-4">By payment method</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={donorMix} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {donorMix.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v: any) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {donorMix.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="text-slate-600 flex-1">{d.name}</span>
                <span className="font-bold text-slate-900">{d.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Oracle Health + Region Distribution */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="gov-card xl:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-900">Oracle Consensus Health</h3>
              <p className="text-xs text-slate-500 mt-0.5">Weekly Chainlink DON accuracy (7-node aggregate)</p>
            </div>
            <span className="badge badge-green"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Live</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={oracleData}>
                <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} />
                <YAxis domain={[94, 100]} axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="consensus" name="Consensus %" stroke="#059669" strokeWidth={2.5} dot={{ fill: "#059669", r: 4 }} />
                <Bar dataKey="disputed" name="Disputes" fill="#F59E0B" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="gov-card"
        >
          <h3 className="font-bold text-slate-900 mb-1">Funds by Region</h3>
          <p className="text-xs text-slate-500 mb-5">Disbursement across districts (₹L)</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData} layout="vertical" barCategoryGap={8}>
                <XAxis type="number" hide />
                <YAxis dataKey="region" type="category" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 11, fontWeight: 600 }} width={72} />
                <Tooltip formatter={(v: any) => `₹${v}L`} />
                <Bar dataKey="amount" fill="#1D4ED8" radius={[0, 4, 4, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* On-chain Audit Trail */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.27 }}
        className="gov-card"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-slate-900">On-Chain Transaction Audit Trail</h3>
            <p className="text-xs text-slate-500 mt-0.5">Last 10 fund movements — all verifiable on Polygon zkEVM explorer</p>
          </div>
          <button className="btn-ghost text-xs flex items-center gap-1">Block Explorer <ArrowUpRight size={13} /></button>
        </div>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Tx Hash</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Milestone</th>
                <th>Block</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { hash: "0xa1f2…c3d4", type: "Disbursement", from: "ReliefVault", to: "0x82F4…4E5A", amount: "₹8.4L", milestone: "ASM-M-019", block: "4,821,033", status: "Confirmed" },
                { hash: "0xb3e4…d5f6", type: "Donation", from: "0xD3A9…77CC", to: "ReliefVault", amount: "₹1.2L", milestone: "—", block: "4,820,991", status: "Confirmed" },
                { hash: "0xc5f6…e7a8", type: "Allocation", from: "DAO Vote", to: "ASM-2024-001", amount: "₹15L", milestone: "ASM-M-020", block: "4,820,844", status: "Pending" },
                { hash: "0xd7a8…f9b0", type: "Donation (ZK)", from: "Anonymous", to: "ReliefVault", amount: "₹2.5L", milestone: "—", block: "4,820,711", status: "Confirmed" },
                { hash: "0xe9b0…a1c2", type: "Disbursement", from: "ReliefVault", to: "0x44EF…C302", amount: "₹6.1L", milestone: "WB-M-007", block: "4,820,590", status: "Confirmed" },
              ].map((tx, i) => (
                <tr key={i}>
                  <td><span className="font-mono text-xs text-blue-600 hover:underline cursor-pointer">{tx.hash}</span></td>
                  <td><span className={`badge text-[11px] ${tx.type === "Disbursement" ? "badge-blue" : tx.type === "Donation" || tx.type === "Donation (ZK)" ? "badge-green" : "badge-gray"}`}>{tx.type}</span></td>
                  <td className="font-mono text-xs text-slate-600">{tx.from}</td>
                  <td className="font-mono text-xs text-slate-600">{tx.to}</td>
                  <td className="font-bold text-slate-900 text-sm">{tx.amount}</td>
                  <td className="font-mono text-xs text-slate-500">{tx.milestone}</td>
                  <td className="font-mono text-xs text-slate-500">{tx.block}</td>
                  <td><span className={`badge ${tx.status === "Confirmed" ? "badge-green" : "badge-amber"}`}>{tx.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
