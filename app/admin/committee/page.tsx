"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Plus, Search, MoreVertical, Edit2, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { STEERING_COMMITTEE, ORGANIZING_COMMITTEE_CORE } from "@/data/committee";
import { CommitteeModal } from "@/components/admin/CommitteeModal";
import Image from "next/image";

export default function CommitteeCMSPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  // Combine SC and OC just for table demonstration purposes
  const allMembers = [...STEERING_COMMITTEE, ...ORGANIZING_COMMITTEE_CORE];
  
  const filteredMembers = allMembers.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (member: any) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedMember(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Manajemen Panitia</h1>
          <p className="text-white/50 mt-1">Kelola data dan struktur kepanitiaan SI FEST 2026</p>
        </div>
        <button 
          onClick={handleAdd}
          className="px-5 py-2.5 bg-brand-accent text-brand-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(245,183,22,0.2)]"
        >
          <Plus size={20} /> Tambah Panitia
        </button>
      </div>

      <GlassCard variant="medium" className="border-white/10 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cari nama atau jabatan..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-accent/50 transition-colors"
            />
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="text-sm text-white/50">Filter Divisi:</span>
            <select className="bg-white/5 border border-white/10 rounded-lg text-white text-sm px-3 py-2 outline-none">
              <option value="all">Semua Divisi</option>
              <option value="sc">Steering Committee</option>
              <option value="oc">Organizing Committee</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-white/50 text-xs uppercase tracking-wider font-semibold">
                <th className="p-4 font-medium">Panitia</th>
                <th className="p-4 font-medium">Jabatan</th>
                <th className="p-4 font-medium">NIM</th>
                <th className="p-4 font-medium">Divisi</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMembers.map((member, index) => (
                <tr key={member.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0a1128] border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                        {member.image ? (
                          <Image src={member.image} alt={member.name} width={40} height={40} className="object-cover" />
                        ) : (
                          <span className="text-white/30 text-xs font-bold">{member.name.charAt(0)}</span>
                        )}
                      </div>
                      <span className="font-medium text-white group-hover:text-brand-accent transition-colors">
                        {member.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-white/5 rounded-md text-sm text-white/70">
                      {member.role}
                    </span>
                  </td>
                  <td className="p-4 text-white/50 font-mono text-sm">
                    {member.nim || "-"}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      index < 4 
                      ? "bg-brand-accent/10 text-brand-accent border-brand-accent/20" 
                      : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    }`}>
                      {index < 4 ? "Steering Committee" : "Organizing Committee"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(member)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMembers.length === 0 && (
          <div className="p-12 text-center text-white/40">
            <p>Tidak ada data panitia yang ditemukan.</p>
          </div>
        )}
      </GlassCard>

      {/* Modal Render */}
      <CommitteeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        member={selectedMember}
      />
    </div>
  );
}
