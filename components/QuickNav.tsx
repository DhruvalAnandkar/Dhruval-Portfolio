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
        const onScroll = () => {
            const y = window.scrollY;
            const hero = document.getElementById("hero");
            const world = document.getElementById("world");

            const heroInView = hero
                ? (() => {
                      const r = hero.getBoundingClientRect();
                      return r.top > -r.height * 0.35 && r.bottom > window.innerHeight * 0.35;
                  })()
                : y < 120;

            const mapInView = world
                ? (() => {
                      const r = world.getBoundingClientRect();
                      return r.top < window.innerHeight * 0.55 && r.bottom > window.innerHeight * 0.35;
                  })()
                : false;

            setShowHero(y > 220 && !heroInView);
            setShowMap(y > 280 && !mapInView);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
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
                        className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white/95 px-3.5 py-2.5 text-xs font-bold text-slate-800 shadow-xl shadow-emerald-900/10 backdrop-blur-md hover:border-[#10b981] hover:text-[#059669]"
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
                        className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white/95 px-3.5 py-2.5 text-xs font-bold text-slate-800 shadow-xl shadow-emerald-900/10 backdrop-blur-md hover:border-[#10b981] hover:text-[#059669]"
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
