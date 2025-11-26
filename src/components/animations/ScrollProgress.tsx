"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { shouldReduceMotion } from "@/lib/utils";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    if (shouldReduceMotion()) {
        return null; // Hidden for reduced-motion users
    }

    return (
        <motion.div
            style={{ scaleX }}
            className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)] md:h-[3px]"
        />
    );
}
