"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ComposedChart,
  Bar, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Play, 
  MoreHorizontal, 
  Download, 
  Zap, 
  Search, 
  Bell, 
  Settings,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculatePerformanceRatio, calculateEngagementRate, ChannelAuditReport } from "@/lib/youtube";
import { formatNumber } from "@/lib/utils";

interface StrategicOverviewProps {
  report: ChannelAuditReport;
  onVideoSelect: (video: any) => void;
  onGenerateReport: () => void;
}

export function StrategicOverview({ report, onVideoSelect, onGenerateReport }: StrategicOverviewProps) {
  const [chartMode, setChartMode] = useState<"views" | "engagement">("views");
  const [contentType, setContentType] = useState<"all" | "long" | "shorts">("all");
  const [showIframe, setShowIframe] = useState(false);
  
  // Sorting and filtering state
  const [sortBy, setSortBy] = useState<"performanceRatio" | "viewCount" | "engagementRate" | "publishedAt">("performanceRatio");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFormat, setFilterFormat] = useState<"all" | "shorts" | "long">("all");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const now = new Date();
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

  // Apply sorting and filtering
  const processedVideos = report.videos
    .filter(v => {
      if (contentType === "all") return true;
      if (contentType === "long") return !v.isShort;
      if (contentType === "shorts") return v.isShort;
      return true;
    })
    .filter(v => {
      if (filterFormat === "all") return true;
      if (filterFormat === "shorts") return v.isShort;
      if (filterFormat === "long") return !v.isShort;
      return true;
    })
    .filter(v => {
      if (!searchQuery) return true;
      return v.title.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (sortOrder === "desc") {
        return (bVal as number) - (aVal as number);
      }
      return (aVal as number) - (bVal as number);
    });

  const filteredVideos = processedVideos.filter(v => new Date(v.publishedAt) >= thirtyDaysAgo);
  const displayVideos = filteredVideos.length > 0 ? filteredVideos : processedVideos;
  const topVideo = displayVideos[0];

  // Safety check - if no videos available, show empty state
  if (!topVideo) {
    return (
      <div className="flex-1 bg-slate-50/30 p-8 overflow-y-auto">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto space-y-8"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">Quarterly Analysis Report</span>
              <h1 className="text-4xl font-heading text-slate-900">{report.channelName} Audit 2026</h1>
            </div>
          </div>
          <Card className="p-12 rounded-[2.5rem] border-none shadow-2xl shadow-indigo-500/5 bg-white text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-heading text-slate-900">No Videos Found</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                This channel doesn't have any videos matching your current filters. Try adjusting your search or format filters.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  const chartData = displayVideos.slice(0, 7).reverse().map(v => ({
    name: new Date(v.publishedAt).toLocaleDateString('en-US', { weekday: 'short' }),
    views: v.viewCount,
    engagement: v.engagementRate
  }));

  const metrics = contentType === "shorts" ? [
    { label: "SHORTS AVG VIEWS", value: formatNumber(report.shorts.avgViews), sub: "Avg Reach per Short", trend: "+5%", color: "emerald" },
    { label: "SHORTS AVG ENGAGEMENT", value: report.shorts.avgER.toFixed(1) + "%", sub: "Shorts Retention", trend: "Steady", color: "indigo" },
    { label: "SHORTS VOLUME", value: report.videos.filter(v => v.isShort).length.toString(), sub: "Last 50 uploads", trend: "High", color: "indigo" },
    { 
      label: "TOP PERFORMING SHORT", 
      value: report.videos.find(v => v.id === report.shorts.topVideoId)?.title || "N/A", 
      sub: "Peak Performer", 
      trend: "Viral", 
      color: "emerald",
      isTitle: true 
    },
  ] : contentType === "long" ? [
    { label: "LONG-FORM AVG VIEWS", value: formatNumber(report.longForm.avgViews), sub: "Avg Reach per Video", trend: "+8%", color: "emerald" },
    { label: "LONG-FORM AVG ENGAGEMENT", value: report.longForm.avgER.toFixed(1) + "%", sub: "Video Retention", trend: "Growth", color: "indigo" },
    { label: "VIDEO VOLUME", value: report.videos.filter(v => !v.isShort).length.toString(), sub: "Last 50 uploads", trend: "Steady", color: "indigo" },
    { 
      label: "TOP PERFORMING VIDEO", 
      value: report.videos.find(v => v.id === report.longForm.topVideoId)?.title || "N/A", 
      sub: "Peak Performer", 
      trend: "Growth", 
      color: "emerald",
      isTitle: true 
    },
  ] : [
    { label: "TOTAL SUBSCRIBERS", value: formatNumber(report.subscribers), sub: "Global Reach", trend: "+12%", color: "emerald" },
    { label: "30D VIEW VOLUME", value: formatNumber(report.kpis.totalViewsLast30Days), sub: "Consolidated Playback", trend: report.kpis.viewGrowthPercent + "%", color: "emerald" },
    { label: "AVG ENGAGEMENT", value: report.kpis.avgEngagementRate.toFixed(1) + "%", sub: "Retention benchmark", trend: report.kpis.status, color: "indigo" },
    { label: "CONTENT VOLUME", value: report.videos.length.toString(), sub: "Recent uploads", trend: "Steady", color: "indigo" },
  ];

  const performanceVerdict = contentType === "shorts" 
    ? `Short-form content is averaging ${report.shorts.avgViews.toLocaleString()} views with ${report.shorts.avgER.toFixed(1)}% engagement, driving high-velocity discovery.`
    : contentType === "long"
    ? `Long-form videos are maintaining ${report.longForm.avgViews.toLocaleString()} views, serving as the core relationship builder for the channel.`
    : `In the last 30 days, this creator has gained ${report.kpis.totalViewsLast30Days.toLocaleString()} views across their latest content, signaling a ${report.kpis.status} phase.`;

  return (
    <div className="flex-1 bg-slate-50/30 p-8 overflow-y-auto">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">Quarterly Analysis Report</span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <h1 className="text-4xl font-heading text-slate-900">{report.channelName} Audit 2026</h1>
              <div className="flex bg-slate-200/50 p-1 rounded-2xl print:hidden">
                {(["all", "long", "shorts"] as const).map((type) => (
                  <Button
                    key={type}
                    onClick={() => setContentType(type)}
                    variant="ghost"
                    className={cn(
                      "h-10 px-6 rounded-xl text-[10px] font-bold tracking-widest transition-all",
                      contentType === type ? "bg-white shadow-sm text-indigo-600" : "text-muted-foreground"
                    )}
                  >
                    {type.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={onGenerateReport}
              className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-6 text-xs font-bold tracking-widest transition-all hover:scale-[1.02]"
            >
              GENERATE REPORT
            </Button>
          </div>
        </div>

        {/* Top Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {metrics.map((metric, i) => (
            <motion.div key={i} variants={item}>
              <Card className="p-6 rounded-2xl border-none shadow-sm shadow-indigo-500/5 space-y-4 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{metric.label}</span>
                  <Badge variant="secondary" className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full",
                    metric.color === "emerald" ? "bg-emerald-50 text-emerald-600" : 
                    metric.color === "indigo" ? "bg-indigo-50 text-indigo-600" : 
                    "bg-rose-50 text-rose-600"
                  )}>
                    {metric.trend}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className={cn(
                    "font-heading",
                    metric.isTitle ? "text-sm line-clamp-2 h-10 leading-tight" : "text-3xl"
                  )}>
                    {metric.value}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{metric.sub}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Video Spotlight */}
          <motion.div variants={item} className="col-span-1 lg:col-span-5">
            <Card className="h-full rounded-[2.5rem] border-none shadow-2xl shadow-indigo-500/10 overflow-hidden flex flex-col bg-white">
              <div className="p-8 space-y-6 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-indigo-600 text-white font-heading italic px-4 py-1.5 rounded-xl border-none">
                      RANKING: #1
                    </Badge>
                    <span className="font-heading text-xl">Market Dominator</span>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-slate-100 rounded-full">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>

                <div 
                  onClick={() => setShowIframe(true)}
                  className="relative aspect-video rounded-3xl overflow-hidden group shadow-xl shadow-slate-900/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  {showIframe ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${topVideo.id}?autoplay=1`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <>
                      <img 
                        src={topVideo.thumbnail} 
                        alt="Video thumbnail" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/20 backdrop-blur-xl p-5 rounded-full border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">Active Intelligence</span>
                    <h3 className="text-2xl font-heading leading-tight truncate">{topVideo.title}</h3>
                  </div>
                </div>
              </div>
              <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                <Button 
                  onClick={() => {
                    setShowIframe(true);
                    onVideoSelect(topVideo);
                  }}
                  className="w-full bg-slate-900 hover:bg-black text-white rounded-xl h-12 text-xs font-bold tracking-widest gap-2 transition-all hover:scale-[1.02]"
                >
                  WATCH & ANALYZE
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>

          <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
            {/* Performance Velocity Chart */}
            <motion.div variants={item} className="flex-1">
              <Card className="h-full rounded-[2.5rem] border-none shadow-2xl shadow-indigo-500/5 p-8 space-y-8 flex flex-col bg-white">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-heading">Performance Velocity</h3>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Engagement vs. View Velocity (Latest Uploads)</p>
                  </div>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <Button 
                      onClick={() => setChartMode("views")}
                      variant="ghost" 
                      className={cn(
                        "h-8 px-4 rounded-lg text-[10px] font-bold tracking-widest transition-all",
                        chartMode === "views" ? "bg-white shadow-sm text-indigo-600" : "text-muted-foreground"
                      )}
                    >
                      VIEWS
                    </Button>
                    <Button 
                      onClick={() => setChartMode("engagement")}
                      variant="ghost" 
                      className={cn(
                        "h-8 px-4 rounded-lg text-[10px] font-bold tracking-widest transition-all",
                        chartMode === "engagement" ? "bg-white shadow-sm text-indigo-600" : "text-muted-foreground"
                      )}
                    >
                      ENGAGEMENT
                    </Button>
                  </div>
                </div>

                <div className="flex-1 w-full min-h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.3} />
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }}
                        dy={10}
                      />
                      <YAxis 
                        yAxisId="left"
                        orientation="left"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: '#64748b' }}
                        tickFormatter={(value) => formatNumber(value)}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: '#4f46e5' }}
                        tickFormatter={(value) => `${value.toFixed(1)}%`}
                      />
                      <Tooltip 
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={{ 
                          borderRadius: '16px', 
                          border: 'none', 
                          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}
                      />
                      {chartMode === "views" ? (
                        <>
                          <Bar yAxisId="left" dataKey="views" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={24} />
                          <Bar yAxisId="right" dataKey="engagement" fill="#c7d2fe" radius={[6, 6, 0, 0]} barSize={24} />
                        </>
                      ) : (
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="engagement" 
                          stroke="#4f46e5" 
                          strokeWidth={4}
                          dot={{ fill: '#4f46e5', r: 6, strokeWidth: 2, stroke: '#fff' }}
                        />
                      )}
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>

            {/* Performance Verdict - Glassmorphism Card */}
            <motion.div variants={item}>
              <Card className="relative overflow-hidden rounded-[2.5rem] border-none p-8 h-48 flex items-center shadow-2xl shadow-indigo-500/5 group bg-white/40 backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-1000" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-lavender-500/20 rounded-full blur-2xl transform -translate-x-5 translate-y-5 group-hover:scale-150 transition-transform duration-1000" />
                
                <div className="relative z-10 flex items-center gap-8 w-full">
                  <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-600/20 rotate-3 group-hover:rotate-0 transition-transform">
                    <Zap className="w-10 h-10 text-white fill-white" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-indigo-600 uppercase">Performance Verdict</span>
                    <h3 className="text-3xl font-heading">Intelligence Summary</h3>
                    <p className="text-sm text-slate-600 max-w-md">{performanceVerdict}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Top Performing Content Table */}
        <motion.div variants={item}>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-3xl font-heading">Top Performing Content</h2>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Performance metrics for recent uploads</p>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 flex-1 min-w-[300px]">
                <Search className="w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 rounded-xl border-slate-200 text-sm"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Format:</span>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  {(["all", "shorts", "long"] as const).map((format) => (
                    <Button
                      key={format}
                      onClick={() => setFilterFormat(format)}
                      variant="ghost"
                      className={cn(
                        "h-8 px-4 rounded-lg text-[10px] font-bold tracking-widest transition-all",
                        filterFormat === format ? "bg-white shadow-sm text-indigo-600" : "text-muted-foreground"
                      )}
                    >
                      {format.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="h-8 px-3 rounded-lg border border-slate-200 text-[10px] font-bold uppercase tracking-wider bg-white"
                >
                  <option value="performanceRatio">Performance</option>
                  <option value="viewCount">Views</option>
                  <option value="engagementRate">Engagement</option>
                  <option value="publishedAt">Date</option>
                </select>
                <Button
                  onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                  variant="outline"
                  className="h-8 px-3 rounded-lg border-slate-200"
                >
                  {sortOrder === "desc" ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Card className="rounded-3xl border-none shadow-2xl shadow-indigo-500/5 overflow-hidden bg-white">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-slate-100 hover:bg-transparent">
                    <TableHead className="w-[80px] text-[10px] font-bold tracking-widest py-6">S/N</TableHead>
                    <TableHead className="w-[120px] text-[10px] font-bold tracking-widest">DATE</TableHead>
                    <TableHead className="text-[10px] font-bold tracking-widest">VIDEO TITLE</TableHead>
                    <TableHead className="text-right text-[10px] font-bold tracking-widest">VIEWS</TableHead>
                    <TableHead className="text-right text-[10px] font-bold tracking-widest">PERFORMANCE RATIO</TableHead>
                    <TableHead className="text-right text-[10px] font-bold tracking-widest">ENGAGEMENT RATE</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayVideos.slice(0, 10).map((row, i) => (
                    <TableRow 
                      key={row.id} 
                      onClick={() => onVideoSelect(row)}
                      className="border-slate-50 hover:bg-slate-50/30 transition-colors cursor-pointer group"
                    >
                      <TableCell className="font-medium text-slate-400 py-6">{(i + 1).toString().padStart(2, '0')}</TableCell>
                      <TableCell className="text-[11px] font-semibold text-slate-500">{new Date(row.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</TableCell>
                      <TableCell>
                        <div className="space-y-0.5">
                          <p className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors truncate max-w-md">{row.title}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-slate-700">{formatNumber(row.viewCount)}</TableCell>
                      <TableCell className="text-right">
                        <span className="text-indigo-600 font-bold text-lg">{row.performanceRatio.toFixed(1)}%</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-slate-900 font-bold text-lg">{row.engagementRate.toFixed(1)}%</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");
