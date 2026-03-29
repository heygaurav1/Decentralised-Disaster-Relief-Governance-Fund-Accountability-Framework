"use client";

import DashboardCard from "./DashboardCard";
import { GitCommit, ShieldCheck, Landmark, AlertTriangle } from "lucide-react";

const feedItems = [
  {
    type: "GOVERNANCE",
    title: "Proposal #482 Passed",
    description: "Emergency medical supply tranche release for Siliguri region.",
    time: "2h ago",
    status: "Success",
    icon: <Landmark className="w-4 h-4 text-primary" />,
  },
  {
    type: "ORACLE",
    title: "Location Verified",
    description: "Multi-sig committee confirmed delivery at 26.1433° N, 91.7362° E.",
    time: "5h ago",
    status: "Verified",
    icon: <ShieldCheck className="w-4 h-4 text-secondary" />,
  },
  {
    type: "SYSTEM",
    title: "New Tranche Initialized",
    description: "0.5 ETH locked in ReliefFundCustody for 'Assam Flood Response'.",
    time: "12h ago",
    status: "Locked",
    icon: <GitCommit className="w-4 h-4 text-accent-blue" />,
  },
  {
    type: "ALERT",
    title: "Voting Weight Decay",
    description: "Governance power for 12 inactive responders has been reduced by 10%.",
    time: "1d ago",
    status: "Admin",
    icon: <AlertTriangle className="w-4 h-4 text-orange-500" />,
  },
];

export default function GovernanceFeed() {
  return (
    <DashboardCard title="Protocol Audit Feed" subtitle="Real-time governance and oracle events">
      <div className="space-y-6 mt-4">
        {feedItems.map((item, index) => (
          <div key={index} className="flex gap-4 group">
            <div className="flex flex-col items-center">
              <div className="p-2 bg-white/5 rounded-full border border-white/10 group-hover:border-primary/50 transition-colors">
                {item.icon}
              </div>
              {index !== feedItems.length - 1 && (
                <div className="w-px h-full bg-gradient-to-b from-white/10 to-transparent my-2" />
              )}
            </div>
            <div className="flex-1 pb-6 border-b border-white/5 last:border-0">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-semibold text-white/90">{item.title}</h4>
                <span className="text-[10px] uppercase tracking-wider text-white/30 font-medium whitespace-nowrap">
                  {item.time}
                </span>
              </div>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-center gap-2 mt-3 text-[10px] font-medium uppercase tracking-tighter">
                <span className="px-2 py-0.5 rounded bg-white/5 text-white/40 border border-white/10">
                  {item.type}
                </span>
                <span className={`px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary`}>
                   {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-2 text-xs font-medium text-white/40 hover:text-white transition-colors border-t border-white/5 pt-4">
        View Full Audit Trail →
      </button>
    </DashboardCard>
  );
}
