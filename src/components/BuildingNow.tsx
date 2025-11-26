"use client";

import { motion } from "framer-motion";
import { currentBuilds } from "@/data/now";

export function BuildingNow() {
  return (
    <section id="now" className="space-y-6 py-8 md:space-y-8 md:py-12">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] md:text-sm md:tracking-[0.3em]">
            What I&apos;m building now
          </p>
          <h2 className="mt-2 font-display text-2xl text-white md:mt-3 md:text-3xl">
            Active ventures + side bets
          </h2>
        </div>
        <p className="mt-2 max-w-xl text-xs text-[var(--color-muted)] md:mt-0 md:text-sm">
          Momentum matters. Here&apos;s where I&apos;m experimenting this quarter — from
          analytics copilots to embedded finance for creators.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {currentBuilds.map((project) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--surface)]/80 p-4 md:gap-4 md:rounded-3xl md:p-6"
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)] md:text-xs md:tracking-[0.3em]">
              <span>{project.status}</span>
              <span>{project.metric}</span>
            </div>
            <div>
              <h3 className="font-display text-xl text-white md:text-2xl">{project.name}</h3>
              <p className="mt-1 text-xs text-[var(--color-muted)] md:mt-2 md:text-sm">
                {project.tagline}
              </p>
            </div>
            <p className="text-xs text-white/90 md:text-sm">{project.milestone}</p>
            <div className="mt-auto space-y-2">
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <motion.span
                  className="block h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${project.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--color-muted)]">
                <span>Current sprint</span>
                <span>{project.progress}%</span>
              </div>
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-[var(--accent-strong)] hover:underline"
              >
                View build log ↗
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
