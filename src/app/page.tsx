"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LandingHero } from "@/components/audit/landing-hero";
import { StrategicOverview } from "@/components/audit/strategic-overview";
import { IntelligenceHub } from "@/components/audit/intelligence-hub";
import { AuditReport } from "@/components/audit/audit-report";
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
  const [featuredCreator, setFeaturedCreator] = useState<ChannelAuditReport | null>(null);
  const [sampleCreators, setSampleCreators] = useState<ChannelAuditReport[]>([]);

  const POPULAR_CHANNEL_IDS = [
    "UCBJycsmduvYELg8GaZPBnZg", // MKBHD
    "UCXuqSBlHAE6Xw-yeJA0Tunw", // Linus Tech Tips
    "UCsXVkYYQyFubOR46I6GoM6Q", // Kurzgesagt
    "UCBa6G_zjCcNo726zkxiWJyA", // Veritasium
  ];

  useEffect(() => {
    const history = localStorage.getItem("vidmetrics_history");
    if (history) setAuditHistory(JSON.parse(history));

    const fetchInitialData = async () => {
      try {
        const reports = await Promise.all(
          POPULAR_CHANNEL_IDS.map(async (id) => {
            const res = await fetch("/api/audit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ query: id }),
            });
            const data = await res.json();
            return data.success ? data.data : null;
          })
        );
        const validReports = reports.filter(r => r !== null);
        if (validReports.length > 0) {
          setFeaturedCreator(validReports[0]);
          setSampleCreators(validReports.slice(1));
        }
      } catch (error) {
        console.error("Initial data fetch failed:", error);
      }
    };

    fetchInitialData();
  }, []);

  const handleAudit = async (query: string) => {
    setIsAuditing(true);
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
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

  return (
    <main className="flex h-screen bg-slate-50/30 overflow-hidden">
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
          />
        </motion.div>
      )}

      <div className="flex-1 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {!hasResults && !isAuditing && (
            <motion.div
              key="landing"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <LandingHero 
                featuredCreator={featuredCreator}
                sampleCreators={sampleCreators}
                onAudit={handleAudit} 
              />
            </motion.div>
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
              {activeTab === "intelligence" && (
                <IntelligenceHub video={selectedVideo} report={currentReport} />
              )}
              {activeTab === "reports" && (
                <AuditReport report={currentReport} />
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
