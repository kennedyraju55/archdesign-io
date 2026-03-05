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

          {/* Subscribe buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://open.spotify.com/show/archdesign"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1DB954] text-black text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Listen on Spotify
            </a>
            <a
              href="https://podcasts.apple.com/podcast/archdesign"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#872ec4] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.016 0C5.383 0 .016 5.367.016 12c0 6.633 5.367 12 11.984 12C18.633 24 24 18.633 24 12c0-6.633-5.367-12-11.984-12zm-.016 4.8c2.4 0 4.367 1.967 4.367 4.367 0 2.4-1.967 4.367-4.367 4.367-2.4 0-4.367-1.967-4.367-4.367C7.633 6.767 9.6 4.8 12 4.8zm6.717 14.4H5.283A9.574 9.574 0 012.4 12a9.6 9.6 0 0119.2 0 9.574 9.574 0 01-2.883 7.2z" />
              </svg>
              Apple Podcasts
            </a>
            <a
              href="/podcast.xml"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1e293b] text-[#94a3b8] text-sm font-medium hover:text-white hover:bg-[#1a2235] transition-colors border border-[#1e293b]"
            >
              RSS Feed
            </a>
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
