"use client";

import { useMemo, useRef } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useScroll,
    useInView,
} from "framer-motion";
import {
    MapPinned,
    GraduationCap,
    Code2,
    Boxes,
    Microscope,
    Route,
    Trophy,
    Heart,
    Compass,
} from "lucide-react";
import SectionFX from "./SectionFX";

type Destination = {
    id: string;
    label: string;
    hint: string;
    Icon: typeof Compass;
    x: number;
    y: number;
    size: "sm" | "md" | "lg";
    stop: number;
};

/** Path + islands share one coordinate system (0–100). Icons sit on path centers. */
const START = { x: 12, y: 78 };

const destinations: Destination[] = [
    { id: "about", label: "Origins", hint: "Where I started", Icon: GraduationCap, x: 26, y: 58, size: "md", stop: 1 },
    { id: "skills", label: "Craft", hint: "Tools & stack", Icon: Code2, x: 40, y: 36, size: "sm", stop: 2 },
    { id: "projects", label: "Builds", hint: "What shipped", Icon: Boxes, x: 54, y: 20, size: "lg", stop: 3 },
    { id: "research", label: "Inquiry", hint: "Research", Icon: Microscope, x: 70, y: 30, size: "md", stop: 4 },
    { id: "experience", label: "Path", hint: "Roles & clubs", Icon: Route, x: 84, y: 48, size: "md", stop: 5 },
    { id: "awards", label: "Marks", hint: "Awards", Icon: Trophy, x: 70, y: 68, size: "sm", stop: 6 },
    { id: "volunteering", label: "Beyond", hint: "Outside code", Icon: Heart, x: 48, y: 82, size: "sm", stop: 7 },
];

const sizeMap = {
    sm: "h-14 w-14 sm:h-16 sm:w-16",
    md: "h-[4.5rem] w-[4.5rem] sm:h-[5.5rem] sm:w-[5.5rem]",
    lg: "h-[5.5rem] w-[5.5rem] sm:h-28 sm:w-28",
};

