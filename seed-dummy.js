const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ihpgoxdgdhxnnpppasab.supabase.co';
const supabaseKey = 'sb_publishable_oqTxtR39oWOy8sgYSAgWdA_b4NPQ0Rb';
const supabase = createClient(supabaseUrl, supabaseKey);

async function seedData() {
  console.log("Fetching events...");
  const { data: events, error: eventError } = await supabase.from('events').select('*');
  
  if (eventError) {
    console.error("Error fetching events:", eventError);
    return;
  }

  // Common dummy players/teams
  const teamNames = [
    "Bapak Siapa", "Xabi Alonso", "Arteta", "Tukang Koding FC",
    "Nanti Kita Cerita", "Anak IT", "Sistem Informasi FC", "Cyber Sport",
    "Garuda FC", "Bintang Timur", "Rajawali", "Harimau Malaya",
    "Pendekar United", "Bimasakti", "Nusantara FC", "Pancasila Boys"
  ];
  
  for (const event of events) {
    const isFutsal = event.slug.includes('futsal');
    const limit = isFutsal ? 16 : 4;
    console.log(`Seeding ${limit} dummy teams for event: ${event.slug}...`);
    
    for (let i = 0; i < limit; i++) {
      const regCode = `DUM-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      
      const { data: reg, error: regError } = await supabase
        .from('registrations')
        .insert({
          event_id: event.id,
          registration_code: regCode,
          status: "PENDING"
        })
        .select()
        .single();
        
      if (regError) {
        console.error(`Error inserting registration for ${event.slug}:`, regError);
        continue;
      }
      
      const tName = isFutsal ? teamNames[i] : teamNames[i % teamNames.length];
      
      let metadata = {};
      if (event.slug === 'turnamen-esport-efootball') {
        metadata = {
          slotCount: i % 2 === 0 ? "1" : "2",
          teamName2: i % 2 === 0 ? "" : `${tName} B`,
          players: [
            { name: "John Doe", nickname: "JDog", idGame: "123456" }
          ]
        };
      } else if (event.slug.includes('futsal')) {
        metadata = {
          schoolData: {
            schoolName: tName,
            level: "SMA",
            address: "Jl. Dummy Raya",
            city: "Padang",
            coachName: "Coach " + tName,
            coachWhatsapp: "0812345678"
          },
          teamData: {
             coachName: "Coach " + tName,
             coachWhatsapp: "0812345678"
          },
          players: Array.from({length: 5}).map((_, j) => ({
            name: `Player ${j+1} ${tName}`,
            nisn: `1234${j}`,
            university: "Universitas Dummy",
            posisi: j === 0 ? "Kiper" : "Pemain",
            jerseyNumber: `${j+1}`
          }))
        };
      } else if (event.slug === 'turnamen-esport-mlbb') {
         metadata = {
           teamData: {
             teamName: tName,
             teamCategory: "E-Sport",
             captainName: "Kapten " + tName,
             captainWhatsapp: "0812345678"
           },
           players: Array.from({length: 5}).map((_, j) => ({
            name: `Player ML ${j+1}`,
            nickname: `ProPlayer${j}`,
            idGame: `8888${j}`
          }))
         };
      }

      const { error: partError } = await supabase
        .from('participants')
        .insert({
          registration_id: reg.id,
          full_name: "Manager " + tName,
          email: `dummy${i}@test.com`,
          whatsapp: `08120000000${i}`,
          institution: tName,
          metadata: metadata
        });
        
      if (partError) {
        console.error("Error inserting participant:", partError);
      }
    }
  }
  
  console.log("Seeding complete!");
}

seedData();
