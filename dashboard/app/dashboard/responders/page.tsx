"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Shield, CheckCircle, Clock, Search,
  Plus, MapPin, Star, ArrowUpRight, Filter, Award,
} from "lucide-react";

const RESPONDERS = [
  { address: "0x82F4…4E5A", name: "Rajesh Kumar Sharma", org: "Pratham Health Initiative", role: "NGO Coordinator", region: "Assam", milestones: 14, tokens: 4200, votes: 64, passport: 24, aadhaar: true, joined: "Jan 2024", status: "Active", tier: "Senior" },
  { address: "0xD3A9…77CC", name: "Priya Sharma", org: "Sundarbans Relief Corp", role: "Field Coordinator", region: "West Bengal", milestones: 9, tokens: 1800, votes: 42, passport: 18, aadhaar: true, joined: "Feb 2024", status: "Active", tier: "Member" },
  { address: "0x1BCD…9F2A", name: "Arjun Das", org: "ASDMA Partner", role: "Government Observer", region: "Assam", milestones: 3, tokens: 9600, votes: 97, passport: 31, aadhaar: false, joined: "Mar 2024", status: "Active", tier: "Observer" },
  { address: "0x44EF…C302", name: "Sunita Bora", org: "Hill District Welfare", role: "Community Verifier", region: "Assam", milestones: 7, tokens: 600, votes: 24, passport: 16, aadhaar: true, joined: "Apr 2024", status: "Active", tier: "Member" },
  { address: "0x9FFA…AB12", name: "Mohammed Irfan", org: "Independent", role: "Community Verifier", region: "West Bengal", milestones: 5, tokens: 400, votes: 20, passport: 15, aadhaar: true, joined: "May 2024", status: "Active", tier: "Member" },
  { address: "0xC3AB…1F2E", name: "Devika Roy", org: "Gram Vikas Foundation", role: "NGO Coordinator", region: "West Bengal", milestones: 11, tokens: 3200, votes: 56, passport: 22, aadhaar: true, joined: "Jan 2024", status: "Inactive", tier: "Senior" },
  { address: "0xE4CD…3A4B", name: "Bikash Kalita", org: "ASDMA", role: "Field Coordinator", region: "Assam", milestones: 6, tokens: 900, votes: 30, passport: 19, aadhaar: true, joined: "Jun 2024", status: "Active", tier: "Member" },
];

const TIER_CONFIG: Record<string, { class: string; icon: any }> = {
  Senior:   { class: "badge-amber",  icon: Award },
  Member:   { class: "badge-blue",   icon: Users },
  Observer: { class: "badge-gray",   icon: Shield },
};

export default function RespondersPage() {
  const [search, setSearch] = useState("");
  const [filterRegion, setFilterRegion] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = RESPONDERS.filter((r) => {
    const s = search.toLowerCase();
    const m = r.name.toLowerCase().includes(s) || r.org.toLowerCase().includes(s) || r.address.toLowerCase().includes(s);
    const reg = filterRegion === "all" || r.region === filterRegion;
    const st = filterStatus === "all" || r.status.toLowerCase() === filterStatus;
    return m && reg && st;
  });

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Responders Registry</h1>
          <p className="text-slate-500 text-sm mt-0.5">All registered NGO coordinators, field verifiers, and community responders</p>
        </div>
        <button className="btn-primary text-sm py-2.5 px-5 self-start sm:self-auto">
          <Plus size={16} /> Invite Responder
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Responders", value: "142", sub: "Across Assam & WB", color: "text-blue-600", bg: "bg-blue-50", icon: Users },
          { label: "Senior Tier", value: "28", sub: "10+ milestones completed", color: "text-amber-600", bg: "bg-amber-50", icon: Award },
          { label: "Avg Passport Score", value: "21.4", sub: "Sybil resistance metric", color: "text-indigo-600", bg: "bg-indigo-50", icon: Star },
          { label: "Aadhaar Verified", value: "89%", sub: "ZK-proof linked wallets", color: "text-emerald-600", bg: "bg-emerald-50", icon: Shield },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`p-2.5 ${s.bg} rounded-xl w-fit mb-3`}><s.icon size={18} className={s.color} /></div>
            <p className="text-xl font-black text-slate-900">{s.value}</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="gov-card mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, organisation, or wallet…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-10"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-slate-400 shrink-0" />
          <select value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)} className="form-input py-2 text-sm w-fit">
            <option value="all">All Regions</option>
            <option value="Assam">Assam</option>
            <option value="West Bengal">West Bengal</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="form-input py-2 text-sm w-fit">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
        {filtered.map((r, i) => {
          const tierCfg = TIER_CONFIG[r.tier];
          return (
            <motion.div
              key={r.address}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="gov-card"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {r.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm leading-snug">{r.name}</p>
                    <p className="text-xs text-slate-500 truncate max-w-[160px]">{r.org}</p>
                  </div>
                </div>
                <span className={`badge ${r.status === "Active" ? "badge-green" : "badge-gray"} flex items-center gap-1`}>
                  {r.status === "Active" && <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />}
                  {r.status}
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className={`badge ${tierCfg.class} flex items-center gap-1`}>
                  <tierCfg.icon size={9} />{r.tier} Responder
                </span>
                <span className="badge badge-gray">{r.role}</span>
                <span className="badge badge-gray flex items-center gap-1"><MapPin size={9} />{r.region}</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Milestones", value: r.milestones },
                  { label: "Gov Votes", value: r.votes },
                  { label: "Passport", value: r.passport },
                ].map((m) => (
                  <div key={m.label} className="bg-slate-50 rounded-lg p-2.5 text-center border border-slate-100">
                    <p className="text-base font-black text-slate-900">{m.value}</p>
                    <p className="text-[10px] font-semibold text-slate-500 mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  {r.aadhaar ? (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                      <CheckCircle size={11} />Aadhaar ZK
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                      <Clock size={11} />Not linked
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-slate-400">{r.address}</span>
                  <button className="btn-ghost text-xs p-1"><ArrowUpRight size={13} /></button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="gov-card"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-900">Full Registry Table</h3>
          <button className="btn-ghost text-xs flex items-center gap-1">Export CSV <ArrowUpRight size={13} /></button>
        </div>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Name / Wallet</th>
                <th>Organisation</th>
                <th>Role</th>
                <th>Region</th>
                <th>Milestones</th>
                <th>RELIEF Tokens</th>
                <th>Quadratic Votes</th>
                <th>Passport</th>
                <th>Aadhaar</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.address}>
                  <td>
                    <div className="font-semibold text-slate-900 text-sm">{r.name}</div>
                    <div className="font-mono text-[11px] text-slate-400">{r.address}</div>
                  </td>
                  <td className="text-slate-600 text-sm">{r.org}</td>
                  <td><span className="badge badge-gray text-[11px]">{r.role}</span></td>
                  <td className="text-slate-600 text-sm flex items-center gap-1"><MapPin size={11} className="text-blue-500" />{r.region}</td>
                  <td className="font-bold text-slate-900">{r.milestones}</td>
                  <td className="font-bold text-slate-900">{r.tokens.toLocaleString()}</td>
                  <td className="font-black text-blue-700">{r.votes}</td>
                  <td><span className={`badge ${r.passport >= 15 ? "badge-green" : "badge-amber"}`}>{r.passport}/15</span></td>
                  <td>
                    {r.aadhaar
                      ? <span className="badge badge-green flex items-center gap-1 w-fit"><CheckCircle size={9} />Yes</span>
                      : <span className="badge badge-gray w-fit">No</span>}
                  </td>
                  <td className="text-slate-500 text-sm">{r.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
