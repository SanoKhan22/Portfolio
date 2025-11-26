"use client";

import { motion } from "framer-motion";
import { shouldReduceMotion, isMobile } from "@/lib/utils";

interface StaggerContainerProps {
    children: React.ReactNode;
    staggerDelay?: number;
    className?: string;
}

export function StaggerContainer({
    children,
    staggerDelay,
    className = "",
}: StaggerContainerProps) {
    const reducedMotion = shouldReduceMotion();
    const mobile = isMobile();

    // Auto-determine stagger delay
    const delay = staggerDelay || (mobile ? 0.05 : 0.1);

    const container = {
        hidden: { opacity: reducedMotion ? 1 : 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: reducedMotion ? 0 : delay,
            },
        },
    };

    const item = {
        hidden: reducedMotion ? {} : { opacity: 0, y: 20 },
        show: reducedMotion ? {} : { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className={className}
        >
            {Array.isArray(children)
                ? children.map((child, index) => (
                    <motion.div key={index} variants={item}>
                        {child}
                    </motion.div>
                ))
                : children}
        </motion.div>
    );
}
