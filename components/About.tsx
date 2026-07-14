"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Bot, GraduationCap } from "lucide-react";
import { SectionBeam, SplitWords, Reveal } from "./motion";
import SectionFX from "./SectionFX";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "35% 0px -5% 0px", amount: 0.25 });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0.55, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.55, y: 24 }}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}

export default function About() {
    return (
        <section id="about" className="section-y px-6 relative overflow-hidden section-calm section-calm-meadow">
            <SectionFX tone="meadow" rails="compact" />
            <div className="max-w-6xl mx-auto relative z-10">
                <FadeUp>
                    <p className="text-[#10b981] text-sm font-semibold tracking-widest uppercase mb-3">
                        About
                    </p>
                </FadeUp>
                <SectionBeam className="mb-8 max-w-xs" />

                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <div>
                        <FadeUp delay={0.05}>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
                                <SplitWords text="Building resilient systems" />{" "}
                                <span className="text-[#10b981]">
                                    <SplitWords text="from the ground up." delay={0.2} />
                                </span>
                            </h2>
                        </FadeUp>
                        <FadeUp delay={0.1}>
                            <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-4">
                                I am a software engineer graduating with a{" "}
                                <strong className="text-slate-800 font-semibold">B.S. in Computer Science (Honors)</strong>{" "}
                                in December 2026. My engineering journey started with an Associate in Computer Engineering
                                in India, where fast-paced hackathons taught me the value of rapid prototyping. Today,
                                I focus on building robust backend infrastructure, distributed systems, and agentic AI workflows.
                            </p>
                        </FadeUp>
                        <FadeUp delay={0.14}>
                            <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-4">
                                I thrive on absolute ownership of a product&apos;s lifecycle. Recently, I served as the sole
                                lead developer architecting a highly concurrent, real-time MERN transit platform to handle
                                continuous live data streaming. I also built CortexLab, an autonomous multi-agent GenAI
                                research assistant. Whether I am deploying FastAPI cloud infrastructure, writing Java/Python
                                backends, or configuring large-scale enterprise data pipelines as a BI Intern, my goal is
                                always the same: build systems that scale gracefully.
                            </p>
                        </FadeUp>
                        <FadeUp delay={0.18}>
                            <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-5">
                                When I am not committing code, I am diving deep into advanced data structures, system design
                                matrices, and tactical chess. I am actively looking for New Grad SWE roles where I can tackle
                                complex, high-stakes infrastructure problems.
                            </p>
                        </FadeUp>
                        <FadeUp delay={0.22}>
                            <motion.p
                                whileHover={{ scale: 1.02, x: 4 }}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-[#10b981] bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-xl"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                                Graduating December 2026 · open to New Grad SWE roles
                            </motion.p>
                        </FadeUp>
                    </div>

                    <div className="space-y-3">
                        {[
                            {
                                icon: GraduationCap,
                                title: "Global foundation",
                                sub: "Associate · India to CS Honors",
                                body: "Hackathon pace early on. Now finishing B.S. CS (Honors) at Ashland with a systems-first mindset.",
                            },
                            {
                                icon: Briefcase,
                                title: "Ownership at scale",
                                sub: "Realtime transit · BI pipelines",
                                body: "Sole lead on a concurrent MERN transit platform, plus enterprise data pipelines as a BI Intern.",
                            },
                            {
                                icon: Bot,
                                title: "Agentic systems",
                                sub: "CortexLab · FastAPI · GenAI",
                                body: "Multi-agent research workflows, cloud backends, and architecture built for graceful scale.",
                            },
                        ].map((card, i) => {
                            const Icon = card.icon;
                            return (
                                <Reveal key={card.title} delay={0.1 + i * 0.06}>
                                    <motion.div
                                        whileHover={{ y: -5, x: 3, rotate: -0.4 }}
                                        transition={{ type: "spring", stiffness: 320, damping: 22 }}
                                        className="glass calm-card elite-surface rounded-3xl p-5 shadow-md hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <div className="flex items-start gap-4">
                                            <motion.div
                                                whileHover={{ rotate: 8, scale: 1.08 }}
                                                className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#10b981] shrink-0"
                                            >
                                                <Icon size={18} />
                                            </motion.div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm">{card.title}</p>
                                                <p className="text-xs text-[#10b981] font-semibold mb-1.5">{card.sub}</p>
                                                <p className="text-slate-500 text-sm leading-relaxed">{card.body}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
