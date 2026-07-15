"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
    BusFront,
    Sprout,
    SearchCode,
    Cpu,
    Bus,
    FlaskConical,
    Brain,
    Bot,
    Target,
    CloudCog,
    Newspaper,
    PhoneCall,
    Accessibility,
    Globe2,
    Users,
    ChevronDown,
    Github,
    ExternalLink,
} from "lucide-react";
import ProjectCard, { type ProjectCardProps } from "./ProjectCard";
import SectionFX from "./SectionFX";

/* ── Data ─────────────────────────────────────────────── */

const flagshipProjects: ProjectCardProps[] = [
    {
        title: "Ashland Public Transit",
        role: "Lead Full-Stack Developer · Senior Thesis",
        category: "Full-Stack",
        categoryIcon: <Bus size={11} />,
        tagline: "Fleet management for rural transit",
        description:
            "End-to-end MERN-stack system for Ashland's public transit network: real-time bus tracking via Leaflet, QR-code ticketing, and a dispatcher dashboard for fleet visibility.",
        keyFeature:
            "Dynamic Fare Engine and server-side Capacity Check to prevent overbooking, with live seat-count enforced at booking time.",
        technicalImpact:
            "Helped move dispatch off fully manual workflows so riders and operators share the same live picture of the fleet.",
        tags: ["React", "Node.js", "MongoDB", "Leaflet", "QR Ticketing", "Express"],
        accent: "emerald",
        projectIcon: <BusFront size={18} />,
        isFlagship: true,
        githubUrl: "https://github.com/DhruvalAnandkar/Ashland-Public-Transit",
    },
    {
        title: "AgriScience",
        role: "Research Lead · URCA Symposium Presenter",
        category: "IoT & AI",
        categoryIcon: <FlaskConical size={11} />,
        tagline: "IoT soil health monitoring with ML",
        description:
            "NodeMCU (ESP8266) sensors across soil beds stream pH, moisture, and temperature to Firebase. A Random Forest Classifier analyses the readings and can trigger irrigation.",
        keyFeature:
            "Automated irrigation based on real-time soil moisture thresholds once the system is calibrated.",
        technicalImpact:
            "94% classifier accuracy on the lab dataset; TensorFlow plant-disease detection wired in from a camera feed.",
        tags: ["NodeMCU", "ESP8266", "Firebase", "TensorFlow", "Random Forest", "Python"],
        accent: "emerald",
        projectIcon: <Sprout size={18} />,
        isFlagship: true,
        githubUrl: "https://github.com/DhruvalAnandkar/AgriScience",
    },
];

