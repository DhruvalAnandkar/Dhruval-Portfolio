/**
 * In-page navigation helpers.
 * Native window scroll only — no Lenis lerp (that caused rubber-band lag).
 */

export function setLenis(_instance: unknown) {
    /* no-op: Lenis removed to stop scroll desync */
}

export function getLenis() {
    return null;
}

/** Scroll to an element id with a small nav offset */
export function scrollToId(id: string, offset = -12) {
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}
