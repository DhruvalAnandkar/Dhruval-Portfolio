"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MapPin, Calendar, ShieldCheck } from "lucide-react";

const experiences = [
    {
        period: "2024 – Present",
        role: "Business Intelligence Intern",
        company: "Ashland University",
        location: "Ashland, OH",
        description:
            "Building Power BI dashboards that surface enrollment and operational KPIs for senior administration. Writing Python ETL pipelines that pull from multiple SQL databases and push to Azure-hosted data models.",
        tags: ["Power BI", "Python", "SQL", "Azure", "ETL"],
        current: true,
        isLeadership: false,
    },
    {
        period: "Fall 2024 – Ongoing",
        role: "President",
        company: "ACM-W Club @ Ashland University",
        location: "Ashland, OH",
        description:
            "Leading the ACM-W chapter, organising technical workshops, hackathon prep sessions, and mentorship programmes to advance inclusion in computing.",
        tags: ["Leadership", "Community", "ACM", "Mentorship"],
        current: true,
        isLeadership: true,
    },
    {
        period: "Dec 2024 – May 2025",
        role: "International Student Representative",
        company: "AU Senate",
        location: "Ashland, OH",
        description:
            "Advocated for international student policy and cultural growth within the Ashland University Senate. Proposed and helped pass initiatives addressing visa guidance, housing equity, and multicultural programming.",
        tags: ["Policy", "Advocacy", "Leadership", "Senate"],
        current: false,
        isLeadership: true,
    },
    {
        period: "2023 – Present",
        role: "Research Team Lead",
        company: "AgriScience IoT Project",
        location: "Ashland University",
        description:
            "Leading cross-disciplinary research team to design and deploy an IoT sensor network for real-time soil monitoring. Architecting the ML pipeline for nutrient deficiency detection and integrating with a FastAPI + React dashboard.",
        tags: ["IoT", "Machine Learning", "FastAPI", "Leadership"],
        current: false,
        isLeadership: false,
    },
    {
        period: "Summer 2023",
        role: "IT Intern",
        company: "Smith Structures",
        location: "Remote",
        description:
            "Automated internal reporting workflows, reducing manual data entry time by 40%. Developed Python scripts to consolidate project status data from multiple sources into a unified tracking system.",
        tags: ["Python", "Automation", "SQL"],
        current: false,
        isLeadership: false,
    },
    {
        period: "2022",
        role: "IT Intern",
        company: "GSECL",
        location: "Gujarat, India",
        description:
            "Maintained enterprise IT infrastructure, documented network topology, and optimised internal ticketing workflows for the technical operations team.",
        tags: ["IT Infrastructure", "Networking", "Documentation"],
        current: false,
        isLeadership: false,
    },
];

/* ── Scroll-driven growing line ── */
function GrowingLine() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 25%"] });
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
    return (
        <div ref={ref} className="absolute left-[7px] top-0 bottom-0 w-px">
            <div className="absolute inset-0 bg-slate-100 rounded-full" />
            <motion.div
                className="absolute inset-x-0 top-0 origin-top rounded-full bg-[#10b981]"
                style={{ scaleY, height: "100%" }}
            />
        </div>
    );
}

function EntryCard({ exp, index }: { exp: (typeof experiences)[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="relative pl-12"
        >
            {/* Dot */}
            <div
                className={`absolute left-0 top-3.5 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white z-10
          ${exp.current || exp.isLeadership ? "border-[#10b981]" : "border-slate-200"}
          ${exp.current ? "dot-pulse" : ""}`}
            >
                {(exp.current || exp.isLeadership) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                )}
            </div>

            <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
                className={`glass rounded-2xl p-5 transition-shadow duration-300 ${exp.isLeadership
                        ? "shadow-[0_0_0_1px_rgba(16,185,129,0.18)] hover:shadow-[0_0_0_1.5px_rgba(16,185,129,0.35),0_12px_32px_rgba(0,0,0,0.08)]"
                        : "shadow-sm hover:shadow-md"
                    }`}
            >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-slate-800 text-sm">{exp.role}</h3>
                            {exp.isLeadership && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-[#10b981] text-[10px] font-bold border border-emerald-100">
                                    <ShieldCheck size={10} /> Leadership
                                </span>
                            )}
                        </div>
                        <p className="text-xs font-semibold text-[#10b981]">{exp.company}</p>
                    </div>
                    {exp.current && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#10b981] font-bold border border-emerald-100">
                            Current
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={11} />{exp.period}</span>
                    <span className="flex items-center gap-1"><MapPin size={11} />{exp.location}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
                            {tag}
                        </span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Timeline() {
    const headerRef = useRef(null);
    const isInView = useInView(headerRef, { once: true });

    return (
        <section id="experience" className="py-32 px-6">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="text-[#10b981] text-sm font-semibold tracking-widest uppercase mb-3">
                        Experience & Leadership
                    </p>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">Timeline</h2>
                </motion.div>

                <div className="relative">
                    <GrowingLine />
                    <div className="space-y-8">
                        {experiences.map((exp, i) => (
                            <EntryCard key={`${exp.company}-${i}`} exp={exp} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
