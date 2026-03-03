/** Maps week numbers (1–15) to a pair of architecture slugs. */
export const VIDEO_SCHEDULE: Record<number, [string, string]> = {
  1:  ["netflix-content-delivery",        "twitter-fanout-timeline"],
  2:  ["uber-geospatial-architecture",    "whatsapp-messaging-scale"],
  3:  ["google-search-indexing",          "amazon-dynamodb-architecture"],
  4:  ["youtube-video-processing",        "airbnb-search-architecture"],
  5:  ["stripe-payment-processing",       "discord-real-time-messaging"],
  6:  ["spotify-music-recommendations",   "github-cicd-pipeline"],
  7:  ["linkedin-feed-ranking",           "dropbox-sync-architecture"],
  8:  ["facebook-social-graph-tao",       "redis-cluster-architecture"],
  9:  ["apache-kafka-architecture",       "kubernetes-orchestration"],
  10: ["postgresql-mvcc-wal",             "cloudflare-edge-workers"],
  11: ["gpt-inference-architecture",      "rag-pipeline-architecture"],
  12: ["vector-database-internals",       "llm-api-gateway"],
  13: ["multi-agent-llm-orchestration",   "llm-fine-tuning-pipeline"],
  14: ["prompt-caching-kv-cache",         "hybrid-search-llm"],
  15: ["ai-safety-guardrails",            "llm-serving-infrastructure"],
};

const TOTAL_WEEKS = 15;
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

/**
 * Returns which week (1–15) the subscriber is currently on,
 * based on the ISO-8601 date string they subscribed at.
 * Clamps to [1, TOTAL_WEEKS].
 */
export function getCurrentWeek(subscribedAt: string): number {
  const subscribedMs = new Date(subscribedAt).getTime();
  const nowMs = Date.now();
  const weeksElapsed = Math.floor((nowMs - subscribedMs) / MS_PER_WEEK);
  // Week 1 starts on day 0 — clamp between 1 and TOTAL_WEEKS
  return Math.min(Math.max(weeksElapsed + 1, 1), TOTAL_WEEKS);
}

/**
 * Returns the two video entries for a given week, each with a placeholder
 * YouTube URL until real unlisted URLs are entered.
 */
export function getVideoUrls(
  week: number
): { slug: string; youtubeUrl: string }[] {
  const slugs = VIDEO_SCHEDULE[week];
  if (!slugs) return [];

  return [
    {
      slug: slugs[0],
      youtubeUrl: `https://youtube.com/watch?v=PLACEHOLDER_WEEK${week}_ARCH1`,
    },
    {
      slug: slugs[1],
      youtubeUrl: `https://youtube.com/watch?v=PLACEHOLDER_WEEK${week}_ARCH2`,
    },
  ];
}
