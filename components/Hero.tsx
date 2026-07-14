"use client";

import { useState, useEffect, useRef, memo } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useScroll,
} from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import StoryMarquee from "./StoryMarquee";
import NatureAtmosphere from "./NatureAtmosphere";
import SideMarginLife from "./SideMarginLife";
import { useSiteReady } from "./IntroExperience";

function MagneticButton({
    children,
    href,
    variant = "primary",
    download,
}: {
    children: React.ReactNode;
    href: string;
    variant?: "primary" | "ghost";
    download?: boolean;
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 280, damping: 22 });
    const springY = useSpring(y, { stiffness: 280, damping: 22 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        if (Math.hypot(dx, dy) < 80) {
            x.set(dx * 0.42);
            y.set(dy * 0.42);
        }
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            download={download}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
            style={{ x: springX, y: springY }}
            whileTap={{ scale: 0.97 }}
            className={`
        elite-magnetic inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold
        transition-colors duration-250 cursor-pointer select-none
        ${
            variant === "primary"
                ? "bg-slate-900 text-white hover:bg-[#10b981] shadow-lg shadow-slate-900/20 hover:shadow-[0_8px_30px_rgba(16,185,129,0.35)]"
                : "bg-white text-slate-700 border border-slate-200 hover:border-[#10b981] hover:text-[#10b981] shadow-sm"
        }
      `}
        >
            {children}
        </motion.a>
    );
}

/**
 * Kinetic scramble → settle.
 * Imperative rAF + memo so Typewriter ticks never remount/reset the name.
 */
const KineticName = memo(function KineticName({
    text,
    active,
}: {
    text: string;
    active: boolean;
}) {
    const wrapRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = textRef.current;
        const wrap = wrapRef.current;
        if (!el || !wrap) return;

        if (!active) {
            el.textContent = text;
            return;
        }

        const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const chars = text.split("");
        let frame = 0;
        let raf = 0;
        wrap.style.color = "#10b981";

        const tick = () => {
            frame += 1;
            let out = "";
            for (let i = 0; i < chars.length; i++) {
                const ch = chars[i];
                if (ch === " " || ch === ".") {
                    out += ch;
                    continue;
                }
                const revealAt = 3 + Math.floor(i * 1.35);
                out += frame > revealAt ? ch : glyphs[(frame * 3 + i * 7) % glyphs.length];
            }
            el.textContent = out;

            if (frame > 3 + Math.ceil(chars.length * 1.35) + 2) {
                el.textContent = text;
                wrap.style.color = "#0f172a";
                return;
            }
            raf = requestAnimationFrame(tick);
        };

        el.textContent = chars.map((ch) => (ch === " " ? " " : "·")).join("");
        raf = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(raf);
            el.textContent = text;
            wrap.style.color = "#0f172a";
        };
    }, [text, active]);

    return (
        <motion.span
            ref={wrapRef}
            className="inline-block text-[#10b981]"
            initial={{ opacity: 0, y: 18 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            aria-label={text}
        >
            <span ref={textRef}>{text}</span>
        </motion.span>
    );
});

