"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGitHubContributions } from "@/hooks/useGitHub";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ChevronLeft, ChevronRight, Activity } from "lucide-react";

const CONTRIBUTION_COLORS = {
  NONE: "var(--surface-raised)",
  LEVEL_1: "#0e4429",
  LEVEL_2: "#006d32",
  LEVEL_3: "#26a641",
  LEVEL_4: "#39d353",
};

function getContributionLevel(count: number): string {
  if (count === 0) return CONTRIBUTION_COLORS.NONE;
  if (count <= 2) return CONTRIBUTION_COLORS.LEVEL_1;
  if (count <= 5) return CONTRIBUTION_COLORS.LEVEL_2;
  if (count <= 10) return CONTRIBUTION_COLORS.LEVEL_3;
  return CONTRIBUTION_COLORS.LEVEL_4;
}

function getMonthLabel(dateString: string): string | null {
  const date = new Date(dateString);
  const dayOfMonth = date.getDate();
  
  // Show month label for first week of each month
  if (dayOfMonth <= 7) {
    return date.toLocaleDateString("en-US", { month: "short" });
  }
  return null;
}

export function GitHubContributionsCalendar() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
  } | null>(null);

  const { contributions, isLoading, isError } = useGitHubContributions(
    "SanoKhan22",
    selectedYear
  );

  const handlePreviousYear = () => setSelectedYear((y) => y - 1);
  const handleNextYear = () => setSelectedYear((y) => Math.min(y + 1, currentYear));

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center">
        <p className="text-sm text-red-400">Failed to load contribution data</p>
      </div>
    );
  }

  return (
    <RevealOnScroll>
      <section id="contributions" className="space-y-6 py-8 md:space-y-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] md:text-sm md:tracking-[0.3em]">
              <Activity className="h-4 w-4" />
              GitHub Activity
            </p>
            <h2 className="mt-2 font-display text-2xl text-white md:mt-3 md:text-3xl">
              Contribution Calendar
            </h2>
          </div>
          
          {/* Year Selector */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePreviousYear}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--surface)] p-2 text-white transition hover:bg-[var(--surface-raised)]"
              aria-label="Previous year"
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.button>
            
            <span className="min-w-[4rem] text-center font-mono text-lg font-semibold text-white">
              {selectedYear}
            </span>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNextYear}
              disabled={selectedYear >= currentYear}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--surface)] p-2 text-white transition hover:bg-[var(--surface-raised)] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next year"
            >
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px] rounded-2xl border border-[var(--color-border)] bg-[var(--surface)]/80 p-6 backdrop-blur md:rounded-3xl">
            {isLoading ? (
              <div className="flex h-32 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-accent)] border-t-transparent" />
              </div>
            ) : contributions ? (
              <div className="space-y-4">
                {/* Total Contributions */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">
                    {contributions.totalContributions.toLocaleString()}
                  </span>
                  <span className="text-sm text-[var(--color-muted)]">
                    contributions in {selectedYear}
                  </span>
                </div>

                {/* Contribution Grid */}
                <div className="relative">
                  <div className="flex gap-1">
                    {contributions.weeks.map((week, weekIndex) => {
                      const monthLabel = getMonthLabel(week.contributionDays[0].date);
                      
                      return (
                        <div key={weekIndex} className="relative flex flex-col gap-1">
                          {/* Month label */}
                          {monthLabel && (
                            <div className="absolute -top-6 left-0 text-xs text-[var(--color-muted)]">
                              {monthLabel}
                            </div>
                          )}
                          
                          {/* Days in week */}
                          {week.contributionDays.map((day, dayIndex) => {
                            const level = getContributionLevel(day.contributionCount);
                            const date = new Date(day.date);
                            
                            return (
                              <motion.div
                                key={day.date}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: (weekIndex * 7 + dayIndex) * 0.001,
                                  duration: 0.2,
                                }}
                                whileHover={{ scale: 1.5, zIndex: 10 }}
                                onMouseEnter={() =>
                                  setHoveredDay({
                                    date: day.date,
                                    count: day.contributionCount,
                                  })
                                }
                                onMouseLeave={() => setHoveredDay(null)}
                                className="h-3 w-3 rounded-sm transition-all"
                                style={{
                                  backgroundColor: level,
                                  outline:
                                    hoveredDay?.date === day.date
                                      ? "2px solid var(--color-accent)"
                                      : "none",
                                }}
                                title={`${date.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}: ${day.contributionCount} contributions`}
                              />
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>

                  {/* Tooltip */}
                  {hoveredDay && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-1/2 top-full mt-4 -translate-x-1/2 transform whitespace-nowrap rounded-lg border border-[var(--color-border)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-white shadow-lg"
                    >
                      <div className="font-semibold">
                        {hoveredDay.count} contribution{hoveredDay.count !== 1 ? "s" : ""}
                      </div>
                      <div className="text-xs text-[var(--color-muted)]">
                        {new Date(hoveredDay.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                  <span>Less</span>
                  <div className="flex gap-1">
                    {Object.values(CONTRIBUTION_COLORS).map((color, i) => (
                      <div
                        key={i}
                        className="h-3 w-3 rounded-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
}
