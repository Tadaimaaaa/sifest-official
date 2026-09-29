import { Sparkles, CheckCircle2 } from "lucide-react";
import { RegistrationCountdown } from "@/components/events/RegistrationCountdown";
import { DashboardStats } from "@/components/admin/DashboardStats";

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

      {/* System Status Banner */}
      <div className="relative overflow-hidden bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8 mt-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100 shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h4 className="text-[15px] font-semibold text-slate-900 mb-1.5 flex items-center gap-3">
                Sistem Utama Terhubung
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-100 border border-emerald-200 text-emerald-600 text-[10px] font-semibold tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live
                </span>
              </h4>
              <p className="text-slate-500 text-[13px] max-w-2xl leading-relaxed">
                Database pusat dan penyimpanan awan (Cloud Storage) untuk <strong className="text-slate-800 font-medium">SI FEST Official</strong> telah disinkronisasi. Semua data publik siap ditampilkan kepada audiens. Pengelolaan lanjutan dilakukan di web panitia.
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-slate-900 text-white text-[13px] font-medium rounded-md hover:bg-slate-800 transition-colors shrink-0 shadow-sm">
            Cek Log Sinkronisasi
          </button>
        </div>
      </div>
    </div>
  );
}