function StatValue({ value }: { value: string }) {
    const match = value.match(/^(\d+)(.*)$/);
    const [n, setN] = useState(0);

    useEffect(() => {
        if (!match) return;
        const target = parseInt(match[1], 10);
        const start = performance.now();
        let raf = 0;
        const tick = (t: number) => {
            const p = Math.min(1, (t - start) / 1200);
            setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [value]);

    if (!match) return <>{value}</>;
    return (
        <>
            {n}
            {match[2]}
        </>
    );
}

const stats = [
    { value: "3+", label: "Years Building" },
    { value: "8+", label: "Shipped Projects" },
    { value: "2", label: "Research Projects" },
    { value: "GPA 3.7", label: "CS Honors" },
];

export default function Hero() {
    const siteReady = useSiteReady();
    const sectionRef = useRef<HTMLElement>(null);
    const skyRef = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const smx = useSpring(mx, { stiffness: 50, damping: 20 });
    const smy = useSpring(my, { stiffness: 50, damping: 20 });

    const spotX = useTransform(smx, [-1, 1], ["20%", "80%"]);
    const spotY = useTransform(smy, [-1, 1], ["20%", "70%"]);
    const spotlightBg = useTransform([spotX, spotY], ([x, y]) =>
        `radial-gradient(560px circle at ${x} ${y}, rgba(16,185,129,0.12), transparent 55%)`
    );

    /* Original hero scroll exit — keep this feel intact */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    /* Never go fully invisible — fast scroll must still show hero text */
    const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.55]);
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = (e.clientY / window.innerHeight) * 2 - 1;
            mx.set(nx);
            my.set(ny);
            const sky = skyRef.current;
            if (sky) {
                sky.style.setProperty("--mx", nx.toFixed(3));
                sky.style.setProperty("--my", ny.toFixed(3));
            }
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
    }, [mx, my]);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative min-h-[94vh] flex flex-col items-center justify-center px-6 pt-28 pb-16 text-center overflow-hidden"
        >
            <NatureAtmosphere ref={skyRef} />
            <SideMarginLife tone="meadow" />

            <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0"
                style={{ background: spotlightBg }}
            />
            {/* Soft handoff into the map — kills the hard chop */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-[2] bg-gradient-to-b from-transparent via-emerald-50/40 to-emerald-100/70"
            />

            <motion.div
                style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
                className="relative z-10 flex flex-col items-center w-full max-w-3xl lg:max-w-4xl mx-auto"
            >
                <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.94 }}
                    animate={siteReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.94 }}
                    transition={{ duration: 0.55, delay: 0.05 }}
                    className="relative inline-flex items-center gap-2.5 mb-8 px-5 py-2.5 rounded-full bg-white/90 shadow-sm border border-slate-100"
                >
                    <span className="status-ring relative flex h-2.5 w-2.5">
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#10b981]" />
                    </span>
                    <span className="text-xs font-bold text-slate-700 tracking-wide">
                        Open to Full-Time Roles · Dec 2026 Grad
                    </span>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={siteReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="text-slate-400 text-xl sm:text-2xl font-light mb-2"
                >
                    Hey, I&apos;m
                </motion.p>

                <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight leading-[1.05] mb-4">
                    <KineticName text="Dhruval Anandkar." active={siteReady} />
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={siteReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.55, delay: 0.45 }}
                    className="text-lg sm:text-xl text-slate-500 mb-4 font-medium max-w-2xl"
                >
                    CS (Honors) @ Ashland ·{" "}
                    <span className="text-[#10b981] font-semibold">Software &amp; Systems Engineer</span>
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={siteReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                    className="text-base sm:text-lg text-slate-500 mb-6 max-w-2xl leading-relaxed"
                >
                    I engineer scalable backend systems and intelligent applications that solve real-world problems.
                    From highly concurrent real-time transit platforms to autonomous AI agents, I care about
                    fault-tolerant architecture and customer-obsessed execution.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={siteReady ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.62 }}
                    className="w-full flex justify-center"
                >
                    <StoryMarquee />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={siteReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
                >
                    <MagneticButton href="#world" variant="primary">
                        Open the map <ArrowRight size={15} />
                    </MagneticButton>
                    <MagneticButton href="/resume.pdf" variant="ghost" download>
                        <Download size={14} /> Download Resume
                    </MagneticButton>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={siteReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-px w-full max-w-2xl mx-auto overflow-hidden rounded-2xl border border-slate-100 bg-slate-100 shadow-sm"
                >
                    {stats.map(({ value, label }, i) => (
                        <motion.div
                            key={label}
                            whileHover={{ backgroundColor: "rgba(236,253,245,1)", y: -2 }}
                            className="flex flex-col items-center justify-center py-4 px-3 bg-white transition-colors duration-200 min-h-[76px]"
                            initial={{ opacity: 0, y: 12 }}
                            animate={siteReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                            transition={{ delay: 0.88 + i * 0.06 }}
                        >
                            <span className="text-lg font-extrabold text-slate-900 tabular-nums leading-none">
                                {siteReady ? <StatValue value={value} /> : value}
                            </span>
                            <span className="text-[11px] text-slate-400 mt-1.5 text-center leading-tight">{label}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={siteReady ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
            >
                <span className="text-[10px] text-slate-300 tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-8 bg-gradient-to-b from-[#10b981] to-transparent"
                />
            </motion.div>
        </section>
    );
}
