import Image from "next/image";
import { highlightStats } from "@/data/stats";

export function AboutBrand() {
  return (
    <section id="about" className="grid gap-6 py-8 md:gap-10 md:py-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4 md:space-y-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] md:text-sm md:tracking-[0.3em]">
          About
        </p>
        <h2 className="font-display text-2xl text-white md:text-3xl">
          I build software that helps people earn, automate, and grow.
        </h2>
        <p className="text-sm leading-relaxed text-[var(--color-muted)] md:text-base">
          I&apos;ve shipped six multi-platform products, raised retention by 25%, and
          scaled experiments across mobile, embedded, and commerce stacks. I
          blend engineering, analytics, and growth so every launch is measurable
          and resilient.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
          {highlightStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--surface)]/70 px-4 py-5 md:rounded-3xl md:px-5 md:py-6"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] md:text-sm md:tracking-[0.3em]">
                {stat.label}
              </p>
              <p className="mt-1 text-2xl font-semibold text-white md:mt-2 md:text-3xl">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--surface-raised)]/60 p-6 shadow-[var(--shadow-soft)] md:rounded-[32px] md:p-8">
        <div className="space-y-3 text-xs text-[var(--color-muted)] md:space-y-4 md:text-sm">
          <p>
            • Founder-minded engineer and product partner<br />• Google Android
            Nanodegree · CS50 · Aspire Leadership
          </p>
          <p>
            I translate fuzzy growth targets into technical roadmaps, ship fast
            without drama, and bring teams along with runbooks and dashboards.
          </p>
        </div>
        <div className="mt-6 md:mt-10">
          <Image
            src="/assets/signature.svg"
            alt="signature"
            width={200}
            height={80}
            className="opacity-80"
          />
        </div>
      </div>
    </section>
  );
}
