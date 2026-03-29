"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Play, Zap, TrendingUp, Star, ArrowRight, Network, Activity, Clock, BarChart3, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChannelAuditReport } from "@/lib/youtube";

interface LandingHeroProps {
  featuredCreator: ChannelAuditReport | null;
  sampleCreators: ChannelAuditReport[];
  onAudit: (query: string) => void;
  isLoading?: boolean;
}

export function LandingHero({ featuredCreator, sampleCreators, onAudit, isLoading }: LandingHeroProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onAudit(query.trim());
    }
  };

  const displayCreator = featuredCreator;

  if (!displayCreator) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Initializing Engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-indigo-50/50 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-lavender-50/30 rounded-full blur-[100px] -z-10" />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Branding & Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-[0.3em] text-indigo-600 uppercase">The Audit Engine</span>
              <h1 className="text-7xl font-heading leading-[1.1] text-foreground max-w-md">
                Analyze <span className="italic">Competitors</span> instantly with VidMetrics<span className="text-indigo-600">.</span>
              </h1>
              <div className="h-1 w-64 bg-indigo-100 rounded-full" />
            </div>

            {/* App Overview Cards */}
            <div className="space-y-6 max-w-md">
              <Card className="p-6 rounded-2xl border-slate-100 shadow-lg shadow-indigo-500/5 bg-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading text-lg">Deep Analytics</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Analyze any YouTube channel's performance metrics, engagement rates, and content velocity in real-time.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 rounded-2xl border-slate-100 shadow-lg shadow-indigo-500/5 bg-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Network className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading text-lg">Competitor Mapping</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Visualize competitive landscapes and identify content gaps to outmaneuver your rivals.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 rounded-2xl border-slate-100 shadow-lg shadow-indigo-500/5 bg-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading text-lg">Intelligence Reports</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Generate comprehensive PDF reports with actionable insights and growth recommendations.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Right Column: Search & Featured */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <Input 
                type="text" 
                placeholder="Enter a competitor's YouTube handle or URL..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-16 pl-14 pr-32 bg-white/80 backdrop-blur-xl border-slate-200 rounded-2xl text-base shadow-xl shadow-indigo-500/5 focus-visible:ring-indigo-500/20 transition-all"
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="absolute right-2 top-2 bottom-2 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold tracking-widest text-[10px] disabled:opacity-50"
              >
                {isLoading ? "AUDITING..." : "AUDIT"}
              </Button>
            </form>

            {/* Case Study Section */}
            <Card className="relative overflow-hidden rounded-3xl border-none shadow-2xl shadow-indigo-500/10 bg-gradient-to-br from-slate-50 to-white p-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/30 rounded-full blur-3xl transform translate-x-20 -translate-y-20" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Badge className="bg-indigo-600 text-white font-heading italic px-3 py-1 rounded-full text-[10px]">
                      Case Study
                    </Badge>
                    <h3 className="text-2xl font-heading leading-tight max-w-sm">
                      How Brand X increased organic reach by <span className="text-indigo-600">40%</span> using Velocity Mapping.
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                    <Star className="w-6 h-6 text-indigo-600 fill-indigo-600" />
                  </div>
                </div>

                <p className="text-sm text-slate-600 max-w-md leading-relaxed">
                  By identifying competitor content gaps in real-time, Brand X optimized their publishing schedule and content mix. Read the full breakdown.
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <Link href="/case-study">
                    <Button 
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 h-11 text-xs font-bold tracking-widest gap-2"
                    >
                      Read Case Study
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Analytics Bento Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="grid grid-cols-12 gap-6">
            {/* Performance Ratio - Educational Card */}
            <Card className="col-span-5 p-8 rounded-3xl border-slate-100 shadow-xl shadow-indigo-500/5 bg-white space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">PERFORMANCE RATIO</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-heading text-indigo-600">+24.8%</span>
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                  </div>
                </div>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                  +2.4% vs last mo
                </Badge>
              </div>

              {/* Chart Area */}
              <div className="relative h-40 w-full">
                <svg viewBox="0 0 300 120" className="w-full h-full">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Area fill */}
                  <path 
                    d="M0 100 Q 40 90, 80 70 T 160 50 T 240 30 T 300 20 L 300 120 L 0 120 Z" 
                    fill="url(#lineGradient)"
                  />
                  {/* Line */}
                  <path 
                    d="M0 100 Q 40 90, 80 70 T 160 50 T 240 30 T 300 20" 
                    fill="none" 
                    stroke="#4f46e5" 
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Data points */}
                  <circle cx="80" cy="70" r="4" fill="#4f46e5" />
                  <circle cx="160" cy="50" r="4" fill="#4f46e5" />
                  <circle cx="240" cy="30" r="6" fill="#4f46e5" stroke="white" strokeWidth="2" />
                </svg>
              </div>

              {/* Educational Content */}
              <div className="space-y-3 pt-2">
                <h4 className="font-heading text-sm text-slate-900">What is Performance Ratio?</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A composite metric that measures how efficiently your content converts views into engagement relative to your subscriber base.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1">
                    <p className="text-[10px] text-indigo-600 font-bold uppercase">Strong Growth</p>
                    <p className="text-[11px] text-slate-600">Ratio &gt; 20% means viral potential</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-emerald-600 font-bold uppercase">Healthy</p>
                    <p className="text-[11px] text-slate-600">Ratio 10-20% indicates steady growth</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Engagement Rate</p>
                  <p className="text-xl font-heading">8.2%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Outlier Videos</p>
                  <p className="text-xl font-heading">12</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Format Split</p>
                  <p className="text-xl font-heading">70/30</p>
                </div>
              </div>
            </Card>

            {/* Right Side Stack */}
            <div className="col-span-7 space-y-6">
              {/* Competitor Nodes - Coming Soon */}
              <Card className="p-6 rounded-3xl border-slate-100 shadow-xl shadow-indigo-500/5 bg-white relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-amber-50 text-amber-600 text-[9px] font-bold">
                    Coming Soon
                  </Badge>
                </div>
                <div className="flex items-start justify-between">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                        <Network className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-heading text-lg">Competitor Nodes</h4>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Network Analysis</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 max-w-sm">
                      Map competitive networks and identify content gaps. Track multiple channels simultaneously to reveal strategic opportunities.
                    </p>
                  </div>
                  
                  {/* Network Visualization */}
                  <div className="w-32 h-24 relative opacity-50">
                    <svg viewBox="0 0 100 80" className="w-full h-full">
                      {/* Connection lines */}
                      <line x1="20" y1="25" x2="50" y2="40" stroke="#cbd5e1" strokeWidth="1" />
                      <line x1="50" y1="40" x2="80" y2="25" stroke="#cbd5e1" strokeWidth="1" />
                      <line x1="50" y1="40" x2="50" y2="65" stroke="#cbd5e1" strokeWidth="1" />
                      <line x1="20" y1="25" x2="80" y2="25" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="20" y1="25" x2="50" y2="65" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="80" y1="25" x2="50" y2="65" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2,2" />
                      
                      {/* Nodes */}
                      <circle cx="50" cy="40" r="8" fill="#4f46e5" />
                      <circle cx="20" cy="25" r="5" fill="#f59e0b" />
                      <circle cx="80" cy="25" r="5" fill="#10b981" />
                      <circle cx="50" cy="65" r="5" fill="#f43f5e" />
                      <circle cx="35" cy="55" r="3" fill="#cbd5e1" />
                      <circle cx="65" cy="55" r="3" fill="#cbd5e1" />
                    </svg>
                  </div>
                </div>
              </Card>

              {/* Bottom Row - Three Cards */}
              <div className="grid grid-cols-3 gap-6">
                {/* Smart Caching */}
                <Card className="p-5 rounded-3xl border-slate-100 shadow-xl shadow-indigo-500/5 bg-white space-y-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-indigo-600" />
                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Smart Caching</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-600">Cache Hit Rate</span>
                        <span className="font-bold text-indigo-600">94%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[94%] bg-indigo-600 rounded-full" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-600">Response Time</span>
                        <span className="font-bold text-emerald-600">~300ms</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-emerald-500 rounded-full" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-600">Data Freshness</span>
                        <span className="font-bold text-amber-600">24h TTL</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[98%] bg-amber-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Fast Audit */}
                <Card className="p-5 rounded-3xl border-slate-100 shadow-xl shadow-indigo-500/5 bg-white space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Fast Audits</span>
                  </div>
                  
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Cached channel data delivers sub-second responses for previously audited channels. Fresh data fetched on-demand for new queries.
                  </p>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 text-[9px] font-bold">
                      24h Cache
                    </Badge>
                  </div>
                </Card>

                {/* Agentic AI Integration - Coming Soon */}
                <Card className="p-5 rounded-3xl border-slate-100 shadow-xl shadow-indigo-500/5 bg-white space-y-3 relative overflow-hidden">
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-amber-50 text-amber-600 text-[9px] font-bold">
                      Coming Soon
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Agentic AI</span>
                  </div>
                  
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    AI-powered audit agents that autonomously analyze channels, generate reports, and provide strategic recommendations without manual intervention.
                  </p>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <Badge variant="secondary" className="bg-indigo-50 text-indigo-600 text-[9px] font-bold">
                      Auto-Analysis
                    </Badge>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer Branding */}
      <footer className="max-w-7xl mx-auto w-full px-6 py-8 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-heading text-xl">VidMetrics</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Editorial Dashboard</span>
        </div>
        <p className="text-[10px] text-muted-foreground">© 2026 VidMetrics Editorial. All rights reserved.</p>
        <div className="flex items-center gap-6 text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
          <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-foreground transition-colors">Support</a>
        </div>
      </footer>
    </div>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");
