import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CheckCircle2, Building2, BookOpen } from "lucide-react";
import {
  PODCAST_EPISODES,
  CATEGORY_LABELS,
  type PodcastCategory,
} from "@/data/podcast";
import { architectures } from "@/data/architectures";

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

const ICON_COLORS: Record<PodcastCategory, string> = {
  distributed: "text-blue-400",
  "data-infrastructure": "text-purple-400",
  "llm-ai": "text-teal-400",
};

// ── Derive 3 key takeaways from the episode description ───────────────────────

function deriveKeyTakeaways(ep: (typeof PODCAST_EPISODES)[number]): string[] {
  // Extract meaningful sentences from the description
  const sentences = ep.description
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);

  const company = ep.companies[0];
  const tagLabels = ep.tags.slice(0, 3).map((t) =>
    t
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );

  // Build takeaways that mix description content with tags
  const takeaways: string[] = [];

  if (sentences.length >= 2) {
    takeaways.push(sentences[1].endsWith(".") ? sentences[1] : sentences[1] + ".");
  } else {
    takeaways.push(`Why ${company} built this architecture and the scale challenges they faced.`);
  }

  takeaways.push(
    `Core concepts covered: ${tagLabels.join(", ")}${tagLabels.length < ep.tags.length ? `, and ${ep.tags.length - tagLabels.length} more` : ""}.`
  );

  takeaways.push(
    `Key trade-offs and design decisions you can apply to your own system design interviews.`
  );

  return takeaways;
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
  const iconColor = ICON_COLORS[ep.category];
  const matchingArch = architectures.find((a) => a.slug === ep.slug);

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
                <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${iconColor}`} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Read the full article ──────────────────────────────────── */}
        {matchingArch && (
          <Link
            href={`/architecture/${matchingArch.slug}`}
            className="mb-8 flex items-center gap-4 p-5 rounded-xl bg-[#111827] border border-[#1e293b] hover:border-blue-500/30 hover:bg-[#1a2235] transition-all group"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#f1f5f9] group-hover:text-white transition-colors">
                Read the full article
              </p>
              <p className="text-xs text-[#64748b] mt-0.5 truncate">
                {matchingArch.title} — deep dive with diagrams, tradeoffs &amp; interview questions
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#64748b] group-hover:text-blue-400 transition-colors flex-shrink-0" />
          </Link>
        )}

        {/* ── Architecture diagram ────────────────────────────────────── */}
        <div className="mb-10 rounded-xl bg-[#111827] border border-[#1e293b] p-6">
          <h2 className="text-lg font-semibold text-[#f1f5f9] mb-4">Architecture Diagram</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/podcast/diagrams/${ep.slug}.png`}
            alt={`${ep.title} architecture diagram`}
            className="w-full rounded-lg border border-[#1e293b]"
            loading="lazy"
          />
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
