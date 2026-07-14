"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.25 });
    const glow = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

    return (
        <>
            <motion.div
                style={{ scaleX }}
                className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#059669] via-[#10b981] to-sky-400"
                aria-hidden
            />
            <motion.div
                style={{ scaleX, opacity: glow }}
                className="pointer-events-none fixed top-0 left-0 right-0 z-[59] h-8 origin-left bg-gradient-to-r from-[#10b981]/25 via-emerald-300/15 to-transparent blur-md"
                aria-hidden
            />
        </>
    );
}
