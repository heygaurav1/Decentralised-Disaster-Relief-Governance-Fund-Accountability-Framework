"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, Shield, BarChart3,
  MapPin, Bell, Settings, LogOut, ChevronDown,
  Menu, X, Wallet, Globe, Users,
} from "lucide-react";
import { BrandLogo } from "../../components/BrandLogo";
import { WalletConnect } from "../../components/WalletConnect";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/proposals", label: "Proposals", icon: FileText },
  { href: "/dashboard/governance", label: "DAO Governance", icon: Shield },
  { href: "/dashboard/disasters", label: "Disaster Pools", icon: Globe },
  { href: "/dashboard/analytics", label: "Transparency", icon: BarChart3 },
  { href: "/dashboard/map", label: "Impact Map", icon: MapPin },
  { href: "/dashboard/responders", label: "Responders", icon: Users },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="px-5 py-5 border-b-4 border-[#ff9933] bg-[#0f2c59]">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center shrink-0 shadow-inner p-1">
              <BrandLogo className="w-full h-full" color="#0f2c59" />
            </div>
            <div>
              <div className="font-black text-[16px] leading-none tracking-wide text-white">SAHAYOG</div>
              <div className="text-[9.5px] text-[#ff9933] uppercase tracking-widest mt-1 font-bold">State Command Center</div>
            </div>
          </Link>
        </div>

        {/* Network status */}
        <div className="mx-3 mt-3 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-[11px] font-semibold text-emerald-700">Polygon zkEVM · Live</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 pt-4 space-y-0.5 overflow-y-auto">
          <p className="section-label px-2 mb-2">Navigation</p>
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`sidebar-link ${active ? "active" : ""}`}
              >
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-5 pt-4 border-t border-slate-100 mt-auto space-y-1">
          <Link href="/dashboard/settings" className="sidebar-link">
            <Settings size={17} />
            Settings
          </Link>
          <Link href="/" className="sidebar-link text-red-500 hover:text-red-700 hover:bg-red-50">
            <LogOut size={17} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-[260px]">
        {/* Gov Top Strip */}
        <div className="bg-[#0f2c59] text-white text-[11px] py-1.5 px-5 hidden md:flex items-center justify-between z-40 relative">
          <div className="flex items-center gap-3">
             <span className="font-semibold tracking-wide flex items-center gap-2">
               <svg width="15" height="10" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <rect width="16" height="3.7" fill="#FF9933" />
                 <rect y="3.7" width="16" height="3.6" fill="#FFFFFF" />
                 <rect y="7.3" width="16" height="3.7" fill="#138808" />
                 <circle cx="8" cy="5.5" r="1.5" fill="#000080" />
               </svg>
               भारत सरकार | GOVERNMENT OF INDIA
             </span>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-slate-300">
             <span>राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA)</span>
             <span className="border-l border-white/20 pl-4 font-mono tracking-wider">AADHAAR VERIFIED SESSION</span>
          </div>
        </div>

        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-5 py-0 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden btn-ghost p-2"
            >
              <Menu size={20} />
            </button>
            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500">
              <Link href="/dashboard" className="hover:text-slate-900 transition-colors font-medium">Dashboard</Link>
              {pathname !== "/dashboard" && (
                <>
                  <ChevronDown size={13} className="-rotate-90 text-slate-300" />
                  <span className="text-slate-900 font-semibold capitalize">
                    {pathname.split("/").pop()?.replace(/-/g, " ")}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Real Wallet indicator */}
            <WalletConnect />

            {/* Notifications */}
            <button className="relative p-2 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-200 transition-all">
              <Bell size={18} className="text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-white" />
            </button>

            {/* User avatar */}
            <button className="flex items-center gap-2 pl-1 pr-3 py-1 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-200 transition-all">
              <div className="w-7 h-7 rounded-full bg-[#0f2c59] flex items-center justify-center text-[10px] font-bold text-white border border-[#0a1e3f]">
                AD
              </div>
              <div className="hidden md:flex flex-col items-start ml-1">
                 <span className="text-xs font-bold text-slate-800 leading-none">A. Das, IAS</span>
                 <span className="text-[9px] font-semibold text-slate-500 tracking-wide mt-0.5 uppercase">Jt. Secy, Assam</span>
              </div>
              <ChevronDown size={13} className="text-slate-400 hidden md:block ml-1" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
