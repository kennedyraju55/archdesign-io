import Link from "next/link";
import { Zap, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="gradient-text">Arch</span>Design.io
              </span>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-sm">
              30 real-world system architecture deep-dives for CS students. From Netflix CDN to GPT inference — understand how the systems you use every day actually work.
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-2">
              Built by Raju Guthikonda · Software Engineer @ Microsoft
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com/kennedyraju55" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/nrk-raju-guthikonda-504066a8/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Content */}
          <div>
            <h4 className="font-semibold text-[var(--text-primary)] mb-4 text-sm uppercase tracking-wider">Content</h4>
            <ul className="space-y-2">
              {[
                { label: "All Architectures", href: "/architectures" },
                { label: "Distributed Systems", href: "/architectures?cat=distributed" },
                { label: "LLM & AI Systems", href: "/architectures?cat=llm" },
                { label: "Data & Infrastructure", href: "/architectures?cat=data" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscription */}
          <div>
            <h4 className="font-semibold text-[var(--text-primary)] mb-4 text-sm uppercase tracking-wider">Videos</h4>
            <ul className="space-y-2">
              {[
                { label: "Videos Coming Soon", href: "/coming-soon" },
                { label: "How It Works", href: "/#how-it-works" },
                { label: "FAQ", href: "/#faq" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--text-muted)]">© 2025 ArchDesign.io · Built by Raju Guthikonda · Microsoft Engineer</p>
          <p className="text-xs text-[var(--text-muted)]">
            <span className="text-[var(--accent-teal)]">2 new architectures/week</span> · 30 deep-dives · 15 weeks of content
          </p>
        </div>
      </div>
    </footer>
  );
}
