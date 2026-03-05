import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://archdesign.io"),
  title: "ArchDesign.io — Master System Design with Real-World Architectures",
  description:
    "30 high-scalability system architecture deep-dives — from Netflix CDN to GPT inference pipelines. Free system design deep-dives for CS students.",
  keywords:
    "system design, architecture, distributed systems, LLM, RAG, Kafka, Netflix, interview prep, CS students",
  robots: { index: true, follow: true },
  openGraph: {
    title: "ArchDesign.io — Master System Design",
    description: "30 real-world architecture deep-dives for CS students. Free forever · 30 architectures · Built by a Microsoft engineer.",
    type: "website",
    url: "https://archdesign.io",
    siteName: "ArchDesign.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArchDesign.io — Master System Design",
    description: "30 real-world architecture deep-dives + 30 podcast episodes. Free forever for CS students.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="alternate" type="application/rss+xml" title="ArchDesign Podcast" href="/podcast.xml" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#0a0f1e] text-[#f1f5f9]`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
