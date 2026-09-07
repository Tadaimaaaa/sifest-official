import { ParticipantData } from "@/lib/types/registration";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import React, { useState } from "react";
import { AlertCircle, Plus, Trash2, UploadCloud, FileImage } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface StepParticipantDataProps {
  data: ParticipantData;
  eventSlug: string;
  onUpdate: (data: ParticipantData) => void;
  onNext: () => void;
  onBack: () => void;
  mode?: 'default' | 'school' | 'players';
}

export function StepParticipantData({ data, eventSlug, onUpdate, onNext, onBack, mode = 'default' }: StepParticipantDataProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (mode === 'default') {
      if (!data.fullName.trim()) {
        newErrors.fullName = "Nama lengkap wajib diisi.";
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email.trim()) {
        newErrors.email = "Email wajib diisi.";
        isValid = false;
      } else if (!emailRegex.test(data.email)) {
        newErrors.email = "Format email tidak valid.";
        isValid = false;
      }

      const phoneRegex = /^[+0-9]{9,15}$/;
      if (!data.whatsapp.trim()) {
        newErrors.whatsapp = "Nomor WhatsApp wajib diisi.";
        isValid = false;
      } else if (!phoneRegex.test(data.whatsapp.replace(/\s+/g, ""))) {
        newErrors.whatsapp = "Format nomor WhatsApp tidak valid (contoh: 0812...).";
        isValid = false;
      }

      if (!data.institution.trim()) {
        newErrors.institution = "Asal institusi wajib diisi.";
        isValid = false;
      }
    }

    if (eventSlug === 'turnamen-futsal-slta') {
      const meta = data.metadata || { schoolData: {}, players: [] };
      const school = meta.schoolData;
      
      if (mode === 'school') {
        if (!school.schoolName?.trim()) { newErrors['schoolData.schoolName'] = "Nama Sekolah wajib diisi."; isValid = false; }
        if (!school.level?.trim()) { newErrors['schoolData.level'] = "Jenjang wajib dipilih."; isValid = false; }
        if (!school.address?.trim()) { newErrors['schoolData.address'] = "Alamat wajib diisi."; isValid = false; }
        if (!school.city?.trim()) { newErrors['schoolData.city'] = "Kota/Kabupaten wajib diisi."; isValid = false; }
        if (!school.coachName?.trim()) { newErrors['schoolData.coachName'] = "Nama Pembina wajib diisi."; isValid = false; }
        if (!school.coachWhatsapp?.trim()) { newErrors['schoolData.coachWhatsapp'] = "No WhatsApp Pembina wajib diisi."; isValid = false; }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!school.email?.trim()) { 
          newErrors['schoolData.email'] = "Email wajib diisi."; 
          isValid = false; 
        } else if (!emailRegex.test(school.email)) {
          newErrors['schoolData.email'] = "Format email tidak valid.";
          isValid = false;
        }
      }

      if (mode === 'players') {
        const players = meta.players || [];
        if (players.length === 0) {
          newErrors['players'] = "Minimal harus ada 1 data pemain.";
          isValid = false;
        } else {
          for (let idx = 0; idx < players.length; idx++) {
            const p = players[idx];
            if (!p.name?.trim()) { newErrors[`players.${idx}.name`] = "Nama pemain wajib diisi."; isValid = false; }
            if (!p.nisn?.trim()) { newErrors[`players.${idx}.nisn`] = "NISN pemain wajib diisi."; isValid = false; }
            if (idx === 0 && !p.whatsapp?.trim()) { newErrors[`players.0.whatsapp`] = "No WhatsApp Kapten wajib diisi."; isValid = false; }
          }
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  // Helper to update school metadata
  const updateSchoolData = (field: string, value: string) => {
    const meta = data.metadata || { schoolData: {}, players: [{ name: '', nisn: '' }] };
    onUpdate({
      ...data,
      metadata: {
        ...meta,
        schoolData: { ...meta.schoolData, [field]: value }
      }
    });
  };

  // Helpers to update players
  const addPlayer = () => {
    const meta = data.metadata || { schoolData: {}, players: [] };
    if (meta.players.length >= 12) return;
    onUpdate({
      ...data,
      metadata: { ...meta, players: [...meta.players, { name: '', nisn: '' }] }
    });
  };

  const removePlayer = (index: number) => {
    const meta = data.metadata;
    if (!meta || meta.players.length <= 1) return;
    const newPlayers = [...meta.players];
    newPlayers.splice(index, 1);
    onUpdate({ ...data, metadata: { ...meta, players: newPlayers } });
  };

  const updatePlayer = (index: number, field: 'name' | 'nisn' | 'whatsapp' | 'studentCardUrl', value: string) => {
    const meta = data.metadata;
    if (!meta) return;
    const newPlayers = [...meta.players];
    newPlayers[index] = { ...newPlayers[index], [field]: value };
    onUpdate({ ...data, metadata: { ...meta, players: newPlayers } });
  };

  const supabase = createClient();
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  const handleFileUpload = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      alert("Harap unggah file gambar (JPG/PNG) atau PDF.");
      return;
    }

    setUploadingIdx(idx);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `kts_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('registration_files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('registration_files')
        .getPublicUrl(fileName);

      updatePlayer(idx, 'studentCardUrl', publicUrlData.publicUrl);
    } catch (err: any) {
      alert(err.message || "Gagal mengunggah file.");
    } finally {
      setUploadingIdx(null);
    }
  };

  // Initialize Futsal metadata if empty
  React.useEffect(() => {
    if (eventSlug === 'turnamen-futsal-slta' && !data.metadata) {
      onUpdate({
        ...data,
        metadata: {
          schoolData: { schoolName: '', level: '', address: '', city: '', coachName: '', coachWhatsapp: '' },
          players: [{ name: '', nisn: '' }] // Start with 1 player
        }
      });
    }
  }, [eventSlug, data.metadata, onUpdate]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl font-bold text-white mb-3">
          {mode === 'school' ? 'Data Sekolah' : mode === 'players' ? 'Data Pemain' : 'Data Peserta'}
        </h2>
        <p className="text-white/70">Pastikan data yang Anda masukkan sudah benar dan dapat dihubungi.</p>
      </div>

      {mode === 'default' && (
        <GlassCard variant="medium" className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name / Team Name */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-white/90">
              {eventSlug === 'turnamen-futsal' || eventSlug === 'turnamen-esport-mlbb' 
                ? "Nama Tim & Nama Kapten" 
                : eventSlug === 'open-bazaar'
                  ? "Nama Brand / Usaha & Penanggung Jawab"
                  : eventSlug === 'seminar-nasional'
                    ? "Nama Lengkap (Untuk Sertifikat)"
                    : "Nama Lengkap Peserta"} <span className="text-status-warning">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              value={data.fullName}
              onChange={(e) => onUpdate({ ...data, fullName: e.target.value })}
              placeholder={
                eventSlug === 'turnamen-futsal' || eventSlug === 'turnamen-esport-mlbb' 
                  ? "Contoh: Tim Garuda - Budi Santoso"
                  : eventSlug === 'open-bazaar'
                    ? "Contoh: Sate Taichan Senayan - Siti"
                    : "Masukkan nama lengkap Anda"
              }
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
            />
            {errors.fullName && (
              <p className="flex items-center gap-1.5 text-sm text-status-warning mt-1.5">
                <AlertCircle size={14} /> {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-white/90">
              Email <span className="text-status-warning">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => onUpdate({ ...data, email: e.target.value })}
              placeholder="email@contoh.com"
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
            />
            {errors.email && (
              <p className="flex items-center gap-1.5 text-sm text-status-warning mt-1.5">
                <AlertCircle size={14} /> {errors.email}
              </p>
            )}
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <label htmlFor="whatsapp" className="block text-sm font-medium text-white/90">
              Nomor WhatsApp <span className="text-status-warning">*</span>
            </label>
            <input
              id="whatsapp"
              type="tel"
              value={data.whatsapp}
              onChange={(e) => onUpdate({ ...data, whatsapp: e.target.value })}
              placeholder="081234567890"
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
            />
            {errors.whatsapp && (
              <p className="flex items-center gap-1.5 text-sm text-status-warning mt-1.5">
                <AlertCircle size={14} /> {errors.whatsapp}
              </p>
            )}
          </div>

          {/* Institution */}
          <div className="space-y-2">
            <label htmlFor="institution" className="block text-sm font-medium text-white/90">
              {eventSlug === 'open-bazaar' 
                ? "Kategori Usaha (F&B, Fashion, dll)" 
                : "Asal Institusi / Sekolah / Kampus"} <span className="text-status-warning">*</span>
            </label>
            <input
              id="institution"
              type="text"
              value={data.institution}
              onChange={(e) => onUpdate({ ...data, institution: e.target.value })}
              placeholder={
                eventSlug === 'open-bazaar' 
                  ? "Contoh: Makanan & Minuman" 
                  : "Universitas / SMA / Instansi"
              }
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
            />
            {errors.institution && (
              <p className="flex items-center gap-1.5 text-sm text-status-warning mt-1.5">
                <AlertCircle size={14} /> {errors.institution}
              </p>
            )}
          </div>
        </GlassCard>
      )}

      {/* EXTENDED FORMS FOR FUTSAL SLTA */}
      {eventSlug === 'turnamen-futsal-slta' && data.metadata && (
        <div className="space-y-8 mt-4">
          {/* SCHOOL DATA */}
          {mode === 'school' && (
            <GlassCard variant="medium" className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">Nama Sekolah <span className="text-status-warning">*</span></label>
                  <input type="text" value={data.metadata.schoolData?.schoolName || ''} onChange={(e) => updateSchoolData('schoolName', e.target.value)} placeholder="SMA Negeri 1 Padang" className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                  {errors['schoolData.schoolName'] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>{errors['schoolData.schoolName']}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">Jenjang <span className="text-status-warning">*</span></label>
                  <select value={data.metadata.schoolData?.level || ''} onChange={(e) => updateSchoolData('level', e.target.value)} className="w-full h-12 px-4 rounded-xl bg-[#1e293b] border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent">
                    <option value="" disabled>Pilih Jenjang</option>
                    <option value="SMA">SMA</option>
                    <option value="SMK">SMK</option>
                    <option value="MA">MA</option>
                  </select>
                  {errors['schoolData.level'] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>{errors['schoolData.level']}</p>}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-white/90">Alamat Sekolah <span className="text-status-warning">*</span></label>
                  <input type="text" value={data.metadata.schoolData?.address || ''} onChange={(e) => updateSchoolData('address', e.target.value)} placeholder="Jl. Sudirman No. 1" className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                  {errors['schoolData.address'] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>{errors['schoolData.address']}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">Kota/Kabupaten <span className="text-status-warning">*</span></label>
                  <input type="text" value={data.metadata.schoolData?.city || ''} onChange={(e) => updateSchoolData('city', e.target.value)} placeholder="Kota Padang" className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                  {errors['schoolData.city'] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>{errors['schoolData.city']}</p>}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-white/90">Email Sekolah / Perwakilan <span className="text-status-warning">*</span> <span className="text-xs text-white/50 font-normal">(Digunakan untuk invoice)</span></label>
                  <input type="email" value={data.metadata.schoolData?.email || ''} onChange={(e) => updateSchoolData('email', e.target.value)} placeholder="email@sekolah.sch.id" className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                  {errors['schoolData.email'] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>{errors['schoolData.email']}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">Nama Guru / Pembina <span className="text-status-warning">*</span></label>
                  <input type="text" value={data.metadata.schoolData?.coachName || ''} onChange={(e) => updateSchoolData('coachName', e.target.value)} placeholder="Bapak Budi" className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                  {errors['schoolData.coachName'] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>{errors['schoolData.coachName']}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">No. WhatsApp Pembina <span className="text-status-warning">*</span></label>
                  <input type="tel" value={data.metadata.schoolData?.coachWhatsapp || ''} onChange={(e) => updateSchoolData('coachWhatsapp', e.target.value)} placeholder="0812..." className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                  {errors['schoolData.coachWhatsapp'] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>{errors['schoolData.coachWhatsapp']}</p>}
                </div>
              </div>
            </GlassCard>
          )}

          {/* PLAYER DATA */}
          {mode === 'players' && (
            <GlassCard variant="medium" className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <h3 className="font-heading text-xl font-bold text-white">2. Data Pemain</h3>
                <span className="text-sm text-white/50">{data.metadata.players?.length || 0} / 12 Pemain</span>
              </div>
              {errors['players'] && <p className="text-sm text-status-warning mb-4"><AlertCircle size={14} className="inline mr-1"/>{errors['players']}</p>}
              
              <div className="space-y-4">
                {data.metadata.players?.map((player: any, idx: number) => (
                  <div key={idx} className="flex flex-col gap-4 items-start p-6 rounded-xl bg-white/5 border border-white/10 relative">
                    {data.metadata.players.length > 1 && (
                      <button type="button" onClick={() => removePlayer(idx)} className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors">
                        <Trash2 size={18} />
                      </button>
                    )}
                    
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      Pemain {idx + 1} {idx === 0 && <span className="text-xs bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded uppercase tracking-wider">Kapten</span>}
                    </h4>

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                      <div className="flex-1 w-full space-y-2">
                        <label className="block text-sm font-medium text-white/90">Nama Lengkap <span className="text-status-warning">*</span></label>
                        <input type="text" value={player.name} onChange={(e) => updatePlayer(idx, 'name', e.target.value)} placeholder="Nama Lengkap" className="w-full h-12 px-4 rounded-xl bg-[#1e293b] border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                        {errors[`players.${idx}.name`] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>Wajib diisi</p>}
                      </div>
                      <div className="flex-1 w-full space-y-2">
                        <label className="block text-sm font-medium text-white/90">NISN <span className="text-status-warning">*</span></label>
                        <input type="text" value={player.nisn} onChange={(e) => updatePlayer(idx, 'nisn', e.target.value)} placeholder="00123..." className="w-full h-12 px-4 rounded-xl bg-[#1e293b] border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                        {errors[`players.${idx}.nisn`] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>Wajib diisi</p>}
                      </div>
                    </div>

                    {idx === 0 && (
                      <div className="w-full sm:w-1/2 pr-0 sm:pr-2 space-y-2">
                        <label className="block text-sm font-medium text-white/90">No. WhatsApp <span className="text-status-warning">*</span> <span className="text-xs text-white/50 font-normal">(Untuk grup WA)</span></label>
                        <input type="tel" value={player.whatsapp || ''} onChange={(e) => updatePlayer(idx, 'whatsapp', e.target.value)} placeholder="0812..." className="w-full h-12 px-4 rounded-xl bg-[#1e293b] border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                        {errors[`players.0.whatsapp`] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>{errors[`players.0.whatsapp`]}</p>}
                      </div>
                    )}

                    <div className="w-full space-y-2">
                      <label className="block text-sm font-medium text-white/90">Kartu Tanda Siswa (Opsional)</label>
                      <div className="flex items-center gap-4">
                        <label className={`relative flex items-center justify-center px-4 py-3 border border-white/20 border-dashed rounded-xl cursor-pointer transition-colors ${player.studentCardUrl ? 'bg-brand-primary/10 border-brand-primary/50' : 'bg-[#1e293b] hover:bg-white/10'}`}>
                          <input type="file" className="hidden" accept="image/*,application/pdf" onChange={(e) => handleFileUpload(idx, e)} disabled={uploadingIdx === idx} />
                          {uploadingIdx === idx ? (
                            <div className="flex items-center gap-2 text-brand-accent">
                              <div className="w-4 h-4 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
                              <span className="text-sm">Mengunggah...</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-white/80">
                              <UploadCloud size={18} />
                              <span className="text-sm">{player.studentCardUrl ? 'Ganti File KTS' : 'Unggah File KTS'}</span>
                            </div>
                          )}
                        </label>
                        {player.studentCardUrl && (
                          <a href={player.studentCardUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-brand-primary hover:underline">
                            <FileImage size={16} /> Lihat KTS
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {data.metadata.players?.length < 12 && (
                <Button type="button" variant="ghost" onClick={addPlayer} className="w-full mt-6 border-dashed border-white/30 text-white/70 hover:text-white hover:border-white">
                  <Plus size={18} className="mr-2" />
                  Tambah Pemain
                </Button>
              )}
            </GlassCard>
          )}
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row justify-between pt-8 border-t border-white/10 mt-8 gap-4">
        <Button 
          variant="glass" 
          size="lg" 
          onClick={onBack}
          className="w-full sm:w-auto px-8"
        >
          Kembali
        </Button>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={handleNext}
          className="w-full sm:w-auto px-12"
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );
}
