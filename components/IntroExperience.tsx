"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

type Phase = "boot" | "spark" | "brand" | "tag" | "charge" | "split" | "done";

const letters = ["D", "h", "r", "u", "v", "a", "l"];

/** Site content stays gated until intro hands off cleanly */
const SiteReadyContext = createContext(false);
export function useSiteReady() {
    return useContext(SiteReadyContext);
}

function isSlowClient() {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData;
    return cores <= 4 || (typeof memory === "number" && memory <= 4) || !!saveData;
}

/** Deterministic phase schedule (ms). Slow clients get a tighter cut. */
function buildSchedule(slow: boolean) {
    if (slow) {
        return {
            spark: 180,
            brand: 420,
            tag: 900,
            charge: 1400,
            split: 1800,
            finish: 2600,
            exitMs: 500,
            hardMax: 3200,
        };
    }
    return {
        spark: 200,
        brand: 520,
        tag: 980,
        charge: 1600,
        split: 2050,
        finish: 2800,
        exitMs: 420,
        hardMax: 3600,
    };
}

function SparkField({ burst, count }: { burst: boolean; count: number }) {
    const sparks = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                id: i,
                angle: (i / count) * Math.PI * 2,
                dist: 70 + (i % 7) * 24,
                size: 2 + (i % 3),
                delay: (i % 6) * 0.03,
            })),
        [count]
    );

    return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {sparks.map((s) => (
                <motion.span
                    key={s.id}
                    className="absolute rounded-full bg-[#34d399]"
                    style={{ width: s.size, height: s.size }}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={
                        burst
                            ? {
                                  x: Math.cos(s.angle) * s.dist,
                                  y: Math.sin(s.angle) * s.dist,
                                  opacity: [0, 1, 0],
                                  scale: [0, 1.3, 0],
                              }
                            : { opacity: 0 }
                    }
                    transition={{ duration: 0.75, delay: s.delay, ease: [0.22, 1, 0.36, 1] }}
                />
            ))}
        </div>
    );
}

/**
 * Sync contract:
 * 1) Intro owns the screen (scroll locked, content gated)
 * 2) Timeline is deterministic + adaptive to device speed
 * 3) Hard max timeout always finishes
 * 4) Handoff: scrollTo(0) → unmount overlay → THEN reveal content (no mid-page flash)
 */
