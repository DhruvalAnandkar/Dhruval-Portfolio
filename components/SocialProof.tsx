"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Award,
    Trophy,
    Star,
    Globe,
    Code2,
    Container,
    Shield,
    Briefcase,
    Mic,
} from "lucide-react";
import SectionFX from "./SectionFX";

const honors = [
    {
        icon: Trophy,
        title: "AU International Presidential Scholarship",
        body: "Full merit scholarship for top international students at Ashland.",
        year: "2022 to 2026",
    },
    {
        icon: Star,
        title: "New American University Scholar",
        body: "Merit scholarship from Arizona State recognising potential and leadership.",
        year: "2022",
    },
    {
        icon: Award,
        title: "Early Promise Award",
        body: "Ashland recognition for early CS performance and potential.",
        year: "2024",
    },
    {
        icon: Trophy,
        title: "PepsiCo Scholarship",
        body: "Merit award for academic excellence and STEM leadership.",
        year: "2024",
    },
    {
        icon: Globe,
        title: "UN SDG Innovation Challenge",
        body: "Two-day team challenge at Ashland for sustainable innovation with code on GitHub.",
        year: "Sep 2025",
    },
    {
        icon: Code2,
        title: "2nd Rank · Parul University",
        body: "Certificate of Excellence for 2nd place in Computer Science.",
        year: "2022",
    },
];

const certifications = [
    {
        icon: Container,
        title: "Containers & Kubernetes Essentials",
        issuer: "IBM",
        meta: "Jun 2026",
    },
    {
        icon: Container,
        title: "Containers, Kubernetes & OpenShift",
        issuer: "Cognitive Class",
        meta: "ID 5addfd3f…e33164 · Jun 2026",
    },
    {
        icon: Briefcase,
        title: "Deloitte Australia · Data Analytics",
        issuer: "Forage",
        meta: "ID Y8cdZ5vphxNXmvMQt · Mar 2026",
    },
    {
        icon: Briefcase,
        title: "Goldman Sachs · Risk Simulation",
        issuer: "Forage",
        meta: "ID 9xZ376MxtW5oA99wu · Mar 2026",
    },
    {
        icon: Mic,
        title: "Voice Assistant · GPT-3 + IBM Watson",
        issuer: "Cognitive Class",
        meta: "ID GPXX0IWWEN · Nov 2024",
    },
    {
        icon: Shield,
        title: "Cyber Security Certified",
        issuer: "Information Technology Centre",
        meta: "Dec 2023",
    },
    {
        icon: Star,
        title: "Python for Data Science",
        issuer: "Sololearn",
        meta: "Jun 2021",
    },
];

export default function SocialProof() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "30% 0px" });

    return (
        <section id="awards" className="section-y px-6 relative overflow-hidden section-calm section-calm-bloom">
            <SectionFX tone="bloom" rails="compact" />
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0.55, y: 40 }}
                    animate={
                        isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0.55, y: 28 }
                    }
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-8"
                >
                    <p className="text-[#10b981] text-sm font-semibold tracking-widest uppercase mb-3">
                        Recognition
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
                        Proof in the ribbon
                    </h2>
                    <p className="text-slate-500 text-base mt-2 max-w-md">
                        Scholarships, challenges, and certifications that back the work.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
                    {honors.map((honor, i) => {
                        const Icon = honor.icon;
                        return (
                            <motion.div
                                key={honor.title}
                                initial={{ opacity: 0.55, y: 28, scale: 0.96 }}
                                animate={
                                    isInView
                                        ? { opacity: 1, y: 0, scale: 1 }
                                        : { opacity: 0.6, y: 18, scale: 0.97 }
                                }
                                transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.24), ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -8, scale: 1.025 }}
                                whileTap={{ scale: 0.99 }}
                                className="glass calm-card elite-surface rounded-2xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#10b981] flex items-center justify-center shrink-0">
                                        <Icon size={15} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 shrink-0">{honor.year}</span>
                                </div>
                                <h3 className="font-extrabold text-slate-800 text-sm leading-snug mb-1">
                                    {honor.title}
                                </h3>
                                <p className="text-slate-500 text-xs leading-relaxed">{honor.body}</p>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 1, y: 8 }}
                    animate={{ opacity: 1, y: isInView ? 0 : 8 }}
                    transition={{ duration: 0.4, delay: 0.08 }}
                    className="mb-5"
                >
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
                        Licenses & Certifications
                    </h3>
                    <p className="text-slate-500 text-sm max-w-lg">
                        Cloud, AI, analytics, and security listed tightly on purpose.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 gap-2">
                    {certifications.map((cert, i) => {
                        const Icon = cert.icon;
                        return (
                            <motion.div
                                key={cert.title}
                                initial={{ opacity: 1, x: 0 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ type: "spring", stiffness: 340, damping: 24 }}
                                whileHover={{ x: 8, y: -3, scale: 1.01 }}
                                whileTap={{ scale: 0.995 }}
                                className="calm-card elite-surface flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/70 px-3.5 py-3 shadow-sm hover:border-emerald-100 hover:shadow-md transition-shadow"
                            >
                                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#10b981] flex items-center justify-center shrink-0">
                                    <Icon size={14} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#10b981]">
                                        {cert.issuer}
                                    </p>
                                    <p className="font-bold text-slate-800 text-sm truncate">{cert.title}</p>
                                    <p className="text-[11px] text-slate-400 truncate">{cert.meta}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

