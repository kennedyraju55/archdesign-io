import React from "react";
import type { Category } from "@/data/architectures";

interface ArchDiagramProps {
  type: string;
  category: Category;
  large?: boolean;
}

const palette = {
  "Distributed Systems": { primary: "#2563eb", secondary: "#06b6d4", accent: "#3b82f6" },
  "Data & Infrastructure": { primary: "#06b6d4", secondary: "#10b981", accent: "#22d3ee" },
  "LLM & AI Systems": { primary: "#8b5cf6", secondary: "#ec4899", accent: "#a78bfa" },
};

function Box({ x, y, w, h, label, sublabel, color, opacity = 1 }: { x: number; y: number; w: number; h: number; label: string; sublabel?: string; color: string; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <rect x={x} y={y} width={w} height={h} rx="6" ry="6" fill={`${color}22`} stroke={color} strokeWidth="1.5" />
      <text x={x + w / 2} y={sublabel ? y + h / 2 - 5 : y + h / 2 + 4} textAnchor="middle" fill={color} fontSize="9" fontWeight="600" fontFamily="system-ui">
        {label}
      </text>
      {sublabel && (
        <text x={x + w / 2} y={y + h / 2 + 9} textAnchor="middle" fill={`${color}99`} fontSize="7" fontFamily="system-ui">
          {sublabel}
        </text>
      )}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color: string }) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const len = Math.sqrt(dx * dx + dy * dy);
  const endX = x1 + dx * (1 - 10 / len);
  const endY = y1 + dy * (1 - 10 / len);
  return (
    <g>
      <line x1={x1} y1={y1} x2={endX} y2={endY} stroke={`${color}88`} strokeWidth="1.5" strokeDasharray="none" />
      <polygon
        points={`0,-4 8,0 0,4`}
        fill={`${color}88`}
        transform={`translate(${endX},${endY}) rotate(${angle})`}
      />
    </g>
  );
}

// ── DIAGRAM RENDERERS ────────────────────────────────────────────────

function CdnDiagram({ p }: { p: typeof palette["Distributed Systems"] }) {
  return (
    <>
      <Box x={10} y={10} w={50} h={28} label="Users" color={p.secondary} />
      <Arrow x1={63} y1={24} x2={90} y2={24} color={p.primary} />
      <Box x={90} y={10} w={60} h={28} label="DNS" sublabel="Anycast" color={p.primary} />
      <Arrow x1={123} y1={38} x2={123} y2={55} color={p.primary} />
      <Box x={65} y={55} w={60} h={28} label="Edge PoP" sublabel="ISP Cache" color={p.accent} />
      <Box x={135} y={55} w={60} h={28} label="Edge PoP" sublabel="ISP Cache" color={p.accent} />
      <Arrow x1={95} y1={83} x2={80} y2={100} color={p.secondary} />
      <Arrow x1={165} y1={83} x2={165} y2={100} color={p.secondary} />
      <Box x={50} y={100} w={80} h={28} label="Origin Server" sublabel="S3 / Netflix CDN" color={p.primary} />
      <Box x={140} y={100} w={60} h={28} label="Fallback" sublabel="Direct" color={`${p.secondary}`} />
    </>
  );
}

function FanoutDiagram({ p }: { p: typeof palette["Distributed Systems"] }) {
  return (
    <>
      <Box x={10} y={45} w={50} h={26} label="User Post" sublabel="Tweet" color={p.primary} />
      <Arrow x1={63} y1={58} x2={80} y2={58} color={p.primary} />
      <Box x={80} y={45} w={55} h={26} label="Fan-out" sublabel="Service" color={p.accent} />
      <Arrow x1={137} y1={48} x2={160} y2={20} color={p.secondary} />
      <Arrow x1={137} y1={58} x2={160} y2={58} color={p.secondary} />
      <Arrow x1={137} y1={68} x2={160} y2={96} color={p.secondary} />
      <Box x={160} y={8} w={60} h={24} label="Timeline Cache" sublabel="Redis (user A)" color={p.secondary} />
      <Box x={160} y={46} w={60} h={24} label="Timeline Cache" sublabel="Redis (user B)" color={p.secondary} />
      <Box x={160} y={84} w={60} h={24} label="Celebrity Pull" sublabel="On demand" color={`#f59e0b`} />
    </>
  );
}

