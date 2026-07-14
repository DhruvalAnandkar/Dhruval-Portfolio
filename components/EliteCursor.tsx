"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Dual-ring cursor — throttled hit-testing, desktop only */
export default function EliteCursor() {
    const [on, setOn] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [clicking, setClicking] = useState(false);
    const hoverRef = useRef(false);

    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const sx = useSpring(x, { stiffness: 420, damping: 28, mass: 0.35 });
    const sy = useSpring(y, { stiffness: 420, damping: 28, mass: 0.35 });
    const rx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.5 });
    const ry = useSpring(y, { stiffness: 120, damping: 22, mass: 0.5 });

    useEffect(() => {
        const fine = window.matchMedia("(pointer: fine)").matches;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
            ?.saveData;
        if (!fine || reduce || saveData) return;

        // Defer until after first paint of hero
        const boot = window.setTimeout(() => {
            setOn(true);
            document.body.classList.add("elite-cursor-on");
        }, 280);

        let moveRaf = 0;
        let hx = 0;
        let hy = 0;
        let hitT = 0;

        const onMove = (e: MouseEvent) => {
            hx = e.clientX;
            hy = e.clientY;
            if (!moveRaf) {
                moveRaf = requestAnimationFrame(() => {
                    moveRaf = 0;
                    x.set(hx);
                    y.set(hy);
                    const now = performance.now();
                    if (now - hitT > 80) {
                        hitT = now;
                        const el = document.elementFromPoint(hx, hy) as HTMLElement | null;
                        const interactive = !!el?.closest(
                            "a, button, [role='button'], input, textarea, .calm-card, .elite-magnetic, .elite-surface"
                        );
                        if (interactive !== hoverRef.current) {
                            hoverRef.current = interactive;
                            setHovering(interactive);
                        }
                    }
                });
            }
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mousedown", () => setClicking(true));
        window.addEventListener("mouseup", () => setClicking(false));

        return () => {
            window.clearTimeout(boot);
            cancelAnimationFrame(moveRaf);
            document.body.classList.remove("elite-cursor-on");
            window.removeEventListener("mousemove", onMove);
        };
    }, [x, y]);

    if (!on) return null;

    const core = hovering ? 11 : 5;
    const ring = hovering ? 46 : 28;

    return (
        <>
            <motion.div
                aria-hidden
                className="pointer-events-none fixed z-[90] hidden md:block"
                style={{ left: sx, top: sy, x: "-50%", y: "-50%" }}
            >
                <motion.div
                    className="rounded-full bg-slate-900"
                    animate={{
                        width: clicking ? core * 0.7 : core,
                        height: clicking ? core * 0.7 : core,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                />
            </motion.div>
            <motion.div
                aria-hidden
                className="pointer-events-none fixed z-[89] hidden md:block rounded-full border border-emerald-400/70"
                style={{
                    left: rx,
                    top: ry,
                    x: "-50%",
                    y: "-50%",
                    boxShadow: hovering ? "0 0 24px rgba(16,185,129,0.35)" : "0 0 0 transparent",
                }}
                animate={{
                    width: clicking ? ring * 0.85 : ring,
                    height: clicking ? ring * 0.85 : ring,
                    opacity: hovering ? 1 : 0.5,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
        </>
    );
}
