"use client";

import { DIVISIONS as STATIC_DIVISIONS, STEERING_COMMITTEE, ORGANIZING_COMMITTEE_CORE, CommitteeMember } from "@/data/committee";
import { GlassCard } from "@/components/ui/GlassCard";
import { UserCircle2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

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
            <Image src={member.image} alt={member.name} fill sizes="96px" className="object-cover" />
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
  const [activeTab, setActiveTab] = useState(STATIC_DIVISIONS[0].id);
  
  // Data States
  const [scMembers, setScMembers] = useState<CommitteeMember[]>([]);
  const [ocMembers, setOcMembers] = useState<CommitteeMember[]>([]);
  const [divisionsData, setDivisionsData] = useState(STATIC_DIVISIONS);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const fetchDatabaseMembers = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('committee_members')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          // Map database rows to CommitteeMember interface
          const formattedData = data.map((d: any) => ({
            id: d.id,
            name: d.name,
            nim: d.nim,
            role: d.role,
            image: d.image_url,
            division_id: d.division_id
          }));

          // Sort using static data as a reference to preserve the exact original custom order
          const scList = formattedData.filter((m: any) => m.division_id === 'sc');
          scList.sort((a, b) => {
            const indexA = STEERING_COMMITTEE.findIndex(s => s.name === a.name);
            const indexB = STEERING_COMMITTEE.findIndex(s => s.name === b.name);
            return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
          });
          setScMembers(scList);

          const ocList = formattedData.filter((m: any) => m.division_id === 'oc');
          ocList.sort((a, b) => {
            const indexA = ORGANIZING_COMMITTEE_CORE.findIndex(s => s.name === a.name);
            const indexB = ORGANIZING_COMMITTEE_CORE.findIndex(s => s.name === b.name);
            return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
          });
          setOcMembers(ocList);

          const newDivisions = STATIC_DIVISIONS.map(div => {
            const divMembers = formattedData.filter((m: any) => m.division_id === div.id);
            divMembers.sort((a, b) => {
              const indexA = div.members.findIndex(s => s.name === a.name);
              const indexB = div.members.findIndex(s => s.name === b.name);
              return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
            });
            return {
              ...div,
              members: divMembers
            };
          });
          setDivisionsData(newDivisions);
        }
      } catch (err) {
        console.error("Failed to fetch committee members:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDatabaseMembers();
  }, []);

  const activeDivision = divisionsData.find(d => d.id === activeTab) || divisionsData[0];

  if (isLoading) {
    return (
      <div className="mt-12 flex flex-col items-center justify-center py-20 text-brand-accent">
        <div className="w-12 h-12 border-4 border-white/10 border-t-brand-accent rounded-full animate-spin mb-4" />
        <p className="font-medium animate-pulse">Mensinkronisasi Data dengan Database...</p>
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-20">
      
      {/* Steering Committee Section */}
      {scMembers.length > 0 && (
        <div className="animate-fade-in-up">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-heading font-bold text-white mb-2">Steering Committee</h3>
            <p className="text-brand-accent font-medium">Badan Pengarah & Penasihat</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scMembers.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} variant="gold" />
            ))}
          </div>
        </div>
      )}

      {/* Organizing Committee Core Section */}
      {ocMembers.length > 0 && (
        <div className="animate-fade-in-up">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-heading font-bold text-white mb-2">Organizing Committee</h3>
            <p className="text-blue-400 font-medium">Pengurus Inti Pelaksana</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {ocMembers.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} variant="blue" />
            ))}
          </div>
        </div>
      )}

      {/* Divisions & Events Tabs */}
      <div className="animate-fade-in-up">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-heading font-bold text-white mb-2">Divisi & Event</h3>
          <p className="text-white/60 font-medium max-w-2xl mx-auto">Motor penggerak operasional SI FEST 2026</p>
        </div>
        
        <GlassCard variant="medium" className="p-4 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Tabs Navigation */}
            <div className="lg:w-1/4 shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
              {divisionsData.map((div) => (
                <button
                  key={div.id}
                  onClick={() => setActiveTab(div.id)}
                  className={`text-left px-5 py-3 rounded-xl transition-all duration-300 font-medium whitespace-nowrap lg:whitespace-normal flex justify-between items-center
                    ${activeTab === div.id 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                      : 'text-white/50 hover:bg-white/5 hover:text-white'}
                  `}
                >
                  <span>{div.name}</span>
                  {div.members.length > 0 && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === div.id ? 'bg-blue-500/20' : 'bg-white/10'}`}>
                      {div.members.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="lg:w-3/4 min-h-[300px]">
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <h4 className="text-2xl font-bold text-white font-heading">{activeDivision.name}</h4>
                <span className="text-sm text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">{activeDivision.members.length} Personel</span>
              </div>
              
              {activeDivision.members.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {activeDivision.members.map((member, i) => (
                    <MemberCard key={member.id} member={member} index={i} variant="blue" />
                  ))}
                </div>
              ) : (
                <div className="w-full h-48 flex items-center justify-center border border-dashed border-white/10 rounded-2xl">
                  <p className="text-white/40">Belum ada panitia di divisi ini.</p>
                </div>
              )}
            </div>
            
          </div>
        </GlassCard>
      </div>

    </div>
  );
}
