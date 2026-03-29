"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus, Search, Filter, ThumbsUp, ThumbsDown, Clock,
  CheckCircle, XCircle, AlertCircle, ArrowUpRight, Users,
  ChevronRight, FileText,
} from "lucide-react";
import { CreateProposalModal } from "../../../components/CreateProposalModal";

const PROPOSALS = [
  {
    id: "RCP-482",
    title: "Release ₹8.4L for Emergency Medical Supplies — Siliguri",
    description: "Chainlink oracle confirmed 500 medical kits delivered to Siliguri relief camp. Requesting tranche release to NGO 'Pratham Health Initiative' wallet.",
    type: "Tranche Release",
    status: "passed",
    votes: { for: 12840, against: 1320 },
    quorum: 78,
    deadline: "Passed 2h ago",
    proposer: "0x82F4…4E5A",
    milestoneId: "ASM-M-019",
    disasterId: "WB-2024-007",
  },
  {
    id: "RCP-483",
    title: "Allocate ₹15L for Flood Relief — Goalpara District",
    description: "NDMA has declared Goalpara a Category 3 flood zone. Proposal to allocate funds from general relief pool for immediate relief operations over 30 days.",
    type: "Fund Allocation",
    status: "active",
    votes: { for: 8200, against: 3100 },
    quorum: 52,
    deadline: "38h remaining",
    proposer: "0xD3A9…77CC",
    milestoneId: null,
    disasterId: "ASM-2024-003",
  },
  {
    id: "RCP-484",
    title: "Onboard NGO — Assam State Disaster Management Authority",
    description: "Register ASDMA as an official NGO partner with tier-2 milestone submission rights. Requires 2-of-3 guardian approval in addition to DAO vote.",
    type: "NGO Onboarding",
    status: "active",
    votes: { for: 5400, against: 800 },
    quorum: 41,
    deadline: "60h remaining",
    proposer: "0x1BCD…9F2A",
    milestoneId: null,
    disasterId: null,
  },
  {
    id: "RCP-481",
    title: "Update MAX_SINGLE_TX Cap from ₹5L to ₹10L",
    description: "Current per-transaction cap of ₹5L creates operational friction for large-scale relief. Proposing doubling cap to ₹10L with guardian multisig co-sign requirement.",
    type: "Protocol Parameter",
    status: "timelock",
    votes: { for: 14200, against: 2100 },
    quorum: 88,
    deadline: "Execution in 31h",
    proposer: "0x9FFA…AB12",
    milestoneId: null,
    disasterId: null,
  },
  {
    id: "RCP-479",
    title: "Refund ₹2.1L — Cancelled Dima Hasao Operation",
    description: "Field operation in Dima Hasao cancelled due to road access issues. Returning unspent tranche to disaster pool for reallocation.",
    type: "Refund",
    status: "rejected",
    votes: { for: 2100, against: 8900 },
    quorum: 68,
    deadline: "Closed 3d ago",
    proposer: "0x44EF…C302",
    milestoneId: "ASM-M-014",
    disasterId: "ASM-2024-003",
  },
];

const STATUS_MAP: Record<string, { label: string; class: string; icon: any }> = {
  passed:   { label: "Passed",    class: "badge-green",  icon: CheckCircle },
  active:   { label: "Active",    class: "badge-blue",   icon: Clock },
  timelock: { label: "Timelock",  class: "badge-amber",  icon: AlertCircle },
  rejected: { label: "Rejected",  class: "badge-red",    icon: XCircle },
  disputed: { label: "Disputed",  class: "badge-amber",  icon: AlertCircle },
};

const TYPE_COLORS: Record<string, string> = {
  "Tranche Release":    "badge-green",
  "Fund Allocation":    "badge-blue",
  "NGO Onboarding":     "badge-gray",
  "Protocol Parameter": "badge-amber",
  "Refund":             "badge-gray",
};

