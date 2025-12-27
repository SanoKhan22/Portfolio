"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useGitHubRepos } from "@/hooks/useGitHub";
import { Counter } from "@/components/animations/Counter";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ExternalLink, Star, GitFork, Code2, Calendar } from "lucide-react";
import type { GitHubRepo } from "@/lib/github";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function getTopLanguages(repo: GitHubRepo, count: number = 3): string[] {
  return repo.languages.edges
    .slice(0, count)
    .map((lang) => lang.node.name);
}

function DynamicProjectCard({ repo }: { repo: GitHubRepo }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const topLanguages = getTopLanguages(repo);
  const hasHomepage = repo.homepageUrl !== null;

  return (
    <motion.article
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02, z: 20 }}
      whileTap={{ scale: 0.98 }}
      className="group flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--surface)]/80 p-4 backdrop-blur md:gap-4 md:rounded-3xl md:p-6"
    >
      {/* Header with Language Indicator */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {repo.primaryLanguage && (
            <div className="flex items-center gap-1.5">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: repo.primaryLanguage.color }}
              />
              <span className="text-xs text-[var(--color-muted)]">
                {repo.primaryLanguage.name}
              </span>
            </div>
          )}
        </div>
        
        {hasHomepage && (
          <a
            href={repo.homepageUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-1.5 transition hover:bg-[var(--surface-raised)]"
            aria-label="Visit live site"
          >
            <ExternalLink className="h-4 w-4 text-[var(--color-accent)]" />
          </a>
        )}
      </div>

      {/* Project Name & Description */}
      <div className="space-y-2 md:space-y-3">
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link"
        >
          <h3 className="font-display text-xl text-white transition group-hover/link:text-[var(--color-accent)] md:text-2xl">
            {repo.name}
            <ExternalLink className="ml-1 inline-block h-4 w-4 opacity-0 transition group-hover/link:opacity-100" />
          </h3>
        </a>
        
        <p className="line-clamp-3 text-xs text-[var(--color-muted)] md:text-sm">
          {repo.description || "A production project showcasing modern development practices."}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 text-[10px] text-[var(--color-muted)] md:gap-2 md:text-xs">
          {repo.languages.edges.slice(0, 5).map((lang) => (
            <span
              key={lang.node.name}
              className="rounded-full border border-[var(--color-border)] px-2 py-0.5 md:px-3 md:py-1"
              style={{
                borderColor: lang.node.color,
                color: lang.node.color,
              }}
            >
              {lang.node.name}
            </span>
          ))}
        </div>

        {/* Topics/Tags */}
        {repo.repositoryTopics.nodes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {repo.repositoryTopics.nodes.slice(0, 3).map((topic) => (
              <span
                key={topic.topic.name}
                className="rounded-full bg-[var(--color-accent)]/10 px-2 py-0.5 text-[10px] text-[var(--color-accent)] md:px-3 md:py-1 md:text-xs"
              >
                #{topic.topic.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-auto grid grid-cols-3 gap-2 md:gap-3">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--surface-raised)]/70 p-2 text-white md:rounded-2xl md:p-3"
        >
          <Star className="h-3 w-3 text-yellow-500 md:h-4 md:w-4" />
          <p className="text-sm font-semibold md:text-lg">
            <Counter value={String(repo.stargazerCount)} />
          </p>
          <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-muted)] md:text-xs">
            Stars
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col items-center gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--surface-raised)]/70 p-2 text-white md:rounded-2xl md:p-3"
        >
          <GitFork className="h-3 w-3 text-blue-500 md:h-4 md:w-4" />
          <p className="text-sm font-semibold md:text-lg">
            <Counter value={String(repo.forkCount)} />
          </p>
          <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-muted)] md:text-xs">
            Forks
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col items-center gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--surface-raised)]/70 p-2 text-white md:rounded-2xl md:p-3"
        >
          <Calendar className="h-3 w-3 text-green-500 md:h-4 md:w-4" />
          <p className="text-[10px] font-semibold md:text-xs">
            {formatDate(repo.updatedAt)}
          </p>
          <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-muted)] md:text-xs">
            Updated
          </p>
        </motion.div>
      </div>
    </motion.article>
  );
}

export function DynamicProjects() {
  const { repos, isLoading, isError } = useGitHubRepos();

  return (
    <section id="dynamic-projects" className="space-y-6 py-8 md:space-y-8 md:py-12">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] md:text-sm md:tracking-[0.3em]">
            <Code2 className="h-4 w-4" />
            Live from GitHub
          </p>
          <h2 className="mt-2 font-display text-2xl text-white md:mt-3 md:text-3xl">
            Production Projects
          </h2>
        </div>
        <p className="mt-2 max-w-2xl text-xs text-[var(--color-muted)] md:mt-0 md:text-sm">
          Real-time data from my GitHub repositories tagged as production-ready. 
          Each project is actively maintained and deployed.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-96 animate-pulse rounded-2xl border border-[var(--color-border)] bg-[var(--surface)]/50 md:rounded-3xl"
            />
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <p className="text-sm text-red-400">
            Failed to load projects. Falling back to static data.
          </p>
        </div>
      )}

      {/* Projects Grid */}
      {repos && repos.length > 0 && (
        <RevealOnScroll>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {repos.map((repo) => (
              <DynamicProjectCard key={repo.name} repo={repo} />
            ))}
          </div>
        </RevealOnScroll>
      )}

      {/* Empty State */}
      {repos && repos.length === 0 && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--surface)]/50 p-8 text-center">
          <p className="text-sm text-[var(--color-muted)]">
            No production projects found. Tag repositories with "production" topic to display them here.
          </p>
        </div>
      )}
    </section>
  );
}
