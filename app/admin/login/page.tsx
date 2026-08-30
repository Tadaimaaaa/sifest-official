"use client";

import { GlassCard } from "@/components/ui/GlassCard";
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
    <main className="min-h-[100svh] w-full bg-[#050a15] flex items-center justify-center relative overflow-hidden p-4">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-brand-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Back to Home Link */}
      <Link href="/" className="absolute top-6 left-6 md:top-8 md:left-8 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm z-20">
        <ArrowRight className="w-4 h-4 rotate-180" />
        Kembali ke Beranda
      </Link>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand-accent/20 rounded-2xl blur-xl group-hover:opacity-100 transition-opacity" />
            <ShieldCheck className="w-10 h-10 text-white relative z-10" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Sistem Akses Terbatas</h1>
          <p className="text-white/50 text-sm">Masuk untuk mengelola konfigurasi SI FEST</p>
        </div>

        <GlassCard variant="medium" className="p-8 border-white/10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Email Akses</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all duration-300"
                  placeholder="admin@sifest.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Kata Sandi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden group/btn px-6 py-4 bg-white/10 hover:bg-brand-accent/20 border border-white/20 hover:border-brand-accent/50 rounded-xl flex items-center justify-center gap-3 transition-all duration-300"
            >
              <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
              
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-brand-accent rounded-full animate-spin" />
              ) : (
                <>
                  <span className="font-heading font-bold text-white tracking-wide group-hover/btn:text-brand-accent transition-colors">AUTENTIKASI</span>
                  <ArrowRight className="w-5 h-5 text-white group-hover/btn:text-brand-accent transition-colors" />
                </>
              )}
            </button>
          </form>
        </GlassCard>
        
        <div className="mt-8 text-center">
           <p className="text-xs text-white/30">Peringatan: Upaya akses ilegal akan dicatat oleh sistem.</p>
        </div>
      </div>
    </main>
  );
}
