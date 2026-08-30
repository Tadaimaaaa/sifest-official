"use client";

import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Tentang", href: "#about" },
    { name: "Acara", href: "#events" },
    { name: "Jadwal", href: "#timeline" },
    { name: "Sponsor", href: "#sponsors" },
  ];

  return (
    <nav 
      className={cn(
        "fixed left-0 right-0 z-50 mx-auto transition-all duration-500 ease-in-out",
        isScrolled ? "top-4 max-w-5xl px-4" : "top-0 w-full max-w-7xl px-4 sm:px-8 py-4"
      )}
    >
      <div 
        className={cn(
          "flex w-full items-center justify-between transition-all duration-500",
          isScrolled 
            ? "glass-strong h-16 rounded-[var(--radius-pill)] px-6 md:px-8 shadow-lg border-white/10" 
            : "h-16 bg-transparent px-2 md:px-4 border-transparent"
        )}
      >
        
        {/* Logo - Flex 1 (Left aligned) */}
        <Link href="/" className="flex items-center gap-3 flex-1 group">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm p-0.5 border border-white/20 group-hover:border-brand-accent/50 transition-colors">
            <img src="/logo-sifest.png" alt="SI FEST Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-heading text-xl font-bold text-white text-glow tracking-wide hidden sm:block group-hover:text-brand-accent transition-colors">SI FEST</span>
        </Link>

        {/* Desktop Nav - Flex 1 (Centered) */}
        <div className="hidden items-center justify-center gap-8 md:flex flex-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white hover:text-glow"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action - Flex 1 (Right aligned) */}
        <div className="hidden items-center justify-end gap-6 md:flex flex-1">
          <Link href="/registration">
            <Button size="sm" variant={isScrolled ? "primary" : "glass"} className="shadow-lg shadow-brand-accent/20">
              Daftar
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute left-4 right-4 top-full mt-4 flex flex-col gap-4 rounded-3xl glass-strong p-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-white/90"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/registration" onClick={() => setIsOpen(false)}>
            <Button className="w-full" variant="primary">Daftar Sekarang</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
