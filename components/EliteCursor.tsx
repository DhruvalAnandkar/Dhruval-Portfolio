"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const HIT =
    "a, button, [role='button'], input, textarea, label, select, summary, [data-cursor='pointer'], .elite-magnetic, .elite-surface";

/**
 * Styles injected here so Turbopack CSS cache can't hide the cursor.
 * Position uses transform only — no size transitions on the tip (avoids micro-lag).
 */
const CURSOR_CSS = `
body.elite-cursor-on, body.elite-cursor-on * { cursor: none !important; }
.elite-cursor {
  position: fixed; inset: 0; z-index: 2147483646; pointer-events: none;
  display: none;
}
@media (min-width: 768px) {
  .elite-cursor { display: block; }
}
.elite-cursor-tip {
  position: fixed; top: 0; left: 0;
  width: 28px; height: 28px;
  display: grid; place-items: center;
  will-change: transform;
  transform: translate3d(-100px, -100px, 0);
}
.elite-cursor-frame {
  position: absolute; inset: 7px;
  border: 1.5px solid transparent;
  border-radius: 2px;
  transform: rotate(45deg) scale(0.85);
  opacity: 0;
  box-sizing: border-box;
  transition: opacity 80ms ease, transform 80ms ease, border-color 80ms ease, background-color 80ms ease;
}
.elite-cursor-mark {
  position: relative; z-index: 1;
  width: 9px; height: 9px;
  background: #0f172a;
  border: 1.5px solid #10b981;
  border-radius: 1.5px;
  transform: rotate(45deg);
  box-shadow: 0 1px 3px rgba(15,23,42,0.22);
  transition: background-color 80ms ease, border-color 80ms ease, box-shadow 80ms ease, transform 80ms ease;
}
.elite-cursor-tip.is-hot .elite-cursor-frame {
  opacity: 1;
  transform: rotate(45deg) scale(1);
  border-color: #10b981;
  background: rgba(16,185,129,0.1);
}
.elite-cursor-tip.is-hot .elite-cursor-mark {
  background: #10b981;
  border-color: #ecfdf5;
  box-shadow: 0 0 10px rgba(16,185,129,0.45);
  transform: rotate(45deg) scale(1.08);
}
.elite-cursor-tip.is-down .elite-cursor-mark {
  transform: rotate(45deg) scale(0.82);
}
`;

/**
 * Professional dual-state cursor — true 1:1 tracking.
 * Hit-testing runs on a separate rAF so it never delays position updates.
 */
export default function EliteCursor() {
    const [on, setOn] = useState(false);
    const [mounted, setMounted] = useState(false);
    const tipRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: -100, y: -100 });
    const hot = useRef(false);

    useEffect(() => {
        setMounted(true);
        if (!window.matchMedia("(pointer: fine)").matches) return;
        setOn(true);
        document.body.classList.add("elite-cursor-on");
        return () => document.body.classList.remove("elite-cursor-on");
    }, []);

    useEffect(() => {
        if (!on || !mounted) return;

        let cancelled = false;
        let hitRaf = 0;
        let cleanupMove: (() => void) | undefined;

        const boot = requestAnimationFrame(() => {
            const tip = tipRef.current;
            if (!tip || cancelled) return;

            const place = () => {
                const { x, y } = pos.current;
                tip.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
            };

            // Position: every mousemove, zero delay
            const onMove = (e: MouseEvent) => {
                pos.current.x = e.clientX;
                pos.current.y = e.clientY;
                place();
            };

            // Hit-test: separate loop, throttled — never blocks place()
            let lastHit = 0;
            const hitLoop = (time: number) => {
                if (time - lastHit >= 32) {
                    lastHit = time;
                    const { x, y } = pos.current;
                    const el = document.elementFromPoint(x, y) as HTMLElement | null;
                    const next = !!el?.closest(HIT);
                    if (next !== hot.current) {
                        hot.current = next;
                        tip.classList.toggle("is-hot", next);
                    }
                }
                hitRaf = requestAnimationFrame(hitLoop);
            };

            const onDown = () => tip.classList.add("is-down");
            const onUp = () => tip.classList.remove("is-down");

            place();
            window.addEventListener("mousemove", onMove, { passive: true });
            window.addEventListener("mousedown", onDown);
            window.addEventListener("mouseup", onUp);
            hitRaf = requestAnimationFrame(hitLoop);

            cleanupMove = () => {
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mousedown", onDown);
                window.removeEventListener("mouseup", onUp);
                cancelAnimationFrame(hitRaf);
            };
        });

        return () => {
            cancelled = true;
            cancelAnimationFrame(boot);
            cleanupMove?.();
        };
    }, [on, mounted]);

    if (!mounted || !on) return null;

    return createPortal(
        <>
            <style dangerouslySetInnerHTML={{ __html: CURSOR_CSS }} />
            <div className="elite-cursor" aria-hidden>
                <div ref={tipRef} className="elite-cursor-tip">
                    <span className="elite-cursor-frame" />
                    <span className="elite-cursor-mark" />
                </div>
            </div>
        </>,
        document.body
    );
}
