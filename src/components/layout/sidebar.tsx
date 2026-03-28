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
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: "STRATEGIC OVERVIEW", id: "strategic" },
  { icon: BarChart3, label: "INTELLIGENCE HUB", id: "intelligence" },
  { icon: Archive, label: "AUDIT HISTORY", id: "history" },
];

interface SidebarProps {
  showExport?: boolean;
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function Sidebar({ showExport, activeTab, onTabChange }: SidebarProps) {
  const handleExport = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r border-border/40 py-8 px-4">
      <div className="mb-10 px-2">
        <h1 className="text-xl font-heading tracking-tight">
          VidMetrics <span className="text-muted-foreground font-sans text-[10px] uppercase tracking-widest block mt-0.5">Enterprise</span>
        </h1>
        <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest">Global Audit v2.4</p>
      </div>

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

      <div className="mt-auto space-y-1 border-t border-border/40 pt-6">
        {showExport && (
          <Button 
            onClick={handleExport}
            variant="ghost" 
            className="w-full justify-start gap-3 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 text-xs font-bold px-3 mb-2"
          >
            <Download className="w-4 h-4" />
            EXPORT PDF
          </Button>
        )}
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground text-xs font-medium px-3">
          <HelpCircle className="w-4 h-4" />
          HELP CENTER
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground text-xs font-medium px-3">
          <LogOut className="w-4 h-4" />
          LOG OUT
        </Button>
      </div>
    </div>
  );
}
