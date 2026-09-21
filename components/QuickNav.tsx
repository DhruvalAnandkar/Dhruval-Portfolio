"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, Map } from "lucide-react";

import { scrollToId } from "@/lib/lenisBridge";

/** Right-rail jumps — hero + map without long scrolling */
export default function QuickNav() {
    const [showHero, setShowHero] = useState(false);
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        let raf = 0;
        let ticking = false;
        const heroEl = () => document.getElementById("hero");
        const worldEl = () => document.getElementById("world");

        const update = () => {
            ticking = false;
            const y = window.scrollY;
            const hero = heroEl();
            const world = worldEl();

            let heroInView = y < 120;
            if (hero) {
                const r = hero.getBoundingClientRect();
                heroInView = r.top > -r.height * 0.35 && r.bottom > window.innerHeight * 0.35;
            }

            let mapInView = false;
            if (world) {
                const r = world.getBoundingClientRect();
                mapInView = r.top < window.innerHeight * 0.55 && r.bottom > window.innerHeight * 0.35;
            }

            const nextHero = y > 220 && !heroInView;
            const nextMap = y > 280 && !mapInView;
            setShowHero((prev) => (prev === nextHero ? prev : nextHero));
            setShowMap((prev) => (prev === nextMap ? prev : nextMap));
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                raf = requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(raf);
        };
    }, []);

    const go = (id: string) => scrollToId(id);

    const visible = showHero || showMap;
    if (!visible) return null;

    return (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2">
            <AnimatePresence>
                {showHero && (
                    <motion.button
                        key="to-hero"
                        type="button"
                        onClick={() => go("hero")}
                        initial={{ opacity: 0, x: 16, scale: 0.92 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 12, scale: 0.94 }}
                        whileHover={{ scale: 1.04, y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white/97 px-3.5 py-2.5 text-xs font-bold text-slate-800 shadow-xl shadow-emerald-900/10 hover:border-[#10b981] hover:text-[#059669]"
                        aria-label="Back to top"
                    >
                        <ChevronUp size={14} className="text-[#10b981]" />
                        Top
                    </motion.button>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {showMap && (
                    <motion.button
                        key="to-map"
                        type="button"
                        onClick={() => go("world")}
                        initial={{ opacity: 0, x: 16, scale: 0.92 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 12, scale: 0.94 }}
                        whileHover={{ scale: 1.04, y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white/97 px-3.5 py-2.5 text-xs font-bold text-slate-800 shadow-xl shadow-emerald-900/10 hover:border-[#10b981] hover:text-[#059669]"
                        aria-label="Back to map"
                    >
                        <Map size={14} className="text-[#10b981]" />
                        Map
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
