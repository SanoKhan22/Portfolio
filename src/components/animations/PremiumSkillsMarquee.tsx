"use client";

import { motion } from "framer-motion";
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
} from "react-icons/si";
import { IconType } from "react-icons";

interface SkillConfig {
  name: string;
  icon: IconType;
  color: string;
}

// Map skills to their brand icons and colors
const skillConfigs: Record<string, SkillConfig> = {
  "Kotlin": { name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
  "Swift": { name: "Swift", icon: SiSwift, color: "#F05138" },
  "Flutter": { name: "Flutter", icon: SiFlutter, color: "#02569B" },
  "Firebase": { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  "Node.js": { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  "Python": { name: "Python", icon: SiPython, color: "#3776AB" },
  "GA4": { name: "GA4", icon: SiGoogleanalytics, color: "#E37400" },
  "Analytics": { name: "Analytics", icon: SiGoogleanalytics, color: "#E37400" },
  "Shopify": { name: "Shopify", icon: SiShopify, color: "#96BF48" },
  "WooCommerce": { name: "WooCommerce", icon: SiWoo, color: "#96588A" },
  "JavaScript": { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  "TypeScript": { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  "React": { name: "React", icon: SiReact, color: "#61DAFB" },
  "Android": { name: "Android", icon: SiAndroid, color: "#3DDC84" },
  "iOS": { name: "iOS", icon: SiApple, color: "#000000" },
};

export function PremiumSkillsMarquee({ items }: { items: string[] }) {
  // Get unique skills with icons, ensuring no duplicates
  const uniqueSkills = Array.from(new Set(items));
  const skillsWithIcons = uniqueSkills
    .filter(skill => skillConfigs[skill])
    .map(skill => skillConfigs[skill]);

  // Triple the items for seamless infinite loop
  const triplicatedSkills = [...skillsWithIcons, ...skillsWithIcons, ...skillsWithIcons];

  return (
    <div className="relative w-full overflow-hidden py-12">
      {/* Gradient overlays for professional fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40 bg-gradient-to-l from-[var(--background)] to-transparent" />
      
      {/* Scrolling container */}
      <motion.div
        className="flex items-center gap-16"
        animate={{
          x: ["0%", "-33.333%"],
        }}
        transition={{
          x: {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {triplicatedSkills.map((skill, index) => {
          const Icon = skill.icon;
          
          return (
            <motion.div
              key={`${skill.name}-${index}`}
              className="group relative flex-shrink-0 cursor-pointer"
              whileHover={{ scale: 1.2, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Icon
                className="transition-all duration-500 ease-out"
                size={64}
                style={{
                  color: "#64748B",
                  filter: "grayscale(100%) brightness(0.7)",
                }}
              />
              
              {/* Colored version on hover */}
              <Icon
                className="absolute left-0 top-0 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100"
                size={64}
                style={{
                  color: skill.color,
                  filter: "drop-shadow(0 0 20px currentColor) brightness(1.1)",
                }}
              />
              
              {/* Tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-xs font-medium text-white/60">{skill.name}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
