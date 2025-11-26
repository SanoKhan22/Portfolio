"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/animations/Counter";
import { highlightStats } from "@/data/stats";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

export function StatsSection() {
    return (
        <section className="py-8 md:py-12">
            <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {highlightStats.map((stat) => (
                    <motion.div
                        key={stat.label}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="rounded-2xl border border-[var(--color-border)] bg-[var(--surface-raised)]/70 p-6 text-center backdrop-blur transition-shadow hover:shadow-[var(--glow)] md:rounded-3xl md:p-8"
                    >
                        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] md:text-sm md:tracking-[0.3em]">
                            {stat.label}
                        </p>
                        <p className="mt-2 font-display text-3xl font-semibold text-white md:mt-3 md:text-4xl lg:text-5xl">
                            <Counter value={stat.value} />
                        </p>
                    </motion.div>
                ))}
            </StaggerContainer>
        </section>
    );
}
