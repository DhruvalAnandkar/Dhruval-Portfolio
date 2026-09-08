"use client";

import { useEffect, useRef } from "react";

/** Top progress bar — native scroll, no Framer spring/desync. */
export default function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let raf = 0;
        let ticking = false;

        const paint = () => {
            ticking = false;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
            const scale = `scaleX(${p})`;
            if (barRef.current) barRef.current.style.transform = scale;
            if (glowRef.current) glowRef.current.style.transform = scale;
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
        <>
            <div
                ref={barRef}
                className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#059669] via-[#10b981] to-sky-400"
                style={{ transform: "scaleX(0)" }}
                aria-hidden
            />
            <div
                ref={glowRef}
                className="pointer-events-none fixed top-0 left-0 right-0 z-[59] h-8 origin-left bg-gradient-to-r from-[#10b981]/25 via-emerald-300/15 to-transparent blur-md opacity-55"
                style={{ transform: "scaleX(0)" }}
                aria-hidden
            />
        </>
    );
}
