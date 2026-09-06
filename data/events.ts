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
  registrationFlow?: string[];
  timeline?: { title: string; date: string }[];
  benefits?: string[];
  contacts?: { name: string; phone: string }[];
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
    price: "Rp 50.000",
    requirements: [
      "Terbuka untuk Mahasiswa dan Pelajar Umum",
      "Wajib membawa E-Ticket (QR Code) saat registrasi ulang",
      "Mengenakan pakaian bebas, rapi, dan sopan (bersepatu)",
      "Mendapatkan e-certificate dan snack box"
    ],
    registrationFlow: [
      "Peserta membuat akun dan login di website resmi SI FEST.",
      "Mengisi formulir pendaftaran pada halaman event Seminar.",
      "Menyelesaikan pembayaran tiket melalui sistem terintegrasi (Duitku) atau manual.",
      "Mendapatkan E-Ticket (QR Code) di dashboard akun.",
      "Bergabung ke Grup WhatsApp peserta melalui tautan yang disediakan."
    ],
    timeline: [
      { title: "Pendaftaran Gelombang 1", date: "1 - 30 Agustus 2026" },
      { title: "Pendaftaran Gelombang 2", date: "1 - 30 September 2026" },
      { title: "Open Gate & Registrasi", date: "26 Oktober 2026 (07:00 WIB)" },
      { title: "Pelaksanaan Seminar", date: "26 Oktober 2026 (08:00 WIB)" }
    ],
    benefits: [
      "E-Certificate Tingkat Nasional",
      "Seminar Kit & Snack Box",
      "Doorprize Menarik",
      "Relasi & Ilmu Bermanfaat"
    ],
    contacts: [
      { name: "Budi (Pendaftaran)", phone: "081234567890" },
      { name: "Ani (Informasi Acara)", phone: "082198765432" }
    ]
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
    price: "Rp 250.000 / Tim",
    requirements: [
      "Satu tim terdiri dari maksimal 12 pemain dan 2 official",
      "Pemain wajib melampirkan Kartu Tanda Mahasiswa (KTM) atau Kartu Pelajar yang aktif",
      "Setiap tim wajib mengikuti Technical Meeting sebelum pertandingan",
      "Melunasi biaya pendaftaran sebelum tenggat waktu"
    ],
    registrationFlow: [
      "Perwakilan tim (Ketua/Manajer) mendaftar akun di website SI FEST.",
      "Mendaftarkan anggota tim dan mengunggah dokumen persyaratan (KTM/Kartu Pelajar).",
      "Melakukan pembayaran biaya pendaftaran tim.",
      "Panitia memverifikasi dokumen dan pembayaran.",
      "Tim yang lolos verifikasi akan diundang ke grup WhatsApp resmi."
    ],
    timeline: [
      { title: "Pendaftaran", date: "1 Agustus - 10 Oktober 2026" },
      { title: "Technical Meeting", date: "14 Oktober 2026" },
      { title: "Babak Penyisihan", date: "27 Oktober 2026" },
      { title: "Semifinal & Final", date: "28 Oktober 2026" }
    ],
    benefits: [
      "Juara 1: Uang Tunai + Trofi + Sertifikat",
      "Juara 2: Uang Tunai + Trofi + Sertifikat",
      "Juara 3: Uang Tunai + Trofi + Sertifikat",
      "Top Scorer: Plakat + Sertifikat"
    ],
    contacts: [
      { name: "Doni (Pertandingan)", phone: "085211223344" },
      { name: "Siti (Registrasi)", phone: "081399887766" }
    ]
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
    price: "Rp 100.000 / Tim",
    requirements: [
      "Satu tim terdiri dari 5 pemain inti dan maksimal 1 pemain cadangan",
      "Akun Mobile Legends minimal level 20 dan memiliki setidaknya 15 hero",
      "Wajib menggunakan device dan koneksi internet masing-masing peserta",
      "Dilarang keras menggunakan program ilegal, cheat, atau eksploitasi bug"
    ],
    registrationFlow: [
      "Ketua tim membuat akun dan mendaftarkan skuad di website SI FEST.",
      "Mengisi ID Server dan Nickname masing-masing pemain dengan benar.",
      "Membayar biaya registrasi secara online.",
      "Masuk ke grup WhatsApp peserta melalui tautan yang dikirimkan.",
      "Menunggu jadwal drawing dan bracket dari panitia."
    ],
    timeline: [
      { title: "Pendaftaran", date: "1 Agustus - 15 Oktober 2026" },
      { title: "Technical Meeting & Drawing", date: "20 Oktober 2026" },
      { title: "Babak Kualifikasi (Online)", date: "22 - 24 Oktober 2026" },
      { title: "Grand Final (Offline)", date: "29 Oktober 2026" }
    ],
    benefits: [
      "Prize Pool: Rp 5.000.000,-",
      "Juara 1: Uang Tunai + E-Certificate",
      "Juara 2 & 3: Uang Tunai + E-Certificate",
      "MVP Player: In-game Diamonds"
    ],
    contacts: [
      { name: "Raka (Turnamen)", phone: "089512345678" },
      { name: "Dinda (Admin)", phone: "087711223344" }
    ]
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
    price: "Gratis",
    requirements: [
      "Terbuka untuk seluruh mahasiswa aktif UPI YPTK Padang",
      "Peserta wajib mengenakan pakaian muslim/muslimah yang rapi dan sopan",
      "Membawa perlengkapan ibadah dan Al-Qur'an masing-masing",
      "Hadir 30 menit sebelum perlombaan dimulai"
    ],
    registrationFlow: [
      "Peserta mendaftar melalui form pendaftaran di website SI FEST.",
      "Mengunggah bukti mahasiswa aktif (KTM atau KRS terbaru).",
      "Konfirmasi pendaftaran selesai secara gratis (tanpa biaya).",
      "Peserta bergabung ke grup WhatsApp khusus lomba MTQ.",
      "Mengambil nomor urut tampil saat hari H perlombaan."
    ],
    timeline: [
      { title: "Pendaftaran", date: "1 September - 20 Oktober 2026" },
      { title: "Technical Meeting", date: "23 Oktober 2026" },
      { title: "Pelaksanaan Lomba", date: "27 Oktober 2026" },
      { title: "Pengumuman Juara", date: "27 Oktober 2026 (Sore)" }
    ],
    benefits: [
      "Juara 1: Tabanas + Sertifikat + Trofi",
      "Juara 2: Tabanas + Sertifikat + Trofi",
      "Juara 3: Tabanas + Sertifikat + Trofi",
      "Seluruh peserta mendapatkan E-Certificate"
    ],
    contacts: [
      { name: "Fatih (Koordinator)", phone: "082233445566" },
      { name: "Aisyah (Informasi)", phone: "085299887766" }
    ]
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
    price: "Gratis",
    requirements: [
      "Pendaftaran tenant terbuka untuk mahasiswa dan pelaku UMKM umum",
      "Setiap tenant wajib menjaga kebersihan area masing-masing",
      "Dilarang menjual produk yang melanggar norma, hukum, atau berbahaya",
      "Mematuhi seluruh tata tertib yang ditetapkan oleh panitia SI FEST"
    ],
    registrationFlow: [
      "Calon tenant mengisi formulir pengajuan di website SI FEST.",
      "Melampirkan katalog produk atau menu yang akan dijual.",
      "Panitia melakukan kurasi dan seleksi tenant.",
      "Tenant yang lolos membayar biaya sewa stand.",
      "Mengikuti pengarahan (briefing) loading barang sebelum acara."
    ],
    timeline: [
      { title: "Pendaftaran & Kurasi", date: "1 - 15 Oktober 2026" },
      { title: "Pengumuman Lolos", date: "17 Oktober 2026" },
      { title: "Technical Meeting Tenant", date: "20 Oktober 2026" },
      { title: "Pelaksanaan Bazaar", date: "26 - 30 Oktober 2026" }
    ],
    benefits: [
      "Fasilitas Stand (Meja & Kursi)",
      "Akses Listrik & Kebersihan Area",
      "Promosi di Media Sosial SI FEST",
      "Sertifikat Partisipasi Tenant"
    ],
    contacts: [
      { name: "Rina (Tenant Relation)", phone: "081244556677" },
      { name: "Kevin (Operasional)", phone: "085233445566" }
    ]
  },
];
