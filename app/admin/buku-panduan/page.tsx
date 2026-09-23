"use client";

import { useState, useEffect } from "react";
import { getRegisterableEvents, EventData } from "@/lib/events";
import { createClient } from "@/lib/supabase/client";
import { BookOpen, Save, Check, Link as LinkIcon, AlertCircle } from "lucide-react";

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

  const saveUrl = async (eventId: string) => {
    setSaving(eventId);
    try {
      const url = urls[eventId] || "";
      
      if (!url) {
        // If empty, we can delete the record or just save empty string. 
        // Let's delete it so it falls back to 'Segera Hadir'
        await supabase.from("guidebooks").delete().eq("event_id", eventId);
      } else {
        // Upsert
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

      <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
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
                <div key={event.id} className="flex flex-col md:flex-row md:items-center gap-4 p-5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-colors">
                  <div className="md:w-1/3">
                    <h3 className="font-bold text-slate-900">{event.title}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{event.category}</p>
                  </div>
                  
                  <div className="flex-1 flex gap-3">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LinkIcon className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300"
                        value={urls[event.id] || ""}
                        onChange={(e) => handleUrlChange(event.id, e.target.value)}
                      />
                    </div>
                    <button
                      onClick={() => saveUrl(event.id)}
                      disabled={saving === event.id}
                      className={`shrink-0 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                        saved === event.id 
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                        : "bg-brand-primary text-white hover:bg-blue-700 shadow-md shadow-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/30"
                      } disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                      {saving === event.id ? (
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
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
