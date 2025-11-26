import Link from "next/link";
import { socialLinks } from "@/data/stats";

const quickLinks = [
  { label: "Hero", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Now", href: "#now" },
  { label: "Contact", href: "#contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[var(--color-border)]/50 bg-[var(--surface)]/30 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Brand & Copyright */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Ehsanullah Sano</h3>
              <p className="text-sm text-[var(--accent-strong)]">
                Software Engineer & Startup Builder
              </p>
            </div>
            <p className="text-xs text-[var(--color-muted)] max-w-xs">
              © {new Date().getFullYear()} All rights reserved.
              <br />
              Minimal tracking. No ads. Just code.
            </p>
          </div>

          {/* Navigation & Actions */}
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-12 md:items-start">
            {/* Quick Links */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-white">Navigation</h4>
              <nav className="flex flex-col gap-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-[var(--color-muted)] transition hover:text-[var(--accent-strong)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Socials & CV */}
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-white">Connect</h4>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--surface-raised)] text-[var(--color-muted)] transition hover:border-[var(--accent)] hover:text-white hover:shadow-[0_0_15px_rgba(51,255,180,0.3)]"
                    aria-label={link.label}
                  >
                    {/* Simple Icon Placeholder - you can replace with actual icons if available in stats.ts or lucide-react */}
                    <span className="text-xs font-bold">{link.label[0]}</span>
                  </a>
                ))}
              </div>

              <a
                href="/assets/myCV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-black shadow-[var(--glow)] transition hover:bg-[var(--accent-strong)] active:scale-95"
              >
                <svg
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
