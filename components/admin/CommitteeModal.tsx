"use client";

import { X, UploadCloud, Image as ImageIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export interface CommitteeModalProps {
  isOpen: boolean;
  onClose: () => void;
  member?: any; // For edit mode
  onSuccess?: () => void;
}

export function CommitteeModal({ isOpen, onClose, member, onSuccess }: CommitteeModalProps) {
  const router = useRouter();
  const supabase = createClient();
  
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [role, setRole] = useState("");
  const [division, setDivision] = useState("oc");

  // Reset form when opened
  useEffect(() => {
    if (isOpen) {
      if (member) {
        setName(member.name || "");
        setNim(member.nim || "");
        setRole(member.role || "");
        setDivision(member.division_id || "oc");
        setPreviewUrl(member.image_url || null);
      } else {
        setName("");
        setNim("");
        setRole("");
        setDivision("oc");
        setPreviewUrl(null);
      }
      setFileToUpload(null);
      setIsUploading(false);
      setIsSaving(false);
    }
  }, [isOpen, member]);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert("Harap unggah file gambar (JPG/PNG)");
      return;
    }
    setFileToUpload(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!name || !role) {
      alert("Nama dan Jabatan wajib diisi!");
      return;
    }

    setIsSaving(true);
    let finalImageUrl = member?.image_url || null;

    try {
      // 1. Upload image if a new one is selected
      if (fileToUpload) {
        setIsUploading(true);
        const fileExt = fileToUpload.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${division}/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, fileToUpload);

        if (uploadError) {
          throw new Error(`Upload gagal: ${uploadError.message}`);
        }

        const { data: publicUrlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        finalImageUrl = publicUrlData.publicUrl;
        setIsUploading(false);
      }

      // 2. Save data to database
      const payload = {
        name,
        nim: nim || null,
        role,
        division_id: division,
        image_url: finalImageUrl
      };

      if (member?.id) {
        // Update
        const { error } = await supabase
          .from('committee_members')
          .update(payload)
          .eq('id', member.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from('committee_members')
          .insert([payload]);
        if (error) throw error;
      }

      // Success
      if (onSuccess) onSuccess();
      onClose();
      router.refresh();
      
    } catch (error: any) {
      alert(error.message || "Terjadi kesalahan saat menyimpan data");
      setIsUploading(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
          <h2 className="text-2xl font-bold text-slate-900">
            {member ? "Edit Data Panitia" : "Tambah Panitia Baru"}
          </h2>
          <button onClick={onClose} className="p-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Col: Upload Foto */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Foto Profil</label>
              
              <div 
                className={`relative w-full aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all duration-300 cursor-pointer
                  ${isDragging ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-300 bg-slate-50 hover:border-brand-primary/50 hover:bg-slate-100'}
                  ${previewUrl ? 'border-none' : ''}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />

                {isUploading ? (
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-10 h-10 border-4 border-slate-200 border-t-brand-primary rounded-full animate-spin" />
                    <p className="text-sm text-brand-primary font-medium">Mengunggah...</p>
                  </div>
                ) : previewUrl ? (
                  <div className="group relative w-full h-full">
                    <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white font-medium flex items-center gap-2">
                        <ImageIcon size={18} /> Ganti Foto
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                      <UploadCloud size={28} />
                    </div>
                    <div>
                      <p className="text-slate-700 font-medium mb-1">Pilih atau Seret Foto</p>
                      <p className="text-xs text-slate-400">Maks. ukuran 2MB (JPG/PNG)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Data Input */}
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all"
                  placeholder="Cth: Neil Firdaus"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">NIM (Opsional)</label>
                <input 
                  type="text" 
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all"
                  placeholder="Cth: 24101152610176"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Divisi / Bagian</label>
                <select 
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 appearance-none focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all"
                >
                  <option value="sc">Steering Committee</option>
                  <option value="oc">Organizing Committee (Inti)</option>
                  <option value="kesekretariatan">Divisi Kesekretariatan</option>
                  <option value="acara-inti">Divisi Acara Inti</option>
                  <option value="humas">Divisi Humas</option>
                  <option value="logistik">Divisi Logistik</option>
                  <option value="medis">Divisi Medis</option>
                  <option value="pubdok">Divisi Pubdok</option>
                  <option value="mtq">Event MTQ</option>
                  <option value="bazar">Event Bazar Kreatif</option>
                  <option value="futsal">Event Futsal</option>
                  <option value="seminar">Event Seminar</option>
                  <option value="esport">Event Esport</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Jabatan</label>
                <input 
                  type="text" 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all"
                  placeholder="Cth: Koordinator"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
          <button onClick={onClose} disabled={isSaving} className="px-6 py-3 rounded-xl font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors disabled:opacity-50">
            Batal
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 rounded-xl font-bold bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/30 flex items-center justify-center min-w-[140px] disabled:opacity-70"
          >
            {isSaving ? (
               <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
               "Simpan Data"
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
