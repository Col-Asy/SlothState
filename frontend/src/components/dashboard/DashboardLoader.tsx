import React from "react";
import { Loader } from "lucide-react";

const DashboardLoader: React.FC = () => (
  <div className="fixed inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-colors">
    <div
      className="flex flex-col items-center gap-4 rounded-xl shadow-xl p-8 glass-card"
      style={{
        background:
          "hsla(var(--card), 0.85)",
        boxShadow:
          "0 2px 32px 0 hsl(var(--shadow, 220 3% 15% / 0.15))",
        border: "1px solid hsla(var(--border), 0.13)",
      }}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-muted/50 shadow animate-pulse-slow">
        <Loader className="h-7 w-7 text-primary animate-spin-slow" />
      </div>
      <span className="text-sm font-semibold text-foreground tracking-wide select-none">
        Loading dashboard...
      </span>
    </div>
  </div>
);

export default DashboardLoader;
