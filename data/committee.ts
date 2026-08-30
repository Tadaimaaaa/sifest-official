export interface CommitteeMember {
  id: string;
  name: string;
  nim?: string;
  role: string;
  image?: string;
}

export interface Division {
  id: string;
  name: string;
  members: CommitteeMember[];
}

export const STEERING_COMMITTEE: CommitteeMember[] = [
  { id: "sc-3", name: "Angelicca Rehuel Saphira", nim: "23101152610165", role: "Sekretaris Umum" },
  { id: "sc-1", name: "Farras Amar Zaim Fasha Khoeroni", nim: "23101152610332", role: "Bupati" },
  { id: "sc-2", name: "Ahlazzikri Azamuddin", nim: "23101152610322", role: "Wakil Bupati" },
  { id: "sc-4", name: "Fasya Maida Elvina", nim: "24101152610012", role: "Bendahara Umum" }
];

export const ORGANIZING_COMMITTEE_CORE: CommitteeMember[] = [
  { id: "oc-4", name: "Zhara Delvia Putri", nim: "24101152610261", role: "Bendahara 1" },
  { id: "oc-2", name: "Dilan Afri Jones", nim: "22101152610011", role: "Ketua Pelaksana Proker" },
  { id: "oc-1", name: "Neil Firdaus", nim: "24101152610176", role: "Penanggung Jawab Proker" },
  { id: "oc-3", name: "Helsi Serlina Aprila Saputri", nim: "24101152610054", role: "Sekretaris" },
  { id: "oc-5", name: "Fachratun Rahima", nim: "25101152610292", role: "Bendahara 2" }
];

