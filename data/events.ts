export type EventCategory = 'Seminar' | 'Sport' | 'E-Sport' | 'Competition' | 'Bazaar';
export type EventStatus = 'Open' | 'Closed' | 'Coming Soon';

export interface RegistrationPhase {
  name: string;
  startDate: string;
  endDate: string;
}

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
  registrationStartDate?: string;
  registrationCloseDate?: string;
  registrationPhases?: RegistrationPhase[];
  requirements?: string[];
  registrationFlow?: string[];
  timeline?: { title: string; date: string }[];
  benefits?: string[];
  contacts?: { name: string; phone: string }[];
  isSubEvent?: boolean;
  image?: string;
  guidebookUrl?: string;
}

export const OFFICIAL_EVENTS: EventData[] = [
  {
    id: "evt-01",
    slug: "seminar-nasional",
    title: "Seminar Nasional",
    category: "Seminar",
    status: "Open",
    shortDescription: "Sinergi Inovasi: Menautkan Teknologi, Merangkul Keberagaman.",
    description: "Seminar Nasional SI FEST 2026 menghadirkan pakar teknologi terkemuka untuk membahas tren terkini dalam dunia Sistem Informasi dan bagaimana teknologi dapat menyatukan berbagai elemen masyarakat untuk mencapai masa depan yang inklusif.",
    icon: "GraduationCap",
    date: "03 November 2026",
    time: "08.00 - 17.30 WIB",
    location: "UPI Convention Center",
    price: "Gratis",
    registrationCloseDate: "2026-10-31T23:59:59+07:00",
    requirements: [
      "Peserta merupakan peserta yang telah terdaftar dalam seminar SI-FEST 2026.",
      "Peserta wajib memberikan data pendaftaran yang benar.",
      "Peserta wajib mengikuti seluruh rangkaian kegiatan seminar.",
      "Peserta wajib hadir sesuai waktu yang telah ditentukan.",
      "Peserta wajib menjaga ketertiban selama kegiatan berlangsung.",
      "Peserta wajib menjaga nama baik Seminar SI-FEST 2026, panitia, dan institusi penyelenggara.",
      "Peserta wajib mematuhi arahan panitia selama kegiatan berlangsung."
    ],
    registrationFlow: [
      "Peserta membuat akun dan login di website resmi SI FEST.",
      "Mengisi formulir pendaftaran pada halaman event Seminar.",
      "Menyelesaikan pembayaran tiket melalui sistem terintegrasi (Duitku) atau manual.",
      "Mendapatkan E-Ticket (QR Code) di dashboard akun.",
      "Bergabung ke Grup WhatsApp peserta melalui tautan yang disediakan."
    ],
    timeline: [
      { title: "Pendaftaran", date: "28 September - 28 Oktober 2026" },
      { title: "Open Gate & Registrasi", date: "03 November 2026" },
      { title: "Pelaksanaan Seminar", date: "03 November 2026" }
    ],
    benefits: [
      "E-Certificate Tingkat Nasional",
      "Seminar Kit & Snack Box",
      "Doorprize Menarik",
      "Relasi & Ilmu Bermanfaat"
    ],
    contacts: [
      { name: "Reifan", phone: "0857-0914-4442" },
      { name: "Nabila", phone: "0812-7796-3005" }
    ]
  },
  {
    id: "evt-02-slta",
    slug: "turnamen-futsal-slta",
    title: "Turnamen Futsal SLTA",
    category: "Sport",
    status: "Open",
    shortDescription: "Ajang kompetisi olahraga futsal bergengsi antar pelajar SLTA.",
    description: "Tunjukkan bakat dan sportivitas tim Anda dalam Turnamen Futsal SI FEST 2026. Kompetisi ini terbuka untuk pelajar tingkat atas di Sumatera Barat.",
    icon: "Trophy",
    date: "03 - 06 November 2026",
    time: "08.00 - 17.30 WIB",
    location: "Lap. Futsal UPI \"YPTK\" Padang",
    price: "Rp 350.000 / Tim",
    registrationStartDate: "2026-09-28T00:00:00+07:00",
    registrationCloseDate: "2026-10-28T23:59:59+07:00",
    registrationPhases: [
      { name: "Gelombang 1", startDate: "2026-09-28T00:00:00+07:00", endDate: "2026-10-11T23:59:59+07:00" },
      { name: "Gelombang 2", startDate: "2026-10-12T00:00:00+07:00", endDate: "2026-10-28T23:59:59+07:00" }
    ],
    requirements: [
      "Satu tim terdiri dari maksimal 12 pemain dan 2 official",
      "Pemain wajib melampirkan Kartu Pelajar yang aktif",
      "Setiap tim wajib mengikuti Technical Meeting sebelum pertandingan",
      "Melunasi biaya pendaftaran sebelum tenggat waktu"
    ],
    registrationFlow: [
      "Perwakilan tim mengisi formulir pendaftaran di website SI FEST.",
      "Mengunggah scan/foto identitas setiap anggota tim.",
      "Melakukan pembayaran biaya registrasi ke rekening panitia.",
      "Bergabung dengan grup komunikasi peserta setelah pembayaran diverifikasi.",
      "Hadir pada saat Technical Meeting untuk pengundian bracket pertandingan."
    ],
    timeline: [
      { title: "Pendaftaran Gelombang 1", date: "28 September - 11 Oktober 2026" },
      { title: "Pendaftaran Gelombang 2", date: "12 - 28 Oktober 2026" },
      { title: "Pelaksanaan Pertandingan", date: "03 - 06 November 2026" }
    ],
    benefits: [
      "Total Hadiah Jutaan Rupiah",
      "Piala Bergilir & Medali",
      "Sertifikat Tingkat Provinsi",
      "Top Scorer: Plakat + Sertifikat"
    ],
    contacts: [
      { name: "Fio", phone: "082252888250" },
      { name: "Rindu", phone: "0821-7181-2343" }
    ],
    isSubEvent: true
  },
  {
    id: "evt-02-umum",
    slug: "turnamen-futsal-umum",
    title: "Turnamen Futsal Mahasiswa/Umum",
    category: "Sport",
    status: "Open",
    shortDescription: "Ajang kompetisi olahraga futsal bergengsi kategori Mahasiswa dan Umum.",
    description: "Tunjukkan bakat dan sportivitas tim Anda dalam Turnamen Futsal SI FEST 2026. Kompetisi ini terbuka untuk kalangan mahasiswa dan masyarakat umum di Sumatera Barat.",
    icon: "Trophy",
    date: "03 - 06 November 2026",
    time: "08.00 - 17.30 WIB",
    location: "Lap. Futsal UPI \"YPTK\" Padang",
    price: "Rp 350.000 / Tim",
    registrationStartDate: "2026-09-28T00:00:00+07:00",
    registrationCloseDate: "2026-10-28T23:59:59+07:00",
    registrationPhases: [
      { name: "Gelombang 1", startDate: "2026-09-28T00:00:00+07:00", endDate: "2026-10-11T23:59:59+07:00" },
      { name: "Gelombang 2", startDate: "2026-10-12T00:00:00+07:00", endDate: "2026-10-28T23:59:59+07:00" }
    ],
    requirements: [
      "Satu tim terdiri dari maksimal 12 pemain dan 2 official",
      "Pemain wajib melampirkan KTP atau Kartu Tanda Mahasiswa yang aktif",
      "Setiap tim wajib mengikuti Technical Meeting sebelum pertandingan",
      "Melunasi biaya pendaftaran sebelum tenggat waktu"
    ],
    registrationFlow: [
      "Perwakilan tim mengisi formulir pendaftaran di website SI FEST.",
      "Mengunggah scan/foto identitas setiap anggota tim.",
      "Melakukan pembayaran biaya registrasi ke rekening panitia.",
      "Bergabung dengan grup komunikasi peserta setelah pembayaran diverifikasi.",
      "Hadir pada saat Technical Meeting untuk pengundian bracket pertandingan."
    ],
    timeline: [
      { title: "Pendaftaran Gelombang 1", date: "28 September - 11 Oktober 2026" },
      { title: "Pendaftaran Gelombang 2", date: "12 - 28 Oktober 2026" },
      { title: "Pelaksanaan Pertandingan", date: "03 - 06 November 2026" }
    ],
    benefits: [
      "Total Hadiah Jutaan Rupiah",
      "Piala Bergilir & Medali",
      "Sertifikat Tingkat Provinsi",
      "Top Scorer: Plakat + Sertifikat"
    ],
    contacts: [
      { name: "Fio", phone: "082252888250" },
      { name: "Rindu", phone: "0821-7181-2343" }
    ],
    isSubEvent: true
  },
  {
    id: "evt-02-parent",
    slug: "turnamen-futsal",
    title: "Turnamen Futsal",
    category: "Sport",
    status: "Open",
    shortDescription: "Ajang kompetisi olahraga futsal bergengsi antar mahasiswa dan pelajar.",
    description: "Tunjukkan bakat dan sportivitas tim Anda dalam Turnamen Futsal SI FEST 2026. Kompetisi ini dibagi menjadi dua kategori: Tingkat SLTA dan UMUM.",
    icon: "Trophy",
    date: "03 - 06 November 2026",
    time: "08.00 - 17.30 WIB",
    location: "Lap. Futsal UPI \"YPTK\" Padang",
    price: "SLTA: Rp 350.000 / Tim\nUmum: Rp 350.000 / Tim",
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
    image: "/images/events/mlbb-logo.png",
    date: "03 - 05 November 2026",
    time: "08.00 - 17.30 WIB",
    location: "Lantai 2 UPI Exhibition Hall",
    price: "Rp 50.000 / Tim",
    registrationStartDate: "2026-09-28T00:00:00+07:00",
    registrationCloseDate: "2026-10-28T23:59:59+07:00",
    registrationPhases: [
      { name: "Gelombang 1", startDate: "2026-09-28T00:00:00+07:00", endDate: "2026-10-11T23:59:59+07:00" },
      { name: "Gelombang 2", startDate: "2026-10-12T00:00:00+07:00", endDate: "2026-10-28T23:59:59+07:00" }
    ],
    requirements: [
      "Satu tim terdiri dari 5 pemain utama dan maksimal 2 pemain cadangan.",
      "Setiap pemain wajib menggunakan akun Mobile Legends milik sendiri.",
      "Dilarang menggunakan cheat, script, map hack, bug exploit, atau aplikasi ilegal.",
      "Dilarang melakukan tindakan provokasi, penghinaan, atau tindakan yang mengganggu jalannya pertandingan.",
      "Keterlambatan melewati batas waktu check-in dapat dikenakan WO.",
      "Pergantian pemain hanya diperbolehkan sesuai ketentuan panitia.",
      "Keputusan wasit/panitia terkait pertandingan bersifat final."
    ],
    registrationFlow: [
      "Ketua tim membuat akun dan mendaftarkan skuad di website SI FEST.",
      "Mengisi ID Server dan Nickname masing-masing pemain dengan benar.",
      "Membayar biaya registrasi secara online.",
      "Masuk ke grup WhatsApp peserta melalui tautan yang dikirimkan.",
      "Menunggu jadwal drawing dan bracket dari panitia."
    ],
    timeline: [
      { title: "Pendaftaran Gelombang 1", date: "28 September - 11 Oktober 2026" },
      { title: "Pendaftaran Gelombang 2", date: "12 - 28 Oktober 2026" },
      { title: "Babak Penyisihan", date: "03 - 04 November 2026" },
      { title: "Grand Final", date: "05 November 2026" }
    ],
    benefits: [
      "Juara 1: Uang Tunai + Trophy + Sertifikat",
      "Juara 2: Uang Tunai + Sertifikat",
      "Juara 3: Uang Tunai + Sertifikat",
      "MVP Final: Uang Tunai"
    ],
    contacts: [
      { name: "Nayla", phone: "0812-6753-72371" },
      { name: "Ahda", phone: "0813-7480-0110" }
    ],
    isSubEvent: true
  },
  {
    id: "evt-03-efootball",
    slug: "turnamen-esport-efootball",
    title: "Turnamen E-Sport E-Football",
    category: "E-Sport",
    status: "Open",
    shortDescription: "Tunjukkan skill dan strategi terbaikmu di lapangan virtual.",
    description: "Bersiaplah untuk pertempuran epik! Turnamen E-Football SI FEST 2026 mencari pemain esports terbaik. Buktikan sinergi dan inovasi strategimu di lapangan hijau virtual.",
    icon: "Gamepad2",
    image: "/images/events/efootball-logo.png",
    date: "03 - 05 November 2026",
    time: "08.00 - 17.30 WIB",
    location: "Lantai 2 UPI Exhibition Hall",
    price: "Single Slot: Rp 75.000\nDouble Slot: Rp 125.000",
    registrationStartDate: "2026-09-28T00:00:00+07:00",
    registrationCloseDate: "2026-10-28T23:59:59+07:00",
    registrationPhases: [
      { name: "Gelombang 1", startDate: "2026-09-28T00:00:00+07:00", endDate: "2026-10-11T23:59:59+07:00" },
      { name: "Gelombang 2", startDate: "2026-10-12T00:00:00+07:00", endDate: "2026-10-28T23:59:59+07:00" }
    ],
    requirements: [
      "Satu tim terdiri dari 5 pemain utama dan maksimal 2 pemain cadangan.",
      "Setiap pemain wajib menggunakan akun E-Football milik sendiri.",
      "Dilarang menggunakan cheat, script, map hack, bug exploit, atau aplikasi ilegal.",
      "Dilarang melakukan tindakan provokasi, penghinaan, atau tindakan yang mengganggu jalannya pertandingan.",
      "Keterlambatan melewati batas waktu check-in dapat dikenakan WO.",
      "Pergantian pemain hanya diperbolehkan sesuai ketentuan panitia.",
      "Keputusan wasit/panitia terkait pertandingan bersifat final."
    ],
    registrationFlow: [
      "Ketua tim membuat akun dan mendaftarkan skuad di website SI FEST.",
      "Mengisi ID Server dan Nickname masing-masing pemain dengan benar.",
      "Membayar biaya registrasi secara online.",
      "Masuk ke grup WhatsApp peserta melalui tautan yang dikirimkan.",
      "Menunggu jadwal drawing dan bracket dari panitia."
    ],
    timeline: [
      { title: "Pendaftaran Gelombang 1", date: "28 September - 11 Oktober 2026" },
      { title: "Pendaftaran Gelombang 2", date: "12 - 28 Oktober 2026" },
      { title: "Babak Penyisihan", date: "03 - 04 November 2026" },
      { title: "Grand Final", date: "05 November 2026" }
    ],
    benefits: [
      "Juara 1: Uang Tunai + Trophy + Sertifikat",
      "Juara 2: Uang Tunai + Sertifikat",
      "Juara 3: Uang Tunai + Sertifikat",
      "MVP Final: Uang Tunai"
    ],
    contacts: [
      { name: "Nayla", phone: "0812-6753-72371" },
      { name: "Ahda", phone: "0813-7480-0110" }
    ],
    isSubEvent: true
  },
  {
    id: "evt-03-parent",
    slug: "turnamen-esport",
    title: "Turnamen E-Sport",
    category: "E-Sport",
    status: "Open",
    shortDescription: "Ajang kompetisi E-Sport bergengsi untuk MLBB dan E-Football.",
    description: "Bersiaplah untuk pertempuran epik! Turnamen E-Sport SI FEST 2026 hadir dengan dua cabang game populer: Mobile Legends (MLBB) dan E-Football.",
    icon: "Gamepad2",
    date: "03 - 05 November 2026",
    time: "08.00 - 17.30 WIB",
    location: "Lantai 2 UPI Exhibition Hall",
    price: "MLBB: Rp 50.000 / Tim\nE-Football: 75k (1 Slot), 125k (2 Slot)",
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
    date: "02 November 2026",
    time: "08.00 - 17.30 WIB",
    location: "Lantai 2 UPI Exhibition Hall",
    price: "Gratis",
    registrationCloseDate: "2026-10-28T23:59:59+07:00",
    requirements: [
      "Peserta merupakan peserta yang telah terdaftar dalam MTQ SI-FEST 2026.",
      "Peserta wajib memberikan data pendaftaran yang benar.",
      "Peserta wajib mengikuti seluruh rangkaian kegiatan sesuai jadwal.",
      "Peserta wajib hadir sesuai waktu yang telah ditentukan.",
      "Peserta wajib menjaga ketertiban dan kondusivitas selama kegiatan berlangsung.",
      "Peserta wajib menjaga nama baik MTQ SI-FEST 2026, panitia, dan institusi penyelenggara.",
      "Peserta wajib mematuhi arahan panitia dan dewan juri selama kegiatan berlangsung.",
      "Peserta wajib menjaga fasilitas dan perlengkapan yang digunakan selama kegiatan."
    ],
    registrationFlow: [
      "Peserta mendaftar melalui form pendaftaran di website SI FEST.",
      "Mengunggah bukti mahasiswa aktif (KTM atau KRS terbaru).",
      "Konfirmasi pendaftaran selesai secara gratis (tanpa biaya).",
      "Peserta bergabung ke grup WhatsApp khusus lomba MTQ.",
      "Mengambil nomor urut tampil saat hari H perlombaan."
    ],
    timeline: [
      { title: "Pendaftaran Gelombang 1", date: "28 September - 11 Oktober 2026" },
      { title: "Pendaftaran Gelombang 2", date: "12 - 28 Oktober 2026" },
      { title: "Pelaksanaan Lomba", date: "02 November 2026" },
      { title: "Pengumuman Juara", date: "06 November 2026 (Closing)" }
    ],
    benefits: [
      "Juara 1: Tabanas + Sertifikat + Trofi",
      "Juara 2: Tabanas + Sertifikat + Trofi",
      "Juara 3: Tabanas + Sertifikat + Trofi",
      "Seluruh peserta mendapatkan E-Certificate"
    ],
    contacts: [
      { name: "Alam", phone: "085766529316" },
      { name: "Zaskia", phone: "0822-8548-9075" }
    ]
  },
  {
    id: "evt-05-mahasiswa",
    slug: "open-bazaar-mahasiswa",
    title: "Open Bazaar Mahasiswa",
    category: "Bazaar",
    status: "Open",
    shortDescription: "Bazaar kuliner dan produk kreatif khusus tenant mahasiswa.",
    description: "Dukung perekonomian lokal dan temukan berbagai inovasi kuliner serta produk kreatif dari mahasiswa di Open Bazaar SI FEST 2026. Area ini akan menjadi pusat berkumpulnya pengunjung selama festival berlangsung.",
    icon: "Store",
    date: "02 - 06 November 2026",
    time: "08.00 - 17.30 WIB",
    location: "Halaman depan UPI Exhibition Hall",
    price: "Rp 250.000",
    registrationCloseDate: "2026-10-15T23:59:59+07:00",
    requirements: [
      "Pendaftaran tenant terbuka khusus untuk mahasiswa aktif",
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
      { title: "Pelaksanaan Bazaar", date: "02 - 06 November 2026" }
    ],
    benefits: [
      "Fasilitas Stand (Meja & Kursi)",
      "Akses Listrik & Kebersihan Area",
      "Promosi di Media Sosial SI FEST",
      "Sertifikat Partisipasi Tenant"
    ],
    contacts: [
      { name: "Aqil", phone: "081266869460" },
      { name: "Hanafi", phone: "0853-7931-8662" }
    ],
    isSubEvent: true
  },
  {
    id: "evt-05-umum",
    slug: "open-bazaar-umum",
    title: "Open Bazaar UMUM",
    category: "Bazaar",
    status: "Open",
    shortDescription: "Bazaar kuliner dan produk kreatif untuk tenant umum.",
    description: "Dukung perekonomian lokal dan temukan berbagai inovasi kuliner serta produk kreatif dari UMKM lokal di Open Bazaar SI FEST 2026. Area ini akan menjadi pusat berkumpulnya pengunjung selama festival berlangsung.",
    icon: "Store",
    date: "02 - 06 November 2026",
    time: "08.00 - 17.30 WIB",
    location: "Halaman depan UPI Exhibition Hall",
    price: "Rp 300.000",
    registrationCloseDate: "2026-10-15T23:59:59+07:00",
    requirements: [
      "Pendaftaran tenant terbuka untuk pelaku UMKM umum",
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
      { title: "Pelaksanaan Bazaar", date: "02 - 06 November 2026" }
    ],
    benefits: [
      "Fasilitas Stand (Meja & Kursi)",
      "Akses Listrik & Kebersihan Area",
      "Promosi di Media Sosial SI FEST",
      "Sertifikat Partisipasi Tenant"
    ],
    contacts: [
      { name: "Aqil", phone: "081266869460" },
      { name: "Hanafi", phone: "0853-7931-8662" }
    ],
    isSubEvent: true
  },
  {
    id: "evt-05-parent",
    slug: "open-bazaar",
    title: "Open Bazaar / UMKM & F&B",
    category: "Bazaar",
    status: "Open",
    shortDescription: "Eksplorasi ragam kuliner dan produk kreatif dari UMKM lokal.",
    description: "Dukung perekonomian lokal dan temukan berbagai inovasi kuliner serta produk kreatif di Open Bazaar SI FEST 2026. Area ini akan menjadi pusat berkumpulnya pengunjung selama festival berlangsung.",
    icon: "Store",
    date: "02 - 06 November 2026",
    time: "08.00 - 17.30 WIB",
    location: "Halaman depan UPI Exhibition Hall",
    price: "Mahasiswa: Rp 250.000\nUmum: Rp 300.000",
  },
];
