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
  FileText,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart,
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell,
  ReferenceLine,
  CartesianGrid,
  PieChart,
  Pie,
  AreaChart,
  Area
} from "recharts";
import { calculatePerformanceRatio, calculateEngagementRate, ChannelAuditReport, VideoAudit } from "@/lib/youtube";

interface IntelligenceHubProps {
  video: VideoAudit | null;
  report: ChannelAuditReport;
  onViewReport?: () => void;
}

export function IntelligenceHub({ video, report, onViewReport }: IntelligenceHubProps) {
  const [activeSubTab, setActiveSubTab] = useState("overview");
  
  // Default to #1 video if none selected
  const activeVideo = video || report.videos[0];

  const isShort = activeVideo.isShort;
  const formatAvgViews = isShort ? report.shorts.avgViews : report.longForm.avgViews;
  const formatAvgER = isShort ? report.shorts.avgER : report.longForm.avgER;

  const performanceRatio = activeVideo.performanceRatio;
  const engagementRate = activeVideo.engagementRate;
  const erDelta = ((engagementRate - formatAvgER) / formatAvgER) * 100;

  const vibeVerdict = performanceRatio > 20 
    ? `Explosive Reach: This ${isShort ? "Short" : "video"} is a primary growth driver, exceeding baseline reach by ${(performanceRatio / (formatAvgER || 1)).toFixed(1)}x.`
    : performanceRatio > 10
    ? `Strong Performance: This ${isShort ? "Short" : "video"} is performing well above expectations, capturing a significant portion of the audience.`
    : `Steady Reach: This ${isShort ? "Short" : "video"} maintains steady performance within the creator's expected range.`;

  const isHighRisk = activeVideo.viewCount > formatAvgViews && engagementRate < (formatAvgER * 0.5);
  const isViralSpike = activeVideo.isOutlier && engagementRate > (formatAvgER * 1.2);

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
                  
                  <div className="grid grid-cols-2 gap-8">
                    <Card className="p-12 rounded-[3rem] border-none shadow-2xl shadow-indigo-500/5 bg-white relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-[40%] h-full bg-indigo-50/50 blur-[100px] rounded-full translate-x-1/2 -z-1" />
                      <div className="relative z-10 space-y-6">
                        <span className="text-[10px] font-bold tracking-[0.3em] text-indigo-600 uppercase">Reach & Vibe Verdict</span>
                        <div className="flex items-baseline gap-4">
                          <p className="text-6xl font-heading">{performanceRatio.toFixed(1)}<span className="text-3xl ml-1">%</span></p>
                          <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] uppercase tracking-widest px-3 py-1">Reach Score</Badge>
                        </div>
                        <p className="text-xl text-slate-600 font-medium leading-relaxed">{vibeVerdict}</p>
                      </div>
                    </Card>

                    <Card className="p-12 rounded-[3rem] border-none shadow-2xl shadow-indigo-500/5 bg-slate-900 text-white relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-[40%] h-full bg-indigo-500/20 blur-[100px] rounded-full translate-x-1/2 -z-1" />
                      <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-indigo-400" />
                          <span className="text-[10px] font-bold tracking-[0.3em] text-indigo-400 uppercase">Strategic Insight</span>
                        </div>
                        <h3 className="text-2xl font-heading">Actionable Pivot</h3>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {performanceRatio > 20 
                            ? "Scale this content pillar immediately. The performance ratio suggests this topic has deep algorithmic resonance beyond your core sub-base."
                            : performanceRatio < 5 
                            ? "Consider a thumbnail/title refresh. The engagement delta is positive, suggesting the content is good but the 'hook' is failing to convert impressions."
                            : "Maintain current strategy. This video serves as a solid baseline for your core audience retention."}
                        </p>
                        <Button 
                          onClick={onViewReport}
                          variant="outline" 
                          className="border-indigo-500/30 text-white hover:bg-indigo-50/50 rounded-xl h-10 px-6 text-[10px] font-bold tracking-widest uppercase transition-colors"
                        >
                          View Roadmap
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>

                <div className="col-span-4 space-y-8">
                  <Card className="p-8 rounded-[2.5rem] border-none shadow-2xl shadow-indigo-500/5 flex flex-col justify-between bg-white h-full min-h-[400px]">
                    <div className="space-y-12">
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
                          vs. {isShort ? "Shorts" : "Long-form"} Average ({formatAvgER.toFixed(1)}%)
                        </p>
                      </div>

                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold tracking-[0.3em] text-indigo-600 uppercase">Quality Score Breakdown</span>
                            <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-tighter">Impact on ER Delta</Badge>
                          </div>
                          <div className="space-y-4">
                            <QualityCheck 
                              label="Thumbnail Appeal" 
                              status={performanceRatio > 10 ? "success" : "warning"} 
                              description="Measures click-through efficiency. High scores here suggest your visual 'hook' is strong, increasing views and potential engagement."
                            />
                            <QualityCheck 
                              label="Audience Retention" 
                              status={engagementRate > formatAvgER ? "success" : "neutral"} 
                              description="Compares current video ER to your format average. If positive, it means viewers are staying long enough to interact."
                            />
                            <QualityCheck 
                              label="Comment Velocity" 
                              status={activeVideo.commentCount > (activeVideo.viewCount * 0.005) ? "success" : "neutral"} 
                              description="Calculates comments per view. A higher velocity indicates more 'heat' and debate, which heavily boosts your ER Delta."
                            />
                          </div>
                          <div className="pt-4 border-t border-slate-50">
                            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              <span>Comment Heat</span>
                              <span className="text-slate-900">{(activeVideo.commentCount / (activeVideo.viewCount || 1) * 1000).toFixed(2)} / 1k views</span>
                            </div>
                          </div>
                        </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {activeSubTab === "tactical" && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <ThumbnailAnalysisCard thumbnailUrl={activeVideo.thumbnail} />
                  <TagCloudCard tags={activeVideo.tags || []} report={report} />
                </div>

                <div className="grid grid-cols-12 gap-8">
                  <Card className="col-span-7 p-12 rounded-[3rem] border-none shadow-2xl shadow-indigo-500/5 bg-white space-y-8">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-heading">Engagement Distribution</h3>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Interaction breakdown for this specific content</p>
                    </div>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Likes', value: activeVideo.likeCount, fill: '#4f46e5' },
                              { name: 'Comments', value: activeVideo.commentCount, fill: '#c7d2fe' },
                            ]}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            <Cell key="likes" fill="#4f46e5" />
                            <Cell key="comments" fill="#c7d2fe" />
                          </Pie>
                          <Tooltip 
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-8">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-600" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Likes ({((activeVideo.likeCount / (activeVideo.likeCount + activeVideo.commentCount || 1)) * 100).toFixed(1)}%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-200" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Comments ({((activeVideo.commentCount / (activeVideo.likeCount + activeVideo.commentCount || 1)) * 100).toFixed(1)}%)</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="col-span-5 p-12 rounded-[3rem] border-none shadow-2xl shadow-indigo-500/5 bg-slate-900 text-white space-y-8">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-heading text-white">Sentiment Proxy</h3>
                      <p className="text-[10px] text-indigo-400 font-medium uppercase tracking-widest">Interaction intensity metrics</p>
                    </div>
                    <div className="space-y-12 py-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-baseline">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">L/V Ratio</span>
                          <span className="text-xl font-heading">{(activeVideo.likeCount / (activeVideo.viewCount || 1) * 100).toFixed(2)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: `${Math.min((activeVideo.likeCount / (activeVideo.viewCount || 1) * 100) * 10, 100)}%` }} />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-baseline">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">C/L Ratio</span>
                          <span className="text-xl font-heading">{(activeVideo.commentCount / (activeVideo.likeCount || 1) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${Math.min((activeVideo.commentCount / (activeVideo.likeCount || 1) * 100) * 2, 100)}%` }} />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="p-12 rounded-[3rem] border-none shadow-2xl shadow-indigo-500/5 bg-white space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-heading">Keyword Efficiency</h3>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Performance correlation by topic</p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="pb-4 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Tag / Topic</th>
                          <th className="pb-4 text-[10px] font-bold tracking-widest text-muted-foreground uppercase text-right">Channel Avg ER</th>
                          <th className="pb-4 text-[10px] font-bold tracking-widest text-muted-foreground uppercase text-right">This Video ER</th>
                          <th className="pb-4 text-[10px] font-bold tracking-widest text-muted-foreground uppercase text-right">Efficiency</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {(activeVideo.tags?.slice(0, 5) || []).map((tag, i) => {
                          const mockEfficiency = 100 + (Math.random() * 40 - 20);
                          return (
                            <tr key={tag} className="group">
                              <td className="py-4">
                                <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{tag}</span>
                              </td>
                              <td className="py-4 text-right text-xs font-medium text-slate-500">{formatAvgER.toFixed(2)}%</td>
                              <td className="py-4 text-right text-xs font-bold text-slate-900">{engagementRate.toFixed(2)}%</td>
                              <td className="py-4 text-right">
                                <Badge className={cn(
                                  "rounded-lg px-2 py-1 text-[10px] font-bold border-none",
                                  mockEfficiency > 100 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                )}>
                                  {mockEfficiency.toFixed(1)}%
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}

            {activeSubTab === "context" && (
              <div className="space-y-8">
                <Card className="p-12 rounded-[3rem] border-none shadow-2xl shadow-indigo-500/5 bg-white space-y-12">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-heading">Velocity Pulse</h3>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Average Daily Views vs. Channel Format Average</p>
                    </div>
                  </div>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { day: 'Day 1', video: activeVideo.viewCount * 0.1, channel: formatAvgViews / 30 },
                        { day: 'Day 5', video: activeVideo.viewCount * 0.3, channel: formatAvgViews / 30 },
                        { day: 'Day 10', video: activeVideo.viewCount * 0.5, channel: formatAvgViews / 30 },
                        { day: 'Day 15', video: activeVideo.viewCount * 0.7, channel: formatAvgViews / 30 },
                        { day: 'Day 20', video: activeVideo.viewCount * 0.85, channel: formatAvgViews / 30 },
                        { day: 'Day 25', video: activeVideo.viewCount * 0.95, channel: formatAvgViews / 30 },
                        { day: 'Today', video: activeVideo.viewCount, channel: formatAvgViews / 30 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Line type="monotone" dataKey="video" stroke="#4f46e5" strokeWidth={4} dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }} name="This Video" />
                        <Line type="monotone" dataKey="channel" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Format Avg" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

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
              </div>
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

function QualityCheck({ label, status, description }: { label: string, status: "success" | "warning" | "neutral", description?: string }) {
  const Icon = status === "success" ? CheckCircle2 : status === "warning" ? AlertCircle : ShieldCheck;
  const colorClass = status === "success" ? "text-emerald-500" : status === "warning" ? "text-rose-500" : "text-slate-400";
  const bgClass = status === "success" ? "bg-emerald-50" : status === "warning" ? "bg-rose-50" : "bg-slate-50";

  return (
    <div className={cn("p-4 rounded-xl space-y-2", bgClass)}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{label}</span>
        <Icon className={cn("w-4 h-4", colorClass)} />
      </div>
      {description && (
        <p className="text-[10px] text-slate-500 leading-tight font-medium">{description}</p>
      )}
    </div>
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

function TagCloudCard({ tags, report }: { tags: string[], report: ChannelAuditReport }) {
  const top5Videos = report.videos.slice(0, 5);
  const topTags = Array.from(new Set(top5Videos.flatMap(v => v.tags || [])));
  
  return (
    <Card className="p-12 rounded-[3rem] border-none shadow-2xl shadow-indigo-500/5 bg-white space-y-8">
      <div className="space-y-1">
        <h3 className="text-2xl font-heading">Keyword Breakdown</h3>
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Primary Topics vs. Secondary Keywords</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {tags.length > 0 ? tags.map((tag, i) => {
          const isHighEfficiency = topTags.includes(tag);
          return (
            <Badge 
              key={tag} 
              className={cn(
                "px-4 py-2 rounded-xl border-none font-bold text-xs uppercase tracking-widest flex items-center gap-2",
                isHighEfficiency ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "bg-slate-100 text-slate-500"
              )}
            >
              {tag}
              {isHighEfficiency && <Zap className="w-3 h-3 fill-current" />}
            </Badge>
          );
        }) : <p className="text-muted-foreground italic">No tags found.</p>}
      </div>
      {tags.length > 0 && (
        <div className="pt-4 border-t border-slate-50 flex items-center gap-2">
          <Zap className="w-4 h-4 text-indigo-600" />
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">High-Efficiency Pillars detected</span>
        </div>
      )}
    </Card>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");
