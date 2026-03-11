"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TurnstileWidget } from "../turnstile-widget";

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

    const dict = dictionary?.marketplace?.demoModal || {
        title: lang === "fr" ? "Demander une Démo" : "Request a Demo",
        subtitle: lang === "fr" ? "Découvrez comment" : "Discover how",
        nameLabel: lang === "fr" ? "Nom complet" : "Full Name",
        emailLabel: lang === "fr" ? "Courriel professionnel" : "Work Email",
        companyLabel: lang === "fr" ? "Entreprise" : "Company",
        messageLabel: lang === "fr" ? "Message (Optionnel)" : "Message (Optional)",
        submitBtn: lang === "fr" ? "Envoyer la demande" : "Submit Request",
        successTitle: lang === "fr" ? "Merci !" : "Thank You!",
        successMsg: lang === "fr" ? "Votre demande a été envoyée. Un expert vous contactera sous peu." : "Your request has been sent. An expert will contact you shortly.",
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

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!turnstileToken) {
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
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-xl bg-[#0b0c10] border border-white/10 shadow-2xl animate-in zoom-in-95 fade-in duration-300 rounded-none overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined text-2xl">close</span>
                </button>

                <div className="p-8 sm:p-12">
                    {status === "success" ? (
                        <div className="text-center py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="w-20 h-20 bg-[#0b0c10] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-white text-4xl">check</span>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">{dict.successTitle}</h2>
                            <p className="text-white/60 mb-8 max-w-md mx-auto">
                                {dict.successMsg}
                            </p>
                            <Button
                                onClick={onClose}
                                className="bg-white text-[#0b0c10] hover:bg-gray-200 rounded-none px-10 py-6 text-xs font-bold uppercase tracking-widest"
                            >
                                {dict.closeBtn}
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="mb-10">
                                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-black mb-2">
                                    {dict.subtitle} {productName}
                                </p>
                                <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
                                    {dict.title}
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-1">
                                            {dict.nameLabel}
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-gray-500 transition-colors rounded-none placeholder:text-white/10"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-1">
                                            {dict.emailLabel}
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-gray-500 transition-colors rounded-none placeholder:text-white/10"
                                            placeholder="john@company.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-1">
                                        {dict.companyLabel}
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-blue-500 transition-colors rounded-none placeholder:text-white/10"
                                        placeholder="Company Name Inc."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-1">
                                        {dict.messageLabel}
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-blue-500 transition-colors rounded-none placeholder:text-white/10 resize-none"
                                    />
                                </div>

                                <TurnstileWidget
                                    lang={lang}
                                    onVerify={(token) => setTurnstileToken(token)}
                                    onExpire={() => setTurnstileToken(null)}
                                    onError={() => setTurnstileToken(null)}
                                    theme="dark"
                                />

                                {status === "error" && (
                                    <p className="text-red-500 text-[10px] font-bold uppercase text-center animate-in fade-in slide-in-from-top-1">
                                        {!turnstileToken
                                            ? (lang === "fr" ? "Veuillez compléter le test de sécurité." : "Please complete the security check.")
                                            : (lang === "fr" ? "Une erreur est survenue. Réessayez." : "An error occurred. Try again.")
                                        }
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="w-full bg-white text-[#0b0c10] hover:bg-gray-200 h-16 rounded-none text-xs font-bold uppercase tracking-widest transition-all duration-300"
                                >
                                    {status === "submitting" ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-[#0b0c10]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {lang === 'fr' ? 'Envoi...' : 'Sending...'}
                                        </span>
                                    ) : dict.submitBtn}
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
