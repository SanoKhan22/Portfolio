"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { BlobMorph } from "@/components/animations/BlobMorph";
import { CodeRunner } from "@/components/animations/CodeRunner";
import { useGitHubTimeline } from "@/hooks/useGitHub";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Rocket, Layers, Code2 } from "lucide-react";

// Optimize pixel animations: disable on mobile for better performance
const getPixelCount = (isMobile: boolean) => (isMobile ? 0 : 28);

const createHeroPixels = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    id: index,
    delay: 0.04 * index,
    rotation: Math.random() * 180 - 90, // Random rotation between -90 and 90
    bounceDelay: 0.02 * index,
  }));

// Dynamic tech badge positions in 3D space
const badgePositions = [
  { position: "top-8 -left-6", zIndex: 35, translateZ: 50 },
  { position: "top-2 -right-4", zIndex: 35, translateZ: 40 },
  { position: "bottom-8 left-2", zIndex: 35, translateZ: 45 },
];

function MagneticButton({ children, href, className, ...props }: { children: React.ReactNode; href: string; className?: string;[key: string]: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    </motion.div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const isMobileQuery = useMediaQuery("(max-width: 768px)");
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [heroPixels, setHeroPixels] = useState<Array<{ id: number; delay: number; rotation: number; bounceDelay: number }>>([]);
  const { scrollY } = useScroll();
  const { timelineRepos } = useGitHubTimeline();

  // Simplified parallax on mobile for better performance
  const yBackground = useTransform(scrollY, [0, 600], isMobile ? [0, 0] : [0, 180]);
  const yPortrait = useTransform(scrollY, [0, 500], isMobile ? [0, 0] : [0, 100]);
  const yBadges = useTransform(scrollY, [0, 400], isMobile ? [0, 0] : [0, 40]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.6]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  // Generate dynamic tech badges from GitHub repos
  const dynamicBadges = (() => {
    // Badge 1: Startup Builder / Entrepreneurship (Static, aligned with personal brand)
    const badge1 = {
      label: "Startup Builder",
      detail: "0 → 1 MVPs",
      icon: Rocket,
      color: "text-orange-400",
    };

    // Badge 2: Core Expertise (Based on website analysis)
    // User builds mobile (Android/iOS) + web apps, so highlighting cross-platform expertise
    const badge2 = {
      label: "Mobile + Web",
      detail: "iOS · Android · React",
      icon: Layers,
      color: "text-blue-400",
    };

    // Badge 3: Top 3 Programming Languages from GitHub (Dynamic)
    let badge3 = {
      label: "Tech Stack",
      detail: "Java · Kotlin · JS",
      icon: Code2,
      color: "text-green-400",
    };

    if (timelineRepos && timelineRepos.length > 0) {
      const languageCounts: Record<string, number> = {};
      
      timelineRepos.forEach((repo) => {
        if (repo.primaryLanguage && 
            repo.primaryLanguage.toLowerCase() !== 'unknown' &&
            repo.primaryLanguage.trim() !== '') {
          languageCounts[repo.primaryLanguage] = (languageCounts[repo.primaryLanguage] || 0) + 1;
        }
      });

      const topLanguages = Object.entries(languageCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([lang]) => lang);

      if (topLanguages.length > 0) {
        badge3 = {
          label: "Languages",
          detail: topLanguages.join(" · "),
          icon: Code2,
          color: "text-green-400",
        };
      }
    }

    return [badge1, badge2, badge3];
  })();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Generate pixels on client-side only, 0 on mobile for better performance
      setHeroPixels(createHeroPixels(getPixelCount(mobile)));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <section
      id="hero"
      className="relative grid gap-8 pb-12 pt-20 md:gap-12 md:pb-16 md:pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] px-4 sm:px-6 lg:px-8"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <BlobMorph className="absolute -left-32 top-48 md:-left-48 md:top-24" size="w-64 h-64 md:w-96 md:h-96" />
        <BlobMorph
          className="absolute -right-32 top-96 md:-right-48 md:top-64"
          size="w-72 h-72 md:w-[28rem] md:h-[28rem]"
          colors={["rgba(51, 255, 180, 0.08)", "rgba(14, 110, 85, 0.12)"]}
        />
      </div>
      <div className="flex flex-col gap-6 md:gap-8 px-4 sm:px-6 lg:px-0 max-w-3xl">
        <div className="space-y-3 md:space-y-4">
          {/* Name - Large and Prominent */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="bg-gradient-to-r from-white via-white to-[var(--accent-strong)] bg-clip-text text-transparent">
              Ehsanullah Sano
            </span>
          </motion.h1>

          {/* Title/Role */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-lg font-medium tracking-wide text-[var(--accent)] md:text-xl lg:text-2xl"
          >
            Software Engineer & Startup Builder
          </motion.p>

          {/* Education */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-base text-white/70 md:text-lg"
          >
            Computer Science Student @{" "}
            <a
              href="https://www.elte.hu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:text-[var(--accent-strong)] transition-colors underline decoration-[var(--accent)]/30 hover:decoration-[var(--accent-strong)] underline-offset-4"
            >
              ELTE
            </a>
          </motion.p>
        </div>

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base leading-relaxed text-white/80 sm:text-lg md:text-xl max-w-xl"
        >
          <span className="text-[var(--accent)]">"</span>I fix problems with code. Sometimes I create new problems with code. Then I fix those too.<span className="text-[var(--accent)]">"</span>
        </motion.h2>

        {/* Interactive Code Demo */}
        <CodeRunner />

        {/* 2-Button Layout - Clean & Focused */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          {/* Primary CTA */}
          <MagneticButton
            href="#projects"
            className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-black shadow-[var(--glow)] transition hover:bg-[var(--accent-strong)] active:scale-95 sm:px-8 sm:text-base"
          >
            See My Work
          </MagneticButton>

          {/* Secondary CTA */}
          <MagneticButton
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--accent)] active:scale-95 sm:px-8 sm:text-base"
          >
            Work With Me
          </MagneticButton>
        </motion.div>
      </div>

      {/* 3D Perspective Container - Enhanced depth with better perspective */}
      <motion.div
        className="relative isolate flex items-center justify-center lg:justify-end"
        style={{
          y: yBackground,
          opacity,
          scale,
          perspective: isMobile ? "none" : "1800px",
          perspectiveOrigin: "50% 50%"
        }}
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(14,110,85,0.25)]/50 via-[rgba(51,255,180,0.1)]/30 to-transparent blur-3xl" />

        {/* Enhanced Card Frame with depth and 3D tilt */}
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setMousePosition({ x: 0, y: 0 });
          }}
          onMouseMove={handleMouseMove}
          style={{
            rotateX: isHovered && !isMobile ? mousePosition.y * 8 : 0,
            rotateY: isHovered && !isMobile ? mousePosition.x * 8 : 0,
            transformStyle: "preserve-3d",
            // Card recedes in 3D space with dynamic shadow
            transform: isMobile ? "none" : "translateZ(-40px)",
          }}
          animate={{
            y: prefersReducedMotion ? 0 : [0, -12, 0],
          }}
          transition={{
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotateX: {
              type: "spring",
              stiffness: 100,
              damping: 20,
            },
            rotateY: {
              type: "spring",
              stiffness: 100,
              damping: 20,
            },
          }}
          className="relative h-[280px] w-[240px] rounded-[24px] border border-[var(--color-border)] bg-[var(--surface)]/70 p-3 shadow-2xl backdrop-blur-md sm:h-[360px] sm:w-[300px] sm:rounded-[28px] sm:p-4 md:h-[420px] md:w-[360px] md:rounded-[32px] transition-all duration-300 overflow-visible hover:shadow-[0_25px_60px_-15px_rgba(51,255,180,0.3)]"
        >
          {/* Enhanced pixel grid with bounce and rotation */}
          <motion.div
            initial={{ opacity: prefersReducedMotion ? 0 : 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.9 }}
            className="grid grid-cols-4 gap-2 sm:gap-3"
            style={{
              transform: isMobile ? "none" : "translateZ(0px)",
            }}
          >
            {heroPixels.map((pixel) => (
              <motion.span
                key={pixel.id}
                initial={{
                  opacity: 0,
                  scale: 0.3,
                  rotate: prefersReducedMotion ? 0 : pixel.rotation,
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.3, 1.2, 1, 0],
                  rotate: prefersReducedMotion ? 0 : [pixel.rotation, pixel.rotation + 180, pixel.rotation],
                }}
                transition={{
                  delay: prefersReducedMotion ? 0 : pixel.delay,
                  duration: 0.6,
                  ease: [0.34, 1.56, 0.64, 1], // Bounce ease
                  times: [0, 0.3, 0.7, 1],
                }}
                className="aspect-square rounded-lg bg-[var(--pixel)]"
              />
            ))}
          </motion.div>

          {/* Portrait - Enhanced 3D pop-out with improved parallax and glow */}
          <motion.div
            initial={{ scale: prefersReducedMotion ? 1 : 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.65, duration: 0.6 }}
            whileHover={{
              scale: isMobile ? 1.02 : 1.1,
              boxShadow: "0 0 60px rgba(51, 255, 180, 0.5), 0 30px 80px rgba(0, 0, 0, 0.8)",
              rotateY: isMobile ? 0 : 3,
              rotateX: isMobile ? 0 : -1,
            }}
            style={{
              // Portrait dramatically extends forward in 3D space
              transform: isMobile ? "none" : "translateZ(100px) scale(1.18)",
              y: yPortrait,
              zIndex: 10,
              // Dramatic shadow with glow
              filter: isMobile ? "none" : "drop-shadow(0 35px 55px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 25px rgba(51, 255, 180, 0.2))",
            }}
            className="absolute inset-3 overflow-visible rounded-[20px] sm:inset-4 sm:rounded-[24px] md:inset-2 md:rounded-[28px] transition-all duration-300"
          >
            <div className="relative w-full h-full overflow-hidden rounded-[inherit]">
              <Image
                src="/assets/potrait.png"
                alt="Ehsanullah Sano portrait"
                fill
                sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 400px"
                className="object-cover"
                priority
              />
              {/* Enhanced glow overlay with pulsing effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[rgba(51,255,180,0.2)] via-[rgba(51,255,180,0.1)] to-transparent pointer-events-none"
                animate={{
                  opacity: isHovered ? [0.8, 1, 0.8] : 0,
                }}
                transition={{ 
                  duration: isHovered ? 2 : 0.3,
                  repeat: isHovered ? Infinity : 0,
                  ease: "easeInOut"
                }}
              />

              {/* Edge highlight - enhanced "breaking out" effect */}
              {!isMobile && (
                <motion.div
                  className="absolute inset-0 rounded-[inherit] pointer-events-none"
                  animate={{
                    boxShadow: isHovered
                      ? "0 0 40px rgba(51, 255, 180, 0.5), inset 0 0 30px rgba(51, 255, 180, 0.15)"
                      : "0 0 20px rgba(51, 255, 180, 0.25)",
                  }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </div>
          </motion.div>

          {/* Dynamic Tech Badges - Enhanced floating effect in 3D space */}
          {!isMobile &&
            dynamicBadges.map((badge, index) => {
              const config = badgePositions[index];
              if (!config) return null;
              const IconComponent = badge.icon;
              return (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    y: [0, -8, 0], 
                    scale: 1,
                  }}
                  transition={{ 
                    opacity: { delay: prefersReducedMotion ? 0 : 1 + index * 0.1, duration: 0.5 },
                    scale: { 
                      delay: prefersReducedMotion ? 0 : 1 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    },
                    y: {
                      delay: 1.5 + index * 0.15,
                      duration: 3 + index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  }}
                  whileHover={{
                    scale: 1.15,
                    y: -8,
                    rotateY: 5,
                    boxShadow: "0 15px 40px rgba(51, 255, 180, 0.4), 0 5px 15px rgba(0, 0, 0, 0.3)",
                  }}
                  style={{
                    transform: `translateZ(${config.translateZ}px)`,
                    y: yBadges,
                    zIndex: config.zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  className={`absolute ${config.position} hidden md:block cursor-default`}
                >
                  <div className="group rounded-xl border border-[var(--color-border)] bg-[var(--surface-raised)]/90 px-3 py-2.5 text-xs text-white shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-[var(--accent)]/60 hover:bg-[var(--surface-raised)] sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
                    <div className="flex items-center gap-2.5">
                      <motion.div 
                        className={`rounded-lg bg-[var(--surface)]/60 p-1.5 transition-all ${badge.color}`}
                        whileHover={{ 
                          scale: 1.15, 
                          rotate: [0, -5, 5, 0],
                        }}
                        transition={{
                          rotate: { duration: 0.5 }
                        }}
                      >
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
                      </motion.div>
                      <div>
                        <p className="font-semibold">{badge.label}</p>
                        <p className="text-[10px] text-[var(--color-muted)] sm:text-xs">{badge.detail}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>
      </motion.div>
    </section >
  );
}
