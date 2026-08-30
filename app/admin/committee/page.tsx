"use client";

import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { CommitteeModal } from "@/components/admin/CommitteeModal";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function CommitteeCMSPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterDivision, setFilterDivision] = useState("all");

  const supabase = createClient();

  const fetchMembers = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('committee_members')
      .select('*')
      .order('created_at', { ascending: true });
      
    if (error) {
      console.error("Error fetching members:", error);
    } else {
      setMembers(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDivision = filterDivision === "all" || m.division_id === filterDivision;
    return matchesSearch && matchesDivision;
  });

  const handleEdit = (member: any) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedMember(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus panitia ini?")) {
      try {
        // 1. Delete from DB
        await supabase.from('committee_members').delete().eq('id', id);
        
        // 2. Try deleting from storage if image exists
        if (imageUrl) {
          try {
            // Extract file path from URL (naive approach based on standard supabase public url format)
            const parts = imageUrl.split('/avatars/');
            if (parts.length > 1) {
               const filePath = parts[1].split('?')[0]; // remove query params if any
               await supabase.storage.from('avatars').remove([filePath]);
            }
          } catch(e) {
            console.error("Failed to delete image", e);
          }
        }
        
        fetchMembers();
      } catch (error) {
        alert("Gagal menghapus data");
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manajemen Panitia</h1>
          <p className="text-slate-500 mt-1">Kelola data dan struktur kepanitiaan SI FEST 2026</p>
        </div>
        <button 
          onClick={handleAdd}
          className="px-5 py-2.5 bg-brand-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/30"
        >
          <Plus size={20} /> Tambah Panitia
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cari nama atau jabatan..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
            />
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="text-sm text-slate-500">Filter Divisi:</span>
            <select 
              value={filterDivision}
              onChange={(e) => setFilterDivision(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg text-slate-700 text-sm px-3 py-2 outline-none focus:border-brand-primary"
            >
              <option value="all">Semua Divisi</option>
              <option value="sc">Steering Committee</option>
              <option value="oc">Organizing Committee (Inti)</option>
              <option value="kesekretariatan">Divisi Kesekretariatan</option>
              <option value="acara-inti">Divisi Acara Inti</option>
              <option value="humas">Divisi Humas</option>
              <option value="logistik">Divisi Logistik</option>
              <option value="medis">Divisi Medis</option>
              <option value="pubdok">Divisi Pubdok</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="p-4 font-medium">Panitia</th>
                <th className="p-4 font-medium">Jabatan</th>
                <th className="p-4 font-medium">NIM</th>
                <th className="p-4 font-medium">Divisi</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-8 h-8 border-2 border-slate-200 border-t-brand-primary rounded-full animate-spin mb-2" />
                      Memuat data dari database...
                    </div>
                  </td>
                </tr>
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-400">
                    Tidak ada data panitia yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center relative">
                          {member.image_url ? (
                            <Image src={member.image_url} alt={member.name} fill sizes="40px" className="object-cover" />
                          ) : (
                            <span className="text-slate-400 text-xs font-bold">{member.name.charAt(0)}</span>
                          )}
                        </div>
                        <span className="font-medium text-slate-900 group-hover:text-brand-primary transition-colors">
                          {member.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-slate-100 rounded-md text-sm text-slate-600">
                        {member.role}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 font-mono text-sm">
                      {member.nim || "-"}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium border bg-blue-50 text-blue-600 border-blue-200 uppercase tracking-wider">
                        {member.division_id}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(member)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 hover:text-slate-900 transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(member.id, member.image_url)} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-500 hover:text-red-600 transition-colors">
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

      {/* Modal Render */}
      <CommitteeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        member={selectedMember}
        onSuccess={fetchMembers}
      />
    </div>
  );
}
