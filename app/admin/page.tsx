import { Sparkles, CheckCircle2 } from "lucide-react";
import { RegistrationCountdown } from "@/components/events/RegistrationCountdown";
import { DashboardStats } from "@/components/admin/DashboardStats";

export default function AdminDashboardOverview() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#27272a]">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Sparkles size={12} className="animate-pulse" />
            Official Portal
          </div>
          <h1 className="text-3xl font-semibold text-[#fafafa] tracking-tight">Dashboard</h1>
          <p className="text-[#a1a1aa] mt-1 text-sm">Pusat kontrol informasi publik <strong className="text-[#e4e4e7] font-medium">SI FEST 2026</strong>.</p>
        </div>

        <div className="bg-[#09090b] p-3 rounded-lg border border-[#27272a] shadow-sm flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-[9px] font-bold text-[#71717a] uppercase tracking-widest mb-0.5">Menuju Hari H</p>
            <p className="text-xs font-semibold text-[#e4e4e7]">02 Nov 2026</p>
          </div>
          <div className="w-px h-8 bg-[#27272a] hidden sm:block"></div>
          <RegistrationCountdown 
            startDate="2026-11-02T00:00:00+07:00" 
            closeDate="2026-11-06T23:59:59+07:00" 
          />
        </div>
      </div>

      {/* Stats Grid */}
      <DashboardStats />

      {/* System Status Banner */}
      <div className="relative overflow-hidden bg-[#18181b] border border-[#27272a] rounded-xl p-6 sm:p-8 mt-4">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#09090b] flex items-center justify-center border border-[#27272a] shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-[15px] font-semibold text-[#fafafa] mb-1.5 flex items-center gap-3">
                Sistem Utama Terhubung
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live
                </span>
              </h4>
              <p className="text-[#a1a1aa] text-[13px] max-w-2xl leading-relaxed">
                Database pusat dan penyimpanan awan (Cloud Storage) untuk <strong className="text-[#e4e4e7] font-medium">SI FEST Official</strong> telah disinkronisasi. Semua data publik siap ditampilkan kepada audiens. Pengelolaan lanjutan dilakukan di web panitia.
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-[#fafafa] text-[#09090b] text-[13px] font-medium rounded-md hover:bg-[#e4e4e7] transition-colors shrink-0">
            Cek Log Sinkronisasi
          </button>
        </div>
      </div>
    </div>
  );
}
