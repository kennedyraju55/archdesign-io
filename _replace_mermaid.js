const fs = require('fs');
let content = fs.readFileSync('data/architectures.ts', 'utf-8');

// Define replacements in REVERSE order (bottom-to-top) so index shifts don't matter
const replacements = [
  {
    slug: "facebook-social-graph-tao",
    mermaidDef: `graph TD
    APP[Facebook App] -->|Graph Query| FOLLOWER[Follower Cache]

    subgraph Region["Datacenter Region"]
        FOLLOWER
        FOLLOWER2[Follower Cache 2]
        LEADER[Leader Cache]
    end

    FOLLOWER -->|Cache Hit 96%| APP
    FOLLOWER -->|Cache Miss| LEADER
    LEADER -->|Cache Miss| MYSQL[Sharded MySQL Backend]
    MYSQL -->|Objects + Associations| LEADER
    LEADER -->|Fill| FOLLOWER

    subgraph DataModel["TAO Data Model"]
        OBJ[Objects: Users Posts Photos]
        ASSOC[Associations: friend_of likes tagged_in]
        ALIST[Association Lists by Timestamp]
    end

    MYSQL --> OBJ
    MYSQL --> ASSOC
    ASSOC --> ALIST

    subgraph Write["Write Path"]
        WLEADER[Write to Leader Cache]
        WINVAL[Invalidate Follower Caches]
        WMYSQL[Persist to MySQL]
    end

    APP -->|Write Request| WLEADER
    WLEADER --> WMYSQL
    WLEADER --> WINVAL

    subgraph CrossRegion["Cross-Region Replication"]
        REPL[Async MySQL Replication]
        REGION2[Remote Region Leader + Followers]
    end

    WMYSQL --> REPL
    REPL --> REGION2

    subgraph Protection["Thundering Herd"]
        COLLAPSE[Request Collapse Queue]
    end

    FOLLOWER -->|Miss on Hot Key| COLLAPSE
    COLLAPSE -->|Single Request| LEADER

    style APP fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style LEADER fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style MYSQL fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style COLLAPSE fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0`,
    howItWorks: `\u2460 Facebook app issues a graph query to the nearest Follower Cache \u2192 \u2461 Follower Cache checks its local store with >96% hit rate, serving most reads without touching the database \u2192 \u2462 On cache miss, Follower forwards to the Leader Cache, the single source of truth for the region \u2192 \u2463 Leader checks its store; on miss, queries Sharded MySQL which stores Objects (users, posts, photos) and Associations (friend_of, likes, tagged_in) in timestamp-sorted lists \u2192 \u2464 Response flows back MySQL to Leader to Follower to App, each layer caching the result \u2192 \u2465 Writes go to Leader Cache, persist to MySQL, and synchronously invalidate Follower Caches for read-after-write consistency within the region \u2192 \u2466 Cross-region consistency is eventual via async MySQL replication \u2192 \u2467 Thundering herd protection collapses concurrent cache misses for viral content into a single Leader request, preventing cascading storms`
  },
  {
    slug: "dropbox-sync-architecture",
    mermaidDef: `graph TD
    EDIT[User Edits File] -->|FSEvents / inotify| DAEMON[Desktop Sync Daemon]

    subgraph Chunking["Block-Level Processing"]
        CHUNKER[4 MB Block Chunker]
        HASHER[SHA-256 Hash Computer]
        DELTA{Changed Blocks Only}
    end

    DAEMON --> CHUNKER
    CHUNKER --> HASHER
    HASHER --> DELTA

    DELTA -->|New Hashes| META[Metadata Server Sharded MySQL]
    META -->|Hash Exists?| DEDUP{Global Dedup Check}
    DEDUP -->|Already Stored| SKIP[Skip Upload]
    DEDUP -->|New Block| UPLOAD[Upload Block]
    UPLOAD --> S3[S3 Block Store]

    META -->|Update Mapping| JOURNAL[Server Journal + Cursor]
    JOURNAL -->|Notify| SYNC[Other Devices]

    subgraph LAN["LAN Sync"]
        DISCOVER[UDP Peer Discovery]
        P2P[Direct Block Transfer]
    end

    SYNC --> DISCOVER
    DISCOVER --> P2P

    subgraph Conflict["Conflict Resolution"]
        LWW[Last-Writer-Wins]
        COPY[Conflicted Copy Preserved]
    end

    META -->|Concurrent Edits| LWW
    LWW --> COPY

    style EDIT fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style HASHER fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style META fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style S3 fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0`,
    howItWorks: `\u2460 User edits a file and the Desktop Sync Daemon detects the change instantly via OS filesystem events (FSEvents, inotify, ReadDirectoryChangesW) \u2192 \u2461 File is split into 4 MB content-addressed blocks and SHA-256 hash is computed for each chunk \u2192 \u2462 Only blocks whose hashes changed are identified for upload, so editing one slide in a 2 GB presentation transmits just the modified 4 MB block \u2192 \u2463 Client sends new block hashes to the Metadata Server which performs a global dedup check across 700M+ users, skipping upload if the block already exists \u2192 \u2464 New blocks are uploaded with LZ4 compression to S3 Block Store \u2192 \u2465 Metadata Server updates the file-to-block mapping and appends a journal entry with a monotonic cursor \u2192 \u2466 Other devices poll for journal entries since their last cursor and download only changed blocks; LAN Sync discovers local peers via UDP broadcast for direct transfer at network speed \u2192 \u2467 On conflict from concurrent offline edits, last-writer-wins becomes canonical and a conflicted copy is preserved so no data is silently lost`
  },
  {
    slug: "linkedin-feed-ranking",
    mermaidDef: `graph TD
    MEMBER[LinkedIn Member] -->|Open Feed| GATEWAY[API Gateway]

    subgraph Retrieval["Candidate Generation"]
        TWOTOWER[Two-Tower Neural Model]
        MEMB_EMB[Member Embedding Tower]
        POST_EMB[Post Embedding Tower]
        ANN_SEARCH[ANN Vector Search]
    end

    GATEWAY --> TWOTOWER
    TWOTOWER --> MEMB_EMB
    TWOTOWER --> POST_EMB
    MEMB_EMB --> ANN_SEARCH
    POST_EMB --> ANN_SEARCH

    subgraph Ranking["Multi-Stage Scoring"]
        PASS1[First Pass Lightweight GBDT]
        FSTORE[Venice Feature Store]
        PASS2[Second Pass Deep Neural Net]
        MULTI[Multi-Objective Function]
    end

    ANN_SEARCH -->|1000 Candidates| PASS1
    FSTORE -->|Offline + Online Features| PASS1
    FSTORE -->|1000+ Features| PASS2
    PASS1 -->|200 Candidates| PASS2
    PASS2 --> MULTI

    subgraph PostProcess["Feed Assembly"]
        DIVERSE[Diversity Injection]
        QUALITY[Anti-Viral Quality Filter]
        ADS[Ad Insertion Layer]
    end

    MULTI --> DIVERSE
    DIVERSE --> QUALITY
    QUALITY --> ADS
    ADS -->|Personalized Feed| MEMBER

    style MEMBER fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style TWOTOWER fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style PASS2 fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style FSTORE fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0`,
    howItWorks: `\u2460 Member opens their LinkedIn feed, triggering a request to the API Gateway \u2192 \u2461 Two-Tower retrieval model encodes the member and each post into separate embedding vectors with post embeddings precomputed offline \u2192 \u2462 Approximate Nearest Neighbor search finds the top 1,000 candidate posts by vector similarity in milliseconds \u2192 \u2463 First-pass lightweight GBDT model scores all candidates in under 10ms using features from Venice Feature Store \u2192 \u2464 Top 200 candidates are re-ranked by a heavyweight deep neural network consuming 1,000+ features including seniority, content-topic affinity, author authority, and interaction history \u2192 \u2465 Multi-objective function combines predicted like, comment, share, and long-dwell probabilities \u2192 \u2466 Diversity Injection enforces variety across content type, author, topic, and network distance while Anti-Viral Quality Filter demotes engagement-bait \u2192 \u2467 Ad Insertion Layer places sponsored content at designated slots and the final personalized feed is delivered`
  },
  {
    slug: "github-cicd-pipeline",
    mermaidDef: `graph TD
    DEV[Developer] -->|git push| GIT[Git Content-Addressable Store]

    subgraph GitInternals["Git Object Model"]
        BLOB[SHA-1 Blobs]
        TREE[Tree Objects]
        COMMIT_OBJ[Commit DAG]
        PACK[Delta-Compressed Packfiles]
    end

    GIT --> BLOB
    BLOB --> TREE
    TREE --> COMMIT_OBJ
    COMMIT_OBJ --> PACK

    GIT -->|Push Event| BUS[Event Bus]

    subgraph Webhooks["Webhook Fan-Out"]
        WH1[GitHub Actions]
        WH2[External CI CircleCI]
        WH3[Chat Bot Slack]
        WHN[N Registered Receivers]
    end

    BUS --> WH1
    BUS --> WH2
    BUS --> WH3
    BUS --> WHN

    subgraph CI["CI/CD Pipeline"]
        RUNNER[Actions Runner Fleet]
        CHECKS[Check Suites API]
        STATUS[Commit Status]
    end

    WH1 --> RUNNER
    RUNNER -->|Results| CHECKS
    WH2 -->|Results| CHECKS
    CHECKS --> STATUS

    STATUS -->|All Green| MQ[Merge Queue]
    MQ -->|Rebase + Test Combined| MAIN[Protected Main Branch]

    style DEV fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style BUS fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style CHECKS fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style MQ fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0`,
    howItWorks: `\u2460 Developer pushes commits and Git stores each file as a SHA-1 addressed blob, directories as tree objects, and snapshots as commit objects in a content-addressable DAG \u2192 \u2461 Packfiles delta-compress similar objects for efficient storage and transfer \u2192 \u2462 Push event hits the Event Bus which triggers parallel webhook HTTP POST delivery to all registered receivers with at-least-once guarantees \u2192 \u2463 GitHub Actions spins up runner containers from the workflow YAML to execute build, test, and lint jobs \u2192 \u2464 External CI providers receive the same webhook and run their own pipelines \u2192 \u2465 All providers report results via the Check Suites API, aggregating into a unified commit status \u2192 \u2466 Branch protection rules enforce that required check suites pass before merge \u2192 \u2467 Merge Queue serializes tested merges by rebasing each PR on the queue head and re-running CI against the combined result, preventing independently-passing PRs from breaking together`
  },
  {
    slug: "spotify-music-recommendations",
    mermaidDef: `graph TD
    LISTEN[User Listening Events] -->|Plays Skips Saves| KAFKA[Apache Kafka]

    subgraph Offline["Offline Pipeline Weekend Batch"]
        SPARK[Apache Spark Job]
        MATFACT[Matrix Factorization]
        USEREMB[User Embeddings 128-d]
        TRACKEMB[Track Embeddings 128-d]
    end

    KAFKA --> SPARK
    SPARK --> MATFACT
    MATFACT --> USEREMB
    MATFACT --> TRACKEMB

    subgraph ColdStart["Cold-Start Signals"]
        NLP[NLP Playlist and Blog Text]
        AUDIOCNN[Audio CNN Mel Spectrograms]
    end

    NLP -->|Semantic Embeddings| TRACKEMB
    AUDIOCNN -->|Audio Features| TRACKEMB

    subgraph Serving["Discover Weekly Assembly"]
        ANN_LOOKUP[Approximate Nearest Neighbor]
        FILTER[Already-Heard Filter]
        DIV_RULES[Diversity Rules]
        RANKER[Multi-Objective Ranker]
    end

    USEREMB --> ANN_LOOKUP
    TRACKEMB --> ANN_LOOKUP
    ANN_LOOKUP -->|Top-K Candidates| FILTER
    FILTER --> DIV_RULES
    DIV_RULES --> RANKER
    RANKER -->|30-Track Playlist| DW[Discover Weekly]
    DW --> USER[600M+ Users]

    style LISTEN fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style MATFACT fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style ANN_LOOKUP fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style DW fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0`,
    howItWorks: `\u2460 Billions of daily listening events (plays, skips, saves, playlist adds) stream through Kafka into the data lake \u2192 \u2461 Weekend batch Apache Spark job processes the user-track interaction matrix using implicit matrix factorization, producing 128-dimensional user and track embedding vectors \u2192 \u2462 For cold-start tracks with no listening data, NLP models analyze playlist titles and music blog text to derive semantic embeddings \u2192 \u2463 For extreme cold-start with no web presence, Audio CNNs extract features directly from mel-spectrograms trained to predict collaborative filtering embeddings \u2192 \u2464 All three signal types are combined in a unified embedding space \u2192 \u2465 Approximate Nearest Neighbor search finds candidate tracks closest to each user embedding from 100M+ tracks \u2192 \u2466 Already-heard tracks are filtered, diversity rules prevent genre monotony, and a multi-objective ranker balances predicted engagement with exploration \u2192 \u2467 Final 30-track Discover Weekly playlist is assembled and delivered to 100M+ listeners every Monday`
  },
  {
    slug: "discord-real-time-messaging",
    mermaidDef: `graph TD
    USER_CLIENT[User Client] -->|WebSocket Connect| GW[Elixir Gateway Server]

    subgraph BEAM_VM["BEAM VM Millions of Processes"]
        SESS[Session GenServer]
        GUILD_GS[Guild GenServer]
        CHAN_FANOUT[Channel Fan-Out]
    end

    GW --> SESS
    SESS -->|Join Guild| GUILD_GS
    USER_CLIENT -->|Send Message| SESS
    SESS --> GUILD_GS
    GUILD_GS --> CHAN_FANOUT
    CHAN_FANOUT -->|Push to All Members| SESS

    subgraph Storage["Message Persistence"]
        SCYLLA[ScyllaDB Cluster]
        BUCKET[Channel + Time Bucket Partition]
    end

    GUILD_GS -->|Write Message| SCYLLA
    SCYLLA --> BUCKET

    subgraph Presence["Presence System"]
        PTRACK[Presence Tracker]
        PBATCH[Batched Status Updates]
    end

    SESS -->|Status Change| PTRACK
    PTRACK --> PBATCH
    PBATCH -->|Fan-Out to Guilds| GUILD_GS

    subgraph Voice["Voice Layer"]
        SFU[WebRTC SFU Server]
        SPEAKER[Dominant Speaker Detection]
    end

    USER_CLIENT -->|Voice Join| SFU
    SFU --> SPEAKER
    SPEAKER -->|Selective Forward| USER_CLIENT

    style USER_CLIENT fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style GUILD_GS fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style SCYLLA fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style SFU fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0`,
    howItWorks: `\u2460 User connects via WebSocket to an Elixir Gateway Server running on the BEAM VM \u2192 \u2461 A dedicated Session GenServer process is spawned per connection using only 2 KB memory with its own isolated heap \u2192 \u2462 User joins a guild and their session links to the Guild GenServer tracking all connected members \u2192 \u2463 Message flows from Session to Guild GenServer to Channel Fan-Out which pushes to all connected members with microsecond message passing \u2192 \u2464 Message is simultaneously written to ScyllaDB partitioned by channel_id and time_bucket for optimal recent-message reads with single-digit ms p99 latency \u2192 \u2465 Presence Tracker monitors online/idle/DND status changes and batches updates to avoid cascading storms in large guilds \u2192 \u2466 Voice channels use WebRTC Selective Forwarding Units where the SFU detects the dominant speaker and selectively forwards only active audio streams \u2192 \u2467 Regional SFU deployment minimizes voice latency while Opus codec at 64 kbps delivers high-quality audio`
  },
  {
    slug: "stripe-payment-processing",
    mermaidDef: `graph TD
    MERCHANT[Merchant App] -->|Charge + Idempotency Key| API[Stripe API Gateway]

    subgraph Dedup["Exactly-Once Layer"]
        IDEM[Idempotency Store]
        CHECK_KEY{Key Exists?}
    end

    API --> CHECK_KEY
    CHECK_KEY -->|Yes Return Stored| MERCHANT
    CHECK_KEY -->|No Proceed| FRAUD[Stripe Radar ML Scoring]

    subgraph Saga["Payment Saga Orchestrator"]
        AUTH[Card Network Authorization]
        CAPTURE_STEP[Capture Funds]
        SETTLE[Settlement Batch]
        PAY_OUT[Merchant Payout]
    end

    FRAUD -->|Approved| AUTH
    FRAUD -->|High Risk| BLOCK[Block or 3DS Challenge]
    AUTH -->|Approved| CAPTURE_STEP
    CAPTURE_STEP --> SETTLE
    SETTLE --> PAY_OUT
    AUTH -->|Declined| COMP[Compensating Void]

    subgraph Ledger["Financial Integrity"]
        EVT_LOG[Immutable Event Log]
        DBL_ENTRY[Double-Entry Ledger]
        WH_FAN[Webhook Fan-Out]
    end

    AUTH --> EVT_LOG
    CAPTURE_STEP --> EVT_LOG
    EVT_LOG --> DBL_ENTRY
    EVT_LOG --> WH_FAN
    WH_FAN -->|payment.succeeded| MERCHANT

    style MERCHANT fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style IDEM fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style AUTH fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style EVT_LOG fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0`,
    howItWorks: `\u2460 Merchant app sends a charge request with a client-generated idempotency key UUID to Stripe API \u2192 \u2461 Idempotency Store checks if the key exists and returns the stored response on duplicate, guaranteeing exactly-once semantics \u2192 \u2462 Stripe Radar ML model scores fraud probability in under 100ms using card fingerprint, IP geolocation, device attributes, and transaction velocity \u2192 \u2463 Payment Saga Orchestrator sends authorization to the card network (Visa/Mastercard); on decline, a compensating void is issued \u2192 \u2464 On approval, funds are captured and an immutable event is appended to the event log tracking every state transition \u2192 \u2465 Double-entry ledger records matching debit and credit entries ensuring books always balance to zero \u2192 \u2466 Settlement batch processes captured payments and initiates merchant payouts on the configured schedule \u2192 \u2467 Webhook fan-out delivers payment.succeeded events to merchant endpoints with at-least-once delivery and exponential backoff retries`
  },
  {
    slug: "airbnb-search-architecture",
    mermaidDef: `graph TD
    GUEST[Guest Search Query] -->|Location Dates Filters| GATEWAY[API Gateway]

    subgraph Retrieval["Candidate Retrieval"]
        ES[Elasticsearch Cluster]
        GEOFILT[Geo-Distance Filter]
        HARDFILT[Hard Filters Price Guests Type]
    end

    GATEWAY --> ES
    ES --> GEOFILT
    GEOFILT --> HARDFILT

    subgraph Ranking["ML Ranking Pipeline"]
        PASS1_MODEL[First Pass GBDT Scorer]
        FEAT_STORE[Real-Time Feature Store]
        PASS2_MODEL[Second Pass Deep Neural Net]
        DIVERSITY_INJ[Diversity Injector]
    end

    HARDFILT -->|2000 Candidates| PASS1_MODEL
    FEAT_STORE -->|1000+ Features| PASS1_MODEL
    FEAT_STORE -->|1000+ Features| PASS2_MODEL
    PASS1_MODEL -->|100 Candidates| PASS2_MODEL
    PASS2_MODEL --> DIVERSITY_INJ

    CALENDAR[Availability Calendar Service] -->|Real-Time Check| DIVERSITY_INJ
    DIVERSITY_INJ -->|Final Ranked Results| GUEST

    subgraph Features["Feature Sources"]
        SESSION_BHV[Session Behavior]
        USER_HIST[User History]
        LIST_QUAL[Listing Quality Signals]
    end

    SESSION_BHV --> FEAT_STORE
    USER_HIST --> FEAT_STORE
    LIST_QUAL --> FEAT_STORE

    style GUEST fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style ES fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style PASS2_MODEL fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style CALENDAR fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0`,
    howItWorks: `\u2460 Guest submits a search with location, dates, price range, and guest count \u2192 \u2461 Elasticsearch executes a geo_distance query on the map viewport pruning millions of listings to thousands within the radius \u2192 \u2462 Hard filters for price, property type, amenities, and guest capacity narrow candidates to roughly 2,000 \u2192 \u2463 First-pass GBDT model scores all candidates in under 10ms using lightweight features from the Feature Store \u2192 \u2464 Top 100 candidates are re-ranked by a heavyweight deep neural network consuming 1,000+ features including user history, listing conversion rates, and host response time \u2192 \u2465 Diversity Injector re-ranks to enforce variety across property type, price tier, and neighborhood \u2192 \u2466 Availability Calendar Service performs a real-time check against each listing reservation state with sub-second consistency filtering out just-booked listings \u2192 \u2467 Final ranked results are returned with continuous A/B experiments measuring bookings-per-search to optimize ranking`
  },
  {
    slug: "youtube-video-processing",
    mermaidDef: `graph LR
    CREATOR[Creator Upload] -->|Resumable Chunks| BLOB[Colossus Blob Store]

    subgraph Pipeline["Parallel Processing DAG"]
        SPLIT[GOP Segment Splitter]
        T_VP9[Transcode VP9]
        T_H264[Transcode H.264]
        T_AV1[Transcode AV1]
        THUMB[Thumbnail Generator]
        CONTENT_ID[Content ID Fingerprint]
    end

    BLOB --> SPLIT
    SPLIT --> T_VP9
    SPLIT --> T_H264
    SPLIT --> T_AV1
    SPLIT --> THUMB
    BLOB --> CONTENT_ID

    subgraph Output["Rendition Assembly"]
        MANIFEST[DASH and HLS Manifest]
        RENDITIONS[8-20 Quality Levels]
    end

    T_VP9 --> RENDITIONS
    T_H264 --> RENDITIONS
    T_AV1 --> RENDITIONS
    RENDITIONS --> MANIFEST

    MANIFEST -->|Incremental Push| CDN_EDGE[Google Global CDN]
    CDN_EDGE -->|Adaptive Stream| VIEWER[Viewer Device]

    CONTENT_ID -->|Match Found| RIGHTS_POL{Rights Holder Policy}
    RIGHTS_POL -->|Block Monetize Track| MANIFEST

    style CREATOR fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style SPLIT fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style CDN_EDGE fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style CONTENT_ID fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0`,
    howItWorks: `\u2460 Creator uploads video via resumable chunked upload API where dropped connections only retransmit missing chunks \u2192 \u2461 Raw chunks are stored in Colossus distributed filesystem with a unique blob ID \u2192 \u2462 GOP Segment Splitter divides the video into 2-5 second Groups of Pictures aligned at keyframes \u2192 \u2463 Each segment is independently transcoded in parallel across a distributed worker fleet into VP9, H.264, and AV1 at 8-20 resolution and bitrate combinations from 144p to 4K HDR \u2192 \u2464 Content ID runs simultaneously generating audio and video perceptual fingerprints compared against millions of copyrighted reference files \u2192 \u2465 Completed renditions are assembled into DASH and HLS manifests listing all available quality levels \u2192 \u2466 Low-resolution versions are incrementally pushed to Google global CDN within minutes before higher-quality encodes finish \u2192 \u2467 Viewer adaptive bitrate player selects segments based on real-time bandwidth estimation switching quality at segment boundaries`
  },
  {
    slug: "amazon-dynamodb-architecture",
    mermaidDef: `graph TD
    CLIENT[Client Application] -->|Put/Get Key| LB[Request Router]

    subgraph Ring["Consistent Hash Ring 16384 Slots"]
        VNODE_A1[Virtual Node A1]
        VNODE_B1[Virtual Node B1]
        VNODE_C1[Virtual Node C1]
        VNODE_A2[Virtual Node A2]
    end

    LB -->|Hash Key to Ring| VNODE_A1
    VNODE_A1 -->|Replicate N=3| VNODE_B1
    VNODE_A1 -->|Replicate N=3| VNODE_C1

    subgraph Quorum["Sloppy Quorum"]
        WRITE_Q[Write W=2 ACKs]
        READ_Q[Read R=2 Responses]
        VCLOCK[Vector Clock Versioning]
    end

    CLIENT -->|Write Request| WRITE_Q
    WRITE_Q --> VNODE_A1
    CLIENT -->|Read Request| READ_Q
    READ_Q --> VNODE_A1
    READ_Q --> VNODE_B1
    VCLOCK -->|Conflict Detection| READ_Q

    subgraph AntiEntropy["Background Repair"]
        GOSSIP_PROTO[Gossip Protocol]
        MERKLE_TREE[Merkle Tree Comparison]
        HINTED_HO[Hinted Handoff Queue]
    end

    GOSSIP_PROTO -->|Membership State| VNODE_A1
    GOSSIP_PROTO -->|Membership State| VNODE_B1
    MERKLE_TREE -->|Sync Divergent Keys| VNODE_C1
    HINTED_HO -->|Replay on Recovery| VNODE_A1

    style CLIENT fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style VNODE_A1 fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style VCLOCK fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style GOSSIP_PROTO fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0`,
    howItWorks: `\u2460 Client sends a put/get request with a key to the Request Router \u2192 \u2461 Router hashes the key to a position on the consistent hash ring with 16,384 slots and finds the coordinator virtual node \u2192 \u2462 For writes, the coordinator replicates to N=3 nodes and waits for W=2 acknowledgments before confirming via sloppy quorum \u2192 \u2463 Each write attaches a vector clock for causal tracking where incomparable vectors indicate a conflict preserved for application-level resolution \u2192 \u2464 For reads, R=2 nodes respond and the coordinator returns the latest version by vector clock comparison \u2192 \u2465 If a target node is down, hinted handoff stores the write on a healthy neighbor with a hint for later replay \u2192 \u2466 Gossip protocol runs every second exchanging membership tables with a random peer, propagating cluster state in O(log N) rounds \u2192 \u2467 Merkle trees per key range enable efficient anti-entropy repair by comparing root hashes, traversing only divergent subtrees, and syncing just the mismatched keys`
  },
  {
    slug: "google-search-indexing",
    mermaidDef: `graph TD
    WEB[The Web] -->|Discover URLs| FRONTIER[Crawl Frontier Priority Queue]
    FRONTIER --> BOT[Googlebot Crawlers]
    BOT -->|Raw HTML| BIGTABLE[Bigtable Raw Page Store]

    subgraph Indexing["Index Build Pipeline"]
        CAFFEINE[Caffeine Percolator]
        INVERTED[Inverted Index Builder]
        PAGERANK_CALC[PageRank Computation]
    end

    BIGTABLE --> CAFFEINE
    CAFFEINE -->|Incremental Updates| INVERTED
    BIGTABLE -->|Link Graph| PAGERANK_CALC
    PAGERANK_CALC -->|Scores| INVERTED

    subgraph Serving["Query Serving Layer"]
        ROOT_SRV[Root Query Server]
        SHARD_1[Index Shard 1]
        SHARD_2[Index Shard 2]
        SHARD_N[Index Shard N]
        RESULT_MERGE[Result Merger]
    end

    QUERY[User Query] --> ROOT_SRV
    ROOT_SRV -->|Fan-Out| SHARD_1
    ROOT_SRV -->|Fan-Out| SHARD_2
    ROOT_SRV -->|Fan-Out| SHARD_N
    SHARD_1 --> RESULT_MERGE
    SHARD_2 --> RESULT_MERGE
    SHARD_N --> RESULT_MERGE
    RESULT_MERGE -->|Top-K Results| QUERY

    style QUERY fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style BOT fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style INVERTED fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style ROOT_SRV fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0`,
    howItWorks: `\u2460 Crawl Frontier prioritizes URLs by PageRank, freshness, and historical change rate \u2192 \u2461 Googlebot crawlers fetch pages respecting robots.txt and politeness rate limits \u2192 \u2462 Raw HTML is stored in Bigtable, Google distributed column store \u2192 \u2463 Caffeine/Percolator watches for new crawl data and triggers incremental index updates within minutes replacing the old days-long MapReduce batch rebuild \u2192 \u2464 Inverted Index Builder extracts tokens, computes TF-IDF scores, and writes posting lists mapping each word to its document list \u2192 \u2465 PageRank iterates over the web link graph with 50-100 iterations computing random-walk probability scores per page \u2192 \u2466 User query hits the Root Query Server which fans it out to thousands of index shards in parallel \u2192 \u2467 Each shard returns local top-K results and the Result Merger combines them with PageRank scores and hundreds of other ranking signals, returning results in under 200ms`
  },
  {
    slug: "whatsapp-messaging-scale",
    mermaidDef: `graph TD
    ALICE[Alice Phone] -->|Encrypted Msg| CONN_A[Erlang Process Alice]

    subgraph BEAM_RUNTIME["BEAM VM 2M Connections/Server"]
        CONN_A
        MNESIA[Mnesia Routing Table]
        CONN_B[Erlang Process Bob]
        QUEUE_SF[Store-and-Forward Queue]
    end

    CONN_A -->|Lookup Recipient| MNESIA
    MNESIA -->|Bob Online?| ONLINE_CHK{Online?}
    ONLINE_CHK -->|Yes| CONN_B
    ONLINE_CHK -->|No| QUEUE_SF
    QUEUE_SF -->|On Reconnect| CONN_B

    CONN_B -->|Deliver| BOB[Bob Phone]
    BOB -->|Delivery ACK| CONN_B
    CONN_B -->|ACK to Server| MNESIA
    MNESIA -->|Read Receipt| CONN_A

    subgraph Encryption["Signal Protocol Layer"]
        X3DH_KE[X3DH Key Exchange]
        DBL_RATCHET[Double Ratchet Algorithm]
        PREKEY_SRV[Prekey Bundle Server]
    end

    ALICE -->|Identity Keys| X3DH_KE
    X3DH_KE -->|Session Setup| DBL_RATCHET
    PREKEY_SRV -->|Offline Key Exchange| X3DH_KE

    style ALICE fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style CONN_A fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style CONN_B fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style DBL_RATCHET fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0`,
    howItWorks: `\u2460 Alice types a message and Signal Protocol encrypts it using the Double Ratchet Algorithm with forward secrecy \u2192 \u2461 The encrypted blob is sent over a persistent connection to Alice dedicated Erlang process using only 2 KB memory on the BEAM VM \u2192 \u2462 Erlang process queries Mnesia routing table to locate Bob connection process \u2192 \u2463 If Bob is online, message is pushed directly to Bob Erlang process and delivered instantly \u2192 \u2464 If Bob is offline, message is queued in a store-and-forward queue and delivered in order when Bob reconnects \u2192 \u2465 Bob client sends a delivery ACK back to the server which deletes the message from the queue \u2192 \u2466 Server forwards the delivery receipt to Alice process for the double check mark \u2192 \u2467 For first-time conversations, X3DH key exchange uses prekey bundles uploaded to the server enabling encrypted session establishment even when the recipient is offline`
  },
  {
    slug: "uber-geospatial-architecture",
    mermaidDef: `graph TD
    DRIVER_PHONE[Driver Phone] -->|GPS Every 4s| KAFKA_STREAM[Apache Kafka]

    subgraph Ingestion["GPS Ingestion Pipeline"]
        H3_IDX[H3 Hex Indexer]
        GEO_STORE[Geospatial Cell Store]
    end

    KAFKA_STREAM --> H3_IDX
    H3_IDX -->|lat lng to H3 Cell ID| GEO_STORE

    RIDER_APP[Rider App] -->|Request Ride| API_GW[API Gateway]
    API_GW --> DISCO_ENGINE[DISCO Dispatch Engine]

    subgraph Pricing["Surge Pricing Engine"]
        DEMAND_CTR[Demand Counter per Cell]
        SUPPLY_CTR[Supply Counter per Cell]
        SURGE_CALC[Surge Multiplier Calculator]
    end

    GEO_STORE -->|Available Drivers| SUPPLY_CTR
    API_GW -->|Open Requests| DEMAND_CTR
    DEMAND_CTR --> SURGE_CALC
    SUPPLY_CTR --> SURGE_CALC
    SURGE_CALC -->|Price Multiplier| DISCO_ENGINE

    DISCO_ENGINE -->|K-Ring Neighbor Query| GEO_STORE
    DISCO_ENGINE -->|ETA + Assignment| MATCH_RESULT[Rider-Driver Match]
    MATCH_RESULT --> DRIVER_PHONE
    MATCH_RESULT --> RIDER_APP

    style DRIVER_PHONE fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style DISCO_ENGINE fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style SURGE_CALC fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style H3_IDX fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0`,
    howItWorks: `\u2460 Every active driver phone sends a GPS update every 4 seconds through a persistent connection \u2192 \u2461 Updates stream into Apache Kafka partitioned by geographic region \u2192 \u2462 H3 Hex Indexer converts each lat/lng to an H3 cell ID at resolution 7 covering roughly 5 square km and updates the Geospatial Cell Store \u2192 \u2463 When a rider requests a trip, the API Gateway forwards it to DISCO dispatch engine \u2192 \u2464 DISCO queries the rider H3 cell and k-ring neighbors to find nearby available drivers \u2192 \u2465 Surge Pricing Engine compares demand vs supply per cell, blending real-time data with event calendar and weather predictions, recalculating every 1-2 minutes \u2192 \u2466 DISCO solves a batched bipartite matching problem using an approximated Hungarian algorithm considering live traffic, driver heading, and road topology in under 100ms \u2192 \u2467 Matched driver receives the assignment notification and rider sees the ETA`
  },
  {
    slug: "twitter-fanout-timeline",
    mermaidDef: `graph TD
    AUTHOR[Tweet Author] -->|Post Tweet| TWIT_API[Twitter API]
    TWIT_API -->|Generate| SNOWFLAKE[Snowflake ID Generator]
    SNOWFLAKE -->|64-bit Time-Sorted ID| TWIT_API
    TWIT_API -->|Store Tweet| TWEET_STORE[Tweet Object Store]
    TWIT_API -->|Lookup Followers| FLOCKDB[FlockDB Graph Store]

    subgraph FanOutDecision["Fan-Out Decision"]
        FOLLOWER_CHECK{Followers > 500K?}
    end

    FLOCKDB --> FOLLOWER_CHECK
    FOLLOWER_CHECK -->|No Push Path| FAN_WORKERS[Fan-Out Workers]
    FOLLOWER_CHECK -->|Yes Pull Path| CELEB_STORE[Celebrity Tweet Store]

    FAN_WORKERS -->|Write to Each Follower| REDIS_SS[Redis Sorted Sets]

    subgraph TimelineAssembly["Timeline Assembly"]
        TL_MERGER[Timeline Merger]
    end

    REDIS_SS -->|Precomputed Feed| TL_MERGER
    CELEB_STORE -->|On-Demand Fetch| TL_MERGER
    TL_MERGER -->|Hydrate Tweet IDs| TWEET_STORE
    TL_MERGER -->|Ranked Feed| READER_CLIENT[Reader Client]

    style AUTHOR fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style REDIS_SS fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style TL_MERGER fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style SNOWFLAKE fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0`,
    howItWorks: `\u2460 Author posts a tweet \u2192 \u2461 Snowflake generates a 64-bit time-sortable unique ID with 41 bits timestamp, 10 bits machine, and 12 bits sequence \u2192 \u2462 Tweet is persisted in the Tweet Object Store \u2192 \u2463 FlockDB retrieves the full follower list for the author \u2192 \u2464 Fan-out decision: if author has fewer than 500K followers, fan-out workers ZADD the tweet ID into each follower Redis sorted set scored by Snowflake timestamp \u2192 \u2465 For celebrity accounts exceeding 500K followers, tweet is stored in a Celebrity Tweet Store to avoid millions of Redis writes \u2192 \u2466 When a reader opens their timeline, the Timeline Merger fetches the precomputed Redis sorted set via ZREVRANGE and merges in on-demand celebrity tweets \u2192 \u2467 Tweet IDs are hydrated via batch multi-get from the Tweet Object Store producing the final ranked feed in under 5ms`
  },
  {
    slug: "netflix-content-delivery",
    mermaidDef: `graph TD
    USER_DEV[User Device] -->|Press Play| NFLX_APP[Netflix App]
    NFLX_APP -->|DNS Lookup| OC_DNS[Open Connect DNS]
    OC_DNS -->|Resolve Nearest PoP| ISP_NET[ISP Network]

    subgraph Edge["Edge Layer ISP PoP"]
        OCA_1[OCA Server 1]
        OCA_2[OCA Server 2]
        OCA_3[OCA Server 3]
    end

    ISP_NET --> OCA_1
    OCA_1 -->|Cache Hit 95%| STREAM_OUT[Stream Chunks]
    OCA_1 -->|Cache Miss| S3_ORIGIN[AWS S3 Origin]
    S3_ORIGIN -->|Backfill Cache| OCA_1

    subgraph Control["Control Plane AWS"]
        STEER_SVC[Steering Service]
        FILL_SCHED[Cache Fill Scheduler]
        HASH_RING[Consistent Hash Ring]
    end

    STEER_SVC -->|Route Client| OC_DNS
    FILL_SCHED -->|Nightly Pre-position| OCA_1
    FILL_SCHED -->|Nightly Pre-position| OCA_2
    HASH_RING -->|Map Content to OCA| STEER_SVC

    STREAM_OUT -->|DASH/HLS| ABR_PLAYER[Adaptive Bitrate Player]
    ABR_PLAYER -->|Adjust Quality| USER_DEV

    style USER_DEV fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style OCA_1 fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style ABR_PLAYER fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style S3_ORIGIN fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0`,
    howItWorks: `\u2460 User presses Play \u2192 \u2461 Netflix app calls Open Connect DNS which resolves to the nearest ISP PoP via the Steering Service \u2192 \u2462 PoP OCA server checks local cache with 95% hit rate and streams chunks immediately on hit \u2192 \u2463 On cache miss, OCA fetches the segment from AWS S3 origin and caches it locally for future requests \u2192 \u2464 DASH adaptive bitrate player monitors bandwidth every 2-4 seconds and switches between 20+ quality levels from 235 Kbps to 16 Mbps 4K HDR \u2192 \u2465 Cache Fill Scheduler pre-positions predicted popular content to OCAs nightly during off-peak hours using regional viewing patterns \u2192 \u2466 Consistent hash ring maps content-ID plus client-IP-prefix to specific OCA clusters maximizing cache hit rates \u2192 \u2467 If an OCA fails, consistent hashing remaps only 1/N of keys to the next node and anycast routing falls back to the next nearest PoP`
  }
];

