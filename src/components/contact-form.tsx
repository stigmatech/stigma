"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TurnstileWidget } from "./turnstile-widget";
import posthog from "posthog-js";

interface ContactFormProps {
    lang: string;
    dictionary: any;
    overrideDict?: any;
    initialMessage?: string;
    variant?: "default" | "elite";
}

export function ContactForm({ lang, dictionary, overrideDict, initialMessage, variant = "default" }: ContactFormProps) {
    const isElite = variant === "elite";
    const commonDict = dictionary?.common?.contactForm;
    const dict = {
        ...commonDict,
        ...overrideDict
    };
    const isFr = lang === "fr";

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
    });

    // Sync initialMessage with form state if provided
    useEffect(() => {
        if (initialMessage) {
            setForm(prev => ({ ...prev, message: initialMessage }));
        }
    }, [initialMessage]);

    const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm(prev => ({ ...prev, [field]: e.target.value }));

    if (!dict) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!turnstileToken) {
            setError(isFr ? "Veuillez compléter le test de sécurité." : "Please complete the security check.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, turnstileToken }),
            });
            if (!res.ok) throw new Error("send_failed");
            posthog.identify(form.email, {
                email: form.email,
                first_name: form.firstName,
                last_name: form.lastName,
            });
            posthog.capture('contact_form_submitted', {
                subject: form.subject,
                lang,
            });
            setSubmitted(true);
        } catch {
            posthog.captureException(new Error('contact_form_submission_failed'));
            setError(isFr
                ? "Une erreur s'est produite. Veuillez réessayer ou nous contacter directement."
                : "An error occurred. Please try again or contact us directly.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <section className={`py-24 relative overflow-hidden border-t ${isElite ? 'bg-slate-950 border-white/5' : 'bg-background-light border-background-light'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
                    <div className={`w-16 h-16 rounded-none flex items-center justify-center mx-auto mb-6 ${isElite ? 'bg-white text-slate-950' : 'bg-surface-dark text-white'}`}>
                        <span className="material-symbols-outlined text-3xl">check</span>
                    </div>
                    <h3 className={`text-3xl font-display font-bold mb-4 ${isElite ? 'text-white' : 'text-background-dark'}`}>
                        {isFr ? "Message envoyé !" : "Message Sent!"}
                    </h3>
                    <p className={`max-w-md mx-auto ${isElite ? 'text-slate-400' : 'text-gray-500'}`}>
                        {isFr
                            ? "Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais."
                            : "Thank you for contacting us. Our team will get back to you shortly."}
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className={`py-24 relative overflow-hidden border-t ${isElite ? 'bg-slate-950 border-white/5' : 'bg-background-light border-background-light'}`}>
            {/* Background pattern */}
            <div className={`absolute top-0 right-0 w-1/2 h-full -skew-x-12 transform origin-right ${isElite ? 'bg-white/5' : 'bg-surface-dark/5'}`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Side Text */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className={`font-black text-[9px] uppercase tracking-[0.3em] px-4 py-1.5 inline-block border ${
                                isElite ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-100 text-background-dark border-transparent'
                            }`}>
                                {dict.tag}
                            </span>
                            <h2 className={`font-display text-5xl lg:text-7xl leading-[1.05] uppercase tracking-tighter italic ${isElite ? 'text-white font-black' : 'text-background-dark font-bold'}`}>
                                {dict.title}
                            </h2>
                            <p className={`font-light text-lg max-w-lg leading-relaxed tracking-tight ${isElite ? 'text-slate-400' : 'text-gray-500'}`}>
                                {dict.description}
                            </p>
                        </div>

                        {/* Enterprise Ready Badge */}
                        <div className={`inline-flex items-center gap-4 p-5 border italic text-sm ${
                            isElite ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-gray-50 border-gray-100 text-gray-600'
                        }`}>
                            <span className={`material-symbols-outlined ${isElite ? 'text-white' : 'text-background-dark'}`}>verified_user</span>
                            {isFr
                                ? "Partenaire Entreprise • Support 24/7 en français et anglais"
                                : "Enterprise Ready • 24/7 Global Support"
                            }
                        </div>

                        {/* Human Touch - Expert Image */}
                        <div className="flex items-center gap-6 pt-6">
                            <div className="relative">
                                <div className={`w-20 h-20 rounded-full overflow-hidden border-4 shadow-xl ${isElite ? 'border-white/10' : 'border-white'}`}>
                                    <img
                                        src="/images/expert.png"
                                        alt="Expert IT"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full shadow-sm" />
                            </div>
                            <div>
                                <p className={`font-black uppercase tracking-tight ${isElite ? 'text-white' : 'text-background-dark'}`}>{isFr ? "Besoin d'aide immédiate ?" : "Need immediate help?"}</p>
                                <p className={`text-sm font-light ${isElite ? 'text-slate-400' : 'text-gray-500'}`}>{isFr ? "Un architecte IT est en ligne actuellement." : "An IT architect is currently online."}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Strategic Contact Hub */}
                    <div className="space-y-6">

                        {/* Primary CTA - Book a Session */}
                        <div className={`group p-8 lg:p-12 relative overflow-hidden transition-all border ${
                            isElite 
                            ? 'bg-white border-transparent' 
                            : 'bg-background-dark hover:bg-[#111827] border-transparent shadow-[20px_20px_60px_rgba(0,0,0,0.1)]'
                        }`}>
                            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform ${isElite ? 'text-slate-950' : 'text-white'}`}>
                                <span className="material-symbols-outlined text-9xl">calendar_today</span>
                            </div>
                            <div className="relative z-10 space-y-6 text-center lg:text-left">
                                <div className="space-y-2">
                                    <h3 className={`text-2xl lg:text-3xl font-black uppercase tracking-tighter ${isElite ? 'text-slate-950' : 'text-white'}`}>
                                        {dict.hub.bookTitle}
                                    </h3>
                                    <p className={`font-light text-sm max-w-sm mx-auto lg:mx-0 ${isElite ? 'text-slate-600' : 'text-gray-400'}`}>
                                        {dict.hub.bookDescription}
                                    </p>
                                </div>
                                <a
                                    href="https://cal.com/stigmatech/30min"
                                    target="_blank"
                                    className={`inline-flex items-center gap-4 px-10 py-5 font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl ${
                                        isElite ? 'bg-slate-950 text-white hover:bg-slate-900' : 'bg-white text-background-dark hover:bg-gray-100'
                                    }`}
                                >
                                    {dict.hub.bookCta}
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </a>
                            </div>
                        </div>

                        {/* Secondary Channels Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Phone */}
                            <a href="tel:+18555521005" className={`group p-6 border transition-all flex items-center gap-5 shadow-sm ${
                                isElite ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-100 hover:border-background-dark'
                            }`}>
                                <div className={`w-12 h-12 flex items-center justify-center transition-colors ${
                                    isElite ? 'bg-white text-slate-950' : 'bg-gray-100 text-background-dark group-hover:bg-background-dark group-hover:text-white'
                                }`}>
                                    <span className="material-symbols-outlined">call</span>
                                </div>
                                <div>
                                    <p className={`text-[9px] uppercase tracking-widest font-black ${isElite ? 'text-slate-500' : 'text-gray-400'}`}>{dict.hub.phoneLabel}</p>
                                    <p className={`font-black text-sm ${isElite ? 'text-white' : 'text-background-dark'}`}>+1 855-552-1005</p>
                                </div>
                            </a>

                            {/* Email */}
                            <a href="mailto:contact@stigmatech.ca" className={`group p-6 border transition-all flex items-center gap-5 shadow-sm ${
                                isElite ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-100 hover:border-background-dark'
                            }`}>
                                <div className={`w-12 h-12 flex items-center justify-center transition-colors ${
                                    isElite ? 'bg-white text-slate-950' : 'bg-gray-100 text-background-dark group-hover:bg-background-dark group-hover:text-white'
                                }`}>
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                                <div>
                                    <p className={`text-[9px] uppercase tracking-widest font-black ${isElite ? 'text-slate-500' : 'text-gray-400'}`}>{dict.hub.emailLabel}</p>
                                    <p className={`font-black text-sm ${isElite ? 'text-white' : 'text-background-dark'}`}>contact@stigmatech.ca</p>
                                </div>
                            </a>

                            {/* LinkedIN / Office - Full width below */}
                            <div className={`sm:col-span-2 p-6 border flex items-center justify-between gap-5 ${
                                isElite ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'
                            }`}>
                                <div className="flex items-center gap-5">
                                    <div className={`w-12 h-12 flex items-center justify-center ${isElite ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                        <span className="material-symbols-outlined">location_on</span>
                                    </div>
                                    <div>
                                        <p className={`text-[9px] uppercase tracking-widest font-black ${isElite ? 'text-slate-500' : 'text-gray-400'}`}>{dict.hub.officeLabel}</p>
                                        <p className={`text-xs ${isElite ? 'text-slate-400' : 'text-gray-600'}`}>
                                            {dictionary.common.footer.address}, {dictionary.common.footer.addressSubtitle}
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href="https://www.linkedin.com/company/stigmatech/"
                                    target="_blank"
                                    className={`w-11 h-11 border flex items-center justify-center transition-all shadow-sm ${
                                        isElite ? 'bg-white text-slate-950 border-transparent hover:bg-slate-200' : 'bg-white border-gray-200 text-surface-dark hover:bg-surface-dark hover:text-white'
                                    }`}
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                </a>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
