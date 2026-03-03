export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Expert";
export type Category = "Distributed Systems" | "Data & Infrastructure" | "LLM & AI Systems";

export interface ResearchPaper {
  title: string;
  authors: string;
  year: number;
  url?: string;
}

export interface DeepDiveSection {
  heading: string;
  body: string;
}

export interface Architecture {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: Category;
  difficulty: Difficulty;
  companies: string[];
  description: string;
  keyInsight: string;
  concepts: string[];
  papers: ResearchPaper[];
  diagramType: string;
  videoWeek: number;
  problem?: string;
  solution?: string;
  deepDive?: DeepDiveSection[];
  tradeoffs?: { pros: string[]; cons: string[] };
  interviewQuestions?: string[];
  scalingNumbers?: { label: string; value: string }[];
}

export const architectures: Architecture[] = [
  // ΓöÇΓöÇ DISTRIBUTED SYSTEMS ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  {
    id: 1,
    slug: "netflix-content-delivery",
    title: "Netflix Content Delivery Architecture",
    subtitle: "How Netflix streams to 260M users without a single datacenter",
    category: "Distributed Systems",
    difficulty: "Advanced",
    companies: ["Netflix", "Disney+", "Hulu"],
    description:
      "Netflix built Open Connect ΓÇö its own global CDN with 17,000+ servers embedded in ISP networks worldwide. Combined with adaptive bitrate streaming (DASH/HLS), consistent hashing for cache distribution, and a chaos engineering culture, Netflix achieves 99.99% availability while streaming 15% of global internet traffic.",
    keyInsight:
      "Moving bytes close to users (edge servers in ISPs) is always cheaper and faster than building bigger datacenters.",
    concepts: ["CDN", "Consistent Hashing", "Adaptive Bitrate Streaming", "Chaos Engineering", "Edge Caching", "Zuul API Gateway"],
    papers: [
      { title: "Netflix's Globally Distributed CDN", authors: "Netflix Tech Blog", year: 2016, url: "https://netflixtechblog.com/netflix-and-fill-c43a32b490c0" },
    ],
    diagramType: "cdn",
    videoWeek: 1,
    problem: "Netflix needs to stream 4K video to 260 million subscribers across 190 countries simultaneously. A centralized datacenter would mean every byte travels thousands of miles, causing buffering and astronomical egress costs. At peak, Netflix represents 15% of all global internet traffic — impossible to serve from one place.",
    solution: "Netflix built Open Connect — a purpose-built CDN with 17,000+ appliances physically inside ISP networks. ISPs get free hardware; Netflix eliminates egress fees. 95% of all traffic is served from ISP-embedded caches without touching the internet backbone.",
    deepDive: [
      { heading: "Open Connect Appliances — Netflix's Own CDN Hardware", body: "Unlike companies relying on Akamai or Cloudfront, Netflix designs and deploys its own CDN hardware called Open Connect Appliances (OCAs). These are high-density servers with up to 1 petabyte of storage, placed physically inside ISP datacenters worldwide. Netflix offers them to ISPs for free — ISPs save on peering costs because Netflix traffic stays local, and Netflix pays zero egress fees to transit providers. The OCA runs a custom FreeBSD-based OS optimized for high-throughput file serving." },
      { heading: "Proactive Cache Filling — Predicting What You'll Watch Tonight", body: "Every night during off-peak hours (2–4am local time), Netflix's cache-filling system pushes the next day's most-likely-watched content to nearby OCAs. The algorithm uses regional viewing patterns, day-of-week trends, new release schedules, and content popularity decay curves. Popular content is cached on thousands of OCAs globally; niche content lives on fewer. This pre-positioning means when you press play, the first byte arrives in under 50ms from a server potentially a few miles away." },
      { heading: "Consistent Hashing for Load Distribution", body: "Netflix's steering service uses consistent hashing to pick which OCA serves your request. A virtual ring maps 'content ID + client IP prefix' tuples to server clusters. The same video chunk always maps to the same OCA cluster, maximizing cache hit rates. When an OCA fails, consistent hashing minimizes remapping: only 1/N of keys move — compared to 100% remapping in a simple modulo approach." },
      { heading: "Adaptive Bitrate Streaming — Smooth Playback Despite Network Variance", body: "Netflix encodes every title at 20+ quality levels — 235 Kbps mobile to 16 Mbps 4K HDR. The client player monitors bandwidth every 10 seconds and switches quality mid-stream. If your connection drops, you get a lower-quality segment within 2 chunks (~4 seconds) rather than buffering. The AV1 codec achieves 30% better compression than H.264 at the same quality, reducing bandwidth costs significantly." },
      { heading: "Chaos Engineering — Building Confidence Through Deliberate Failure", body: "Netflix invented Chaos Engineering with Chaos Monkey — a tool that randomly terminates production instances during business hours. The broader Simian Army includes Chaos Gorilla (terminates entire AWS AZs) and Latency Monkey (introduces artificial delays). This culture means Netflix engineers routinely prove their services handle failure — so when AWS has a real region outage, Netflix users see zero downtime." },
    ],
    tradeoffs: {
      pros: ["95%+ cache hit rate eliminates origin server load", "ISP partnerships eliminate transit/egress costs entirely", "Sub-50ms video start times globally due to physical proximity", "Independent CDN means no reliance on third-party vendors during outages"],
      cons: ["Massive operational complexity managing 17,000+ servers across 1,000 ISP partners", "High upfront capital expense for OCA hardware in every market", "Cache-filling consumes ISP network bandwidth during off-peak hours", "Niche content has low cache hit rates — must fall back to origin"],
    },
    interviewQuestions: [
      "Design Netflix's CDN from scratch. Where would you start and what's the first component you'd build?",
      "A new blockbuster drops and demand is 50× predicted peak. How does Netflix handle this?",
      "Explain consistent hashing. If Netflix adds a new OCA server, what percentage of cached content needs to move?",
      "A user in rural Brazil experiences constant buffering on a 4K title. Walk through every system that could be the bottleneck.",
      "How would you design the proactive cache-filling algorithm? What data signals would you use to predict what to pre-load?",
    ],
    scalingNumbers: [
      { label: "Peak Streaming", value: "700 Tbps+" },
      { label: "OCA Servers", value: "17,000+" },
      { label: "ISP Partners", value: "1,000+" },
      { label: "Cache Hit Rate", value: "~95%" },
    ],
  },
  {
    id: 2,
    slug: "twitter-fanout-timeline",
    title: "Twitter Fan-Out & Timeline Architecture",
    subtitle: "The push vs pull dilemma at 500M tweets/day",
    category: "Distributed Systems",
    difficulty: "Advanced",
    companies: ["X (Twitter)", "Instagram", "LinkedIn"],
    description:
      "Twitter's timeline problem: when Katy Perry tweets, 100M followers need to see it in milliseconds. The naive approach ΓÇö query all followed users on every load ΓÇö doesn't scale. Twitter uses a hybrid fan-out strategy: pre-compute timelines for most users via write-time fan-out (push), but pull on read for celebrities with 10M+ followers.",
    keyInsight:
      "The celebrity problem: uniform push fan-out breaks for accounts with extreme follower counts. Hybrid models win.",
    concepts: ["Fan-out on Write", "Fan-out on Read", "Redis Sorted Sets", "Finagle RPC", "FlockDB", "Snowflake IDs"],
    papers: [
      { title: "Scaling Twitter's Ad Targeting Platform", authors: "Twitter Engineering", year: 2018 },
    ],
    diagramType: "fanout",
    videoWeek: 1,
  },
  {
    id: 3,
    slug: "uber-geospatial-architecture",
    title: "Uber Surge Pricing & Geospatial Architecture",
    subtitle: "H3 hexagonal indexing, real-time dispatch, and dynamic pricing",
    category: "Distributed Systems",
    difficulty: "Expert",
    companies: ["Uber", "Lyft", "DoorDash"],
    description:
      "Uber needs to match millions of riders and drivers in real-time across 70+ countries. The system uses H3 ΓÇö Uber's open-source hexagonal hierarchical geospatial indexing ΓÇö to partition the globe into cells. Kafka streams GPS updates, a demand/supply model computes surge pricing per cell, and a dispatch system solves the assignment problem in under 100ms.",
    keyInsight:
      "Hexagonal grids have equal-distance neighbors (unlike squares), making them ideal for proximity queries.",
    concepts: ["H3 Hexagonal Grid", "Apache Kafka", "Geofencing", "Supply/Demand Modeling", "Real-time Dispatch", "DISCO"],
    papers: [
      { title: "H3: Uber's Hexagonal Hierarchical Spatial Index", authors: "Brodsky, I. (Uber)", year: 2018, url: "https://eng.uber.com/h3/" },
    ],
    diagramType: "geo",
    videoWeek: 2,
  },
  {
    id: 4,
    slug: "whatsapp-messaging-scale",
    title: "WhatsApp Messaging at 100B Messages/Day",
    subtitle: "How 50 engineers built a system bigger than Twitter",
    category: "Distributed Systems",
    difficulty: "Expert",
    companies: ["WhatsApp", "Telegram", "Signal"],
    description:
      "WhatsApp handled 100 billion messages per day with only 50 engineers ΓÇö perhaps the highest messages-per-engineer ratio ever. The secret: Erlang/Mnesia (a distributed database built for telecom), XMPP protocol, message store-and-forward with delivery ACKs, and aggressive horizontal scaling with minimal operational complexity.",
    keyInsight:
      "Erlang was designed for telecom fault tolerance ΓÇö 9 nines reliability ΓÇö making it perfect for messaging.",
    concepts: ["Erlang/BEAM", "Mnesia DB", "XMPP Protocol", "ACK Chains", "Store-and-Forward", "FreeBSD Tuning"],
    papers: [],
    diagramType: "messaging",
    videoWeek: 2,
  },
  {
    id: 5,
    slug: "google-search-indexing",
    title: "Google Web Search Index Architecture",
    subtitle: "How Google indexes the entire web in seconds",
    category: "Distributed Systems",
    difficulty: "Expert",
    companies: ["Google", "Bing", "Yandex"],
    description:
      "Google's search infrastructure processes 8.5 billion searches/day powered by petabytes of indexed data. The pipeline: Googlebot crawls the web ΓåÆ Bigtable stores raw crawl data ΓåÆ MapReduce builds the inverted index ΓåÆ Percolator enables real-time incremental updates ΓåÆ Spanner provides globally-consistent storage ΓåÆ Serving layer queries thousands of machines in parallel under 200ms.",
    keyInsight:
      "Inverted indexes trade write complexity for read performance ΓÇö you pay the cost at index time, not query time.",
    concepts: ["Inverted Index", "MapReduce", "Bigtable", "Percolator", "PageRank", "Spanner", "Crawl Frontier"],
    papers: [
      { title: "Bigtable: A Distributed Storage System for Structured Data", authors: "Chang, F. et al. (Google)", year: 2006, url: "https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf" },
      { title: "MapReduce: Simplified Data Processing on Large Clusters", authors: "Dean, J. & Ghemawat, S. (Google)", year: 2004, url: "https://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf" },
    ],
    diagramType: "search",
    videoWeek: 3,
  },
  {
    id: 6,
    slug: "amazon-dynamodb-architecture",
    title: "Amazon DynamoDB Architecture",
    subtitle: "The Dynamo paper that changed distributed databases forever",
    category: "Distributed Systems",
    difficulty: "Expert",
    companies: ["Amazon", "LinkedIn", "Cassandra (inspired)"],
    description:
      "DynamoDB was born from Amazon's 2007 Dynamo paper ΓÇö a landmark in distributed systems. It uses consistent hashing to partition data across nodes, virtual nodes for load balancing, gossip protocol for cluster state, vector clocks for conflict detection, and tunable consistency (eventual vs strong). The paper introduced foundational tradeoffs that influenced Cassandra, Riak, and countless distributed databases.",
    keyInsight:
      "The CAP theorem isn't binary ΓÇö systems like DynamoDB let you tune where on the consistency-availability spectrum to operate per operation.",
    concepts: ["Consistent Hashing", "Virtual Nodes", "Gossip Protocol", "Vector Clocks", "Quorum Reads/Writes", "Merkle Trees", "Tunable Consistency"],
    papers: [
      { title: "Dynamo: Amazon's Highly Available Key-value Store", authors: "DeCandia, G. et al. (Amazon)", year: 2007, url: "https://dl.acm.org/doi/10.1145/1294261.1294281" },
    ],
    diagramType: "dynamo",
    videoWeek: 3,
  },
  {
    id: 7,
    slug: "youtube-video-processing",
    title: "YouTube Video Processing Pipeline",
    subtitle: "From upload to global streaming in minutes",
    category: "Distributed Systems",
    difficulty: "Advanced",
    companies: ["YouTube", "Vimeo", "TikTok"],
    description:
      "500 hours of video are uploaded to YouTube every minute. The processing pipeline: raw upload ΓåÆ chunked blob storage ΓåÆ transcoding workers (VP9/H.264/AV1 at 8+ resolutions/bitrates) ΓåÆ thumbnail generation ΓåÆ copyright detection (Content ID) ΓåÆ CDN distribution ΓåÆ recommendation indexing. All parallelized with a distributed task queue.",
    keyInsight:
      "Transcoding is embarrassingly parallel ΓÇö splitting video into segments and processing independently is 100├ù faster than sequential processing.",
    concepts: ["Blob Storage", "Transcoding Pipeline", "CDN Distribution", "Content ID Fingerprinting", "Adaptive Bitrate", "Distributed Task Queue"],
    papers: [],
    diagramType: "pipeline",
    videoWeek: 4,
  },
  {
    id: 8,
    slug: "airbnb-search-architecture",
    title: "Airbnb Search & Availability Architecture",
    subtitle: "Geo-search, ML ranking, and real-time availability at scale",
    category: "Distributed Systems",
    difficulty: "Advanced",
    companies: ["Airbnb", "Booking.com", "Expedia"],
    description:
      "Airbnb search combines geo-spatial queries (Elasticsearch with geo_distance), ML-based listing ranking (personalized by user history), real-time availability calendars, and price optimization. The ranking model is updated daily via offline training, while real-time signals (click-through, conversion) are applied via a feature store.",
    keyInsight:
      "Search quality compounds: a 1% improvement in ranking relevance drives measurable booking revenue increases.",
    concepts: ["Elasticsearch", "Geo-Distance Search", "Feature Store", "ML Ranking", "Real-time Availability", "Druid Analytics"],
    papers: [
      { title: "Applying Deep Learning To Airbnb Search", authors: "Haldar, M. et al. (Airbnb)", year: 2019, url: "https://arxiv.org/abs/1912.08081" },
    ],
    diagramType: "search",
    videoWeek: 4,
  },
  {
    id: 9,
    slug: "stripe-payment-processing",
    title: "Stripe Payment Processing Architecture",
    subtitle: "Idempotency, event sourcing, and double-entry ledgers",
    category: "Distributed Systems",
    difficulty: "Advanced",
    companies: ["Stripe", "Braintree", "Adyen"],
    description:
      "Payment systems require exactly-once semantics ΓÇö charging a card twice is catastrophic. Stripe uses idempotency keys (client-generated UUIDs) to deduplicate requests, event sourcing to maintain an immutable audit log, double-entry bookkeeping for financial accuracy, and distributed sagas for multi-step transactions (auth ΓåÆ capture ΓåÆ settle).",
    keyInsight:
      "Idempotency is non-negotiable in payments ΓÇö network retries happen, and you must guarantee the operation executes exactly once.",
    concepts: ["Idempotency Keys", "Event Sourcing", "CQRS", "Distributed Sagas", "Double-Entry Ledger", "Webhook Fan-out"],
    papers: [],
    diagramType: "payment",
    videoWeek: 5,
  },
  {
    id: 10,
    slug: "discord-real-time-messaging",
    title: "Discord Real-Time Messaging Architecture",
    subtitle: "How Discord scaled from 5M to 500M users with Elixir and Rust",
    category: "Distributed Systems",
    difficulty: "Advanced",
    companies: ["Discord", "Slack", "Teams"],
    description:
      "Discord's engineering journey is a masterclass in re-architecture. Started with Python/Mongo ΓåÆ migrated to Elixir (for massive WebSocket concurrency via the BEAM VM) ΓåÆ migrated hot storage from Cassandra to ScyllaDB (Rust-based, 10├ù faster at same cost). WebSocket connections are managed by Elixir's GenServer processes ΓÇö millions of long-lived connections with minimal memory.",
    keyInsight:
      "Erlang/BEAM's actor model makes it possible to hold millions of WebSocket connections with microsecond message passing.",
    concepts: ["WebSockets", "Elixir/Phoenix", "Actor Model", "Cassandra ΓåÆ ScyllaDB Migration", "Presence System", "Voice (WebRTC)"],
    papers: [
      { title: "How Discord Stores Billions of Messages", authors: "Discord Engineering", year: 2023, url: "https://discord.com/blog/how-discord-stores-billions-of-messages" },
    ],
    diagramType: "messaging",
    videoWeek: 5,
  },

  // ΓöÇΓöÇ DATA & INFRASTRUCTURE ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  {
    id: 11,
    slug: "spotify-music-recommendations",
    title: "Spotify Music Recommendation System",
    subtitle: "Collaborative filtering, Discover Weekly, and the AudioEmbeddings pipeline",
    category: "Data & Infrastructure",
    difficulty: "Advanced",
    companies: ["Spotify", "Apple Music", "YouTube Music"],
    description:
      "Spotify's recommendation pipeline combines three signals: collaborative filtering (users who listen to X also like Y), NLP on playlist names and music blogs, and raw audio CNNs that analyze the audio itself. The Discover Weekly playlist is generated weekly via a massive offline MapReduce ΓåÆ neural embedding ΓåÆ nearest-neighbor lookup pipeline.",
    keyInsight:
      "The best recommendation signal isn't user ratings ΓÇö it's implicit feedback (plays, skips, saves) at massive scale.",
    concepts: ["Collaborative Filtering", "Matrix Factorization", "Word2Vec", "Audio CNNs", "A/B Testing", "Apache Spark"],
    papers: [
      { title: "Deep Learning for Audio-based Music Classification and Tagging", authors: "Nam, J. et al.", year: 2018 },
    ],
    diagramType: "ml-pipeline",
    videoWeek: 6,
  },
  {
    id: 12,
    slug: "github-cicd-pipeline",
    title: "GitHub Pull Request & CI/CD Pipeline",
    subtitle: "Git internals, check suites, and the webhook fanout that powers DevOps",
    category: "Data & Infrastructure",
    difficulty: "Intermediate",
    companies: ["GitHub", "GitLab", "Bitbucket"],
    description:
      "When you push a commit, GitHub triggers a cascade: webhook fan-out to all registered CI apps, status checks API updates each commit, check suites aggregate test results, and merge queues prevent broken main branches. Git's content-addressable storage (SHA-1 blobs/trees/commits) enables efficient delta compression and distributed storage.",
    keyInsight:
      "Git is a content-addressable filesystem ΓÇö every object is identified by its SHA-1 hash, making deduplication and integrity verification trivial.",
    concepts: ["Git DAG", "Webhook Fan-out", "Check Suites API", "Merge Queues", "Pack Files", "GitHub Actions"],
    papers: [],
    diagramType: "cicd",
    videoWeek: 6,
  },
  {
    id: 13,
    slug: "linkedin-feed-ranking",
    title: "LinkedIn Feed Ranking Architecture",
    subtitle: "Heavyweight ML scoring with online/offline feature pipelines",
    category: "Data & Infrastructure",
    difficulty: "Advanced",
    companies: ["LinkedIn", "Facebook", "Twitter"],
    description:
      "LinkedIn's feed serves personalized content to 1B members. The ranking pipeline: candidate generation (retrieve top-K relevant posts per user) ΓåÆ lightweight filter (remove spam/low-quality) ΓåÆ heavyweight ML scoring (gradient boosted trees + neural nets on 1000+ features) ΓåÆ diversity injection ΓåÆ real-time feature serving. Feature store enables sub-5ms feature lookup.",
    keyInsight:
      "Two-tower ranking models separate retrieval (speed) from scoring (accuracy), making billion-scale personalization feasible.",
    concepts: ["Two-Tower Model", "Feature Store", "Candidate Retrieval", "GBDTs", "Online/Offline Features", "Diversity Injection"],
    papers: [
      { title: "The LinkedIn Feed: A Recommender System for Professionals", authors: "LinkedIn Engineering", year: 2020 },
    ],
    diagramType: "ml-pipeline",
    videoWeek: 7,
  },
  {
    id: 14,
    slug: "dropbox-sync-architecture",
    title: "Dropbox Block-Level Sync Architecture",
    subtitle: "Delta sync, content-addressing, and conflict resolution",
    category: "Data & Infrastructure",
    difficulty: "Advanced",
    companies: ["Dropbox", "Google Drive", "OneDrive"],
    description:
      "Dropbox splits files into content-addressed blocks (SHA-256 of each 4MB chunk). Only changed blocks are uploaded ΓÇö if you edit a large Word doc, only the changed blocks sync. The metadata server tracks which blocks belong to which file. Conflict resolution follows 'last-write wins' with a copy of the conflicted file preserved. A local desktop daemon monitors filesystem events for changes.",
    keyInsight:
      "Content-addressable storage means identical blocks across different files are stored once ΓÇö massive deduplication at scale.",
    concepts: ["Content-Addressable Storage", "Delta Sync", "Block Chunking", "Conflict Resolution", "LAN Sync", "Metadata Server"],
    papers: [],
    diagramType: "sync",
    videoWeek: 7,
  },
  {
    id: 15,
    slug: "facebook-social-graph-tao",
    title: "Facebook Social Graph ΓÇö TAO",
    subtitle: "The Associations & Objects model powering 2B people",
    category: "Data & Infrastructure",
    difficulty: "Expert",
    companies: ["Meta/Facebook", "Twitter", "LinkedIn"],
    description:
      "Facebook's social graph stores billions of objects (users, posts, photos) and associations (friend-of, likes, tagged-in) in TAO ΓÇö a geographically distributed cache+DB system purpose-built for social graph access patterns. TAO provides eventual consistency with read-after-write consistency within a region via a tiered cache hierarchy (leader + follower caches).",
    keyInsight:
      "Social graphs have extremely skewed access patterns ΓÇö the top 1% of objects get 99% of reads, so tiered caching is essential.",
    concepts: ["Graph Data Model", "Objects & Associations", "TAO Cache", "Eventual Consistency", "Shard Assignment", "MySQL + Memcached"],
    papers: [
      { title: "TAO: Facebook's Distributed Data Store for the Social Graph", authors: "Bronson, N. et al. (Facebook)", year: 2013, url: "https://www.usenix.org/conference/atc13/technical-sessions/presentation/bronson" },
    ],
    diagramType: "graph",
    videoWeek: 8,
  },
  {
    id: 16,
    slug: "redis-cluster-architecture",
    title: "Redis Cluster Architecture",
    subtitle: "Hash slots, gossip protocol, and replication without a coordinator",
    category: "Data & Infrastructure",
    difficulty: "Advanced",
    companies: ["Redis", "Azure Cache", "AWS ElastiCache"],
    description:
      "Redis Cluster partitions 16,384 hash slots across nodes using CRC16. No coordinator (no Zookeeper): nodes use a gossip protocol (CLUSTER MEET) to maintain cluster state. Replication is primary-replica with async replication. Failover is automatic: replicas campaign via a RAFT-like election. Lua scripts execute atomically on a single slot, maintaining data locality.",
    keyInsight:
      "16,384 slots (not 65,536) was chosen so that the cluster state (slot ownership bitmap) fits in a single Redis message.",
    concepts: ["Hash Slots", "CRC16 Hashing", "Gossip Protocol", "Primary-Replica Replication", "Automatic Failover", "Lua Scripting"],
    papers: [],
    diagramType: "cluster",
    videoWeek: 8,
  },
  {
    id: 17,
    slug: "apache-kafka-architecture",
    title: "Apache Kafka Event Streaming Architecture",
    subtitle: "Partitions, consumer groups, log compaction, and exactly-once semantics",
    category: "Data & Infrastructure",
    difficulty: "Advanced",
    companies: ["LinkedIn", "Confluent", "Uber", "Airbnb"],
    description:
      "Kafka is a distributed commit log designed for high-throughput event streaming. Topics are split into partitions (ordered, immutable logs), replicated across brokers. Consumer groups enable parallel consumption with exactly-once semantics via transactional APIs. Log compaction retains only the latest value per key ΓÇö enabling Kafka as a database. KRaft mode replaces ZooKeeper for metadata management.",
    keyInsight:
      "Kafka's breakthrough: treating a message queue as an immutable log makes it replayable, auditable, and orders of magnitude more scalable.",
    concepts: ["Partitions & Offsets", "Consumer Groups", "Log Compaction", "Exactly-Once Semantics", "KRaft", "Stream Processing"],
    papers: [
      { title: "Kafka: A Distributed Messaging System for Log Processing", authors: "Kreps, J. et al. (LinkedIn)", year: 2011, url: "https://dl.acm.org/doi/10.1145/2187980.2188022" },
    ],
    diagramType: "kafka",
    videoWeek: 9,
  },
  {
    id: 18,
    slug: "kubernetes-orchestration",
    title: "Kubernetes Container Orchestration Architecture",
    subtitle: "etcd, the scheduler, controller loops, and service mesh",
    category: "Data & Infrastructure",
    difficulty: "Advanced",
    companies: ["Google", "AWS EKS", "Azure AKS"],
    description:
      "Kubernetes is a declarative container orchestrator built from Google's Borg. Control plane: API server (REST gateway) ΓåÆ etcd (distributed state store) ΓåÆ Scheduler (bin-packing pods onto nodes) ΓåÆ Controller Manager (reconciliation loops). Data plane: kubelet (node agent), kube-proxy (iptables/IPVS networking), CRI (container runtime). All state lives in etcd; controllers continuously reconcile desired ΓåÆ actual state.",
    keyInsight:
      "Kubernetes' key abstraction: controllers watch for 'desired state Γëá actual state' and take action ΓÇö this declarative model makes the system self-healing.",
    concepts: ["etcd", "Reconciliation Loops", "Pod Scheduling", "kube-proxy", "Service Mesh (Istio)", "CRDs"],
    papers: [],
    diagramType: "k8s",
    videoWeek: 9,
  },
  {
    id: 19,
    slug: "postgresql-mvcc-wal",
    title: "PostgreSQL MVCC & Write-Ahead Log",
    subtitle: "How Postgres achieves ACID transactions with multiversion concurrency",
    category: "Data & Infrastructure",
    difficulty: "Advanced",
    companies: ["PostgreSQL", "CockroachDB", "Supabase"],
    description:
      "PostgreSQL's MVCC keeps multiple versions of each row ΓÇö readers never block writers. Every transaction sees a snapshot of the database as of its start time. Old row versions are cleaned by VACUUM. The WAL (Write-Ahead Log) records every change before applying it to data pages ΓÇö enabling crash recovery, streaming replication, and point-in-time recovery. Logical replication decodes WAL changes into row events for downstream consumers.",
    keyInsight:
      "MVCC's trade-off: reads are blazing fast (no locks), but VACUUM must periodically reclaim dead row versions ΓÇö invisible maintenance cost.",
    concepts: ["MVCC", "Write-Ahead Log", "VACUUM", "Transaction Isolation Levels", "Streaming Replication", "Logical Replication"],
    papers: [],
    diagramType: "database",
    videoWeek: 10,
  },
  {
    id: 20,
    slug: "cloudflare-edge-workers",
    title: "Cloudflare Edge Computing Architecture",
    subtitle: "Anycast routing, V8 isolates, and KV at the edge",
    category: "Data & Infrastructure",
    difficulty: "Advanced",
    companies: ["Cloudflare", "Fastly", "AWS Lambda@Edge"],
    description:
      "Cloudflare operates 300+ PoPs globally, all addressable via anycast BGP ΓÇö requests automatically route to the nearest datacenter. Workers run JavaScript in V8 isolates (not containers/VMs) ΓÇö cold start is <1ms because isolates share the V8 heap. Workers KV provides eventually-consistent global key-value storage. Durable Objects add stateful actors with strong consistency per object.",
    keyInsight:
      "V8 isolates vs containers: isolates start in microseconds (shared process, separate heap), containers start in milliseconds (separate process). Orders of magnitude difference.",
    concepts: ["Anycast BGP", "V8 Isolates", "Workers KV", "Durable Objects", "Service Workers", "Edge-side Rendering"],
    papers: [],
    diagramType: "edge",
    videoWeek: 10,
  },

  // ΓöÇΓöÇ LLM & AI SYSTEMS ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  {
    id: 21,
    slug: "gpt-inference-architecture",
    title: "GPT / Transformer Inference Architecture",
    subtitle: "KV cache, FlashAttention, quantization, and batching at scale",
    category: "LLM & AI Systems",
    difficulty: "Expert",
    companies: ["OpenAI", "Anthropic", "Google DeepMind"],
    description:
      "Serving a large language model efficiently requires solving multiple engineering challenges simultaneously: KV cache (avoid recomputing attention over the prompt on every token), FlashAttention (IO-aware attention reducing memory bandwidth bottleneck 3├ù), quantization (INT8/INT4 weights for 2-4├ù memory reduction), continuous batching (serving multiple requests with different sequence lengths in one forward pass), and tensor parallelism across multiple GPUs.",
    keyInsight:
      "LLM inference is memory-bandwidth bound, not compute-bound ΓÇö moving weights from GPU HBM to registers is the bottleneck, not the matrix multiplications.",
    concepts: ["KV Cache", "FlashAttention", "Quantization (INT8/INT4)", "Continuous Batching", "Tensor Parallelism", "Speculative Decoding"],
    papers: [
      { title: "Attention Is All You Need", authors: "Vaswani, A. et al.", year: 2017, url: "https://arxiv.org/abs/1706.03762" },
      { title: "FlashAttention: Fast and Memory-Efficient Exact Attention", authors: "Dao, T. et al.", year: 2022, url: "https://arxiv.org/abs/2205.14135" },
    ],
    diagramType: "llm-inference",
    videoWeek: 11,
  },
  {
    id: 22,
    slug: "rag-pipeline-architecture",
    title: "RAG Pipeline Architecture",
    subtitle: "Retrieval-Augmented Generation ΓÇö from PDF to production",
    category: "LLM & AI Systems",
    difficulty: "Advanced",
    companies: ["OpenAI", "LangChain", "Cohere", "Perplexity"],
    description:
      "RAG augments LLM generation with retrieved context, solving hallucination and knowledge cutoff problems. The pipeline: document ingestion (parse ΓåÆ chunk ΓåÆ embed ΓåÆ store in vector DB) ΓåÆ retrieval (encode query ΓåÆ ANN search ΓåÆ re-rank ΓåÆ inject context) ΓåÆ generation (LLM with retrieved context in prompt). Production RAG requires: chunking strategy tuning, hybrid retrieval (dense + sparse BM25 fusion), re-ranking (cross-encoder), and hallucination evaluation.",
    keyInsight:
      "Chunk size is RAG's most critical hyperparameter ΓÇö too small loses context, too large dilutes relevance signal.",
    concepts: ["Document Chunking", "Text Embeddings", "Vector Search (ANN)", "BM25 Sparse Retrieval", "Reciprocal Rank Fusion", "Re-ranking"],
    papers: [
      { title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", authors: "Lewis, P. et al. (Facebook AI)", year: 2020, url: "https://arxiv.org/abs/2005.11401" },
    ],
    diagramType: "rag",
    videoWeek: 11,
  },
  {
    id: 23,
    slug: "vector-database-internals",
    title: "Vector Database Internals",
    subtitle: "HNSW, IVF, and ANN search at billion scale",
    category: "LLM & AI Systems",
    difficulty: "Expert",
    companies: ["Pinecone", "Weaviate", "Qdrant", "pgvector"],
    description:
      "Vector databases store high-dimensional embeddings (1536-dim for text, 512-dim for images) and answer approximate nearest neighbor (ANN) queries. HNSW (Hierarchical Navigable Small World) builds a multi-layer graph index for sub-millisecond search. IVF (Inverted File Index) clusters vectors for scalable search. Production concerns: index build time, recall vs latency tradeoffs, filtering on metadata, and sharding across machines.",
    keyInsight:
      "HNSW's 'small world' property: any vector is reachable from any other vector in O(log N) hops ΓÇö inspired by social network theory.",
    concepts: ["HNSW Index", "IVF Index", "ANN Search", "Recall vs Latency", "Filtered Search", "Quantization (PQ/SQ)"],
    papers: [
      { title: "Efficient and Robust Approximate Nearest Neighbor Search Using HNSW", authors: "Malkov, Y.A. & Yashunin, D.A.", year: 2018, url: "https://arxiv.org/abs/1603.09320" },
    ],
    diagramType: "vector-db",
    videoWeek: 12,
  },
  {
    id: 24,
    slug: "llm-api-gateway",
    title: "LLM API Gateway Architecture",
    subtitle: "Rate limiting, token tracking, model routing, and cost management",
    category: "LLM & AI Systems",
    difficulty: "Advanced",
    companies: ["OpenAI", "Anthropic", "Azure OpenAI", "LiteLLM"],
    description:
      "As organizations adopt multiple LLM providers, an API gateway becomes essential. It handles: token-based rate limiting (not request-based ΓÇö LLMs charge by token), cost tracking per team/user, intelligent routing (cheapest model that meets quality threshold), fallback chains (if GPT-4 is down, route to Claude), prompt caching (identical prompts return cached responses), and semantic caching (similar prompts return cached responses).",
    keyInsight:
      "LLM rate limits are in tokens/minute, not requests/minute ΓÇö a token bucket algorithm with separate limits for input/output tokens is required.",
    concepts: ["Token Bucket Rate Limiting", "Semantic Caching", "Model Routing", "Cost Attribution", "Fallback Chains", "Prompt Management"],
    papers: [],
    diagramType: "gateway",
    videoWeek: 12,
  },
  {
    id: 25,
    slug: "multi-agent-llm-orchestration",
    title: "Multi-Agent LLM Orchestration",
    subtitle: "LangGraph state machines, tool use, memory, and human-in-the-loop",
    category: "LLM & AI Systems",
    difficulty: "Expert",
    companies: ["Anthropic", "OpenAI", "Microsoft AutoGen", "LangChain"],
    description:
      "Multi-agent systems decompose complex tasks across specialized LLM agents. LangGraph models agent workflows as directed cyclic graphs ΓÇö agents can loop, branch, and call tools. Key patterns: ReAct (Reason+Act loop), Planner-Executor (planning agent generates steps, executor agents run them), Critic (one agent reviews another's output). Memory systems: short-term (conversation history), long-term (vector DB), episodic (past task records).",
    keyInsight:
      "The hardest problem in multi-agent systems isn't intelligence ΓÇö it's reliability. Agents need structured output, retry logic, and human checkpoints.",
    concepts: ["ReAct Pattern", "LangGraph", "Tool Use / Function Calling", "Agent Memory Systems", "Human-in-the-Loop", "Structured Outputs"],
    papers: [
      { title: "ReAct: Synergizing Reasoning and Acting in Language Models", authors: "Yao, S. et al.", year: 2022, url: "https://arxiv.org/abs/2210.03629" },
    ],
    diagramType: "multi-agent",
    videoWeek: 13,
  },
  {
    id: 26,
    slug: "llm-fine-tuning-pipeline",
    title: "LLM Fine-Tuning Pipeline",
    subtitle: "LoRA, QLoRA, DPO, and the production training infrastructure",
    category: "LLM & AI Systems",
    difficulty: "Expert",
    companies: ["Hugging Face", "Mistral", "Meta (Llama)"],
    description:
      "Fine-tuning adapts a pre-trained LLM to a specific domain or task. LoRA (Low-Rank Adaptation) freezes the base model and adds small trainable adapter matrices ΓÇö reduces trainable parameters by 10,000├ù. QLoRA quantizes the base model to 4-bit while training adapters in 16-bit ΓÇö enables fine-tuning a 65B model on a single 48GB GPU. DPO (Direct Preference Optimization) replaces RLHF's reward model with a simpler contrastive objective.",
    keyInsight:
      "LoRA exploits the 'intrinsic dimensionality' hypothesis: fine-tuning changes exist in a low-dimensional subspace of the full weight space.",
    concepts: ["LoRA Adapters", "QLoRA (4-bit)", "Supervised Fine-Tuning", "DPO vs RLHF", "Evaluation Harness", "PEFT"],
    papers: [
      { title: "LoRA: Low-Rank Adaptation of Large Language Models", authors: "Hu, E.J. et al. (Microsoft)", year: 2022, url: "https://arxiv.org/abs/2106.09685" },
      { title: "QLoRA: Efficient Finetuning of Quantized LLMs", authors: "Dettmers, T. et al.", year: 2023, url: "https://arxiv.org/abs/2305.14314" },
    ],
    diagramType: "training-pipeline",
    videoWeek: 13,
  },
  {
    id: 27,
    slug: "prompt-caching-kv-cache",
    title: "Prompt Caching & KV Cache Architecture",
    subtitle: "PagedAttention, prefix caching, and speculative decoding",
    category: "LLM & AI Systems",
    difficulty: "Expert",
    companies: ["vLLM", "TensorRT-LLM", "Anthropic"],
    description:
      "The KV (key-value) cache stores computed attention states so tokens aren't reprocessed. In a naive implementation, each request has its own KV cache that wastes GPU memory on the max sequence length. PagedAttention (from vLLM) manages KV cache like virtual memory pages ΓÇö dramatically increasing GPU utilization. Prefix caching reuses KV cache for shared prompt prefixes across requests (e.g., a system prompt used by all users). Speculative decoding uses a small draft model to predict multiple tokens, then verifies in parallel.",
    keyInsight:
      "PagedAttention solved the fragmentation problem: KV cache blocks are allocated like memory pages, eliminating internal fragmentation and enabling 2-4├ù throughput improvement.",
    concepts: ["KV Cache", "PagedAttention", "Prefix Caching", "Speculative Decoding", "Continuous Batching", "GPU Memory Management"],
    papers: [
      { title: "Efficient Memory Management for Large Language Model Serving with PagedAttention", authors: "Kwon, W. et al. (vLLM)", year: 2023, url: "https://arxiv.org/abs/2309.06180" },
    ],
    diagramType: "kv-cache",
    videoWeek: 14,
  },
  {
    id: 28,
    slug: "hybrid-search-llm",
    title: "Hybrid Search Architecture for LLMs",
    subtitle: "BM25 + dense vectors, RRF reranking, and query expansion",
    category: "LLM & AI Systems",
    difficulty: "Advanced",
    companies: ["Elasticsearch", "Weaviate", "Cohere", "Perplexity"],
    description:
      "Neither dense vector search nor keyword search (BM25) alone is optimal. Dense search finds semantically similar content but misses exact keyword matches; BM25 finds exact matches but misses paraphrases. Hybrid search combines both: run parallel dense + sparse retrievals, fuse with Reciprocal Rank Fusion (RRF), then apply a cross-encoder re-ranker for final ordering. Query expansion (HyDE ΓÇö generate a hypothetical answer, embed it for better retrieval) further boosts recall.",
    keyInsight:
      "Reciprocal Rank Fusion is surprisingly effective: fusing rankings from BM25 and vector search with RRF outperforms either alone with no training required.",
    concepts: ["BM25 (TF-IDF)", "Dense Vector Search", "Reciprocal Rank Fusion", "Cross-Encoder Re-ranking", "HyDE", "Query Expansion"],
    papers: [
      { title: "Precise Zero-Shot Dense Retrieval without Relevance Labels (HyDE)", authors: "Gao, L. et al.", year: 2022, url: "https://arxiv.org/abs/2212.10496" },
    ],
    diagramType: "hybrid-search",
    videoWeek: 14,
  },
  {
    id: 29,
    slug: "ai-safety-guardrails",
    title: "AI Safety & Guardrails Architecture",
    subtitle: "Constitutional AI, RLHF, input/output filters, and red-teaming",
    category: "LLM & AI Systems",
    difficulty: "Advanced",
    companies: ["Anthropic", "OpenAI", "Meta (Llama Guard)"],
    description:
      "Production LLM deployments require safety at multiple layers: input classification (detect prompt injections, jailbreaks, PII), output filtering (toxicity, fact-checking, hallucination detection), RLHF/Constitutional AI for alignment during training, and adversarial red-teaming. Anthropic's Constitutional AI uses a set of human-written principles to train a harmless-helpful reward model without explicit human feedback labels for every output.",
    keyInsight:
      "Defense in depth: no single safety filter is reliable. Layer input filters + fine-tuned alignment + output classifiers + human review for high-risk applications.",
    concepts: ["Constitutional AI", "RLHF", "Prompt Injection Defense", "Output Classification", "Red-Teaming", "Llama Guard"],
    papers: [
      { title: "Constitutional AI: Harmlessness from AI Feedback", authors: "Bai, Y. et al. (Anthropic)", year: 2022, url: "https://arxiv.org/abs/2212.08073" },
    ],
    diagramType: "safety",
    videoWeek: 15,
  },
  {
    id: 30,
    slug: "llm-serving-infrastructure",
    title: "LLM Serving Infrastructure",
    subtitle: "vLLM, tensor parallelism, Triton Inference Server, and autoscaling",
    category: "LLM & AI Systems",
    difficulty: "Expert",
    companies: ["NVIDIA", "vLLM", "Hugging Face TGI", "AWS SageMaker"],
    description:
      "Serving LLMs at scale involves multi-layer infrastructure: model parallelism (tensor parallel across GPUs, pipeline parallel across nodes), dynamic batching via continuous batching schedulers, model quantization (GPTQ/AWQ for 4-bit), NVIDIA Triton Inference Server for multi-model deployments, Kubernetes HPA for GPU node autoscaling, and cost optimization via spot instances + model tiering (expensive models for complex queries, cheap models for simple ones).",
    keyInsight:
      "The key to LLM serving efficiency is maximizing GPU Memory Bandwidth Utilization (MBU) ΓÇö packing as many tokens/sec through the GPU's HBM as possible.",
    concepts: ["Tensor Parallelism", "Pipeline Parallelism", "Continuous Batching", "GPTQ/AWQ Quantization", "Triton Server", "GPU Autoscaling"],
    papers: [
      { title: "Orca: A Distributed Serving System for Transformer-Based Generative Models", authors: "Yu, G. et al.", year: 2022, url: "https://www.usenix.org/conference/osdi22/presentation/yu" },
    ],
    diagramType: "serving",
    videoWeek: 15,
  },
];

export const categories: Category[] = [
  "Distributed Systems",
  "Data & Infrastructure",
  "LLM & AI Systems",
];

export const difficultyColors: Record<Difficulty, string> = {
  Beginner: "badge-green",
  Intermediate: "badge-blue",
  Advanced: "badge-orange",
  Expert: "badge-red",
};

export const categoryColors: Record<Category, string> = {
  "Distributed Systems": "badge-blue",
  "Data & Infrastructure": "badge-teal",
  "LLM & AI Systems": "badge-purple",
};
