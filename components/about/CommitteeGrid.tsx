"use client";

import { STEERING_COMMITTEE, ORGANIZING_COMMITTEE_CORE, DIVISIONS, CommitteeMember } from "@/data/committee";
import { GlassCard } from "@/components/ui/GlassCard";
import { UserCircle2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const MemberCard = ({ member, index, variant = "blue" }: { member: CommitteeMember, index: number, variant?: "gold" | "blue" }) => {
  const isGold = variant === "gold";
  
  return (
    <GlassCard 
      variant="light" 
      className={`relative group overflow-hidden flex flex-col items-center text-center p-6 border-white/10 transition-all duration-500 hover:-translate-y-2 
        ${isGold ? 'hover:border-brand-accent/50 hover:shadow-[0_10px_30px_rgba(245,183,22,0.15)]' : 'hover:border-blue-500/50 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)]'}
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 
        ${isGold ? 'to-brand-accent/5' : 'to-blue-500/5'}
      `} />
      
      <div className={`relative w-24 h-24 mb-4 rounded-full p-1 bg-white/5 border transition-colors duration-500 
        ${isGold ? 'border-brand-accent/30 group-hover:border-brand-accent' : 'border-blue-500/30 group-hover:border-blue-500'}
      `}>
        <div className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 
          ${isGold ? 'bg-brand-accent/30' : 'bg-blue-500/30'}
        `} />
        <div className="w-full h-full bg-[#0a1128] rounded-full flex items-center justify-center overflow-hidden relative z-10">
          {member.image ? (
            <Image src={member.image} alt={member.name} width={96} height={96} className="w-full h-full object-cover" />
          ) : (
            <UserCircle2 size={48} className={`text-white/20 transition-colors duration-500 ${isGold ? 'group-hover:text-brand-accent' : 'group-hover:text-blue-500'}`} />
          )}
        </div>
      </div>
      
      <div className="relative z-10 w-full flex flex-col items-center flex-grow">
        <h4 className={`font-heading font-bold text-lg text-white mb-1 transition-colors duration-300 leading-tight ${isGold ? 'group-hover:text-brand-accent' : 'group-hover:text-blue-400'}`}>
          {member.name}
        </h4>
        {member.nim && (
          <p className="text-white/40 text-xs font-mono mb-3">{member.nim}</p>
        )}
        <div className="mt-auto">
          <p className={`text-xs font-medium py-1 px-3 rounded-full inline-block
            ${isGold ? 'bg-brand-accent/10 text-brand-accent/90' : 'bg-blue-500/10 text-blue-400'}
          `}>
            {member.role}
          </p>
        </div>
      </div>
    </GlassCard>
  );
};

export function CommitteeGrid() {
  const [activeTab, setActiveTab] = useState(DIVISIONS[0].id);
  const activeDivision = DIVISIONS.find(d => d.id === activeTab) || DIVISIONS[0];

  return (
    <div className="mt-12 space-y-20">
      
      {/* Steering Committee Section */}
      <div>
        <div className="text-center mb-10">
          <h3 className="text-3xl font-heading font-bold text-white mb-2">Steering Committee</h3>
          <p className="text-brand-accent font-medium">Badan Pengarah & Penasihat</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEERING_COMMITTEE.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i} variant="gold" />
          ))}
        </div>
      </div>

      {/* Organizing Committee Core Section */}
      <div>
        <div className="text-center mb-10">
          <h3 className="text-3xl font-heading font-bold text-white mb-2">Organizing Committee</h3>
          <p className="text-blue-400 font-medium">Pengurus Inti Pelaksana</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {ORGANIZING_COMMITTEE_CORE.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i} variant="blue" />
          ))}
        </div>
      </div>

      {/* Divisions & Events Tabs */}
      <div>
        <div className="text-center mb-10">
          <h3 className="text-3xl font-heading font-bold text-white mb-2">Divisi & Event</h3>
          <p className="text-white/60 font-medium max-w-2xl mx-auto">Motor penggerak operasional SI FEST 2026</p>
        </div>
        
        <GlassCard variant="medium" className="p-4 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Tabs Navigation */}
            <div className="lg:w-1/4 shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
              {DIVISIONS.map((div) => (
                <button
                  key={div.id}
                  onClick={() => setActiveTab(div.id)}
                  className={`text-left px-5 py-3 rounded-xl transition-all duration-300 font-medium whitespace-nowrap lg:whitespace-normal
                    ${activeTab === div.id 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                      : 'text-white/50 hover:bg-white/5 hover:text-white'}
                  `}
                >
                  {div.name}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="lg:w-3/4">
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <h4 className="text-2xl font-bold text-white font-heading">{activeDivision.name}</h4>
                <span className="text-sm text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">{activeDivision.members.length} Personel</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {activeDivision.members.map((member, i) => (
                  <MemberCard key={member.id} member={member} index={i} variant="blue" />
                ))}
              </div>
            </div>
            
          </div>
        </GlassCard>
      </div>

    </div>
  );
}
