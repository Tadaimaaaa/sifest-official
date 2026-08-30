"use client";

import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login for now
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin");
    }, 1500);
  };

  return (
    <main className="min-h-[100svh] w-full bg-slate-50 flex items-center justify-center relative overflow-hidden p-4">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Back to Home Link */}
      <Link href="/" className="absolute top-6 left-6 md:top-8 md:left-8 text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2 text-sm z-20">
        <ArrowRight className="w-4 h-4 rotate-180" />
        Kembali ke Beranda
      </Link>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white border border-slate-200 mb-6 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand-accent/10 rounded-2xl group-hover:bg-brand-accent/20 transition-colors" />
            <ShieldCheck className="w-10 h-10 text-brand-primary relative z-10" />
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">Sistem Akses Terbatas</h1>
          <p className="text-slate-500 text-sm">Masuk untuk mengelola konfigurasi SI FEST</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Akses</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-accent focus:bg-white focus:ring-2 focus:ring-brand-accent/20 transition-all duration-300"
                  placeholder="admin@sifest.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Kata Sandi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-accent focus:bg-white focus:ring-2 focus:ring-brand-accent/20 transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden group/btn px-6 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-brand-primary/30"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="font-semibold tracking-wide">AUTENTIKASI</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="mt-8 text-center">
           <p className="text-xs text-slate-400">Peringatan: Upaya akses ilegal akan dicatat oleh sistem.</p>
        </div>
      </div>
    </main>
  );
}
