"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, Building2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { SponsorModal } from "@/components/admin/SponsorModal";

export default function SponsorsAdmin() {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<any | null>(null);

  const supabase = createClient();

  const fetchSponsors = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('sponsors')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Error fetching sponsors:", error);
    } else {
      setSponsors(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const filteredSponsors = sponsors.filter(s => {
    return s.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleEdit = (sponsor: any) => {
    setSelectedSponsor(sponsor);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedSponsor(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, logoUrl: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus mitra ini?")) {
      try {
        // Delete from database
        const { error: dbError } = await supabase
          .from('sponsors')
          .delete()
          .eq('id', id);
        
        if (dbError) throw dbError;

        // Note: we might want to delete the file from storage here as well,
        // but for simplicity and safety, we skip it or do it if we have the file path.
        
        fetchSponsors();
      } catch (err: any) {
        alert("Gagal menghapus data: " + err.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mitra & Sponsor</h1>
          <p className="text-slate-500 text-sm mt-1">Kelola data mitra, sponsor, dan media partner SI FEST 2026</p>
        </div>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-brand-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/20 w-full sm:w-auto justify-center"
        >
          <Plus size={18} />
          Tambah Mitra
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari nama mitra..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-sm"
          />
        </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Logo Mitra</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-8 h-8 border-4 border-slate-200 border-t-brand-primary rounded-full animate-spin mb-3" />
                      Memuat data...
                    </div>
                  </td>
                </tr>
              ) : filteredSponsors.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                    {searchQuery ? "Tidak ada mitra yang cocok dengan pencarian." : "Belum ada data mitra/sponsor."}
                  </td>
                </tr>
              ) : (
                filteredSponsors.map((sponsor) => (
                  <tr key={sponsor.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 p-2">
                          {sponsor.logo_url ? (
                            <img src={sponsor.logo_url} alt={sponsor.name} className="max-w-full max-h-full object-contain" />
                          ) : (
                            <Building2 className="text-slate-300" size={24} />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{sponsor.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(sponsor)}
                          className="p-2 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(sponsor.id, sponsor.logo_url)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SponsorModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sponsor={selectedSponsor}
        onSuccess={fetchSponsors}
      />
    </div>
  );
}
