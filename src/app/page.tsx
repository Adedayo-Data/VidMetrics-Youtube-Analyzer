"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LandingHero } from "@/components/audit/landing-hero";
import { ResultsDashboard } from "@/components/audit/results-dashboard";
import { Sidebar } from "@/components/layout/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [isAuditing, setIsAuditing] = useState(false);
  const [hasResults, setHasResults] = useState(false);

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
        setHasResults(true);
      }
    } catch (error) {
      console.error("Audit failed:", error);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <main className="flex h-screen overflow-hidden bg-white">
      {hasResults && (
        <motion.div 
          initial={{ x: -260 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
        >
          <Sidebar showExport={hasResults} />
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
              <LandingHero onAudit={handleAudit} />
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

          {hasResults && !isAuditing && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 80,
                staggerChildren: 0.1,
                delayChildren: 0.2
              }}
              className="absolute inset-0 flex flex-col overflow-hidden"
            >
              <ResultsDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
