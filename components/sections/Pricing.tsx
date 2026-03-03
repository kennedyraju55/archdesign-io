import Link from "next/link";
import { Bell, Video, BookOpen, Zap } from "lucide-react";

const comingFeatures = [
  { icon: Video, label: "40-min video deep-dives", sublabel: "One per architecture" },
  { icon: BookOpen, label: "FAANG interview Q&A", sublabel: "5 questions per architecture" },
  { icon: Zap, label: "Capacity estimation", sublabel: "Real production numbers" },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="badge badge-blue mb-4">Coming Soon</span>
        <h2 className="text-4xl sm:text-5xl font-bold mb-5">
          Video Walkthroughs —{" "}
          <span className="gradient-text">Coming Soon</span>
        </h2>
        <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
          Free 40-minute video deep-dives for every architecture. Live diagram annotation, FAANG interview Q&amp;A, and real production numbers. All free.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="arch-card p-10 text-center border-blue-500/30 bg-gradient-to-b from-blue-600/5 to-transparent">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
            <Video className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">Video library in production</h3>
          <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
            We&apos;re recording and editing 30 architecture deep-dives. Get notified the moment they go live — completely free.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {comingFeatures.map(({ icon: Icon, label, sublabel }) => (
              <div key={label} className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)]">
                <Icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-[var(--text-primary)]">{label}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">{sublabel}</p>
              </div>
            ))}
          </div>

          <Link
            href="/coming-soon"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:opacity-90 transition-opacity glow-blue"
          >
            <Bell className="w-4 h-4" />
            Get Notified When Videos Launch
          </Link>
          <p className="text-xs text-[var(--text-muted)] mt-4">Free forever · No credit card · No catch</p>
        </div>
      </div>
    </section>
  );
}
