import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Lock, CheckCircle2, Building2 } from "lucide-react";
import {
  PODCAST_EPISODES,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  type PodcastCategory,
} from "@/data/podcast";

// ── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return PODCAST_EPISODES.map((ep) => ({ slug: ep.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ep = PODCAST_EPISODES.find((e) => e.slug === slug);
  if (!ep) return {};
  return {
    title: `Ep. ${ep.episode}: ${ep.title} — ArchDesign Podcast`,
    description: ep.description,
    openGraph: {
      title: `${ep.title} — ArchDesign Podcast`,
      description: ep.description,
      type: "article",
      url: `https://archdesign.io/podcast/${ep.slug}`,
    },
  };
}

// ── Category badge styles ─────────────────────────────────────────────────────

const BADGE_STYLES: Record<PodcastCategory, string> = {
  distributed: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  "data-infrastructure": "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  "llm-ai": "bg-teal-500/20 text-teal-400 border border-teal-500/30",
};

// ── Derive 3 key takeaways from the description ───────────────────────────────

function deriveKeyTakeaways(ep: (typeof PODCAST_EPISODES)[number]): string[] {
  const tagLabels = ep.tags.slice(0, 3).map((t) =>
    t
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
  return [
    `Why ${ep.companies[0]} built this architecture and the scale challenges they faced.`,
    `How ${tagLabels[0]} and ${tagLabels[1] ?? tagLabels[0]} work together under the hood.`,
    `Key trade-offs and lessons you can apply to your own system design interviews.`,
  ];
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const epIndex = PODCAST_EPISODES.findIndex((e) => e.slug === slug);
  if (epIndex === -1) notFound();

  const ep = PODCAST_EPISODES[epIndex];
  const prevEp = epIndex > 0 ? PODCAST_EPISODES[epIndex - 1] : null;
  const nextEp = epIndex < PODCAST_EPISODES.length - 1 ? PODCAST_EPISODES[epIndex + 1] : null;
  const takeaways = deriveKeyTakeaways(ep);
  const categoryColor = CATEGORY_COLORS[ep.category];

  return (
    <div className="min-h-screen bg-[#0a0f1e] pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ── Back link ──────────────────────────────────────────────── */}
        <Link
          href="/podcast"
          className="inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all episodes
        </Link>

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-mono text-[#64748b]">
              Episode {ep.episode}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${BADGE_STYLES[ep.category]}`}
            >
              {CATEGORY_LABELS[ep.category]}
            </span>
            {ep.isFree && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                FREE
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#f1f5f9] mb-2">
            {ep.title}
          </h1>
          <p className="text-[#94a3b8] text-sm">{ep.duration} · Alex &amp; Sam</p>
        </div>

        {/* ── Audio player ───────────────────────────────────────────── */}
        <div className="mb-8 rounded-xl bg-[#111827] border border-[#1e293b] overflow-hidden">
          {ep.isFree ? (
            <div className="p-5">
              <audio
                controls
                className="w-full h-10"
                style={{ colorScheme: "dark" }}
                preload="metadata"
              >
                <source src={ep.mp3Url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : (
            <div className="relative p-5">
              {/* Blurred placeholder audio */}
              <div className="blur-sm pointer-events-none select-none opacity-50">
                <div className="w-full h-10 rounded-lg bg-[#1e293b] flex items-center px-3 gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#2563eb]/30" />
                  <div className="flex-1 h-1.5 rounded-full bg-[#1e293b]">
                    <div className="w-1/3 h-full rounded-full bg-[#2563eb]/40" />
                  </div>
                  <span className="text-xs text-[#64748b] font-mono">{ep.duration}</span>
                </div>
              </div>
              {/* Lock overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#111827]/80 px-4 text-center">
                <Lock className="w-6 h-6 text-[#64748b]" />
                <p className="text-sm font-semibold text-[#f1f5f9]">This episode is for subscribers only</p>
                <p className="text-xs text-[#64748b]">🎧 Preview: first 30 seconds free — subscribe to hear the full episode</p>
                <Link
                  href="/subscribe"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Subscribe for $9/month
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ── Companies ──────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <Building2 className="w-4 h-4 text-[#64748b]" />
          {ep.companies.map((c) => (
            <span
              key={c}
              className="text-xs px-2.5 py-1 rounded-full bg-[#0f1629] border border-[#1e293b] text-[#94a3b8]"
            >
              {c}
            </span>
          ))}
          {ep.tags.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-full bg-[#0f1629] border border-[#1e293b] text-[#64748b] font-mono"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* ── Show notes ─────────────────────────────────────────────── */}
        <div className="mb-8 rounded-xl bg-[#111827] border border-[#1e293b] p-6">
          <h2 className="text-lg font-semibold text-[#f1f5f9] mb-3">Show Notes</h2>
          <p className="text-[#94a3b8] text-sm leading-relaxed mb-5">{ep.description}</p>

          <h3 className="text-sm font-semibold text-[#f1f5f9] mb-3">Key Takeaways</h3>
          <ul className="space-y-2">
            {takeaways.map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 text-${categoryColor}-400`} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Architecture diagram placeholder ───────────────────────── */}
        <div className="mb-10 rounded-xl bg-[#111827] border border-[#1e293b] p-6">
          <h2 className="text-lg font-semibold text-[#f1f5f9] mb-3">Architecture Diagram</h2>
          {ep.isFree ? (
            <div className="rounded-lg bg-[#0f1629] border border-[#1e293b] h-48 flex items-center justify-center text-[#64748b] text-sm">
              Diagram coming soon
            </div>
          ) : (
            <div className="relative rounded-lg bg-[#0f1629] border border-[#1e293b] h-48 flex items-center justify-center overflow-hidden">
              <span className="text-[#64748b] text-sm blur-sm select-none">
                Architecture diagram
              </span>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0f1629]/80">
                <Lock className="w-5 h-5 text-[#64748b]" />
                <p className="text-xs text-[#64748b]">Diagram available for subscribers</p>
                <Link
                  href="/subscribe"
                  className="text-xs text-blue-400 hover:text-blue-300 underline transition-colors"
                >
                  Unlock with $9/month
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ── Episode navigation ─────────────────────────────────────── */}
        <div className="flex gap-3">
          {prevEp && (
            <Link
              href={`/podcast/${prevEp.slug}`}
              className="flex-1 flex items-center gap-2 p-4 rounded-xl bg-[#111827] border border-[#1e293b] hover:border-blue-500/30 hover:bg-[#1a2235] transition-all group"
            >
              <ArrowLeft className="w-4 h-4 text-[#64748b] group-hover:text-blue-400 transition-colors flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-[#64748b] mb-0.5">Previous</p>
                <p className="text-sm font-medium text-[#94a3b8] group-hover:text-white truncate transition-colors">
                  {prevEp.title}
                </p>
              </div>
            </Link>
          )}
          {nextEp && (
            <Link
              href={`/podcast/${nextEp.slug}`}
              className="flex-1 flex items-center justify-end gap-2 p-4 rounded-xl bg-[#111827] border border-[#1e293b] hover:border-blue-500/30 hover:bg-[#1a2235] transition-all text-right group"
            >
              <div className="min-w-0">
                <p className="text-xs text-[#64748b] mb-0.5">Next</p>
                <p className="text-sm font-medium text-[#94a3b8] group-hover:text-white truncate transition-colors">
                  {nextEp.title}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#64748b] group-hover:text-blue-400 transition-colors flex-shrink-0" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
