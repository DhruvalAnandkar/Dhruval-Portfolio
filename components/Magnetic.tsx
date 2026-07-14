"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Magnetic pull wrapper — feels expensive on hover */
export default function Magnetic({
    children,
    className = "",
    strength = 0.35,
}: {
    children: React.ReactNode;
    className?: string;
    strength?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

    return (
        <motion.div
            ref={ref}
            className={`elite-magnetic inline-block ${className}`}
            style={{ x: sx, y: sy }}
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
