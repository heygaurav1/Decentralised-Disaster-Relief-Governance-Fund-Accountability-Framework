"use client";

import { motion } from "framer-motion";
import { DollarSign, Users, FileText, CheckCircle } from "lucide-react";

const stats = [
  {
    label: "Total Relief Funds",
    value: "$1.2M",
    change: "+12.5%",
    icon: <DollarSign className="w-5 h-5" />,
    color: "text-brand-secondary",
  },
  {
    label: "Active Responders",
    value: "142",
    change: "+3",
    icon: <Users className="w-5 h-5" />,
    color: "text-primary",
  },
  {
    label: "Active Proposals",
    value: "24",
    change: "5 Pending",
    icon: <FileText className="w-5 h-5" />,
    color: "text-accent-blue",
  },
  {
    label: "Impact Verified",
    value: "92%",
    change: "High",
    icon: <CheckCircle className="w-5 h-5" />,
    color: "text-green-500",
  },
];

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="gov-card flex items-start justify-between"
        >
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h3>
            <p className={`text-xs mt-2 font-semibold ${
              stat.change.startsWith("+") ? "text-emerald-600" : "text-slate-400"
            }`}>
              {stat.change}
            </p>
          </div>
          <div className={`${stat.color} p-2.5 bg-slate-50 rounded-xl border border-slate-100`}>
            {stat.icon}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
