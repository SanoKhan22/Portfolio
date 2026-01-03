"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/animations/Counter";
import { highlightStats } from "@/data/stats";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { useGitHubTimeline } from "@/hooks/useGitHub";
import { Code2, Calendar, TrendingUp, FolderGit2, Star } from "lucide-react";

export function StatsSection() {
    const { timelineRepos, isLoading } = useGitHubTimeline();

    // Calculate dynamic GitHub metrics
    const githubStats = (() => {
        if (!timelineRepos || timelineRepos.length === 0) {
            return {
                productionApps: 0,
                allProjects: 0,
                languagesMastered: 0,
                yearsCoding: 0,
                totalStars: 0,
            };
        }

        // Production apps (repos with 'production' topic)
        const productionApps = timelineRepos.filter(repo => 
            repo.topics?.includes('production')
        ).length;

        // All projects count
        const allProjects = timelineRepos.length;

        // Languages mastered (unique languages, excluding 'unknown')
        const uniqueLanguages = new Set<string>();
        timelineRepos.forEach((repo) => {
            if (repo.primaryLanguage && 
                repo.primaryLanguage.toLowerCase() !== 'unknown' &&
                repo.primaryLanguage.trim() !== '') {
                uniqueLanguages.add(repo.primaryLanguage);
            }
            repo.languages?.forEach((lang) => {
                if (lang && 
                    lang.toLowerCase() !== 'unknown' &&
                    lang.trim() !== '') {
                    uniqueLanguages.add(lang);
                }
            });
        });
        const languagesMastered = uniqueLanguages.size;

        // Years coding (from oldest repo to current year)
        const repoYears = timelineRepos
            .map((repo) => new Date(repo.createdAt).getFullYear())
            .filter((year) => !isNaN(year));
        const oldestYear = repoYears.length > 0 ? Math.min(...repoYears) : new Date().getFullYear();
        const currentYear = new Date().getFullYear();
        const yearsCoding = currentYear - oldestYear + 1;

        // Placeholder for total stars (can be enhanced with GitHub API)
        const totalStars = 0;

        return {
            productionApps,
            allProjects,
            languagesMastered,
            yearsCoding,
            totalStars,
        };
    })();

    // 3 Key Metrics: Experiments, Languages Mastered, Years Coding
    const allStats = [
        {
            label: "Experiments",
            value: isLoading ? "..." : githubStats.allProjects.toString(),
            command: "node stats.js --experiments",
            suffix: "",
            icon: TrendingUp,
            isGitHub: true,
        },
        {
            label: "Languages",
            value: isLoading ? "..." : githubStats.languagesMastered.toString(),
            command: "node stats.js --languages",
            suffix: "+",
            icon: Code2,
            isGitHub: true,
        },
        {
            label: "Years Coding",
            value: isLoading ? "..." : githubStats.yearsCoding.toString(),
            command: "node stats.js --years",
            suffix: "",
            icon: Calendar,
            isGitHub: true,
        },
    ];

    return (
        <section className="py-8 md:py-12">
            <StaggerContainer className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
                {allStats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--surface-raised)]/70 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[var(--accent)]/50 hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.15)] md:rounded-3xl md:p-8"
                    >
                        {/* Terminal Window Header */}
                        <div className="mb-4 flex items-center gap-1.5 border-b border-[var(--color-border)]/30 pb-3">
                            <div className="h-2.5 w-2.5 rounded-full bg-red-500/70 transition-all group-hover:bg-red-500" />
                            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70 transition-all group-hover:bg-yellow-500" />
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500/70 transition-all group-hover:bg-green-500" />
                            <span className="ml-2 font-mono text-xs text-[var(--color-muted)]">{stat.label}</span>
                        </div>

                        {/* Terminal Command */}
                        <div className="mb-3 font-mono text-sm text-[var(--color-secondary)]">
                            <span className="text-green-400">$</span> {stat.command}
                        </div>

                        {/* Terminal Output - Loading State */}
                        <div className="mb-2 font-mono text-xs text-[var(--color-muted)]">
                            <span className="text-blue-400">▸</span> Running analysis...
                        </div>

                        {/* Terminal Output - Result */}
                        <div className="mb-3 flex items-baseline gap-2 font-mono text-sm">
                            <span className="text-green-400">✓</span>
                            <span className="font-display text-4xl font-semibold text-[var(--foreground)] md:text-5xl lg:text-6xl">
                                {stat.isGitHub && !isLoading ? (
                                    <>
                                        <Counter value={parseInt(stat.value) || 0} />
                                        {stat.suffix}
                                    </>
                                ) : (
                                    <>
                                        {stat.value}
                                        {stat.suffix}
                                    </>
                                )}
                            </span>
                        </div>

                        {/* Label */}
                        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] md:text-sm md:tracking-[0.3em]">
                            {stat.label}
                        </p>

                        {/* Blinking Cursor */}
                        <motion.div
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="inline-block h-4 w-2 bg-[var(--accent)] md:h-5"
                        />

                        {/* Gradient Overlay on Hover */}
                        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent)]/0 to-[var(--accent)]/0 opacity-0 transition-opacity duration-300 group-hover:from-[var(--accent)]/5 group-hover:to-[var(--accent)]/10 group-hover:opacity-100 md:rounded-3xl" />
                        
                        {/* Retro CRT Scan Lines */}
                        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15)_0px,rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] opacity-20 md:rounded-3xl" />
                    </motion.div>
                ))}
            </StaggerContainer>
        </section>
    );
}
