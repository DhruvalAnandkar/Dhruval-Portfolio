"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";

export const easings = {
    out: [0.22, 1, 0.36, 1] as const,
    soft: [0.16, 1, 0.3, 1] as const,
};

/**
 * Scroll reveals MUST stay readable while scrolling.
 * Floor opacity at 0.55 — never blank out text on fast scroll.
 * Motion (y / slight scale) carries the "alive" feel.
 */
export const fadeUp: Variants = {
    hidden: { opacity: 0.55, y: 36 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: easings.out },
    },
};

export const fadeScale: Variants = {
    hidden: { opacity: 0.6, scale: 0.96, y: 20 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.5, ease: easings.out },
    },
};

export const clipReveal: Variants = {
    hidden: { clipPath: "inset(0 0 12% 0)", opacity: 0.7, y: 16 },
    show: {
        clipPath: "inset(0 0 0% 0)",
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: easings.out },
    },
};

/** Fire before the element is fully in view so it "lands" as you arrive */
const EARLY = "35% 0px -8% 0px";

export function Reveal({
    children,
    className,
    delay = 0,
    variants = fadeUp,
    once = true,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    variants?: Variants;
    once?: boolean;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once, margin: EARLY, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={variants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
}

export function Stagger({
    children,
    className,
    delay = 0,
    stagger = 0.07,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    stagger?: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: EARLY, amount: 0.15 });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            variants={{
                hidden: {},
                show: {
                    transition: { staggerChildren: stagger, delayChildren: delay },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.div className={className} variants={fadeUp}>
            {children}
        </motion.div>
    );
}

export function SectionBeam({ className }: { className?: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: EARLY });

    return (
        <div ref={ref} className={`relative h-px w-full overflow-hidden ${className ?? ""}`}>
            <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-[#10b981] to-transparent"
                initial={{ width: "0%", opacity: 0.4 }}
                animate={inView ? { width: "100%", opacity: 1 } : { width: "12%", opacity: 0.4 }}
                transition={{ duration: 0.85, ease: easings.out }}
            />
        </div>
    );
}

export function ParallaxBlock({
    children,
    className,
    offset = 28,
}: {
    children: React.ReactNode;
    className?: string;
    offset?: number;
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    );
}

export function SplitWords({
    text,
    className,
    delay = 0,
}: {
    text: string;
    className?: string;
    delay?: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: EARLY, amount: 0.3 });
    const words = text.split(" ");

    return (
        <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.28em] ${className ?? ""}`}>
            {words.map((word, i) => (
                <span key={`${word}-${i}`} className="overflow-hidden inline-block pb-[0.12em] -mb-[0.12em]">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "85%", opacity: 0.5 }}
                        animate={inView ? { y: "0%", opacity: 1 } : { y: "40%", opacity: 0.65 }}
                        transition={{
                            duration: 0.5,
                            delay: delay + i * 0.04,
                            ease: easings.out,
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}

export function EliteHover({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.012 }}
            whileTap={{ scale: 0.99 }}
            className={`elite-surface calm-card ${className}`}
        >
            {children}
        </motion.div>
    );
}

/** Section header that lifts into place as you scroll onto it */
export function SectionIntro({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: EARLY, amount: 0.35 });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0.55, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.55, y: 28 }}
            transition={{ duration: 0.6, ease: easings.out }}
        >
            {children}
        </motion.div>
    );
}
