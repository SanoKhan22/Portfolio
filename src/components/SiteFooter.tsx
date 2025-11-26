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
    <footer className="mt-16 border-t border-[var(--color-border)]/70 py-10 text-sm text-[var(--color-muted)]">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-white">© {new Date().getFullYear()} Ehsanullah Sano</p>
          <p>Product engineer & entrepreneur</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-white/80">
          {quickLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-[var(--accent-strong)]">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-white/70 transition hover:text-[var(--accent-strong)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <p className="mt-6 text-xs">
        Minimal tracking. No ads. Pixels reference custom shader experiments; no
        personal data stored beyond contact replies.
      </p>
    </footer>
  );
}
