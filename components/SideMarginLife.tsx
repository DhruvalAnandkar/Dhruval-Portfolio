"use client";

import { useEffect, useState } from "react";

/**
 * Professional side gutters — light architecture.
 * No scroll-linked layout (top: calc) — that thrashed while scrolling.
 */
export default function SideMarginLife({
    tone = "meadow",
    compact = false,
}: {
    tone?: "meadow" | "map";
    compact?: boolean;
}) {
    const [on, setOn] = useState(false);

    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
            ?.saveData;
        if (reduce || saveData) return;
        const id = window.setTimeout(() => setOn(true), compact ? 220 : 140);
        return () => window.clearTimeout(id);
    }, [compact]);

    if (!on) return null;

    return (
        <>
            <div
                className={`pointer-events-none absolute inset-y-0 left-0 z-[2] hidden lg:block w-[min(20vw,240px)] overflow-hidden side-rail ${tone === "map" ? "side-rail-map" : ""} ${compact ? "side-rail-compact" : ""}`}
                aria-hidden
            >
                <div className="side-rail-wash side-rail-wash-l" />
                <div className="side-rail-veil side-rail-veil-l" />
                <span className="side-rail-orb side-rail-orb-l-1" />
                <span className="side-rail-orb side-rail-orb-l-2" />
                {!compact && (
                    <>
                        <span className="side-rail-line side-rail-line-l-1" />
                        <span className="side-rail-pulse side-rail-pulse-l" />
                        <span className="side-rail-node side-rail-node-l-1" />
                        <span className="side-rail-node side-rail-node-l-2" />
                        <span className="side-rail-arc side-rail-arc-l" />
                    </>
                )}
            </div>

            <div
                className={`pointer-events-none absolute inset-y-0 right-0 z-[2] hidden lg:block w-[min(20vw,240px)] overflow-hidden side-rail ${tone === "map" ? "side-rail-map" : ""} ${compact ? "side-rail-compact" : ""}`}
                aria-hidden
            >
                <div className="side-rail-wash side-rail-wash-r" />
                <div className="side-rail-veil side-rail-veil-r" />
                <span className="side-rail-orb side-rail-orb-r-1" />
                <span className="side-rail-orb side-rail-orb-r-2" />
                {!compact && (
                    <>
                        <span className="side-rail-line side-rail-line-r-1" />
                        <span className="side-rail-pulse side-rail-pulse-r" />
                        <span className="side-rail-node side-rail-node-r-1" />
                        <span className="side-rail-node side-rail-node-r-2" />
                        <span className="side-rail-arc side-rail-arc-r" />
                    </>
                )}
            </div>
        </>
    );
}
