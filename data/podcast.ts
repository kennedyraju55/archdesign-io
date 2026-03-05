export type PodcastCategory = "distributed" | "data-infrastructure" | "llm-ai";

export interface PodcastEpisode {
  slug: string;
  title: string;
  description: string;
  episode: number;
  category: PodcastCategory;
  tags: string[];
  duration: string;
  isFree: boolean;
  mp3Url: string;
  companies: string[];
}

export const PODCAST_EPISODES: PodcastEpisode[] = [
  // ── Distributed Systems (1-10) ────────────────────────────────────────────
  {
    slug: "netflix-content-delivery",
    title: "Netflix Content Delivery",
    description:
      "Alex and Sam unpack how Netflix streams to 260M subscribers worldwide without buffering — covering Open Connect CDN, adaptive bitrate streaming, and multi-region failover.",
    episode: 1,
    category: "distributed",
    tags: ["cdn", "streaming", "adaptive-bitrate", "open-connect"],
    duration: "6:42",
    isFree: true,
    mp3Url: "/podcast/episodes/netflix-content-delivery.mp3",
    companies: ["Netflix"],
  },
  {
    slug: "twitter-fanout-timeline",
    title: "Twitter Fanout Timeline",
    description:
      "How does a single tweet from Elon reach 100M followers in milliseconds? Alex and Sam dig into Twitter's hybrid push/pull fanout architecture and Redis timeline caches.",
    episode: 2,
    category: "distributed",
    tags: ["fanout", "redis", "timeline", "write-amplification"],
    duration: "7:05",
    isFree: true,
    mp3Url: "/podcast/episodes/twitter-fanout-timeline.mp3",
    companies: ["Twitter", "X"],
  },
  {
    slug: "uber-geospatial-architecture",
    title: "Uber Geospatial Architecture",
    description:
      "Matching millions of riders and drivers in real time requires some clever geo-indexing. Alex and Sam explore H3 hexagonal grids, geohashing, and Uber's dispatch system.",
    episode: 3,
    category: "distributed",
    tags: ["geospatial", "h3", "geohash", "real-time", "matching"],
    duration: "6:58",
    isFree: true,
    mp3Url: "/podcast/episodes/uber-geospatial-architecture.mp3",
    companies: ["Uber"],
  },
  {
    slug: "whatsapp-messaging-scale",
    title: "WhatsApp Messaging at Scale",
    description:
      "WhatsApp handles 100B messages per day with just hundreds of engineers. Sam and Alex break down Erlang's actor model, message queuing, and end-to-end encryption at scale.",
    episode: 4,
    category: "distributed",
    tags: ["erlang", "messaging", "e2e-encryption", "actor-model"],
    duration: "6:15",
    isFree: true,
    mp3Url: "/podcast/episodes/whatsapp-messaging-scale.mp3",
    companies: ["WhatsApp", "Meta"],
  },
  {
    slug: "google-web-search",
    title: "Google Web Search Architecture",
    description:
      "Returning relevant results from 100B+ web pages in under 200ms is no small feat. Alex and Sam explore Googlebot, inverted indexes, PageRank, and the Bigtable serving layer.",
    episode: 5,
    category: "distributed",
    tags: ["inverted-index", "pagerank", "bigtable", "crawling"],
    duration: "7:22",
    isFree: true,
    mp3Url: "/podcast/episodes/google-web-search.mp3",
    companies: ["Google"],
  },
  {
    slug: "amazon-dynamodb",
    title: "Amazon DynamoDB Internals",
    description:
      "DynamoDB promises single-digit millisecond latency at any scale. Alex and Sam cover consistent hashing, virtual nodes, quorum reads/writes, and the original Dynamo paper.",
    episode: 6,
    category: "distributed",
    tags: ["dynamodb", "consistent-hashing", "quorum", "nosql"],
    duration: "7:18",
    isFree: true,
    mp3Url: "/podcast/episodes/amazon-dynamodb.mp3",
    companies: ["Amazon", "AWS"],
  },
  {
    slug: "youtube-video-pipeline",
    title: "YouTube Video Processing Pipeline",
    description:
      "Every minute, 500 hours of video are uploaded to YouTube. Sam and Alex trace a video from upload through transcoding, thumbnail generation, CDN distribution, and recommendation signals.",
    episode: 7,
    category: "distributed",
    tags: ["transcoding", "cdn", "ffmpeg", "upload-pipeline"],
    duration: "6:50",
    isFree: true,
    mp3Url: "/podcast/episodes/youtube-video-pipeline.mp3",
    companies: ["YouTube", "Google"],
  },
  {
    slug: "airbnb-search-availability",
    title: "Airbnb Search & Availability",
    description:
      "Searching millions of listings with real-time availability across time zones is tricky. Alex and Sam explore Airbnb's Elasticsearch setup, calendar locking, and search ranking.",
    episode: 8,
    category: "distributed",
    tags: ["elasticsearch", "availability", "search-ranking", "locking"],
    duration: "6:33",
    isFree: true,
    mp3Url: "/podcast/episodes/airbnb-search-availability.mp3",
    companies: ["Airbnb"],
  },
  {
    slug: "stripe-payment-processing",
    title: "Stripe Payment Processing",
    description:
      "Processing billions in payments requires bulletproof reliability. Sam and Alex unpack Stripe's idempotency keys, two-phase commits, and how they handle exactly-once payment guarantees.",
    episode: 9,
    category: "distributed",
    tags: ["payments", "idempotency", "two-phase-commit", "reliability"],
    duration: "7:10",
    isFree: true,
    mp3Url: "/podcast/episodes/stripe-payment-processing.mp3",
    companies: ["Stripe"],
  },
  {
    slug: "discord-real-time-messaging",
    title: "Discord Real-Time Messaging",
    description:
      "Discord serves 19M concurrent users with sub-100ms message delivery. Alex and Sam explore WebSockets, Cassandra message storage, and the infamous message ID snowflake.",
    episode: 10,
    category: "distributed",
    tags: ["websockets", "cassandra", "snowflake-id", "real-time"],
    duration: "6:47",
    isFree: true,
    mp3Url: "/podcast/episodes/discord-real-time-messaging.mp3",
    companies: ["Discord"],
  },

  // ── Data & Infrastructure (11-20) ─────────────────────────────────────────
  {
    slug: "spotify-music-recommendations",
    title: "Spotify Music Recommendations",
    description:
      "How does Discover Weekly feel like it reads your mind? Sam and Alex break down collaborative filtering, audio embeddings, Bandits for exploration, and Spotify's ML platform.",
    episode: 11,
    category: "data-infrastructure",
    tags: ["recommendations", "collaborative-filtering", "embeddings", "ml"],
    duration: "7:25",
    isFree: true,
    mp3Url: "/podcast/episodes/spotify-music-recommendations.mp3",
    companies: ["Spotify"],
  },
  {
    slug: "github-cicd-pipeline",
    title: "GitHub CI/CD Pipeline",
    description:
      "GitHub Actions runs millions of workflows daily. Alex and Sam dig into ephemeral runners, artifact caching, secrets management, and how GitHub keeps build queues fair.",
    episode: 12,
    category: "data-infrastructure",
    tags: ["ci-cd", "github-actions", "runners", "containers"],
    duration: "6:38",
    isFree: true,
    mp3Url: "/podcast/episodes/github-cicd-pipeline.mp3",
    companies: ["GitHub", "Microsoft"],
  },
  {
    slug: "linkedin-feed-ranking",
    title: "LinkedIn Feed Ranking",
    description:
      "LinkedIn's feed must balance virality, relevance, and professional tone across 900M users. Sam and Alex explore their two-tower model, feature stores, and online A/B testing.",
    episode: 13,
    category: "data-infrastructure",
    tags: ["feed-ranking", "two-tower-model", "feature-store", "a-b-testing"],
    duration: "7:12",
    isFree: true,
    mp3Url: "/podcast/episodes/linkedin-feed-ranking.mp3",
    companies: ["LinkedIn", "Microsoft"],
  },
  {
    slug: "dropbox-block-sync",
    title: "Dropbox Block Sync Architecture",
    description:
      "Syncing files across devices without uploading the whole file every time requires smart chunking. Alex and Sam explain content-defined chunking, deduplication, and delta sync.",
    episode: 14,
    category: "data-infrastructure",
    tags: ["block-sync", "chunking", "deduplication", "delta-sync"],
    duration: "6:20",
    isFree: true,
    mp3Url: "/podcast/episodes/dropbox-block-sync.mp3",
    companies: ["Dropbox"],
  },
  {
    slug: "facebook-social-graph-tao",
    title: "Facebook Social Graph & TAO",
    description:
      "Facebook's TAO (The Associations and Objects) system powers the social graph for 3B users. Sam and Alex walk through its graph data model, tiered caching, and eventual consistency.",
    episode: 15,
    category: "data-infrastructure",
    tags: ["social-graph", "tao", "graph-database", "caching"],
    duration: "7:30",
    isFree: true,
    mp3Url: "/podcast/episodes/facebook-social-graph-tao.mp3",
    companies: ["Meta", "Facebook"],
  },
  {
    slug: "redis-cluster-architecture",
    title: "Redis Cluster Architecture",
    description:
      "Redis is the Swiss Army knife of infrastructure. Alex and Sam explore Redis's single-threaded event loop, cluster sharding with hash slots, replication, and persistence options.",
    episode: 16,
    category: "data-infrastructure",
    tags: ["redis", "in-memory", "hash-slots", "replication"],
    duration: "6:55",
    isFree: true,
    mp3Url: "/podcast/episodes/redis-cluster-architecture.mp3",
    companies: ["Redis Labs"],
  },
  {
    slug: "apache-kafka-architecture",
    title: "Apache Kafka Architecture",
    description:
      "Kafka is the backbone of modern data infrastructure. Sam and Alex break down topics, partitions, consumer groups, the log-based storage model, and why Kafka's ordering guarantees matter.",
    episode: 17,
    category: "data-infrastructure",
    tags: ["kafka", "streaming", "partitions", "consumer-groups", "linkedin"],
    duration: "7:15",
    isFree: true,
    mp3Url: "/podcast/episodes/apache-kafka-architecture.mp3",
    companies: ["LinkedIn", "Confluent"],
  },
  {
    slug: "kubernetes-orchestration",
    title: "Kubernetes Orchestration",
    description:
      "How does Kubernetes decide where to run your containers? Alex and Sam cover the control plane, etcd, the scheduler, kubelet, and how self-healing keeps services alive.",
    episode: 18,
    category: "data-infrastructure",
    tags: ["kubernetes", "containers", "orchestration", "etcd", "scheduler"],
    duration: "7:08",
    isFree: true,
    mp3Url: "/podcast/episodes/kubernetes-orchestration.mp3",
    companies: ["Google", "CNCF"],
  },
  {
    slug: "postgresql-mvcc-wal",
    title: "PostgreSQL MVCC & WAL",
    description:
      "Postgres handles thousands of concurrent transactions without locking your table. Sam and Alex explain Multi-Version Concurrency Control, the Write-Ahead Log, and VACUUM.",
    episode: 19,
    category: "data-infrastructure",
    tags: ["postgresql", "mvcc", "wal", "transactions", "acid"],
    duration: "6:48",
    isFree: true,
    mp3Url: "/podcast/episodes/postgresql-mvcc-wal.mp3",
    companies: ["PostgreSQL"],
  },
  {
    slug: "cloudflare-edge-workers",
    title: "Cloudflare Edge Workers",
    description:
      "Running code at 300 PoPs worldwide with sub-millisecond cold starts sounds impossible. Alex and Sam explore V8 isolates, the edge execution model, and Cloudflare's global network.",
    episode: 20,
    category: "data-infrastructure",
    tags: ["edge-computing", "v8-isolates", "cdn", "workers", "serverless"],
    duration: "6:30",
    isFree: true,
    mp3Url: "/podcast/episodes/cloudflare-edge-workers.mp3",
    companies: ["Cloudflare"],
  },

  // ── LLM & AI (21-30) ─────────────────────────────────────────────────────
  {
    slug: "gpt-inference-architecture",
    title: "GPT Inference Architecture",
    description:
      "Serving GPT-4 to millions of users concurrently requires a novel approach to batching and memory. Sam and Alex cover KV caching, continuous batching, tensor parallelism, and flash attention.",
    episode: 21,
    category: "llm-ai",
    tags: ["gpt", "inference", "kv-cache", "tensor-parallelism"],
    duration: "7:28",
    isFree: true,
    mp3Url: "/podcast/episodes/gpt-inference-architecture.mp3",
    companies: ["OpenAI"],
  },
  {
    slug: "rag-pipeline-architecture",
    title: "RAG Pipeline Architecture",
    description:
      "Retrieval-Augmented Generation lets LLMs answer questions about your private data without retraining. Alex and Sam walk through chunking, embedding, vector search, and context stuffing.",
    episode: 22,
    category: "llm-ai",
    tags: ["rag", "retrieval", "embeddings", "vector-search", "llm"],
    duration: "7:02",
    isFree: true,
    mp3Url: "/podcast/episodes/rag-pipeline-architecture.mp3",
    companies: ["OpenAI", "Pinecone", "LangChain"],
  },
  {
    slug: "vector-database-internals",
    title: "Vector Database Internals",
    description:
      "Vector databases are the storage layer of the AI era. Sam and Alex go deep on HNSW approximate nearest neighbor search, quantization, and why Pinecone chose a serverless architecture.",
    episode: 23,
    category: "llm-ai",
    tags: ["vector-db", "hnsw", "ann", "quantization", "pinecone"],
    duration: "6:55",
    isFree: true,
    mp3Url: "/podcast/episodes/vector-database-internals.mp3",
    companies: ["Pinecone", "Weaviate", "Chroma"],
  },
  {
    slug: "llm-api-gateway",
    title: "LLM API Gateway",
    description:
      "An LLM gateway sits between your app and multiple model providers, handling rate limiting, cost routing, and fallbacks. Alex and Sam design one from scratch.",
    episode: 24,
    category: "llm-ai",
    tags: ["api-gateway", "rate-limiting", "llm", "cost-optimization"],
    duration: "6:40",
    isFree: true,
    mp3Url: "/podcast/episodes/llm-api-gateway.mp3",
    companies: ["OpenAI", "Anthropic", "Azure"],
  },
  {
    slug: "multi-agent-orchestration",
    title: "Multi-Agent Orchestration",
    description:
      "When a single LLM call isn't enough, you need multiple agents collaborating. Sam and Alex explore orchestrator-worker patterns, tool use, memory, and common failure modes.",
    episode: 25,
    category: "llm-ai",
    tags: ["agents", "orchestration", "tool-use", "langgraph"],
    duration: "7:20",
    isFree: true,
    mp3Url: "/podcast/episodes/multi-agent-orchestration.mp3",
    companies: ["OpenAI", "Anthropic", "LangChain"],
  },
  {
    slug: "llm-fine-tuning-pipeline",
    title: "LLM Fine-Tuning Pipeline",
    description:
      "Fine-tuning an LLM on your own data can dramatically improve domain performance. Alex and Sam cover LoRA, QLoRA, SFT, RLHF, and how to build a practical fine-tuning pipeline.",
    episode: 26,
    category: "llm-ai",
    tags: ["fine-tuning", "lora", "qlora", "rlhf", "sft"],
    duration: "7:18",
    isFree: true,
    mp3Url: "/podcast/episodes/llm-fine-tuning-pipeline.mp3",
    companies: ["HuggingFace", "OpenAI", "Axolotl"],
  },
  {
    slug: "prompt-caching-kv-cache",
    title: "Prompt Caching & KV Cache",
    description:
      "Caching prompt prefixes can cut LLM costs by 90%. Sam and Alex explain the KV cache, prompt caching in Anthropic's Claude API, and how to architect applications to benefit.",
    episode: 27,
    category: "llm-ai",
    tags: ["prompt-caching", "kv-cache", "cost-reduction", "latency"],
    duration: "6:10",
    isFree: true,
    mp3Url: "/podcast/episodes/prompt-caching-kv-cache.mp3",
    companies: ["Anthropic", "OpenAI"],
  },
  {
    slug: "hybrid-search-llms",
    title: "Hybrid Search for LLMs",
    description:
      "Pure vector search misses keyword matches; pure BM25 misses semantic meaning. Alex and Sam explore hybrid search, reciprocal rank fusion, and reranking for better RAG retrieval.",
    episode: 28,
    category: "llm-ai",
    tags: ["hybrid-search", "bm25", "reranking", "rag", "retrieval"],
    duration: "6:52",
    isFree: true,
    mp3Url: "/podcast/episodes/hybrid-search-llms.mp3",
    companies: ["Cohere", "Pinecone", "Weaviate"],
  },
  {
    slug: "ai-safety-guardrails",
    title: "AI Safety Guardrails",
    description:
      "Deploying LLMs in production requires guardrails to prevent harmful outputs. Sam and Alex cover input/output filtering, constitutional AI, red-teaming, and practical safety architectures.",
    episode: 29,
    category: "llm-ai",
    tags: ["safety", "guardrails", "red-teaming", "constitutional-ai"],
    duration: "7:05",
    isFree: true,
    mp3Url: "/podcast/episodes/ai-safety-guardrails.mp3",
    companies: ["Anthropic", "OpenAI", "Llama Guard"],
  },
  {
    slug: "llm-serving-infrastructure",
    title: "LLM Serving Infrastructure",
    description:
      "Serving LLMs at scale requires purpose-built infrastructure. Alex and Sam discuss vLLM, PagedAttention, speculative decoding, and how cloud providers think about GPU cluster scheduling.",
    episode: 30,
    category: "llm-ai",
    tags: ["vllm", "paged-attention", "speculative-decoding", "gpu-cluster"],
    duration: "7:30",
    isFree: true,
    mp3Url: "/podcast/episodes/llm-serving-infrastructure.mp3",
    companies: ["vLLM", "NVIDIA", "AWS"],
  },
];

export const CATEGORY_LABELS: Record<PodcastCategory, string> = {
  distributed: "Distributed Systems",
  "data-infrastructure": "Data & Infrastructure",
  "llm-ai": "LLM & AI",
};

export const CATEGORY_COLORS: Record<PodcastCategory, string> = {
  distributed: "blue",
  "data-infrastructure": "purple",
  "llm-ai": "teal",
};

