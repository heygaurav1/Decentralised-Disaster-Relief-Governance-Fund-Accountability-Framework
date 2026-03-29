"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface DashboardCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  icon?: ReactNode;
  badge?: ReactNode;
}

export default function DashboardCard({
  children,
  title,
  subtitle,
  className = "",
  icon,
  badge,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`gov-card ${className}`}
    >
      {(title || icon || badge) && (
        <div className="flex items-start justify-between mb-6 gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {icon && (
              <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-500 shrink-0">
                {icon}
              </div>
            )}
            <div className="min-w-0">
              {title && (
                <h3 className="font-bold text-slate-900 text-base leading-snug">{title}</h3>
              )}
              {subtitle && (
                <p className="text-xs text-slate-500 font-medium mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          {badge && <div className="shrink-0">{badge}</div>}
        </div>
      )}
      {children}
    </motion.div>
  );
}