export default function ProposalsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [voting, setVoting] = useState<Record<string, "for" | "against">>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = PROPOSALS.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || p.status === filter;
    return matchSearch && matchFilter;
  });

  function castVote(id: string, side: "for" | "against") {
    setVoting((v) => ({ ...v, [id]: side }));
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      <CreateProposalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">DAO Proposals</h1>
          <p className="text-slate-500 text-sm mt-0.5">Vote on fund allocations, milestone releases, and protocol changes</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary text-sm py-2.5 px-5 self-start sm:self-auto">
          <Plus size={16} /> New Proposal
        </button>
      </div>

      {/* Filters */}
      <div className="gov-card mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title or proposal ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-10"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-slate-400 shrink-0" />
          {["all", "active", "passed", "timelock", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f === "all" ? "All Proposals" : f}
            </button>
          ))}
        </div>
      </div>

      {/* Counts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Active", count: PROPOSALS.filter(p => p.status === "active").length, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Passed", count: PROPOSALS.filter(p => p.status === "passed").length, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "In Timelock", count: PROPOSALS.filter(p => p.status === "timelock").length, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Rejected", count: PROPOSALS.filter(p => p.status === "rejected").length, color: "text-red-600", bg: "bg-red-50" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl px-4 py-3 border border-transparent`}>
            <p className={`text-2xl font-black ${s.color}`}>{s.count}</p>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {filtered.map((p, i) => {
          const st = STATUS_MAP[p.status];
          const totalVotes = p.votes.for + p.votes.against;
          const forPct = Math.round((p.votes.for / totalVotes) * 100);
          const myVote = voting[p.id];

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="gov-card"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                <div className="flex-1 min-w-0">
                  {/* Top row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-slate-400">{p.id}</span>
                    <span className={`badge ${TYPE_COLORS[p.type]}`}>{p.type}</span>
                    <span className={`badge ${st.class} flex items-center gap-1`}>
                      <st.icon size={10} />
                      {st.label}
                    </span>
                    {p.disasterId && (
                      <span className="badge badge-gray font-mono">{p.disasterId}</span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-[15px] leading-snug mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{p.description}</p>

                  {/* Vote bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs font-semibold mb-1.5">
                      <span className="text-emerald-600 flex items-center gap-1"><ThumbsUp size={11} />{p.votes.for.toLocaleString()} For ({forPct}%)</span>
                      <span className="text-red-500 flex items-center gap-1">{100 - forPct}% Against <ThumbsDown size={11} /></span>
                    </div>
                    <div className="h-2 bg-red-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${forPct}%` }} />
                    </div>
                  </div>

                  {/* Quorum */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Users size={11} />Quorum: <strong className={p.quorum >= 10 ? "text-emerald-600" : "text-amber-600"}>{p.quorum}%</strong> / 10%</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{p.deadline}</span>
                    <span>Proposer: <span className="font-mono">{p.proposer}</span></span>
                  </div>
                </div>

                {/* Actions */}
                {p.status === "active" && (
                  <div className="flex flex-row lg:flex-col gap-2 shrink-0">
                    <button
                      onClick={() => castVote(p.id, "for")}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                        myVote === "for"
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      }`}
                    >
                      <ThumbsUp size={14} />
                      {myVote === "for" ? "Voted For" : "Vote For"}
                    </button>
                    <button
                      onClick={() => castVote(p.id, "against")}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                        myVote === "against"
                          ? "bg-red-600 border-red-600 text-white"
                          : "border-red-300 text-red-600 hover:bg-red-50"
                      }`}
                    >
                      <ThumbsDown size={14} />
                      {myVote === "against" ? "Voted Against" : "Vote Against"}
                    </button>
                  </div>
                )}

                {p.status !== "active" && (
                  <button className="btn-ghost text-xs shrink-0 flex items-center gap-1">
                    Details <ChevronRight size={13} />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="gov-card text-center py-16">
          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="font-semibold text-slate-500">No proposals found</p>
          <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
}
