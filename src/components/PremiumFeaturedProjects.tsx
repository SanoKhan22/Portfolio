"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useGitHubRepos } from "@/hooks/useGitHub";
import { ExternalLink, Code2 } from "lucide-react";
import type { GitHubRepo } from "@/lib/github";

// Premium 3D Project Card with Advanced Parallax and Project Images
function Premium3DProjectCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D transforms
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth motion
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 300,
    damping: 30,
  });

  // Parallax depth for layers
  const layer1X = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const layer1Y = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);
  const layer2X = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const layer2Y = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  // Glow effect
  const glowX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const topLanguages = repo.languages.edges.slice(0, 2); // Only top 2 languages

  // GitHub's auto-generated Open Graph image
  const githubOgImage = `https://opengraph.githubassets.com/1/${repo.url.split('github.com/')[1]}`;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
        backfaceVisibility: "hidden",
        WebkitFontSmoothing: "antialiased",
        willChange: 'auto',
      }}
      whileHover={{ scale: 1.02 }}
      className="group relative h-auto w-full cursor-pointer"
    >
      {/* Card Container with Glassmorphism */}
      <div className="relative h-full w-full overflow-hidden rounded-3xl border border-[var(--color-border)]/40 bg-gradient-to-br from-[var(--surface)]/95 via-[var(--surface)]/85 to-[var(--surface-raised)]/95 shadow-2xl backdrop-blur-xl transition-all duration-500 group-hover:border-[var(--color-accent)]/30 group-hover:shadow-[0_0_40px_rgba(var(--color-accent-rgb),0.15)]">
        
        {/* Subtle Accent Gradient - Only on Hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `radial-gradient(800px circle at ${glowX}% ${glowY}%, rgba(var(--color-accent-rgb), 0.03), transparent 50%)`,
          }}
        />

        {/* Project Preview Image */}
        <motion.div
          style={{
            x: layer1X,
            y: layer1Y,
            transformStyle: "preserve-3d",
            transform: "translateZ(40px)",
          }}
          className="relative h-48 w-full overflow-hidden border-b border-[var(--color-border)]/30 bg-gradient-to-br from-[var(--color-accent)]/5 to-purple-600/5"
        >
          {!imageError ? (
            <motion.img
              src={githubOgImage}
              alt={`${repo.name} preview`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[var(--color-accent)]/10 to-purple-600/10">
              <Code2 className="h-16 w-16 text-[var(--color-accent)]/40" />
              <p className="text-sm font-medium text-white/40">{repo.name}</p>
            </div>
          )}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/90 via-transparent to-transparent" />
        </motion.div>

        {/* Content Section */}
        <div className="relative space-y-5 p-6">
          {/* Header */}
          <motion.div
            style={{
              x: layer2X,
              y: layer2Y,
              transformStyle: "preserve-3d",
              transform: "translateZ(30px)",
            }}
            className="flex items-center gap-3"
          >
            {repo.primaryLanguage && (
              <div className="flex items-center gap-2 rounded-full border border-[var(--color-border)]/50 bg-[var(--surface-raised)]/80 px-3 py-1.5 backdrop-blur-sm">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: repo.primaryLanguage.color }}
                />
                <span className="text-xs font-medium text-white/90">
                  {repo.primaryLanguage.name}
                </span>
              </div>
            )}
          </motion.div>

          {/* Project Title */}
          <motion.div
            style={{
              x: layer2X,
              y: layer2Y,
              transformStyle: "preserve-3d",
              transform: "translateZ(30px)",
            }}
          >
            <h3 className="mb-2 text-2xl font-bold text-white">{repo.name}</h3>
            <p className="line-clamp-2 text-sm text-white/70">
              {repo.description || "No description available"}
            </p>
          </motion.div>

          {/* Tech Stack - Top 2 Languages */}
          <motion.div
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(25px)",
            }}
            className="flex flex-wrap gap-2"
          >
            {topLanguages.map((lang) => (
              <div
                key={lang.node.name}
                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium backdrop-blur-sm"
                style={{
                  backgroundColor: `${lang.node.color}10`,
                  borderColor: `${lang.node.color}40`,
                  color: lang.node.color,
                }}
              >
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: lang.node.color }}
                />
                <span>{lang.node.name}</span>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(20px)",
            }}
            className="flex items-center justify-between border-t border-[var(--color-border)]/30 pt-4"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-lg bg-[var(--surface-raised)]/50 px-3 py-1.5">
                <Code2 className="h-3.5 w-3.5 text-white/60" />
                <span className="text-xs font-medium text-white/70">
                  {repo.commitCount?.toLocaleString() || 0} commits
                </span>
              </div>
            </div>

            <motion.a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 rounded-lg bg-[var(--color-accent)]/10 px-4 py-2 text-sm font-medium text-[var(--color-accent)] transition hover:bg-[var(--color-accent)]/20"
              onClick={(e) => e.stopPropagation()}
            >
              View Project
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>

        {/* 3D Depth Indicator */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(50px)",
          }}
        />
      </div>
    </motion.div>
  );
}

// Main Component
export function PremiumFeaturedProjects() {
  const { repos, isLoading, isError } = useGitHubRepos();

  // Show exactly 3 projects
  const displayRepos = repos?.slice(0, 3) || [];

  console.log('[PremiumFeaturedProjects] Showing', displayRepos.length, 'repos (max 3)');

  if (isLoading) {
    return (
      <section className="relative overflow-hidden bg-[var(--background)] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-4 py-2 text-sm font-medium text-[var(--color-accent)]"
            >
              Featured Projects
            </motion.div>
            <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
              Loading Premium Projects...
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 animate-pulse rounded-3xl bg-[var(--surface)]/50"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="relative overflow-hidden bg-[var(--background)] px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-2xl font-bold text-white">Error Loading Projects</h2>
          <p className="mt-4 text-white/60">Failed to load GitHub projects</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[var(--background)] px-6 py-24">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-600/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-4 py-2 text-sm font-medium text-[var(--color-accent)]"
          >
            Featured Projects
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-bold text-white md:text-5xl"
          >
            Premium Production Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/60"
          >
            Explore my top 3 production-ready projects, ranked by commit activity and engineering excellence
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayRepos.map((repo, index) => (
            <Premium3DProjectCard key={repo.url} repo={repo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
