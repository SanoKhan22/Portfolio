"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

function TestimonialCard({ testimonial, index }: { testimonial: any; index: number }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative h-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--surface)]/50 p-8 backdrop-blur-sm transition-all hover:border-[var(--accent)]/30 hover:bg-[var(--surface)]/70 hover:shadow-xl hover:shadow-[var(--accent)]/5"
      style={{
        backfaceVisibility: "hidden",
        WebkitFontSmoothing: "subpixel-antialiased",
      }}
    >
      {/* Header with Avatar and Info */}
      <div className="mb-6 flex items-start gap-4">
        {/* Avatar */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-strong)] font-display text-lg font-semibold text-[var(--button-text)] shadow-md">
          {testimonial.avatar || testimonial.name.charAt(0)}
        </div>

        {/* Name and Title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-[var(--foreground)] text-base truncate">
              {testimonial.name}
            </h3>
            {testimonial.verified && (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--accent-strong)]" />
            )}
          </div>
          <p className="text-sm text-[var(--color-muted)] truncate">
            {testimonial.title}
          </p>
          <p className="text-sm text-[var(--color-muted)]/70 flex items-center gap-1.5">
            {testimonial.company && (
              <>
                <span>{testimonial.company}</span>
                {testimonial.badge && (
                  <>
                    <span className="text-[var(--color-muted)]/40">•</span>
                    <span className="text-xs">{testimonial.badge}</span>
                  </>
                )}
              </>
            )}
          </p>
        </div>
      </div>

      {/* Quote */}
      <p className="relative text-[15px] leading-relaxed text-[var(--muted)] mb-6">
        "{testimonial.quote}"
      </p>

      {/* Footer - Source Badge */}
      {testimonial.source && (
        <div className="flex items-center gap-2 pt-4 border-t border-[var(--color-border)]/30">
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
            <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent-strong)]" />
            <span>via <span className="font-medium text-[var(--foreground)]">{testimonial.source}</span></span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function EnhancedTestimonials() {
  const displayTestimonials = testimonials.slice(0, 4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [displayTestimonials.length]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
  };

  // Get visible testimonials (show 2 at a time on desktop, 1 on mobile)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 2; i++) {
      const index = (currentIndex + i) % displayTestimonials.length;
      visible.push({ ...displayTestimonials[index], displayIndex: i });
    }
    return visible;
  };

  return (
    <section id="social-proof" className="relative space-y-8 py-12">
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

      {/* Auto-Carousel */}
      <div className="relative">
        {/* Desktop: 2 cards visible */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 gap-6 min-h-[400px]">
            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
              {getVisibleTestimonials().map((testimonial, idx) => (
                <motion.div
                  key={`${currentIndex}-${idx}`}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
                  transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <TestimonialCard testimonial={testimonial} index={idx} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: 1 card visible */}
        <div className="md:hidden min-h-[450px]">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <TestimonialCard testimonial={displayTestimonials[currentIndex]} index={0} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--surface)]/50 backdrop-blur-sm transition-all hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/10"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-5 w-5 text-[var(--foreground)]" />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {displayTestimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "w-8 bg-[var(--accent-strong)]"
                    : "w-2 bg-[var(--color-border)] hover:bg-[var(--accent)]/50"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--surface)]/50 backdrop-blur-sm transition-all hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/10"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-5 w-5 text-[var(--foreground)]" />
          </button>
        </div>
      </div>
    </section>
  );
}