export const DIVISIONS: Division[] = [
  {
    id: "kesekretariatan",
    name: "Divisi Kesekretariatan",
    members: [
      { id: "kes-1", name: "Reifan Mardatilla", nim: "24101152610069", role: "Koordinator" },
      { id: "kes-2", name: "Hanafi Nur Imansyah", nim: "25101152610089", role: "Anggota" },
      { id: "kes-3", name: "Muhammad Ahda Ahlieya Akbar", nim: "25101152610097", role: "Anggota" },
      { id: "kes-4", name: "Zaskia Lestari", nim: "25101152610361", role: "Anggota" },
      { id: "kes-5", name: "Rindu Rahma Aulia", nim: "25101152610305", role: "Anggota" },
      { id: "kes-6", name: "Faradiva Putri", nim: "22101152610429", role: "Anggota" }
    ]
  },
  {
    id: "acara-inti",
    name: "Divisi Acara Inti",
    members: [
      { id: "ai-1", name: "Dimas Ade Putra", nim: "24101152610233", role: "Koordinator" },
      { id: "ai-2", name: "Febrila Mardatrisna", nim: "25101152610295", role: "Anggota" },
      { id: "ai-3", name: "Naila Fauziah", nim: "24101152610249", role: "Anggota" }
    ]
  },
  {
    id: "humas",
    name: "Divisi Humas",
    members: [
      { id: "hm-1", name: "Raditya Al Qardhawi", nim: "24101152610315", role: "Koordinator" },
      { id: "hm-2", name: "Habibi Abdullah Hulwe", nim: "24101152610164", role: "Anggota" },
      { id: "hm-3", name: "Try Anggara Yofa", nim: "24101152610222", role: "Anggota" },
      { id: "hm-4", name: "Aulia Angie Anugrah", nim: "25101152610325", role: "Anggota" },
      { id: "hm-5", name: "Asyifa Ray Yanaf", nim: "25101152610324", role: "Anggota" }
    ]
  },
  {
    id: "logistik",
    name: "Divisi Logistik",
    members: [
      { id: "log-1", name: "Okta Khairul Ramadhan", nim: "24101152610177", role: "Koordinator" },
      { id: "log-2", name: "Fathir Febrian R", nim: "25101152610055", role: "Anggota" },
      { id: "log-3", name: "Muhammad Adib", nim: "25101152610222", role: "Anggota" },
      { id: "log-4", name: "Ardian Gunawan", nim: "25101152610200", role: "Anggota" },
      { id: "log-5", name: "Daffa Arif Akbar", nim: "25101152610008", role: "Anggota" },
      { id: "log-6", name: "M. Fachrouzy Novemjasta", nim: "25101152610216", role: "Anggota" },
      { id: "log-7", name: "Najwa Syauqi Lianoz", nim: "23101152610307", role: "Anggota" },
      { id: "log-8", name: "Nayshilla Maori Devandra", nim: "25101152610345", role: "Anggota" },
      { id: "log-9", name: "Alya Yumi Khalisa", nim: "25101152610284", role: "Anggota" }
    ]
  },
  {
    id: "medis",
    name: "Divisi Medis",
    members: [
      { id: "med-1", name: "Salsabila Amanda", nim: "24101152610071", role: "Koordinator" },
      { id: "med-2", name: "Miqdad Al Mahdi", nim: "25101152610219", role: "Anggota" },
      { id: "med-3", name: "Fajar Akbar", nim: "25101152610126", role: "Anggota" },
      { id: "med-4", name: "Aqilah Kaskia", nim: "24101152610045", role: "Anggota" },
      { id: "med-5", name: "Feni Deska Yandra", nim: "25101152610328", role: "Anggota" }
    ]
  },
  {
    id: "pubdok",
    name: "Divisi Publikasi & Dok",
    members: [
      { id: "pub-1", name: "Rizky Dwi Darmawan", nim: "24101152610256", role: "Koordinator" },
      { id: "pub-2", name: "Ahmad Fauzi Baehaqi", nim: "25101152610083", role: "Anggota" },
      { id: "pub-3", name: "Hafizh Meldy Rantisi", nim: "24101152610305", role: "Anggota" },
      { id: "pub-4", name: "M. Rafli Hamdi", nim: "24101152610095", role: "Anggota" },
      { id: "pub-5", name: "Nikesha Primaputri Faryl", nim: "24101152610250", role: "Anggota" },
      { id: "pub-6", name: "Aisysifa Dwiyanti", nim: "25101152610280", role: "Anggota" },
      { id: "pub-7", name: "Syahla Nafisah Arisma", nim: "25101152610358", role: "Anggota" },
      { id: "pub-8", name: "Susan Nashwa Hanoon", nim: "25101152610356", role: "Anggota" }
    ]
  },
  {
    id: "mtq",
    name: "Event MTQ",
    members: [
      { id: "mtq-1", name: "Zaki Fadlurrahaman", nim: "25101152610114", role: "Ketua Pelaksana" },
      { id: "mtq-2", name: "Indah Sri Yuliwarti", nim: "24101152610277", role: "Sekretaris & Bendahara" },
      { id: "mtq-3", name: "Waala Munafsi", nim: "25101152610110", role: "Koordinator Acara" },
      { id: "mtq-4", name: "Prima Halip A. H", nim: "25101152610188", role: "Anggota" },
      { id: "mtq-5", name: "Ivory Najwa Syaufani", nim: "24101152610167", role: "Anggota" }
    ]
  },
  {
    id: "bazar",
    name: "Event Bazar Kreatif",
    members: [
      { id: "bzr-1", name: "Alif Fathul Ataulah", nim: "22101152610127", role: "Ketua Pelaksana" },
      { id: "bzr-2", name: "Zahwa Alwa Khairani", nim: "25101152610320", role: "Sekretaris & Bendahara" },
      { id: "bzr-3", name: "Muhammad Aqil", nim: "25101152610067", role: "Koordinator Acara" },
      { id: "bzr-4", name: "Saskia Aprilia Putri", nim: "25101152610307", role: "Anggota" },
      { id: "bzr-5", name: "Mailisya Zahara Rab Yusna", nim: "25101152610339", role: "Anggota" }
    ]
  },
  {
    id: "futsal",
    name: "Event Turnamen Futsal",
    members: [
      { id: "fut-1", name: "Kevin Reviano Darma Putra", nim: "24101152610309", role: "Ketua Pelaksana" },
      { id: "fut-2", name: "Sefiolla Saputri", nim: "25101152610352", role: "Sekretaris & Bendahara" },
      { id: "fut-3", name: "Muhammad Rafadil Nafischi", nim: "25101152610227", role: "Koordinator Acara" },
      { id: "fut-4", name: "Anggian Doli Pratama Hutapea", nim: "25101152610199", role: "Anggota" }
    ]
  },
  {
    id: "seminar",
    name: "Event Seminar Nasional",
    members: [
      { id: "sem-1", name: "Wahyu Febrian Wiratama", nim: "23101152610438", role: "Ketua Pelaksana" },
      { id: "sem-2", name: "Dinda Fadillah C", nim: "24101152610048", role: "Sekretaris & Bendahara" },
      { id: "sem-3", name: "Nur Wahid Hafizi", nim: "24101152610065", role: "Koordinator Acara" },
      { id: "sem-4", name: "Nabilla Widya Putri D", nim: "25101152610264", role: "Anggota" }
    ]
  },
  {
    id: "esport",
    name: "Event Esport Competition",
    members: [
      { id: "esp-1", name: "Ihsanul Al Fikri", nim: "25101152610027", role: "Ketua Pelaksana" },
      { id: "esp-2", name: "Nayla Syaheeda", nim: "25101152610344", role: "Sekretaris & Bendahara" },
      { id: "esp-3", name: "Razzaaq Pratama", nim: "24101152610254", role: "Koordinator Acara" },
      { id: "esp-4", name: "Raihan Firdaus", nim: "25101152610191", role: "Anggota" }
    ]
  }
];
