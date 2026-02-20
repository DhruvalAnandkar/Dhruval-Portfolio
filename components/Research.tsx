"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Award, Microscope, ExternalLink } from "lucide-react";

interface Paper {
    title: string;
    venue: string;
    year: string;
    abstract: string;
    keyResult: string;
    tags: string[];
    icon: React.ReactNode;
    link?: string;
    isPresented?: boolean;
}

const papers: Paper[] = [
    {
        title: "Impact of Containerization on Deep Learning Performance",
        venue: "Independent Research",
        year: "2025",
        abstract:
            "Evaluated Docker and Kubernetes containerization overhead versus bare-metal execution for GPU-accelerated deep learning workloads on an NVIDIA RTX 3060. Benchmarked training throughput, memory utilisation, and cold-start latency across CNN and Transformer workloads.",
        keyResult:
            "Containerization reduced idle RAM from 42% → 15% and doubled throughput on compute-intensive tasks, proving modern container runtimes impose negligible GPU overhead when configured correctly.",
        tags: ["Docker", "Kubernetes", "Deep Learning", "RTX 3060", "Benchmarking", "Python"],
        icon: <Microscope size={20} />,
    },
    {
        title: "AgriScience: Automated Irrigation Control via Deep Learning",
        venue: "URCA Symposium · Ashland University",
        year: "2024",
        abstract:
            "Presented at the Undergraduate Research and Creative Activity (URCA) Symposium. Describes the full AgriScience IoT pipeline — from NodeMCU sensor deployment to Firebase ingestion, Random Forest soil-health classification, and automated solenoid-valve irrigation control.",
        keyResult:
            "94% classification accuracy on held-out soil samples; CNN-based plant disease detection module achieved 89% accuracy on the PlantVillage dataset.",
        tags: ["IoT", "Deep Learning", "TensorFlow", "Random Forest", "Firebase"],
        icon: <Award size={20} />,
        isPresented: true,
    },
];

function PaperCard({ paper, delay }: { paper: Paper; delay: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5 }}
            className="glass rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
        >
            {/* Emerald top line */}
            <div className="h-[3px] w-full bg-[#10b981] shrink-0" />

            <div className="p-7 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#10b981] flex items-center justify-center shrink-0">
                        {paper.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                {paper.venue}
                            </span>
                            <span className="text-xs text-slate-400">{paper.year}</span>
                            {paper.isPresented && (
                                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#10b981]">
                                    🏅 Presented
                                </span>
                            )}
                        </div>
                        <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                            {paper.title}
                        </h3>
                    </div>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-4">{paper.abstract}</p>

                {/* Key finding — emerald impact block */}
                <div className="rounded-xl bg-emerald-50 px-4 py-3 mb-5 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#10b981] mb-1">
                        Key Finding
                    </p>
                    <p className="text-sm text-emerald-800 leading-relaxed font-medium">
                        {paper.keyResult}
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {paper.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
                            {tag}
                        </span>
                    ))}
                </div>

                {paper.link ? (
                    <a href={paper.link} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-[#10b981] transition-colors">
                        <ExternalLink size={14} /> Read Paper
                    </a>
                ) : (
                    <p className="text-xs text-slate-400 italic">Full paper available on request.</p>
                )}
            </div>
        </motion.div>
    );
}

export default function Research() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section id="research" className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="text-[#10b981] text-sm font-semibold tracking-widest uppercase mb-3">
                        Research
                    </p>
                    <div className="flex items-end gap-4 flex-wrap mb-4">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">Publications</h2>
                        <div className="flex items-center gap-2 pb-1">
                            <BookOpen size={17} className="text-slate-400" />
                            <span className="text-slate-400 font-medium text-sm">2 papers</span>
                        </div>
                    </div>
                    <p className="text-slate-500 text-lg max-w-xl">
                        Applied research at the intersection of systems, AI, and sustainable agriculture.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {papers.map((paper, i) => (
                        <PaperCard key={paper.title} paper={paper} delay={0.1 + i * 0.12} />
                    ))}
                </div>
            </div>
        </section>
    );
}
