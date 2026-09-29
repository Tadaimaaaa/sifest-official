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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1 */}
      <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
          <Eye size={48} className="text-slate-900 -rotate-12 translate-x-2 -translate-y-2" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Kunjungan Web</p>
            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live
            </div>
          </div>
          <h3 id="page-views-counter" className="text-3xl font-semibold text-slate-900 tracking-tight transition-colors duration-300">
            {loading ? "..." : displayViews}
          </h3>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
          <Users size={48} className="text-slate-900 -rotate-12 translate-x-2 -translate-y-2" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Panitia Aktif</p>
            <div className="flex items-center gap-1 text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded text-[10px] font-bold">
              <ArrowUpRight size={12} /> 12%
            </div>
          </div>
          <h3 className="text-3xl font-semibold text-slate-900 tracking-tight">128</h3>
        </div>
      </div>
      
      {/* Card 3 */}
      <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
          <Sparkles size={48} className="text-slate-900 -rotate-12 translate-x-2 -translate-y-2" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sponsor & Media</p>
            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded text-[10px] font-bold">
              <ArrowUpRight size={12} /> 5
            </div>
          </div>
          <h3 className="text-3xl font-semibold text-slate-900 tracking-tight">24</h3>
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
          <Server size={48} className="text-slate-900 -rotate-12 translate-x-2 -translate-y-2" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Response Time</p>
          </div>
          <div className="flex items-baseline gap-1">
            <h3 className="text-3xl font-semibold text-slate-900 tracking-tight">42</h3>
            <span className="text-sm text-slate-400 font-medium">ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
