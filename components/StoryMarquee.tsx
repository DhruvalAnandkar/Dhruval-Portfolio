"use client";

const chips = [
    "Associate · India",
    "Hackathons back home",
    "CS Honors @ Ashland",
    "Realtime transit",
    "Agentic AI",
    "ACM-W President",
    "BI Intern",
    "Open to full-time · Dec 2026",
];

export default function StoryMarquee() {
    const loop = [...chips, ...chips];

    return (
        <div className="relative w-full max-w-3xl overflow-hidden mask-marquee mb-10">
            <div className="flex w-max gap-3 animate-marquee hover:[animation-play-state:paused]">
                {loop.map((label, i) => (
                    <span
                        key={`${label}-${i}`}
                        className="shrink-0 rounded-full border border-slate-200/80 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-slate-500 shadow-sm backdrop-blur"
                    >
                        {label}
                    </span>
                ))}
            </div>
        </div>
    );
}
