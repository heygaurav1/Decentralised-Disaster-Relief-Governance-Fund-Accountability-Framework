"use client";

import DashboardCard from "./DashboardCard";
import { MapPin, Info } from "lucide-react";

export default function ImpactMap() {
  return (
    <DashboardCard 
      title="Regional Impact Analysis" 
      subtitle="Relief distribution across Assam and West Bengal"
      icon={<MapPin className="w-5 h-5" />}
    >
      <div className="relative aspect-[16/9] w-full bg-white/5 rounded-xl overflow-hidden border border-white/10 mt-4">
        {/* Simple SVG Map Representation */}
        <svg viewBox="0 0 800 450" className="w-full h-full opacity-60">
          <path
            d="M200,100 Q300,50 400,150 T600,100"
            fill="none"
            stroke="var(--brand-primary)"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
          {/* Mock Heatmap Circles */}
          <circle cx="250" cy="180" r="10" fill="var(--brand-secondary)" opacity="0.6">
            <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="450" cy="120" r="15" fill="var(--brand-primary)" opacity="0.6">
            <animate attributeName="r" values="12;18;12" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="550" cy="220" r="8" fill="var(--accent-blue)" opacity="0.6" />
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 p-3 glass rounded-lg border border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] text-white/60">High Priority Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-[10px] text-white/60">Released Relief</span>
            </div>
          </div>
        </div>

        {/* Live Status Overlay */}
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
          <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Live Updates</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-xl flex gap-3">
        <Info className="w-5 h-5 text-primary shrink-0" />
        <p className="text-xs text-white/60 leading-relaxed">
          The map displays real-time relief distribution nodes. Click on a node to view 
          <span className="text-white"> IPFS-backed forensic evidence</span> and tranche status.
        </p>
      </div>
    </DashboardCard>
  );
}
