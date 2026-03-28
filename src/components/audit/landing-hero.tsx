"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Play, Zap, TrendingUp, ThumbsUp, Clock, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChannelAuditReport } from "@/lib/youtube";

interface LandingHeroProps {
  featuredCreator: ChannelAuditReport | null;
  sampleCreators: ChannelAuditReport[];
  onAudit: (query: string) => void;
}

export function LandingHero({ featuredCreator, sampleCreators, onAudit }: LandingHeroProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onAudit(query);
    }
  };

  const displayCreator = featuredCreator || {
    channelName: "MKBHD",
    subscribers: 18500000,
    thumbnail: "https://yt3.googleusercontent.com/1-7_88_BvC6Y-U_S8_1_S_1-7_88_BvC6Y-U_S8_1_S_1-7_88_BvC6Y-U_S8_1_S_1-7_88_BvC6Y-U_S8_1_S",
    kpis: {
      totalViewsLast30Days: 3800000000,
      avgEngagementRate: 8.2,
      status: "Growth"
    },
    videos: [
      {
        title: "MKBHD: The Future of Spatial Computing Analysis",
        viewCount: 2400000,
        publishedAt: new Date().toISOString()
      }
    ]
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden flex flex-col">
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

            <div className="space-y-8 max-w-md">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                  <img src={displayCreator.thumbnail} alt={displayCreator.channelName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-heading text-xl">{displayCreator.channelName}</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Primary Benchmark</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Subscribers</p>
                  <p className="text-2xl font-heading">{(displayCreator.subscribers / 1000000).toFixed(1)}<span className="text-lg ml-0.5">M</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">30D Views</p>
                  <p className="text-2xl font-heading">{(displayCreator.kpis.totalViewsLast30Days / 1000000).toFixed(1)}<span className="text-lg ml-0.5">M</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Avg Engagement</p>
                  <p className="text-2xl font-heading">{displayCreator.kpis.avgEngagementRate.toFixed(1)}<span className="text-lg ml-0.5">%</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Status</p>
                  <p className="text-2xl font-heading text-indigo-600">{displayCreator.kpis.status}</p>
                </div>
              </div>
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
                className="absolute right-2 top-2 bottom-2 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold tracking-widest text-[10px]"
              >
                AUDIT
              </Button>
            </form>

            <div className="grid grid-cols-3 gap-6">
              {/* Spotlight Video Card */}
              <div className="col-span-2 space-y-6">
                <Card className="relative aspect-[16/10] overflow-hidden rounded-3xl border-none shadow-2xl shadow-indigo-500/10 group">
                  <img 
                    src={displayCreator.videos[0]?.thumbnail || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"} 
                    alt="Featured analysis" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-white font-heading italic px-4 py-1.5 rounded-full">
                      Trending
                    </Badge>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-xl p-6 rounded-full border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="bg-white/90 backdrop-blur p-2 rounded-full">
                      <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                    </div>
                    <span className="text-white font-heading text-lg italic tracking-wide">Watch Analysis</span>
                  </div>
                </Card>

                <div className="space-y-4">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-indigo-600 uppercase">Featured Performance</span>
                  <h2 className="text-4xl font-heading leading-tight max-w-md truncate">
                    {displayCreator.videos[0]?.title}
                  </h2>
                  <div className="flex items-center gap-6 text-[11px] text-muted-foreground font-medium uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <Eye className="w-3.5 h-3.5" />
                      {(displayCreator.videos[0]?.viewCount / 1000000).toFixed(1)}M Views
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(displayCreator.videos[0]?.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Metrics Cards */}
              <div className="space-y-6">
                <Card className="p-6 rounded-3xl border-slate-100 shadow-xl shadow-indigo-500/5 space-y-4 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Engagement</span>
                    <Zap className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-4xl font-heading">{displayCreator.kpis.avgEngagementRate.toFixed(1)}<span className="text-2xl ml-0.5">%</span></p>
                    <p className="text-[11px] font-bold text-emerald-500 flex items-center gap-1">
                      +0.4 <TrendingUp className="w-3 h-3" />
                    </p>
                  </div>
                  <div className="h-12 w-full mt-4 bg-indigo-50/50 rounded-lg overflow-hidden relative">
                    <svg viewBox="0 0 100 40" className="absolute inset-0 w-full h-full">
                      <path d="M0 35 Q 20 35, 40 25 T 80 15 T 100 5" fill="none" stroke="rgb(79 70 229)" strokeWidth="2" />
                    </svg>
                  </div>
                </Card>

                <Card className="p-6 rounded-3xl border-slate-100 shadow-xl shadow-indigo-500/5 space-y-4 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">30D Growth</span>
                    <TrendingUp className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-4xl font-heading">+{displayCreator.kpis.viewGrowthPercent}%</p>
                    <p className="text-[11px] font-bold text-indigo-500 flex items-center gap-1">
                      Peak
                    </p>
                  </div>
                  <div className="h-12 w-full mt-4 bg-indigo-50/50 rounded-lg overflow-hidden relative">
                    <svg viewBox="0 0 100 40" className="absolute inset-0 w-full h-full">
                      <path d="M0 35 Q 20 20, 40 25 T 80 10 T 100 5" fill="none" stroke="rgb(79 70 229)" strokeWidth="2" />
                    </svg>
                  </div>
                </Card>
              </div>
            </div>

            {/* Bottom Row Sample Cards */}
            <div className="grid grid-cols-4 gap-4">
              {sampleCreators.map((creator, i) => (
                <motion.div 
                  key={creator.channelId}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => onAudit(creator.channelId)}
                  className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-2xl border border-slate-100/50 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-200 overflow-hidden flex-shrink-0 group-hover:grayscale-0 transition-all">
                    <img src={creator.thumbnail} alt={creator.channelName} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest truncate">#{i + 2} Performer</p>
                    <p className="text-[11px] font-bold text-foreground truncate">{creator.channelName}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
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
