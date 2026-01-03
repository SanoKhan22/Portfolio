"use client";

import Link from "next/link";
import { Mail, Linkedin, Github, Sparkles, Clock } from "lucide-react";
import { socialLinks } from "@/data/stats";
import { motion } from "framer-motion";
import { useState } from "react";

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  mail: Mail,
} as const;

export function ContactCta() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="group relative overflow-hidden rounded-3xl border border-[var(--color-border)]/50 bg-gradient-to-br from-[rgba(14,110,85,0.15)] via-black/80 to-black/60 px-6 py-12 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl md:rounded-[40px] md:px-10 md:py-16"
    >
      {/* Animated Gradient Border */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-[var(--accent)]/20 via-transparent to-[var(--accent)]/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:rounded-[40px]" />
      
      {/* Floating Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--accent)]/20 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"
      />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)] md:text-sm">
            Let's Connect
          </p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 font-display text-3xl font-bold text-[var(--foreground)] sm:text-4xl md:text-5xl lg:text-6xl break-words"
        >
          Let&apos;s build something{" "}
          <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)] bg-clip-text text-transparent">
            together
          </span>
          .
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-secondary)] md:mt-6 md:text-lg"
        >
          I partner with founders, product, and growth teams as an embedded
          engineer. Book a working session, request a build, or send a loom — I&apos;ll
          respond in under 12 hours.
        </motion.p>

        {/* Response Time Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--surface)]/50 px-4 py-2 backdrop-blur-sm"
        >
          <Clock className="h-4 w-4 text-[var(--accent)]" />
          <span className="text-sm text-[var(--muted)]">
            <span className="font-semibold text-[var(--foreground)]">12-hour</span> response time
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col gap-5 sm:flex-row sm:gap-4 md:mt-10"
        >
          {/* Primary CTA */}
          <Link
            href="https://calendly.com/hey-sano/intro"
            target="_blank"
            onMouseEnter={() => setHoveredButton("call")}
            onMouseLeave={() => setHoveredButton(null)}
            className="group/btn relative overflow-hidden rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)] px-8 py-4 text-base font-bold text-black shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95 sm:px-10"
          >
            <motion.div
              animate={{
                scale: hoveredButton === "call" ? 1 : 0,
                opacity: hoveredButton === "call" ? 1 : 0,
              }}
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
            />
            <span className="relative z-10">Book a Call</span>
          </Link>

          {/* Secondary CTA */}
          <Link
            href="mailto:hey@sano.dev"
            onMouseEnter={() => setHoveredButton("email")}
            onMouseLeave={() => setHoveredButton(null)}
            className="group/btn relative overflow-hidden rounded-full border-2 border-[var(--color-border)]/50 bg-[var(--surface)]/50 px-8 py-4 text-base font-bold text-[var(--foreground)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent)]/50 hover:bg-[var(--surface-raised)]/80 active:scale-95 sm:px-10"
          >
            <motion.div
              animate={{
                scale: hoveredButton === "email" ? 1 : 0,
                opacity: hoveredButton === "email" ? 0.1 : 0,
              }}
              className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)]"
            />
            <span className="relative z-10">Email Me</span>
          </Link>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-8 md:mt-10"
        >
          <p className="mb-4 text-sm font-medium text-[var(--muted)]">Or find me on</p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link, index) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap] ?? Mail;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  onMouseEnter={() => setHoveredSocial(link.label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group/social relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-5 py-3 backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent)]/50 hover:bg-white/10"
                >
                  <motion.div
                    animate={{
                      scale: hoveredSocial === link.label ? 1 : 0,
                      opacity: hoveredSocial === link.label ? 0.1 : 0,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)]"
                  />
                  <div className="relative z-10 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[var(--muted)] transition-colors group-hover/social:text-[var(--accent)]" />
                    <span className="text-sm font-medium text-[var(--muted)] transition-colors group-hover/social:text-[var(--foreground)]">
                      {link.label}
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
