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
  title: "ArchDesign.io — Master System Design with Real-World Architectures",
  description:
    "30 high-scalability system architecture deep-dives — from Netflix CDN to GPT inference pipelines. Built for CS students. Get weekly video walkthroughs for $9/month.",
  keywords:
    "system design, architecture, distributed systems, LLM, RAG, Kafka, Netflix, interview prep, CS students",
  openGraph: {
    title: "ArchDesign.io — Master System Design",
    description: "30 real-world architecture deep-dives for CS students. Free articles. $9/month for weekly video walkthroughs.",
    type: "website",
    url: "https://archdesign.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#0a0f1e] text-[#f1f5f9]`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
