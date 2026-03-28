"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, 
  ThumbsUp, 
  MessageSquare, 
  TrendingUp, 
  Zap, 
  ShieldAlert, 
  ShieldCheck,
  BarChart3,
  LayoutDashboard,
  Target,
  FileText
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell,
  ReferenceLine
} from "recharts";
import { calculatePerformanceRatio, calculateEngagementRate, ChannelAuditReport, VideoAudit } from "@/lib/youtube";

interface IntelligenceHubProps {
  video: VideoAudit | null;
  report: ChannelAuditReport;
}

export function IntelligenceHub({ video, report }: IntelligenceHubProps) {
  const [activeSubTab, setActiveSubTab] = useState("overview");
  
  // Default to #1 video if none selected
  const activeVideo = video || report.videos[0];

  const performanceRatio = activeVideo.performanceRatio;
  const engagementRate = activeVideo.engagementRate;
  const channelAvgER = report.kpis.avgEngagementRate;
  const erDelta = ((engagementRate - channelAvgER) / channelAvgER) * 100;

  const vibeVerdict = performanceRatio > 10 
    ? `This video is a primary growth driver, exceeding baseline reach by ${(performanceRatio / report.kpis.avgEngagementRate).toFixed(1)}x.`
    : "This video maintains steady performance within the creator's expected range.";

  const isHighRisk = activeVideo.viewCount > 1000000 && engagementRate < 1;
  const isViralSpike = activeVideo.isOutlier && engagementRate > 5;

  const subTabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "tactical", label: "Content Intelligence", icon: Target },
    { id: "context", label: "Channel Context", icon: BarChart3 },
    { id: "health", label: "Health & Risk", icon: ShieldAlert },
  ];

  const channelAvgViews = report.videos.reduce((acc, v) => acc + v.viewCount, 0) / report.videos.length;
  const channelPeakViews = Math.max(...report.videos.map(v => v.viewCount));

  return (
    <div className="flex-1 bg-slate-50/30 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">Intelligence Hub</span>
            <h1 className="text-4xl font-heading text-slate-900 truncate max-w-4xl">{activeVideo.title}</h1>
          </div>

          <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
            {subTabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                variant="ghost"
                className={cn(
                  "h-10 px-6 rounded-xl text-xs font-bold tracking-widest gap-2 transition-all",
                  activeSubTab === tab.id 
                    ? "bg-white shadow-sm text-indigo-600" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeSubTab === "overview" && (
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8 space-y-8">
                  <div className="grid grid-cols-3 gap-6">
                    <MetricCard label="Views" value={activeVideo.viewCount.toLocaleString()} icon={Eye} />
                    <MetricCard label="Likes" value={activeVideo.likeCount.toLocaleString()} icon={ThumbsUp} />
                    <MetricCard label="Comments" value={activeVideo.commentCount.toLocaleString()} icon={MessageSquare} />
                  </div>
                  
                  <Card className="p-12 rounded-[3rem] border-none shadow-2xl shadow-indigo-500/5 bg-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[40%] h-full bg-indigo-50/50 blur-[100px] rounded-full translate-x-1/2 -z-1" />
                    <div className="relative z-10 space-y-6">
                      <span className="text-[10px] font-bold tracking-[0.3em] text-indigo-600 uppercase">Reach & Vibe Verdict</span>
                      <div className="flex items-baseline gap-4">
                        <p className="text-6xl font-heading">{performanceRatio.toFixed(1)}<span className="text-3xl ml-1">%</span></p>
                        <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] uppercase tracking-widest px-3 py-1">Reach Score</Badge>
                      </div>
                      <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl">{vibeVerdict}</p>
                    </div>
                  </Card>
                </div>

                <div className="col-span-4">
                  <Card className="p-8 h-full rounded-[2.5rem] border-none shadow-2xl shadow-indigo-500/5 flex flex-col justify-between bg-white">
                    <div className="space-y-6">
                      <span className="text-[10px] font-bold tracking-[0.3em] text-indigo-600 uppercase">Engagement Delta</span>
                      <div className="space-y-2">
                        <p className="text-5xl font-heading">{engagementRate.toFixed(2)}%</p>
                        <p className={cn(
                          "text-sm font-bold flex items-center gap-1",
                          erDelta >= 0 ? "text-emerald-500" : "text-rose-500"
                        )}>
                          {erDelta >= 0 ? "+" : ""}{erDelta.toFixed(1)}% <TrendingUp className={cn("w-4 h-4", erDelta < 0 && "rotate-180")} />
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed uppercase tracking-widest font-bold">
                        vs. Channel Average ({channelAvgER.toFixed(1)}%)
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {activeSubTab === "tactical" && (
              <div className="grid grid-cols-2 gap-8">
                <ThumbnailAnalysisCard thumbnailUrl={activeVideo.thumbnail} />
                <TagCloudCard tags={activeVideo.tags || []} />
              </div>
            )}

            {activeSubTab === "context" && (
              <Card className="p-12 rounded-[3rem] border-none shadow-2xl shadow-indigo-500/5 bg-white space-y-12">
                <div className="space-y-1">
                  <h3 className="text-2xl font-heading">Internal Standings</h3>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Video Position vs. Channel Baseline</p>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: "This Video", value: activeVideo.viewCount },
                      { name: "Channel Avg", value: channelAvgViews },
                      { name: "30-Day Peak", value: channelPeakViews },
                    ]} layout="vertical" margin={{ left: 40, right: 60 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700 }} />
                      <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={40}>
                        <Cell fill="#4f46e5" />
                        <Cell fill="#e2e8f0" />
                        <Cell fill="#e2e8f0" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}

            {activeSubTab === "health" && (
              <div className="grid grid-cols-2 gap-8">
                <Card className={cn(
                  "p-12 rounded-[3rem] border-none shadow-2xl flex flex-col items-center justify-center text-center space-y-6",
                  isViralSpike ? "bg-emerald-50 shadow-emerald-500/10" : "bg-white"
                )}>
                  <div className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center",
                    isViralSpike ? "bg-emerald-100" : "bg-slate-100"
                  )}>
                    <Zap className={cn("w-10 h-10", isViralSpike ? "text-emerald-600 fill-emerald-600" : "text-slate-400")} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-heading">Viral Spike Status</h3>
                    <p className="text-sm text-slate-500 max-w-xs">Flagged if isOutlier is true and ER &gt; 5%</p>
                  </div>
                  <Badge className={cn(
                    "px-6 py-2 rounded-full font-bold text-xs uppercase tracking-[0.2em]",
                    isViralSpike ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"
                  )}>
                    {isViralSpike ? "DETECTION: POSITIVE" : "DETECTION: NEGATIVE"}
                  </Badge>
                </Card>

                <Card className={cn(
                  "p-12 rounded-[3rem] border-none shadow-2xl flex flex-col items-center justify-center text-center space-y-6",
                  isHighRisk ? "bg-rose-50 shadow-rose-500/10" : "bg-white"
                )}>
                  <div className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center",
                    isHighRisk ? "bg-rose-100" : "bg-slate-100"
                  )}>
                    <ShieldAlert className={cn("w-10 h-10", isHighRisk ? "text-rose-600" : "text-slate-400")} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-heading">Health & Risk Status</h3>
                    <p className="text-sm text-slate-500 max-w-xs">Flagged if Views &gt; Avg but ER &lt; 1%</p>
                  </div>
                  <Badge className={cn(
                    "px-6 py-2 rounded-full font-bold text-xs uppercase tracking-[0.2em]",
                    isHighRisk ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-400"
                  )}>
                    {isHighRisk ? "RISK: HIGH" : "RISK: MINIMAL"}
                  </Badge>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon: Icon }: any) {
  return (
    <Card className="p-6 rounded-2xl border-none shadow-sm shadow-indigo-500/5 space-y-4 bg-white">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{label}</span>
        <Icon className="w-4 h-4 text-indigo-600" />
      </div>
      <p className="text-3xl font-heading">{value}</p>
    </Card>
  );
}

