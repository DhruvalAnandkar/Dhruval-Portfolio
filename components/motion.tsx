"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { isFastScrolling } from "@/lib/scrollBus";

export const easings = {
    out: [0.22, 1, 0.36, 1] as const,
    soft: [0.16, 1, 0.3, 1] as const,
};

/**
 * Near-fully visible before animate — a 1–2s page fling still reads every section.
 * Tiny lift only; never blank or half-fade content while browsing.
 */
export const fadeUp: Variants = {
    hidden: { opacity: 0.94, y: 10 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.22, ease: easings.out },
    },
};

export const fadeScale: Variants = {
    hidden: { opacity: 0.94, scale: 0.99, y: 8 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.2, ease: easings.out },
    },
};

export const clipReveal: Variants = {
    hidden: { clipPath: "inset(0 0 4% 0)", opacity: 0.94, y: 6 },
    show: {
        clipPath: "inset(0 0 0% 0)",
        opacity: 1,
        y: 0,
        transition: { duration: 0.24, ease: easings.out },
    },
};

/** Fire early so content is “shown” as you arrive — even on fast flings */
const EARLY = "45% 0px -5% 0px";

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
    const inView = useInView(ref, { once, margin: EARLY, amount: 0.12 });
    const fast = typeof window !== "undefined" && isFastScrolling();

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={variants}
            initial="hidden"
            animate={inView || fast ? "show" : "hidden"}
            transition={{ delay: fast ? 0 : delay, duration: fast ? 0.08 : undefined }}
        >
            {children}
        </motion.div>
    );
}

export function Stagger({
    children,
    className,
    delay = 0,
    stagger = 0.03,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    stagger?: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: EARLY, amount: 0.1 });
    const fast = typeof window !== "undefined" && isFastScrolling();

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={inView || fast ? "show" : "hidden"}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: fast ? 0 : stagger,
                        delayChildren: fast ? 0 : delay,
                    },
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
                initial={{ width: "35%", opacity: 0.7 }}
                animate={inView ? { width: "100%", opacity: 1 } : { width: "35%", opacity: 0.7 }}
                transition={{ duration: 0.28, ease: easings.out }}
            />
        </div>
    );
}

export function ParallaxBlock({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
    offset?: number;
}) {
    return <div className={className}>{children}</div>;
}

export function SplitWords({
    text,
    className,
}: {
    text: string;
    className?: string;
    delay?: number;
}) {
    /* Plain text — per-word motion lagged on fast scroll */
    return <span className={className}>{text}</span>;
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
    const inView = useInView(ref, { once: true, margin: EARLY, amount: 0.2 });
    const fast = typeof window !== "undefined" && isFastScrolling();

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0.94, y: 12 }}
            animate={inView || fast ? { opacity: 1, y: 0 } : { opacity: 0.94, y: 8 }}
            transition={{ duration: fast ? 0.08 : 0.22, ease: easings.out }}
        >
            {children}
        </motion.div>
    );
}
