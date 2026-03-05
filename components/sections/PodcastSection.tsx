import Link from "next/link";
import { Headphones, Play, Mic, ArrowRight } from "lucide-react";
import { PODCAST_EPISODES } from "@/data/podcast";

const featured = PODCAST_EPISODES.slice(0, 6);

const CATEGORY_COLORS: Record<string, string> = {
  distributed: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  "data-infrastructure": "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  "llm-ai": "bg-teal-500/20 text-teal-400 border border-teal-500/30",
};

const CATEGORY_SHORT: Record<string, string> = {
  distributed: "Distributed",
  "data-infrastructure": "Data",
  "llm-ai": "LLM & AI",
};

export default function PodcastSection() {
  return (
    <section className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge badge-blue mb-4 inline-flex items-center gap-2">
            <Mic className="w-3 h-3" />
            Podcast · All Free
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5">
            Architecture Deep-Dives{" "}
            <span className="gradient-text">by Ear</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Alex &amp; Sam break down how Netflix, Kafka, GPT, and 27 more real-world systems actually work — in 3-8 minute podcast episodes. Listen while you commute, code, or cook.
          </p>
        </div>

        {/* Episode grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {featured.map((ep) => (
            <Link
              key={ep.slug}
              href={`/podcast/${ep.slug}`}
              className="group flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-blue-500/30 hover:bg-[var(--bg-primary)] transition-all duration-200"
            >
              {/* Episode number */}
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-xs font-mono text-[var(--text-muted)] group-hover:border-blue-500/40 transition-colors">
                {String(ep.episode).padStart(2, "0")}
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium mb-1.5 inline-block ${CATEGORY_COLORS[ep.category]}`}>
                  {CATEGORY_SHORT[ep.category]}
                </span>
                <p className="font-semibold text-[var(--text-primary)] text-sm group-hover:text-white truncate">{ep.title}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{ep.duration}</p>
              </div>
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all mt-1">
                <Play className="w-3 h-3 ml-0.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/podcast"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:opacity-90 transition-all glow-blue shadow-2xl"
          >
            <Headphones className="w-5 h-5" />
            Browse All 30 Episodes
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="/podcast.xml"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] font-medium hover:border-blue-500/50 hover:text-white transition-all"
          >
            RSS Feed
          </a>
        </div>
        <p className="text-center text-xs text-[var(--text-muted)] mt-4">No login · No credit card · Always free</p>
      </div>
    </section>
  );
}
