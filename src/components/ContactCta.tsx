import Link from "next/link";
import { Mail, Linkedin, Github } from "lucide-react";
import { socialLinks } from "@/data/stats";

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  mail: Mail,
} as const;

export function ContactCta() {
  return (
    <section
      id="contact"
      className="rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-[rgba(14,110,85,0.25)] via-black/60 to-black/40 px-6 py-10 shadow-[var(--shadow-soft)] md:rounded-[40px] md:px-8 md:py-12"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] md:text-sm md:tracking-[0.3em]">
        Contact
      </p>
      <h2 className="mt-3 font-display text-3xl text-white md:mt-4 md:text-4xl">
        Let&apos;s build something together.
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted)] md:mt-4 md:text-base">
        I partner with founders, product, and growth teams as an embedded
        engineer. Book a working session, request a build, or send a loom — I&apos;ll
        respond in under 24 hours.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-8">
        <Link
          href="https://calendly.com/hey-sano/intro"
          target="_blank"
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition active:scale-95 active:opacity-80 sm:px-8 sm:text-base"
        >
          Book a Call
        </Link>
        <Link
          href="mailto:hey@sano.dev"
          className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition active:scale-95 active:border-[var(--accent)] sm:px-8 sm:text-base"
        >
          Email Me
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/80 md:mt-8 md:gap-3 md:text-sm">
        {socialLinks.map((link) => {
          const Icon = iconMap[link.icon as keyof typeof iconMap] ?? Mail;
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 transition active:scale-95 active:border-[var(--accent-strong)] md:px-4"
            >
              <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              {link.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
