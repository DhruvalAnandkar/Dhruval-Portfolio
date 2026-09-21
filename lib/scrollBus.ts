/**
 * Single scroll bus — progress chrome only.
 * Never pauses CSS animations (that froze petals mid-fall).
 */

type ScrollListener = (progress: number, y: number) => void;

const listeners = new Set<ScrollListener>();
let installed = false;
let raf = 0;
let ticking = false;
let lastProgress = 0;
let lastY = 0;
let lastT = 0;
let velocity = 0;

function progressNow() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

function paint() {
    ticking = false;
    const y = window.scrollY;
    const now = performance.now();
    const p = progressNow();
    lastProgress = p;

    if (lastT > 0) {
        const dt = Math.max(1, now - lastT);
        velocity = Math.abs(y - lastY) / dt;
    }
    lastY = y;
    lastT = now;

    document.documentElement.style.setProperty("--scroll-p", p.toFixed(4));
    listeners.forEach((fn) => fn(p, y));
}

function onScroll() {
    if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(paint);
    }
}

function ensureInstalled() {
    if (installed || typeof window === "undefined") return;
    installed = true;
    lastY = window.scrollY;
    lastT = performance.now();
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
}

/** Subscribe to scroll progress (rAF-coalesced). Returns unsubscribe. */
export function onScrollProgress(fn: ScrollListener) {
    ensureInstalled();
    listeners.add(fn);
    fn(lastProgress || progressNow(), typeof window !== "undefined" ? window.scrollY : 0);
    return () => {
        listeners.delete(fn);
    };
}

export function startScrollBus() {
    ensureInstalled();
}

/** True when the user is flinging the page (for instant reveals). */
export function isFastScrolling() {
    return velocity >= 1.2;
}
