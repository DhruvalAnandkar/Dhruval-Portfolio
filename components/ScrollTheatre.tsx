"use client";

import { useEffect, useRef } from "react";

/**
 * Minimal scroll chrome — driven by native scroll only (no Framer lag layer).
 */
export default function ScrollTheatre() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const pctRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let raf = 0;
        let lastPct = -1;
        let ticking = false;

        const paint = () => {
            ticking = false;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
            const pct = Math.round(p * 100);
            const y = 8 + p * 80;

            if (wrapRef.current) {
                wrapRef.current.style.transform = `translate3d(0, ${y}vh, 0)`;
            }
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
        window.addEventListener("resize", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div
            ref={wrapRef}
            className="pointer-events-none fixed right-3 top-0 z-[45] hidden lg:flex flex-col items-center will-change-transform"
            style={{ transform: "translate3d(0, 8vh, 0)" }}
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
        </div>
    );
}
