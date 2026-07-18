"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useSiteReady } from "./IntroExperience";
import { setLenis, scrollToId } from "@/lib/lenisBridge";

/**
 * Lenis wheel smoothing — tuned for smooth + responsive feel.
 * Hash links are routed through the same instance so scroll stays in sync.
 */
export default function SmoothScroll() {
    const ready = useSiteReady();

    useEffect(() => {
        if (!ready) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({
            // Higher lerp = less rubber-band lag; still smooth on wheel
            lerp: 0.12,
            wheelMultiplier: 1,
            touchMultiplier: 1.1,
            smoothWheel: true,
            syncTouch: false,
            autoRaf: false,
        });

        setLenis(lenis);
        document.documentElement.classList.add("lenis-on");

        let raf = 0;
        const loop = (time: number) => {
            lenis.raf(time);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        // Keep in-page anchors on the Lenis timeline (not native smooth)
        const onClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            const a = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
            if (!a) return;
            const href = a.getAttribute("href");
            if (!href || href === "#") return;
            const id = href.slice(1);
            if (!document.getElementById(id)) return;
            e.preventDefault();
            scrollToId(id);
        };

        document.addEventListener("click", onClick);

        return () => {
            document.removeEventListener("click", onClick);
            cancelAnimationFrame(raf);
            setLenis(null);
            lenis.destroy();
            document.documentElement.classList.remove("lenis-on");
        };
    }, [ready]);

    return null;
}
