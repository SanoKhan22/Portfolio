"use client";

import { motion } from "framer-motion";
import { timeline } from "@/data/timeline";
import type { TimelineEntry } from "@/data/timeline";
import { Terminal, Code2, ExternalLink } from "lucide-react";
import { 
  SiAndroid, 
  SiApple, 
  SiReact, 
  SiShopify, 
  SiFirebase,
  SiPython,
  SiNodedotjs
} from "react-icons/si";
import { 
  Smartphone, 
  Globe, 
  ShoppingCart, 
  Briefcase, 
  Wrench, 
  BookOpen, 
  Package, 
  Glasses,
  Brain,
  BarChart3,
  Server
} from "lucide-react";
import { useGitHubTimeline } from "@/hooks/useGitHub";
import { useMemo, useState, useRef, useEffect } from "react";

// Badge configuration with icons and colors
const badgeConfig: Record<string, { icon: any; label: string; color: string }> = {
  mobile: { icon: Smartphone, label: "Mobile App", color: "#10B981" },
  ios: { icon: SiApple, label: "iOS", color: "#007AFF" },
  android: { icon: SiAndroid, label: "Android", color: "#3DDC84" },
  web: { icon: Globe, label: "Web App", color: "#06B6D4" },
  ecommerce: { icon: ShoppingCart, label: "E-commerce", color: "#F97316" },
  portfolio: { icon: Briefcase, label: "Portfolio", color: "#8B5CF6" },
  tool: { icon: Wrench, label: "Tool/Utility", color: "#6B7280" },
  education: { icon: BookOpen, label: "Education", color: "#3B82F6" },
  general: { icon: Package, label: "General Project", color: "#64748B" },
  arvr: { icon: Glasses, label: "AR/VR", color: "#EC4899" },
  ai: { icon: Brain, label: "AI/ML", color: "#A855F7" },
  analytics: { icon: BarChart3, label: "Analytics", color: "#F59E0B" },
  backend: { icon: Server, label: "Backend/API", color: "#14B8A6" },
  default: { icon: Package, label: "Project", color: "#64748B" },
};

