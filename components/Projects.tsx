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
    Target,
    CloudCog,
    Newspaper,
    PhoneCall,
    Accessibility,
    Globe2,
    Users,
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
        githubUrl: "https://github.com/DhruvalAnandkar/Ashland-Public-Transit",
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
        githubUrl: "https://github.com/DhruvalAnandkar/AgriScience",
    },
];

const standardProjects: ProjectCardProps[] = [
    {
        title: "Axiom: Precision Athletics",
        role: "Full-Stack · Physics Engine + LangGraph Coach",
        category: "AI / Systems",
        categoryIcon: <Target size={11} />,
        tagline: "Deterministic billiards physics — LLMs never compute the numbers",
        description:
            "Billiards training platform that separates deterministic physics from AI coaching — ghost ball, cut angle, and aim vectors computed in Python (<200ms), with an optional LangGraph pipeline (Researcher → Draftsman → Critic) that narrates the shot and flags risk.",
        keyFeature:
            "Real-time click-to-aim table, camera-based aiming with OpenCV.js ball detection (beta), PWA/installable app shell, and JWT auth with per-user shot stats.",
        technicalImpact:
            "Design rule enforced in architecture: all geometry comes from Python physics; the AI layer only narrates and assesses risk — never computes angles.",
        tags: [
            "React 19",
            "Vite",
            "Tailwind CSS",
            "Node.js/Express",
            "Socket.io",
            "Python/FastAPI",
            "LangGraph",
            "Docker Compose",
        ],
        accent: "emerald",
        projectIcon: <Target size={18} />,
        githubUrl: "https://github.com/DhruvalAnandkar/axiom-core",
    },
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
        githubUrl: "https://github.com/DhruvalAnandkar/JobGenie-AI",
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
        githubUrl: "https://github.com/DhruvalAnandkar/CortexLab",
    },
    {
        title: "Vajra-MLOps",
        role: "MLOps · AWS / Cloud-Native Pipeline",
        category: "MLOps",
        categoryIcon: <CloudCog size={11} />,
        tagline: "Self-healing AI pipeline for server-load forecasting",
        description:
            "Event-driven MLOps system that streams server telemetry via FastAPI & Redpanda (Kafka), persists metrics in TimescaleDB on Aiven, forecasts CPU/memory with XGBoost, and uses SciPy KS tests for data-drift detection.",
        keyFeature:
            "LangGraph SRE Agent detects predictive accuracy drops and autonomously trains a challenger model, then redeploys — zero manual intervention.",
        technicalImpact:
            "Decoupled microservices with environment-agnostic DSN injection for local Docker → managed cloud; hard statistical gates govern SRE decisions instead of LLM-only control.",
        tags: ["FastAPI", "Redpanda", "TimescaleDB", "XGBoost", "LangGraph", "React", "Framer Motion"],
        accent: "emerald",
        projectIcon: <CloudCog size={18} />,
        isLive: true,
        githubUrl: "https://github.com/DhruvalAnandkar/Vajra-MLOps",
        liveUrl: "https://vajra-ml-ops.vercel.app/",
    },
];

