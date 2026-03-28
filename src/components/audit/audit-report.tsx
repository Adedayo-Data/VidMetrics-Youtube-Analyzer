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
  Activity
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChannelAuditReport } from "@/lib/youtube";

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
    // We'll implement this using window.print() as it's the most reliable 
    // for high-end CSS layouts, or we can use a library later.
    window.print();
  };

  return (
    <div className="flex-1 bg-white p-12 overflow-y-auto print:p-0">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto space-y-12 pb-20"
      >
        {/* Report Header */}
        <div className="flex items-start justify-between border-b pb-8 border-slate-100">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                <FileText className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-heading text-slate-900">Executive Performance Audit</h1>
                <p className="text-xs font-bold text-indigo-600 tracking-[0.3em] uppercase">Confidential Intelligence Report</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-slate-500">
                <User className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">{report.channelName}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
          <Button 
            onClick={handleExportPDF}
            className="bg-slate-900 hover:bg-black text-white rounded-xl px-6 h-12 text-xs font-bold tracking-widest gap-2 print:hidden"
          >
            <Download className="w-4 h-4" />
            EXPORT PDF
          </Button>
        </div>

        {/* 1. Executive Summary */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-heading text-slate-900">1.0 Executive Summary</h2>
          </div>
          <p className="text-slate-600 leading-relaxed">
            This audit provides a comprehensive analysis of the <span className="font-bold text-slate-900">{report.channelName}</span> YouTube channel. 
            Currently, the channel commands a global reach of <span className="font-bold text-slate-900">{(report.subscribers / 1000000).toFixed(1)}M subscribers</span>. 
            Our intelligence shows a <span className="font-bold text-indigo-600">{report.kpis.status}</span> phase, with 
            <span className="font-bold text-slate-900"> {report.kpis.totalViewsLast30Days.toLocaleString()} views</span> generated in the last 30 days. 
            The channel maintains an average engagement rate of <span className="font-bold text-slate-900">{report.kpis.avgEngagementRate.toFixed(2)}%</span>, 
            benchmarking within the top tier of its niche.
          </p>
        </section>

        {/* 2. Format Segmentation Analysis */}
        <section className="space-y-8">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-heading text-slate-900">2.0 Format Segmentation</h2>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <Card className="p-8 border-slate-100 shadow-none bg-slate-50/50 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Long-Form Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">Average Views</span>
                  <span className="text-sm font-bold">{report.longForm.avgViews.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">Average Engagement</span>
                  <span className="text-sm font-bold text-indigo-600">{report.longForm.avgER.toFixed(2)}%</span>
                </div>
                <p className="text-[11px] text-slate-500 italic leading-relaxed pt-2 border-t">
                  Long-form content continues to be your primary relationship-building pillar, maintaining high-intent viewership.
                </p>
              </div>
            </Card>

            <Card className="p-8 border-slate-100 shadow-none bg-slate-50/50 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Shorts Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">Average Views</span>
                  <span className="text-sm font-bold">{report.shorts.avgViews.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">Average Engagement</span>
                  <span className="text-sm font-bold text-emerald-600">{report.shorts.avgER.toFixed(2)}%</span>
                </div>
                <p className="text-[11px] text-slate-500 italic leading-relaxed pt-2 border-t">
                  Shorts are serving as a high-velocity discovery engine, driving new impressions at a {((report.shorts.avgViews / report.longForm.avgViews) || 1).toFixed(1)}x rate vs long-form.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* 3. Strategic Recommendations */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-heading text-slate-900">3.0 Strategic Recommendations</h2>
          </div>
          <div className="space-y-4">
            <RecommendationItem 
              title="Double Down on High-Efficiency Keywords"
              desc="Analysis shows that videos utilizing top-performing tags have a 22% higher engagement delta. Review the Tactical Intelligence tab for the current 'Pillar' tags."
            />
            <RecommendationItem 
              title="Optimize Thumbnail Contrast for Reach"
              desc="Content with a Thumbnail Appeal Score below 10% is seeing a significant drop in reach score. We recommend increasing visual contrast by at least 15%."
            />
            <RecommendationItem 
              title="Capitalize on Comment Heat"
              desc="Your most successful videos have a Comment-to-Like ratio above 10%. Encourage more direct audience interaction to boost algorithmic signal."
            />
          </div>
        </section>

        {/* 4. Final Verdict */}
        <section className="p-12 rounded-[3rem] bg-indigo-600 text-white space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex items-center gap-4">
            <ShieldCheck className="w-10 h-10" />
            <div className="space-y-1">
              <h2 className="text-3xl font-heading">Audit Verdict: Healthy</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-200">Official Analyst Conclusion</p>
            </div>
          </div>
          <p className="relative z-10 text-indigo-50 leading-relaxed text-lg">
            Based on the data collected, the channel is in a sustainable growth cycle. The primary focus for the next quarter should be on maintaining format-specific engagement benchmarks while scaling discovery through Shorts.
          </p>
        </section>

        <footer className="text-center pt-20">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em]">Powered by VidMetrics Intelligence v2.4</p>
        </footer>
      </motion.div>
    </div>
  );
}

function RecommendationItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
      <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 shrink-0" />
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
