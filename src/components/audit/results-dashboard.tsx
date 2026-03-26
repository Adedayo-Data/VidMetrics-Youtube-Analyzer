"use client";

import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
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

const chartData = [
  { name: "Mon", views: 40, engagement: 60 },
  { name: "Tue", views: 30, engagement: 45 },
  { name: "Wed", views: 20, engagement: 30 },
  { name: "Thu", views: 45, engagement: 70 },
  { name: "Fri", views: 35, engagement: 55 },
  { name: "Sat", views: 50, engagement: 80 },
  { name: "Sun", views: 40, engagement: 65 },
];

const tableData = [
  { id: "01", date: "Mar 12, 2024", title: "Strategic Insights for Global Scale", category: "TECH", views: "2.4M", likes: "142K", comments: "12.5K", ratio: "12.4%" },
  { id: "02", date: "Mar 08, 2024", title: "The Future of AI in Creative Industries", category: "INNOVATION", views: "1.8M", likes: "98K", comments: "8.2K", ratio: "9.8%" },
  { id: "03", date: "Mar 01, 2024", title: "Quarterly Review: Q4 Milestones", category: "BUSINESS", views: "1.2M", likes: "65K", comments: "4.1K", ratio: "8.5%" },
  { id: "04", date: "Feb 24, 2024", title: "Understanding Consumer Behavior in ...", category: "MARKETING", views: "950K", likes: "42K", comments: "2.9K", ratio: "7.2%" },
];

