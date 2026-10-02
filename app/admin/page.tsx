import { Sparkles } from "lucide-react";
import { RegistrationCountdown } from "@/components/events/RegistrationCountdown";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { WebVisitsGraph } from "@/components/admin/WebVisitsGraph";

export default function AdminDashboardOverview() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Sparkles size={12} className="animate-pulse" />
            Official Portal
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-1 text-sm">Pusat kontrol informasi publik <strong className="text-slate-800 font-medium">SI FEST 2026</strong>.</p>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Menuju Hari H</p>
            <p className="text-xs font-semibold text-slate-700">02 Nov 2026</p>
          </div>
          <div className="w-px h-8 bg-slate-100 hidden sm:block"></div>
          <RegistrationCountdown 
            startDate="2026-11-02T00:00:00+07:00" 
            closeDate="2026-11-06T23:59:59+07:00" 
          />
        </div>
      </div>

      {/* Stats Grid */}
      <DashboardStats />

      {/* Web Visits Graph */}
      <WebVisitsGraph />
    </div>
  );
}
