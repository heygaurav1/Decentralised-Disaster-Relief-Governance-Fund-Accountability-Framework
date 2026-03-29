"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrandLogo } from "../components/BrandLogo";
import {
  Shield,
  Globe,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Lock,
  Users,
  Zap,
  Info,
  ChevronRight,
  Star,
  TrendingUp,
  MapPin,
  Award,
  FileText,
} from "lucide-react";

const STATS = [
  { label: "Relief Funds Tracked", value: "₹4.8 Cr", sub: "Across 6 disasters" },
  { label: "Beneficiaries Reached", value: "12,400+", sub: "Verified on-chain" },
  { label: "NGO Partners", value: "28", sub: "Registered & audited" },
  { label: "Transparency Score", value: "98.4%", sub: "Oracle consensus" },
];

const FEATURES = [
  {
    icon: <Lock className="w-5 h-5 text-blue-700" />,
    iconBg: "bg-blue-50",
    title: "Cryptographic Fund Custody",
    desc: "ReliefVault.sol holds all donated capital in programmable escrow. No single actor can move funds unilaterally — only DAO-approved milestones trigger releases.",
  },
  {
    icon: <BarChart3 className="w-5 h-5 text-indigo-700" />,
    iconBg: "bg-indigo-50",
    title: "Real-time Capital Transparency",
    desc: "Every rupee is traceable from donation to beneficiary through on-chain events indexed by The Graph. A public Sankey dashboard shows live fund flow.",
  },
  {
    icon: <Users className="w-5 h-5 text-emerald-700" />,
    iconBg: "bg-emerald-50",
    title: "Community-Governed DAO",
    desc: "Quadratic voting with Gitcoin Passport Sybil-resistance ensures fair governance. Whales cannot dominate — a community of 100 equals a single whale.",
  },
  {
    icon: <Shield className="w-5 h-5 text-purple-700" />,
    iconBg: "bg-purple-50",
    title: "Anon-Aadhaar Identity",
    desc: "ZK-proof based Aadhaar verification gates high-stakes votes. Prove you are a unique Indian resident without revealing your Aadhaar number.",
  },
  {
    icon: <Globe className="w-5 h-5 text-orange-700" />,
    iconBg: "bg-orange-50",
    title: "Multi-Oracle Verification",
    desc: "Chainlink DON (7 nodes) + UMA optimistic oracle + community attestation creates a three-layer verification stack resistant to manipulation.",
  },
  {
    icon: <Zap className="w-5 h-5 text-yellow-700" />,
    iconBg: "bg-yellow-50",
    title: "Gasless for Beneficiaries",
    desc: "ERC-4337 account abstraction with paymaster sponsorship. NGO workers and beneficiaries never pay gas — onboarded via Aadhaar OTP alone.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Donate via UPI or Crypto",
    desc: "Indian donors use UPI deeplinks (GPay, PhonePe, BHIM). International donors use USDC/DAI. Anonymous donations use ZK proofs.",
  },
  {
    step: "02",
    title: "Funds Locked in Smart Contract",
    desc: "ReliefVault.sol holds capital in escrow. Funds are allocated to specific disaster IDs — e.g. \"Assam Floods 2024\".",
  },
  {
    step: "03",
    title: "NGO Submits Geo-tagged Proof",
    desc: "Field workers upload IPFS artifacts: photos, invoices, beneficiary lists. Chainlink oracle validates GPS coordinates against NDMA disaster polygons.",
  },
  {
    step: "04",
    title: "DAO Votes on Tranche Release",
    desc: "Token holders vote with quadratic weights. After 72h dispute window and 48h timelock, smart contract automatically releases funds to NGO wallet.",
  },
];

const DISASTERS = [
  { id: "ASM-2024-001", name: "Assam Floods – Morigaon", raised: "₹1.2 Cr", released: "₹84L", status: "Active", region: "Assam" },
  { id: "WB-2024-007", name: "Cyclone Dana – Midnapore", raised: "₹86L", released: "₹61L", status: "Active", region: "West Bengal" },
  { id: "ASM-2023-012", name: "Brahmaputra Overflow – Goalpara", raised: "₹2.1 Cr", released: "₹2.1 Cr", status: "Completed", region: "Assam" },
];

const PUBLIC_NOTICES = [
  { id: "CIR-2024-882", title: "Mandatory Aadhaar Verification for Tranche Releases > ₹5L", date: "15 Oct 2024", type: "Circular" },
  { id: "ORD-2024-110", title: "Whitelisting of new NGOs for Cyclone Dana operations", date: "02 Oct 2024", type: "Order" },
  { id: "NOT-2024-095", title: "Smart Contract Audit Report v1.2 Published by CERT-In", date: "28 Sep 2024", type: "Notice" },
];

