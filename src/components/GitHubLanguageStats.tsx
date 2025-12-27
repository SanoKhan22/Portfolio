"use client";

import { motion } from "framer-motion";
import { useGitHubStats } from "@/hooks/useGitHub";
import { Code2, TrendingUp } from "lucide-react";

export function GitHubLanguageStats() {
  const { stats, isLoading } = useGitHubStats();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--surface-raised)]/70 p-6 backdrop-blur">
        <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
          <Code2 className="h-4 w-4 animate-pulse" />
          <span>Loading language stats...</span>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  // Sort languages by percentage and get top 8
  const sortedLanguages = Object.entries(stats.languageStats)
    .sort(([, a], [, b]) => b.percentage - a.percentage)
    .slice(0, 8);

  const totalRepos = stats.totalRepos;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--surface-raised)]/70 p-6 backdrop-blur md:rounded-3xl md:p-8"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-[var(--accent)]" />
            <h3 className="font-display text-xl text-white md:text-2xl">
              Language Distribution
            </h3>
          </div>
          <p className="mt-1 text-xs text-[var(--color-muted)] md:text-sm">
            From {totalRepos} production repositories
          </p>
        </div>
        <TrendingUp className="h-6 w-6 text-[var(--accent)]/50" />
      </div>

      {/* Language Bars */}
      <div className="space-y-4">
        {sortedLanguages.map(([language, data], index) => (
          <motion.div
            key={language}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: data.color }}
                />
                <span className="text-sm font-medium text-white">
                  {language}
                </span>
              </div>
              <span className="text-xs text-[var(--color-muted)]">
                {data.percentage.toFixed(1)}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 overflow-hidden rounded-full bg-[var(--surface)]/50">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${data.percentage}%` }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 + 0.2, duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  backgroundColor: data.color,
                  boxShadow: `0 0 10px ${data.color}40`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-6 flex items-center gap-4 border-t border-[var(--color-border)]/50 pt-4"
      >
        <div className="text-center">
          <p className="text-2xl font-bold text-[var(--accent)]">
            {sortedLanguages.length}
          </p>
          <p className="text-xs text-[var(--color-muted)]">Languages</p>
        </div>
        <div className="h-8 w-px bg-[var(--color-border)]/50" />
        <div className="text-center">
          <p className="text-2xl font-bold text-[var(--accent)]">
            {totalRepos}
          </p>
          <p className="text-xs text-[var(--color-muted)]">Repositories</p>
        </div>
        <div className="h-8 w-px bg-[var(--color-border)]/50" />
        <div className="flex-1 text-center">
          <p className="text-2xl font-bold text-[var(--accent)]">
            {sortedLanguages[0]?.[0] || "N/A"}
          </p>
          <p className="text-xs text-[var(--color-muted)]">Top Language</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
