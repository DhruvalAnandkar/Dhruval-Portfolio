import type Lenis from "lenis";

/** Shared Lenis instance so anchors + wheel scroll stay in sync */
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
    lenis = instance;
}

export function getLenis() {
    return lenis;
}

/** Smooth scroll to an element id via Lenis when available */
export function scrollToId(id: string, offset = -12) {
    const el = document.getElementById(id);
    if (!el) return;

    if (lenis) {
        lenis.scrollTo(el, { offset, duration: 1.15, easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)) });
        return;
    }

    el.scrollIntoView({ behavior: "smooth", block: "start" });
}
