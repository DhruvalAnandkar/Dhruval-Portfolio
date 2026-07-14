"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Soft emerald spotlight that follows the cursor — desktop only. */
export default function CursorGlow() {
    const [enabled, setEnabled] = useState(false);
    const x = useMotionValue(-400);
    const y = useMotionValue(-400);
    const sx = useSpring(x, { stiffness: 140, damping: 28, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 140, damping: 28, mass: 0.4 });

    useEffect(() => {
        const fine = window.matchMedia("(pointer: fine)").matches;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!fine || reduce) return;
        setEnabled(true);

        const onMove = (e: MouseEvent) => {
            x.set(e.clientX - 180);
            y.set(e.clientY - 180);
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
    }, [x, y]);

    if (!enabled) return null;

    return (
        <motion.div
            aria-hidden
            className="pointer-events-none fixed z-[1] hidden md:block h-[360px] w-[360px] rounded-full"
            style={{
                x: sx,
                y: sy,
                background:
                    "radial-gradient(circle, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.04) 35%, transparent 68%)",
            }}
        />
    );
}
