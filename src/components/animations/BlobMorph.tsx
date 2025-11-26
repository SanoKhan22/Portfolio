"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { shouldReduceMotion, isMobile } from "@/lib/utils";

interface BlobMorphProps {
    className?: string;
    colors?: string[];
    size?: string;
}

export function BlobMorph({
    className = "",
    colors = ["rgba(14, 110, 85, 0.15)", "rgba(51, 255, 180, 0.1)"],
    size = "w-96 h-96",
}: BlobMorphProps) {
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        // Only enable on desktop with motion enabled
        setIsDisabled(isMobile() || shouldReduceMotion());
    }, []);

    if (isDisabled) {
        // Static gradient fallback
        return (
            <div
                className={`${size} ${className} rounded-full bg-gradient-to-br opacity-50 blur-3xl`}
                style={{
                    backgroundImage: `linear-gradient(to bottom right, ${colors.join(", ")})`,
                }}
            />
        );
    }

    return (
        <motion.div
            animate={{
                borderRadius: [
                    "30% 70% 70% 30% / 30% 30% 70% 70%",
                    "70% 30% 30% 70% / 70% 70% 30% 30%",
                    "50% 50% 50% 50% / 50% 50% 50% 50%",
                    "30% 70% 70% 30% / 30% 30% 70% 70%",
                ],
                rotate: [0, 90, 180, 270, 360],
                scale: [1, 1.1, 0.9, 1.05, 1],
            }}
            transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className={`${size} ${className} bg-gradient-to-br opacity-50 blur-3xl`}
            style={{
                backgroundImage: `linear-gradient(to bottom right, ${colors.join(", ")})`,
                willChange: "transform, border-radius",
            }}
        />
    );
}
