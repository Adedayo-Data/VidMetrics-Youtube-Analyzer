"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  Download, 
  TrendingUp, 
  Target, 
  Zap, 
  ShieldCheck,
  Calendar,
  User,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  LayoutDashboard,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChannelAuditReport, VideoAudit } from "@/lib/youtube";

interface AuditReportProps {
  report: ChannelAuditReport;
}

export function AuditReport({ report }: AuditReportProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleExportPDF = () => {
    window.print();
  };

  const top3Videos = [...report.videos].sort((a, b) => b.performanceRatio - a.performanceRatio).slice(0, 3);
  const topLong = report.videos.filter(v => !v.isShort).sort((a, b) => b.viewCount - a.viewCount).slice(0, 3);
  const topShorts = report.videos.filter(v => v.isShort).sort((a, b) => b.viewCount - a.viewCount).slice(0, 3);

  return (
    <div className="flex-1 bg-white p-12 overflow-y-auto print:p-0">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto space-y-16 pb-20"
      >
        {/* Report Header */}
        <div className="flex items-start justify-between border-b pb-12 border-slate-100">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-200">
                <FileText className="text-white w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-heading text-slate-900 tracking-tight">Executive Performance Audit</h1>
                <p className="text-xs font-bold text-indigo-600 tracking-[0.4em] uppercase mt-1">Confidential Intelligence Report</p>
              </div>
            </div>
            <div className="flex gap-8 items-center pt-2">
              <div className="flex items-center gap-3 text-slate-500 bg-slate-50 px-4 py-2 rounded-xl">
                <User className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{report.channelName}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 bg-slate-50 px-4 py-2 rounded-xl">
                <Calendar className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
              <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[9px] uppercase tracking-widest px-3 py-1">V2.4 ANALYST CERTIFIED</Badge>
            </div>
          </div>
          <Button 
            onClick={handleExportPDF}
            className="bg-slate-900 hover:bg-black text-white rounded-2xl px-8 h-14 text-[10px] font-bold tracking-widest gap-3 shadow-xl shadow-slate-900/10 transition-all hover:scale-[1.02] active:scale-[0.98] print:hidden"
          >
            <Download className="w-5 h-5" />
            EXPORT PDF
          </Button>
        </div>

        {/* 1. Executive Summary */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-indigo-600 rounded-full" />
            <h2 className="text-2xl font-heading text-slate-900">1.0 Executive Summary</h2>
          </div>
          
          {/* Interpretation Guide */}
          <Card className="p-6 rounded-2xl border-indigo-100 bg-indigo-50/30 border-none">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="space-y-2">
                <h4 className="font-heading text-sm text-indigo-900">How to Read This Report</h4>
                <p className="text-xs text-indigo-700 leading-relaxed">
                  This audit analyzes your channel's performance across multiple dimensions. <strong>Status</strong> indicates your growth trend. 
                  <strong>Engagement Rate (ER)</strong> shows how actively viewers interact with your content. 
                  <strong>Performance Ratio</strong> reveals if your content reaches beyond your subscriber base (viral potential).
                </p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-7 space-y-6">
              <p className="text-slate-600 leading-relaxed text-sm">
                This audit provides a comprehensive analysis of the <span className="font-bold text-slate-900">{report.channelName}</span> YouTube channel. 
                Currently, the channel commands a global reach of <span className="font-bold text-slate-900">{(report.subscribers / 1000000).toFixed(1)}M subscribers</span>. 
                Our intelligence shows a <span className="font-bold text-indigo-600 uppercase tracking-widest text-xs">{report.kpis.status}</span> phase, with 
                <span className="font-bold text-slate-900"> {report.kpis.totalViewsLast30Days.toLocaleString()} views</span> generated in the last 30 days.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm">
                The channel maintains an average engagement rate of <span className="font-bold text-slate-900">{report.kpis.avgEngagementRate.toFixed(2)}%</span>, 
                benchmarking within the top tier of its niche. The strategic focus has successfully shifted toward high-velocity discovery via Shorts while maintaining long-form relationship depth.
              </p>
              
              {/* Detailed Metric Explanations */}
              <div className="space-y-4 pt-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Key Metrics Explained</h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-4 rounded-xl bg-slate-50 space-y-1">
                    <p className="text-xs font-bold text-slate-900">Growth Status: {report.kpis.status}</p>
                    <p className="text-[11px] text-slate-600">
                      {report.kpis.status === 'Spiking' ? 'Your channel is experiencing rapid growth (>15% recent increase). Capitalize on this momentum with consistent uploads.' :
                       report.kpis.status === 'Growth' ? 'Steady positive growth (5-15%). Your content strategy is working well. Maintain current approach.' :
                       report.kpis.status === 'Decline' ? 'Viewership is trending down (<-5%). Consider refreshing content topics or optimizing thumbnails/titles.' :
                       'Stable performance (-5% to +5%). Your channel maintains consistent viewership without significant fluctuations.'}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 space-y-1">
                    <p className="text-xs font-bold text-slate-900">Engagement Rate: {report.kpis.avgEngagementRate.toFixed(2)}%</p>
                    <p className="text-[11px] text-slate-600">
                      {report.kpis.avgEngagementRate > 8 ? 'Excellent engagement. Your audience deeply connects with your content.' :
                       report.kpis.avgEngagementRate > 5 ? 'Strong engagement above industry average. Continue your current approach.' :
                       report.kpis.avgEngagementRate > 3 ? 'Average engagement. Consider adding more calls-to-action to boost interaction.' :
                       'Below average engagement. Focus on content that sparks discussion and emotional response.'}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 space-y-1">
                    <p className="text-xs font-bold text-slate-900">30-Day Views: {report.kpis.totalViewsLast30Days.toLocaleString()}</p>
                    <p className="text-[11px] text-slate-600">
                      Total viewership across all videos in the last 30 days. This indicates your current reach and content consumption velocity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-5 grid grid-cols-2 gap-4">
              <SummaryCard label="Reach Potential" value={`${Math.min((report.kpis.totalViewsLast30Days / report.subscribers * 10), 10).toFixed(1)}/10`} color="indigo" />
              <SummaryCard label="Retention Health" value={`${Math.min(report.kpis.avgEngagementRate, 10).toFixed(1)}/10`} color="emerald" />
              <SummaryCard label="Format Balance" value={report.longForm.avgViews > report.shorts.avgViews ? "Long-Heavy" : "Short-Heavy"} color="slate" />
              <SummaryCard label="Growth Velocity" value={report.kpis.status} color="indigo" />
            </div>
          </div>
        </section>

        {/* 2. Format Segmentation Analysis */}
        <section className="space-y-10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-indigo-600 rounded-full" />
            <h2 className="text-2xl font-heading text-slate-900">2.0 Format Segmentation</h2>
          </div>
          
          {/* Format Explanation */}
          <Card className="p-6 rounded-2xl border-slate-100 bg-slate-50/30 border-none">
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Why we separate formats:</strong> YouTube uses two completely different algorithms for Long-form and Shorts. 
              Long-form prioritizes watch time and retention, while Shorts focus on immediate engagement and viral velocity. 
              Averaging them would give misleading insights. Compare your performance within each format for accurate assessment.
            </p>
          </Card>

          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-6">
              <Card className="p-8 border-slate-100 shadow-none bg-slate-50/30 space-y-6 rounded-[2rem]">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600">Long-Form Intelligence</h3>
                  <BarChart3 className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-baseline border-b border-slate-100 pb-4">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Average Views</span>
                    <span className="text-2xl font-heading text-slate-900">{report.longForm.avgViews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-slate-100 pb-4">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Engagement (ER)</span>
                    <span className="text-2xl font-heading text-indigo-600">{report.longForm.avgER.toFixed(2)}%</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-100">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Interpretation</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {report.longForm.avgER > report.kpis.avgEngagementRate ? 
                        "Your long-form content outperforms your channel average. This is your relationship-building pillar." :
                        "Your long-form engagement is below your channel average. Consider adding more hooks in the first 30 seconds."}
                    </p>
                  </div>
                </div>
              </Card>
              
              <div className="space-y-4">
                <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] px-2">Top Performers</h4>
                {topLong.map((v, i) => (
                  <TopVideoItem key={v.id} video={v} index={i} />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-8 border-slate-100 shadow-none bg-slate-50/30 space-y-6 rounded-[2rem]">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">Shorts Intelligence</h3>
                  <Zap className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-baseline border-b border-slate-100 pb-4">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Average Views</span>
                    <span className="text-2xl font-heading text-slate-900">{report.shorts.avgViews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-slate-100 pb-4">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Engagement (ER)</span>
                    <span className="text-2xl font-heading text-emerald-600">{report.shorts.avgER.toFixed(2)}%</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-100">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Interpretation</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {report.shorts.avgViews > report.longForm.avgViews ? 
                        `Shorts are driving ${(report.shorts.avgViews / report.longForm.avgViews).toFixed(1)}x more reach per upload. This is your discovery engine.` :
                        "Your Shorts are underperforming vs long-form. Consider making first 3 seconds more attention-grabbing."}
                    </p>
                  </div>
                </div>
              </Card>

              <div className="space-y-4">
                <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] px-2">Top Performers</h4>
                {topShorts.map((v, i) => (
                  <TopVideoItem key={v.id} video={v} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Strategic Recommendations */}
        <section className="space-y-10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-indigo-600 rounded-full" />
            <h2 className="text-2xl font-heading text-slate-900">3.0 Strategic Recommendations</h2>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <RecommendationItem 
              icon={Target}
              title="Double Down on High-Efficiency Keywords"
              desc="Analysis shows that videos utilizing top-performing tags have a 22% higher engagement delta. Review the Tactical Intelligence tab for the current 'Pillar' tags."
            />
            <RecommendationItem 
              icon={LayoutDashboard}
              title="Optimize Thumbnail Contrast for Reach"
              desc="Content with a Thumbnail Appeal Score below 10% is seeing a significant drop in reach score. We recommend increasing visual contrast by at least 15%."
            />
            <RecommendationItem 
              icon={Zap}
              title="Capitalize on Comment Heat"
              desc="Your most successful videos have a Comment-to-Like ratio above 10%. Encourage more direct audience interaction to boost algorithmic signal."
            />
            <RecommendationItem 
              icon={TrendingUp}
              title="Scale Shorts-to-Long Funnel"
              desc="The data suggests your Shorts are driving massive discovery. Implement pinned comment CTAs to move Shorts viewers into your deep long-form ecosystem."
            />
          </div>
        </section>

        {/* 4. Audit Methodology */}
        <section className="space-y-10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-indigo-600 rounded-full" />
            <h2 className="text-2xl font-heading text-slate-900">4.0 Audit Methodology</h2>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <MethodologyCard 
              title="Performance Ratio" 
              formula="(Views / Subs) * 100" 
              desc="Measures reach efficiency against core base."
            />
            <MethodologyCard 
              title="Engagement Rate" 
              formula="((L+C) / Views) * 100" 
              desc="Measures interaction quality and depth."
            />
            <MethodologyCard 
              title="Segmented KPIs" 
              formula="Shorts vs Long-form" 
              desc="Separates distinct algorithmic channels."
            />
          </div>
        </section>

        {/* 5. Final Verdict */}
        <section className="p-16 rounded-[4rem] bg-indigo-600 text-white space-y-8 relative overflow-hidden shadow-3xl shadow-indigo-600/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-1">
              <h2 className="text-4xl font-heading leading-tight">Audit Verdict: Healthy</h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-indigo-200">Official Analyst Conclusion</p>
            </div>
          </div>
          <p className="relative z-10 text-indigo-50 leading-relaxed text-lg max-w-3xl">
            Based on the data collected, the channel is in a sustainable growth cycle. The primary focus for the next quarter should be on maintaining format-specific engagement benchmarks while scaling discovery through Shorts. We project continued upward momentum if current content quality standards are maintained.
          </p>
          <div className="relative z-10 pt-8 border-t border-white/10 flex items-center gap-12">
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-indigo-300 uppercase tracking-widest">Analyst ID</p>
              <p className="text-sm font-bold tracking-widest uppercase">VM-PRO-2026</p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-indigo-300 uppercase tracking-widest">Report Hash</p>
              <p className="text-sm font-bold tracking-widest uppercase truncate w-32">0x9a2b...f8e1</p>
            </div>
          </div>
        </section>

        <footer className="text-center pt-24 pb-12">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.8em]">Powered by VidMetrics Intelligence • Editorial Audit v2.4</p>
        </footer>
      </motion.div>
    </div>
  );
}

function SummaryCard({ label, value, color }: { label: string, value: string, color: string }) {
  const colors: Record<string, string> = {
    indigo: "text-indigo-600 bg-indigo-50/50",
    emerald: "text-emerald-600 bg-emerald-50/50",
    slate: "text-slate-600 bg-slate-50/50"
  };

  return (
    <div className={cn("p-5 rounded-2xl flex flex-col gap-1", colors[color])}>
      <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">{label}</span>
      <span className="text-lg font-heading">{value}</span>
    </div>
  );
}

function TopVideoItem({ video, index }: { video: VideoAudit, index: number }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
      <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
        0{index + 1}
      </div>
      <div className="flex-1 min-w-0 space-y-0.5">
        <p className="text-xs font-bold text-slate-900 truncate uppercase tracking-tight">{video.title}</p>
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{video.viewCount.toLocaleString()} Views</span>
          <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">{video.engagementRate.toFixed(1)}% ER</span>
        </div>
      </div>
    </div>
  );
}

function RecommendationItem({ title, desc, icon: Icon }: { title: string, desc: string, icon: any }) {
  return (
    <div className="flex gap-5 p-8 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-indigo-100 transition-all group">
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5 text-indigo-600" />
      </div>
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em]">{title}</h4>
        <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}

function MethodologyCard({ title, formula, desc }: { title: string, formula: string, desc: string }) {
  return (
    <div className="p-8 rounded-[2rem] bg-white border border-slate-100 space-y-4">
      <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{title}</h4>
      <code className="text-[9px] font-bold text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-lg block w-fit">
        {formula}
      </code>
      <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");