export default function IntroExperience({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const [phase, setPhase] = useState<Phase>("boot");
    const [showIntro, setShowIntro] = useState(true);
    const [siteReady, setSiteReady] = useState(false);
    const [pct, setPct] = useState(0);
    const slow = useMemo(() => (mounted ? isSlowClient() : false), [mounted]);
    const schedule = useMemo(() => buildSchedule(slow), [slow]);
    const finishedRef = useRef(false);
    const timersRef = useRef<number[]>([]);

    const clearTimers = useCallback(() => {
        timersRef.current.forEach((id) => window.clearTimeout(id));
        timersRef.current = [];
    }, []);

    const handoff = useCallback(() => {
        if (finishedRef.current) return;
        finishedRef.current = true;
        clearTimers();
        setPhase("done");
        setPct(100);

        // Lock scroll at top BEFORE content becomes visible
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        document.documentElement.style.overflow = "hidden";

        const exitId = window.setTimeout(() => {
            setShowIntro(false);
            // Wait two frames so overlay paint clears, then reveal site at top
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                    setSiteReady(true);
                    document.documentElement.style.overflow = "";
                });
            });
        }, schedule.exitMs);

        timersRef.current.push(exitId);
    }, [clearTimers, schedule.exitMs]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            finishedRef.current = true;
            setShowIntro(false);
            setPhase("done");
            setSiteReady(true);
            document.documentElement.style.overflow = "";
            return;
        }

        document.documentElement.style.overflow = "hidden";
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });

        const s = buildSchedule(isSlowClient());
        const queue = (fn: () => void, ms: number) => {
            const id = window.setTimeout(fn, ms);
            timersRef.current.push(id);
        };

        queue(() => setPhase("spark"), s.spark);
        queue(() => setPhase("brand"), s.brand);
        queue(() => setPhase("tag"), s.tag);
        queue(() => setPhase("charge"), s.charge);
        queue(() => setPhase("split"), s.split);
        queue(() => handoff(), s.finish);
        // Absolute safety net — never leave user stuck on intro
        queue(() => handoff(), s.hardMax);

        // Smooth deterministic loading bar (no random jumps)
        const started = performance.now();
        const bar = window.setInterval(() => {
            const t = performance.now() - started;
            const next = Math.min(96, Math.round((t / s.finish) * 100));
            setPct(next);
        }, 50);

        return () => {
            clearTimers();
            window.clearInterval(bar);
            document.documentElement.style.overflow = "";
        };
    }, [mounted, handoff, clearTimers]);

    const burst = phase === "spark" || phase === "brand" || phase === "tag";

    // Always keep page content in the DOM (incl. SSR) so Google can index it.
    // Intro overlay covers the UI for humans until handoff.
    if (!mounted) {
        return (
            <SiteReadyContext.Provider value={true}>
                <div className="site-shell">{children}</div>
                <div className="fixed inset-0 z-[100] bg-[#050b09]" aria-hidden />
            </SiteReadyContext.Provider>
        );
    }

    return (
        <SiteReadyContext.Provider value={siteReady}>
            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        key="intro"
                        className="fixed inset-0 z-[100] overflow-hidden select-none"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: schedule.exitMs / 1000, ease: [0.22, 1, 0.36, 1] }}
                        aria-hidden
                    >
                        <div className="absolute inset-0 bg-[#050b09]" />

                        <div
                            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
                            style={{
                                backgroundImage:
                                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                            }}
                        />

                        <motion.div
                            className="absolute inset-0 opacity-35"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)",
                                backgroundSize: "56px 56px",
                            }}
                            animate={slow ? undefined : { backgroundPosition: ["0px 0px", "56px 56px"] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />

                        <motion.div
                            className="absolute left-1/2 top-1/2 h-[55vmax] w-[55vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(16,185,129,0.26) 0%, rgba(16,185,129,0.05) 32%, transparent 64%)",
                            }}
                            animate={{
                                scale: phase === "split" || phase === "done" ? 2.6 : [0.85, 1.05, 0.9],
                                opacity: phase === "done" ? 0 : 1,
                            }}
                            transition={{ duration: phase === "split" ? 1 : 2.4, ease: "easeInOut" }}
                        />

                        <motion.div
                            className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#10b981] to-transparent"
                            initial={{ height: "0%", opacity: 0 }}
                            animate={{
                                height: "100%",
                                opacity: phase === "split" || phase === "done" ? 0 : 0.7,
                            }}
                            transition={{ duration: 0.55 }}
                        />
                        <motion.div
                            className="absolute top-1/2 left-0 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#10b981] to-transparent"
                            initial={{ width: "0%", opacity: 0 }}
                            animate={{
                                width: "100%",
                                opacity: phase === "split" || phase === "done" ? 0 : 0.7,
                            }}
                            transition={{ duration: 0.55, delay: 0.04 }}
                        />

                        <SparkField burst={burst} count={slow ? 14 : 24} />

                        {(phase === "charge" || phase === "split") &&
                            [0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#10b981]/30"
                                    initial={{ width: 36, height: 36, opacity: 0.85 }}
                                    animate={{ width: 180 + i * 140, height: 180 + i * 140, opacity: 0 }}
                                    transition={{ duration: 0.95, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                />
                            ))}

                        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                            <AnimatePresence mode="wait">
                                {(phase === "brand" || phase === "tag" || phase === "charge") && (
                                    <motion.div
                                        key="brand"
                                        className="flex flex-col items-center"
                                        initial={{ opacity: 0, scale: 0.88 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.08, y: -16 }}
                                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <div className="relative mb-8 flex h-24 w-24 items-center justify-center intro-glint">
                                            <motion.div
                                                className="absolute inset-0 rounded-2xl border border-[#10b981]/60 bg-[#10b981]/15"
                                                style={{ rotate: 45 }}
                                                animate={{ rotate: [45, 135, 225, 405] }}
                                                transition={{ duration: slow ? 1.6 : 2.2, ease: [0.22, 1, 0.36, 1] }}
                                            />
                                            <motion.div
                                                className="absolute inset-0 rounded-2xl"
                                                style={{ rotate: 45 }}
                                                animate={{
                                                    boxShadow: [
                                                        "0 0 20px rgba(16,185,129,0.2)",
                                                        "0 0 70px rgba(16,185,129,0.55)",
                                                        "0 0 20px rgba(16,185,129,0.2)",
                                                    ],
                                                }}
                                                transition={{ duration: 1.3, repeat: Infinity }}
                                            />
                                            <span className="relative z-10 text-3xl font-extrabold tracking-tight text-white">
                                                DA
                                            </span>
                                        </div>

                                        <div className="flex gap-[0.06em] overflow-hidden">
                                            {letters.map((ch, i) => (
                                                <motion.span
                                                    key={ch + i}
                                                    className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white tracking-tight"
                                                    initial={{ y: "120%", opacity: 0 }}
                                                    animate={{ y: "0%", opacity: 1 }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay: 0.08 + i * 0.045,
                                                        ease: [0.22, 1, 0.36, 1],
                                                    }}
                                                >
                                                    {ch}
                                                </motion.span>
                                            ))}
                                        </div>

                                        {(phase === "tag" || phase === "charge") && (
                                            <motion.p
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-6 text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase text-[#34d399]"
                                            >
                                                Build · Learn · Ship
                                            </motion.p>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {(phase === "split" || phase === "done") && (
                            <>
                                <motion.div
                                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#10b981]/45"
                                    initial={{ width: 8, height: 8, opacity: 1 }}
                                    animate={{ width: "160vmax", height: "160vmax", opacity: 0 }}
                                    transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                                />
                                <motion.div
                                    className="absolute inset-y-0 left-0 w-1/2 bg-[#050b09]"
                                    initial={{ x: 0 }}
                                    animate={{ x: "-108%" }}
                                    transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
                                />
                                <motion.div
                                    className="absolute inset-y-0 right-0 w-1/2 bg-[#050b09]"
                                    initial={{ x: 0 }}
                                    animate={{ x: "108%" }}
                                    transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
                                />
                            </>
                        )}

                        <div className="absolute bottom-8 inset-x-0 px-8 flex items-end justify-between gap-4">
                            <div className="flex flex-col gap-2 min-w-[120px]">
                                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/40">
                                    Loading
                                </span>
                                <div className="h-[2px] w-40 bg-white/10 overflow-hidden rounded-full">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-[#059669] via-[#34d399] to-[#10b981]"
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handoff}
                                className="text-[11px] font-bold uppercase tracking-widest text-white/35 hover:text-white/85 transition-colors"
                            >
                                Skip intro
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content stays mounted for crawlers; revealed after intro for humans */}
            <motion.div
                initial={false}
                animate={{ opacity: siteReady ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="site-shell"
                style={{ pointerEvents: siteReady ? "auto" : "none" }}
                aria-hidden={!siteReady}
            >
                {children}
            </motion.div>
            {!siteReady && !showIntro && (
                <div className="fixed inset-0 z-[90] bg-[#050b09]" aria-hidden />
            )}
        </SiteReadyContext.Provider>
    );
}
