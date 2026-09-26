"use client";

import React, { useState } from "react";
import { Upload, CheckCircle2, Loader2, ArrowRight, ChevronDown, Plus } from "lucide-react";

export function VolunteerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [nama, setNama] = useState("");
  const [noBp, setNoBp] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHp, setNoHp] = useState("");
  const [linkIg, setLinkIg] = useState("");
  const [motivasi, setMotivasi] = useState("");
  
  // Multiple Choice for Events
  const [pilihanUtama, setPilihanUtama] = useState("");
  const [pilihanKedua, setPilihanKedua] = useState("");
  
  // Files
  const [buktiFollow, setBuktiFollow] = useState<File | null>(null);
  const [krs, setKrs] = useState<File | null>(null);
  const [sertifikatFiles, setSertifikatFiles] = useState<File[]>([]);

  const eventOptions = [
    "Talk Show",
    "Turnamen Futsal (SLTA & Mahasiswa)",
    "Turnamen E-Sport (MLBB & E-Football)",
    "Lomba Keagamaan / MTQ",
    "Open Bazaar"
  ];

  const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSertifikatFiles(prev => [...prev, ...newFiles]);
      // Reset input value so the same file can be selected again if needed
      e.target.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (file: File | null) => void) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const fileToBase64 = (file: File): Promise<{ data: string, name: string, mime: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          data: reader.result as string,
          name: file.name,
          mime: file.type
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pilihanUtama || !pilihanKedua) {
      alert("Harap memilih Pilihan Utama dan Pilihan Kedua!");
      return;
    }
    if (pilihanUtama === pilihanKedua) {
      alert("Pilihan Utama dan Pilihan Kedua tidak boleh sama!");
      return;
    }
    if (!buktiFollow || !krs) {
      alert("Harap mengunggah file wajib (Bukti Follow IG & KRS)!");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 1. Convert files to Base64
      const buktiData = await fileToBase64(buktiFollow);
      const krsData = await fileToBase64(krs);
      
      const sertifDataArray = [];
      for (const file of sertifikatFiles) {
        sertifDataArray.push(await fileToBase64(file));
      }

      // 2. Prepare payload
      const payload = {
        action: "addVolunteer",
        nama,
        no_bp: noBp,
        jurusan,
        alamat,
        no_hp: noHp,
        link_ig: linkIg,
        event_1: pilihanUtama,
        event_2: pilihanKedua,
        motivasi,
        buktiData: buktiData.data,
        buktiName: buktiData.name,
        buktiMime: buktiData.mime,
        krsData: krsData.data,
        krsName: krsData.name,
        krsMime: krsData.mime,
        sertifikatFiles: sertifDataArray
      };

      // 3. Send to Google Apps Script
      const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzoAvxRHV7jzm3AZstFIocKRNa1b_aFKppF4kt1CUfY_Ylw-oSkUiGOzKalR18eI2L5Qg/exec";
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload)
      });
      
      const result = await res.json();
      if (result.status === "success") {
        setIsSuccess(true);
      } else {
        alert("Pendaftaran gagal: " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mendaftar. Silakan coba lagi nanti.");
    } finally {
      setIsSubmitting(false);
    }
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
            <label className="text-sm font-semibold text-slate-300">Alamat Lengkap <span className="text-rose-500">*</span></label>
            <input required type="text" value={alamat} onChange={e => setAlamat(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="Contoh: Jl. Sudirman No. 1..." />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Pilihan Utama <span className="text-rose-500">*</span></label>
            <div className="relative">
              <select required value={pilihanUtama} onChange={e => setPilihanUtama(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none shadow-inner cursor-pointer">
                <option value="" disabled className="text-slate-400">Pilih Event...</option>
                {eventOptions.map(opt => (
                  <option key={opt} value={opt} className="bg-[#0A192F] text-white" disabled={pilihanKedua === opt}>{opt}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Pilihan Kedua <span className="text-rose-500">*</span></label>
            <div className="relative">
              <select required value={pilihanKedua} onChange={e => setPilihanKedua(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none shadow-inner cursor-pointer">
                <option value="" disabled className="text-slate-400">Pilih Event...</option>
                {eventOptions.map(opt => (
                  <option key={opt} value={opt} className="bg-[#0A192F] text-white" disabled={pilihanUtama === opt}>{opt}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>
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
            <input type="file" multiple accept="image/*,.pdf" onChange={handleMultipleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <div className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-colors min-h-[8rem] ${sertifikatFiles.length > 0 ? 'border-emerald-500/50 bg-emerald-500/10 hover:border-emerald-400/80' : 'border-white/20 bg-white/5 group-hover:border-blue-500/50 group-hover:bg-blue-500/5'}`}>
              <Upload className={`w-6 h-6 mb-2 ${sertifikatFiles.length > 0 ? 'text-emerald-400' : 'text-slate-400'}`} />
              <p className="text-xs font-semibold text-white mb-1">Sertifikat Prestasi</p>
              
              {sertifikatFiles.length > 0 ? (
                <div className="flex flex-col items-center gap-2 mt-1">
                  <p className="text-[10px] text-emerald-300 font-medium">{sertifikatFiles.length} file terpilih</p>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-semibold text-white flex items-center gap-1 transition-colors">
                     <Plus className="w-3 h-3" /> Tambah Lagi
                  </span>
                </div>
              ) : (
                <p className="text-[10px] text-slate-400 max-w-full truncate px-2">(Bisa pilih {'>'} 1)</p>
              )}
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
          disabled={isSubmitting || !pilihanUtama || !pilihanKedua}
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
