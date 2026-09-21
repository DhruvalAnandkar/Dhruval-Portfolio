"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const HIT =
    "a, button, [role='button'], input, textarea, label, select, summary, [data-cursor='pointer'], .elite-magnetic, .elite-surface";

/**
 * Custom diamond cursor stays on ALWAYS — never hand off to the OS arrow.
 * Position = pointermove only (same speed as the mouse).
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
  transition: none !important;
  contain: layout style;
}
.elite-cursor-frame {
  position: absolute; inset: 7px;
  border: 1.5px solid transparent;
  border-radius: 2px;
  transform: rotate(45deg) scale(0.85);
  opacity: 0;
  box-sizing: border-box;
  transition: opacity 50ms linear, border-color 50ms linear, background-color 50ms linear;
}
.elite-cursor-mark {
  position: relative; z-index: 1;
  width: 9px; height: 9px;
  background: #0f172a;
  border: 1.5px solid #10b981;
  border-radius: 1.5px;
  transform: rotate(45deg);
  box-shadow: 0 1px 3px rgba(15,23,42,0.22);
  transition: background-color 50ms linear, border-color 50ms linear, box-shadow 50ms linear;
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
}
.elite-cursor-tip.is-down .elite-cursor-mark {
  background: #059669;
  box-shadow: 0 0 6px rgba(16,185,129,0.35);
}
`;

const HALF = 14;

export default function EliteCursor() {
    const [on, setOn] = useState(false);
    const [mounted, setMounted] = useState(false);

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
        let tip: HTMLDivElement | null = null;
        let cleanup: (() => void) | undefined;

        const attach = () => {
            if (cancelled) return;
            const layer = document.querySelector(".elite-cursor");
            if (!layer) {
                requestAnimationFrame(attach);
                return;
            }

            tip = document.createElement("div");
            tip.className = "elite-cursor-tip";
            tip.innerHTML =
                '<span class="elite-cursor-frame"></span><span class="elite-cursor-mark"></span>';
            layer.appendChild(tip);

            let hot = false;
            const setHot = (next: boolean) => {
                if (!tip || next === hot) return;
                hot = next;
                tip.classList.toggle("is-hot", next);
            };

            const onPointerMove = (e: PointerEvent) => {
                if (!tip) return;
                tip.style.transform = `translate3d(${e.clientX - HALF}px, ${e.clientY - HALF}px, 0)`;
            };

            const onOver = (e: Event) => {
                const t = e.target as Element | null;
                setHot(!!t?.closest?.(HIT));
            };

            const onDown = () => tip?.classList.add("is-down");
            const onUp = () => tip?.classList.remove("is-down");

            window.addEventListener("pointermove", onPointerMove, { passive: true });
            document.addEventListener("mouseover", onOver, true);
            window.addEventListener("pointerdown", onDown, { passive: true });
            window.addEventListener("pointerup", onUp, { passive: true });

            cleanup = () => {
                window.removeEventListener("pointermove", onPointerMove);
                document.removeEventListener("mouseover", onOver, true);
                window.removeEventListener("pointerdown", onDown);
                window.removeEventListener("pointerup", onUp);
                tip?.remove();
                tip = null;
            };
        };

        attach();
        return () => {
            cancelled = true;
            cleanup?.();
        };
    }, [on, mounted]);

    if (!mounted || !on) return null;

    return createPortal(
        <>
            <style dangerouslySetInnerHTML={{ __html: CURSOR_CSS }} />
            <div className="elite-cursor" aria-hidden />
        </>,
        document.body
    );
}
