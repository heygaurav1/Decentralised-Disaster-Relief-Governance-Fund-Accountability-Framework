import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  ShieldCheck, Droplets, MapPin, Activity, 
  ArrowUpRight, AlertCircle, CheckCircle2, Info 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const socket = io('http://localhost:3001');

const App = () => {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    totalFunds: "1,240,500 USDC",
    activeTranches: 12,
    verifiedProofs: 48,
    reliefZones: ["Assam", "West Bengal"]
  });

  const chartData = [
    { name: 'Mon', value: 4000 },
    { name: 'Tue', value: 3000 },
    { name: 'Wed', value: 2000 },
    { name: 'Thu', value: 2780 },
    { name: 'Fri', value: 1890 },
    { name: 'Sat', value: 2390 },
    { name: 'Sun', value: 3490 },
  ];

  useEffect(() => {
    socket.on('RELIEF_EVENT', (data) => {
      setEvents((prev) => [data, ...prev].slice(0, 50));
    });
    return () => socket.off('RELIEF_EVENT');
  }, []);

  return (
    <div className="min-h-screen p-6 md:p-10">
      {/* Header */}
      <nav className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/20 border border-primary/30">
            <Droplets className="text-primary w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">ReliefChain</h1>
            <p className="text-sm text-text-muted">Decentralized Governance Protocol</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold text-accent">Polygon zkEVM Mainnet</span>
          </div>
          <button className="btn-primary">Connect Wallet</button>
        </div>
      </nav>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Fund Balance", value: stats.totalFunds, icon: Activity, color: "text-primary" },
          { label: "Active Tranches", value: stats.activeTranches, icon: ArrowUpRight, color: "text-secondary" },
          { label: "Verified Proofs", value: stats.verifiedProofs, icon: ShieldCheck, color: "text-accent" },
          { label: "Designated Zones", value: stats.reliefZones.join(" & "), icon: MapPin, color: "text-blue-400" },
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-xs font-medium text-text-muted">Live</span>
            </div>
            <p className="text-sm text-text-muted mb-1">{stat.label}</p>
            <h3 className="text-xl font-bold">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Capital Flow Chart */}
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Capital Flow Dashboard</h2>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#f9fafb' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Activity */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-bold mb-6">Real-time Governance</h2>
          <div className="space-y-6">
            <AnimatePresence>
              {events.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Info className="text-text-muted w-10 h-10 mb-4 opacity-50" />
                  <p className="text-sm text-text-muted">Waiting for on-chain events...</p>
                </div>
              ) : (
                events.map((event, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div className={`mt-1 p-2 rounded-lg bg-white/5 ${event.type === 'FUNDS_RELEASED' ? 'text-accent' : 'text-primary'}`}>
                      {event.type === 'FUNDS_RELEASED' ? <CheckCircle2 size={16} /> : <Activity size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{event.type.replace('_', ' ')}</p>
                      <p className="text-xs text-text-muted mt-1">Tranche #{event.id} • {event.amount} USDC</p>
                      <p className="text-[10px] text-primary/70 mt-2 font-mono">{event.beneficiary.slice(0, 10)}...{event.beneficiary.slice(-8)}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
