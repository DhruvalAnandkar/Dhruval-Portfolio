"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, FlaskConical } from "lucide-react";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}

export default function About() {
    return (
        <section id="about" className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <FadeUp>
                    <p className="text-[#10b981] text-sm font-semibold tracking-widest uppercase mb-4">
                        About
                    </p>
                </FadeUp>

                <div className="grid md:grid-cols-2 gap-16 items-start">
                    {/* Left */}
                    <div>
                        <FadeUp delay={0.05}>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                                I build systems that{" "}
                                <span className="text-[#10b981]">solve real problems</span>,
                                not just pass tests.
                            </h2>
                        </FadeUp>
                        <FadeUp delay={0.1}>
                            <p className="text-slate-500 text-lg leading-relaxed mb-5">
                                Experienced in building{" "}
                                <strong className="text-slate-800 font-semibold">Java-based backend systems</strong>{" "}
                                and scalable{" "}
                                <strong className="text-slate-800 font-semibold">Python data pipelines</strong>
                                {" "}— from ETL architecture to Power BI dashboards and production ML models.
                            </p>
                        </FadeUp>
                        <FadeUp delay={0.14}>
                            <p className="text-slate-500 text-lg leading-relaxed mb-5">
                                Pursuing my{" "}
                                <strong className="text-slate-800 font-semibold">
                                    B.S. in Computer Science (Honors)
                                </strong>{" "}
                                at{" "}
                                <strong className="text-slate-800 font-semibold">Ashland University</strong>{" "}
                                (Dec&nbsp;2026), balancing engineering internships with applied research leadership.
                            </p>
                        </FadeUp>
                        <FadeUp delay={0.19}>
                            <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#10b981] bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-xl">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                                Graduating December 2026&nbsp;&middot;&nbsp;Open to Full-Time Software &amp; Data Engineering Roles
                            </p>
                        </FadeUp>
                    </div>

                    {/* Right */}
                    <div className="space-y-4">
                        <FadeUp delay={0.18}>
                            <motion.div
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="glass rounded-3xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 card-lift"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#10b981] shrink-0">
                                        <Briefcase size={19} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">Business Intelligence Intern</p>
                                        <p className="text-xs text-[#10b981] font-semibold mb-2">Ashland University</p>
                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            Building Power BI dashboards, Python data pipelines, and Azure-hosted
                                            data models driving university-wide decisions.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </FadeUp>

                        <FadeUp delay={0.22}>
                            <motion.div
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="glass rounded-3xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#10b981] shrink-0">
                                        <FlaskConical size={19} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">Research Team Lead</p>
                                        <p className="text-xs text-[#10b981] font-semibold mb-2">AgriScience IoT Project</p>
                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            Leading a cross-disciplinary team building an AI + IoT platform for real-time
                                            soil health monitoring with ML-driven recommendations.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </FadeUp>

                        <FadeUp delay={0.26}>
                            <div className="glass rounded-3xl p-5 shadow-sm">
                                <p className="font-serif-display text-base italic text-slate-400 text-center leading-relaxed">
                                    &ldquo;The best technology is invisible — it just works.&rdquo;
                                </p>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </div>
        </section>
    );
}
