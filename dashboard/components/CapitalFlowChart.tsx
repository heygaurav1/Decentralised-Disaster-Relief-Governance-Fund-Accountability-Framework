"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import DashboardCard from "./DashboardCard";
import { TrendingUp } from "lucide-react";

const flowData = [
  { name: "Week 1", allocated: 4000, released: 2400 },
  { name: "Week 2", allocated: 3000, released: 1398 },
  { name: "Week 3", allocated: 2000, released: 9800 },
  { name: "Week 4", allocated: 2780, released: 3908 },
  { name: "Week 5", allocated: 1890, released: 4800 },
  { name: "Week 6", allocated: 2390, released: 3800 },
  { name: "Week 7", allocated: 3490, released: 4300 },
];

const trancheData = [
  { stage: "Proposed", count: 45, value: 120 },
  { stage: "Verified", count: 32, value: 85 },
  { stage: "Released", count: 28, value: 64 },
  { stage: "Impact Rep.", count: 18, value: 42 },
  { stage: "Finalized", count: 12, value: 25 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-3 rounded-xl border border-white/10 shadow-2xl">
        <p className="text-white font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {entry.value} ETH
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function CapitalFlowChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <DashboardCard
        title="Capital Flow Dynamics"
        subtitle="Weekly allocation vs actual tranche release"
        className="lg:col-span-2"
        icon={<TrendingUp className="w-5 h-5" />}
      >
        <div className="h-[300px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={flowData}>
              <defs>
                <linearGradient id="colorAllocated" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--brand-primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--brand-primary)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorReleased" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--brand-secondary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--brand-secondary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="allocated"
                stroke="var(--brand-primary)"
                fillOpacity={1}
                fill="url(#colorAllocated)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="released"
                stroke="var(--brand-secondary)"
                fillOpacity={1}
                fill="url(#colorReleased)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>

      <DashboardCard
        title="Tranche Lifecycle"
        subtitle="Distribution across verification stages"
      >
        <div className="h-[300px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trancheData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                dataKey="stage"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                width={80}
              />
              <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                fill="var(--brand-primary)"
                radius={[0, 4, 4, 0]}
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/40">Efficiency Score</span>
              <span className="text-secondary">8.4/10</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-[84%]" />
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}
