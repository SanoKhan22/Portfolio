"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSlider() {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  const motionProps = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
      };

  return (
    <section id="social-proof" className="space-y-8 py-12">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
            Social proof
          </p>
          <h2 className="mt-3 font-display text-3xl text-white">
            Trusted by founders, growth, and engineering leads
          </h2>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--surface)]/70 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonials[index].name}
            {...motionProps}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-lg text-white/90">“{testimonials[index].quote}”</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted)]">
              <span className="font-semibold text-white">{testimonials[index].name}</span>
              <span>{testimonials[index].title}</span>
              <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs uppercase tracking-[0.3em]">
                {testimonials[index].relation}
              </span>
              {testimonials[index].badge && (
                <span className="text-xs text-[var(--accent-strong)]">
                  {testimonials[index].badge}
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[var(--color-muted)]">
          {testimonials.map((testimonial, idx) => (
            <button
              key={testimonial.name}
              onClick={() => setIndex(idx)}
              className={`h-1 w-8 rounded-full transition ${
                idx === index ? "bg-[var(--accent-strong)]" : "bg-white/10"
              }`}
              aria-label={`Show testimonial from ${testimonial.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
