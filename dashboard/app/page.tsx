"use client";

import { motion } from "framer-motion";
import StatsOverview from "@/components/StatsOverview";
import CapitalFlowChart from "@/components/CapitalFlowChart";
import GovernanceFeed from "@/components/GovernanceFeed";
import ImpactMap from "@/components/ImpactMap";
import Navbar from "@/components/Navbar";
import { Bell, Search, Info } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
        <Navbar />
      
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold tracking-tight text-gradient mb-1">
              Transparency & Governance
            </h1>
            <p className="text-white/40 text-sm font-medium">
              Real-time monitoring of <span className="text-white/60 underline decoration-primary/30">Relief Protocol v1.02</span>
            </p>
          </motion.div>

          {/* Top Bar Actions */}
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                <Search size={18} className="text-white/30" />
                <span className="text-[13px] text-white/30 font-medium">Search hash or address...</span>
            </div>
            
            <button className="relative p-2.5 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all">
                <div className="absolute top-2 right-2.5 w-2 h-2 bg-secondary rounded-full animate-ping" />
                <div className="absolute top-2 right-2.5 w-2 h-2 bg-secondary rounded-full" />
                <Bell size={20} className="text-white/50" />
            </button>

            <button className="flex items-center gap-2.5 px-6 py-2.5 bg-primary rounded-xl font-bold text-[13px] shadow-lg glow-primary hover:brightness-110 transition-all border border-white/10">
                Create Proposal
            </button>
          </div>
        </header>

        {/* Dashboard Sections */}
        <StatsOverview />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 flex flex-col gap-8">
                <CapitalFlowChart />
                <ImpactMap />
            </div>
            
            <aside className="lg:col-span-1">
                <GovernanceFeed />
                
                {/* Protocol Health Widget */}
                <div className="mt-8 glass-card bg-primary/5 border-primary/20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Info size={16} className="text-primary" />
                        </div>
                        <h4 className="text-sm font-bold">Network Health</h4>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between text-xs">
                            <span className="text-white/40">Throughput</span>
                            <span className="text-secondary">42 TPS</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-white/40">Responders Bound</span>
                            <span className="text-secondary">100%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-white/40">Oracle Consensus</span>
                            <span className="text-secondary">98.4%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-primary/40 w-[98%]" />
                        </div>
                    </div>
                </div>
            </aside>
        </div>

        {/* Footer info */}
        <footer className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-[11px] font-medium uppercase tracking-widest">
            <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Documentation</a>
                <a href="#" className="hover:text-white transition-colors">Security Audit</a>
                <a href="#" className="hover:text-white transition-colors">Smart Contracts</a>
            </div>
            <div className="px-4 py-1.5 glass rounded-full border border-white/10">
                Polygon Cardona Testnet
            </div>
        </footer>
      </main>
    </div>
  );
}
