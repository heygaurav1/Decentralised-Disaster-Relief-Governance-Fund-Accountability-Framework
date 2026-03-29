"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Plus, Search, AlertTriangle, CheckCircle,
  Clock, ChevronRight, DollarSign, Users, FileText,
  Shield, ArrowUpRight, Filter,
} from "lucide-react";

const DISASTERS = [
  {
    id: "ASM-2024-001",
    name: "Assam Floods — Morigaon District",
    description: "Category 4 flooding across 14 blocks of Morigaon. 32,000 people displaced. NDMA declared emergency on 14 July 2024.",
    region: "Assam",
    type: "Flood",
    raised: 12000000,
    released: 8400000,
    beneficiaries: 4200,
    milestones: { total: 8, completed: 6, pending: 2 },
    ngo: "Pratham Health Initiative",
    status: "Active",
    priority: "High",
    coords: "26.14°N, 92.33°E",
    declared: "14 Jul 2024",
  },
  {
    id: "WB-2024-007",
    name: "Cyclone Dana — East Midnapore",
    description: "Cyclone Dana made landfall near Digha with 120 km/h winds. Coastal villages severely impacted. 18,000 evacuated.",
    region: "West Bengal",
    type: "Cyclone",
    raised: 8600000,
    released: 6100000,
    beneficiaries: 3100,
    milestones: { total: 6, completed: 4, pending: 2 },
    ngo: "Sundarbans Relief Corp",
    status: "Active",
    priority: "High",
    coords: "21.62°N, 87.74°E",
    declared: "24 Oct 2024",
  },
  {
    id: "ASM-2024-003",
    name: "Landslide — Dima Hasao Hills",
    description: "Series of landslides on NH-37 severed road connectivity to 6 villages. 2,400 residents stranded for 11 days.",
    region: "Assam",
    type: "Landslide",
    raised: 4200000,
    released: 1800000,
    beneficiaries: 980,
    milestones: { total: 5, completed: 2, pending: 3 },
    ngo: "Hill District Welfare Society",
    status: "Active",
    priority: "Medium",
    coords: "25.56°N, 93.01°E",
    declared: "8 Aug 2024",
  },
  {
    id: "WB-2024-002",
    name: "Drought Relief — Purulia-Bankura",
    description: "Extended drought across Purulia and Bankura districts. Crop failure affecting 28,000 small farmers. Drinking water scarcity declared.",
    region: "West Bengal",
    type: "Drought",
    raised: 6500000,
    released: 4800000,
    beneficiaries: 5200,
    milestones: { total: 7, completed: 5, pending: 1 },
    ngo: "Gram Vikas Foundation",
    status: "Active",
    priority: "Medium",
    coords: "23.34°N, 86.36°E",
    declared: "2 Jun 2024",
  },
  {
    id: "ASM-2023-012",
    name: "Brahmaputra Overflow — Goalpara",
    description: "Major overflow of the Brahmaputra river. 12,000 hectares of farmland submerged. Full relief operation completed.",
    region: "Assam",
    type: "Flood",
    raised: 21000000,
    released: 21000000,
    beneficiaries: 8400,
    milestones: { total: 12, completed: 12, pending: 0 },
    ngo: "ASDMA / Pratham",
    status: "Completed",
    priority: "Critical",
    coords: "26.17°N, 90.62°E",
    declared: "18 Sep 2023",
  },
];

const PRIORITY_MAP: Record<string, string> = {
  Critical: "badge-red",
  High: "badge-amber",
  Medium: "badge-blue",
  Low: "badge-gray",
};

const TYPE_COLORS: Record<string, string> = {
  Flood: "bg-blue-50 text-blue-700",
  Cyclone: "bg-purple-50 text-purple-700",
  Landslide: "bg-amber-50 text-amber-700",
  Drought: "bg-orange-50 text-orange-700",
  Earthquake: "bg-red-50 text-red-700",
};

