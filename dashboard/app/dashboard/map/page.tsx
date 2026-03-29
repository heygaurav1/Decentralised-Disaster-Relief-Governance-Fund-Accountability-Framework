"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ZoomIn, ZoomOut, Info, Navigation } from "lucide-react";

const NODES = [
  { id: "ASM-001", x: 420, y: 155, r: 22, label: "Morigaon", subLabel: "₹84L released", color: "#DC2626", priority: "Critical", status: "Active" },
  { id: "ASM-003", x: 490, y: 200, r: 14, label: "Dima Hasao", subLabel: "₹18L released", color: "#D97706", priority: "Medium", status: "Active" },
  { id: "ASM-012", x: 340, y: 130, r: 18, label: "Goalpara", subLabel: "Completed", color: "#059669", priority: "High", status: "Completed" },
  { id: "WB-007", x: 580, y: 295, r: 20, label: "Midnapore", subLabel: "₹61L released", color: "#DC2626", priority: "High", status: "Active" },
  { id: "WB-002", x: 530, y: 260, r: 13, label: "Purulia", subLabel: "₹48L released", color: "#D97706", priority: "Medium", status: "Active" },
  { id: "ASM-002", x: 370, y: 165, r: 10, label: "Barpeta", subLabel: "Monitoring", color: "#2563EB", priority: "Low", status: "Monitor" },
  { id: "WB-003", x: 610, y: 250, r: 9, label: "Bankura", subLabel: "Monitoring", color: "#2563EB", priority: "Low", status: "Monitor" },
];

const LEGEND = [
  { color: "#DC2626", label: "Critical / High — Active relief" },
  { color: "#D97706", label: "Medium — Ongoing operations" },
  { color: "#059669", label: "Completed operations" },
  { color: "#2563EB", label: "Monitoring / low priority" },
];

export default function MapPage() {
  const [selected, setSelected] = useState<typeof NODES[0] | null>(null);
  const [zoom, setZoom] = useState(1);

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Impact Map</h1>
          <p className="text-slate-500 text-sm mt-0.5">Real-time relief distribution nodes — Assam & West Bengal</p>
        </div>
        <span className="badge badge-green">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live Feed
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Map Panel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:col-span-3 gov-card p-0 overflow-hidden"
        >
          {/* Map toolbar */}
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Navigation size={15} className="text-blue-600" />
              Eastern India — Disaster Zone View
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom((z) => Math.min(z + 0.2, 2))}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <ZoomIn size={15} className="text-slate-600" />
              </button>
              <button
                onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <ZoomOut size={15} className="text-slate-600" />
              </button>
              <span className="text-xs font-mono font-semibold text-slate-500 ml-1">{Math.round(zoom * 100)}%</span>
            </div>
          </div>

          {/* SVG Map */}
          <div className="relative bg-slate-50 overflow-hidden" style={{ height: "480px" }}>
            <svg
              viewBox="0 0 800 480"
              className="w-full h-full"
              style={{ transform: `scale(${zoom})`, transformOrigin: "center center", transition: "transform 0.3s ease" }}
            >
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="0.5" />
                </pattern>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <rect width="800" height="480" fill="url(#grid)" />

              {/* River lines (approximate Brahmaputra + Ganga) */}
              <path d="M80,140 Q180,120 280,145 Q380,165 480,150 Q560,140 640,160" fill="none" stroke="#BFDBFE" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
              <path d="M300,300 Q420,280 540,310 Q620,325 700,300" fill="none" stroke="#BFDBFE" strokeWidth="3" strokeLinecap="round" opacity="0.5" />

              {/* State border rough outlines */}
              <path d="M200,100 Q320,70 450,110 Q540,130 580,100 Q640,80 700,120 L720,200 Q700,280 640,340 Q580,390 500,400 Q420,410 360,380 Q300,350 260,300 Q220,260 200,200 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="6,4" />
              <text x="310" y="92" fill="#94A3B8" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="2">ASSAM</text>
              <text x="480" y="360" fill="#94A3B8" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="2">WEST BENGAL</text>

              {/* Connection lines between nodes */}
              {NODES.slice(0, 4).map((n, i) =>
                NODES.slice(i + 1, i + 3).map((m) => (
                  <line key={`${n.id}-${m.id}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
                ))
              )}

              {/* Nodes */}
              {NODES.map((node) => (
                <g
                  key={node.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelected(selected?.id === node.id ? null : node)}
                >
                  {/* Ping ring for active */}
                  {node.status === "Active" && (
                    <circle cx={node.x} cy={node.y} r={node.r + 8} fill={node.color} opacity="0.12">
                      <animate attributeName="r" values={`${node.r + 4};${node.r + 14};${node.r + 4}`} dur="2.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.12;0;0.12" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                  )}

                  {/* Main circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r}
                    fill={node.color}
                    opacity={selected?.id === node.id ? 1 : 0.82}
                    stroke="white"
                    strokeWidth="2.5"
                    filter="url(#glow)"
                  />

                  {/* Label */}
                  <text x={node.x} y={node.y + node.r + 14} textAnchor="middle" fill="#1E293B" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>

            {/* Legend overlay */}
            <div className="absolute bottom-4 left-4 bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Legend</p>
              <div className="space-y-1.5">
                {LEGEND.map((l) => (
                  <div key={l.label} className="flex items-center gap-2 text-[11px] text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: l.color }} />
                    {l.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Selected Node Info */}
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              className="gov-card border-blue-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-400">{selected.id}</span>
                  <h3 className="font-bold text-slate-900 text-base mt-0.5">{selected.label}</h3>
                </div>
                <span
                  className="badge text-[11px]"
                  style={{ background: selected.color + "20", color: selected.color, borderColor: selected.color + "40" }}
                >
                  {selected.priority}
                </span>
              </div>
              <p className="text-sm text-slate-600 font-semibold mb-4">{selected.subLabel}</p>
              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex justify-between"><span>Status</span><span className="font-bold text-slate-900">{selected.status}</span></div>
                <div className="flex justify-between"><span>Coordinates</span><span className="font-mono text-slate-700">See IPFS</span></div>
              </div>
              <button className="btn-secondary w-full mt-4 text-xs py-2">View IPFS Proof Bundle</button>
            </motion.div>
          ) : (
            <div className="gov-card text-center py-8">
              <MapPin className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-500">Click a node on the map</p>
              <p className="text-xs text-slate-400 mt-1">to view relief details</p>
            </div>
          )}

          {/* All Nodes List */}
          <div className="gov-card">
            <h4 className="font-bold text-slate-900 mb-4 text-sm">All Relief Nodes</h4>
            <div className="space-y-2">
              {NODES.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setSelected(selected?.id === n.id ? null : n)}
                  className={`w-full text-left flex items-center gap-3 p-2.5 rounded-xl transition-all border ${
                    selected?.id === n.id ? "border-blue-200 bg-blue-50" : "border-transparent hover:bg-slate-50"
                  }`}
                >
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: n.color }} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-900 truncate">{n.label}</p>
                    <p className="text-[11px] text-slate-400 truncate">{n.subLabel}</p>
                  </div>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${n.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Info notice */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex gap-2">
            <Info size={14} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 leading-relaxed">
              Each node pins an IPFS evidence bundle including geo-tagged photos, invoices, and beneficiary acknowledgements. 
              <span className="font-semibold"> Verified by Chainlink oracle.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
