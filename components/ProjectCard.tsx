"use client";

import { useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { ExternalLink, Github, TrendingUp, Sparkles } from "lucide-react";

export type AccentColor = "emerald";

export interface ProjectCardProps {
    title: string;
    role: string;
    category: string;
    categoryIcon: React.ReactNode;
    tagline: string;
    description: string;
    keyFeature: string;
    technicalImpact: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
    accent: AccentColor;
    /** Lucide icon element — no emoji */
    projectIcon: React.ReactNode;
    isLive?: boolean;
    isFlagship?: boolean;
}

/* ── 3-D Parallax Wrapper ──────────────────────────────────
   Mouse position drives rotateX / rotateY via useTransform.
   Spring damping gives the "physical card" feel.             */
function ParallaxCard({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const scaleVal = useMotionValue(1);

    const springConfig = { stiffness: 200, damping: 22, mass: 0.6 };
    const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), springConfig);
    const scale = useSpring(scaleVal, { stiffness: 250, damping: 22 });

    const [glowing, setGlowing] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        rawX.set((e.clientX - rect.left) / rect.width - 0.5);
        rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <div className="perspective" ref={ref}>
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => { scaleVal.set(1.02); setGlowing(true); }}
                onMouseLeave={() => { rawX.set(0); rawY.set(0); scaleVal.set(1); setGlowing(false); }}
                style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
                className={`${className ?? ""} transition-shadow duration-300 ${glowing
                        ? "shadow-[0_0_0_1.5px_rgba(16,185,129,0.45),0_20px_60px_rgba(0,0,0,0.10)]"
                        : "shadow-[0_2px_8px_rgba(0,0,0,0.04),0_16px_40px_rgba(0,0,0,0.06)]"
                    }`}
            >
                {children}
            </motion.div>
        </div>
    );
}

/* ── Card ────────────────────────────────────────────────── */
export default function ProjectCard(props: ProjectCardProps) {
    const {
        title,
        role,
        category,
        categoryIcon,
        tagline,
        description,
        keyFeature,
        technicalImpact,
        tags,
        githubUrl,
        liveUrl,
        projectIcon,
        isLive,
    } = props;

    return (
        <ParallaxCard className="glass rounded-3xl overflow-hidden flex flex-col h-full bg-white/80 backdrop-blur-xl">
            {/* Emerald top bar */}
            <div className="h-[3px] w-full bg-gradient-to-r from-[#10b981] to-[#34d399] shrink-0" />

            <div className="flex flex-col flex-1 p-6 sm:p-7">
                {/* Row 1: Icon + Category + Live */}
                <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                        {/* Project icon — Lucide, slate-500 at rest */}
                        <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 group-hover:text-[#10b981] transition-colors duration-200">
                            {projectIcon}
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                            {categoryIcon}
                            {category}
                        </span>
                    </div>
                    {isLive && (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-[#10b981] text-xs font-bold shrink-0">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-70" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                            </span>
                            Live
                        </span>
                    )}
                </div>

                {/* Title + Role */}
                <h3 className="text-lg font-extrabold text-slate-900 leading-tight mb-0.5">{title}</h3>
                <p className="text-xs text-slate-400 font-medium mb-1.5">{role}</p>
                <p className="text-sm font-semibold text-[#10b981] mb-4">{tagline}</p>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{description}</p>

                {/* Technical Impact */}
                <div className="rounded-xl bg-emerald-50 px-4 py-3 mb-3">
                    <div className="flex items-start gap-2">
                        <TrendingUp size={13} className="text-[#10b981] mt-0.5 shrink-0" />
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#10b981] mb-0.5">
                                Technical Impact
                            </p>
                            <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                                {technicalImpact}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Key Feature */}
                <div className="rounded-xl bg-slate-50 px-4 py-3 mb-5">
                    <div className="flex items-start gap-2">
                        <Sparkles size={13} className="text-slate-400 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                Key Feature
                            </p>
                            <p className="text-xs text-slate-600 leading-relaxed">{keyFeature}</p>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                    {githubUrl && (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold hover:border-slate-300 hover:text-slate-900 transition-all duration-200"
                        >
                            <Github size={13} /> GitHub
                        </a>
                    )}
                    {liveUrl ? (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-[#10b981] transition-colors duration-300 shadow-sm"
                        >
                            <ExternalLink size={13} /> Live Demo
                        </a>
                    ) : (
                        githubUrl && (
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-[#10b981] transition-colors duration-300 shadow-sm"
                            >
                                <ExternalLink size={13} /> View Project
                            </a>
                        )
                    )}
                </div>
            </div>
        </ParallaxCard>
    );
}