function GeodiagramRenderer({ p }: { p: typeof palette["Distributed Systems"] }) {
  return (
    <>
      <Box x={10} y={10} w={55} h={25} label="Driver GPS" sublabel="Kafka Stream" color={p.primary} />
      <Box x={10} y={50} w={55} h={25} label="Rider Request" color={p.secondary} />
      <Arrow x1={67} y1={22} x2={90} y2={40} color={p.primary} />
      <Arrow x1={67} y1={62} x2={90} y2={55} color={p.secondary} />
      <Box x={90} y={35} w={60} h={30} label="H3 Hexagonal" sublabel="Grid Index" color={p.accent} />
      <Arrow x1={152} y1={50} x2={175} y2={35} color={p.accent} />
      <Arrow x1={152} y1={50} x2={175} y2={65} color={p.accent} />
      <Box x={175} y={18} w={55} h={26} label="Dispatch" sublabel="Matching" color={p.primary} />
      <Box x={175} y={52} w={55} h={26} label="Surge" sublabel="Pricing ML" color={`#f59e0b`} />
    </>
  );
}

function DefaultDiagram({ p }: { p: { primary: string; secondary: string; accent: string } }) {
  return (
    <>
      <Box x={10} y={15} w={55} h={28} label="Client" color={p.secondary} />
      <Arrow x1={67} y1={29} x2={85} y2={29} color={p.primary} />
      <Box x={85} y={15} w={65} h={28} label="API Gateway" color={p.primary} />
      <Arrow x1={152} y1={29} x2={170} y2={29} color={p.primary} />
      <Box x={170} y={15} w={60} h={28} label="Service" color={p.accent} />
      <Arrow x1={200} y1={43} x2={200} y2={65} color={p.accent} />
      <Box x={100} y={65} w={65} h={28} label="Cache" sublabel="Redis" color={p.secondary} />
      <Box x={170} y={65} w={60} h={28} label="Database" color={p.primary} />
      <Arrow x1={170} y1={79} x2={165} y2={79} color={p.secondary} />
    </>
  );
}

function LlmInferenceDiagram({ p }: { p: typeof palette["LLM & AI Systems"] }) {
  return (
    <>
      <Box x={5} y={10} w={50} h={25} label="Request" sublabel="Prompt" color={p.secondary} />
      <Arrow x1={57} y1={22} x2={75} y2={22} color={p.primary} />
      <Box x={75} y={10} w={55} h={25} label="Scheduler" sublabel="Continuous Batch" color={p.primary} />
      <Arrow x1={132} y1={22} x2={150} y2={22} color={p.primary} />
      <Box x={150} y={10} w={60} h={25} label="GPU Workers" sublabel="Tensor Parallel" color={p.accent} />
      <Arrow x1={180} y1={35} x2={180} y2={55} color={p.accent} />
      <Box x={130} y={55} w={55} h={26} label="KV Cache" sublabel="PagedAttention" color={p.secondary} />
      <Box x={192} y={55} w={50} h={26} label="Tokens" sublabel="Output" color={p.primary} />
      <Arrow x1={87} y1={35} x2={60} y2={55} color={p.primary} />
      <Box x={5} y={55} w={55} h={26} label="Flash Attn" sublabel="IO-Aware" color={p.accent} />
    </>
  );
}

function RagDiagram({ p }: { p: typeof palette["LLM & AI Systems"] }) {
  return (
    <>
      <Box x={5} y={50} w={50} h={25} label="Query" color={p.secondary} />
      <Arrow x1={57} y1={62} x2={75} y2={35} color={p.primary} />
      <Arrow x1={57} y1={62} x2={75} y2={75} color={p.secondary} />
      <Box x={75} y={20} w={55} h={25} label="Embedder" sublabel="Dense Search" color={p.primary} />
      <Box x={75} y={60} w={55} h={25} label="BM25" sublabel="Sparse Search" color={p.secondary} />
      <Arrow x1={132} y1={32} x2={150} y2={50} color={p.primary} />
      <Arrow x1={132} y1={72} x2={150} y2={58} color={p.secondary} />
      <Box x={150} y={42} w={55} h={28} label="RRF Rerank" sublabel="Fusion" color={p.accent} />
      <Arrow x1={205} y1={56} x2={220} y2={56} color={p.accent} />
      <Box x={220} y={42} w={25} h={28} label="LLM" color={p.primary} />
    </>
  );
}

