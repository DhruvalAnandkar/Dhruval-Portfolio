"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Shape {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    speed: number;
    drift: number;
    delay: number;
}

const colors = [
    "rgba(16,185,129,0.12)",
    "rgba(59,130,246,0.10)",
    "rgba(139,92,246,0.09)",
    "rgba(16,185,129,0.08)",
    "rgba(59,130,246,0.12)",
];

function generateShapes(count: number): Shape[] {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 40 + Math.random() * 120,
        color: colors[i % colors.length],
        speed: 8 + Math.random() * 14,
        drift: Math.random() * 30 - 15,
        delay: Math.random() * 4,
    }));
}

export default function FloatingParticles() {
    // ⚡ Generate shapes only on the client to avoid SSR hydration mismatch.
    // Math.random() produces different values server vs. client; by deferring
    // to useEffect we ensure the server sends no shapes and the client inserts
    // them after hydration — no mismatch, no console error.
    const [shapes, setShapes] = useState<Shape[]>([]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 30, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 30, damping: 20 });

    useEffect(() => {
        // Stable reference so shapes don't regenerate on re-renders
        setShapes(generateShapes(14));
    }, []);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            const cx = (e.clientX / window.innerWidth - 0.5) * 30;
            const cy = (e.clientY / window.innerHeight - 0.5) * 30;
            mouseX.set(cx);
            mouseY.set(cy);
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Static mesh gradient background — safe to SSR */}
            <div className="mesh-bg" />
            <div className="mesh-orb-purple" />

            {/* Floating shapes — client-only to prevent hydration mismatch */}
            {shapes.map((shape) => (
                <motion.div
                    key={shape.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${shape.x}%`,
                        top: `${shape.y}%`,
                        width: shape.size,
                        height: shape.size,
                        background: `radial-gradient(circle, ${shape.color} 0%, transparent 70%)`,
                        x: smoothX,
                        y: smoothY,
                    }}
                    animate={{
                        y: [0, shape.drift, 0],
                        x: [0, shape.drift * 0.6, 0],
                        scale: [1, 1.06, 1],
                    }}
                    transition={{
                        duration: shape.speed,
                        delay: shape.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
