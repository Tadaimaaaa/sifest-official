import React, { useRef, useState } from 'react';
import { EventData } from '@/data/events';
import { RegistrationDraft } from '@/lib/types/registration';
import { RegistrationResult } from '@/lib/data/registrations';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
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
      
    } catch (error: any) {
      console.error("Gagal men-download PDF:", error);
      alert("Gagal mengunduh E-Ticket: " + (error.message || "Silakan coba lagi."));
    } finally {
      setIsDownloading(false);
    }
  };

  const qrData = JSON.stringify({
    id: successResult.id,
    code: successResult.code,
    event: event.slug,
  });

  const isFutsal = draft.eventSlug.includes('futsal');
  const isEsport = draft.eventSlug.includes('esport') || draft.eventSlug === 'mlbb';

  const schoolName = draft.participant.metadata?.schoolData?.schoolName || draft.participant.institution;
  const coachName = draft.participant.metadata?.schoolData?.coachName || draft.participant.fullName || '-';
  const captainName = draft.participant.metadata?.players?.[0]?.name || draft.participant.metadata?.teamData?.captainName || draft.participant.fullName;
  const captainWa = draft.participant.metadata?.players?.[0]?.whatsapp || draft.participant.metadata?.teamData?.captainWhatsapp || draft.participant.whatsapp;

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

      {/* Ticket Container to be Captured - use pure inline styles to avoid oklab css color parsing errors in html2canvas */}
      <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
        <div style={{ position: 'relative', padding: '4px', background: 'linear-gradient(135deg, rgba(245,183,22,0.5), rgba(10,25,47,0.5))', borderRadius: '24px', boxShadow: '0 0 40px rgba(245,183,22,0.15)', minWidth: '600px' }}>
          <div 
          ref={ticketRef}
          style={{ background: '#0f172a', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}
        >
          {/* Header */}
          <div style={{ background: '#1e293b', padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Using native img tag for html2canvas compatibility */}
              <img src="/logo-sifest.png" alt="SI FEST" style={{ width: '48px', height: '48px', objectFit: 'contain' }} crossOrigin="anonymous" />
              <div>
                <p style={{ color: '#f5b716', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>E-Ticket SI FEST 2026</p>
                <h3 style={{ color: '#ffffff', fontSize: '20px', fontWeight: 700, margin: 0 }}>{event.title}</h3>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>KODE REGISTRASI</p>
              <p style={{ color: '#ffffff', fontFamily: 'monospace', fontWeight: 700, fontSize: '16px', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', display: 'inline-block' }}>
                {successResult.code}
              </p>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'row', gap: '32px', alignItems: 'flex-start' }}>
            
            {/* QR Code */}
            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', flexShrink: 0 }}>
              <QRCodeCanvas 
                value={qrData}
                size={140}
                level="Q"
                includeMargin={false}
              />
            </div>

            {/* Info */}
            <div style={{ flexGrow: 1, width: '100%', textAlign: 'left' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                {isFutsal ? (
                  <>
                    <div style={{ gridColumn: 'span 1' }}>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>Asal Sekolah</p>
                      <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '16px', lineHeight: '1.3' }}>{schoolName}</p>
                    </div>
                    <div style={{ gridColumn: 'span 1' }}>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>Penanggung Jawab</p>
                      <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '16px', lineHeight: '1.3' }}>{coachName}</p>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>Nama Kapten</p>
                      <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '16px', lineHeight: '1.3' }}>{captainName}</p>
                    </div>
                  </>
                ) : isEsport ? (
                  <>
                    <div style={{ gridColumn: 'span 1' }}>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>Nama Kapten</p>
                      <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '16px', lineHeight: '1.3' }}>{captainName}</p>
                    </div>
                    <div style={{ gridColumn: 'span 1' }}>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>WhatsApp Kapten</p>
                      <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '16px', lineHeight: '1.3' }}>{captainWa}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ gridColumn: 'span 1' }}>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>Peserta / Tim</p>
                      <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '16px', lineHeight: '1.3' }}>{draft.participant.fullName}</p>
                    </div>
                    <div style={{ gridColumn: 'span 1' }}>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>Asal Institusi</p>
                      <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '16px', lineHeight: '1.3' }}>{draft.participant.institution}</p>
                    </div>
                  </>
                )}
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.8)' }}>
                  <Calendar style={{ width: '20px', height: '20px', color: '#f5b716', flexShrink: 0 }} />
                  <span style={{ fontSize: '14px' }}>{event.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.8)' }}>
                  <Clock style={{ width: '20px', height: '20px', color: '#f5b716', flexShrink: 0 }} />
                  <span style={{ fontSize: '14px' }}>{event.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.8)' }}>
                  <MapPin style={{ width: '20px', height: '20px', color: '#f5b716', flexShrink: 0 }} />
                  <span style={{ fontSize: '14px' }}>{event.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ background: 'rgba(10,25,47,0.4)', padding: '16px', textAlign: 'center', borderTop: '1px solid rgba(10,25,47,0.3)' }}>
            <p style={{ color: '#f5b716', fontSize: '12px', fontWeight: 500 }}>
              {event.slug === 'seminar-nasional'
                ? '*Harap simpan tiket ini dan tunjukkan pada saat registrasi ulang di hari H untuk keperluan absensi dan pengambilan E-Sertifikat.'
                : '*Harap simpan tiket ini dan tunjukkan pada saat registrasi ulang di hari H untuk keperluan daftar ulang.'}
            </p>
          </div>
        </div>
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
        <button
          onClick={() => {
            try { sessionStorage.removeItem('sifest_reg_draft'); } catch(e) {}
            window.location.href = '/';
          }}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all duration-300 bg-white/10 text-white hover:bg-white/20 border border-white/10"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}
