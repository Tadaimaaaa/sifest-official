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
  mode?: 'default' | 'school' | 'players' | 'mlbb-team' | 'mlbb-players' | 'efootball' | 'bazaar';
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
        if (!school.coachName?.trim()) { newErrors['schoolData.coachName'] = "Nama Penanggung Jawab / Pembina wajib diisi."; isValid = false; }
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
        const teamData = meta.teamData || {};
        if (!teamData.coachName?.trim()) { newErrors['teamData.coachName'] = "Nama Pelatih wajib diisi."; isValid = false; }
        if (!teamData.coachWhatsapp?.trim()) { newErrors['teamData.coachWhatsapp'] = "No WhatsApp Pelatih wajib diisi."; isValid = false; }

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
            if (!p.photoUrl) { newErrors[`players.${idx}.photoUrl`] = "Pas Foto Pemain wajib diunggah."; isValid = false; }
            if (!p.studentCardUrl) { newErrors[`players.${idx}.studentCardUrl`] = "Kartu Tanda Pelajar wajib diunggah."; isValid = false; }
            if (!p.jerseyNumber?.trim()) { newErrors[`players.${idx}.jerseyNumber`] = "Nomor Punggung wajib diisi."; isValid = false; }
          }
        }
      }
    }

    if (eventSlug === 'turnamen-esport-mlbb') {
      const meta = data.metadata || { teamData: {}, players: [] };
      
      if (mode === 'mlbb-team') {
        const team = meta.teamData || {};
        if (!team.teamCategory?.trim()) { newErrors['teamData.teamCategory'] = "Kategori wajib dipilih."; isValid = false; }
        if (!team.teamName?.trim()) { newErrors['teamData.teamName'] = "Nama Tim wajib diisi."; isValid = false; }
        if (!team.captainName?.trim()) { newErrors['teamData.captainName'] = "Nama Kapten wajib diisi."; isValid = false; }
        if (!team.captainWhatsapp?.trim()) { newErrors['teamData.captainWhatsapp'] = "Nomor WhatsApp Kapten wajib diisi."; isValid = false; }
      }

      if (mode === 'mlbb-players') {
        const players = meta.players || [];
        if (players.length < 5) {
           newErrors['players'] = "Minimal harus ada 5 data pemain (1 Kapten + 4 Anggota).";
           isValid = false;
        } else {
          for (let idx = 0; idx < 6; idx++) {
            const p = players[idx] || {};
            const isCadangan = idx === 5;
            const isEmptyCadangan = isCadangan && !p.name?.trim() && !p.nickname?.trim() && !p.idGame?.trim();
            
            if (!isEmptyCadangan) {
              // Kapten name is derived from step 2, but for safety, validate it here if missing
              if (!p.name?.trim() && idx !== 0) { newErrors[`players.${idx}.name`] = "Nama Lengkap wajib diisi."; isValid = false; }
              if (!p.nickname?.trim()) { newErrors[`players.${idx}.nickname`] = "Nickname/IGN wajib diisi."; isValid = false; }
              if (!p.idGame?.trim()) { newErrors[`players.${idx}.idGame`] = "ID Game wajib diisi."; isValid = false; }
            }
          }
        }
      }
    }

    if (eventSlug === 'turnamen-esport-efootball' && mode === 'efootball') {
      if (!data.fullName.trim()) { newErrors.fullName = "Nama lengkap wajib diisi."; isValid = false; }
      const phoneRegex = /^[+0-9]{9,15}$/;
      if (!data.whatsapp.trim()) {
        newErrors.whatsapp = "Nomor WhatsApp wajib diisi.";
        isValid = false;
      } else if (!phoneRegex.test(data.whatsapp.replace(/\s+/g, ""))) {
        newErrors.whatsapp = "Format nomor WhatsApp tidak valid.";
        isValid = false;
      }
      const meta = data.metadata || {};
      if (!meta.fotoKtpUrl) { newErrors['metadata.fotoKtpUrl'] = "Foto KTP wajib diunggah."; isValid = false; }
    }

    if (eventSlug.startsWith('open-bazaar') && mode === 'bazaar') {
      if (!data.institution.trim()) { newErrors.institution = "Nama Usaha/Brand wajib diisi."; isValid = false; }
      if (!data.fullName.trim()) { newErrors.fullName = "Nama Penanggung Jawab wajib diisi."; isValid = false; }
      const phoneRegex = /^[+0-9]{9,15}$/;
      if (!data.whatsapp.trim()) {
        newErrors.whatsapp = "Nomor WhatsApp wajib diisi.";
        isValid = false;
      } else if (!phoneRegex.test(data.whatsapp.replace(/\s+/g, ""))) {
        newErrors.whatsapp = "Format nomor WhatsApp tidak valid.";
        isValid = false;
      }
      const meta = data.metadata || {};
      if (!meta.address?.trim()) { newErrors['metadata.address'] = "Alamat wajib diisi."; isValid = false; }
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

  // Helper to update team/coach metadata
  const updateTeamData = (field: string, value: string) => {
    const meta = data.metadata || { teamData: {}, players: [{ name: '', nisn: '' }] };
    onUpdate({
      ...data,
      metadata: {
        ...meta,
        teamData: { ...meta.teamData, [field]: value }
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

  const updatePlayer = (index: number, field: 'name' | 'nisn' | 'nickname' | 'idGame' | 'whatsapp' | 'studentCardUrl' | 'posisi' | 'photoUrl' | 'birthCertificateUrl' | 'jerseyNumber', value: string) => {
    const meta = data.metadata;
    if (!meta) return;
    const newPlayers = [...meta.players];
    newPlayers[index] = { ...newPlayers[index], [field]: value };
    onUpdate({ ...data, metadata: { ...meta, players: newPlayers } });
  };

  const supabase = createClient();
  const [uploadingState, setUploadingState] = useState<{ idx: number, field: string } | null>(null);

  const handleFileUpload = async (idx: number, field: 'studentCardUrl' | 'photoUrl' | 'birthCertificateUrl', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      alert("Harap unggah file gambar (JPG/PNG) atau PDF.");
      return;
    }

    setUploadingState({ idx, field });
    try {
      const fileExt = file.name.split('.').pop();
      const prefix = field === 'photoUrl' ? 'foto' : field === 'birthCertificateUrl' ? 'akta' : 'kts';
      const fileName = `${prefix}_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('registration_files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('registration_files')
        .getPublicUrl(fileName);

      updatePlayer(idx, field, publicUrlData.publicUrl);
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      alert(err.message || "Gagal mengunggah file.");
    } finally {
      setUploadingState(null);
    }
  };

  const handleSingleFileUpload = async (field: 'fotoKtpUrl' | 'fotoKtmUrl', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      alert("Harap unggah file gambar (JPG/PNG) atau PDF.");
      return;
    }

    setUploadingState({ idx: -1, field });
    try {
      const fileExt = file.name.split('.').pop();
      const prefix = field === 'fotoKtpUrl' ? 'ktp' : 'ktm';
      const fileName = `${prefix}_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('registration_files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('registration_files')
        .getPublicUrl(fileName);

      const meta = data.metadata || {};
      onUpdate({ ...data, metadata: { ...meta, [field]: publicUrlData.publicUrl } });
    } catch (err: any) {
      alert(err.message || "Gagal mengunggah file.");
    } finally {
      setUploadingState(null);
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
    } else if (eventSlug === 'turnamen-esport-mlbb' && !data.metadata) {
      onUpdate({
        ...data,
        metadata: {
          teamData: { teamName: '', teamCategory: '', captainName: '', captainWhatsapp: '', coachName: '', coachWhatsapp: '', assistantCoachName: '' },
          players: Array(6).fill(null).map(() => ({ name: '', nickname: '', idGame: '', studentCardUrl: '' }))
        }
      });
    } else if (eventSlug === 'turnamen-esport-efootball' && !data.metadata) {
      onUpdate({
        ...data,
        metadata: { fotoKtpUrl: '', fotoKtmUrl: '' }
      });
    } else if (eventSlug.startsWith('open-bazaar') && !data.metadata) {
      onUpdate({
        ...data,
        metadata: { address: '', instagram: '', category: '', products: '' }
      });
    }
  }, [eventSlug, data.metadata, onUpdate]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl font-bold text-white mb-3">
          {mode === 'school' ? 'Data Sekolah' : mode === 'mlbb-team' ? 'Data Tim' : (mode === 'players' || mode === 'mlbb-players') ? 'Data Pemain' : mode === 'bazaar' ? 'Data Usaha' : 'Data Peserta'}
        </h2>
        <p className="text-white/70">Pastikan data yang Anda masukkan sudah benar dan dapat dihubungi.</p>
      </div>

      {mode === 'efootball' && (
        <GlassCard variant="medium" className="p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="efFullName" className="block text-sm font-medium text-white/90">Nama Lengkap <span className="text-status-warning">*</span></label>
            <input
              id="efFullName"
              type="text"
              value={data.fullName}
              onChange={(e) => onUpdate({ ...data, fullName: e.target.value })}
              placeholder="Masukkan nama lengkap"
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all"
            />
            {errors.fullName && (
              <p className="flex items-center gap-1.5 text-sm text-status-warning mt-1.5">
                <AlertCircle size={14} /> {errors.fullName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="efWhatsapp" className="block text-sm font-medium text-white/90">Nomor WhatsApp <span className="text-status-warning">*</span></label>
            <input
              id="efWhatsapp"
              type="tel"
              value={data.whatsapp}
              onChange={(e) => onUpdate({ ...data, whatsapp: e.target.value })}
              placeholder="081234567890"
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all"
            />
            {errors.whatsapp && (
              <p className="flex items-center gap-1.5 text-sm text-status-warning mt-1.5">
                <AlertCircle size={14} /> {errors.whatsapp}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white/90">Foto KTP <span className="text-status-warning">*</span></label>
              <label className="relative flex flex-col items-center justify-center p-6 border-2 border-white/20 border-dashed rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
                <input type="file" className="hidden" accept="image/*,application/pdf" onChange={(e) => handleSingleFileUpload('fotoKtpUrl', e)} disabled={uploadingState?.field === 'fotoKtpUrl'} />
                {uploadingState?.field === 'fotoKtpUrl' ? (
                  <div className="animate-spin w-6 h-6 border-2 border-brand-accent border-t-transparent rounded-full" />
                ) : data.metadata?.fotoKtpUrl ? (
                  <div className="flex items-center gap-2 text-status-success"><FileImage size={20} /> <span>File Terunggah</span></div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-white/60"><UploadCloud size={24} /> <span className="text-sm">Pilih File</span></div>
                )}
              </label>
              {errors['metadata.fotoKtpUrl'] && (
                <p className="flex items-center gap-1.5 text-sm text-status-warning mt-1.5">
                  <AlertCircle size={14} /> {errors['metadata.fotoKtpUrl']}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-white/90">Foto KTM <span className="text-white/50">(Opsional)</span></label>
              <label className="relative flex flex-col items-center justify-center p-6 border-2 border-white/20 border-dashed rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
                <input type="file" className="hidden" accept="image/*,application/pdf" onChange={(e) => handleSingleFileUpload('fotoKtmUrl', e)} disabled={uploadingState?.field === 'fotoKtmUrl'} />
                {uploadingState?.field === 'fotoKtmUrl' ? (
                  <div className="animate-spin w-6 h-6 border-2 border-brand-accent border-t-transparent rounded-full" />
                ) : data.metadata?.fotoKtmUrl ? (
                  <div className="flex items-center gap-2 text-status-success"><FileImage size={20} /> <span>File Terunggah</span></div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-white/60"><UploadCloud size={24} /> <span className="text-sm">Pilih File</span></div>
                )}
              </label>
            </div>
          </div>
        </GlassCard>
      )}

      {mode === 'bazaar' && (
        <GlassCard variant="medium" className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="bazaarInstitution" className="block text-sm font-medium text-white/90">Nama Usaha/Brand <span className="text-status-warning">*</span></label>
            <input
              id="bazaarInstitution"
              type="text"
              value={data.institution}
              onChange={(e) => onUpdate({ ...data, institution: e.target.value })}
              placeholder="Masukkan nama usaha/brand"
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all"
            />
            {errors.institution && <p className="flex items-center gap-1.5 text-sm text-status-warning mt-1.5"><AlertCircle size={14} /> {errors.institution}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="bazaarFullName" className="block text-sm font-medium text-white/90">Nama Penanggung Jawab <span className="text-status-warning">*</span></label>
            <input
              id="bazaarFullName"
              type="text"
              value={data.fullName}
              onChange={(e) => onUpdate({ ...data, fullName: e.target.value })}
              placeholder="Masukkan nama penanggung jawab"
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all"
            />
            {errors.fullName && <p className="flex items-center gap-1.5 text-sm text-status-warning mt-1.5"><AlertCircle size={14} /> {errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="bazaarWhatsapp" className="block text-sm font-medium text-white/90">Nomor WhatsApp <span className="text-status-warning">*</span></label>
            <input
              id="bazaarWhatsapp"
              type="tel"
              value={data.whatsapp}
              onChange={(e) => onUpdate({ ...data, whatsapp: e.target.value })}
              placeholder="081234567890"
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all"
            />
            {errors.whatsapp && <p className="flex items-center gap-1.5 text-sm text-status-warning mt-1.5"><AlertCircle size={14} /> {errors.whatsapp}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="bazaarInstagram" className="block text-sm font-medium text-white/90">Instagram/Sosial Media <span className="text-white/50">(Opsional)</span></label>
            <input
              id="bazaarInstagram"
              type="text"
              value={data.metadata?.instagram || ''}
              onChange={(e) => onUpdate({ ...data, metadata: { ...data.metadata, instagram: e.target.value } })}
              placeholder="@username atau link"
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="bazaarAddress" className="block text-sm font-medium text-white/90">Alamat <span className="text-status-warning">*</span></label>
            <textarea
              id="bazaarAddress"
              value={data.metadata?.address || ''}
              onChange={(e) => onUpdate({ ...data, metadata: { ...data.metadata, address: e.target.value } })}
              placeholder="Alamat lengkap usaha atau domisili penanggung jawab"
              className="w-full h-24 p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all resize-none"
            />
            {errors['metadata.address'] && <p className="flex items-center gap-1.5 text-sm text-status-warning mt-1.5"><AlertCircle size={14} /> {errors['metadata.address']}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="bazaarCategory" className="block text-sm font-medium text-white/90">Kategori Usaha <span className="text-white/50">(Opsional)</span></label>
            <input
              id="bazaarCategory"
              type="text"
              value={data.metadata?.category || ''}
              onChange={(e) => onUpdate({ ...data, metadata: { ...data.metadata, category: e.target.value } })}
              placeholder="Contoh: Makanan & Minuman, Fashion, Jasa"
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="bazaarProducts" className="block text-sm font-medium text-white/90">Produk yang Dijual <span className="text-white/50">(Opsional)</span></label>
            <input
              id="bazaarProducts"
              type="text"
              value={data.metadata?.products || ''}
              onChange={(e) => onUpdate({ ...data, metadata: { ...data.metadata, products: e.target.value } })}
              placeholder="Contoh: Sate Taichan, Kopi, Thrift Kaos"
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all"
            />
          </div>
        </GlassCard>
      )}

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
            <div className="space-y-6">
              {/* Card 1: Data Sekolah */}
              <GlassCard variant="medium" className="p-6 md:p-8">
                <h4 className="font-heading text-lg font-bold text-white mb-6 pb-4 border-b border-white/10">Data Sekolah</h4>
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
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/90">Email Sekolah / Perwakilan <span className="text-status-warning">*</span> <span className="text-xs text-white/50 font-normal">(Untuk invoice)</span></label>
                    <input type="email" value={data.metadata.schoolData?.email || ''} onChange={(e) => updateSchoolData('email', e.target.value)} placeholder="email@sekolah.sch.id" className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                    {errors['schoolData.email'] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>{errors['schoolData.email']}</p>}
                  </div>
                </div>
              </GlassCard>

              {/* Card 2: Penanggung Jawab / Pembina */}
              <GlassCard variant="medium" className="p-6 md:p-8">
                <h4 className="font-heading text-lg font-bold text-white mb-6 pb-4 border-b border-white/10">Penanggung Jawab / Pembina</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/90">Nama Penanggung Jawab / Pembina <span className="text-status-warning">*</span></label>
                    <input type="text" value={data.metadata.schoolData?.coachName || ''} onChange={(e) => updateSchoolData('coachName', e.target.value)} placeholder="Bapak Budi" className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                    {errors['schoolData.coachName'] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>{errors['schoolData.coachName']}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/90">No. WhatsApp Penanggung Jawab / Pembina <span className="text-status-warning">*</span></label>
                    <input type="tel" value={data.metadata.schoolData?.coachWhatsapp || ''} onChange={(e) => updateSchoolData('coachWhatsapp', e.target.value)} placeholder="0812..." className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                    {errors['schoolData.coachWhatsapp'] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>{errors['schoolData.coachWhatsapp']}</p>}
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {/* PLAYER DATA */}
          {mode === 'players' && (
            <div className="space-y-6">
              {/* Card 1: Data Pelatih */}
              <GlassCard variant="medium" className="p-6 md:p-8">
                <h3 className="font-heading text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">1. Data Pelatih</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/90">Nama Pelatih <span className="text-status-warning">*</span></label>
                    <input type="text" value={data.metadata.teamData?.coachName || ''} onChange={(e) => updateTeamData('coachName', e.target.value)} placeholder="Nama Pelatih" className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                    {errors['teamData.coachName'] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>{errors['teamData.coachName']}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/90">No. WhatsApp Pelatih <span className="text-status-warning">*</span></label>
                    <input type="tel" value={data.metadata.teamData?.coachWhatsapp || ''} onChange={(e) => updateTeamData('coachWhatsapp', e.target.value)} placeholder="0812..." className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                    {errors['teamData.coachWhatsapp'] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>{errors['teamData.coachWhatsapp']}</p>}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-white/90">Nama Asisten Pelatih <span className="text-xs text-white/50 font-normal">(Opsional)</span></label>
                    <input type="text" value={data.metadata.teamData?.assistantCoachName || ''} onChange={(e) => updateTeamData('assistantCoachName', e.target.value)} placeholder="Nama Asisten Pelatih" className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                  </div>
                </div>
              </GlassCard>

              {/* Card 2: Data Pemain */}
              <GlassCard variant="medium" className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                  <h3 className="font-heading text-xl font-bold text-white">2. Data Pemain</h3>
                  <span className="text-sm text-white/50">{data.metadata.players?.length || 0} / 12 Pemain</span>
                </div>
                {errors['players'] && <p className="text-sm text-status-warning mb-4"><AlertCircle size={14} className="inline mr-1"/>{errors['players']}</p>}
                
                <div className="space-y-4">
                {data.metadata.players?.map((player: Record<string, string>, idx: number) => (
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
                        <input type="text" value={player.name} onChange={(e) => updatePlayer(idx, 'name', e.target.value)} placeholder="Nama Lengkap" className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                        {errors[`players.${idx}.name`] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>Wajib diisi</p>}
                      </div>
                      <div className="flex-1 w-full space-y-2">
                        <label className="block text-sm font-medium text-white/90">NISN <span className="text-status-warning">*</span></label>
                        <input type="text" value={player.nisn} onChange={(e) => updatePlayer(idx, 'nisn', e.target.value)} placeholder="00123..." className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                        {errors[`players.${idx}.nisn`] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>Wajib diisi</p>}
                      </div>
                    </div>

                    {idx === 0 && (
                      <div className="w-full sm:w-1/2 pr-0 sm:pr-2 space-y-2">
                        <label className="block text-sm font-medium text-white/90">No. WhatsApp <span className="text-status-warning">*</span> <span className="text-xs text-white/50 font-normal">(Untuk grup WA)</span></label>
                        <input type="tel" value={player.whatsapp || ''} onChange={(e) => updatePlayer(idx, 'whatsapp', e.target.value)} placeholder="0812..." className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                        {errors[`players.0.whatsapp`] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>{errors[`players.0.whatsapp`]}</p>}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                      {/* Posisi */}
                      <div className="flex-1 w-full space-y-2">
                        <label className="block text-sm font-medium text-white/90">Posisi <span className="text-xs text-white/50 font-normal">(Opsional)</span></label>
                        <select value={player.posisi || ''} onChange={(e) => updatePlayer(idx, 'posisi', e.target.value)} className="w-full h-12 px-4 rounded-xl bg-[#1e293b] border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent">
                          <option value="">-- Pilih Posisi --</option>
                          <option value="Penjaga Gawang">Penjaga Gawang</option>
                          <option value="Anchor">Anchor</option>
                          <option value="Flank">Flank</option>
                          <option value="Pivot">Pivot</option>
                        </select>
                      </div>
                      
                      {/* Nomor Punggung */}
                      <div className="flex-1 w-full space-y-2">
                        <label className="block text-sm font-medium text-white/90">Nomor Punggung <span className="text-status-warning">*</span></label>
                        <input type="text" value={player.jerseyNumber || ''} onChange={(e) => updatePlayer(idx, 'jerseyNumber', e.target.value)} placeholder="Contoh: 10" className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                        {errors[`players.${idx}.jerseyNumber`] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>Wajib diisi</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
                      {/* Upload Pas Foto */}
                      <div className="w-full space-y-2">
                        <label className="block text-sm font-medium text-white/90">Pas Foto Pemain <span className="text-status-warning">*</span></label>
                        <div className="flex flex-col gap-2">
                          <label className={`relative flex items-center justify-center px-4 py-3 border border-white/20 border-dashed rounded-xl cursor-pointer transition-colors ${player.photoUrl ? 'bg-brand-primary/10 border-brand-primary/50' : 'bg-white/5 hover:bg-white/10'}`}>
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(idx, 'photoUrl', e)} disabled={uploadingState?.idx === idx && uploadingState?.field === 'photoUrl'} />
                            {uploadingState?.idx === idx && uploadingState?.field === 'photoUrl' ? (
                              <div className="flex items-center gap-2 text-brand-accent">
                                <div className="w-4 h-4 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
                                <span className="text-sm">Mengunggah...</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-white/80">
                                <UploadCloud size={18} />
                                <span className="text-sm">{player.photoUrl ? 'Ganti Pas Foto' : 'Unggah Pas Foto'}</span>
                              </div>
                            )}
                          </label>
                          {player.photoUrl && (
                            <a href={player.photoUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-sm text-brand-primary hover:underline bg-white/5 py-2 rounded-lg">
                              <FileImage size={16} /> Lihat Foto
                            </a>
                          )}
                        </div>
                        {errors[`players.${idx}.photoUrl`] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>Wajib diunggah</p>}
                      </div>

                      {/* Upload Kartu Tanda Pelajar */}
                      <div className="w-full space-y-2">
                        <label className="block text-sm font-medium text-white/90">Kartu Tanda Pelajar <span className="text-status-warning">*</span></label>
                        <div className="flex flex-col gap-2">
                          <label className={`relative flex items-center justify-center px-4 py-3 border border-white/20 border-dashed rounded-xl cursor-pointer transition-colors ${player.studentCardUrl ? 'bg-brand-primary/10 border-brand-primary/50' : 'bg-white/5 hover:bg-white/10'}`}>
                            <input type="file" className="hidden" accept="image/*,application/pdf" onChange={(e) => handleFileUpload(idx, 'studentCardUrl', e)} disabled={uploadingState?.idx === idx && uploadingState?.field === 'studentCardUrl'} />
                            {uploadingState?.idx === idx && uploadingState?.field === 'studentCardUrl' ? (
                              <div className="flex items-center gap-2 text-brand-accent">
                                <div className="w-4 h-4 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
                                <span className="text-sm">Mengunggah...</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-white/80">
                                <UploadCloud size={18} />
                                <span className="text-sm">{player.studentCardUrl ? 'Ganti KTP/KTS' : 'Unggah KTP/KTS'}</span>
                              </div>
                            )}
                          </label>
                          {player.studentCardUrl && (
                            <a href={player.studentCardUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-sm text-brand-primary hover:underline bg-white/5 py-2 rounded-lg">
                              <FileImage size={16} /> Lihat KTP/KTS
                            </a>
                          )}
                        </div>
                        {errors[`players.${idx}.studentCardUrl`] && <p className="text-sm text-status-warning"><AlertCircle size={14} className="inline mr-1"/>Wajib diunggah</p>}
                      </div>

                      {/* Upload Akta Kelahiran */}
                      <div className="w-full space-y-2">
                        <label className="block text-sm font-medium text-white/90">Akta Kelahiran <span className="text-xs text-white/50 font-normal">(Opsional)</span></label>
                        <div className="flex flex-col gap-2">
                          <label className={`relative flex items-center justify-center px-4 py-3 border border-white/20 border-dashed rounded-xl cursor-pointer transition-colors ${player.birthCertificateUrl ? 'bg-brand-primary/10 border-brand-primary/50' : 'bg-white/5 hover:bg-white/10'}`}>
                            <input type="file" className="hidden" accept="image/*,application/pdf" onChange={(e) => handleFileUpload(idx, 'birthCertificateUrl', e)} disabled={uploadingState?.idx === idx && uploadingState?.field === 'birthCertificateUrl'} />
                            {uploadingState?.idx === idx && uploadingState?.field === 'birthCertificateUrl' ? (
                              <div className="flex items-center gap-2 text-brand-accent">
                                <div className="w-4 h-4 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
                                <span className="text-sm">Mengunggah...</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-white/80">
                                <UploadCloud size={18} />
                                <span className="text-sm">{player.birthCertificateUrl ? 'Ganti Akta' : 'Unggah Akta'}</span>
                              </div>
                            )}
                          </label>
                          {player.birthCertificateUrl && (
                            <a href={player.birthCertificateUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-sm text-brand-primary hover:underline bg-white/5 py-2 rounded-lg">
                              <FileImage size={16} /> Lihat Akta
                            </a>
                          )}
                        </div>
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
            </div>
          )}
        </div>
      )}

      {mode === 'mlbb-team' && data.metadata && (
        <GlassCard variant="medium" className="p-6 md:p-8 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Data Tim</h3>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/90">
                Kategori <span className="text-status-warning">*</span>
              </label>
              <select
                value={data.metadata.teamData?.teamCategory || ''}
                onChange={(e) => updateTeamData('teamCategory', e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
              >
                <option value="" disabled className="text-slate-800">Pilih Kategori</option>
                <option value="Siswa" className="text-slate-800">Siswa</option>
                <option value="Mahasiswa" className="text-slate-800">Mahasiswa</option>
                <option value="Umum" className="text-slate-800">Umum</option>
              </select>
              {errors['teamData.teamCategory'] && <p className="text-sm text-status-warning mt-1"><AlertCircle size={14} className="inline mr-1"/>{errors['teamData.teamCategory']}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/90">
                Nama Tim <span className="text-status-warning">*</span>
              </label>
              <input
                type="text"
                value={data.metadata.teamData?.teamName || ''}
                onChange={(e) => updateTeamData('teamName', e.target.value)}
                placeholder="Masukkan nama tim"
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all"
              />
              {errors['teamData.teamName'] && <p className="text-sm text-status-warning mt-1"><AlertCircle size={14} className="inline mr-1"/>{errors['teamData.teamName']}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/90">
                Nama Kapten <span className="text-status-warning">*</span>
              </label>
              <input
                type="text"
                value={data.metadata.teamData?.captainName || ''}
                onChange={(e) => updateTeamData('captainName', e.target.value)}
                placeholder="Nama lengkap kapten"
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all"
              />
              {errors['teamData.captainName'] && <p className="text-sm text-status-warning mt-1"><AlertCircle size={14} className="inline mr-1"/>{errors['teamData.captainName']}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/90">
                Nomor WhatsApp Kapten <span className="text-status-warning">*</span>
              </label>
              <input
                type="tel"
                value={data.metadata.teamData?.captainWhatsapp || ''}
                onChange={(e) => updateTeamData('captainWhatsapp', e.target.value)}
                placeholder="081234567890"
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all"
              />
              {errors['teamData.captainWhatsapp'] && <p className="text-sm text-status-warning mt-1"><AlertCircle size={14} className="inline mr-1"/>{errors['teamData.captainWhatsapp']}</p>}
            </div>
          </div>
        </GlassCard>
      )}

      {mode === 'mlbb-players' && data.metadata && (
        <div className="space-y-6">
          <GlassCard variant="medium" className="p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-semibold text-white">Data Coach (Opsional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90">Nama Coach</label>
                <input
                  type="text"
                  value={data.metadata.teamData?.coachName || ''}
                  onChange={(e) => updateTeamData('coachName', e.target.value)}
                  placeholder="Opsional"
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90">No. WhatsApp Coach</label>
                <input
                  type="tel"
                  value={data.metadata.teamData?.coachWhatsapp || ''}
                  onChange={(e) => updateTeamData('coachWhatsapp', e.target.value)}
                  placeholder="Opsional"
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-white/90">Nama Asisten Coach</label>
                <input
                  type="text"
                  value={data.metadata.teamData?.assistantCoachName || ''}
                  onChange={(e) => updateTeamData('assistantCoachName', e.target.value)}
                  placeholder="Opsional"
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all"
                />
              </div>
            </div>
          </GlassCard>

          <div className="space-y-6">
            {data.metadata.players?.slice(0, 6).map((player: Record<string, string>, idx: number) => {
              const isCadangan = idx === 5;
              const isKapten = idx === 0;
              const title = isKapten ? 'Kapten' : isCadangan ? 'Cadangan 1 (Opsional)' : `Player ${idx + 1}`;
              const requiredMark = isCadangan ? '' : <span className="text-status-warning">*</span>;
              
              // For captain, we lock the name field
              const kaptenName = data.metadata?.teamData?.captainName || '';

              return (
                <GlassCard key={idx} variant="medium" className="p-6 md:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white/90">Nama Lengkap {requiredMark}</label>
                      <input
                        type="text"
                        value={isKapten ? kaptenName : player.name || ''}
                        onChange={(e) => {
                          if (!isKapten) updatePlayer(idx, 'name', e.target.value);
                        }}
                        disabled={isKapten}
                        placeholder={isKapten ? "Sesuai Data Tim" : "Nama lengkap"}
                        className={`w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all ${isKapten ? 'opacity-70 cursor-not-allowed' : ''}`}
                      />
                      {errors[`players.${idx}.name`] && <p className="text-sm text-status-warning mt-1"><AlertCircle size={14} className="inline mr-1"/>{errors[`players.${idx}.name`]}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white/90">Nickname / IGN {requiredMark}</label>
                      <input
                        type="text"
                        value={player.nickname || ''}
                        onChange={(e) => updatePlayer(idx, 'nickname', e.target.value)}
                        placeholder="In-Game Name"
                        className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all"
                      />
                      {errors[`players.${idx}.nickname`] && <p className="text-sm text-status-warning mt-1"><AlertCircle size={14} className="inline mr-1"/>{errors[`players.${idx}.nickname`]}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-white/90">ID Game {requiredMark}</label>
                      <input
                        type="text"
                        value={player.idGame || ''}
                        onChange={(e) => updatePlayer(idx, 'idGame', e.target.value)}
                        placeholder="Contoh: 12345678 (1234)"
                        className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all"
                      />
                      {errors[`players.${idx}.idGame`] && <p className="text-sm text-status-warning mt-1"><AlertCircle size={14} className="inline mr-1"/>{errors[`players.${idx}.idGame`]}</p>}
                    </div>

                    <div className="w-full space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-white/90">KTM / KTP / KTS <span className="text-xs text-white/50 font-normal">(Opsional)</span></label>
                      <div className="flex flex-col gap-2">
                        <label className={`relative flex items-center justify-center px-4 py-3 border border-white/20 border-dashed rounded-xl cursor-pointer transition-colors ${player.studentCardUrl ? 'bg-brand-primary/10 border-brand-primary/50' : 'bg-white/5 hover:bg-white/10'}`}>
                          <input type="file" className="hidden" accept="image/*,application/pdf" onChange={(e) => handleFileUpload(idx, 'studentCardUrl', e)} disabled={uploadingState?.idx === idx && uploadingState?.field === 'studentCardUrl'} />
                          {uploadingState?.idx === idx && uploadingState?.field === 'studentCardUrl' ? (
                            <div className="flex items-center gap-2 text-brand-accent">
                              <div className="w-4 h-4 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
                              <span className="text-sm">Mengunggah...</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-white/80">
                              <UploadCloud size={18} />
                              <span className="text-sm">{player.studentCardUrl ? 'Ganti Dokumen' : 'Unggah Dokumen'}</span>
                            </div>
                          )}
                        </label>
                        {player.studentCardUrl && (
                          <a href={player.studentCardUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-sm text-brand-primary hover:underline bg-white/5 py-2 rounded-lg">
                            <FileImage size={16} /> Lihat Dokumen
                          </a>
                        )}
                      </div>
                    </div>

                  </div>
                </GlassCard>
              );
            })}
          </div>
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
