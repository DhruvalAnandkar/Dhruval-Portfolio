"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import Magnetic from "./Magnetic";

const navLinks = [
    { href: "#world", label: "Map" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#research", label: "Research" },
    { href: "#experience", label: "Experience" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState("");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const ids = navLinks.map((l) => l.href.slice(1));
        const obs = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible?.target?.id) setActive(`#${visible.target.id}`);
            },
            { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.4, 0.7] }
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) obs.observe(el);
        });
        return () => obs.disconnect();
    }, []);

    return (
        <>
            <div className="fixed top-5 inset-x-0 z-50 flex justify-center px-4">
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className={`
            w-full max-w-4xl flex items-center justify-between gap-4
            px-5 transition-all duration-500 rounded-2xl
            ${
                scrolled
                    ? "py-3 glass shadow-2xl border border-emerald-100/80 scale-[0.98] bg-white/80"
                    : "py-4 bg-transparent"
            }
          `}
                >
                    <motion.a
                        href="#hero"
                        className="flex items-center gap-2.5 shrink-0"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <div className="w-8 h-8 rounded-xl bg-[#10b981] flex items-center justify-center shadow-md shadow-emerald-200/60">
                            <Code2 size={15} className="text-white" strokeWidth={2.5} />
                        </div>
                        <span className="font-bold text-slate-800 text-sm tracking-tight">Dhruval</span>
                    </motion.a>

                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = active === link.href;
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3.5 py-1.5 text-sm font-medium rounded-xl transition-colors duration-200 ${
                                        isActive
                                            ? "bg-emerald-50 text-slate-900 border border-emerald-100"
                                            : "text-slate-500 hover:text-slate-800 border border-transparent"
                                    }`}
                                >
                                    {link.label}
                                </a>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        <Magnetic strength={0.28} className="hidden sm:inline-block">
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-[#10b981] transition-colors duration-300 shadow-sm"
                            >
                                Resume ↗
                            </a>
                        </Magnetic>
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

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.22 }}
                        className="fixed top-20 inset-x-4 z-40 glass rounded-2xl border border-white/80 shadow-2xl p-4"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.04 }}
                                className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-[#10b981] hover:bg-emerald-50 rounded-xl transition-all"
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
