"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is system design and why does it matter?",
    answer:
      "System design is the process of defining the architecture, components, and interfaces of a system to satisfy specified requirements. It matters because every FAANG-level interview loop includes a system design round — and it's the round where candidates fail most often. Understanding how real systems work (not just toy examples) is what separates engineers who pass from those who don't.",
  },
  {
    question: "Who is ArchDesign.io for?",
    answer:
      "ArchDesign.io is built for CS students, bootcamp graduates, and early-career engineers preparing for senior-level technical interviews. The content assumes CS fundamentals — data structures, basic networking, what a database is — but no distributed systems experience is required. The articles build intuition from first principles before going deep on production tradeoffs.",
  },
  {
    question: "What architectures are covered?",
    answer:
      "30 architecture deep-dives across three categories: Distributed Systems (Netflix CDN, Twitter Fan-out, Uber geospatial, WhatsApp messaging, Google Search, etc.), Data & Infrastructure (DynamoDB, Cassandra, Kafka, Spark, Airflow, etc.), and LLM & AI Systems (GPT inference, RAG pipelines, vLLM, multi-agent systems, vector databases, KV cache disaggregation, and more). All 30 articles are free with no login required.",
  },
  {
    question: "How is this different from ByteByteGo?",
    answer:
      "ByteByteGo covers solid fundamentals but the content is largely based on their books — outdated (no 2024–2025 research) and no interview questions per architecture. ArchDesign.io covers 10 LLM architectures competitors have never touched (vLLM, RAG pipelines, multi-agent systems), grounds every breakdown in the latest papers (PRESERVE, Mooncake, Preble, Oaken, PyramidInfer), and attaches 5 real interview questions to every architecture. It's written by practicing engineers at Microsoft and Lowe's — not content creators recycling textbook diagrams. And everything is free.",
  },
  {
    question: "Is all the content really free?",
    answer:
      "Yes. All 30 architecture articles on ArchDesign.io are free, permanently, with no login required. This is a deliberate choice — foundational system design knowledge should be accessible to every CS student regardless of budget. Video walkthroughs are coming soon and will also be free.",
  },
  {
    question: "Do you cover LLM and AI system architectures?",
    answer:
      "Yes — 10 dedicated deep-dives and counting. Covered architectures include: vLLM and PagedAttention, Retrieval-Augmented Generation (RAG) pipelines, multi-agent orchestration systems (LangGraph, AutoGen patterns), KV cache disaggregation (Mooncake), speculative decoding, tensor parallelism and model sharding, vector database internals (Pinecone, Weaviate), embedding pipelines at scale, fine-tuning infrastructure (LoRA, PEFT), and LLM serving schedulers (Preble). No other system design resource covers this territory at this depth.",
  },
  {
    question: "Is the content up to date?",
    answer:
      "Yes — this is one of our core differentiators. We publish breakdowns of research papers within weeks of release. Current coverage includes PRESERVE (KV cache with semantic similarity), Mooncake (disaggregated prefill/decode), Preble (global LLM scheduler), Oaken (KV cache quantization), and PyramidInfer (layer-wise KV cache compression) — all 2024–2025 papers that ByteByteGo and DesignGurus haven't covered.",
  },
  {
    question: "Do I need to be an advanced CS student?",
    answer:
      "No. The content assumes you know CS fundamentals — data structures, basic networking, what a database is — which means any intermediate CS student, bootcamp grad preparing for senior roles, or early-career engineer is well-positioned. You don't need distributed systems experience. The articles build intuition from first principles before going deep on production tradeoffs, so you're never lost.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge badge-teal mb-4 inline-block">
            Got Questions?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p
            className="text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Everything you need to know about ArchDesign.io — or just start reading for free.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] overflow-hidden">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                style={{
                  background: isOpen ? "var(--bg-secondary)" : "var(--bg-card)",
                }}
                className="transition-colors"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-semibold text-base leading-snug transition-colors group-hover:text-[var(--accent-teal)]"
                    style={{
                      color: isOpen
                        ? "var(--accent-teal)"
                        : "var(--text-primary)",
                    }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      background: isOpen
                        ? "var(--accent-teal)20"
                        : "var(--bg-secondary)",
                      color: isOpen
                        ? "var(--accent-teal)"
                        : "var(--text-muted)",
                    }}
                  >
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer nudge */}
        <p
          className="text-center text-sm mt-10"
          style={{ color: "var(--text-muted)" }}
        >
          Still have questions?{" "}
          <a
            href="mailto:raju@archdesign.io"
            className="underline underline-offset-4 transition-colors hover:text-[var(--accent-teal)]"
            style={{ color: "var(--text-secondary)" }}
          >
            Email Raju directly
          </a>{" "}
          — he reads every message.
        </p>
      </div>
    </section>
  );
}