export function ResultsDashboard() {
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

  return (
    <div className="flex-1 bg-slate-50/30 p-8 overflow-y-auto">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">Quarterly Analysis Report</span>
            <h1 className="text-4xl font-heading text-slate-900">Enterprise Audit 2024</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-6 text-xs font-bold tracking-widest">
              GENERATE REPORT
            </Button>
          </div>
        </div>

        {/* Top Metrics Grid */}
        <div className="grid grid-cols-4 gap-6">
          {[
            { label: "TOTAL SUBSCRIBERS", value: "18.5M", sub: "Global Reach Growth", trend: "+12%", color: "emerald" },
            { label: "MONTHLY VIEWS", value: "3.8B", sub: "Consolidated Playback", trend: "+8.4%", color: "emerald" },
            { label: "AVG ENGAGEMENT", value: "8.2%", sub: "Retention benchmark", trend: "Steady", color: "indigo" },
            { label: "CONTENT VOLUME", value: "12/wk", sub: "Upload frequency", trend: "-2%", color: "rose" },
          ].map((metric, i) => (
            <motion.div key={i} variants={item}>
              <Card className="p-6 rounded-2xl border-none shadow-sm shadow-indigo-500/5 space-y-4">
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
                  <p className="text-3xl font-heading">{metric.value}</p>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{metric.sub}</p>
                </div>
                <div className="h-8 w-full bg-slate-50 rounded overflow-hidden relative">
                  <svg viewBox="0 0 100 40" className="absolute inset-0 w-full h-full opacity-30">
                    <path 
                      d={i % 2 === 0 ? "M0 35 Q 20 35, 40 25 T 80 15 T 100 5" : "M0 35 Q 20 20, 40 25 T 80 10 T 100 5"} 
                      fill="none" 
                      stroke={metric.color === "emerald" ? "#10b981" : metric.color === "indigo" ? "#4f46e5" : "#f43f5e"} 
                      strokeWidth="2" 
                    />
                  </svg>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Main Video Spotlight */}
          <motion.div variants={item} className="col-span-5">
            <Card className="h-full rounded-[2.5rem] border-none shadow-2xl shadow-indigo-500/10 overflow-hidden flex flex-col">
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

                <div className="relative aspect-video rounded-3xl overflow-hidden group shadow-xl shadow-slate-900/10 hover:scale-[1.02] transition-all duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1626379953822-baec19c3bbcd?q=80&w=2070&auto=format&fit=crop" 
                    alt="Video thumbnail" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/20 backdrop-blur-xl p-5 rounded-full border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-indigo-500 rounded-full" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">Active Intelligence</span>
                    <h3 className="text-2xl font-heading leading-tight">Evolution of Content Strategy (2024)</h3>
                  </div>
                </div>
              </div>
              <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                <Button className="w-full bg-slate-900 hover:bg-black text-white rounded-xl h-12 text-xs font-bold tracking-widest gap-2 transition-all hover:scale-[1.02]">
                  WATCH & ANALYZE
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>

          <div className="col-span-7 flex flex-col gap-6">
            {/* Performance Velocity Chart */}
            <motion.div variants={item} className="flex-1">
              <Card className="h-full rounded-[2.5rem] border-none shadow-2xl shadow-indigo-500/5 p-8 space-y-8 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-heading">Performance Velocity</h3>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Engagement vs. View Velocity (Last 30 Days)</p>
                  </div>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <Button variant="ghost" className="h-8 px-4 rounded-lg text-[10px] font-bold tracking-widest bg-white shadow-sm text-indigo-600">VIEWS</Button>
                    <Button variant="ghost" className="h-8 px-4 rounded-lg text-[10px] font-bold tracking-widest text-muted-foreground">ENGAGEMENT</Button>
                  </div>
                </div>

                <div className="flex-1 w-full min-h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.3} />
                        </linearGradient>
                        <linearGradient id="barGradientSecondary" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#c7d2fe" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="#c7d2fe" stopOpacity={0.3} />
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }}
                        dy={10}
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
                      <Bar dataKey="views" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={24} />
                      <Bar dataKey="engagement" fill="url(#barGradientSecondary)" radius={[6, 6, 0, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <p className="text-4xl font-heading">102.4k</p>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-2">Average Daily Spike</p>
                  </div>
                  <Button variant="link" className="text-indigo-600 font-bold tracking-widest text-[10px] gap-2 p-0">
                    DETAIL LOGS
                    <ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Performance Verdict - Glassmorphism Card */}
            <motion.div variants={item}>
              <Card className="relative overflow-hidden rounded-[2.5rem] border-none p-8 h-48 flex items-center shadow-2xl shadow-indigo-500/5 group">
                {/* Background Blobs for Glass Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-1000" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-lavender-500/20 rounded-full blur-2xl transform -translate-x-5 translate-y-5 group-hover:scale-150 transition-transform duration-1000" />
                
                {/* Glass Layer */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border border-white/40 rounded-[2.5rem]" />
                
                <div className="relative z-10 flex items-center gap-8 w-full">
                  <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-600/20 rotate-3 group-hover:rotate-0 transition-transform">
                    <Zap className="w-10 h-10 text-white fill-white" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-indigo-600 uppercase">Performance Verdict</span>
                    <h3 className="text-3xl font-heading">Exceptional Momentum</h3>
                    <p className="text-sm text-slate-600 max-w-md">The channel is outperforming 94% of competitors in the same niche this quarter.</p>
                  </div>
                  <Button variant="outline" className="rounded-full bg-white/50 backdrop-blur border-white/60 hover:bg-white transition-all h-12 w-12 p-0">
                    <ArrowUpRight className="w-5 h-5 text-indigo-600" />
                  </Button>
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
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Performance metrics for this month's release cycle</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="rounded-xl h-10 px-4 text-[10px] font-bold tracking-widest gap-2 border-slate-200">
                  <Filter className="w-3.5 h-3.5" />
                  FILTER
                </Button>
                <Button variant="outline" className="rounded-xl h-10 px-4 text-[10px] font-bold tracking-widest gap-2 border-slate-200">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  SORT
                </Button>
              </div>
            </div>

            <Card className="rounded-3xl border-none shadow-2xl shadow-indigo-500/5 overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-slate-100 hover:bg-transparent">
                    <TableHead className="w-[80px] text-[10px] font-bold tracking-widest py-6">S/N</TableHead>
                    <TableHead className="w-[120px] text-[10px] font-bold tracking-widest">DATE</TableHead>
                    <TableHead className="text-[10px] font-bold tracking-widest">VIDEO TITLE</TableHead>
                    <TableHead className="text-right text-[10px] font-bold tracking-widest">VIEWS</TableHead>
                    <TableHead className="text-right text-[10px] font-bold tracking-widest">LIKES</TableHead>
                    <TableHead className="text-right text-[10px] font-bold tracking-widest">COMMENTS</TableHead>
                    <TableHead className="text-right text-[10px] font-bold tracking-widest">ENGAGEMENT RATIO</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.id} className="border-slate-50 hover:bg-slate-50/30 transition-colors">
                      <TableCell className="font-medium text-slate-400 py-6">{row.id}</TableCell>
                      <TableCell className="text-[11px] font-semibold text-slate-500">{row.date}</TableCell>
                      <TableCell>
                        <div className="space-y-0.5">
                          <p className="font-bold text-slate-900 text-sm">{row.title}</p>
                          <p className="text-[9px] font-bold text-indigo-500 tracking-widest uppercase">CATEGORY: {row.category}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-slate-700">{row.views}</TableCell>
                      <TableCell className="text-right font-semibold text-slate-700">{row.likes}</TableCell>
                      <TableCell className="text-right font-semibold text-slate-700">{row.comments}</TableCell>
                      <TableCell className="text-right">
                        <span className="text-indigo-600 font-bold text-lg">{row.ratio}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="px-8 py-4 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
                <p className="text-[11px] text-muted-foreground font-medium">Showing 1 to 4 of 48 entries</p>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400"><ChevronLeft className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-indigo-600 text-white font-bold text-xs">1</Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-500 font-bold text-xs">2</Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-500 font-bold text-xs">3</Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400"><ChevronRight className="w-4 h-4" /></Button>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");
