"use client";

import { useState, useEffect } from "react";
import { getRegisterableEvents, EventData } from "@/lib/events";
import { createClient } from "@/lib/supabase/client";
import { BookOpen, Save, Check, Link as LinkIcon, AlertCircle, Upload } from "lucide-react";

export default function AdminBukuPanduan() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  
  // State to hold the current URLs for each event ID
  const [urls, setUrls] = useState<Record<string, string>>({});
  
  const supabase = createClient();

  useEffect(() => {
    fetchGuidebooks();
  }, []);

  const fetchGuidebooks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("guidebooks").select("*");
      
      if (error) throw error;
      
      const newUrls: Record<string, string> = {};
      if (data) {
        data.forEach(item => {
          newUrls[item.event_id] = item.url;
        });
      }
      setUrls(newUrls);
    } catch (error) {
      console.error("Error fetching guidebooks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlChange = (eventId: string, url: string) => {
    setUrls(prev => ({ ...prev, [eventId]: url }));
  };

  const handleFileUpload = async (eventId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSaving(eventId); // Using 'saving' state for loading indicator
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `guidebook_${eventId}_${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('registration_files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('registration_files')
        .getPublicUrl(fileName);

      const uploadedUrl = publicUrlData.publicUrl;
      handleUrlChange(eventId, uploadedUrl);
      
      // Auto save after upload is complete to make it seamless
      await saveUrlToDb(eventId, uploadedUrl);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Gagal mengunggah file. Pastikan ukuran file tidak terlalu besar.");
      setSaving(null);
    }
  };

  const saveUrlToDb = async (eventId: string, url: string) => {
    try {
      if (!url) {
        await supabase.from("guidebooks").delete().eq("event_id", eventId);
      } else {
        await supabase.from("guidebooks").upsert({
          event_id: eventId,
          url: url,
          updated_at: new Date().toISOString()
        }, { onConflict: "event_id" });
      }
      setSaved(eventId);
      setTimeout(() => setSaved(null), 2000);
    } catch (error) {
      console.error("Error saving guidebook:", error);
      alert("Gagal menyimpan tautan.");
    } finally {
      setSaving(null);
    }
  };

  const saveUrl = async (eventId: string) => {
    setSaving(eventId);
    await saveUrlToDb(eventId, urls[eventId] || "");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
            <BookOpen size={12} />
            Pengaturan
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Buku Panduan</h1>
          <p className="text-slate-500 mt-2 text-lg">Kelola tautan (Link Google Drive/PDF) buku panduan untuk setiap acara.</p>
        </div>
      </div>

      <div className="bg-white backdrop-blur-xl rounded-3xl border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 p-4 bg-amber-50 text-amber-800 rounded-2xl border border-amber-200 mb-8">
            <AlertCircle className="shrink-0" />
            <p className="text-sm font-medium">Kosongkan kolom input dan klik Simpan jika panduan belum siap (akan otomatis menampilkan "Segera Hadir" di halaman publik).</p>
          </div>

          {loading ? (
            <div className="flex justify-center p-12">
              <div className="w-8 h-8 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {getRegisterableEvents().map(event => (
                <div key={event.id} className="flex flex-col md:flex-row md:items-center gap-4 p-5 bg-slate-100 rounded-2xl border border-slate-200/5 hover:border-blue-100 hover:bg-blue-50/30 transition-colors">
                  <div className="md:w-1/3">
                    <h3 className="font-bold text-slate-900">{event.title}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{event.category}</p>
                  </div>
                  
                  <div className="flex-1 flex gap-3">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LinkIcon className="h-4 w-4 text-slate-500" />
                      </div>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/..."
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                        value={urls[event.id] || ""}
                        onChange={(e) => handleUrlChange(event.id, e.target.value)}
                      />
                    </div>
                    
                    <label className={`cursor-pointer shrink-0 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-500 font-medium text-sm flex items-center gap-2 hover:bg-slate-50 transition-colors ${saving === event.id ? "opacity-50 pointer-events-none" : ""}`}>
                      <Upload size={16} />
                      <span className="hidden md:inline">Upload</span>
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        className="hidden" 
                        onChange={(e) => handleFileUpload(event.id, e)} 
                        disabled={saving === event.id}
                      />
                    </label>

                    <button
                      onClick={() => saveUrl(event.id)}
                      disabled={saving === event.id}
                      className={`shrink-0 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                        saved === event.id 
                        ? "bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/20" 
                        : "bg-brand-primary-white hover:bg-blue-700 shadow-md shadow-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/30"
                      } disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                      {saving === event.id ? (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-200/30 border-t-white animate-spin"></div>
                      ) : saved === event.id ? (
                        <>
                          <Check size={16} /> Tersimpan
                        </>
                      ) : (
                        <>
                          <Save size={16} /> Simpan
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
