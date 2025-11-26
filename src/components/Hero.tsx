"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { BlobMorph } from "@/components/animations/BlobMorph";
import { CodeRunner } from "@/components/animations/CodeRunner";

// More pixels for smoother animation, fewer on mobile
const getPixelCount = (isMobile: boolean) => (isMobile ? 20 : 28);

const createHeroPixels = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    id: index,
    delay: 0.04 * index,
    rotation: Math.random() * 180 - 90, // Random rotation between -90 and 90
    bounceDelay: 0.02 * index,
  }));

const heroBadges = [
  {
    label: "Android + iOS",
    detail: "Compose · SwiftUI",
    position: "top-10 -left-4",
  },
  {
    label: "Growth Ops",
    detail: "GA4 · Paid Media",
    position: "top-2 right-0",
  },
  {
    label: "MVPs",
    detail: "0 → 1 in 8 weeks",
    position: "bottom-6 left-4",
  },
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
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [heroPixels, setHeroPixels] = useState<Array<{ id: number; delay: number; rotation: number; bounceDelay: number }>>([]);
  const { scrollY } = useScroll();

  // Parallax effect
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.7]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Generate pixels on client-side only to avoid hydration mismatch
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
      className="relative grid gap-8 pb-12 pt-20 md:gap-12 md:pb-16 md:pt-28 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.8fr)]"
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
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="space-y-3 md:space-y-4">
          {/* Name - Large and Prominent */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-display text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
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
            className="text-lg font-medium tracking-wide text-[var(--accent-strong)] md:text-xl lg:text-2xl"
          >
            Software Engineer & Startup Builder
          </motion.p>
        </div>

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl leading-relaxed text-white/90 sm:text-2xl md:text-3xl lg:text-4xl"
        >
          Building software and digital products that solve real problems.
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

      {/* 3D Perspective Container - Creates depth space */}
      <motion.div
        className="relative isolate flex items-center justify-center lg:justify-end"
        style={{
          y,
          opacity,
          perspective: isMobile ? "none" : "1200px",
          perspectiveOrigin: "center center"
        }}
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(14,110,85,0.2)]/40 to-transparent blur-3xl" />

        {/* Card Frame - Recedes slightly in 3D space */}
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setMousePosition({ x: 0, y: 0 });
          }}
          onMouseMove={handleMouseMove}
          style={{
            rotateX: isHovered && !isMobile ? mousePosition.y * 6 : 0,
            rotateY: isHovered && !isMobile ? mousePosition.x * 6 : 0,
            transformStyle: "preserve-3d",
            // Card recedes back in 3D space (desktop only)
            transform: isMobile ? "none" : "translateZ(-30px)",
          }}
          animate={{
            y: prefersReducedMotion ? 0 : [0, -10, 0],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="relative h-[280px] w-[240px] rounded-[24px] border border-[var(--color-border)] bg-[var(--surface)]/60 p-3 shadow-[var(--shadow-soft)] backdrop-blur sm:h-[360px] sm:w-[300px] sm:rounded-[28px] sm:p-4 md:h-[420px] md:w-[360px] md:rounded-[32px] transition-shadow duration-300 overflow-visible"
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

          {/* Portrait - Pops forward in 3D space, breaking out of the frame */}
          <motion.div
            initial={{ scale: prefersReducedMotion ? 1 : 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.65, duration: 0.6 }}
            whileHover={{
              scale: isMobile ? 1.02 : 1.05,
              boxShadow: "0 0 40px rgba(51, 255, 180, 0.3)",
            }}
            style={{
              // Portrait extends forward in 3D space (desktop only)
              transform: isMobile ? "none" : "translateZ(70px) scale(1.12)",
              zIndex: 10,
              // Cast shadow onto card behind
              filter: isMobile ? "none" : "drop-shadow(0 25px 35px rgba(0, 0, 0, 0.5))",
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
              {/* Glow overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[rgba(51,255,180,0.15)] to-transparent pointer-events-none"
                animate={{
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Edge highlight - emphasizes the "breaking out" effect */}
              {!isMobile && (
                <motion.div
                  className="absolute inset-0 rounded-[inherit] pointer-events-none"
                  animate={{
                    boxShadow: isHovered
                      ? "0 0 30px rgba(51, 255, 180, 0.4), inset 0 0 20px rgba(51, 255, 180, 0.1)"
                      : "0 0 15px rgba(51, 255, 180, 0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          </motion.div>

          {/* Badges - positioned in 3D space */}
          {!isMobile &&
            heroBadges.map((badge) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 1 }}
                style={{
                  transform: "translateZ(40px)", // Badges float between card and portrait
                }}
                className={`absolute ${badge.position} hidden md:block`}
              >
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--surface-raised)]/70 px-3 py-2 text-xs text-white shadow-lg backdrop-blur sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
                  <p className="font-semibold">{badge.label}</p>
                  <p className="text-[10px] text-[var(--color-muted)] sm:text-xs">{badge.detail}</p>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </section >
  );
}
