export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  image?: string;
}

export const CORE_COMMITTEE: CommitteeMember[] = [
  {
    id: "ketupel",
    name: "John Doe",
    role: "Ketua Pelaksana",
  },
  {
    id: "wakil",
    name: "Jane Smith",
    role: "Wakil Ketua",
  },
  {
    id: "sekretaris",
    name: "Alex Johnson",
    role: "Sekretaris",
  },
  {
    id: "bendahara",
    name: "Sarah Williams",
    role: "Bendahara",
  },
  {
    id: "acara",
    name: "Michael Brown",
    role: "Koordinator Acara",
  },
  {
    id: "humas",
    name: "David Davis",
    role: "Koordinator Humas",
  },
  {
    id: "pubdok",
    name: "Emily Wilson",
    role: "Koordinator Pubdok",
  },
  {
    id: "perkap",
    name: "Daniel Garcia",
    role: "Koordinator Perlengkapan",
  }
];
