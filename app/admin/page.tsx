import { Users, UserPlus, Eye, Activity } from "lucide-react";

export default function AdminDashboardOverview() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Selamat datang di pusat kendali SI FEST 2026.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-accent/50 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-accent group-hover:text-white transition-colors">
              <Users size={24} />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-slate-500 text-sm mb-1">Total Panitia Aktif</p>
          <h3 className="text-3xl font-semibold text-slate-900">128</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Eye size={24} />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">+45%</span>
          </div>
          <p className="text-slate-500 text-sm mb-1">Kunjungan Web Bulan Ini</p>
          <h3 className="text-3xl font-semibold text-slate-900">4.2K</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <UserPlus size={24} />
            </div>
          </div>
          <p className="text-slate-500 text-sm mb-1">Pendaftar Lomba (External)</p>
          <h3 className="text-3xl font-semibold text-slate-900">85</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-500/50 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Activity size={24} />
            </div>
          </div>
          <p className="text-slate-500 text-sm mb-1">Status Server & Database</p>
          <h3 className="text-2xl font-semibold text-green-600 mt-2 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" /> Optimal
          </h3>
        </div>
      </div>

      {/* System Status Banner */}
      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold text-blue-900 mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            Sistem Utama Online
          </h4>
          <p className="text-slate-600 text-sm max-w-2xl">
            Database dan penyimpanan awan (Cloud Storage) telah terhubung secara penuh. Anda kini memiliki kontrol akses penuh untuk mengelola modul kepanitiaan dan fitur *website* lainnya.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shrink-0 shadow-sm text-sm">
          Lihat Log Server
        </button>
      </div>

    </div>
  );
}
