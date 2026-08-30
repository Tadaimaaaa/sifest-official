"use client";

import { X, UploadCloud, Image as ImageIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
  sponsor?: any; // For edit mode
  onSuccess?: () => void;
}

export function SponsorModal({ isOpen, onClose, sponsor, onSuccess }: SponsorModalProps) {
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

  // Reset form when opened
  useEffect(() => {
    if (isOpen) {
      if (sponsor) {
        setName(sponsor.name || "");
        setPreviewUrl(sponsor.logo_url || null);
      } else {
        setName("");
        setPreviewUrl(null);
      }
      setFileToUpload(null);
      setIsUploading(false);
      setIsSaving(false);
    }
  }, [isOpen, sponsor]);

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
    if (!name) {
      alert("Nama Mitra/Sponsor wajib diisi!");
      return;
    }

    setIsSaving(true);
    let finalImageUrl = sponsor?.logo_url || null;

    try {
      // 1. Upload image if a new one is selected
      if (fileToUpload) {
        setIsUploading(true);
        const fileExt = fileToUpload.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('sponsors')
          .upload(filePath, fileToUpload);

        if (uploadError) {
          throw new Error(`Upload gagal: ${uploadError.message}`);
        }

        const { data: publicUrlData } = supabase.storage
          .from('sponsors')
          .getPublicUrl(filePath);

        finalImageUrl = publicUrlData.publicUrl;
        setIsUploading(false);
      }

      // 2. Save data to database
      const payload = {
        name,
        tier: "Sponsor", // Default fallback since DB requires it
        logo_url: finalImageUrl
      };

      if (sponsor?.id) {
        // Update
        const { error } = await supabase
          .from('sponsors')
          .update(payload)
          .eq('id', sponsor.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from('sponsors')
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
      
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
          <h2 className="text-xl font-semibold text-slate-900">
            {sponsor ? "Edit Mitra & Sponsor" : "Tambah Sponsor Baru"}
          </h2>
          <button onClick={onClose} className="p-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <div className="space-y-6">
            
            {/* Upload Logo */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Logo Perusahaan / Mitra</label>
              
              <div 
                className={`relative w-full h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all duration-300 cursor-pointer
                  ${isDragging ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-300 bg-slate-50 hover:border-brand-primary/50 hover:bg-slate-100'}
                  ${previewUrl ? 'border-none bg-white p-4' : ''}
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
                  <div className="group relative w-full h-full flex items-center justify-center">
                    <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain drop-shadow-sm" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                      <p className="text-white font-medium flex items-center gap-2">
                        <ImageIcon size={18} /> Ganti Logo
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                      <UploadCloud size={24} />
                    </div>
                    <div>
                      <p className="text-slate-700 font-medium mb-1">Pilih atau Seret Logo</p>
                      <p className="text-xs text-slate-400">Pastikan logo berformat PNG transparan (Maks. 2MB)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Data Input */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Nama Mitra</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all"
                  placeholder="Cth: PT Telekomunikasi"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
          <button onClick={onClose} disabled={isSaving} className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors disabled:opacity-50">
            Batal
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl font-semibold bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/30 flex items-center justify-center min-w-[120px] disabled:opacity-70"
          >
            {isSaving ? (
               <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
               "Simpan"
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
