import { Check, X, BookOpen, FlaskConical, Zap } from "lucide-react";

interface ComparisonRow {
  feature: string;
  bytebyteGo: { value: string; positive: boolean };
  designGurus: { value: string; positive: boolean };
  archDesign: { value: string; positive: boolean };
}

const rows: ComparisonRow[] = [
  {
    feature: "Price",
    bytebyteGo: { value: "$15/mo", positive: false },
    designGurus: { value: "$29/mo", positive: false },
    archDesign: { value: "Free", positive: true },
  },
  {
    feature: "LLM Architectures",
    bytebyteGo: { value: "Limited", positive: false },
    designGurus: { value: "None", positive: false },
    archDesign: { value: "10 Deep-dives", positive: true },
  },
  {
    feature: "Latest Research Papers",
    bytebyteGo: { value: "Outdated", positive: false },
    designGurus: { value: "None", positive: false },
    archDesign: { value: "2025 papers", positive: true },
  },
  {
    feature: "FAANG Interview Q&A",
    bytebyteGo: { value: "No", positive: false },
    designGurus: { value: "Basic", positive: false },
    archDesign: { value: "Per architecture", positive: true },
  },
  {
    feature: "Built by practitioner",
    bytebyteGo: { value: "No", positive: false },
    designGurus: { value: "No", positive: false },
    archDesign: { value: "Microsoft Engineer", positive: true },
  },
  {
    feature: "Free articles",
    bytebyteGo: { value: "No", positive: false },
    designGurus: { value: "No", positive: false },
    archDesign: { value: "All 30 free", positive: true },
  },
];

const differentiators = [
  {
    icon: FlaskConical,
    title: "Research-First",
    description:
      "Every architecture is grounded in the actual papers engineers at Meta, Google, and OpenAI cite internally — PRESERVE, Mooncake, Preble, Oaken, PyramidInfer and more.",
    color: "var(--accent-teal)",
  },
  {
    icon: Zap,
    title: "Production Depth",
    description:
      "Written by a Microsoft Software Engineer with 10+ years of real-world distributed systems experience. Not a blogger. Not a YouTuber. A practitioner.",
    color: "var(--accent-purple)",
  },
  {
    icon: BookOpen,
    title: "Always Current",
    description:
      "Competitors recycle content from 2021 books. We publish breakdowns of 2024–2025 papers within weeks of release, so you're never studying yesterday's architecture.",
    color: "var(--accent-blue)",
  },
];

function CellValue({
  value,
  positive,
  highlight,
}: {
  value: string;
  positive: boolean;
  highlight?: boolean;
}) {
  if (highlight) {
    return (
      <span className="font-bold text-[var(--accent-green)] text-base">
        {value}
      </span>
    );
  }
  return (
    <span
      className={`flex items-center justify-center gap-1.5 text-sm font-medium ${
        positive ? "text-[var(--accent-green)]" : "text-[var(--text-muted)]"
      }`}
    >
      {positive ? (
        <Check size={14} className="shrink-0 text-[var(--accent-green)]" />
      ) : (
        <X size={14} className="shrink-0 text-red-500" />
      )}
      {value}
    </span>
  );
}

export default function WhyBetter() {
  return (
    <section className="py-24 px-4" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge badge-blue mb-4 inline-block">
            Honest Comparison
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Why Engineers Choose{" "}
            <span className="gradient-text">ArchDesign.io</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            We built what we wished existed when preparing for FAANG system
            design rounds — rigorous, current, and 3× cheaper.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto mb-20 rounded-2xl border border-[var(--border)]">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr style={{ background: "var(--bg-secondary)" }}>
                <th className="text-left py-5 px-6 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider w-[30%]">
                  Feature
                </th>
                <th className="text-center py-5 px-4 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider w-[23%]">
                  ByteByteGo
                </th>
                <th className="text-center py-5 px-4 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider w-[23%]">
                  DesignGurus
                </th>
                <th
                  className="text-center py-5 px-4 text-sm font-bold uppercase tracking-wider w-[24%] relative"
                  style={{ color: "var(--accent-teal)" }}
                >
                  <span className="relative z-10">ArchDesign.io ✦</span>
                  <span
                    className="absolute inset-0 opacity-10 rounded-tr-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--accent-blue), var(--accent-teal))",
                    }}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className="border-t border-[var(--border)] transition-colors hover:bg-white/[0.02]"
                  style={{
                    background: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-secondary)",
                  }}
                >
                  <td
                    className="py-4 px-6 font-medium text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {row.feature}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <CellValue {...row.bytebyteGo} />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <CellValue {...row.designGurus} />
                  </td>
                  <td className="py-4 px-4 text-center relative">
                    <span
                      className="absolute inset-0 opacity-5"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--accent-blue), var(--accent-teal))",
                      }}
                    />
                    <span className="relative z-10">
                      {row.feature === "Price" ? (
                        <CellValue
                          value={row.archDesign.value}
                          positive={row.archDesign.positive}
                          highlight
                        />
                      ) : (
                        <CellValue {...row.archDesign} />
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Differentiator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {differentiators.map(({ icon: Icon, title, description, color }) => (
            <div key={title} className="arch-card p-7 rounded-2xl">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${color}20` }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
