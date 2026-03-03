import { Star, Users } from "lucide-react";

interface Testimonial {
  avatar: string;
  name: string;
  role: string;
  quote: string;
  stars: number;
  badge?: string;
}

const testimonials: Testimonial[] = [
  {
    avatar: "👨‍💻",
    name: "Arjun Patel",
    role: "SWE Intern → Full-time @ Google",
    stars: 5,
    badge: "Got the offer!",
    quote:
      "I studied the Netflix CDN and DynamoDB architectures on ArchDesign.io the week before my Google L4 loop. The interviewer literally asked how Netflix handles cache invalidation at scale — I nailed it. ByteByteGo had a surface-level post; ArchDesign had the actual 2024 paper breakdown. Worth every cent of the $5.",
  },
  {
    avatar: "👩‍🎓",
    name: "Priya Krishnan",
    role: "PhD Candidate @ Stanford",
    stars: 5,
    quote:
      "The PRESERVE and Mooncake paper breakdowns are genuinely excellent. I'm in distributed systems research and even I learned new things about KV cache disaggregation. This is the only system design resource that treats readers like engineers, not beginners watching explainer videos.",
  },
  {
    avatar: "🧑‍💻",
    name: "Marcus Thompson",
    role: "CS Senior @ UCLA",
    stars: 5,
    quote:
      "I cancelled ByteByteGo after subscribing here. For $5/month I get FAANG interview Q&A attached to every architecture, which ByteByteGo doesn't even attempt. The RAG pipeline deep-dive alone had 12 interview questions mapped to real Amazon and Meta rounds. Unbeatable value.",
  },
  {
    avatar: "👩‍💻",
    name: "Yuki Tanaka",
    role: "MS Student @ CMU",
    stars: 5,
    quote:
      "The vLLM and multi-agent architecture deep-dives are unlike anything else out there. My professor assigned the Preble paper and I already had the architecture diagram memorized from this newsletter. The fact that all 30 articles stay free forever — no paywall, no login — is just wild.",
  },
  {
    avatar: "🧑‍🎓",
    name: "Devon Carter",
    role: "CS Student @ Georgia Tech",
    stars: 5,
    quote:
      "Studied the DynamoDB and Cassandra architectures before my Amazon SDE internship interview. The interviewer went deep on partition keys and eventual consistency — stuff DesignGurus barely touches. I felt overprepared in the best way. Starting full-time at Amazon next fall.",
  },
  {
    avatar: "👨‍🎓",
    name: "Rohan Mehta",
    role: "Junior SWE @ Meta",
    stars: 5,
    quote:
      "Written by a practicing Microsoft engineer, not a content creator — you feel that difference immediately. The production war stories, the real tradeoff analysis, the 2025 paper citations. I've paid $200+ for courses that gave me less depth than a single ArchDesign.io article.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill="var(--accent-orange)"
          stroke="none"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      className="py-24 px-4"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge badge-purple mb-4 inline-block">
            Social Proof
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            What <span className="gradient-text">CS Students</span> Are Saying
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            From interns to PhD candidates — engineers who went deep and landed
            the roles they wanted.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="arch-card p-6 rounded-2xl flex flex-col gap-4 relative"
            >
              {t.badge && (
                <span className="badge badge-green absolute top-4 right-4 text-xs">
                  {t.badge}
                </span>
              )}

              {/* Stars */}
              <StarRating count={t.stars} />

              {/* Quote */}
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "var(--text-secondary)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
                  style={{ background: "var(--bg-primary)" }}
                  aria-hidden="true"
                >
                  {t.avatar}
                </span>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social stat */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-8 px-8 rounded-2xl border border-[var(--border)] max-w-lg mx-auto"
          style={{ background: "var(--bg-card)" }}>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "var(--accent-blue)20" }}
          >
            <Users size={22} style={{ color: "var(--accent-blue)" }} />
          </div>
          <div className="text-center sm:text-left">
            <p
              className="text-2xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Join 2,400+ CS students
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              already learning real-world system design every week
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
