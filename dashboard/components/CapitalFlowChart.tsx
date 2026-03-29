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
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xl">
        <p className="text-slate-900 font-bold mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs font-medium" style={{ color: entry.color }}>
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
                  <stop offset="5%" stopColor="#1E293B" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#1E293B" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorReleased" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748B", fontSize: 11, fontWeight: 500 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748B", fontSize: 11, fontWeight: 500 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="allocated"
                stroke="#1E293B"
                fillOpacity={1}
                fill="url(#colorAllocated)"
                strokeWidth={2.5}
              />
              <Area
                type="monotone"
                dataKey="released"
                stroke="#059669"
                fillOpacity={1}
                fill="url(#colorReleased)"
                strokeWidth={2.5}
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
                tick={{ fill: "#475569", fontSize: 11, fontWeight: 600 }}
                width={80}
              />
              <Tooltip cursor={{ fill: "#F8FAFC" }} content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                fill="#1E293B"
                radius={[0, 4, 4, 0]}
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-400 uppercase tracking-tighter">Efficiency Score</span>
              <span className="text-emerald-600 font-black">8.4/10</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div className="h-full bg-emerald-500 w-[84%]" />
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}
