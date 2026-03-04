import { NextResponse } from "next/server";
import { PODCAST_EPISODES, CATEGORY_LABELS } from "@/data/podcast";

const BASE_URL = "https://archdesign.io";
const PODCAST_TITLE = "ArchDesign Podcast";
const PODCAST_DESCRIPTION =
  "Alex & Sam break down complex system design architectures in under 7 minutes — Netflix, Kafka, Kubernetes, GPT, RAG, and more.";
const PODCAST_IMAGE = `${BASE_URL}/og-image.png`;
const PODCAST_AUTHOR = "ArchDesign.io";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = PODCAST_EPISODES.map((ep) => {
    const mp3Url = `${BASE_URL}/podcast/episodes/${ep.slug}.mp3`;
    const pageUrl = `${BASE_URL}/podcast/${ep.slug}`;
    return `
    <item>
      <title>${escapeXml(ep.title)}</title>
      <description>${escapeXml(ep.description)}</description>
      <link>${pageUrl}</link>
      <guid isPermaLink="true">${pageUrl}</guid>
      <enclosure url="${mp3Url}" type="audio/mpeg" length="0" />
      <itunes:title>${escapeXml(ep.title)}</itunes:title>
      <itunes:episode>${ep.episode}</itunes:episode>
      <itunes:author>${escapeXml(PODCAST_AUTHOR)}</itunes:author>
      <itunes:duration>${ep.duration}</itunes:duration>
      <itunes:explicit>false</itunes:explicit>
      <itunes:episodeType>full</itunes:episodeType>
      <itunes:subtitle>${escapeXml(ep.description.slice(0, 120))}</itunes:subtitle>
      <itunes:keywords>${escapeXml(ep.tags.join(", "))}</itunes:keywords>
      <itunes:category text="${escapeXml(CATEGORY_LABELS[ep.category])}" />
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(PODCAST_TITLE)}</title>
    <description>${escapeXml(PODCAST_DESCRIPTION)}</description>
    <link>${BASE_URL}/podcast</link>
    <atom:link href="${BASE_URL}/podcast.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <copyright>© ${new Date().getFullYear()} ArchDesign.io</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <itunes:author>${escapeXml(PODCAST_AUTHOR)}</itunes:author>
    <itunes:summary>${escapeXml(PODCAST_DESCRIPTION)}</itunes:summary>
    <itunes:explicit>false</itunes:explicit>
    <itunes:type>episodic</itunes:type>
    <itunes:owner>
      <itunes:name>${escapeXml(PODCAST_AUTHOR)}</itunes:name>
      <itunes:email>hello@archdesign.io</itunes:email>
    </itunes:owner>
    <itunes:image href="${PODCAST_IMAGE}" />
    <image>
      <url>${PODCAST_IMAGE}</url>
      <title>${escapeXml(PODCAST_TITLE)}</title>
      <link>${BASE_URL}/podcast</link>
    </image>
    <itunes:category text="Technology" />
    <itunes:category text="Education" />
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
