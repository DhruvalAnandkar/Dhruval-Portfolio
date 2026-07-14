"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, CheckCircle, AlertCircle } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export default function FAB() {
    const [hovered, setHovered] = useState(false);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<Status>("idle");
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus("success");
                setTimeout(() => {
                    setOpen(false);
                    setStatus("idle");
                    setForm({ name: "", email: "", message: "" });
                }, 3000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 3500);
            }
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3500);
        }
    };

    return (
        <>
            {/* ── FAB Button ── */}
            <motion.button
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                onClick={() => setOpen(true)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    boxShadow: [
                        "0 12px 40px rgba(15,23,42,0.25)",
                        "0 12px 48px rgba(16,185,129,0.35)",
                        "0 12px 40px rgba(15,23,42,0.25)",
                    ],
                }}
                transition={{
                    delay: 1.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 22,
                    boxShadow: { duration: 2.8, repeat: Infinity },
                }}
                whileTap={{ scale: 0.94 }}
                className="fixed bottom-7 right-6 z-50 flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-slate-900 text-white shadow-2xl shadow-slate-900/30 hover:bg-[#10b981] transition-colors duration-300"
                style={{ width: hovered ? "auto" : 52, height: 52, paddingLeft: hovered ? 20 : 0, paddingRight: hovered ? 20 : 0 }}
                aria-label="Contact me"
            >
                <MessageSquare size={20} className="shrink-0" />
                <AnimatePresence>
                    {hovered && (
                        <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-sm font-bold whitespace-nowrap overflow-hidden"
                        >
                            Let&apos;s Talk
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* ── Contact Modal ── */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 16 }}
                            transition={{ type: "spring", stiffness: 280, damping: 24 }}
                            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-0 pointer-events-none"
                        >
                            <div className="glass rounded-3xl shadow-2xl p-8 w-full max-w-md pointer-events-auto">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-7">
                                    <div>
                                        <h3 className="text-xl font-extrabold text-slate-900">Let&apos;s Connect</h3>
                                        <p className="text-slate-400 text-sm mt-0.5">I&apos;ll reply within 24 hours.</p>
                                    </div>
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>

                                <AnimatePresence mode="wait">
                                    {/* Success state */}
                                    {status === "success" && (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center py-8 text-center"
                                        >
                                            <CheckCircle size={48} className="text-[#10b981] mb-4" />
                                            <p className="font-bold text-slate-900 text-lg">Message sent!</p>
                                            <p className="text-slate-400 text-sm mt-1">You&apos;ll hear back within 24 hours.</p>
                                        </motion.div>
                                    )}

                                    {/* Error state */}
                                    {status === "error" && (
                                        <motion.div
                                            key="error"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center py-8 text-center"
                                        >
                                            <AlertCircle size={48} className="text-red-400 mb-4" />
                                            <p className="font-bold text-slate-900 text-lg">Something went wrong</p>
                                            <p className="text-slate-400 text-sm mt-1">
                                                Try emailing directly at{" "}
                                                <a href="mailto:dhruvalabroad@gmail.com" className="text-[#10b981] font-semibold">
                                                    dhruvalabroad@gmail.com
                                                </a>
                                            </p>
                                        </motion.div>
                                    )}

                                    {/* Form */}
                                    {(status === "idle" || status === "sending") && (
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onSubmit={handleSubmit}
                                            className="space-y-4"
                                        >
                                            {(["name", "email"] as const).map((field) => (
                                                <div key={field}>
                                                    <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                                                        {field === "name" ? "Your Name" : "Email"}
                                                    </label>
                                                    <input
                                                        type={field === "email" ? "email" : "text"}
                                                        required
                                                        disabled={status === "sending"}
                                                        placeholder={field === "name" ? "Jane Smith" : "jane@example.com"}
                                                        value={form[field]}
                                                        onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-emerald-100 transition-all disabled:opacity-60"
                                                    />
                                                </div>
                                            ))}
                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                                                    Message
                                                </label>
                                                <textarea
                                                    required
                                                    rows={4}
                                                    disabled={status === "sending"}
                                                    placeholder="What are you working on?"
                                                    value={form.message}
                                                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-emerald-100 transition-all resize-none disabled:opacity-60"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={status === "sending"}
                                                className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#10b981] transition-colors duration-300 shadow-md shadow-slate-900/15 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {status === "sending" ? (
                                                    <>
                                                        <motion.span
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                                            className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full"
                                                        />
                                                        Sending…
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send size={14} /> Send Message
                                                    </>
                                                )}
                                            </button>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
