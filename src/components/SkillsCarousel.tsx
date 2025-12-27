"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { PremiumSkillsMarquee } from "@/components/animations/PremiumSkillsMarquee";
import { GitHubLanguageStats } from "@/components/GitHubLanguageStats";

export function SkillsCarousel() {
  // Collect all unique skills for marquee
  const allSkills = Array.from(
    new Set(skillCategories.flatMap((category) => category.stack))
  );

  return (
    <section id="skills" className="space-y-6 py-8 md:space-y-8 md:py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] md:text-sm md:tracking-[0.3em]">
            What I do
          </p>
          <h2 className="mt-2 font-display text-2xl text-white md:mt-3 md:text-3xl">
            Full-stack product + growth systems
          </h2>
        </div>
      </div>

      {/* Premium infinite scrolling skills marquee with custom fonts */}
      <div className="-mx-4 md:-mx-6">
        <PremiumSkillsMarquee items={allSkills} />
      </div>

      {/* GitHub Language Statistics */}
      <div className="mt-8">
        <GitHubLanguageStats />
      </div>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
        {skillCategories.map((category, index) => (
          <motion.article
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.08, duration: 0.6 }}
            className="snap-center flex-shrink-0 w-[85vw] rounded-2xl border border-[var(--color-border)] bg-[var(--surface-raised)]/70 p-5 shadow-[var(--shadow-soft)] backdrop-blur md:w-auto md:rounded-3xl md:p-6"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] md:text-sm md:tracking-[0.3em]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-display text-xl text-white md:mt-3 md:text-2xl">{category.title}</h3>
            <p className="mt-1 text-xs text-[var(--color-muted)] md:mt-2 md:text-sm">{category.subtitle}</p>
            <ul className="mt-4 space-y-2 text-xs text-white/90 md:mt-6 md:space-y-3 md:text-sm">
              {category.highlights.map((highlight) => (
                <motion.li
                  key={highlight}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex items-start gap-2"
                >
                  <motion.span
                    className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent-strong)]"
                    whileHover={{ scale: 1.5 }}
                  />
                  <span>{highlight}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2 md:mt-6">
              {category.stack.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(14, 110, 85, 0.2)",
                    borderColor: "var(--accent-strong)",
                    boxShadow: "0 0 20px rgba(51, 255, 180, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full border border-[var(--color-border)]/70 px-3 py-1 text-xs text-[var(--color-muted)] cursor-pointer transition"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
