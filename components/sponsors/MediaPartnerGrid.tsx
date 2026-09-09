"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function MediaPartnerGrid() {
  const [partners, setPartners] = useState<any[]>([]);
  useEffect(() => {
    const fetchPartners = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('media_partners').select('*');
      if (data) {
        setPartners(data);
      }
    };
    fetchPartners();
  }, []);

  if (partners.length === 0) {
    return (
      <div className="flex justify-center opacity-60">
        <p className="text-white/40 font-medium">Media Partner belum tersedia</p>
      </div>
    );
  }

  // Duplicate items to make the infinite marquee smooth
  const marqueeItems = [...partners, ...partners, ...partners, ...partners];

  return (
    <div className="relative w-full overflow-hidden py-10 flex border-y border-white/5 bg-white/5 backdrop-blur-sm">
      <div className="flex w-max animate-marquee-reverse gap-12 md:gap-24 items-center">
        {marqueeItems.map((partner, i) => (
          <div key={`${partner.id}-${i}`} className="flex flex-col items-center justify-center shrink-0 w-32 md:w-48 h-24 md:h-32 transition-transform hover:scale-110">
            {partner.logo_url ? (
              <img src={partner.logo_url} alt={partner.name} className="max-w-full max-h-full object-contain drop-shadow-md" />
            ) : (
              <span className="text-white font-bold whitespace-nowrap text-xl">{partner.name}</span>
            )}
          </div>
        ))}
      </div>
      
    </div>
  );
}
