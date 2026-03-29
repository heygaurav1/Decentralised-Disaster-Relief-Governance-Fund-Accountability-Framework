"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-700 flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* 404 */}
        <div className="text-[120px] font-black leading-none text-slate-100 select-none mb-2">
          404
        </div>

        <h1 className="text-2xl font-black text-slate-900 mb-3">Page Not Found</h1>
        <p className="text-slate-500 leading-relaxed mb-8">
          This page does not exist in the Sahayog governance portal. It may have been moved, 
          deleted, or you may have followed a broken link.
        </p>

        {/* Search box */}
        <div className="relative mb-8">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search the governance portal…"
            className="form-input pl-12 py-3 text-[15px]"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard" className="btn-primary text-[15px] py-3 px-8">
            <Home size={16} /> Go to Dashboard
          </Link>
          <Link href="/" className="btn-secondary text-[15px] py-3 px-8">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-10 pt-8 border-t border-slate-200">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Links</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/dashboard/proposals", label: "Proposals" },
              { href: "/dashboard/governance", label: "DAO Governance" },
              { href: "/dashboard/disasters", label: "Disaster Pools" },
              { href: "/dashboard/analytics", label: "Transparency" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <p className="absolute bottom-6 text-xs text-slate-400 font-medium">
        Sahayog Protocol · Polygon zkEVM · v1.0.2
      </p>
    </div>
  );
}