// Process in order (bottom-to-top in the file since list is reversed)
for (const r of replacements) {
  const slugStr = `slug: "${r.slug}"`;
  const slugIdx = content.indexOf(slugStr);
  if (slugIdx === -1) {
    console.error(`NOT FOUND: ${r.slug}`);
    continue;
  }

  // Find the mermaidDef: and howItWorks: in this architecture's block
  const mermaidStart = content.indexOf('mermaidDef:', slugIdx);
  if (mermaidStart === -1) {
    console.error(`No mermaidDef found for ${r.slug}`);
    continue;
  }
  
  // Find howItWorks: after mermaidDef
  const howStart = content.indexOf('howItWorks:', mermaidStart);
  if (howStart === -1) {
    console.error(`No howItWorks found for ${r.slug}`);
    continue;
  }
  
  // Find the end of howItWorks value - it's a string ending with ",
  // Could be "..." or `...`
  let howValueStart = howStart + 'howItWorks:'.length;
  // Skip whitespace
  while (content[howValueStart] === ' ') howValueStart++;
  
  let howEnd;
  const quoteChar = content[howValueStart]; // " or `
  if (quoteChar === '"') {
    // Find closing unescaped "
    let i = howValueStart + 1;
    while (i < content.length) {
      if (content[i] === '\\') { i += 2; continue; }
      if (content[i] === '"') { howEnd = i + 1; break; }
      i++;
    }
  } else if (quoteChar === '`') {
    howEnd = content.indexOf('`', howValueStart + 1) + 1;
  }
  
  // Include the trailing comma
  if (content[howEnd] === ',') howEnd++;
  
  // Find the start of the mermaidDef line (including leading whitespace)
  let lineStart = mermaidStart;
  while (lineStart > 0 && content[lineStart - 1] !== '\n') lineStart--;
  
  // Find the end of howItWorks line (including newline)
  let lineEnd = howEnd;
  while (lineEnd < content.length && content[lineEnd] !== '\n') lineEnd++;
  if (content[lineEnd] === '\n') lineEnd++; // include the newline
  
  // Build replacement
  const indent = '    ';
  const newBlock = `${indent}mermaidDef: \`${r.mermaidDef}\`,\n${indent}howItWorks: \`${r.howItWorks}\`,\n`;
  
  content = content.slice(0, lineStart) + newBlock + content.slice(lineEnd);
  console.log(`OK: ${r.slug}`);
}

fs.writeFileSync('data/architectures.ts', content, 'utf-8');
console.log('Done! File size:', content.length);
