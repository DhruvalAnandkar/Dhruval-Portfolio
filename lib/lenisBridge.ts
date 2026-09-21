/**
 * In-page navigation helpers.
 * Native window scroll — programmatic jumps use smooth behavior.
 * (Wheel Lenis lerp removed: it fought Framer + heavy FX and felt rubbery.)
 */

export function setLenis(_instance: unknown) {
    /* no-op: reserved if Lenis is reintroduced with Framer frame sync */
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
