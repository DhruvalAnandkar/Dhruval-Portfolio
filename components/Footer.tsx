"use client";

import { Code2, Github, Linkedin, Mail } from "lucide-react";

const socials = [
    { icon: Github, href: "https://github.com/dhruvalanandkar", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/dhruvalanandkar", label: "LinkedIn" },
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
        <footer className="border-t border-slate-100 bg-white/80 backdrop-blur py-14 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
                    {/* Brand */}
                    <div className="max-w-xs">
                        <div className="flex items-center gap-2.5 mb-3">
                            <div className="w-8 h-8 rounded-xl bg-[#10b981] flex items-center justify-center shadow-md shadow-emerald-200/60">
                                <Code2 size={15} className="text-white" />
                            </div>
                            <span className="font-bold text-slate-800">Dhruval Anandkar</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            CS (Honors) @ Ashland University · Data Engineering · Full-Stack · BI
                        </p>
                    </div>

                    {/* Nav */}
                    <div>
                        <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-4">
                            Navigate
                        </p>
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-slate-500 hover:text-emerald-600 transition-colors font-medium"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
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
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-sm hover:bg-[#10b981] hover:shadow-emerald-200/50 hover:shadow-md transition-all duration-300"
                        >
                            Download Resume ↗
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-100">
                    <p className="text-xs text-slate-400">
                        © 2026 Dhruval Anandkar | Engineering the Invisible.
                    </p>
                    <div className="flex gap-3">
                        {socials.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-300 hover:scale-110 transition-all duration-200"
                            >
                                <Icon size={14} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
