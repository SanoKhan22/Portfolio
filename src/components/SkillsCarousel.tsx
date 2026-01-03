"use client";

import { skillCategories } from "@/data/skills";
import { PremiumSkillsMarquee } from "@/components/animations/PremiumSkillsMarquee";

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
          <h2 className="mt-2 font-display text-2xl text-[var(--foreground)] md:mt-3 md:text-3xl">
            Full-stack product + growth systems
          </h2>
        </div>
      </div>

      {/* Premium infinite scrolling skills marquee with custom fonts */}
      <div className="-mx-4 md:-mx-6">
        <PremiumSkillsMarquee items={allSkills} />
      </div>
    </section>
  );
}
