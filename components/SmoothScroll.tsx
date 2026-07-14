"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useSiteReady } from "./IntroExperience";

/**
 * Soft Lenis — snappy lerp so it feels smooth, not laggy.
 * Only wheel/trackpad; anchors still use native scrollIntoView.
 */
export default function SmoothScroll() {
    const ready = useSiteReady();

    useEffect(() => {
        if (!ready) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({
            lerp: 0.135,
            wheelMultiplier: 0.95,
            touchMultiplier: 1.15,
            smoothWheel: true,
            syncTouch: false,
        });

        document.documentElement.classList.add("lenis-on");
        let raf = 0;
        const loop = (time: number) => {
            lenis.raf(time);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
            document.documentElement.classList.remove("lenis-on");
        };
    }, [ready]);

    return null;
}