const collaborativeProjects: ProjectCardProps[] = [
    {
        title: "ARIA",
        role: "Team project with Aniket Patel · Kent Hack Enough 2026",
        category: "Accessibility",
        categoryIcon: <Users size={11} />,
        tagline: "Adaptive Real-time Intelligence Assistant",
        description:
            "Collaborative accessibility app (fork of Aniket25042003/ARIA): SIGN mode converts ASL + facial emotion into emotion-matched speech via ElevenLabs; GUIDE mode provides camera obstacle detection and turn-by-turn walking navigation. React Native (Expo) client with a FastAPI backend on a Jetson Orin Nano Super.",
        keyFeature:
            "Vision fallback chain (Gemini → OpenAI → Claude → local YOLOv8) with WebSocket SIGN sessions and Google Maps walking navigation; SOS emergency endpoint included.",
        technicalImpact:
            "All AI processing runs on-device on the Jetson; single SQLite file for users, transcripts, and preferences — no external database required.",
        tags: ["Python", "FastAPI", "React Native", "Expo", "Jetson", "ElevenLabs", "YOLOv8"],
        accent: "emerald",
        projectIcon: <Accessibility size={18} />,
        githubUrl: "https://github.com/DhruvalAnandkar/ARIA1",
        liveUrl: "https://aria-1-chi.vercel.app",
    },
    {
        title: "AgriScience Web",
        role: "Team project with Aniket Patel",
        category: "Full-Stack / ML",
        categoryIcon: <Users size={11} />,
        tagline: "Crop recommendations & plant disease detection UI",
        description:
            "Collaborative web app (fork of Aniket25042003/AgriScience-Web) — distinct from the IoT AgriScience research stack. FastAPI backend serves crop recommendations from soil/weather inputs and TensorFlow/Keras plant-disease detection from uploaded leaf images; React + Tailwind frontend with Firebase auth.",
        keyFeature:
            "Crop Recommendation page (N/P/K, temperature, humidity, pH, rainfall) and Disease Detection via drag-and-drop leaf image analysis.",
        technicalImpact:
            "Documented API surface includes POST /recommend_crops and POST /detect_disease, with a provided backend test script for endpoint verification.",
        tags: ["TypeScript", "React", "Tailwind CSS", "FastAPI", "TensorFlow", "Firebase"],
        accent: "emerald",
        projectIcon: <Globe2 size={18} />,
        isLive: true,
        githubUrl: "https://github.com/DhruvalAnandkar/AgriScience-Web",
        liveUrl: "https://agriscience.vercel.app",
    },
    {
        title: "News Bias Aggregator",
        role: "Front-End · Bias Visualization",
        category: "Web App",
        categoryIcon: <Newspaper size={11} />,
        tagline: "Visualize article bias on a political spectrum",
        description:
            "React app where users paste a news URL or text snippet to evaluate bias. The UI averages simulated bias/reliability scores from multiple hypothetical sources and plots the result on an interactive political spectrum.",
        keyFeature:
            "URL or text input with an interactive spectrum display and responsive React interface.",
        technicalImpact:
            "Scores are currently simulated for visualization (per README); Firebase persistence and live bias APIs are listed as planned future work — not claimed as shipped.",
        tags: ["JavaScript", "React", "Vercel"],
        accent: "emerald",
        projectIcon: <Newspaper size={18} />,
        isLive: true,
        githubUrl: "https://github.com/DhruvalAnandkar/News-Bias-Aggregator",
        liveUrl: "https://news-bias-aggregator.vercel.app/",
    },
    {
        title: "Vapi Outbound Campaign",
        role: "Node.js · Voice AI Automation",
        category: "Voice AI",
        categoryIcon: <PhoneCall size={11} />,
        tagline: "Automated after-hours outreach with Vapi AI assistants",
        description:
            "Express.js app that orchestrates an outbound call campaign via the Vapi API — reads local businesses from JSON, schedules calls with configurable delay, and delivers after-hours lead-capture messaging aimed at Ashland, Ohio service businesses.",
        keyFeature:
            "A/B testing across two Vapi assistant personas (Riley — friendly; Zoe — direct) with a 7-minute delay between calls.",
        technicalImpact:
            "Campaign starts via /api/start-campaign; Deploy-ready for Render with VAPI_API_KEY, phone number ID, and dual assistant IDs.",
        tags: ["JavaScript", "Node.js", "Express", "Vapi"],
        accent: "emerald",
        projectIcon: <PhoneCall size={18} />,
        githubUrl: "https://github.com/DhruvalAnandkar/Vapi-Outbound-Campaign",
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
                <div className="grid md:grid-cols-2 gap-6 mb-10">
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

                {/* Collaborative & Applied */}
                <Divider label="Collaborative & Applied" icon={<Users size={13} />} />
                <div className="grid md:grid-cols-2 gap-6">
                    {collaborativeProjects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 44 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.65, delay: 0.55 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
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
