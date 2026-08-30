"use client";

import { Plus, Search, Edit2, Trash2 } from "lucide-react";
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
          <h1 className="text-3xl font-heading font-bold text-slate-900">Manajemen Panitia</h1>
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
            <select className="bg-white border border-slate-200 rounded-lg text-slate-700 text-sm px-3 py-2 outline-none focus:border-brand-primary">
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
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="p-4 font-medium">Panitia</th>
                <th className="p-4 font-medium">Jabatan</th>
                <th className="p-4 font-medium">NIM</th>
                <th className="p-4 font-medium">Divisi</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.map((member, index) => (
                <tr key={member.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                        {member.image ? (
                          <Image src={member.image} alt={member.name} width={40} height={40} className="object-cover" />
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      index < 4 
                      ? "bg-amber-50 text-amber-600 border-amber-200" 
                      : "bg-blue-50 text-blue-600 border-blue-200"
                    }`}>
                      {index < 4 ? "Steering Committee" : "Organizing Committee"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(member)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 hover:text-slate-900 transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-500 hover:text-red-600 transition-colors">
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
          <div className="p-12 text-center text-slate-400">
            <p>Tidak ada data panitia yang ditemukan.</p>
          </div>
        )}
      </div>

      {/* Modal Render */}
      <CommitteeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        member={selectedMember}
      />
    </div>
  );
}