const moreProjects: ProjectCardProps[] = [
    {
        title: "Axiom: Precision Athletics",
        role: "Hackathon · Physics Engine + LangGraph Coach",
        category: "AI / Systems",
        categoryIcon: <Target size={11} />,
        tagline: "Real-time shot geometry with an AI coach that explains the math",
        description:
            "Stop scrolling for generic pool tips. Axiom overlays the exact, invisible geometry of your shot in real time. Ghost ball, cut angle, and aim vectors come from a deterministic Python physics engine; an optional LangGraph coach narrates the shot and flags risk.",
        keyFeature:
            "Click-to-aim table, OpenCV.js camera aiming (beta), PWA shell, JWT auth with per-user shot stats.",
        technicalImpact:
            "LLMs never compute physics. Geometry stays in Python; the AI layer only narrates and assesses risk.",
        tags: ["React 19", "Vite", "FastAPI", "LangGraph", "Socket.io", "Docker Compose"],
        accent: "emerald",
        projectIcon: <Target size={18} />,
        badge: "Hackathon",
        githubUrl: "https://github.com/DhruvalAnandkar/axiom-core",
        devpostUrl: "https://devpost.com/DhruvalAnandkar",
    },
    {
        title: "JobGenie AI",
        role: "Lead Developer · FastAPI + OpenAI",
        category: "AI / ML",
        categoryIcon: <Brain size={11} />,
        tagline: "Resume-to-job matching with embeddings",
        description:
            "Embeds resumes and job descriptions with OpenAI, then uses cosine similarity via LangChain to surface fit roles and draft cover letters.",
        keyFeature: "Skill gap analysis dashboard for each role.",
        technicalImpact:
            "LangChain pipeline handles a full resume-JD pair in under a few seconds.",
        tags: ["Python", "FastAPI", "LangChain", "OpenAI", "MongoDB Atlas"],
        accent: "emerald",
        projectIcon: <SearchCode size={18} />,
        isLive: true,
        githubUrl: "https://github.com/DhruvalAnandkar/JobGenie-AI",
        liveUrl: "https://job-genie-ai.vercel.app",
    },
    {
        title: "CortexLab",
        role: "Hackathon · FastAPI + LangGraph · FalconHack",
        category: "AI Research",
        categoryIcon: <Bot size={11} />,
        tagline: "From research idea to publishable draft in days, not months",
        description:
            "Built for Google FalconHack with Aniket Patel, Damien, and Dominic. LangGraph + Gemini agents scan literature, uncover research gaps, design experiments, and draft structured academic papers.",
        keyFeature: "Planner → Researcher → Writer pipeline with citation-aware .docx export.",
        technicalImpact:
            "Multi-agent LangGraph state machine can replan when a research path dead-ends.",
        tags: ["FastAPI", "LangGraph", "Gemini API", "PostgreSQL", "Python"],
        accent: "emerald",
        projectIcon: <Cpu size={18} />,
        badge: "Hackathon",
        githubUrl: "https://github.com/DhruvalAnandkar/CortexLab",
        devpostUrl: "https://devpost.com/software/cortexlab",
    },
    {
        title: "Vajra-MLOps",
        role: "MLOps · Cloud-native pipeline",
        category: "MLOps",
        categoryIcon: <CloudCog size={11} />,
        tagline: "Self-healing load-forecasting pipeline",
        description:
            "Streams server telemetry via FastAPI and Redpanda, stores metrics in TimescaleDB, forecasts with XGBoost, and watches for drift with KS tests.",
        keyFeature:
            "LangGraph SRE agent can train a challenger model and redeploy when accuracy slips.",
        technicalImpact:
            "Local Docker to managed cloud via DSN injection; statistical gates keep SRE decisions grounded.",
        tags: ["FastAPI", "Redpanda", "TimescaleDB", "XGBoost", "LangGraph"],
        accent: "emerald",
        projectIcon: <CloudCog size={18} />,
        isLive: true,
        githubUrl: "https://github.com/DhruvalAnandkar/Vajra-MLOps",
        liveUrl: "https://vajra-ml-ops.vercel.app/",
    },
    {
        title: "ARIA",
        role: "Hackathon · Kent Hack Enough 2026 · with Aniket Patel",
        category: "Accessibility",
        categoryIcon: <Users size={11} />,
        tagline: "Voice for signers · spatial awareness for blind users",
        description:
            "ARIA gives voice to signers and spatial awareness to blind users: real-time ASL + emotion to expressive speech; local obstacle detection + spoken walking directions. Edge AI on Jetson & phone.",
        keyFeature:
            "SIGN mode via ElevenLabs; GUIDE mode with Maps directions; vision fallback chain (Gemini → OpenAI → Claude → YOLOv8).",
        technicalImpact:
            "AI runs on the Jetson Orin Nano; Expo client + FastAPI keep the edge loop tight.",
        tags: ["Python", "FastAPI", "React Native", "Expo", "Jetson", "ElevenLabs"],
        accent: "emerald",
        projectIcon: <Accessibility size={18} />,
        badge: "Hackathon",
        githubUrl: "https://github.com/DhruvalAnandkar/ARIA1",
        liveUrl: "https://aria-1-chi.vercel.app",
        devpostUrl: "https://devpost.com/DhruvalAnandkar",
    },
    {
        title: "AgriScience Web",
        role: "Team project with Aniket Patel",
        category: "Full-Stack / ML",
        categoryIcon: <Users size={11} />,
        tagline: "Crop recommendations and disease detection UI",
        description:
            "Team web app (fork of Aniket25042003/AgriScience-Web), separate from the IoT research repo. FastAPI backend + React/Tailwind frontend with Firebase auth.",
        keyFeature:
            "Crop recommendation form (N/P/K, weather, pH) and leaf image disease detection.",
        technicalImpact:
            "API includes POST /recommend_crops and POST /detect_disease, with a backend test script.",
        tags: ["TypeScript", "React", "Tailwind CSS", "FastAPI", "TensorFlow", "Firebase"],
        accent: "emerald",
        projectIcon: <Globe2 size={18} />,
        isLive: true,
        githubUrl: "https://github.com/DhruvalAnandkar/AgriScience-Web",
        liveUrl: "https://agriscience.vercel.app",
    },
    {
        title: "News Bias Aggregator",
        role: "Front-End",
        category: "Web App",
        categoryIcon: <Newspaper size={11} />,
        tagline: "Bias spectrum visualization",
        description:
            "Paste a news URL or snippet. The UI averages simulated bias/reliability scores and plots them on a political spectrum.",
        keyFeature: "URL or text input with an interactive spectrum display.",
        technicalImpact:
            "Scores are simulated for visualization today; live bias APIs are still planned.",
        tags: ["JavaScript", "React", "Vercel"],
        accent: "emerald",
        projectIcon: <Newspaper size={18} />,
        isLive: true,
        githubUrl: "https://github.com/DhruvalAnandkar/News-Bias-Aggregator",
        liveUrl: "https://news-bias-aggregator.vercel.app/",
    },
    {
        title: "Vapi Outbound Campaign",
        role: "Node.js · Voice AI",
        category: "Voice AI",
        categoryIcon: <PhoneCall size={11} />,
        tagline: "After-hours outreach with Vapi assistants",
        description:
            "Express app that schedules Vapi outbound calls from a JSON business list, aimed at local Ashland service businesses after hours.",
        keyFeature:
            "A/B testing across two assistant personas with a 7-minute delay between calls.",
        technicalImpact:
            "Campaign kicks off at /api/start-campaign; ready to deploy on Render with Vapi env vars.",
        tags: ["JavaScript", "Node.js", "Express", "Vapi"],
        accent: "emerald",
        projectIcon: <PhoneCall size={18} />,
        githubUrl: "https://github.com/DhruvalAnandkar/Vapi-Outbound-Campaign",
    },
];

