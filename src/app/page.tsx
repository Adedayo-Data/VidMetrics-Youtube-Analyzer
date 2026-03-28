"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LandingHero } from "@/components/audit/landing-hero";
import { StrategicOverview } from "@/components/audit/strategic-overview";
import { IntelligenceHub } from "@/components/audit/intelligence-hub";
import { AuditReport } from "@/components/audit/audit-report";
import { KnowledgeBank } from "@/components/audit/knowledge-bank";
import { Sidebar } from "@/components/layout/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { resolveChannelId, getAuditData, ChannelAuditReport, VideoAudit } from "@/lib/youtube";
import { BarChart3 } from "lucide-react";

export default function Home() {
  const [isAuditing, setIsAuditing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [activeTab, setActiveTab] = useState("strategic");
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [auditHistory, setAuditHistory] = useState<string[]>([]);
  const [currentReport, setCurrentReport] = useState<ChannelAuditReport | null>(null);
  const [featuredCreator, setFeaturedCreator] = useState<ChannelAuditReport | null>({
    channelId: "UCBJycsmduvYELg8GaZPBnZg",
    channelName: "MKBHD",
    subscribers: 18500000,
    thumbnail: "https://yt3.googleusercontent.com/1-7_88_BvC6Y-U_S8_1_S_1-7_88_BvC6Y-U_S8_1_S_1-7_88_BvC6Y-U_S8_1_S_1-7_88_BvC6Y-U_S8_1_S",
    kpis: {
      totalViewsLast30Days: 38000000,
      viewGrowthPercent: 12.4,
      avgEngagementRate: 8.2,
      status: "Growth"
    },
    longForm: { avgViews: 2400000, avgER: 7.5, topVideoId: "" },
    shorts: { avgViews: 1200000, avgER: 9.2, topVideoId: "" },
    videos: [
      {
        id: "X_XN",
        title: "MKBHD: The Future of Spatial Computing Analysis",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070",
        viewCount: 2400000,
        publishedAt: new Date().toISOString(),
        likeCount: 150000,
        commentCount: 12000,
        performanceRatio: 12.9,
        engagementRate: 6.7,
        isShort: false,
        isOutlier: false
      }
    ]
  });
  const [sampleCreators, setSampleCreators] = useState<ChannelAuditReport[]>([]);


  useEffect(() => {
    const history = localStorage.getItem("vidmetrics_history");
    if (history) setAuditHistory(JSON.parse(history));
    
    // Use static mock data only - no API calls on landing page
    setSampleCreators([
      {
        channelId: "UCXuqSBlHAE6Xw-yeJA0Tunw",
        channelName: "Linus Tech Tips",
        subscribers: 15800000,
        thumbnail: "https://yt3.googleusercontent.com/ytc/AIdro_m2r2CJDWhGmKMot9U6yfv-L0FdX8FJf03Cq5WwWfMq-A=s176-c-k-c0x00ffffff-no-rj",
        kpis: {
          totalViewsLast30Days: 42000000,
          viewGrowthPercent: 8.7,
          avgEngagementRate: 7.1,
          status: "Growth"
        },
        longForm: { avgViews: 1800000, avgER: 6.8, topVideoId: "" },
        shorts: { avgViews: 950000, avgER: 8.5, topVideoId: "" },
        videos: []
      },
      {
        channelId: "UCsXVkYYQyFubOR46I6GoM6Q",
        channelName: "Kurzgesagt",
        subscribers: 22400000,
        thumbnail: "https://yt3.googleusercontent.com/ytc/AIdro_nO5I0QcJdIeL1dEQRtfv0qRNY_3B7eRc4Yme1XSqY-bg=s176-c-k-c0x00ffffff-no-rj",
        kpis: {
          totalViewsLast30Days: 55000000,
          viewGrowthPercent: 15.2,
          avgEngagementRate: 9.8,
          status: "Viral"
        },
        longForm: { avgViews: 3200000, avgER: 9.5, topVideoId: "" },
        shorts: { avgViews: 1500000, avgER: 10.2, topVideoId: "" },
        videos: []
      },
      {
        channelId: "UCBa6G_zjCcNo726zkxiWJyA",
        channelName: "Veritasium",
        subscribers: 14600000,
        thumbnail: "https://yt3.googleusercontent.com/ytc/AIdro_lGRrhC8qI8-3p8i0H8b2m2B5dM9gL5F3oP8d0c=s176-c-k-c0x00ffffff-no-rj",
        kpis: {
          totalViewsLast30Days: 28000000,
          viewGrowthPercent: 5.3,
          avgEngagementRate: 8.4,
          status: "Steady"
        },
        longForm: { avgViews: 2100000, avgER: 8.1, topVideoId: "" },
        shorts: { avgViews: 800000, avgER: 8.9, topVideoId: "" },
        videos: []
      },
      {
        channelId: "UC0S4z2fXGuThbtA_Uf-vM_Q",
        channelName: "CNBC Make It",
        subscribers: 8900000,
        thumbnail: "https://yt3.googleusercontent.com/ytc/AIdro_kE4iYQbK8Nq8C9z0D3v8F1hL5jP2oN9sQ7wE4c=s176-c-k-c0x00ffffff-no-rj",
        kpis: {
          totalViewsLast30Days: 19000000,
          viewGrowthPercent: 3.1,
          avgEngagementRate: 5.9,
          status: "Stable"
        },
        longForm: { avgViews: 1200000, avgER: 5.7, topVideoId: "" },
        shorts: { avgViews: 600000, avgER: 6.2, topVideoId: "" },
        videos: []
      }
    ]);
  }, []);

  const handleAudit = async (query: string) => {
    if (!query.trim()) return;
    setIsAuditing(true);
    setHasResults(false);
    setCurrentReport(null);
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim() }),
      });
      const data = await response.json();
      if (data.success) {
        setCurrentReport(data.data);
        setHasResults(true);
        setActiveTab("strategic");
        const newHistory = Array.from(new Set([query, ...auditHistory])).slice(0, 10);
        setAuditHistory(newHistory);
        localStorage.setItem("vidmetrics_history", JSON.stringify(newHistory));
      } else {
        alert(data.error || "Audit failed");
      }
    } catch (error) {
      console.error("Audit failed:", error);
      alert("Intelligence Engine Offline");
    } finally {
      setIsAuditing(false);
    }
  };

  const handleVideoSelect = (video: any) => {
    setSelectedVideo(video);
    setActiveTab("intelligence");
  };

  const handleBackToHome = () => {
    setHasResults(false);
    setActiveTab("strategic");
    setCurrentReport(null);
  };

  return (
    <main className="flex h-screen bg-slate-50/30">
      {/* Main Layout */}
      {hasResults && (
        <motion.div 
          initial={{ x: -260 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
        >
          <Sidebar 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            showExport={!!currentReport}
            onBackHome={handleBackToHome}
          />
        </motion.div>
      )}

      <div className="flex-1 relative flex flex-col">
        <AnimatePresence mode="wait">
          {!hasResults && !isAuditing && (
              <LandingHero 
                featuredCreator={featuredCreator}
                sampleCreators={sampleCreators}
                onAudit={handleAudit} 
                isLoading={isAuditing}
              />
          )}

          {isAuditing && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 p-8 space-y-8 bg-slate-50/30"
            >
              <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-end">
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-32 bg-indigo-100" />
                    <Skeleton className="h-12 w-64 bg-slate-200" />
                  </div>
                  <div className="flex gap-4">
                    <Skeleton className="h-10 w-32 bg-slate-200 rounded-xl" />
                    <Skeleton className="h-10 w-40 bg-indigo-200 rounded-xl" />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-2xl bg-white shadow-sm" />
                  ))}
                </div>

                <div className="grid grid-cols-12 gap-6">
                  <Skeleton className="col-span-5 h-[500px] rounded-[2.5rem] bg-white shadow-sm" />
                  <Skeleton className="col-span-7 h-[500px] rounded-[2.5rem] bg-white shadow-sm" />
                </div>

                <Skeleton className="h-96 w-full rounded-3xl bg-white shadow-sm" />
              </div>
            </motion.div>
          )}

          {hasResults && !isAuditing && currentReport && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col overflow-hidden"
            >
              {activeTab === "strategic" && (
                <StrategicOverview 
                  report={currentReport} 
                  onVideoSelect={handleVideoSelect} 
                  onGenerateReport={() => setActiveTab("reports")}
                />
              )}
              {activeTab === "intelligence" && currentReport && (
                <IntelligenceHub 
                  video={selectedVideo} 
                  report={currentReport} 
                  onViewReport={() => setActiveTab("reports")}
                />
              )}
              {activeTab === "reports" && currentReport && (
            <AuditReport report={currentReport} />
          )}
          {activeTab === "knowledge" && (
            <KnowledgeBank />
          )}
              {activeTab === "history" && (
                <div className="p-8 space-y-6">
                  <h1 className="text-4xl font-heading mb-4">Audit History</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {auditHistory.map((handle) => (
                      <div 
                        key={handle} 
                        onClick={() => handleAudit(handle)}
                        className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all cursor-pointer group flex items-center justify-between"
                      >
                        <span className="font-medium text-slate-700">{handle}</span>
                        <div className="p-2 rounded-full bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <BarChart3 className="w-4 h-4" />
                        </div>
                      </div>
                    ))}
                    {auditHistory.length === 0 && (
                      <p className="text-muted-foreground italic">No audit history found.</p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
