"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TurnstileWidget } from "./turnstile-widget";

type Props = {
    lang: string;
    dict: {
        firstName: string;
        firstNamePlaceholder: string;
        lastName: string;
        lastNamePlaceholder: string;
        email: string;
        emailPlaceholder: string;
        phone: string;
        phonePlaceholder: string;
        subject: string;
        subjectPlaceholder: string;
        message: string;
        messagePlaceholder: string;
        submit: string;
        badges: {
            secure: string;
            confidential: string;
            compliance: string;
        };
        urgent: {
            text: string;
            cta: string;
        };
    };
};

export function ContactFormWidget({ lang, dict }: Props) {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!turnstileToken) {
            setStatus("error"); // Or a specific Turnstile error state if we want to be more granular
            return;
        }

        setStatus("loading");
        try {
            const res = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, turnstileToken }),
            });
            if (res.ok) {
                setStatus("success");
                setForm({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-none flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-bold text-[#0b0c10] mb-3">
                    {lang === "fr" ? "Message envoyé !" : "Message sent!"}
                </h3>
                <p className="text-gray-500 max-w-sm leading-relaxed">
                    {lang === "fr"
                        ? "Merci de nous avoir contactés. Notre équipe vous répondra dans les 24 heures."
                        : "Thanks for reaching out. Our team will get back to you within 24 hours."}
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-sm font-bold text-[#0b0c10] underline underline-offset-4 hover:text-gray-600 transition-colors"
                >
                    {lang === "fr" ? "Envoyer un autre message" : "Send another message"}
                </button>
            </div>
        );
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-bold text-gray-700">
                        {dict.firstName} <span className="text-red-500">*</span>
                    </label>
                    <Input
                        id="firstName"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder={dict.firstNamePlaceholder}
                        className="h-12 bg-gray-50 border-gray-100 focus-visible:ring-[#0b0c10] focus-visible:ring-offset-0 rounded-none transition-all"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-bold text-gray-700">
                        {dict.lastName} <span className="text-red-500">*</span>
                    </label>
                    <Input
                        id="lastName"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder={dict.lastNamePlaceholder}
                        className="h-12 bg-gray-50 border-gray-100 focus-visible:ring-[#0b0c10] focus-visible:ring-offset-0 rounded-none transition-all"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-gray-700">
                        {dict.email} <span className="text-red-500">*</span>
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={dict.emailPlaceholder}
                        className="h-12 bg-gray-50 border-gray-100 focus-visible:ring-[#0b0c10] focus-visible:ring-offset-0 rounded-none transition-all"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-bold text-gray-700">
                        {dict.phone} <span className="text-red-500">*</span>
                    </label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder={dict.phonePlaceholder}
                        className="h-12 bg-gray-50 border-gray-100 focus-visible:ring-[#0b0c10] focus-visible:ring-offset-0 rounded-none transition-all"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-bold text-gray-700">
                    {dict.subject}
                </label>
                <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder={dict.subjectPlaceholder}
                    className="h-12 bg-gray-50 border-gray-100 focus-visible:ring-[#0b0c10] focus-visible:ring-offset-0 rounded-none transition-all"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-gray-700">
                    {dict.message} <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full flex min-h-[80px] rounded-none border border-gray-100 bg-gray-50 px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b0c10] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                    placeholder={dict.messagePlaceholder}
                    required
                />
            </div>

            {status === "error" && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded text-sm">
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    {!turnstileToken
                        ? (lang === "fr" ? "Veuillez compléter le test de sécurité." : "Please complete the security check.")
                        : (lang === "fr"
                            ? "Une erreur est survenue. Veuillez réessayer ou nous contacter directement."
                            : "Something went wrong. Please try again or contact us directly.")
                    }
                </div>
            )}

            <TurnstileWidget
                lang={lang}
                onVerify={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken(null)}
                onError={() => setTurnstileToken(null)}
            />

            <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full h-14 bg-[#0b0c10] hover:bg-[#111827] text-white rounded-none font-bold uppercase tracking-widest text-xs transition-colors disabled:opacity-60 shadow-lg shadow-[#0b0c10]/10"
            >
                {status === "loading" ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        {lang === "fr" ? "Envoi en cours..." : "Sending..."}
                    </span>
                ) : dict.submit}
            </Button>

            {/* Security Badges */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[14px] text-[#0b0c10]">lock</span>
                    {dict.badges.secure}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[14px] text-[#0b0c10]">verified_user</span>
                    {dict.badges.confidential}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[14px] text-[#0b0c10]">gavel</span>
                    {dict.badges.compliance}
                </div>
            </div>

            {/* Urgent Link */}
            <div className="pt-8 border-t border-gray-100 text-center">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-3">{dict.urgent.text}</p>
                <div
                    data-cal-link="stigmatech/30min"
                    className="inline-flex items-center gap-2 text-[11px] font-bold text-gray-600 hover:text-[#0b0c10] transition-colors cursor-pointer group uppercase tracking-widest"
                >
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    <span className="border-b border-gray-600/30 group-hover:border-[#0b0c10]/30 pb-0.5">{dict.urgent.cta}</span>
                </div>
            </div>
        </form>
    );
}
