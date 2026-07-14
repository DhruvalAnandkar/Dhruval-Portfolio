"use client";

import { forwardRef, useEffect, useMemo, useState } from "react";

/**
 * Shinkai-inspired sky: layered clouds, god rays, wind petals, meadow haze.
 * CSS transforms only. Mouse parallax via CSS vars (no React re-renders).
 */
const NatureAtmosphere = forwardRef<HTMLDivElement>(function NatureAtmosphere(_, ref) {
    const [tier, setTier] = useState<"full" | "lite" | "off">("full");

    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            setTier("off");
            return;
        }
        const cores = navigator.hardwareConcurrency ?? 8;
        const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
        const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
            ?.saveData;
        /* Only step down on clearly constrained devices — mid PCs should stay cinematic */
        const slow = cores <= 2 || (typeof memory === "number" && memory <= 2) || !!saveData;
        setTier(slow ? "lite" : "full");
    }, []);

    const petals = useMemo(() => {
        const n = tier === "off" ? 0 : tier === "lite" ? 10 : 16;
        return Array.from({ length: n }, (_, i) => ({
            id: i,
            left: `${4 + ((i * 19 + 7) % 92)}%`,
            delay: `${(i % 9) * 0.45}s`,
            duration: `${10 + (i % 6)}s`,
            size: 8 + (i % 4) * 3,
            hue: i % 4 === 0 ? "#86efac" : i % 4 === 1 ? "#fde68a" : i % 4 === 2 ? "#fda4af" : "#bae6fd",
            drift: `${16 + (i % 5) * 12}px`,
        }));
    }, [tier]);

    const sparks = useMemo(() => {
        const n = tier === "full" ? 14 : tier === "lite" ? 8 : 0;
        return Array.from({ length: n }, (_, i) => ({
            id: i,
            left: `${8 + ((i * 23) % 84)}%`,
            top: `${12 + ((i * 17) % 55)}%`,
            delay: `${(i % 8) * 0.4}s`,
            duration: `${3.2 + (i % 4) * 0.6}s`,
        }));
    }, [tier]);

    return (
        <div
            ref={ref}
            className="pointer-events-none absolute inset-0 overflow-hidden anime-sky"
            aria-hidden
            style={
                {
                    ["--mx" as string]: "0",
                    ["--my" as string]: "0",
                } as React.CSSProperties
            }
        >
            <div className="absolute inset-0 anime-sky-wash" />
            {tier !== "off" && <div className="absolute inset-0 anime-godrays" />}
            {tier === "full" && <div className="absolute inset-0 anime-flare" />}

            <div className="absolute inset-0 anime-layer-far">
                <div className="anime-cloud anime-cloud-a" />
                <div className="anime-cloud anime-cloud-b" />
                <div className="anime-cloud anime-cloud-c" />
            </div>

            <div className="absolute inset-0 anime-layer-mid">
                <div className="anime-cloud anime-cloud-d" />
                <div className="anime-cloud anime-cloud-e" />
                {tier === "full" && (
                    <>
                        <span className="anime-wind anime-wind-1" />
                        <span className="anime-wind anime-wind-2" />
                        <span className="anime-wind anime-wind-3" />
                    </>
                )}
            </div>

            <div className="absolute inset-0 anime-layer-near">
                {petals.map((p) => (
                    <span
                        key={p.id}
                        className="anime-petal"
                        style={{
                            left: p.left,
                            width: p.size,
                            height: p.size * 1.4,
                            background: p.hue,
                            animationDelay: p.delay,
                            animationDuration: p.duration,
                            ["--petal-drift" as string]: p.drift,
                        }}
                    />
                ))}
                {sparks.map((s) => (
                    <span
                        key={s.id}
                        className="anime-spark"
                        style={{
                            left: s.left,
                            top: s.top,
                            animationDelay: s.delay,
                            animationDuration: s.duration,
                        }}
                    />
                ))}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-[38%] anime-hills" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-emerald-100/70 via-emerald-50/25 to-transparent" />
        </div>
    );
});

export default NatureAtmosphere;
