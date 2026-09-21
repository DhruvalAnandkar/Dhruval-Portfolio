"use client";

import { useEffect, useRef } from "react";
import { onScrollProgress } from "@/lib/scrollBus";

/** Minimal scroll chrome — transform + text only, shared scroll bus. */
export default function ScrollTheatre() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const pctRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let lastPct = -1;
        return onScrollProgress((p) => {
            const pct = Math.round(p * 100);
            const y = 8 + p * 80;

            if (wrapRef.current) {
                wrapRef.current.style.transform = `translate3d(0, ${y}vh, 0)`;
            }
            if (pct !== lastPct && pctRef.current) {
                lastPct = pct;
                pctRef.current.textContent = `${pct}%`;
            }
        });
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
