"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    BusFront,
    Sprout,
    SearchCode,
    Cpu,
    Bus,
    FlaskConical,
    Brain,
    Bot,
} from "lucide-react";
import ProjectCard, { type ProjectCardProps } from "./ProjectCard";

/* ── Data ─────────────────────────────────────────────── */

const flagshipProjects: ProjectCardProps[] = [
    {
        title: "Ashland Public Transit",
        role: "Lead Full-Stack Developer · Senior Thesis",
        category: "Full-Stack",
        categoryIcon: <Bus size={11} />,
        tagline: "Distributed Fleet Management for Rural Transit",
        description:
            "End-to-end MERN-stack system for Ashland's public transit network — real-time bus tracking via Leaflet, QR-code ticketing, and a dispatcher dashboard that gives operators full fleet visibility.",
        keyFeature:
            "Built a Dynamic Fare Engine and server-side Capacity Check to prevent overbooking, with live seat-count enforced at booking time.",
        technicalImpact:
            "Replaced a fully manual dispatch process; real-time tracking reduced missed stops and enabled live rider-count enforcement across the fleet.",
        tags: ["React", "Node.js", "MongoDB", "Leaflet", "QR Ticketing", "Express"],
        accent: "emerald",
        projectIcon: <BusFront size={18} />,
        isFlagship: true,
        githubUrl: "https://github.com/dhruvalanandkar",
    },
    {
        title: "AgriScience",
        role: "Research Lead · URCA Symposium Presenter",
        category: "IoT & AI",
        categoryIcon: <FlaskConical size={11} />,
        tagline: "IoT Soil Health Monitoring with ML",
        description:
            "Deployed NodeMCU (ESP8266) sensors across soil beds, streaming pH, moisture, and temperature to Firebase in real time. A Random Forest Classifier analyses the readings and triggers automated irrigation.",
        keyFeature:
            "Automated irrigation control based on real-time soil moisture thresholds — zero manual intervention once calibrated.",
        technicalImpact:
            "94% classifier accuracy on lab dataset; TensorFlow model for plant-disease detection integrated from camera feed.",
        tags: ["NodeMCU", "ESP8266", "Firebase", "TensorFlow", "Random Forest", "Python"],
        accent: "emerald",
        projectIcon: <Sprout size={18} />,
        isFlagship: true,
        githubUrl: "https://github.com/dhruvalanandkar",
    },
];

const standardProjects: ProjectCardProps[] = [
    {
        title: "JobGenie AI",
        role: "Lead Developer · FastAPI + OpenAI",
        category: "AI / ML",
        categoryIcon: <Brain size={11} />,
        tagline: "LLM-Powered Resume-to-Job Matching",
        description:
            "Platform that embeds resumes and job descriptions using OpenAI Embeddings, then uses cosine similarity via LangChain to surface the best-fit roles and auto-generate tailored cover letters.",
        keyFeature:
            "Automated Skill Gap Analysis dashboard — shows exactly which skills to learn for each role.",
        technicalImpact:
            "Reduced manual job-search research time by ~70%; LangChain pipeline processes a full resume-JD pair in under 3 seconds.",
        tags: ["Python", "FastAPI", "LangChain", "OpenAI", "MongoDB Atlas", "Recharts"],
        accent: "emerald",
        projectIcon: <SearchCode size={18} />,
        isLive: true,
        githubUrl: "https://github.com/dhruvalanandkar",
        liveUrl: "https://job-genie-ai.vercel.app",
    },
    {
        title: "CortexLab",
        role: "Backend Architect · FastAPI + LangGraph",
        category: "AI Research",
        categoryIcon: <Bot size={11} />,
        tagline: "Multi-Agent AI Research Assistant",
        description:
            "Built for Google FalconHack. An autonomous multi-agent system powered by LangGraph and Gemini API that scans academic literature, identifies research gaps, and generates publication-ready paper drafts.",
        keyFeature:
            "Planner → Researcher → Writer pipeline exports structured .docx paper drafts with citation formatting.",
        technicalImpact:
            "Reduced literature-to-draft time from days to under 15 minutes; LangGraph state machine handles dynamic replanning on dead ends.",
        tags: ["FastAPI", "LangGraph", "Gemini API", "PostgreSQL", "Python"],
        accent: "emerald",
        projectIcon: <Cpu size={18} />,
        githubUrl: "https://github.com/dhruvalanandkar",
    },
];

/* ── Divider ──────────────────────────────────────────── */
function Divider({ label, icon }: { label: string; icon: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <span className="text-slate-300">{icon}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</span>
            <div className="flex-1 h-px bg-slate-100" />
        </div>
    );
}

/* ── Section ──────────────────────────────────────────── */
export default function Projects() {
    const headerRef = useRef(null);
    const isInView = useInView(headerRef, { once: true, margin: "-60px" });

    return (
        <section id="projects" className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <div ref={headerRef}>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-[#10b981] text-sm font-semibold tracking-widest uppercase mb-3"
                    >
                        Case Studies
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.06 }}
                        className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4"
                    >
                        Featured Projects
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.11 }}
                        className="text-slate-500 text-lg max-w-lg mb-16"
                    >
                        Each project is a case study — built with intent, measured by impact.
                    </motion.p>
                </div>

                {/* Flagship */}
                <Divider label="Flagship Projects" icon={<FlaskConical size={13} />} />
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    {flagshipProjects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 44 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.65, delay: 0.17 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full"
                        >
                            <ProjectCard {...project} />
                        </motion.div>
                    ))}
                </div>

                {/* AI / Engineering */}
                <Divider label="AI / Engineering" icon={<Brain size={13} />} />
                <div className="grid md:grid-cols-2 gap-6">
                    {standardProjects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 44 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.65, delay: 0.42 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full"
                        >
                            <ProjectCard {...project} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
