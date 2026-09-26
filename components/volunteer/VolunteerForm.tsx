"use client";

import React, { useState } from "react";
import { Upload, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

export function VolunteerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [nama, setNama] = useState("");
  const [noBp, setNoBp] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [asal, setAsal] = useState("");
  const [noHp, setNoHp] = useState("");
  const [linkIg, setLinkIg] = useState("");
  const [motivasi, setMotivasi] = useState("");
  
  // Multiple Choice for Events
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  
  // Files
  const [buktiFollow, setBuktiFollow] = useState<File | null>(null);
  const [krs, setKrs] = useState<File | null>(null);
  const [sertifikat, setSertifikat] = useState<File | null>(null);

  const eventOptions = [
    "Futsal Mahasiswa",
    "Futsal SLTA",
    "MLBB",
    "PUBGM",
    "Lomba Desain Poster",
    "Lomba Cerdas Cermat",
    "Bazaar",
    "Seminar"
  ];

  const handleEventToggle = (event: string) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter(e => e !== event));
    } else {
      if (selectedEvents.length >= 2) {
        alert("Maksimal memilih 2 event!");
        return;
      }
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (file: File | null) => void) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEvents.length !== 2) {
      alert("Harap memilih tepat 2 event!");
      return;
    }
    if (!buktiFollow || !krs) {
      alert("Harap mengunggah file wajib (Bukti Follow IG & KRS)!");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission / Upload files
    // In real app: upload files to Supabase Storage, then insert row to Supabase Table
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Pendaftaran Berhasil!</h2>
        <p className="text-slate-300 max-w-md">
          Terima kasih telah mendaftar sebagai Volunteer SI FEST 2026. Silakan tunggu informasi selanjutnya dari panitia melalui nomor WhatsApp atau Email yang Anda daftarkan.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0A192F]/80 backdrop-blur-md border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl space-y-8">
      
      {/* Data Diri */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2">1. Data Diri</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Nama Lengkap <span className="text-rose-500">*</span></label>
            <input required type="text" value={nama} onChange={e => setNama(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="Masukkan nama lengkap" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">No BP / NIM <span className="text-rose-500">*</span></label>
            <input required type="text" value={noBp} onChange={e => setNoBp(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="Contoh: 21101152630xxx" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Jurusan <span className="text-rose-500">*</span></label>
            <input required type="text" value={jurusan} onChange={e => setJurusan(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="Contoh: Sistem Informasi" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Asal (Universitas/Sekolah) <span className="text-rose-500">*</span></label>
            <input required type="text" value={asal} onChange={e => setAsal(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="Contoh: UPI YPTK Padang" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">No HP / WhatsApp <span className="text-rose-500">*</span></label>
            <input required type="tel" value={noHp} onChange={e => setNoHp(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="08xxxxxxxxxx" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Link Instagram Pribadi <span className="text-rose-500">*</span></label>
            <input required type="url" value={linkIg} onChange={e => setLinkIg(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="https://instagram.com/..." />
          </div>
        </div>
      </div>

      {/* Pilihan Event */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2">2. Pilihan Event</h2>
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-300">Pilih 2 Event yang ingin Anda tangani: <span className="text-rose-500">*</span></label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {eventOptions.map((opt) => {
              const isSelected = selectedEvents.includes(opt);
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleEventToggle(opt)}
                  className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left flex justify-between items-center ${
                    isSelected ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  {opt}
                  {isSelected && <CheckCircle2 className="w-4 h-4" />}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-slate-400">Terpilih: {selectedEvents.length}/2</p>
        </div>
      </div>

      {/* Upload Berkas */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2">3. Unggah Berkas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="relative group">
            <input type="file" required accept="image/*,.pdf" onChange={e => handleFileChange(e, setBuktiFollow)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <div className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-colors h-32 ${buktiFollow ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/20 bg-white/5 group-hover:border-blue-500/50 group-hover:bg-blue-500/5'}`}>
              <Upload className={`w-6 h-6 mb-2 ${buktiFollow ? 'text-emerald-400' : 'text-slate-400'}`} />
              <p className="text-xs font-semibold text-white mb-1">Bukti Follow IG <span className="text-rose-500">*</span></p>
              <p className="text-[10px] text-slate-400 max-w-full truncate px-2">{buktiFollow ? buktiFollow.name : 'IG @sifest.hmjsi'}</p>
            </div>
          </div>

          <div className="relative group">
            <input type="file" required accept=".pdf" onChange={e => handleFileChange(e, setKrs)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <div className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-colors h-32 ${krs ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/20 bg-white/5 group-hover:border-blue-500/50 group-hover:bg-blue-500/5'}`}>
              <Upload className={`w-6 h-6 mb-2 ${krs ? 'text-emerald-400' : 'text-slate-400'}`} />
              <p className="text-xs font-semibold text-white mb-1">Softcopy KRS <span className="text-rose-500">*</span></p>
              <p className="text-[10px] text-slate-400 max-w-full truncate px-2">{krs ? krs.name : 'Format PDF'}</p>
            </div>
          </div>

          <div className="relative group">
            <input type="file" accept="image/*,.pdf" onChange={e => handleFileChange(e, setSertifikat)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <div className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-colors h-32 ${sertifikat ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/20 bg-white/5 group-hover:border-blue-500/50 group-hover:bg-blue-500/5'}`}>
              <Upload className={`w-6 h-6 mb-2 ${sertifikat ? 'text-emerald-400' : 'text-slate-400'}`} />
              <p className="text-xs font-semibold text-white mb-1">Sertifikat Prestasi</p>
              <p className="text-[10px] text-slate-400 max-w-full truncate px-2">{sertifikat ? sertifikat.name : '(Opsional)'}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Motivasi */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2">4. Motivasi</h2>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">Apa motivasi anda mengikuti volunteer SI-FEST? <span className="text-rose-500">*</span></label>
          <textarea required rows={4} value={motivasi} onChange={e => setMotivasi(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none" placeholder="Ceritakan motivasi Anda..." />
        </div>
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button 
          type="submit" 
          disabled={isSubmitting || selectedEvents.length !== 2}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-lg transition-all transform hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Mengirim Data...
            </>
          ) : (
            <>
              Kirim Pendaftaran
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
