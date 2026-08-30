import { GlassCard } from "@/components/ui/GlassCard";
import { Users, UserPlus, Eye, Activity } from "lucide-react";

export default function AdminDashboardOverview() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-heading font-bold text-white">Dashboard Overview</h1>
        <p className="text-white/50 mt-1">Selamat datang di pusat kendali SI FEST 2026.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard variant="light" className="p-6 border-white/10 hover:border-brand-accent/50 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-brand-accent/20 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
              <Users size={24} />
            </div>
            <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-white/50 text-sm mb-1">Total Panitia Aktif</p>
          <h3 className="text-3xl font-heading font-bold text-white">128</h3>
        </GlassCard>

        <GlassCard variant="light" className="p-6 border-white/10 hover:border-blue-500/50 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <Eye size={24} />
            </div>
            <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+45%</span>
          </div>
          <p className="text-white/50 text-sm mb-1">Kunjungan Web Bulan Ini</p>
          <h3 className="text-3xl font-heading font-bold text-white">4.2K</h3>
        </GlassCard>
        
        <GlassCard variant="light" className="p-6 border-white/10 hover:border-emerald-500/50 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <UserPlus size={24} />
            </div>
          </div>
          <p className="text-white/50 text-sm mb-1">Pendaftar Lomba (External)</p>
          <h3 className="text-3xl font-heading font-bold text-white">85</h3>
        </GlassCard>

        <GlassCard variant="light" className="p-6 border-white/10 hover:border-purple-500/50 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
              <Activity size={24} />
            </div>
          </div>
          <p className="text-white/50 text-sm mb-1">Status Server & Database</p>
          <h3 className="text-2xl font-heading font-bold text-green-400 mt-2 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" /> Optimal
          </h3>
        </GlassCard>
      </div>

      {/* Warning/Info Banner */}
      <GlassCard variant="medium" className="p-6 border-brand-accent/30 bg-brand-accent/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-bold text-white mb-1">Tahap 1 Selesai: Kerangka Dashboard Berhasil Dibangun</h4>
          <p className="text-white/70 text-sm max-w-2xl">
            Sistem Autentikasi dan navigasi Admin telah aktif. Langkah selanjutnya adalah membangun modul manajemen database untuk mengelola data panitia secara dinamis.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-brand-accent text-brand-primary font-bold rounded-lg hover:bg-yellow-400 transition-colors shrink-0">
          Lanjutkan ke Tahap 2
        </button>
      </GlassCard>

    </div>
  );
}
