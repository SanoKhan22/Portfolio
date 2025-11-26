"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { shouldReduceMotion, isMobile } from "@/lib/utils";

type Direction = "left" | "right" | "up" | "down";

interface RevealOnScrollProps {
    children: React.ReactNode;
    direction?: Direction;
    delay?: number;
    duration?: number;
    threshold?: number;
    className?: string;
}

export function RevealOnScroll({
    children,
    direction = "up",
    delay = 0,
    duration = 0.6,
    threshold = 0.1,
    className = "",
}: RevealOnScrollProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px", amount: threshold });
    const reducedMotion = shouldReduceMotion();
    const mobile = isMobile();

    // Simplified animation on mobile
    const getInitialState = () => {
        if (reducedMotion) return { opacity: 0 };
        if (mobile) return { opacity: 0, y: 10 };

        switch (direction) {
            case "left":
                return { opacity: 0, x: -50 };
            case "right":
                return { opacity: 0, x: 50 };
            case "up":
                return { opacity: 0, y: 50 };
            case "down":
                return { opacity: 0, y: -50 };
            default:
                return { opacity: 0, y: 50 };
        }
    };

    const getAnimateState = () => {
        if (reducedMotion) return { opacity: 1 };
        if (mobile) return { opacity: 1, y: 0 };

        return { opacity: 1, x: 0, y: 0 };
    };

    return (
        <motion.div
            ref={ref}
            initial={getInitialState()}
            animate={isInView ? getAnimateState() : getInitialState()}
            transition={{
                duration: mobile ? duration * 0.7 : duration,
                delay,
                ease: "easeOut",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
