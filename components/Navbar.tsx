"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#research", label: "Research" },
    { href: "#experience", label: "Experience" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            {/* ── Floating Pill Navbar ── */}
            <div className="fixed top-5 inset-x-0 z-50 flex justify-center px-4">
                <motion.nav
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        scale: scrolled ? 0.97 : 1,
                    }}
                    className={`
            w-full max-w-4xl flex items-center justify-between gap-4
            px-5 transition-all duration-500
            rounded-2xl
            ${scrolled
                            ? "py-3 glass shadow-2xl border border-white/70"
                            : "py-4 bg-transparent"
                        }
          `}
                >
                    {/* Brand */}
                    <a href="#hero" className="flex items-center gap-2.5 shrink-0">
                        <div className="w-8 h-8 rounded-xl bg-[#10b981] flex items-center justify-center shadow-md shadow-emerald-200/60">
                            <Code2 size={15} className="text-white" strokeWidth={2.5} />
                        </div>
                        <span className="font-bold text-slate-800 text-sm tracking-tight">
                            Dhruval
                        </span>
                    </a>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="px-3.5 py-1.5 text-sm text-slate-500 font-medium rounded-xl hover:text-slate-800 hover:bg-slate-100/70 transition-all duration-200"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* CTA + Mobile toggle */}
                    <div className="flex items-center gap-2">
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-[#10b981] transition-colors duration-300 shadow-sm"
                        >
                            Resume ↗
                        </a>
                        <button
                            onClick={() => setMenuOpen((o) => !o)}
                            className="md:hidden w-8 h-8 flex items-center justify-center text-slate-600 rounded-xl hover:bg-slate-100 transition-all"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </motion.nav>
            </div>

            {/* ── Mobile Menu ── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-20 inset-x-4 z-40 glass rounded-2xl border border-white/80 shadow-2xl p-4"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-[#10b981] hover:bg-emerald-50 rounded-xl transition-all"
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="border-t border-slate-100 mt-2 pt-2">
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-3 text-sm font-bold text-slate-800 hover:text-[#10b981] transition-colors"
                            >
                                Resume ↗
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
