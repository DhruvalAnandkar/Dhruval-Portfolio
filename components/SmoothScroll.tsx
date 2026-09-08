"use client";

import { useEffect } from "react";
import { useSiteReady } from "./IntroExperience";
import { scrollToId } from "@/lib/lenisBridge";

/**
 * Hash-link routing only — native wheel/trackpad scroll.
 * Lenis wheel smoothing was removed: its lerp made the page catch up
 * seconds after input (felt like lag / glitching).
 */
export default function SmoothScroll() {
    const ready = useSiteReady();

    useEffect(() => {
        if (!ready) return;

        document.documentElement.classList.remove("lenis-on");

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
        return () => document.removeEventListener("click", onClick);
    }, [ready]);

    return null;
}
