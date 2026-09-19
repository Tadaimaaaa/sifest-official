import type { Metadata } from "next";
import { Fredoka, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Y2K Bubbly & Youthful Display Font
const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700"],
});

// Clean, readable Body Font
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | SI FEST 2026",
    default: "SI FEST 2026 — Sistem Informasi Festival",
  },
  description: "Official Website SI FEST 2026: Sinergi Inovasi: Menautkan Teknologi, Merangkul Keberagaman. Universitas Putra Indonesia YPTK Padang.",
  keywords: [
    "SI FEST", 
    "SI FEST 2026", 
    "Festival Sistem Informasi", 
    "UPI YPTK Padang", 
    "Sistem Informasi UPI YPTK", 
    "Turnamen Futsal Pelajar Padang", 
    "Lomba IT Mahasiswa", 
    "HMJ SI UPI YPTK Padang", 
    "Sifest YPTK"
  ],
  authors: [{ name: "HMJ Sistem Informasi UPI YPTK Padang" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "SI FEST 2026 - Universitas Putra Indonesia YPTK Padang",
    description: "Official Website SI FEST 2026: Sinergi Inovasi, Menautkan Teknologi, Merangkul Keberagaman.",
    type: "website",
    locale: "id_ID",
    siteName: "SI FEST 2026",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fredoka.variable} ${plusJakartaSans.variable}`}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
