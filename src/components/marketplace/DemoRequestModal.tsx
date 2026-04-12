"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TurnstileWidget } from "../turnstile-widget";
import { motion, AnimatePresence } from "framer-motion";

interface DemoRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
    lang: string;
    dictionary: any;
}

export default function DemoRequestModal({
    isOpen,
    onClose,
    productName,
    lang,
    dictionary
}: DemoRequestModalProps) {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: ""
    });

    // Use dictionary from marketplace.demoModal
    const dict = dictionary?.common?.nav?.marketplace?.demoModal || {
        title: lang === "fr" ? "Demander une Démo" : "Request a Demo",
        subtitle: lang === "fr" ? "Découvrez le potentiel de" : "Discover the potential of",
        nameLabel: lang === "fr" ? "Nom Complet" : "Full Name",
        emailLabel: lang === "fr" ? "Courriel Professionnel" : "Work Email",
        companyLabel: lang === "fr" ? "Entreprise" : "Company",
        messageLabel: lang === "fr" ? "Message / Besoins Spécifiques" : "Message / Specific Needs",
        submitBtn: lang === "fr" ? "Envoyer la Demande" : "Submit Request",
        successTitle: lang === "fr" ? "Demande Reçue" : "Request Received",
        successMsg: lang === "fr" ? "Votre demande a été transmise avec succès. Un expert vous contactera sous peu." : "Your request has been successfully sent. An expert will contact you shortly.",
        closeBtn: lang === "fr" ? "Fermer" : "Close"
    };

    // Pre-fill message
    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({
                ...prev,
                message: lang === "fr"
                    ? `Je souhaite une démonstration de ${productName}.`
                    : `I am interested in a demo for ${productName}.`
            }));
            setStatus("idle");
            setTurnstileToken(null);
        }
    }, [isOpen, productName, lang]);

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!turnstileToken && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
            setStatus("error");
            return;
        }

        setStatus("submitting");

        try {
            const res = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.name.split(" ")[0] || formData.name,
                    lastName: formData.name.split(" ").slice(1).join(" ") || " ",
                    email: formData.email,
                    company: formData.company,
                    message: formData.message,
                    subject: `Demande de Démo: ${productName}`,
                    turnstileToken
                }),
            });

            if (!res.ok) throw new Error("Submission failed");
            setStatus("success");
        } catch (err) {
            setStatus("error");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.7, bounce: 0.3 }}
                        className="relative w-full max-w-2xl glass-card backdrop-blur-3xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] rounded-none overflow-hidden"
                    >
                        {/* Decorative Top Beam */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
                        
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-none bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300 z-50 group"
                        >
                            <span className="material-symbols-outlined text-xl group-hover:rotate-90 transition-transform duration-500">close</span>
                        </button>

                        <div className="p-10 sm:p-14">
                            {status === "success" ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-10"
                                >
                                    <div className="relative w-24 h-24 mx-auto mb-10">
                                        <div className="absolute inset-0 bg-white/10 blur-2xl rounded-none animate-pulse" />
                                        <div className="relative w-full h-full bg-white rounded-none flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                            <span className="material-symbols-outlined text-slate-950 text-4xl">check</span>
                                        </div>
                                    </div>
                                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">{dict.successTitle}</h2>
                                    <p className="text-white/60 mb-12 max-w-md mx-auto leading-relaxed font-light">
                                        {dict.successMsg}
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="px-12 py-5 bg-white text-slate-950 rounded-none text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-300 transition-all duration-500 hover:scale-105 active:scale-95"
                                    >
                                        {dict.closeBtn}
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="animate-in fade-in duration-700">
                                    <div className="mb-12">
                                        <span className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-black block mb-3">
                                            {dict.subtitle}
                                        </span>
                                        <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                                            {productName}
                                        </h2>
                                        <div className="h-0.5 w-20 bg-white/40 rounded-none" />
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 ml-1">
                                                    {dict.nameLabel}
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 px-6 py-5 text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-500 rounded-none placeholder:text-white/10"
                                                    placeholder="Stéphane Lefèvre"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 ml-1">
                                                    {dict.emailLabel}
                                                </label>
                                                <input
                                                    required
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 px-6 py-5 text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-500 rounded-none placeholder:text-white/10"
                                                    placeholder="s.lefevre@enterprise.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 ml-1">
                                                {dict.companyLabel}
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 px-6 py-5 text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-500 rounded-none placeholder:text-white/10"
                                                placeholder="Global Solutions Inc."
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 ml-1">
                                                {dict.messageLabel}
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 px-6 py-5 text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-500 rounded-none placeholder:text-white/10 resize-none font-light leading-relaxed"
                                            />
                                        </div>

                                        <div className="py-2">
                                            <TurnstileWidget
                                                lang={lang}
                                                onVerify={(token) => setTurnstileToken(token)}
                                                onExpire={() => setTurnstileToken(null)}
                                                onError={() => setTurnstileToken(null)}
                                                theme="dark"
                                            />
                                        </div>

                                        {status === "error" && (
                                            <motion.p 
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-red-400 text-[10px] font-black uppercase text-center tracking-widest"
                                            >
                                                {!turnstileToken && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
                                                    ? (lang === "fr" ? "Veuillez valider le test de sécurité." : "Please complete the security check.")
                                                    : (lang === "fr" ? "Erreur lors de l'envoi. Réessayez." : "Submission error. Please try again.")
                                                }
                                            </motion.p>
                                        )}

                                            <button
                                                type="submit"
                                                disabled={status === "submitting"}
                                                className="w-full group relative overflow-hidden h-20 bg-white text-slate-950 rounded-none text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 hover:bg-slate-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                                            >
                                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                            {status === "submitting" ? (
                                                <span className="flex items-center justify-center gap-4">
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    {lang === 'fr' ? 'Transmission...' : 'Processing...'}
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center gap-3">
                                                    {dict.submitBtn}
                                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                                </span>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

