"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, Settings, LogOut, Menu, X, Handshake, ImageIcon, BookOpen, Activity } from "lucide-react";
import React, { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Guidebooks", href: "/admin/buku-panduan", icon: BookOpen },
    { name: "Committee", href: "/admin/committee", icon: Users },
    { name: "Sponsorship", href: "/admin/sponsors", icon: Handshake },
    { name: "Media Partners", href: "/admin/media-partners", icon: ImageIcon },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-[100svh] bg-[#09090b] text-[#fafafa] flex font-sans selection:bg-blue-500/30">
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 inset-x-0 h-14 bg-[#09090b]/80 backdrop-blur-xl border-b border-[#27272a] px-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#fafafa] flex items-center justify-center">
            <span className="font-bold text-[#09090b] text-[10px]">SI</span>
          </div>
          <div className="font-semibold text-sm tracking-tight">SI FEST WORKSPACE</div>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 ease-out
        fixed md:sticky top-0 left-0 h-[100svh] w-64 bg-[#09090b] border-r border-[#27272a] z-40
        flex flex-col
      `}>
        {/* Workspace Header */}
        <div className="h-14 flex items-center px-4 border-b border-[#27272a]">
          <div className="flex items-center gap-3 w-full hover:bg-[#27272a]/50 p-1.5 -ml-1.5 rounded-md cursor-pointer transition-colors">
            <div className="w-6 h-6 rounded-[5px] bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-[0_0_10px_rgba(37,99,235,0.2)]">
              <Activity size={12} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[13px] leading-none text-[#fafafa]">SI FEST 2026</span>
              <span className="text-[10px] font-medium text-[#71717a] mt-1 uppercase tracking-wider">Admin Portal</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-0.5 overflow-y-auto scrollbar-none">
          <div className="px-3 mb-2">
            <p className="text-[10px] font-semibold text-[#52525b] uppercase tracking-[0.15em]">General</p>
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group relative ${
                  isActive 
                  ? "bg-[#27272a]/60 text-[#fafafa]" 
                  : "text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a]/30"
                }`}
              >
                <item.icon size={15} className={`${isActive ? "text-blue-500" : "text-[#71717a] group-hover:text-[#a1a1aa]"} transition-colors`} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[13px] ${isActive ? "font-medium" : "font-normal"}`}>{item.name}</span>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-blue-500 rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-[#27272a]">
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#27272a] border border-[#3f3f46] overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=SifestAdmin&backgroundColor=18181b`} alt="Avatar" className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-[#fafafa]">Super Admin</span>
                <span className="text-[11px] text-[#71717a]">admin@sifest.id</span>
              </div>
            </div>
            <Link href="/admin/login" className="p-2 text-[#71717a] hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors" title="Sign out">
              <LogOut size={14} />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 h-[100svh] overflow-y-auto bg-[#09090b] relative pt-14 md:pt-0">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto p-6 md:p-10 relative z-10">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#09090b]/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
