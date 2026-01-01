"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { Quote } from "lucide-react";

export function TestimonialsSlider() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="social-proof" className="space-y-8 py-12">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] md:text-sm md:tracking-[0.3em]">
            Social proof
          </p>
          <h2 className="mt-2 font-display text-2xl text-white md:mt-3 md:text-3xl">
            Trusted by founders, CTOs, and product leads
          </h2>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onHoverStart={() => setHoveredIndex(idx)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--surface)]/50 p-6 backdrop-blur-sm transition-all hover:border-[var(--accent)]/50 hover:bg-[var(--surface)]/70"
          >
            {/* Gradient Glow Effect */}
            <motion.div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={
                hoveredIndex === idx
                  ? {
                      background:
                        "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(14, 110, 85, 0.1), transparent 40%)",
                    }
                  : {}
              }
            />

            {/* Quote Icon */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent-strong)]">
                <Quote className="h-5 w-5" />
              </div>
              {testimonial.badge && (
                <span className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-[var(--accent-strong)]">
                  {testimonial.badge}
                </span>
              )}
            </div>

            {/* Quote */}
            <p className="relative z-10 mb-6 text-sm leading-relaxed text-white/80">
              "{testimonial.quote}"
            </p>

            {/* Author Info */}
            <div className="relative z-10 flex items-center gap-3">
              {/* Avatar */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-strong)] font-display text-sm font-semibold text-white">
                {testimonial.avatar || testimonial.name.charAt(0)}
              </div>

              {/* Name & Title */}
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-white">
                  {testimonial.name}
                </p>
                <p className="truncate text-xs text-[var(--color-muted)]">
                  {testimonial.title}
                </p>
                {testimonial.company && (
                  <p className="truncate text-xs text-[var(--color-muted)]/70">
                    {testimonial.company}
                  </p>
                )}
              </div>
            </div>

            {/* Relation Badge */}
            <div className="relative z-10 mt-4 inline-block rounded-full border border-[var(--color-border)] bg-[var(--background)]/50 px-3 py-1 text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
              {testimonial.relation}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
