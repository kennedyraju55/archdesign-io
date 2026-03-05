"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Mic, Clock, Layers, Sparkles } from "lucide-react";
import {
  PODCAST_EPISODES,
  CATEGORY_LABELS,
  type PodcastCategory,
} from "@/data/podcast";

const CATEGORY_BADGE: Record<PodcastCategory, string> = {
  distributed: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  "data-infrastructure": "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  "llm-ai": "bg-teal-500/20 text-teal-400 border border-teal-500/30",
};

type FilterTab = "all" | PodcastCategory;

export default function PodcastPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filtered =
    activeTab === "all"
      ? PODCAST_EPISODES
      : PODCAST_EPISODES.filter((ep) => ep.category === activeTab);

  const tabs: { id: FilterTab; label: string }[] = [
    { id: "all", label: "All Episodes" },
    { id: "distributed", label: "Distributed Systems" },
    { id: "data-infrastructure", label: "Data & Infrastructure" },
    { id: "llm-ai", label: "LLM & AI" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e] pt-16">
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1e293b]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-teal-500/10 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
            <Mic className="w-3 h-3" />
            30 EPISODES · ALL FREE
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span
              style={{
                background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ArchDesign Podcast
            </span>
          </h1>
          <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto mb-8">
            Alex &amp; Sam break down complex systems in under 7 minutes —
            Netflix, Kafka, Kubernetes, GPT, and more.
          </p>

          {/* Listen buttons - coming soon: Spotify & Apple */}
          <div className="flex flex-wrap gap-3 justify-center">
          </div>
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────────────────────────── */}
      <section className="border-b border-[#1e293b] bg-[#0f1629]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { icon: <Mic className="w-4 h-4" />, value: "30", label: "Episodes" },
            { icon: <Clock className="w-4 h-4" />, value: "2h+", label: "Content" },
            { icon: <Layers className="w-4 h-4" />, value: "3", label: "Categories" },
            { icon: <Sparkles className="w-4 h-4" />, value: "Free", label: "Forever" },
          ].map(({ icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-blue-400">{icon}</span>
              <span className="text-2xl font-bold text-white">{value}</span>
              <span className="text-xs text-[#64748b]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Episode list ────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-[#0f1629] text-[#94a3b8] hover:text-white border border-[#1e293b]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Episode cards */}
        <div className="space-y-3">
          {filtered.map((ep) => (
            <Link
              key={ep.slug}
              href={`/podcast/${ep.slug}`}
              className="group flex items-start gap-4 p-4 rounded-xl bg-[#111827] border border-[#1e293b] hover:border-blue-500/30 hover:bg-[#1a2235] transition-all duration-200"
            >
              {/* Episode number */}
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#0f1629] border border-[#1e293b] flex items-center justify-center text-xs font-mono text-[#64748b] group-hover:border-blue-500/40 transition-colors">
                {String(ep.episode).padStart(2, "0")}
              </div>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_BADGE[ep.category]}`}
                  >
                    {CATEGORY_LABELS[ep.category]}
                  </span>
                </div>
                <h3 className="font-semibold text-[#f1f5f9] group-hover:text-white truncate">
                  {ep.title}
                </h3>
                <p className="text-sm text-[#64748b] mt-0.5 line-clamp-1">
                  {ep.description}
                </p>
              </div>

              {/* Right side */}
              <div className="flex-shrink-0 flex items-center gap-3 text-[#64748b]">
                <span className="text-xs font-mono hidden sm:block">{ep.duration}</span>
                <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Play className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
