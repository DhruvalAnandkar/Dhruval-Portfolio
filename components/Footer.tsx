"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import SectionFX from "./SectionFX";
import BrandMark from "./BrandMark";

const socials = [
    { icon: Github, href: "https://github.com/DhruvalAnandkar", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/dhruvalanandkar", label: "LinkedIn" },
    {
        icon: ExternalLink,
        href: "https://devpost.com/DhruvalAnandkar",
        label: "Devpost",
    },
    { icon: Mail, href: "mailto:dhruvalabroad@gmail.com", label: "Email" },
];

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#research", label: "Research" },
    { href: "#experience", label: "Experience" },
    { href: "#volunteering", label: "Volunteering" },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-emerald-100/60 bg-gradient-to-b from-white/70 via-emerald-50/40 to-sky-50/30 py-14 px-6">
            <SectionFX tone="meadow" rails={false} />

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
                    <motion.div
                        className="max-w-xs"
                        initial={{ opacity: 1, y: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "20%" }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="flex items-center gap-2.5 mb-3">
                            <BrandMark className="w-8 h-8 rounded-xl shadow-md shadow-slate-900/20" />
                            <span className="font-bold text-slate-800">Dhruval Anandkar</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            CS (Honors) @ Ashland University · Data Engineering · Full-Stack · BI
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.06 }}
                    >
                        <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-4">
                            Navigate
                        </p>
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-slate-500 hover:text-emerald-600 transition-colors font-medium inline-flex hover:translate-x-1 duration-200"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.12 }}
                    >
                        <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-4">
                            Get In Touch
                        </p>
                        <a
                            href="mailto:dhruvalabroad@gmail.com"
                            className="block text-sm text-slate-500 hover:text-emerald-600 transition-colors mb-4 font-medium"
                        >
                            dhruvalabroad@gmail.com
                        </a>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-sm hover:bg-[#10b981] hover:shadow-emerald-200/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Download Resume ↗
                        </a>
                    </motion.div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-emerald-100/70">
                    <p className="text-xs text-slate-400">
                        © 2026 Dhruval Anandkar | Engineering the Invisible.
                    </p>
                    <div className="flex gap-3">
                        {socials.map(({ icon: Icon, href, label }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                whileHover={{ y: -3, scale: 1.08 }}
                                whileTap={{ scale: 0.96 }}
                                className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-300 transition-colors duration-200 bg-white/70"
                            >
                                <Icon size={14} />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
