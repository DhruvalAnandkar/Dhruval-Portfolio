"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Trophy, Star, Globe, Code2 } from "lucide-react";

const honors = [
    {
        icon: Trophy,
        title: "AU International Presidential Scholarship",
        body: "Full merit scholarship awarded to top international students at Ashland University for outstanding academic achievement.",
        year: "2022–2026",
    },
    {
        icon: Star,
        title: "New American University Scholar",
        body: "Prestigious merit scholarship from Arizona State University, recognising academic potential and leadership.",
        year: "2022",
    },
    {
        icon: Award,
        title: "Early Promise Award",
        body: "Recognised by Ashland University for outstanding early academic performance and demonstrated potential in Computer Science.",
        year: "2024",
    },
    {
        icon: Trophy,
        title: "PepsiCo Scholarship",
        body: "Merit-based scholarship awarded by PepsiCo in recognition of academic excellence and leadership potential in STEM.",
        year: "2024",
    },
    {
        icon: Globe,
        title: "UN SDG Innovation Challenge",
        body: "Selected participant in the SDG 2025 Innovation Challenge, contributing technology-driven solutions to global sustainability goals.",
        year: "2025",
    },
    {
        icon: Code2,
        title: "2nd Rank — Parul University",
        body: "Certificate of Excellence awarded for 2nd place academic performance in Computer Science at Parul University.",
        year: "2022",
    },
    {
        icon: Star,
        title: "Python for Data Science",
        body: "Professional certification from Sololearn, validating advanced proficiency in Python for data analysis and machine learning pipelines.",
        year: "2023",
    },
];

export default function SocialProof() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section id="awards" className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="text-[#10b981] text-sm font-semibold tracking-widest uppercase mb-3">
                        Recognition
                    </p>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
                        Honors & Awards
                    </h2>
                    <p className="text-slate-500 text-lg mt-3 max-w-md">
                        A record of consistent excellence across academics, leadership, and research.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {honors.map((honor, i) => {
                        const Icon = honor.icon;
                        return (
                            <motion.div
                                key={honor.title}
                                initial={{ opacity: 0, y: 32 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -4 }}
                                className="glass rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#10b981] flex items-center justify-center shrink-0">
                                        <Icon size={18} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 pt-1 shrink-0">{honor.year}</span>
                                </div>
                                <h3 className="font-extrabold text-slate-800 text-sm leading-snug mb-2">
                                    {honor.title}
                                </h3>
                                <p className="text-slate-500 text-xs leading-relaxed">{honor.body}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
