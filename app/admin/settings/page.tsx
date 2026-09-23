"use client";

import { Settings, Save, Bell, Shield, Key, Check } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest mb-4">
            <Settings size={12} className="animate-spin-slow" />
            Konfigurasi Sistem
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Pengaturan</h1>
          <p className="text-slate-500 mt-2 text-lg">Kelola preferensi dan keamanan akun Administrator Pusat.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-5 py-4 bg-white text-brand-primary font-bold rounded-2xl shadow-sm border border-slate-100">
            <Settings size={18} />
            Pengaturan Umum
          </button>
          <button className="w-full flex items-center gap-3 px-5 py-4 bg-transparent hover:bg-white/50 text-slate-600 hover:text-slate-900 font-medium rounded-2xl transition-all">
            <Shield size={18} />
            Keamanan Akun
          </button>
          <button className="w-full flex items-center gap-3 px-5 py-4 bg-transparent hover:bg-white/50 text-slate-600 hover:text-slate-900 font-medium rounded-2xl transition-all">
            <Bell size={18} />
            Notifikasi Sistem
          </button>
          <button className="w-full flex items-center gap-3 px-5 py-4 bg-transparent hover:bg-white/50 text-slate-600 hover:text-slate-900 font-medium rounded-2xl transition-all">
            <Key size={18} />
            API Keys & Integrasi
          </button>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Informasi Profil</h2>
                <p className="text-sm text-slate-500 mb-6">Perbarui nama tampilan dan alamat email kontak administrator.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nama Tampilan</label>
                    <input 
                      type="text" 
                      defaultValue="Admin Pusat"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Administrator</label>
                    <input 
                      type="email" 
                      defaultValue="admin@sifest.my.id"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500 outline-none cursor-not-allowed"
                      disabled
                    />
                    <p className="text-xs text-slate-400 mt-2">Email tidak dapat diubah karena terhubung dengan akun induk Supabase.</p>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Preferensi Tampilan</h2>
                <p className="text-sm text-slate-500 mb-6">Sesuaikan tampilan dashboard admin.</p>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-900">Mode Tampilan</p>
                    <p className="text-xs text-slate-500">Pilih tema terang atau gelap (Saat ini dikunci di Mode Terang Premium)</p>
                  </div>
                  <div className="flex bg-slate-200/50 p-1 rounded-lg">
                    <button className="px-3 py-1.5 bg-white shadow-sm rounded-md text-xs font-bold text-slate-900">Terang</button>
                    <button className="px-3 py-1.5 text-xs font-medium text-slate-500 cursor-not-allowed">Gelap</button>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                    saved
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                    : "bg-brand-primary text-white hover:bg-blue-700 shadow-md shadow-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/30"
                  }`}
                >
                  {saving ? (
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                  ) : saved ? (
                    <>
                      <Check size={16} /> Tersimpan
                    </>
                  ) : (
                    <>
                      <Save size={16} /> Simpan Perubahan
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
