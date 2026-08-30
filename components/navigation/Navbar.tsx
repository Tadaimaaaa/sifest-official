"use client";

import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Deteksi apakah sudah di-scroll dari atas
      setIsScrolled(currentScrollY > 20);

      // Deteksi arah scroll: sembunyikan saat scroll ke bawah, tampilkan saat scroll ke atas
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scroll ke bawah
      } else {
        setIsVisible(true);  // Scroll ke atas
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
        "fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div 
        className={cn(
          "flex w-full items-center justify-between transition-all duration-300 px-4 sm:px-8 max-w-7xl mx-auto",
          isScrolled 
            ? "glass-strong h-16 shadow-lg border-b border-white/10 rounded-b-2xl mt-0" 
            : "h-24 bg-transparent border-b border-transparent mt-2"
        )}
      >
        
        {/* Logo - Flex 1 (Left aligned) */}
        <Link href="/" className="flex items-center gap-2 flex-1">
          <span className="font-heading text-xl font-bold text-white text-glow tracking-wide">SI FEST</span>
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
