"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

/* ── Magnetic Button ─────────────────────────────────────── */
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
        // Only pull within 60px radius
        const dist = Math.hypot(dx, dy);
        if (dist < 60) {
            x.set(dx * 0.35);
            y.set(dy * 0.35);
        }
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            download={download}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ x: springX, y: springY }}
            className={`
        inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold
        transition-colors duration-250 cursor-pointer select-none
        ${variant === "primary"
                    ? "bg-slate-900 text-white hover:bg-[#10b981] shadow-lg shadow-slate-900/20 hover:shadow-[0_8px_30px_rgba(16,185,129,0.3)]"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-[#10b981] hover:text-[#10b981] shadow-sm"
                }
      `}
        >
            {children}
        </motion.a>
    );
}

/* ── Word Reveal animation (Apple-style stagger) ─────────── */
function WordReveal({ text, className }: { text: string; className?: string }) {
    const words = text.split(" ");
    const containerRef = useRef(null);

    return (
        <span className={`inline-flex flex-wrap gap-x-[0.3em] ${className ?? ""}`}>
            {words.map((word, i) => (
                <motion.span
                    key={`${word}-${i}`}
                    ref={i === 0 ? containerRef : undefined}
                    initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.65,
                        delay: 0.1 + i * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
}

/* ── Typewriter ─────────────────────────────────────────── */
const roles = [
    "Data Engineer",
    "Full-Stack Developer",
    "BI Specialist",
    "AI / ML Engineer",
    "Software Engineer",
];

function Typewriter({ words }: { words: string[] }) {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = words[index % words.length];
        const speed = deleting ? 38 : 68;
        const waitMs = !deleting && text === current ? 1800 : 0;
        const timer = setTimeout(() => {
            if (!deleting && text === current) {
                setDeleting(true);
            } else if (deleting && text === "") {
                setDeleting(false);
                setIndex((i) => (i + 1) % words.length);
            } else {
                setText((t) => (deleting ? t.slice(0, -1) : current.slice(0, t.length + 1)));
            }
        }, waitMs || speed);
        return () => clearTimeout(timer);
    }, [text, deleting, index, words]);

    return (
        <span className="text-[#10b981] font-semibold">
            {text}
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
            >|</motion.span>
        </span>
    );
}

/* ── Stats ───────────────────────────────────────────────── */
const stats = [
    { value: "3+", label: "Years Building" },
    { value: "4", label: "Major Projects" },
    { value: "2", label: "Research Projects" },
    { value: "GPA 3.7", label: "CS Honors" },
];

/* ── Hero ────────────────────────────────────────────────── */
export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-36 pb-28 text-center overflow-hidden"
        >
            {/* Live Availability badge */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="relative inline-flex items-center gap-2.5 mb-10 px-5 py-2.5 rounded-full bg-white shadow-sm border border-slate-100"
            >
                {/* Pulsing emerald ring */}
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#10b981]" />
                </span>
                <span className="text-xs font-bold text-slate-700 tracking-wide">
                    Open to Full-Time Roles &mdash; Dec 2026 Grad
                </span>
            </motion.div>

            {/* Main headline — word-by-word reveal */}
            <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tight leading-none mb-4 max-w-4xl">
                <span className="block text-slate-300 text-3xl sm:text-4xl font-light tracking-normal mb-3">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.12 }}
                    >
                        Hi, I&apos;m
                    </motion.span>
                </span>
                <WordReveal text="Dhruval Anandkar." className="text-slate-900" />
            </h1>

            {/* Typewriter sub-headline */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.48 }}
                className="text-xl sm:text-2xl text-slate-500 mb-5 font-medium"
            >
                CS (Honors) @ Ashland &nbsp;·&nbsp; <Typewriter words={roles} />
            </motion.p>

            {/* Serif quote */}
            <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.56 }}
                className="font-serif-display text-lg sm:text-xl italic text-slate-400 mb-14 max-w-md leading-relaxed"
            >
                &ldquo;The best technology is invisible — it just works.&rdquo;
            </motion.p>

            {/* CTAs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.64 }}
                className="flex flex-col sm:flex-row gap-3 mb-24"
            >
                <MagneticButton href="#projects" variant="primary">
                    View My Work <ArrowRight size={15} />
                </MagneticButton>
                <MagneticButton href="/resume.pdf" variant="ghost" download>
                    <Download size={14} /> Download Resume
                </MagneticButton>
            </motion.div>

            {/* Stats strip */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.74 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-px w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-100 bg-slate-100 shadow-sm"
            >
                {stats.map(({ value, label }) => (
                    <div
                        key={label}
                        className="flex flex-col items-center py-5 px-4 bg-white hover:bg-slate-50 transition-colors duration-200"
                    >
                        <span className="text-xl font-extrabold text-slate-900">{value}</span>
                        <span className="text-xs text-slate-400 mt-0.5 text-center">{label}</span>
                    </div>
                ))}
            </motion.div>

            {/* Scroll cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
            >
                <span className="text-[10px] text-slate-300 tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 7, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-8 bg-gradient-to-b from-slate-200 to-transparent"
                />
            </motion.div>
        </section>
    );
}