/** Smooth cubic through waypoints (Start → islands) */
function pathThrough(points: { x: number; y: number }[]) {
    if (points.length < 2) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i === 0 ? i : i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] ?? p2;
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;
        d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x} ${p2.y}`;
    }
    return d;
}

function travelTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function WorldPath() {
    const ref = useRef<HTMLElement>(null);
    const headerInView = useInView(ref, { once: true, margin: "30% 0px", amount: 0.2 });
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 40, damping: 18 });
    const sy = useSpring(my, { stiffness: 40, damping: 18 });

    const farX = useTransform(sx, [-1, 1], [18, -18]);
    const farY = useTransform(sy, [-1, 1], [12, -12]);
    const midX = useTransform(sx, [-1, 1], [10, -10]);
    const midY = useTransform(sy, [-1, 1], [8, -8]);
    const nearX = useTransform(sx, [-1, 1], [-6, 6]);
    const nearY = useTransform(sy, [-1, 1], [-5, 5]);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const worldY = useTransform(scrollYProgress, [0, 1], [28, -28]);

    const pathD = useMemo(
        () => pathThrough([START, ...destinations.map((d) => ({ x: d.x, y: d.y }))]),
        []
    );

    return (
        <section
            ref={ref}
            id="world"
            className="relative min-h-[92vh] overflow-hidden px-4 sm:px-6 py-16 sm:py-20 section-calm section-calm-meadow"
            onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
                my.set(((e.clientY - r.top) / r.height) * 2 - 1);
            }}
            onMouseLeave={() => {
                mx.set(0);
                my.set(0);
            }}
        >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(167,243,208,0.55)_0%,rgba(209,250,229,0.35)_32%,rgba(240,253,244,0.2)_58%,transparent_100%)]" />
            <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_85%_75%,rgba(16,185,129,0.22),transparent_42%),radial-gradient(circle_at_12%_85%,rgba(125,211,252,0.18),transparent_38%)]" />
            <SectionFX tone="map" rails="map" />

            <motion.div style={{ x: farX, y: farY }} className="pointer-events-none absolute inset-0">
                {[
                    { t: "8%", l: "14%", s: 56 },
                    { t: "14%", l: "78%", s: 72 },
                ].map((rock, i) => (
                    <div
                        key={i}
                        className="absolute rounded-[42%] bg-gradient-to-br from-emerald-200/40 to-slate-200/30 border border-white/50"
                        style={{ top: rock.t, left: rock.l, width: rock.s, height: rock.s * 0.7 }}
                    />
                ))}
            </motion.div>

            <motion.div style={{ x: midX, y: midY }} className="pointer-events-none absolute inset-0">
                {[0, 1, 2].map((i) => (
                    <span
                        key={`mote-${i}`}
                        className="absolute rounded-full bg-white/50"
                        style={{
                            width: 5 + (i % 2) * 2,
                            height: 5 + (i % 2) * 2,
                            top: `${22 + i * 18}%`,
                            left: `${18 + i * 22}%`,
                            opacity: 0.55,
                        }}
                    />
                ))}
            </motion.div>

            <motion.div style={{ y: worldY }} className="relative z-10 mx-auto max-w-6xl">
                <div className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0.55, y: 24 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0.55, y: 16 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-flex items-center gap-2 text-[#047857] text-xs font-bold tracking-[0.28em] uppercase mb-3"
                    >
                        <Compass size={13} /> Expedition Map
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0.55, y: 36 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0.55, y: 24 }}
                        transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-3"
                    >
                        Chart the expedition
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0.55, y: 20 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 12 }}
                        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-slate-600 text-sm sm:text-base"
                    >
                        Seven stops. One path. Click any island to jump there.
                    </motion.p>
                </div>

                <motion.div
                    style={{ x: nearX, y: nearY }}
                    className="relative mx-auto h-[580px] sm:h-[640px] w-full max-w-5xl rounded-[2rem] border border-emerald-200/70 bg-gradient-to-b from-white/50 via-emerald-50/30 to-emerald-100/20 shadow-[0_30px_80px_rgba(16,185,129,0.14)] overflow-hidden"
                >
                    <svg
                        className="absolute inset-0 h-full w-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden
                    >
                        {/* Full track always visible so segments never look disconnected */}
                        <path
                            d={pathD}
                            fill="none"
                            stroke="rgba(4,120,87,0.18)"
                            strokeWidth="1.35"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="2.4 1.6"
                            vectorEffect="non-scaling-stroke"
                        />
                        <motion.path
                            d={pathD}
                            fill="none"
                            stroke="rgba(16,185,129,0.8)"
                            strokeWidth="0.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                            initial={{ pathLength: 0 }}
                            animate={headerInView ? { pathLength: 1 } : { pathLength: 0.15 }}
                            transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
                        />
                    </svg>

                    {/* Start: center sits on path head */}
                    <motion.div
                        className="absolute z-40"
                        style={{ left: `${START.x}%`, top: `${START.y}%` }}
                        initial={{ scale: 0.7, opacity: 0.55 }}
                        animate={headerInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.75 }}
                        transition={{ delay: 0.05, type: "spring", stiffness: 260, damping: 16 }}
                    >
                        <div className="-translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full bg-slate-900 text-white px-3.5 py-1.5 text-[11px] font-bold shadow-[0_8px_24px_rgba(15,23,42,0.35)] whitespace-nowrap ring-2 ring-white/80">
                            <MapPinned size={12} className="text-[#34d399] shrink-0" />
                            Start
                        </div>
                    </motion.div>

                    {destinations.map((d, i) => {
                        const Icon = d.Icon;
                        return (
                            <motion.button
                                key={d.id}
                                type="button"
                                onClick={() => travelTo(d.id)}
                                className="absolute z-30 group"
                                style={{ left: `${d.x}%`, top: `${d.y}%` }}
                                initial={{ opacity: 0.55, scale: 0.86 }}
                                animate={headerInView ? { opacity: 1, scale: 1 } : { opacity: 0.7, scale: 0.94 }}
                                transition={{
                                    delay: 0.1 + i * 0.06,
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 16,
                                }}
                                whileHover={{ scale: 1.06, y: -6 }}
                                whileTap={{ scale: 0.96 }}
                            >
                                {/* Icon center == path point; labels hang below without shifting the path */}
                                <div className="-translate-x-1/2 -translate-y-1/2 relative flex flex-col items-center">
                                    <span className="absolute -top-2 -left-2 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-[#10b981] text-[10px] font-extrabold text-white shadow-md pointer-events-none">
                                        {d.stop}
                                    </span>

                                    <div
                                        className={`relative calm-card ${sizeMap[d.size]} rounded-[1.4rem] border border-white bg-white/95 shadow-[0_14px_40px_rgba(15,23,42,0.12)] flex items-center justify-center overflow-hidden`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent" />
                                        <Icon
                                            size={d.size === "lg" ? 28 : d.size === "md" ? 22 : 18}
                                            className="relative z-10 text-[#059669]"
                                        />
                                    </div>

                                    <div className="mt-2 text-center min-w-[88px] pointer-events-none">
                                        <p className="text-sm font-extrabold text-slate-900">{d.label}</p>
                                        <p className="text-[11px] font-medium text-slate-500 group-hover:text-[#059669] transition-colors">
                                            {d.hint}
                                        </p>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}

                    <motion.div
                        className="pointer-events-none absolute -right-8 top-4 h-48 w-48 rounded-full border-[14px] border-emerald-300/20"
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="pointer-events-none absolute left-5 bottom-4 text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-800/35">
                        World 01 · Portfolio
                    </div>
                </motion.div>

                <p className="mt-5 text-center text-xs text-slate-400">
                    Hover to lift · click to travel
                </p>
            </motion.div>
        </section>
    );
}
