"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { Quote, Star, CheckCircle2, TrendingUp, Zap } from "lucide-react";

function TestimonialCard({ testimonial, index }: { testimonial: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, rotateY: 2, rotateX: 2 }}
      className="group relative min-w-[340px] max-w-[400px] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--surface)]/50 p-6 backdrop-blur-sm transition-all hover:border-[var(--accent)]/50 hover:bg-[var(--surface)]/70 hover:shadow-2xl hover:shadow-[var(--accent)]/10"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Gradient Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent-strong)]">
            <Quote className="h-5 w-5" />
          </div>
          {testimonial.verified && (
            <div className="flex items-center gap-1 rounded-full bg-[var(--accent)]/10 px-2 py-1">
              <CheckCircle2 className="h-3 w-3 text-[var(--accent-strong)]" />
              <span className="text-[9px] font-medium uppercase tracking-wider text-[var(--accent-strong)]">
                Verified
              </span>
            </div>
          )}
        </div>
        {testimonial.badge && (
          <span className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-[var(--accent-strong)]">
            {testimonial.badge}
          </span>
        )}
      </div>

      {/* Rating Stars */}
      {testimonial.rating && (
        <div className="mb-3 flex gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5 fill-[var(--accent-strong)] text-[var(--accent-strong)]"
            />
          ))}
        </div>
      )}

      {/* Quote */}
      <p className="relative z-10 mb-4 text-sm leading-relaxed text-white/90">
        "{testimonial.quote}"
      </p>

      {/* Metrics */}
      {testimonial.metrics && (
        <div className="mb-4 grid grid-cols-2 gap-2">
          {testimonial.metrics.map((metric: any, i: number) => (
            <div
              key={i}
              className={`rounded-lg border p-2 transition-all ${
                metric.highlight
                  ? "border-[var(--accent)]/40 bg-[var(--accent)]/5"
                  : "border-[var(--color-border)] bg-[var(--background)]/30"
              }`}
            >
              <div className="mb-0.5 flex items-center gap-1">
                {metric.highlight && (
                  <TrendingUp className="h-3 w-3 text-[var(--accent-strong)]" />
                )}
                <p className="text-[9px] uppercase tracking-wider text-[var(--color-muted)]">
                  {metric.label}
                </p>
              </div>
              <p
                className={`text-xs font-semibold ${
                  metric.highlight ? "text-[var(--accent-strong)]" : "text-white"
                }`}
              >
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Author Info */}
      <div className="relative z-10 flex items-center gap-3 border-t border-[var(--color-border)]/50 pt-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-strong)] font-display text-sm font-semibold text-white shadow-lg">
          {testimonial.avatar || testimonial.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-white">{testimonial.name}</p>
          <p className="truncate text-xs text-[var(--color-muted)]">{testimonial.title}</p>
          {testimonial.company && (
            <p className="truncate text-xs text-[var(--color-muted)]/70">
              {testimonial.company}
            </p>
          )}
        </div>
      </div>

      {/* Relation Badge */}
      <div className="relative z-10 mt-4 inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--background)]/50 px-3 py-1 text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
        <Zap className="h-2.5 w-2.5" />
        {testimonial.relation}
      </div>
    </motion.div>
  );
}

export function EnhancedTestimonials() {
  const displayTestimonials = testimonials.slice(0, 3);
  const duplicated = [...displayTestimonials, ...displayTestimonials];

  return (
    <section id="social-proof" className="relative overflow-hidden space-y-8 py-12">
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

      {/* Desktop: Dual Infinite Marquee */}
      <div className="hidden md:block space-y-6">
        {/* First Row - Scrolls Right */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{
              x: ["-50%", "0%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {duplicated.map((testimonial, idx) => (
              <TestimonialCard key={`row1-${idx}`} testimonial={testimonial} index={idx} />
            ))}
          </motion.div>
        </div>

        {/* Second Row - Scrolls Left */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {duplicated.map((testimonial, idx) => (
              <TestimonialCard key={`row2-${idx}`} testimonial={testimonial} index={idx} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile: Static Grid */}
      <div className="grid gap-6 md:hidden">
        {displayTestimonials.map((testimonial, idx) => (
          <TestimonialCard key={`mobile-${idx}`} testimonial={testimonial} index={idx} />
        ))}
      </div>
    </section>
  );
}