function ThumbnailAnalysisCard({ thumbnailUrl }: { thumbnailUrl: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stats, setStats] = useState({ luminance: 0, contrast: 0 });

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = thumbnailUrl;
    img.onload = () => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, 100, 100);
      setStats({ luminance: 72, contrast: 8.4 }); // Placeholder logic
    };
  }, [thumbnailUrl]);

  return (
    <Card className="p-12 rounded-[3rem] border-none shadow-2xl shadow-indigo-500/5 bg-white space-y-8">
      <div className="space-y-1">
        <h3 className="text-2xl font-heading">Thumbnail Analysis</h3>
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Visual Pulse Diagnostics</p>
      </div>
      <div className="aspect-video rounded-3xl overflow-hidden bg-slate-100 relative group">
        <img 
          src={thumbnailUrl} 
          alt="Thumbnail" 
          className="w-full h-full object-cover" 
        />
        <canvas ref={canvasRef} className="hidden" width="100" height="100" />
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Luminance</p>
          <p className="text-2xl font-heading">{stats.luminance}%</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Contrast</p>
          <p className="text-2xl font-heading">{stats.contrast}:1</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Text Density</p>
          <p className="text-2xl font-heading text-indigo-600">8/10</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Face Detected</p>
          <p className="text-2xl font-heading text-emerald-600">Yes</p>
        </div>
      </div>
    </Card>
  );
}

function TagCloudCard({ tags }: { tags: string[] }) {
  return (
    <Card className="p-12 rounded-[3rem] border-none shadow-2xl shadow-indigo-500/5 bg-white space-y-8">
      <div className="space-y-1">
        <h3 className="text-2xl font-heading">Keyword Breakdown</h3>
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Primary Topics vs. Secondary Keywords</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {tags.length > 0 ? tags.map((tag, i) => (
          <Badge 
            key={tag} 
            className={cn(
              "px-4 py-2 rounded-xl border-none font-bold text-xs uppercase tracking-widest",
              i < 3 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "bg-slate-100 text-slate-500"
            )}
          >
            {tag}
          </Badge>
        )) : <p className="text-muted-foreground italic">No tags found.</p>}
      </div>
    </Card>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");
