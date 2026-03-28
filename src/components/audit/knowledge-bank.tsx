"use client";

import { motion } from "framer-motion";
import { 
  HelpCircle, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Zap, 
  BarChart3,
  Search,
  MessageSquare,
  MousePointer2,
  ShieldCheck
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function KnowledgeBank() {
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

  const concepts = [
    {
      icon: Target,
      title: "Performance Ratio",
      formula: "(Video Views / Channel Subscribers) * 100",
      desc: "This is our primary 'Reach' metric. It tells you what percentage of your total audience size a video reached. A ratio > 100% means the video broke out into the general YouTube algorithm beyond your core subscribers."
    },
    {
      icon: TrendingUp,
      title: "Engagement Rate",
      formula: "((Likes + Comments) / Views) * 100",
      desc: "Measures the depth of connection. It indicates how many people who watched the video felt compelled to interact with it. Higher engagement usually leads to better long-term community retention."
    },
    {
      icon: Zap,
      title: "Engagement Delta",
      formula: "Video ER - Channel Format Avg ER",
      desc: "Shows if a specific video is performing above or below your typical standard for that format (Long-form vs Shorts). A positive delta means the content resonated better than usual."
    },
    {
      icon: MessageSquare,
      title: "Comment Velocity",
      formula: "Comments per 1,000 Views",
      desc: "Measures the 'heat' of the discussion. High comment velocity is a strong signal to the YouTube algorithm that the content is thought-provoking or controversial, often leading to more impressions."
    }
  ];

  return (
    <div className="flex-1 bg-slate-50/30 p-12 overflow-y-auto">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto space-y-12"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <BookOpen className="text-white w-5 h-5" />
            </div>
            <h1 className="text-3xl font-heading text-slate-900">Knowledge Bank</h1>
          </div>
          <p className="text-slate-500 text-sm max-w-2xl">
            Everything you need to know about the VidMetrics analytical engine. Understand the math behind the insights.
          </p>
        </div>

        {/* Core Concepts Grid */}
        <div className="grid grid-cols-2 gap-6">
          {concepts.map((concept, i) => (
            <motion.div key={i} variants={item}>
              <Card className="p-8 border-none shadow-sm shadow-indigo-500/5 bg-white space-y-4 h-full hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <concept.icon className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">{concept.title}</h3>
                </div>
                <div className="space-y-2">
                  <code className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md block w-fit">
                    {concept.formula}
                  </code>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {concept.desc}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-heading text-slate-900">Frequently Asked Questions</h2>
          </div>
          
          <Card className="border-none shadow-sm shadow-indigo-500/5 bg-white overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-slate-100 px-8">
                <AccordionTrigger className="text-sm font-bold uppercase tracking-wider hover:no-underline">
                  Why do you separate Shorts from Long-form?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-slate-500 leading-relaxed">
                  YouTube uses two distinct algorithms for these formats. Shorts are designed for high-velocity, low-friction discovery, while long-form content focuses on watch-time and audience retention. Averaging them together would give you misleading data about your channel's true health.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-slate-100 px-8">
                <AccordionTrigger className="text-sm font-bold uppercase tracking-wider hover:no-underline">
                  What is a "Thumbnail Appeal Score"?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-slate-500 leading-relaxed">
                  This score combines visual diagnostics (contrast, luminance, and face detection) with your Performance Ratio. If a video has high algorithmic potential but a low appeal score, it usually means your thumbnail is the bottleneck preventing clicks.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-slate-100 px-8">
                <AccordionTrigger className="text-sm font-bold uppercase tracking-wider hover:no-underline">
                  How often is the data updated?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-slate-500 leading-relaxed">
                  VidMetrics pulls live data directly from the YouTube API every time you run an audit. We combine search data with playlist metadata to ensure even the most recent uploads (from as little as 3 hours ago) are captured.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-none px-8">
                <AccordionTrigger className="text-sm font-bold uppercase tracking-wider hover:no-underline">
                  What does "isOutlier" mean in my data?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-slate-500 leading-relaxed">
                  An outlier is a video that performs significantly better than your mathematical average (specifically, more than 2 standard deviations from the mean). These represent content breakthroughs that you should analyze for replication.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>

        <footer className="text-center pt-8 border-t border-slate-100">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em]">VidMetrics Knowledge Base • Confidential</p>
        </footer>
      </motion.div>
    </div>
  );
}
