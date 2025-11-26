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
                    {link.label === "LinkedIn" && (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    )}
                    {link.label === "GitHub" && (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    )}
                    {link.label === "Email" && (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
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
