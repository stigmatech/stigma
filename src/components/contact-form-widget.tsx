"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TurnstileWidget } from "./turnstile-widget";
import { cn } from "@/lib/utils";

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
    const isFr = lang === "fr";
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
            setStatus("error");
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
            <div className="bg-slate-950 p-12 lg:p-20 shadow-2xl relative overflow-hidden text-center border border-white/10">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                
                <div className="w-20 h-20 bg-white flex items-center justify-center mx-auto mb-8 relative z-10">
                    <span className="material-symbols-outlined text-slate-950 text-4xl">check_circle</span>
                </div>
                
                <h3 className="text-3xl lg:text-5xl font-display font-black text-white mb-6 relative z-10 uppercase tracking-tighter italic">
                    {isFr ? "MESSAGE TRANSMIS." : "MESSAGE TRANSMITTED."}
                </h3>
                
                <p className="text-slate-400 max-w-sm mx-auto relative z-10 text-lg font-light italic tracking-tight leading-relaxed">
                    {isFr
                        ? "Merci de nous avoir contactés. Notre équipe reviendra vers vous dans les prochaines 24 heures."
                        : "Thanks for reaching out. Our team will get back to you within the next 24 hours."}
                </p>
                
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-12 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.5em] transition-all italic border-b border-transparent hover:border-white pb-1 relative z-10"
                >
                    {isFr ? "ENVOYER UN AUTRE PROTOCOLE" : "SEND ANOTHER PROTOCOL"}
                </button>
            </div>
        );
    }

    return (
        <form className="space-y-10 group relative" onSubmit={handleSubmit}>
            {/* Industrial Accent Controls */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-slate-950"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-slate-950 opacity-10"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="space-y-3 group/input">
                    <label htmlFor="firstName" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic group-hover/input:text-slate-950 transition-colors">
                        {dict.firstName} <span className="text-amber-500">*</span>
                    </label>
                    <Input
                        id="firstName"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder={dict.firstNamePlaceholder}
                        className="h-14 bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-slate-100 focus-visible:ring-0 focus-visible:border-slate-950 rounded-none px-0 text-xl font-black uppercase italic tracking-tighter transition-all placeholder:text-slate-200"
                        required
                    />
                </div>
                <div className="space-y-3 group/input">
                    <label htmlFor="lastName" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic group-hover/input:text-slate-950 transition-colors">
                        {dict.lastName} <span className="text-amber-500">*</span>
                    </label>
                    <Input
                        id="lastName"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder={dict.lastNamePlaceholder}
                        className="h-14 bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-slate-100 focus-visible:ring-0 focus-visible:border-slate-950 rounded-none px-0 text-xl font-black uppercase italic tracking-tighter transition-all placeholder:text-slate-200"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="space-y-3 group/input">
                    <label htmlFor="email" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic group-hover/input:text-slate-950 transition-colors">
                        {dict.email} <span className="text-amber-500">*</span>
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={dict.emailPlaceholder}
                        className="h-14 bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-slate-100 focus-visible:ring-0 focus-visible:border-slate-950 rounded-none px-0 text-xl font-black uppercase italic tracking-tighter transition-all placeholder:text-slate-200"
                        required
                    />
                </div>
                <div className="space-y-3 group/input">
                    <label htmlFor="phone" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic group-hover/input:text-slate-950 transition-colors">
                        {dict.phone} <span className="text-amber-500">*</span>
                    </label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder={dict.phonePlaceholder}
                        className="h-14 bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-slate-100 focus-visible:ring-0 focus-visible:border-slate-950 rounded-none px-0 text-xl font-black uppercase italic tracking-tighter transition-all placeholder:text-slate-200"
                        required
                    />
                </div>
            </div>

            <div className="space-y-3 group/input">
                <label htmlFor="subject" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic group-hover/input:text-slate-950 transition-colors">
                    {dict.subject}
                </label>
                <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder={dict.subjectPlaceholder}
                    className="h-14 bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-slate-100 focus-visible:ring-0 focus-visible:border-slate-950 rounded-none px-0 text-xl font-black uppercase italic tracking-tighter transition-all placeholder:text-slate-200"
                />
            </div>

            <div className="space-y-3 group/input">
                <label htmlFor="message" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic group-hover/input:text-slate-950 transition-colors">
                    {dict.message} <span className="text-amber-500">*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full h-40 bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-slate-100 focus-visible:outline-none focus:border-slate-950 px-0 py-4 text-xl font-light italic tracking-tight transition-all placeholder:text-slate-200 resize-none"
                    placeholder={dict.messagePlaceholder}
                    required
                />
            </div>

            {status === "error" && (
                <div className="flex items-center gap-4 bg-red-50 p-6 border border-red-100">
                    <span className="material-symbols-outlined text-red-600">report</span>
                    <p className="text-[11px] font-black text-red-600 uppercase tracking-widest italic">
                        {!turnstileToken
                            ? (isFr ? "VEUILLEZ COMPLÉTER LE TEST DE SÉCURITÉ." : "PLEASE COMPLETE THE SECURITY CHECK.")
                            : (isFr
                                ? "UNE ERREUR EST SURVENUE. VEUILLEZ RÉESSAYER."
                                : "SOMETHING WENT WRONG. PLEASE TRY AGAIN.")
                        }
                    </p>
                </div>
            )}

            <div className="bg-slate-50 p-6 border border-slate-100">
                <TurnstileWidget
                    lang={lang}
                    onVerify={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken(null)}
                    onError={() => setTurnstileToken(null)}
                />
            </div>

            <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full h-20 bg-slate-950 hover:bg-slate-900 text-white rounded-none font-black uppercase tracking-[0.5em] text-[11px] transition-all disabled:opacity-40 shadow-2xl group border-none"
            >
                {status === "loading" ? (
                    <span className="flex items-center gap-4">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        {isFr ? "TRANSMISSION..." : "TRANSMITTING..."}
                    </span>
                ) : dict.submit}
            </Button>

            {/* Security Badges - Technical Styling */}
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 pt-6 opacity-30 border-t border-slate-50">
                <div className="flex items-center gap-3 text-slate-500 group/badge">
                    <span className="material-symbols-outlined text-[18px] font-light group-hover/badge:text-slate-950 transition-colors">encrypted</span>
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] italic leading-none">{dict.badges.secure}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 group/badge">
                    <span className="material-symbols-outlined text-[18px] font-light group-hover/badge:text-slate-950 transition-colors">verified_user</span>
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] italic leading-none">{dict.badges.confidential}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 group/badge">
                    <span className="material-symbols-outlined text-[18px] font-light group-hover/badge:text-slate-950 transition-colors">gavel</span>
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] italic leading-none">{dict.badges.compliance}</span>
                </div>
            </div>

            {/* Urgent Link - Technical Industrial CTA */}
            <div className="pt-12 border-t border-slate-100 text-center">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mb-6 italic">{dict.urgent.text}</p>
                <div
                    data-cal-link="stigmatech/30min"
                    className="inline-flex items-center gap-6 text-[11px] font-black text-slate-500 hover:text-slate-950 transition-all cursor-pointer group uppercase tracking-[0.4em] italic"
                >
                    <div className="w-12 h-12 bg-slate-50 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                        <span className="material-symbols-outlined text-[20px] group-hover:text-slate-950 transition-colors">calendar_month</span>
                    </div>
                    <span className="border-b border-transparent group-hover:border-slate-950 pb-1">{dict.urgent.cta}</span>
                </div>
            </div>
        </form>
    );
}

