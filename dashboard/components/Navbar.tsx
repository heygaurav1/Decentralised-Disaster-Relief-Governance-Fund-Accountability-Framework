"use client";

import { LayoutDashboard, FileText, Shield, PieChart, Info, Settings, LogOut, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { id: "dashboard", label: "Overview", icon: <LayoutDashboard size={20} />, active: true },
  { id: "proposals", label: "Proposals", icon: <FileText size={20} /> },
  { id: "governance", label: "DAO", icon: <Shield size={20} /> },
  { id: "analytics", label: "Transparency", icon: <PieChart size={20} /> },
  { id: "about", label: "Help Center", icon: <Info size={20} /> },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-0 lg:w-64 bg-background border-r border-white/5 z-50 flex flex-col p-6 transition-all">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-12 group pointer-events-none">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-primary">
          <Shield className="text-white w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg tracking-tight leading-none">ReliefChain</span>
          <span className="text-[10px] text-white/30 uppercase tracking-widest mt-1 font-semibold">Governance Protocol</span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <div key={item.id} className="relative group">
             {item.active && (
              <motion.div 
                layoutId="active-pill"
                className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Link 
              href={`/${item.id}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative z-10 ${
                item.active ? "text-primary font-semibold" : "text-white/40 hover:text-white"
              }`}
            >
              <div className={item.active ? "text-primary" : "text-white/40"}>{item.icon}</div>
              <span className="text-sm tracking-tight">{item.label}</span>
            </Link>
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto space-y-6">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
                <div className="flex flex-col">
                    <span className="text-xs font-semibold">0x82...4E5</span>
                    <span className="text-[10px] text-white/30 uppercase">Senior Responder</span>
                </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10">
                <Wallet size={14} className="text-primary" />
                Disconnect
            </button>
        </div>

        <nav className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-white/40 hover:text-white transition-colors text-sm">
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-red-500/60 hover:text-red-500 transition-colors text-sm">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}
