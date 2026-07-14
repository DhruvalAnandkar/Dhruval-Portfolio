"use client";

import { useEffect, useMemo, useState } from "react";
import { useSiteReady } from "./IntroExperience";

/**
 * Visible site-wide sky — must stay noticeable under translucent sections.
 */
export default function SiteAtmosphere() {
    const ready = useSiteReady();
    const [tier, setTier] = useState<"off" | "lite" | "full">("lite");

    useEffect(() => {
        if (!ready) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            setTier("off");
            return;
        }
        const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
            ?.saveData;
        const cores = navigator.hardwareConcurrency ?? 8;
        const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
        const slow = cores <= 4 || (typeof memory === "number" && memory <= 4) || !!saveData;
        const id = window.setTimeout(() => setTier(slow ? "lite" : "full"), 40);
        return () => window.clearTimeout(id);
    }, [ready]);

    const sparks = useMemo(() => {
        const n = tier === "full" ? 10 : tier === "lite" ? 5 : 0;
        return Array.from({ length: n }, (_, i) => ({
            id: i,
            left: `${8 + ((i * 11) % 84)}%`,
            top: `${12 + ((i * 17) % 76)}%`,
            delay: `${(i % 7) * 0.55}s`,
            duration: `${3.4 + (i % 4) * 0.7}s`,
        }));
    }, [tier]);

    const petals = useMemo(() => {
        const n = tier === "full" ? 8 : tier === "lite" ? 4 : 0;
        return Array.from({ length: n }, (_, i) => ({
            id: i,
            left: `${6 + ((i * 17) % 88)}%`,
            delay: `${(i % 8) * 0.7}s`,
            duration: `${11 + (i % 5)}s`,
            size: 7 + (i % 4) * 2,
            hue: i % 3 === 0 ? "#86efac" : i % 3 === 1 ? "#fde68a" : "#bae6fd",
            drift: `${14 + (i % 4) * 12}px`,
        }));
    }, [tier]);

    if (!ready || tier === "off") return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
            <div className="absolute inset-0 site-atm-sky" />
            <div className="absolute inset-0 calm-global-wash" />
            <div className="absolute inset-0 site-atm-rays" />
            {tier === "full" && <div className="absolute inset-0 site-atm-flare" />}

            <div className="absolute inset-0 site-atm-clouds">
                <span className="site-atm-cloud site-atm-cloud-a" />
                <span className="site-atm-cloud site-atm-cloud-b" />
                <span className="site-atm-cloud site-atm-cloud-c" />
            </div>

            {tier === "full" && (
                <>
                    <div className="ambient-blob ambient-blob-a" />
                    <div className="ambient-blob ambient-blob-b" />
                    <div className="ambient-blob ambient-blob-c" />
                </>
            )}

            {petals.map((p) => (
                <span
                    key={`p-${p.id}`}
                    className="anime-petal site-atm-petal"
                    style={{
                        left: p.left,
                        width: p.size,
                        height: p.size * 1.35,
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
                    className="site-atm-spark"
                    style={{
                        left: s.left,
                        top: s.top,
                        animationDelay: s.delay,
                        animationDuration: s.duration,
                    }}
                />
            ))}
        </div>
    );
}
