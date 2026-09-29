"use client";

import { useEffect, useState } from "react";
import { Users, Eye, Sparkles, Server, ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function DashboardStats() {
  const [pageViews, setPageViews] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const { count, error } = await supabase
          .from("page_views")
          .select("*", { count: "exact", head: true });
        
        if (!error && count !== null) {
          setPageViews(count > 0 ? count : 4200);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchViews();

    const channel = supabase
      .channel("page_views_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "page_views" },
        (payload) => {
          setPageViews((prev) => prev + 1);
          const el = document.getElementById("page-views-counter");
          if (el) {
            el.classList.remove("text-[#fafafa]");
            el.classList.add("text-blue-500");
            setTimeout(() => {
              el.classList.remove("text-blue-500");
              el.classList.add("text-[#fafafa]");
            }, 500);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const displayViews = pageViews >= 1000 ? (pageViews / 1000).toFixed(1) + "K" : pageViews.toString();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1 */}
      <div className="bg-[#09090b] p-5 rounded-lg border border-[#27272a] shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Eye size={48} className="text-[#fafafa] -rotate-12 translate-x-2 -translate-y-2" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Kunjungan Web</p>
            <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live
            </div>
          </div>
          <h3 id="page-views-counter" className="text-3xl font-semibold text-[#fafafa] tracking-tight transition-colors duration-300">
            {loading ? "..." : displayViews}
          </h3>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-[#09090b] p-5 rounded-lg border border-[#27272a] shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Users size={48} className="text-[#fafafa] -rotate-12 translate-x-2 -translate-y-2" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Panitia Aktif</p>
            <div className="flex items-center gap-1 text-blue-400 bg-blue-400/10 border border-blue-400/20 px-1.5 py-0.5 rounded text-[10px] font-bold">
              <ArrowUpRight size={12} /> 12%
            </div>
          </div>
          <h3 className="text-3xl font-semibold text-[#fafafa] tracking-tight">128</h3>
        </div>
      </div>
      
      {/* Card 3 */}
      <div className="bg-[#09090b] p-5 rounded-lg border border-[#27272a] shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Sparkles size={48} className="text-[#fafafa] -rotate-12 translate-x-2 -translate-y-2" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Sponsor & Media</p>
            <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-1.5 py-0.5 rounded text-[10px] font-bold">
              <ArrowUpRight size={12} /> 5
            </div>
          </div>
          <h3 className="text-3xl font-semibold text-[#fafafa] tracking-tight">24</h3>
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-[#09090b] p-5 rounded-lg border border-[#27272a] shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Server size={48} className="text-[#fafafa] -rotate-12 translate-x-2 -translate-y-2" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Response Time</p>
          </div>
          <div className="flex items-baseline gap-1">
            <h3 className="text-3xl font-semibold text-[#fafafa] tracking-tight">42</h3>
            <span className="text-sm text-[#71717a] font-medium">ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
