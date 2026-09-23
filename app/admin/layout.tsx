"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, Calendar, Settings, LogOut, Menu, X, Handshake, Image as ImageIcon, BookOpen } from "lucide-react";
import React, { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If we are on the login page, don't show the dashboard shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Buku Panduan", href: "/admin/buku-panduan", icon: BookOpen },
    { name: "Tim Panitia", href: "/admin/committee", icon: Users },
    { name: "Sponsor", href: "/admin/sponsors", icon: Handshake },
    { name: "Media Partner", href: "/admin/media-partners", icon: ImageIcon },
    { name: "Pengaturan", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-[100svh] bg-[#F8FAFC] text-slate-900 flex flex-col md:flex-row overflow-hidden relative font-body">
      {/* Ambient background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-brand-accent/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Mobile Topbar */}
      <div className="md:hidden bg-white/80 backdrop-blur-md border-b border-slate-200/60 p-4 flex items-center justify-between z-20 relative shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
            <span className="font-bold text-white text-sm">SI</span>
          </div>
          <div className="font-black text-lg text-slate-900 tracking-tight">SI FEST</div>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-slate-100 rounded-lg text-slate-700 active:scale-95 transition-transform">
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        fixed md:static inset-y-0 left-0 w-72 bg-white md:bg-white/80 md:backdrop-blur-xl border-r border-slate-200/60 z-30 shadow-2xl shadow-slate-200/50 md:shadow-none
        flex flex-col md:m-4 md:rounded-3xl md:h-[calc(100svh-32px)] md:border
      `}>
        <div className="p-8 hidden md:block">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-primary to-blue-800 flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <span className="font-bold text-white text-xl">SI</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-slate-900 text-lg leading-tight tracking-tight">SI FEST 2026</span>
              <span className="text-[10px] font-bold text-brand-primary tracking-widest uppercase mt-0.5">Official Admin</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 md:py-2 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium group relative overflow-hidden ${
                  isActive 
                  ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {isActive && <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />}
                <item.icon size={20} className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-brand-accent" : "text-slate-400 group-hover:text-brand-primary"}`} />
                <span className="relative z-10 text-[15px]">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <div className="bg-slate-50/80 backdrop-blur-md rounded-2xl p-4 border border-slate-100 mb-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=SifestAdmin&backgroundColor=e2e8f0`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">Admin Pusat</p>
                <p className="text-[11px] font-medium text-slate-500 truncate">Super Administrator</p>
              </div>
            </div>
            <Link href="/admin/login" className="flex items-center justify-center gap-2 w-full py-2.5 bg-white text-red-600 rounded-xl hover:bg-red-50 hover:border-red-100 transition-colors border border-slate-200 shadow-sm group">
              <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold text-xs">Keluar Sistem</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 h-[calc(100svh-73px)] md:h-[100svh] overflow-y-auto overflow-x-hidden md:p-4">
        <div className="min-h-full relative z-10 md:bg-white/40 md:backdrop-blur-xl md:rounded-3xl md:border md:border-white/60 shadow-sm p-6 md:p-10">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-20 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
