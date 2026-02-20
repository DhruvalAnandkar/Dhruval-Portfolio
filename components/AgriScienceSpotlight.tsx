"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wifi, Cloud, Brain, BarChart3, Zap } from "lucide-react";

const pipelineSteps = [
    {
        icon: Wifi,
        label: "IoT Sensors",
        sub: "Soil moisture, pH, temperature, NPK",
        color: "emerald",
    },
    {
        icon: Cloud,
        label: "Cloud Ingestion",
        sub: "FastAPI + real-time MQTT pipeline",
        color: "blue",
    },
    {
        icon: Brain,
        label: "ML Engine",
        sub: "Nutrient deficiency classification",
        color: "purple",
    },
    {
        icon: BarChart3,
        label: "Dashboard",
        sub: "React live analytics + alerts",
        color: "emerald",
    },
];

const iconColorMap: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
};

function FadeInUp({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}

export default function AgriScienceSpotlight() {
    const lineRef = useRef(null);
    const lineInView = useInView(lineRef, { once: true });

    return (
        <section id="agrisci" className="py-28 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <FadeInUp>
                    <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-3">
                        Featured Case Study
                    </p>
                </FadeInUp>
                <FadeInUp delay={0.05}>
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-800">
                            🌱 AgriScience
                        </h2>
                        {/* Live status badge */}
                        <motion.div
                            animate={{ scale: [1, 1.04, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs font-bold"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                            </span>
                            Live Project
                        </motion.div>
                    </div>
                </FadeInUp>
                <FadeInUp delay={0.1}>
                    <p className="text-slate-500 text-lg max-w-2xl mb-14 leading-relaxed">
                        An AI + IoT platform for{" "}
                        <span className="text-slate-700 font-semibold">real-time soil health monitoring</span>{" "}
                        — combining sensor networks, ML inference, and a cloud dashboard into one end-to-end product.
                    </p>
                </FadeInUp>

                {/* Pipeline visual */}
                <FadeInUp delay={0.12}>
                    <div className="relative glass rounded-3xl border border-slate-100 shadow-lg p-8 sm:p-12 overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-50/80 to-transparent rounded-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-50/60 to-transparent rounded-3xl pointer-events-none" />

                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
                            Sensor-to-Cloud Pipeline
                        </p>

                        {/* Steps */}
                        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
                            {pipelineSteps.map((step, i) => (
                                <div key={step.label} className="flex sm:flex-1 flex-col sm:items-center">
                                    {/* Card */}
                                    <motion.div
                                        ref={i === 0 ? lineRef : null}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={lineInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ duration: 0.5, delay: i * 0.15 }}
                                        whileHover={{ y: -5, scale: 1.04 }}
                                        className="w-full sm:w-auto bg-white rounded-2xl border border-slate-100 shadow-md p-5 flex flex-col items-center text-center gap-3 cursor-default"
                                    >
                                        <div
                                            className={`w-12 h-12 rounded-xl border flex items-center justify-center ${iconColorMap[step.color]}`}
                                        >
                                            <step.icon size={22} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm">{step.label}</p>
                                            <p className="text-xs text-slate-400 mt-0.5 max-w-[120px]">{step.sub}</p>
                                        </div>
                                    </motion.div>

                                    {/* Connector arrow */}
                                    {i < pipelineSteps.length - 1 && (
                                        <div className="hidden sm:block absolute" style={{ left: `${25 * (i + 1)}%`, top: "50%", transform: "translate(-50%, -50%)" }}>
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={lineInView ? { opacity: 1, x: 0 } : {}}
                                                transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                                                className="flex items-center"
                                            >
                                                <div className="w-8 h-px bg-gradient-to-r from-emerald-300 to-blue-300" />
                                                <span className="text-slate-300 text-xs ml-1">▶</span>
                                            </motion.div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Mobile connector lines */}
                        <div className="sm:hidden flex flex-col gap-1 my-2 items-start pl-7">
                            {pipelineSteps.slice(0, -1).map((_, i) => (
                                <div key={i} className="h-4 w-px bg-gradient-to-b from-emerald-200 to-blue-200 ml-4" />
                            ))}
                        </div>

                        {/* Impact metrics */}
                        <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-3 gap-6 text-center">
                            {[
                                { value: "Real-time", label: "Data ingestion" },
                                { value: "ML-powered", label: "Deficiency detection" },
                                { value: "IoT + Cloud", label: "Full-stack architecture" },
                            ].map((m) => (
                                <div key={m.label}>
                                    <p className="font-extrabold text-lg gradient-text">{m.value}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{m.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeInUp>

                {/* Tags */}
                <FadeInUp delay={0.2}>
                    <div className="flex flex-wrap gap-2 mt-6">
                        {["Python", "IoT", "FastAPI", "MQTT", "Machine Learning", "React", "Ashland University Research"].map(
                            (tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200"
                                >
                                    {tag}
                                </span>
                            )
                        )}
                    </div>
                </FadeInUp>

                {/* Zap CTA */}
                <FadeInUp delay={0.25}>
                    <div className="mt-6 flex items-center gap-3">
                        <a
                            href="https://github.com/dhruvalanandkar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-bold shadow-md shadow-emerald-200 hover:shadow-lg hover:scale-105 transition-all duration-200"
                        >
                            <Zap size={15} /> View on GitHub
                        </a>
                    </div>
                </FadeInUp>
            </div>
        </section>
    );
}