export default function DisastersPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRegion, setFilterRegion] = useState("all");

  const filtered = DISASTERS.filter((d) => {
    const s = search.toLowerCase();
    const matchSearch = d.name.toLowerCase().includes(s) || d.id.toLowerCase().includes(s);
    const matchStatus = filterStatus === "all" || d.status.toLowerCase() === filterStatus;
    const matchRegion = filterRegion === "all" || d.region === filterRegion;
    return matchSearch && matchStatus && matchRegion;
  });

  const totalRaised = DISASTERS.reduce((a, d) => a + d.raised, 0);
  const totalReleased = DISASTERS.reduce((a, d) => a + d.released, 0);
  const totalBeneficiaries = DISASTERS.reduce((a, d) => a + d.beneficiaries, 0);

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Disaster Relief Pools</h1>
          <p className="text-slate-500 text-sm mt-0.5">All active and completed disaster operations with fund tracking</p>
        </div>
        <button className="btn-primary text-sm py-2.5 px-5 self-start sm:self-auto">
          <Plus size={16} /> Register New Disaster
        </button>
      </div>

      {/* Summary Stat Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Raised", value: `₹${(totalRaised / 10000000).toFixed(2)} Cr`, icon: DollarSign, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Released", value: `₹${(totalReleased / 10000000).toFixed(2)} Cr`, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Beneficiaries", value: totalBeneficiaries.toLocaleString(), icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Active Operations", value: DISASTERS.filter(d => d.status === "Active").length.toString(), icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`p-2.5 ${s.bg} rounded-xl w-fit mb-3`}><s.icon size={18} className={s.color} /></div>
            <p className="text-xl font-black text-slate-900">{s.value}</p>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="gov-card mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by disaster name or ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-10"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-slate-400 shrink-0" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-input py-2 text-sm w-fit pr-8"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="form-input py-2 text-sm w-fit pr-8"
          >
            <option value="all">All Regions</option>
            <option value="Assam">Assam</option>
            <option value="West Bengal">West Bengal</option>
          </select>
        </div>
      </div>

      {/* Disasters Grid */}
      <div className="space-y-4">
        {filtered.map((d, i) => {
          const pct = Math.round((d.released / d.raised) * 100);
          return (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="gov-card"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">{d.id}</span>
                    <span className={`badge text-[11px] font-semibold px-2 py-0.5 rounded-lg ${TYPE_COLORS[d.type]}`}>{d.type}</span>
                    <span className={`badge ${PRIORITY_MAP[d.priority]}`}>{d.priority} Priority</span>
                    <span className={`badge ${d.status === "Active" ? "badge-green" : "badge-gray"} flex items-center gap-1`}>
                      {d.status === "Active" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                      {d.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-[15px] mb-1">{d.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{d.description}</p>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MapPin size={11} />{d.coords}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />Declared {d.declared}</span>
                    <span className="flex items-center gap-1"><Shield size={11} />{d.ngo}</span>
                    <span className="flex items-center gap-1"><Users size={11} />{d.beneficiaries.toLocaleString()} beneficiaries</span>
                    <span className="flex items-center gap-1"><FileText size={11} />{d.milestones.completed}/{d.milestones.total} milestones</span>
                  </div>
                </div>

                {/* Right Metrics */}
                <div className="lg:w-72 shrink-0">
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-500">Funds Released</span>
                        <span className="text-blue-700 font-black">{pct}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className={`progress-fill ${pct === 100 ? "bg-emerald-500" : "bg-blue-600"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs mt-1.5">
                        <span className="text-slate-500">Released: <strong className="text-slate-900">₹{(d.released / 100000).toFixed(1)}L</strong></span>
                        <span className="text-slate-500">Total: <strong className="text-slate-900">₹{(d.raised / 100000).toFixed(1)}L</strong></span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1.5">
                        <span className="text-slate-500">Milestone Progress</span>
                        <span className="text-slate-700">{d.milestones.completed}/{d.milestones.total}</span>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: d.milestones.total }).map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-2 flex-1 rounded-sm ${idx < d.milestones.completed ? "bg-emerald-500" : "bg-slate-200"}`}
                          />
                        ))}
                      </div>
                    </div>

                    <button className="btn-secondary w-full text-xs py-2 flex items-center justify-center gap-1">
                      View Details <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="gov-card text-center py-16">
          <AlertTriangle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="font-semibold text-slate-500">No disasters found matching your filters</p>
        </div>
      )}
    </div>
  );
}
