"use client";

import { useEffect, useRef } from "react";
import { onScrollProgress } from "@/lib/scrollBus";

/** Top progress bar — compositor scaleX only (glow uses opacity, not blur×scale). */
export default function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        return onScrollProgress((p) => {
            const scale = `scaleX(${p})`;
            if (barRef.current) barRef.current.style.transform = scale;
            // Opacity only — never scale a blurred layer (classic GPU jank)
            if (glowRef.current) {
                glowRef.current.style.opacity = String(0.25 + p * 0.35);
            }
        });
    }, []);

    return (
        <>
            <div
                ref={barRef}
                className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#059669] via-[#10b981] to-sky-400 will-change-transform"
                style={{ transform: "scaleX(0)" }}
                aria-hidden
            />
            <div
                ref={glowRef}
                className="pointer-events-none fixed top-0 left-0 right-0 z-[59] h-6 origin-left bg-gradient-to-r from-[#10b981]/30 via-emerald-300/20 to-transparent"
                style={{ opacity: 0.25 }}
                aria-hidden
            />
        </>
    );
}
