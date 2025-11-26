"use client";

import { motion } from "framer-motion";
import { shouldReduceMotion, isMobile } from "@/lib/utils";

interface InfiniteMarqueeProps {
    items: string[];
    speed?: number;
    className?: string;
}

export function InfiniteMarquee({ items, speed = 30, className = "" }: InfiniteMarqueeProps) {
    const reducedMotion = shouldReduceMotion();
    const mobile = isMobile();

    // Duplicate items for seamless loop
    const duplicatedItems = [...items, ...items];

    // Adjust speed for mobile (slower)
    const animationSpeed = mobile ? speed * 1.5 : speed;

    if (reducedMotion) {
        return (
            <div className={`flex flex-wrap gap-3 ${className}`}>
                {items.map((item, index) => (
                    <span
                        key={index}
                        className="rounded-full border border-[var(--color-border)] bg-[var(--surface-raised)]/70 px-4 py-2 text-sm text-[var(--color-muted)]"
                    >
                        {item}
                    </span>
                ))}
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <motion.div
                className="flex gap-4 whitespace-nowrap"
                animate={{
                    x: [0, -50 + "%"],
                }}
                transition={{
                    x: {
                        duration: animationSpeed,
                        repeat: Infinity,
                        ease: "linear",
                    },
                }}
            >
                {duplicatedItems.map((item, index) => (
                    <motion.span
                        key={index}
                        whileHover={mobile ? {} : { scale: 1.05, y: -2 }}
                        className="inline-block rounded-full border border-[var(--color-border)] bg-[var(--surface-raised)]/70 px-4 py-2 text-sm text-[var(--color-muted)] backdrop-blur transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-strong)]"
                    >
                        {item}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
}