/* ── Accordion row ────────────────────────────────────── */
function ProjectAccordionItem({
    project,
    open,
    onToggle,
}: {
    project: ProjectCardProps;
    open: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.div
            layout
            whileHover={open ? undefined : { y: -2 }}
            className={`calm-card elite-surface rounded-2xl border overflow-hidden transition-colors duration-300 ${
                open
                    ? "border-emerald-200 bg-white shadow-lg shadow-emerald-50/80"
                    : "border-slate-100 bg-white/70 hover:border-emerald-100 hover:bg-white"
            }`}
        >
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 text-left"
            >
                <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                        open ? "bg-emerald-50 text-[#10b981]" : "bg-slate-100 text-slate-500"
                    }`}
                >
                    {project.projectIcon}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <h3 className="font-extrabold text-slate-900 text-sm sm:text-base truncate">
                            {project.title}
                        </h3>
                        {project.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#059669] border border-emerald-100">
                                {project.badge}
                            </span>
                        )}
                        {project.isLive && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#10b981]">
                                Live
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-slate-400 truncate">{project.tagline}</p>
                </div>
                <div className="hidden sm:flex flex-wrap gap-1.5 max-w-[220px] justify-end">
                    {project.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-50 text-slate-500"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-slate-400 shrink-0"
                >
                    <ChevronDown size={18} />
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <motion.div
                            initial={{ y: -8, filter: "blur(6px)" }}
                            animate={{ y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.35, delay: 0.05 }}
                            className="px-4 sm:px-5 pb-5 pt-0 border-t border-slate-50"
                        >
                            <p className="text-xs text-[#10b981] font-semibold mt-4 mb-2">{project.role}</p>
                            <p className="text-sm text-slate-500 leading-relaxed mb-4">{project.description}</p>

                            <div className="grid sm:grid-cols-2 gap-3 mb-4">
                                <div className="rounded-xl bg-emerald-50 px-3.5 py-3">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#10b981] mb-1">
                                        Technical Impact
                                    </p>
                                    <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                                        {project.technicalImpact}
                                    </p>
                                </div>
                                <div className="rounded-xl bg-slate-50 px-3.5 py-3">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                        Key Feature
                                    </p>
                                    <p className="text-xs text-slate-600 leading-relaxed">{project.keyFeature}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="fx-tag px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    {project.liveUrl ? (
                                        <>
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold hover:border-slate-300 hover:text-slate-900 transition-all"
                                                >
                                                    <Github size={13} /> GitHub
                                                </a>
                                            )}
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-[#10b981] transition-colors"
                                            >
                                                <ExternalLink size={13} /> Live Demo
                                            </a>
                                        </>
                                    ) : (
                                        project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-[#10b981] transition-colors"
                                            >
                                                <ExternalLink size={13} /> View Project
                                            </a>
                                        )
                                    )}
                                </div>
                                {project.devpostUrl && (
                                    <a
                                        href={project.devpostUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-emerald-100 bg-emerald-50/70 text-[#059669] text-xs font-bold hover:bg-emerald-50 transition-colors"
                                    >
                                        View on Devpost ↗
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ── Section ──────────────────────────────────────────── */
export default function Projects() {
    const headerRef = useRef(null);
    const isInView = useInView(headerRef, { once: true, margin: "30% 0px" });
    const [openTitle, setOpenTitle] = useState<string | null>("Axiom: Precision Athletics");

    return (
        <section id="projects" className="section-y px-6 relative overflow-hidden section-calm section-calm-mist">
            <SectionFX tone="mist" rails="compact" />
            <div className="max-w-6xl mx-auto relative z-10">
                <div ref={headerRef}>
                    <motion.p
                        initial={{ opacity: 0.55, y: 28 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.55, y: 20 }}
                        transition={{ duration: 0.5 }}
                        className="text-[#10b981] text-sm font-semibold tracking-widest uppercase mb-3"
                    >
                        Builds
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0.55, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.55, y: 28 }}
                        transition={{ duration: 0.55, delay: 0.04 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3"
                    >
                        Work that moved the needle
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0.55, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 16 }}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className="text-slate-500 text-base sm:text-lg max-w-lg mb-10"
                    >
                        Flagship systems up top. Open anything else when you want the deep dive.
                    </motion.p>
                </div>

                <div className="flex items-center gap-3 mb-5">
                    <FlaskConical size={13} className="text-slate-300" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Flagship
                    </span>
                    <div className="flex-1 h-px bg-slate-100" />
                </div>

                <div className="grid md:grid-cols-2 gap-5 mb-10">
                    {flagshipProjects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0.55, y: 40, scale: 0.96 }}
                            animate={
                                isInView
                                    ? { opacity: 1, y: 0, scale: 1 }
                                    : { opacity: 0.6, y: 28, scale: 0.97 }
                            }
                            transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full"
                        >
                            <ProjectCard {...project} />
                        </motion.div>
                    ))}
                </div>

                <div className="flex items-center gap-3 mb-5">
                    <Brain size={13} className="text-slate-300" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        More projects
                    </span>
                    <div className="flex-1 h-px bg-slate-100" />
                    <a
                        href="https://devpost.com/DhruvalAnandkar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-[#059669] hover:text-[#10b981] transition-colors shrink-0"
                    >
                        Devpost gallery ↗
                    </a>
                </div>

                <div className="space-y-2.5">
                    {moreProjects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 1, y: 8 }}
                            animate={{ opacity: 1, y: isInView ? 0 : 8 }}
                            transition={{ duration: 0.4, delay: 0.2 + i * 0.04 }}
                        >
                            <ProjectAccordionItem
                                project={project}
                                open={openTitle === project.title}
                                onToggle={() =>
                                    setOpenTitle((cur) => (cur === project.title ? null : project.title))
                                }
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
