"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  SiKotlin,
  SiSwift,
  SiFlutter,
  SiFirebase,
  SiNodedotjs,
  SiPython,
  SiGoogleanalytics,
  SiShopify,
  SiWoo,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiAndroid,
  SiApple,
  SiPostgresql,
  SiDocker,
  SiKubernetes,
  SiGithub,
  SiGitlab,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbSparkles } from "react-icons/tb";
import { IconType } from "react-icons";

interface SkillConfig {
  name: string;
  icon: IconType;
  color: string;
  description: string;
  domain: "mobile" | "frontend" | "backend" | "growth" | "devops";
}

// Map skills to their brand icons, colors, and domains
const allSkills: SkillConfig[] = [
  // Mobile
  { name: "Android", icon: SiAndroid, color: "#3DDC84", description: "Android Platform", domain: "mobile" },
  { name: "iOS", icon: SiApple, color: "#000000", description: "iOS Platform", domain: "mobile" },
  { name: "Kotlin", icon: SiKotlin, color: "#7F52FF", description: "Android Development", domain: "mobile" },
  { name: "Swift", icon: SiSwift, color: "#F05138", description: "iOS Development", domain: "mobile" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B", description: "Cross-platform Mobile", domain: "mobile" },
  
  // Frontend
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", description: "Web Language", domain: "frontend" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", description: "Type-safe JavaScript", domain: "frontend" },
  { name: "React", icon: SiReact, color: "#61DAFB", description: "UI Library", domain: "frontend" },
  
  // Backend
  { name: "Java", icon: FaJava, color: "#007396", description: "Enterprise Backend", domain: "backend" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", description: "Server Runtime", domain: "backend" },
  { name: "Python", icon: SiPython, color: "#3776AB", description: "Backend Language", domain: "backend" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28", description: "Backend as Service", domain: "backend" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", description: "Database", domain: "backend" },
  
  // Growth
  { name: "Analytics", icon: SiGoogleanalytics, color: "#E37400", description: "Data Analytics", domain: "growth" },
  { name: "Shopify", icon: SiShopify, color: "#96BF48", description: "E-commerce", domain: "growth" },
  { name: "WooCommerce", icon: SiWoo, color: "#96588A", description: "Commerce Platform", domain: "growth" },
  
  // DevOps
  { name: "Docker", icon: SiDocker, color: "#2496ED", description: "Containerization", domain: "devops" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5", description: "Container Orchestration", domain: "devops" },
  { name: "GitHub", icon: SiGithub, color: "#181717", description: "Version Control", domain: "devops" },
  { name: "GitLab", icon: SiGitlab, color: "#FC6D26", description: "CI/CD Platform", domain: "devops" },
  { name: "Copilot", icon: TbSparkles, color: "#9333EA", description: "AI Code Assistant", domain: "devops" },
  { name: "Cursor", icon: TbSparkles, color: "#00D9FF", description: "AI IDE Tool", domain: "devops" },
];

interface SkillIconProps {
  skill: SkillConfig;
  isHovered: boolean;
  onHover: (skillName: string | null) => void;
}

function FloatingSkillIcon({ skill, isHovered, onHover }: SkillIconProps) {
  const Icon = skill.icon;

  return (
    <motion.div
      onMouseEnter={() => onHover(skill.name)}
      onMouseLeave={() => onHover(null)}
      className="relative flex items-center justify-center flex-shrink-0"
      whileHover={{ scale: 1.3, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow circle */}
      <motion.div
        animate={{
          boxShadow: isHovered
            ? `0 0 30px ${skill.color}60, 0 0 60px ${skill.color}40`
            : `0 0 0px ${skill.color}00`,
          scale: isHovered ? 1.4 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-full"
      />

      {/* Icon */}
      <Icon
        className="relative z-10 transition-all duration-500 ease-out cursor-pointer"
        size={56}
        style={{
          color: isHovered ? skill.color : "#94A3B8",
          filter: isHovered
            ? `drop-shadow(0 0 20px ${skill.color}) brightness(1.3)`
            : "grayscale(100%) brightness(0.85)",
        }}
      />

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.8 }}
        animate={isHovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -10, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50 pointer-events-none w-max"
      >
        <div className="rounded-lg border border-[var(--color-border)]/50 bg-[var(--surface-raised)]/95 backdrop-blur px-3 py-2 text-center whitespace-nowrap shadow-xl">
          <p className="text-xs font-semibold text-[var(--foreground)]">{skill.name}</p>
          <p className="text-xs text-[var(--color-muted)] mt-0.5">{skill.description}</p>
          <div
            className="mt-1.5 h-1 w-12 rounded-full mx-auto"
            style={{ backgroundColor: skill.color }}
          />
        </div>
        {/* Tooltip arrow */}
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-2 h-2 rounded-full"
          style={{ backgroundColor: skill.color }}
        />
      </motion.div>
    </motion.div>
  );
}

export function PremiumSkillsMarquee({ items }: { items: string[] }) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Filter skills that are in items
  const visibleSkills = allSkills.filter((s) => items.includes(s.name));

  return (
    <div className="relative w-full overflow-hidden py-4 pb-20">
      {/* Edge gradients */}
      <div className="pointer-events-none absolute left-0 top-0 z-30 h-full w-24 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-30 h-full w-24 bg-gradient-to-l from-[var(--background)] to-transparent" />

      {/* Scrolling container with drag */}
      <motion.div
        className="flex items-center gap-12 md:gap-16 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: -1000, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        animate={{ x: [0, "-50%"] }}
        transition={{
          x: {
            duration: hoveredSkill || isDragging ? 0 : 25,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          },
        }}
      >
        {/* First set */}
        {visibleSkills.map((skill) => (
          <FloatingSkillIcon
            key={`first-${skill.name}`}
            skill={skill}
            isHovered={hoveredSkill === skill.name}
            onHover={setHoveredSkill}
          />
        ))}
        {/* Second set for seamless loop */}
        {visibleSkills.map((skill) => (
          <FloatingSkillIcon
            key={`second-${skill.name}`}
            skill={skill}
            isHovered={hoveredSkill === skill.name}
            onHover={setHoveredSkill}
          />
        ))}
      </motion.div>
    </div>
  );
}
