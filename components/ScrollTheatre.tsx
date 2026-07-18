"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Minimal scroll chrome — % marker synced directly to scroll (no spring desync). */
export default function ScrollTheatre() {
    const pctRef = useRef<HTMLSpanElement>(null);
    const { scrollYProgress } = useScroll();
    const markerY = useTransform(scrollYProgress, [0, 1], ["8%", "88%"]);

    useEffect(() => {
        let raf = 0;
        let lastPct = -1;
        let ticking = false;

        const paint = () => {
            ticking = false;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const p = max > 0 ? window.scrollY / max : 0;
            const pct = Math.round(p * 100);
            if (pct !== lastPct && pctRef.current) {
                lastPct = pct;
                pctRef.current.textContent = `${pct}%`;
            }
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                raf = requestAnimationFrame(paint);
            }
        };

        paint();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <motion.div
            className="pointer-events-none fixed right-3 top-0 z-[45] hidden lg:flex flex-col items-center"
            style={{ y: markerY }}
            aria-hidden
        >
            <div className="-translate-y-1/2 flex flex-col items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[#10b981] shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
                <span
                    ref={pctRef}
                    className="rounded-full border border-emerald-100 bg-white/95 px-2 py-0.5 text-[10px] font-bold tabular-nums text-slate-600 shadow-sm"
                >
                    0%
                </span>
            </div>
        </motion.div>
    );
}
