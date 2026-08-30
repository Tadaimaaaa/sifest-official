"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function SponsorGrid() {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchSponsors = async () => {
      const { data } = await supabase.from('sponsors').select('*');
      if (data) {
        setSponsors(data);
      }
    };
    fetchSponsors();
  }, []);

  if (sponsors.length === 0) {
    return (
      <div className="flex justify-center opacity-60">
        <p className="text-white/40 font-medium">Mitra & Sponsor belum tersedia</p>
      </div>
    );
  }

  // Duplicate items to make the infinite marquee smooth
  const marqueeItems = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

  return (
    <div className="relative w-full overflow-hidden py-10 flex border-y border-white/5 bg-white/5 backdrop-blur-sm">
      <div className="flex w-max animate-marquee gap-12 md:gap-24 items-center">
        {marqueeItems.map((sponsor, i) => (
          <div key={`${sponsor.id}-${i}`} className="flex flex-col items-center justify-center shrink-0 w-32 md:w-48 h-24 md:h-32 transition-transform hover:scale-110">
            {sponsor.logo_url ? (
              <img src={sponsor.logo_url} alt={sponsor.name} className="max-w-full max-h-full object-contain drop-shadow-md" />
            ) : (
              <span className="text-white font-bold whitespace-nowrap text-xl">{sponsor.name}</span>
            )}
          </div>
        ))}
      </div>
      
    </div>
  );
}
