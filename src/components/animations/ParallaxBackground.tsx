"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { shouldReduceMotion, isMobile } from "@/lib/utils";

interface ParallaxLayer {
    speed: number;
    children: React.ReactNode;
    className?: string;
}

interface ParallaxBackgroundProps {
    layers: ParallaxLayer[];
}

export function ParallaxBackground({ layers }: ParallaxBackgroundProps) {
    const [isDisabled, setIsDisabled] = useState(true);
    const { scrollY } = useScroll();

    useEffect(() => {
        // Only enable on desktop with motion enabled
        setIsDisabled(isMobile() || shouldReduceMotion());
    }, []);

    if (isDisabled) {
        // Render static version
        return (
            <div className="absolute inset-0 -z-10">
                {layers.map((layer, index) => (
                    <div key={index} className={layer.className}>
                        {layer.children}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="absolute inset-0 -z-10">
            {layers.map((layer, index) => {
                const y = useTransform(scrollY, [0, 1000], [0, -layer.speed * 100]);

                return (
                    <motion.div
                        key={index}
                        style={{ y, willChange: "transform" }}
                        className={layer.className}
                    >
                        {layer.children}
                    </motion.div>
                );
            })}
        </div>
    );
}
