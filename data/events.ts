export type EventCategory = 'Seminar' | 'Sport' | 'E-Sport' | 'Competition' | 'Bazaar';
export type EventStatus = 'Open' | 'Closed' | 'Coming Soon';

export interface EventData {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description?: string;
  category: EventCategory;
  icon: string;
  status: EventStatus;
  date?: string;
  time?: string;
  location?: string;
  price?: string;
  requirements?: string[];
}

export const OFFICIAL_EVENTS: EventData[] = [
  {
    id: "evt-01",
    slug: "seminar-nasional",
    title: "Seminar Nasional",
    category: "Seminar",
    status: "Open",
    shortDescription: "Sinergi Inovasi: Menyatukan Teknologi, Merangkul Keberagaman.",
    description: "Seminar Nasional SI FEST 2026 menghadirkan pakar teknologi terkemuka untuk membahas tren terkini dalam dunia Sistem Informasi dan bagaimana teknologi dapat menyatukan berbagai elemen masyarakat untuk mencapai masa depan yang inklusif.",
    icon: "GraduationCap",
    date: "26 Oktober 2026",
    time: "08:00 - 12:00 WIB",
    location: "UPI Convention Center, Padang",
  },
  {
    id: "evt-02",
    slug: "turnamen-futsal",
    title: "Turnamen Futsal",
    category: "Sport",
    status: "Open",
    shortDescription: "Ajang kompetisi olahraga futsal bergengsi antar mahasiswa dan pelajar.",
    description: "Tunjukkan bakat dan sportivitas tim Anda dalam Turnamen Futsal SI FEST 2026. Kompetisi ini terbuka untuk seluruh kalangan mahasiswa dan pelajar tingkat atas di Sumatera Barat.",
    icon: "Trophy",
    date: "27 - 28 Oktober 2026",
    location: "Sport Center UPI YPTK Padang",
  },
  {
    id: "evt-03",
    slug: "turnamen-esport-mlbb",
    title: "Turnamen E-Sport MLBB",
    category: "E-Sport",
    status: "Open",
    shortDescription: "Tunjukkan skill dan strategi tim terbaikmu di arena Land of Dawn.",
    description: "Bersiaplah untuk pertempuran epik! Turnamen Mobile Legends: Bang Bang SI FEST 2026 mencari tim esports terbaik. Buktikan sinergi dan inovasi strategimu di Land of Dawn.",
    icon: "Gamepad2",
    date: "29 Oktober 2026",
  },
  {
    id: "evt-04",
    slug: "lomba-keagamaan",
    title: "Lomba Keagamaan / MTQ",
    category: "Competition",
    status: "Open",
    shortDescription: "Meningkatkan nilai spiritualitas generasi muda melalui syiar Islam.",
    description: "Mengembangkan potensi dan bakat mahasiswa dalam bidang keagamaan. Lomba MTQ ini diharapkan dapat mencetak generasi yang tidak hanya unggul dalam IPTEK, tetapi juga IMTAQ.",
    icon: "BookOpen",
    date: "27 Oktober 2026",
    location: "Masjid Raya UPI YPTK",
  },
  {
    id: "evt-05",
    slug: "open-bazaar",
    title: "Open Bazaar / UMKM & F&B",
    category: "Bazaar",
    status: "Open",
    shortDescription: "Eksplorasi ragam kuliner dan produk kreatif dari UMKM lokal.",
    description: "Dukung perekonomian lokal dan temukan berbagai inovasi kuliner serta produk kreatif di Open Bazaar SI FEST 2026. Area ini akan menjadi pusat berkumpulnya pengunjung selama festival berlangsung.",
    icon: "Store",
    date: "26 - 30 Oktober 2026",
    location: "Plaza UPI YPTK Padang",
  },
];
