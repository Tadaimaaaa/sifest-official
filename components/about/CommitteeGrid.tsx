import { CORE_COMMITTEE } from "@/data/committee";
import { GlassCard } from "@/components/ui/GlassCard";
import { UserCircle2 } from "lucide-react";
import Image from "next/image";

export function CommitteeGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-12">
      {CORE_COMMITTEE.map((member, i) => (
        <GlassCard 
          key={member.id} 
          variant="light" 
          className="relative group overflow-hidden flex flex-col items-center text-center p-6 border-white/10 hover:border-brand-accent/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(245,183,22,0.15)]"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Avatar Container */}
          <div className="relative w-24 h-24 mb-5 rounded-full p-1 bg-white/5 border border-white/20 group-hover:border-brand-accent/50 transition-colors duration-500">
            <div className="absolute inset-0 bg-brand-accent/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-full h-full bg-[#0a1128] rounded-full flex items-center justify-center overflow-hidden relative z-10">
              {member.image ? (
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  width={96} 
                  height={96} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircle2 size={48} className="text-white/20 group-hover:text-brand-accent transition-colors duration-500" />
              )}
            </div>
          </div>
          
          {/* Info */}
          <div className="relative z-10 w-full">
            <h4 className="font-heading font-bold text-lg text-white mb-1 group-hover:text-brand-accent transition-colors duration-300">
              {member.name}
            </h4>
            <p className="text-sm text-brand-accent/80 font-medium bg-brand-accent/10 py-1 px-3 rounded-full inline-block">
              {member.role}
            </p>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
