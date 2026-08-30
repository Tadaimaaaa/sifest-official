import { GlassCard } from "@/components/ui/GlassCard";
import React from "react";

export function SponsorGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-60">
      {[1, 2, 3, 4].map((i) => (
        <GlassCard key={i} variant="light" className="flex h-32 items-center justify-center p-0">
          <span className="text-white/40 font-medium">Sponsor Logo</span>
        </GlassCard>
      ))}
    </div>
  );
}
