"use client";

import { motion } from "framer-motion";
import { useGitHubRepos } from "@/hooks/useGitHub";
import { ExternalLink, Github, GitBranch, Package, Activity } from "lucide-react";
import type { GitHubRepo } from "@/lib/github";
import { useState, useEffect } from "react";

// Fancy Tooltip Component with Typewriter Effect
function Tooltip({ children, label }: { children: React.ReactNode; label: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (isVisible) {
      setDisplayedText("");
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= label.length) {
          setDisplayedText(label.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 50); // 50ms per character
      
      return () => clearInterval(interval);
    }
  }, [isVisible, label]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[var(--accent)] text-white text-xs font-medium rounded-lg whitespace-nowrap shadow-lg"
        >
          <span className="inline-block min-w-[1ch]">{displayedText}</span>
          {displayedText.length < label.length && <span className="animate-pulse">|</span>}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[var(--accent)]" />
        </motion.div>
      )}
    </div>
  );
}

// Clean Project Card with Tech Focus
function ProjectCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const topLanguages = repo.languages.edges.slice(0, 3);
  
  // Calculate total size for percentage
  const totalSize = repo.languages.edges.reduce((sum, lang) => sum + lang.size, 0);
  
  // Use GitHub social preview image, fallback to auto-generated OG image
  const getProjectImage = () => {
    // If repo has custom social preview image uploaded
    if (repo.openGraphImageUrl) {
      // Add cache-busting timestamp to force fresh image load
      return `${repo.openGraphImageUrl}?t=${Date.now()}`;
    }
    // Fallback to GitHub's auto-generated Open Graph image
    return `https://opengraph.githubassets.com/1/${repo.url.split('github.com/')[1]}`;
  };
  
  // Determine project category based on topics
  const getCategory = () => {
    const topics = repo.repositoryTopics.nodes.map(t => t.topic.name.toLowerCase());
    if (topics.includes('mobile') || topics.includes('android') || topics.includes('ios')) return 'Mobile App';
    if (topics.includes('web') || topics.includes('webapp')) return 'Web App';
    if (topics.includes('library') || topics.includes('package')) return 'Library';
    if (topics.includes('tool') || topics.includes('cli')) return 'Tool';
    return 'Project';
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--surface)]/50 backdrop-blur-sm transition-all hover:border-[var(--accent)]/40 hover:bg-[var(--surface)]/70 hover:shadow-xl hover:shadow-[var(--accent)]/5"
    >
      {/* Project Screenshot */}
      <div className="relative w-full overflow-hidden bg-[var(--background)]" style={{ aspectRatio: '1200/630' }}>
        <img
          src={getProjectImage()}
          alt={`${repo.name} screenshot`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
      </div>

      {/* Category Tag */}
      <div className="absolute right-4 top-4 z-10">
        <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent-strong)]">
          {getCategory()}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="mb-2 text-xl font-bold text-white group-hover:text-[var(--accent-strong)] transition-colors">
            {repo.name}
          </h3>
          <p className="text-sm leading-relaxed text-[var(--color-muted)]">
            {repo.description || 'No description available'}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]/70">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {topLanguages.map((lang, i) => {
              const percentage = ((lang.size / totalSize) * 100).toFixed(1);
              return (
                <Tooltip key={i} label={`${percentage}%`}>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] bg-[var(--background)]/50 px-2.5 py-1 text-xs font-medium text-white cursor-help">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: lang.node.color || '#64748B' }}
                    />
                    {lang.node.name}
                  </span>
                </Tooltip>
              );
            })}
          </div>
        </div>

        {/* Metrics */}
        <div className="mb-6 flex items-center gap-6 text-sm text-[var(--color-muted)]">
          <Tooltip label="Total commits">
            <div className="flex items-center gap-1.5 cursor-help">
              <Activity className="h-4 w-4" />
              <span className="font-medium text-white">{repo.commitCount || 0}</span>
            </div>
          </Tooltip>
          <Tooltip label="Dependencies">
            <div className="flex items-center gap-1.5 cursor-help">
              <Package className="h-4 w-4" />
              <span className="font-medium text-white">{repo.dependencyCount || 0}</span>
            </div>
          </Tooltip>
          <Tooltip label="Branches">
            <div className="flex items-center gap-1.5 cursor-help">
              <GitBranch className="h-4 w-4" />
              <span className="font-medium text-white">{repo.branchCount || 0}</span>
            </div>
          </Tooltip>
        </div>

        {/* CTAs */}
        <div className="mt-auto flex gap-3">
          <motion.a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
          >
            <Github className="h-4 w-4" />
            View Code
          </motion.a>
          {repo.homepageUrl && (
            <motion.a
              href={repo.homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 rounded-lg border border-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-strong)] transition hover:bg-[var(--accent)]/10"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </motion.a>
          )}
        </div>
      </div>

      {/* Hover Accent Line */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)] opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.article>
  );
}

export default function PremiumFeaturedProjects() {
  const { repos, isLoading, isError } = useGitHubRepos();

  // Filter for featured projects (with "production" topic)
  const featuredRepos = repos?.filter((repo) =>
    repo.repositoryTopics.nodes.some(
      (topic) => topic.topic.name.toLowerCase() === "production"
    )
  ) || [];

  if (isLoading) {
    return (
      <section className="relative py-24 overflow-hidden" id="projects">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 bg-gradient-to-r from-white via-[var(--accent-strong)] to-white bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
              >
                Featured Projects
              </motion.h2>
            </div>
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="relative py-24 overflow-hidden" id="projects">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 bg-gradient-to-r from-white via-[var(--accent-strong)] to-white bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
              >
                Featured Projects
              </motion.h2>
            </div>
            <div className="text-center text-[var(--color-muted)]">
              <p>Unable to load projects. Please check back later.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 overflow-hidden" id="projects">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[var(--accent)]/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-600/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-4 bg-gradient-to-r from-white via-[var(--accent-strong)] to-white bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                Featured Projects
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-[var(--color-muted)]">
                Production-ready applications showcasing modern web technologies and best practices
              </p>
            </motion.div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredRepos.map((repo, index) => (
              <ProjectCard key={repo.id} repo={repo} index={index} />
            ))}
          </div>

          {/* View All Projects CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <motion.a
              href="https://github.com/SanoKhan22?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-strong)] transition hover:bg-[var(--accent)]/10"
            >
              <Github className="h-5 w-5" />
              View All Projects on GitHub
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
