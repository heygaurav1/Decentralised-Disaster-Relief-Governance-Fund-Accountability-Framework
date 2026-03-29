"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface DashboardCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  icon?: ReactNode;
}

export default function DashboardCard({
  children,
  title,
  subtitle,
  className = "",
  icon,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card ${className}`}
    >
      {(title || icon) && (
        <div className="flex items-center justify-between mb-6">
          <div>
            {title && <h3 className="text-lg font-semibold text-white/90">{title}</h3>}
            {subtitle && <p className="text-sm text-white/50">{subtitle}</p>}
          </div>
          {icon && <div className="text-primary glow-primary p-2 bg-primary/10 rounded-lg">{icon}</div>}
        </div>
      )}
      {children}
    </motion.div>
  );
}
