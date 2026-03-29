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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card flex items-start justify-between"
        >
          <div>
            <p className="text-white/50 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
            <p className={`text-xs mt-2 font-medium ${
              stat.change.startsWith("+") ? "text-secondary" : "text-white/40"
            }`}>
              {stat.change}
            </p>
          </div>
          <div className={`${stat.color} p-3 bg-white/5 rounded-xl border border-white/5`}>
            {stat.icon}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
