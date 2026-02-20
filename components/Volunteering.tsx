"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Film } from "lucide-react";

const items = [
    {
        icon: Heart,
        role: "President — Indian Catholic Youth",
        org: "Arizona State University",
        period: "2021 – 2022",
        description:
            "Led the Indian Catholic Youth organisation at ASU, growing active membership and increasing community engagement by 40% through events, prayer retreats, and cross-cultural outreach programmes.",
        impact: "40% increase in community engagement",
        tags: ["Leadership", "Community Building", "Cultural Outreach", "ASU"],
    },
    {
        icon: Film,
        role: "Lead Actor & Volunteer",
        org: "Nitya Sahayak",
        period: "2021",
        description:
            "Starred in and co-produced a short film tackling awareness around social issues in collaboration with the Nitya Sahayak NGO. The film reached over 3,000 people across digital and community screenings.",
        impact: "3,000+ viewers reached",
        tags: ["Filmmaking", "Volunteering", "Social Impact", "NGO"],
    },
];

export default function Volunteering() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section id="volunteering" className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="text-[#10b981] text-sm font-semibold tracking-widest uppercase mb-3">
                        Beyond Code
                    </p>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
                        Volunteering
                    </h2>
                    <p className="text-slate-500 text-lg mt-3 max-w-md">
                        Leadership and service outside the classroom — where values meet action.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 gap-6">
                    {items.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.role}
                                initial={{ opacity: 0, y: 36 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -5 }}
                                className="glass rounded-3xl p-7 shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                {/* Top */}
                                <div className="flex items-start gap-4 mb-5">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#10b981] flex items-center justify-center shrink-0">
                                        <Icon size={21} />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-slate-800 text-base leading-snug">
                                            {item.role}
                                        </h3>
                                        <p className="text-xs font-semibold text-[#10b981] mt-0.5">{item.org}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{item.period}</p>
                                    </div>
                                </div>

                                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                                    {item.description}
                                </p>

                                {/* Impact */}
                                <div className="rounded-xl bg-emerald-50 px-4 py-2.5 mb-5">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#10b981] mb-0.5">
                                        Impact
                                    </p>
                                    <p className="text-xs font-semibold text-emerald-800">{item.impact}</p>
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                    {item.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
