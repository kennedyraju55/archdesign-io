'use client';

import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, ShieldCheck } from "lucide-react";

const trustSignals = [
  { icon: ShieldCheck, label: "Secure Stripe payment" },
  { icon: CheckCircle2, label: "Cancel anytime" },
  { icon: BookOpen, label: "Free articles always stay free" },
];

export default function FinalCTA() {
  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 40%, #150d2e 70%, #0a0f1e 100%)",
        }}
      />

      {/* Glow blobs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <span className="badge badge-purple mb-6 inline-block">
          Join 2,400+ engineers
        </span>

        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Start Learning Like a{" "}
          <span className="gradient-text">Staff Engineer</span>
        </h2>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          For just{" "}
          <span
            className="font-semibold"
            style={{ color: "var(--accent-green)" }}
          >
            $5/month
          </span>{" "}
          — less than a coffee — get weekly deep-dives on{" "}
          <span style={{ color: "var(--text-primary)" }}>30 architectures</span>
          , FAANG interview Q&A, and 2025 research paper breakdowns your
          competitors haven&apos;t read. Cancel anytime.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            href="/subscribe"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-900/40"
            style={{
              background:
                "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
            }}
          >
            Subscribe — $5/month
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/articles"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-base border-2 transition-all hover:scale-105"
            style={{
              borderColor: "var(--accent-teal)",
              color: "var(--accent-teal)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "var(--accent-teal)15";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "transparent";
            }}
          >
            <BookOpen size={18} />
            Browse Free Articles
          </Link>
        </div>

        {/* Trust signals */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-5">
          {trustSignals.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              <Icon size={15} style={{ color: "var(--accent-green)" }} />
              {label}
            </span>
          ))}
        </div>

        {/* Fine print */}
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          No credit card required for free articles · Stripe-secured checkout
        </p>
      </div>
    </section>
  );
}
