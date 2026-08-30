"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, Calendar, Settings, LogOut, Menu, X } from "lucide-react";
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
    { name: "Tim Panitia", href: "/admin/committee", icon: Users },
    { name: "Jadwal", href: "/admin/timeline", icon: Calendar },
    { name: "Pengaturan", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-[100svh] bg-[#050a15] text-white flex flex-col md:flex-row overflow-hidden relative">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0" />

      {/* Mobile Topbar */}
      <div className="md:hidden bg-[#0a1128] border-b border-white/10 p-4 flex items-center justify-between z-20 relative">
        <div className="font-heading font-bold text-xl text-brand-accent tracking-widest">SI FEST ADMIN</div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-white/5 rounded-lg border border-white/10 text-white">
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 ease-in-out
        fixed md:static inset-y-0 left-0 w-64 bg-[#0a1128]/95 md:bg-[#0a1128] backdrop-blur-xl border-r border-white/10 z-30
        flex flex-col
      `}>
        <div className="p-6 hidden md:block">
          <div className="font-heading font-black text-2xl tracking-widest flex flex-col">
            <span className="text-white">SI FEST</span>
            <span className="text-brand-accent text-sm tracking-widest">DASHBOARD</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 md:py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                  isActive 
                  ? "bg-brand-accent/20 text-brand-accent border border-brand-accent/30" 
                  : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <item.icon size={20} className={isActive ? "text-brand-accent" : "text-white/40"} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/admin/login" className="flex items-center justify-center gap-2 w-full py-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors border border-red-500/20">
            <LogOut size={18} />
            <span className="font-medium text-sm">Keluar Sistem</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 h-[calc(100svh-73px)] md:h-[100svh] overflow-y-auto overflow-x-hidden">
        {/* Decorative glows inside main area */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="p-6 md:p-10 min-h-full relative z-10">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
