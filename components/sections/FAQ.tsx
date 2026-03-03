"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How is this different from ByteByteGo?",
    answer:
      "ByteByteGo charges $15/month for content that largely mirrors their books — solid fundamentals but outdated (no 2024–2025 research) and no FAANG interview Q&A. ArchDesign.io costs $5/month, covers 10 LLM architectures competitors have never touched (vLLM, RAG pipelines, multi-agent systems), grounds every breakdown in the latest papers (PRESERVE, Mooncake, Preble, Oaken, PyramidInfer), and attaches real FAANG interview questions to every architecture. It's written by a practicing Microsoft Software Engineer with an MS in CS — not a content creator recycling textbook diagrams.",
  },
  {
    question: "Do I need to be an advanced CS student?",
    answer:
      "No. The content assumes you know CS fundamentals — data structures, basic networking, what a database is — which means any intermediate CS student, bootcamp grad preparing for senior roles, or early-career engineer is well-positioned. You don't need distributed systems experience. The articles build intuition from first principles before going deep on production tradeoffs, so you're never lost.",
  },
  {
    question: "What happens when I subscribe?",
    answer:
      "You'll be redirected to a secure Stripe checkout — the industry standard for payments. After subscribing, you receive a welcome email with a curated reading path (which architectures to study first), links to the full article archive, and a YouTube playlist of companion deep-dive videos. Each Tuesday you get a new architecture breakdown directly in your inbox. You can also access everything in the subscriber portal immediately.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, absolutely. You can cancel instantly through the Stripe billing portal — no emails to send, no customer support needed. Your subscription simply won't renew next month. Importantly, all the articles you've read stay accessible forever. Free articles (all 30) never disappear. There's no lock-in, no cancellation fee, and no dark patterns.",
  },
  {
    question: "Are the articles really free forever?",
    answer:
      "Yes. All 30 architecture articles on ArchDesign.io are free, permanently, with no login required. This is a deliberate choice — we believe foundational system design knowledge should be accessible to every CS student regardless of budget. The $5/month subscription unlocks the weekly deep-dives, the FAANG interview Q&A bank, the video breakdowns, and the curated reading paths. But the articles? Always free.",
  },
  {
    question: "How technical are the videos?",
    answer:
      "Each video runs 20–40 minutes and assumes you've read the companion article first. They go deeper than the text: live whiteboarding of distributed system flows, paper walkthroughs, and common interview failure modes. We don't hand-hold through what a hash function is. We assume CS fundamentals and focus on the engineering judgment calls — why Cassandra over DynamoDB, why prefix caching matters for RAG, where vLLM's PagedAttention breaks under contention.",
  },
  {
    question: "Is the content up to date?",
    answer:
      "Yes — this is one of our core differentiators. We publish breakdowns of research papers within weeks of release. Current coverage includes PRESERVE (KV cache with semantic similarity), Mooncake (disaggregated prefill/decode), Preble (global LLM scheduler), Oaken (KV cache quantization), and PyramidInfer (layer-wise KV cache compression) — all 2024–2025 papers that ByteByteGo and DesignGurus haven't covered. The landscape moves fast; so do we.",
  },
  {
    question: "Do you cover LLM and AI system architectures?",
    answer:
      "Yes — 10 dedicated deep-dives and counting. Covered architectures include: vLLM and PagedAttention, Retrieval-Augmented Generation (RAG) pipelines, multi-agent orchestration systems (LangGraph, AutoGen patterns), KV cache disaggregation (Mooncake), speculative decoding, tensor parallelism and model sharding, vector database internals (Pinecone, Weaviate), embedding pipelines at scale, fine-tuning infrastructure (LoRA, PEFT), and LLM serving schedulers (Preble). No other system design newsletter covers this territory at this depth.",
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
            Everything you need to know before subscribing — or just reading for
            free.
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