function VectorDbDiagram({ p }: { p: typeof palette["LLM & AI Systems"] }) {
  const nodes = [
    { cx: 120, cy: 50 }, { cx: 160, cy: 30 }, { cx: 180, cy: 65 },
    { cx: 145, cy: 85 }, { cx: 100, cy: 75 }, { cx: 85, cy: 45 },
  ];
  return (
    <>
      <Box x={5} y={45} w={50} h={26} label="Query Vec" sublabel="1536-dim" color={p.secondary} />
      <Arrow x1={57} y1={58} x2={78} y2={58} color={p.primary} />
      {nodes.map((n, i) =>
        nodes.slice(i + 1).map((n2, j) =>
          Math.abs(n.cx - n2.cx) + Math.abs(n.cy - n2.cy) < 80 ? (
            <line key={`${i}-${j}`} x1={n.cx + 60} y1={n.cy} x2={n2.cx + 60} y2={n2.cy} stroke={`${p.accent}44`} strokeWidth="1" />
          ) : null
        )
      )}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.cx + 60} cy={n.cy} r="8" fill={`${p.primary}33`} stroke={p.primary} strokeWidth="1.5" />
      ))}
      <text x={145} y={110} textAnchor="middle" fill={`${p.accent}99`} fontSize="7" fontFamily="system-ui">HNSW Graph Index</text>
      <circle cx={nodes[0].cx + 60} cy={nodes[0].cy} r="10" fill="none" stroke={p.secondary} strokeWidth="2" />
    </>
  );
}

function KafkaDiagram({ p }: { p: typeof palette["Data & Infrastructure"] }) {
  return (
    <>
      <Box x={5} y={45} w={45} h={26} label="Producers" color={p.secondary} />
      <Arrow x1={52} y1={58} x2={70} y2={35} color={p.primary} />
      <Arrow x1={52} y1={58} x2={70} y2={58} color={p.primary} />
      <Arrow x1={52} y1={58} x2={70} y2={80} color={p.primary} />
      <Box x={70} y={22} w={50} h={22} label="Partition 0" sublabel="Leader" color={p.primary} />
      <Box x={70} y={47} w={50} h={22} label="Partition 1" sublabel="Leader" color={p.primary} />
      <Box x={70} y={72} w={50} h={22} label="Partition 2" sublabel="Leader" color={p.primary} />
      <Arrow x1={122} y1={33} x2={150} y2={33} color={p.secondary} />
      <Arrow x1={122} y1={58} x2={150} y2={58} color={p.secondary} />
      <Arrow x1={122} y1={83} x2={150} y2={83} color={p.secondary} />
      <Box x={150} y={20} w={55} h={26} label="Consumer" sublabel="Group A" color={p.accent} />
      <Box x={150} y={68} w={55} h={26} label="Consumer" sublabel="Group B" color={p.secondary} />
    </>
  );
}

const diagrams: Record<string, (props: { p: ReturnType<typeof getPalette> }) => React.ReactElement> = {
  cdn: CdnDiagram,
  fanout: FanoutDiagram,
  geo: GeodiagramRenderer,
  "llm-inference": LlmInferenceDiagram,
  rag: RagDiagram,
  "vector-db": VectorDbDiagram,
  kafka: KafkaDiagram,
};

function getPalette(category: Category) {
  return palette[category];
}

export default function ArchDiagram({ type, category, large = false }: ArchDiagramProps) {
  const p = getPalette(category);
  const DiagramComponent = diagrams[type] || DefaultDiagram;
  const h = large ? 220 : 140;

  return (
    <svg
      viewBox={`0 0 250 ${h}`}
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <DiagramComponent p={p as Parameters<typeof DefaultDiagram>[0]["p"]} />
    </svg>
  );
}
