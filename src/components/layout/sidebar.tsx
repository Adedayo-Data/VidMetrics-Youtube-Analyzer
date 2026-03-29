"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  LayoutDashboard, 
  FileText, 
  ShieldAlert, 
  Users, 
  Archive, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Download,
  ArrowLeft,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "STRATEGIC OVERVIEW", id: "strategic" },
  { icon: BarChart3, label: "INTELLIGENCE HUB", id: "intelligence" },
  { icon: FileText, label: "REPORTS", id: "reports" },
  { icon: Archive, label: "AUDIT HISTORY", id: "history" },
];

interface SidebarProps {
  showExport?: boolean;
  activeTab: string;
  onTabChange: (id: string) => void;
  onBackHome?: () => void;
}

export function Sidebar({ showExport, activeTab, onTabChange, onBackHome }: SidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleExport = () => {
    window.print();
  };

  const handleTabChange = (id: string) => {
    onTabChange(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-border/40 px-4 py-3 flex items-center justify-between">
        <div onClick={onBackHome} className="cursor-pointer">
          <h1 className="text-lg font-heading tracking-tight">
            VidMetrics <span className="text-muted-foreground font-sans text-[10px] uppercase tracking-widest">Enterprise</span>
          </h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="h-10 w-10"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[57px] z-40 bg-white">
          <div className="flex flex-col h-full p-4">
            <Button
              onClick={onBackHome}
              variant="outline"
              className="mb-6 w-full justify-start gap-3 border-indigo-200 text-indigo-600 hover:bg-indigo-50 h-12 px-4 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">NEW SEARCH</span>
            </Button>

            <nav className="flex-1 space-y-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      isActive
                        ? "text-primary bg-primary/5 font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground")} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto space-y-2 border-t border-border/40 pt-6">
              <Button
                onClick={() => {
                  if (activeTab === "reports") {
                    window.print();
                  } else {
                    handleTabChange("reports");
                  }
                }}
                variant="ghost"
                className="w-full justify-start gap-3 text-muted-foreground hover:text-indigo-600 h-12 px-4 rounded-xl"
              >
                <Download className="w-5 h-5" />
                EXPORT PDF
              </Button>
              <Button
                onClick={() => handleTabChange("help")}
                variant="ghost"
                className="w-full justify-start gap-3 text-muted-foreground hover:text-indigo-600 h-12 px-4 rounded-xl"
              >
                <HelpCircle className="w-5 h-5" />
                HELP CENTER
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col h-full w-64 bg-white border-r border-border/40 py-8 px-4">
        <div 
          onClick={onBackHome}
          className="mb-10 px-2 cursor-pointer group"
        >
          <h1 className="text-xl font-heading tracking-tight group-hover:text-indigo-600 transition-colors">
            VidMetrics <span className="text-muted-foreground font-sans text-[10px] uppercase tracking-widest block mt-0.5">Enterprise</span>
          </h1>
          <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest">Global Audit v2.4</p>
        </div>

        {/* New Search Button - Prominent */}
        <Button
          onClick={onBackHome}
          variant="outline"
          className="mb-6 w-full justify-start gap-3 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 h-12 px-4 rounded-xl transition-all font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-bold tracking-widest uppercase">NEW SEARCH</span>
        </Button>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors group relative",
                  isActive 
                    ? "text-primary bg-primary/5 font-semibold" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {item.label}
                {isActive && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-primary rounded-r-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="mt-auto space-y-2 border-t border-border/40 pt-6 print:hidden">
          {showExport && (
            <Button 
              onClick={() => {
                if (activeTab === "reports") {
                  window.print();
                } else {
                  onTabChange("reports");
                }
              }}
              variant="ghost" 
              className="w-full justify-start gap-3 text-muted-foreground hover:text-indigo-600 hover:bg-indigo-50/50 h-11 px-4 rounded-xl transition-all"
            >
              <Download className="w-4 h-4" />
              EXPORT PDF
            </Button>
          )}
          <Button 
            onClick={() => onTabChange("help")}
            variant="ghost" 
            className="w-full justify-start gap-3 text-muted-foreground hover:text-indigo-600 hover:bg-indigo-50/50 h-11 px-4 rounded-xl transition-all"
          >
            <HelpCircle className="w-4 h-4" />
            HELP CENTER
          </Button>
        </div>
      </div>
    </>
  );
}
