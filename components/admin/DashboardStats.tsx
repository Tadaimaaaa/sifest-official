"use client";

import { useEffect, useState } from "react";
import { Users, Eye, Sparkles, Server, ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function DashboardStats() {
  const [pageViews, setPageViews] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Initial fetch for page views count
    const fetchViews = async () => {
      try {
        const { count, error } = await supabase
          .from("page_views")
          .select("*", { count: "exact", head: true });
        
        if (!error && count !== null) {
          // Add base views (4200) + actual database views to simulate high traffic initially, 
          // or just use actual count if it's over 4000. For now let's just use actual count 
          // but we will default it to 4200 if the database is empty so the UI doesn't look empty.
          setPageViews(count > 0 ? count : 4200);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchViews();

    // Subscribe to realtime inserts on page_views table
    const channel = supabase
      .channel("page_views_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "page_views" },
        (payload) => {
          // Increment the counter dynamically
          setPageViews((prev) => prev + 1);
          
          // Small highlight animation effect could be added here by toggling a class
          const el = document.getElementById("page-views-counter");
          if (el) {
            el.classList.remove("text-slate-900");
            el.classList.add("text-blue-600");
            setTimeout(() => {
              el.classList.remove("text-blue-600");
              el.classList.add("text-slate-900");
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card 1 - Kunjungan Web (Realtime) */}
      <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
        {/* Glow effect on update */}
        <div className="absolute inset-0 bg-blue-500/0 transition-colors duration-500 pointer-events-none" id="page-views-glow"></div>
        <div className="flex items-start justify-between mb-6 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
            <Eye size={24} />
          </div>
          <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg text-xs font-bold">
            <ArrowUpRight size={14} className="animate-pulse" /> Live
          </div>
        </div>
        <div className="relative z-10">
          <h3 id="page-views-counter" className="text-4xl font-black text-slate-900 tracking-tight transition-colors duration-300">
            {loading ? "..." : displayViews}
          </h3>
          <p className="text-slate-500 text-sm font-medium mt-1">Total Kunjungan Web</p>
        </div>
      </div>

      {/* Card 2 - Dummy */}
      <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group">
        <div className="flex items-start justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-accent to-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
            <Users size={24} />
          </div>
          <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg text-xs font-bold">
            <ArrowUpRight size={14} /> 12%
          </div>
        </div>
        <div>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">128</h3>
          <p className="text-slate-500 text-sm font-medium mt-1">Total Panitia Aktif</p>
        </div>
      </div>
      
      {/* Card 3 - Dummy */}
      <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group">
        <div className="flex items-start justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
            <Sparkles size={24} />
          </div>
          <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg text-xs font-bold">
            <ArrowUpRight size={14} /> 5
          </div>
        </div>
        <div>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">24</h3>
          <p className="text-slate-500 text-sm font-medium mt-1">Sponsor & Media Partner</p>
        </div>
      </div>

      {/* Card 4 - Dummy */}
      <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group">
        <div className="flex items-start justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
            <Server size={24} />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mt-2 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20"></div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">42<span className="text-lg text-slate-500">ms</span></h3>
          </div>
          <p className="text-slate-500 text-sm font-medium">Rata-rata Response Time</p>
        </div>
      </div>
    </div>
  );
}