function TimelineItem({ 
  entry, 
  index, 
  isGitHub = false,
  badge = "default"
}: { 
  entry: TimelineEntry; 
  index: number;
  isGitHub?: boolean;
  badge?: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const typeColors = {
    work: "#10B981",
    education: "#3B82F6",
    project: "#8B5CF6",
    achievement: "#F59E0B",
  };

  const badgeInfo = badgeConfig[badge] || badgeConfig.default;
  const BadgeIcon = badgeInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      className="group relative flex min-w-[280px] flex-col md:min-w-[320px]"
    >
      {/* Timeline Node with Badge Icon or Emoji */}
      <div className="relative mb-4 flex items-center">
        <div
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 + 0.2, type: "spring", stiffness: 200 }}
            className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 bg-[var(--surface)] transition-all group-hover:scale-110"
            style={{ borderColor: isGitHub ? badgeInfo.color : typeColors[entry.type] }}
          >
            {isGitHub ? (
              <BadgeIcon size={20} style={{ color: badgeInfo.color }} />
            ) : (
              <span className="text-2xl">{entry.icon}</span>
            )}
          </motion.div>
          
          {/* Tooltip for GitHub repos */}
          {isGitHub && showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[var(--color-border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-white shadow-lg"
            >
              {badgeInfo.label}
              <div 
                className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-[var(--color-border)] bg-[var(--surface)]"
              />
            </motion.div>
          )}
        </div>

        {/* Horizontal Line - Always show */}
        <div className="absolute left-12 top-6 h-0.5 w-full bg-gradient-to-r from-[var(--color-border)] to-transparent" />
      </div>

      {/* Content Card */}
      <motion.div
        whileHover={{ y: -4 }}
        className="flex h-full flex-col rounded-xl border border-[var(--color-border)] bg-[var(--surface-raised)]/50 p-4 backdrop-blur transition-all hover:border-[var(--accent)]/30 hover:shadow-lg"
      >
        {/* Header */}
        <div className="mb-3 flex items-center justify-between border-b border-[var(--color-border)]/50 pb-2">
          <span className="font-mono text-xs text-[var(--color-muted)]">
            {entry.date}
          </span>
          
          {isGitHub && entry.url && (
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-muted)] transition-colors hover:text-[var(--accent)]"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-2 font-display text-base font-bold text-white">
          {entry.title}
        </h3>
        <p className="mb-3 font-mono text-xs text-[var(--color-muted)]">
          {entry.organization}
        </p>

        {/* Description */}
        <p className="mb-3 flex-1 text-xs leading-relaxed text-white/70">
          {entry.description}
        </p>

        {/* Technologies */}
        {entry.technologies && entry.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {entry.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-[var(--color-border)]/70 bg-[var(--surface)]/50 px-2 py-0.5 font-mono text-xs text-[var(--color-muted)]"
              >
                {tech}
              </span>
            ))}
            {entry.technologies.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-[var(--color-muted)]">
                +{entry.technologies.length - 3}
              </span>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Timeline() {
  const { timelineRepos, isLoading } = useGitHubTimeline();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Handle edge detection for pulsing hints
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < maxScroll - 10);
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => container.removeEventListener('scroll', handleScroll);
  }, [isLoading, timelineRepos]);

  // Merge GitHub repos with demo timeline data
  const combinedTimeline = useMemo(() => {
    // Transform GitHub repos to TimelineEntry format with badges
    const githubEntries = timelineRepos.map((repo) => {
      const date = new Date(repo.createdAt);
      const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });

      // Choose icon based on repo type or primary language
      let icon = "📦";
      if (repo.type === "work") icon = "💼";
      else if (repo.type === "achievement") icon = "🏆";
      else if (repo.primaryLanguage === "TypeScript" || repo.primaryLanguage === "JavaScript") icon = "⚡";
      else if (repo.primaryLanguage === "Python") icon = "🐍";
      else if (repo.primaryLanguage === "Java") icon = "☕";

      return {
        entry: {
          date: formattedDate,
          title: repo.name.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' '),
          organization: "GitHub Project",
          description: repo.description || "Open source project",
          type: repo.type,
          technologies: repo.languages
            .filter(lang => lang && lang.toLowerCase() !== 'unknown')
            .slice(0, 4),
          icon: icon,
          url: repo.url,
        },
        badge: repo.badge, // Include badge type
        isGitHub: true,
      };
    });

    // Add demo timeline entries
    const demoEntries = timeline.map(entry => ({
      entry,
      badge: "default",
      isGitHub: false,
    }));

    // Combine and sort by date (newest first for left-to-right scroll)
    const combined = [...githubEntries, ...demoEntries];
    
    return combined.sort((a, b) => {
      const dateA = new Date(a.entry.date);
      const dateB = new Date(b.entry.date);
      return dateB.getTime() - dateA.getTime(); // Descending (newest first)
    });
  }, [timelineRepos]);

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />

      <div className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-2">
            <Terminal className="h-4 w-4 text-[var(--accent)]" />
            <span className="font-mono text-sm font-medium text-[var(--accent)]">
              ./experience.sh
            </span>
          </div>
          
          <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
            <span className="font-mono text-[var(--accent)]">{'>'} </span>
            Journey & Experience
          </h2>
          
          <p className="mx-auto mt-4 max-w-2xl text-[var(--color-muted)]">
            <Code2 className="mr-2 inline h-4 w-4" />
            {isLoading 
              ? "Loading timeline from GitHub..." 
              : `${combinedTimeline.length} milestones from first commit to production`
            }
          </p>
        </motion.div>

        {/* Horizontal Scrolling Timeline */}
        <div className="relative">
          {/* Scroll gradient overlays */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[var(--background)] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[var(--background)] to-transparent" />

          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto pb-8 scrollbar-hide"
          >
            {isLoading ? (
              <div className="flex gap-6 px-4 md:gap-8 md:px-8">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="min-w-[280px] md:min-w-[320px] animate-pulse"
                  >
                    <div className="mb-4 h-12 w-12 rounded-full bg-[var(--surface)]" />
                    <div className="h-48 rounded-xl bg-[var(--surface)]/50" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-6 px-4 md:gap-8 md:px-8">
                {combinedTimeline.map((item, index) => (
                  <TimelineItem 
                    key={`${item.entry.title}-${index}`} 
                    entry={item.entry} 
                    index={index}
                    isGitHub={item.isGitHub}
                    badge={item.badge}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Carousel Navigation - 11 Dots with 3 Active */}
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 11 }).map((_, dotIndex) => {
                // Map dot position to timeline progress (0-100%)
                const dotPosition = (dotIndex / 10) * 100;
                
                // Determine if this dot should be active (larger)
                // Active dots represent the visible viewport (~3 cards visible)
                const distanceFromCurrent = Math.abs(scrollProgress - dotPosition);
                const isActive = distanceFromCurrent < 20; // Roughly 3 dots active at once
                
                // Calculate actual timeline index this dot represents
                const representedIndex = Math.round((dotIndex / 10) * (combinedTimeline.length - 1));
                
                return (
                  <motion.button
                    key={dotIndex}
                    onClick={() => {
                      const container = scrollContainerRef.current;
                      if (!container) return;
                      const scrollAmount = (dotIndex / 10) * (container.scrollWidth - container.clientWidth);
                      container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
                    }}
                    initial={{ scale: 0.4 }}
                    animate={{ 
                      scale: isActive ? 0.8 : 0.4,
                      backgroundColor: isActive ? 'var(--accent)' : 'var(--surface)',
                      opacity: isActive ? 1 : 0.5
                    }}
                    whileHover={{ scale: isActive ? 1 : 0.6, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-1 w-1 rounded-full border border-[var(--color-border)] transition-all"
                    title={`Projects around ${representedIndex + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
