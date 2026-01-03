"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { Quote, Star, CheckCircle2, TrendingUp, Zap } from "lucide-react";

// Testimonial Card Component
function TestimonialCard({
  testimonial,
  index,
  hoveredIndex,
  setHoveredIndex,
}: {
  testimonial: typeof testimonials[0];
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) {
  return (
    <motion.div
      key={testimonial.name}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="group relative h-full w-80 shrink-0 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--surface)]/50 p-6 backdrop-blur-sm transition-all hover:border-[var(--accent)]/50 hover:bg-[var(--surface)]/70"
    >
      {/* Gradient Glow Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={
          hoveredIndex === index
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
      <p className="relative z-10 mb-6 text-sm leading-relaxed text-[var(--muted)]">
        "{testimonial.quote}"
      </p>

      {/* Author Info */}
      <div className="relative z-10 flex items-center gap-3">
        {/* Avatar */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-strong)] font-display text-sm font-semibold text-[var(--button-text)]">
          {testimonial.avatar || testimonial.name.charAt(0)}
        </div>

        {/* Name & Title */}
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-[var(--foreground)]">
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
  );
}

export function TestimonialsSlider() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Duplicate testimonials for seamless loop
  const displayTestimonials = testimonials.slice(0, 3);
  const duplicatedTestimonials = [...displayTestimonials, ...displayTestimonials];

  return (
    <section id="social-proof" className="relative overflow-hidden space-y-8 py-12">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] md:text-sm md:tracking-[0.3em]">
            Social proof
          </p>
          <h2 className="mt-2 font-display text-2xl text-[var(--foreground)] md:mt-3 md:text-3xl">
            Trusted by founders, CTOs, and product leads
          </h2>
        </div>
      </div>

      {/* Dual Infinite Marquee */}
      <div className="space-y-6">
        {/* First Row - Scrolls Right */}
        <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{
              x: ["-50%", "0%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedTestimonials.map((testimonial, idx) => (
              <TestimonialCard
                key={`row1-${idx}`}
                testimonial={testimonial}
                index={idx}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            ))}
          </motion.div>
        </div>

        {/* Second Row - Scrolls Left */}
        <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedTestimonials.map((testimonial, idx) => (
              <TestimonialCard
                key={`row2-${idx}`}
                testimonial={testimonial}
                index={idx}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Static Grid for Mobile */}
      <div className="grid gap-6 md:hidden">
        {displayTestimonials.map((testimonial, idx) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
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
            <p className="relative z-10 mb-6 text-sm leading-relaxed text-[var(--muted)]">
              "{testimonial.quote}"
            </p>

            {/* Author Info */}
            <div className="relative z-10 flex items-center gap-3">
              {/* Avatar */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-strong)] font-display text-sm font-semibold text-[var(--button-text)]">
                {testimonial.avatar || testimonial.name.charAt(0)}
              </div>

              {/* Name & Title */}
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-[var(--foreground)]">
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
