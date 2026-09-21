"use client";

import { useEffect } from "react";
import { useSiteReady } from "./IntroExperience";
import { scrollToId } from "@/lib/lenisBridge";
import { startScrollBus } from "@/lib/scrollBus";

/**
 * After intro: install the scroll bus + hash-link routing.
 * Native wheel scroll (no Lenis lerp). Progress chrome shares one scroll bus.
 */
export default function SmoothScroll() {
    const ready = useSiteReady();

    useEffect(() => {
        if (!ready) return;

        document.documentElement.classList.remove("lenis-on");
        startScrollBus();

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
        };
    }, [ready]);

    return null;
}
