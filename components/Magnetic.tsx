"use client";

import { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

/**
 * Light magnetic pull — direct motion values (no spring lag vs the 1:1 cursor).
 */
export default function Magnetic({
    children,
    className = "",
    strength = 0.22,
}: {
    children: React.ReactNode;
    className?: string;
    strength?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    return (
        <motion.div
            ref={ref}
            className={`elite-magnetic inline-block ${className}`}
            style={{ x, y }}
            onMouseMove={(e) => {
                const r = ref.current?.getBoundingClientRect();
                if (!r) return;
                x.set((e.clientX - (r.left + r.width / 2)) * strength);
                y.set((e.clientY - (r.top + r.height / 2)) * strength);
            }}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
        >
            {children}
        </motion.div>
    );
}
