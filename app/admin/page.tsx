import { Sparkles, CheckCircle2 } from "lucide-react";
import { RegistrationCountdown } from "@/components/events/RegistrationCountdown";
import { DashboardStats } from "@/components/admin/DashboardStats";

export default function AdminDashboardOverview() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={12} className="animate-pulse" />
            Official Portal
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-2 text-lg">Pusat kontrol informasi publik <strong className="text-slate-800">SI FEST 2026</strong>.</p>
        </div>

        <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm flex items-center gap-4">
          <div className="hidden sm:block">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-right">Menuju Hari H</p>
            <p className="text-sm font-semibold text-slate-800">02 Nov 2026</p>
          </div>
          <div className="w-px h-10 bg-slate-200 hidden sm:block"></div>
          <RegistrationCountdown 
            startDate="2026-11-02T00:00:00+07:00" 
            closeDate="2026-11-06T23:59:59+07:00" 
          />
        </div>
      </div>

      {/* Stats Grid */}
      <DashboardStats />

      {/* System Status Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-brand-primary rounded-3xl p-8 sm:p-10 shadow-2xl">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0 shadow-inner">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                Sistem Utama Terhubung
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live
                </span>
              </h4>
              <p className="text-blue-100/80 text-sm max-w-2xl leading-relaxed">
                Database pusat dan penyimpanan awan (Cloud Storage) untuk <strong className="text-white">SI FEST Official</strong> telah disinkronisasi. Semua data publik siap ditampilkan kepada audiens. Pengelolaan lanjutan dilakukan di web panitia.
              </p>
            </div>
          </div>
          <button className="px-6 py-3 bg-white text-brand-primary font-bold rounded-xl hover:bg-blue-50 active:scale-95 transition-all shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
            Cek Log Sinkronisasi
          </button>
        </div>
      </div>

    </div>
  );
}