const IMPACT_REPORTS = [
  { title: "Sundarbans Resilience Program", desc: "Decentralized funds rebuilt 50 homes after Cyclone Amphan within 14 days of capital release.", date: "12 Aug 2024", imgUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop" },
  { title: "Assam Floods Relief Camp", desc: "Transparent distribution of rations and medical supplies verified on-chain, reaching 5,230 families.", date: "24 Jul 2024", imgUrl: "https://images.unsplash.com/photo-1526951521990-620dc14c214b?w=600&h=400&fit=crop" },
  { title: "Odisha Coastal Evacuation", desc: "Emergency DAOs triggered automated payouts for coastal evacuation transport operators via smart contracts.", date: "18 Sep 2024", imgUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop" }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Official Gov Banner */}
      <div className="bg-[#1e2329] text-white text-[11px] py-1.5 px-6 border-b border-[#2d333b]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-200">भारत सरकार | GOVERNMENT OF INDIA</span>
            <span className="hidden md:inline text-slate-400 border-l border-slate-600 pl-3">राष्ट्रीय आपदा प्रबंधन प्राधिकरण | National Disaster Management Authority</span>
          </div>
          <div className="flex items-center gap-4 hidden sm:flex">
            <div className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
               {/* Tiny Indian Flag SVG */}
               <svg width="18" height="12" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-sm shadow-sm">
                 <rect width="16" height="3.7" fill="#FF9933" />
                 <rect y="3.7" width="16" height="3.6" fill="#FFFFFF" />
                 <rect y="7.3" width="16" height="3.7" fill="#138808" />
                 <circle cx="8" cy="5.5" r="1.5" fill="#000080" />
               </svg>
               <span className="font-medium tracking-wide">Official Governance Portal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
              <BrandLogo className="w-7 h-7" color="#F45A2C" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-[15px] leading-none">Sahayog</div>
              <div className="text-[10px] text-orange-600 uppercase tracking-widest mt-0.5 font-semibold">Governance Protocol</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {["How It Works", "Disasters", "DAO", "Transparency"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="btn-secondary text-sm py-2 px-4">
              Sign In
            </Link>
            <Link href="/auth/register" className="btn-primary text-sm py-2 px-4">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient text-white py-24 md:py-32 relative overflow-hidden">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold mb-8 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live on Polygon zkEVM Testnet · 28 NGOs Onboarded
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-[1.08] tracking-tight mb-6">
              Disaster Relief Funds —<br />
              <span className="text-blue-200">Accountable to Everyone.</span>
            </h1>

            <p className="text-lg text-blue-100/80 leading-relaxed max-w-2xl mb-10">
              A cryptographically enforced, community-governed fund management protocol for Eastern Indian 
              disaster operations. Every rupee traceable. No single point of failure. Built for Assam 
              and West Bengal field realities.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/auth/register" className="btn-primary bg-white text-blue-800 border-white text-[15px] px-8 py-3 hover:bg-blue-50 hover:border-blue-50">
                Launch Dashboard
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#how-it-works"
                className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 text-[15px] px-8 py-3"
              >
                See How It Works
              </Link>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-12 border-t border-white/10"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-sm font-semibold text-blue-100 mt-1">{s.label}</div>
                <div className="text-xs text-blue-200/60 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-label">Why Sahayog</div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">
              Built for Trust. Engineered for Accountability.
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-[15px]">
              Traditional disaster relief suffers from opacity, delayed disbursements, and corruption risk. 
              Sahayog eliminates these through immutable smart contracts and decentralised governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="gov-card"
              >
                <div className={`feature-icon-wrap ${f.iconBg} mb-4`}>{f.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works steps */}
      <section id="how-it-works-steps" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label">The Process</div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">From Donation to Impact —<br />In 4 Verified Steps</h2>
              <p className="text-slate-500 text-[15px] leading-relaxed">
                Our milestone-based fund release combines oracle verification, community governance, and 
                cryptographic proofs to ensure no funds are misused.
              </p>
            </div>
            <div className="space-y-6">
              {HOW_IT_WORKS.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="step-circle shrink-0">{step.step}</div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{step.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Notice Board & Circulars */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Notices Sidebar */}
            <div className="md:w-1/3">
              <div className="bg-white border text-slate-800 border-slate-200 shadow-sm rounded-lg overflow-hidden flex flex-col h-full">
                <div className="bg-[#0f2c59] text-white px-5 py-3.5 font-semibold flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <FileText size={16} />
                     <span>Public Notices & Circulars</span>
                   </div>
                   <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse border-2 border-[#0f2c59]"></span>
                </div>
                <div className="divide-y divide-slate-100 flex-1">
                  {PUBLIC_NOTICES.map(notice => (
                    <a href="#" key={notice.id} className="block p-5 hover:bg-slate-50 transition-colors group">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] uppercase font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-sm border border-blue-100">{notice.type}</span>
                        <span className="text-[11px] text-slate-400 font-mono tracking-wider">{notice.id}</span>
                      </div>
                      <h4 className="text-[13px] font-semibold text-slate-800 group-hover:text-blue-700 leading-snug mb-2">{notice.title}</h4>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5"><ChevronRight size={12} className="text-blue-400" />{notice.date}</div>
                    </a>
                  ))}
                </div>
                <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-100 flex justify-center mt-auto">
                  <a href="#" className="text-xs font-bold uppercase tracking-wider text-blue-800 hover:text-blue-600">View All Notifications →</a>
                </div>
              </div>
            </div>

            {/* Impact Reports */}
            <div className="md:w-2/3">
              <div className="section-label mb-3 text-emerald-700 bg-emerald-50 border-emerald-100">Public Domain Evidence</div>
              <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">
                Field Implementation Reports
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                 {IMPACT_REPORTS.slice(0, 2).map(story => (
                   <div key={story.title} className="bg-white border border-slate-200 rounded-xl p-0 overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                     <div className="h-44 w-full bg-slate-200 overflow-hidden relative">
                       <img src={story.imgUrl} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                       <div className="absolute top-3 left-3 bg-red-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm flex items-center gap-1.5">
                         <Shield size={10} />
                         VERIFIED ON-CHAIN
                       </div>
                     </div>
                     <div className="p-6">
                       <div className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-widest">{story.date}</div>
                       <h3 className="text-base font-bold text-slate-900 mb-2.5 leading-tight">{story.title}</h3>
                       <p className="text-[14px] text-slate-600 line-clamp-2 leading-relaxed">{story.desc}</p>
                       <div className="mt-4 pt-4 border-t border-slate-100">
                         <a href="#" className="text-[13px] font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1">Read Full Report <ArrowRight size={14} /></a>
                       </div>
                     </div>
                   </div>
                 ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Active Disasters */}
      <section id="disasters" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="section-label">Live Operations</div>
              <h2 className="text-3xl font-black text-slate-900">Active Disaster Relief Pools</h2>
            </div>
            <Link href="/auth/login" className="btn-primary text-sm">
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {DISASTERS.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="gov-card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-blue-600" />
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{d.region}</span>
                  </div>
                  <span className={`badge ${d.status === "Active" ? "badge-green" : "badge-gray"}`}>
                    {d.status === "Active" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                    {d.status}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-[15px] mb-3">{d.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Raised</span>
                    <span className="font-bold text-slate-900">{d.raised}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Released</span>
                    <span className="font-bold text-emerald-600">{d.released}</span>
                  </div>
                </div>
                <div className="progress-bar mt-4">
                  <div
                    className="progress-fill bg-emerald-500"
                    style={{
                      width: `${Math.round(
                        (parseFloat(d.released.replace(/[^\d.]/g, "")) /
                          parseFloat(d.raised.replace(/[^\d.]/g, ""))) *
                          100
                      )}%`,
                    }}
                  />
                </div>
                <div className="mt-3 text-[11px] font-mono text-slate-400">{d.id}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Audit */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-label">Security & Compliance</div>
            <h2 className="text-3xl font-black text-slate-900">Audited. Verified. Trusted.</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { icon: <Award className="w-6 h-6 text-blue-600" />, title: "Trail of Bits Audit", sub: "Q2 2025" },
              { icon: <CheckCircle className="w-6 h-6 text-emerald-600" />, title: "Certora Formal Verification", sub: "ReliefVault + MilestoneMgr" },
              { icon: <Star className="w-6 h-6 text-amber-500" />, title: "Immunefi Bug Bounty", sub: "$50,000 Pool" },
              { icon: <TrendingUp className="w-6 h-6 text-purple-600" />, title: "Immunefi Score", sub: "98 / 100" },
            ].map((t) => (
              <div key={t.title} className="gov-card text-center flex flex-col items-center gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">{t.icon}</div>
                <div className="font-bold text-slate-900 text-sm">{t.title}</div>
                <div className="text-xs text-slate-500">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 hero-gradient text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-4">Start Governing Relief Funds Today</h2>
          <p className="text-blue-200 text-lg mb-10">
            Join as an NGO coordinator, community verifier, or donor. 
            Every role matters in decentralised relief governance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/register" className="btn-primary bg-white text-blue-800 border-white text-[15px] px-10 py-3.5 hover:bg-blue-50">
              Register as NGO / Verifier
              <ArrowRight size={16} />
            </Link>
            <Link href="/auth/login" className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 text-[15px] px-10 py-3.5">
              Sign In to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-sm py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white text-[15px]">Sahayog</span>
              </div>
              <p className="text-slate-500 leading-relaxed max-w-sm">
                Decentralised disaster relief fund governance for Eastern India. 
                Registered under Section 8 company. All protocol keys held by 
                Gnosis Safe 3-of-5 multisig.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Protocol</div>
              <div className="space-y-2">
                {["Smart Contracts", "Subgraph Explorer", "Oracle Status", "Bug Bounty"].map((l) => (
                  <div key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></div>
                ))}
              </div>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Governance</div>
              <div className="space-y-2">
                {["DAO Proposals", "Voting Portal", "Community Forum", "Documentation"].map((l) => (
                  <div key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></div>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between gap-4">
            <span>© 2025 Sahayog Protocol. All rights reserved.</span>
            <span className="font-mono text-xs text-slate-600">Polygon zkEVM · Mainnet · v1.0.2</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
