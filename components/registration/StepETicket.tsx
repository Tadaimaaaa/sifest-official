import React, { useRef, useState } from 'react';
import { EventData } from '@/data/events';
import { RegistrationDraft } from '@/lib/types/registration';
import { RegistrationResult } from '@/lib/data/registrations';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, CheckCircle, MapPin, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

interface StepETicketProps {
  event: EventData;
  draft: RegistrationDraft;
  successResult: { code: string; id: string };
}

export function StepETicket({ event, draft, successResult }: StepETicketProps) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!ticketRef.current) return;
    
    try {
      setIsDownloading(true);
      
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2, // High resolution
        backgroundColor: '#0f172a', // slate-900 background
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // Calculate dimensions for A4 portrait
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add a small margin
      const margin = 10;
      const finalWidth = pdfWidth - (margin * 2);
      const finalHeight = (canvas.height * finalWidth) / canvas.width;

      pdf.addImage(imgData, 'JPEG', margin, margin, finalWidth, finalHeight);
      pdf.save(`SIFEST_Ticket_${successResult.code}.pdf`);
      
    } catch (error) {
      console.error("Gagal men-download PDF:", error);
      alert("Gagal mengunduh E-Ticket. Silakan coba lagi.");
    } finally {
      setIsDownloading(false);
    }
  };

  const qrData = JSON.stringify({
    id: successResult.id,
    code: successResult.code,
    event: event.slug,
  });

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-status-success/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.3)]">
          <CheckCircle className="w-8 h-8 text-status-success" />
        </div>
        <h2 className="font-heading text-3xl font-bold text-white text-glow">
          Pendaftaran Selesai!
        </h2>
        <p className="text-white/70">
          Silakan unduh E-Ticket Anda di bawah ini dan tunjukkan kepada panitia pada saat hari H.
        </p>
      </div>

      {/* Ticket Container to be Captured */}
      <div className="relative p-1 bg-gradient-to-br from-brand-accent/50 to-brand-primary/50 rounded-3xl shadow-[0_0_40px_rgba(245,183,22,0.15)]">
        <div 
          ref={ticketRef}
          className="bg-[#0f172a] rounded-[1.4rem] overflow-hidden relative"
        >
          {/* Header */}
          <div className="bg-[#1e293b] p-6 border-b border-white/10 flex justify-between items-center">
            <div>
              <p className="text-brand-accent text-sm font-bold tracking-widest uppercase mb-1">E-Ticket SI FEST 2026</p>
              <h3 className="text-white text-xl font-bold">{event.title}</h3>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">KODE REGISTRASI</p>
              <p className="text-white font-mono font-bold text-lg bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                {successResult.code}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
            
            {/* QR Code */}
            <div className="bg-white p-4 rounded-2xl flex-shrink-0">
              <QRCodeSVG 
                value={qrData}
                size={140}
                level="Q"
                includeMargin={false}
              />
            </div>

            {/* Info */}
            <div className="flex-grow space-y-6 w-full text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/50 text-xs uppercase mb-1">Peserta / Tim</p>
                  <p className="text-white font-semibold text-lg">{draft.participant.fullName}</p>
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase mb-1">Asal Institusi</p>
                  <p className="text-white font-semibold text-lg">{draft.participant.institution}</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 text-white/80">
                  <Calendar className="w-5 h-5 text-brand-accent flex-shrink-0" />
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Clock className="w-5 h-5 text-brand-accent flex-shrink-0" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <MapPin className="w-5 h-5 text-brand-accent flex-shrink-0" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-brand-primary/10 p-4 text-center border-t border-brand-primary/20">
            <p className="text-brand-accent/80 text-xs font-medium">
              *Harap simpan tiket ini dan bawa pada saat registrasi ulang di hari H.
            </p>
          </div>
          
          {/* Decorative cutouts */}
          <div className="absolute top-[88px] -left-4 w-8 h-8 bg-[#0A192F] rounded-full border-r border-white/10"></div>
          <div className="absolute top-[88px] -right-4 w-8 h-8 bg-[#0A192F] rounded-full border-l border-white/10"></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 pt-4">
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all duration-300 bg-brand-primary text-brand-secondary hover:bg-brand-accent hover:shadow-[0_0_20px_rgba(245,183,22,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <div className="w-6 h-6 border-2 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Download className="w-6 h-6" />
          )}
          {isDownloading ? "Memproses PDF..." : "Unduh E-Ticket (PDF)"}
        </button>
        <Link
          href="/"
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all duration-300 bg-white/10 text-white hover:bg-white/20 border border-white/10"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
