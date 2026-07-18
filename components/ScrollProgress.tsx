"use client";

import { motion, useScroll } from "framer-motion";

/** Top progress bar — direct scroll binding (no spring lag vs Lenis). */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    return (
        <>
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#059669] via-[#10b981] to-sky-400"
                aria-hidden
            />
            <motion.div
                style={{ scaleX: scrollYProgress, opacity: 0.55 }}
                className="pointer-events-none fixed top-0 left-0 right-0 z-[59] h-8 origin-left bg-gradient-to-r from-[#10b981]/25 via-emerald-300/15 to-transparent blur-md"
                aria-hidden
            />
        </>
    );
}
