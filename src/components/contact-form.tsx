"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TurnstileWidget } from "./turnstile-widget";

interface ContactFormProps {
    lang: string;
    dictionary: any;
    overrideDict?: any;
}

export function ContactForm({ lang, dictionary, overrideDict }: ContactFormProps) {
    const dict = overrideDict || dictionary?.common?.contactForm;
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
            setSubmitted(true);
        } catch {
            setError(isFr
                ? "Une erreur s'est produite. Veuillez réessayer ou nous contacter directement."
                : "An error occurred. Please try again or contact us directly.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <section className="py-24 bg-background-light relative overflow-hidden border-t border-background-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
                    <div className="w-16 h-16 bg-surface-dark rounded-none flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-white text-3xl">check</span>
                    </div>
                    <h3 className="text-3xl font-display font-bold text-background-dark mb-4">
                        {isFr ? "Message envoyé !" : "Message Sent!"}
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        {isFr
                            ? "Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais."
                            : "Thank you for contacting us. Our team will get back to you shortly."}
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className="py-24 bg-background-light relative overflow-hidden border-t border-background-light">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-surface-dark/5 -skew-x-12 transform origin-right" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Side Text */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-background-dark font-bold text-xs uppercase tracking-widest bg-gray-100 px-3 py-1 inline-block">
                                {dict.tag}
                            </span>
                            <h2 className="font-display text-5xl lg:text-7xl text-background-dark leading-[1.05]">
                                <span className="font-bold">{dict.title}</span>
                            </h2>
                            <p className="text-gray-500 font-light text-lg max-w-lg leading-relaxed">
                                {dict.description}
                            </p>
                        </div>

                        {/* Local Pride Badge */}
                        <div className="inline-flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 italic text-sm text-gray-600">
                            <span className="material-symbols-outlined text-background-dark">verified_user</span>
                            {isFr
                                ? "Basé à Montréal • Support 24/7 en français et anglais"
                                : "Based in Montreal • 24/7 support in English & French"
                            }
                        </div>

                        {/* Human Touch - Expert Image */}
                        <div className="flex items-center gap-6 pt-4">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                    <img
                                        src="/images/expert.png"
                                        alt="Expert IT"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full shadow-sm" />
                            </div>
                            <div>
                                <p className="font-bold text-background-dark">{isFr ? "Besoin d'aide immédiate ?" : "Need immediate help?"}</p>
                                <p className="text-sm text-gray-500">{isFr ? "Un architecte IT est en ligne actuellement." : "An IT architect is currently online."}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Strategic Contact Hub */}
                    <div className="space-y-6">

                        {/* Primary CTA - Book a Session */}
                        <div className="group bg-background-dark p-8 lg:p-10 relative overflow-hidden transition-all hover:bg-[#111827] border border-transparent shadow-[20px_20px_60px_rgba(0,0,0,0.1)]">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-white text-9xl">calendar_today</span>
                            </div>
                            <div className="relative z-10 space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                                        {dict.hub.bookTitle}
                                    </h3>
                                    <p className="text-gray-400 font-light text-sm max-w-sm">
                                        {dict.hub.bookDescription}
                                    </p>
                                </div>
                                <a
                                    href={`/${lang}/contact`}
                                    className="inline-flex items-center gap-3 bg-white text-background-dark px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-lg"
                                >
                                    {dict.hub.bookCta}
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </a>
                            </div>
                        </div>

                        {/* Secondary Channels Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Phone */}
                            <a href="tel:+15148301557" className="group bg-white p-6 border border-gray-100 hover:border-background-dark transition-all flex items-center gap-5 shadow-sm">
                                <div className="w-12 h-12 bg-gray-100 text-background-dark flex items-center justify-center group-hover:bg-background-dark group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">call</span>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{dict.hub.phoneLabel}</p>
                                    <p className="font-bold text-background-dark text-sm">+1 (514) 830-1557</p>
                                </div>
                            </a>

                            {/* Email */}
                            <a href="mailto:contact@stigmatech.ca" className="group bg-white p-6 border border-gray-100 hover:border-background-dark transition-all flex items-center gap-5 shadow-sm">
                                <div className="w-12 h-12 bg-gray-100 text-background-dark flex items-center justify-center group-hover:bg-background-dark group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{dict.hub.emailLabel}</p>
                                    <p className="font-bold text-background-dark text-sm">contact@stigmatech.ca</p>
                                </div>
                            </a>

                            {/* LinkedIN / Office - Full width below */}
                            <div className="sm:col-span-2 bg-gray-50 p-6 border border-gray-100 flex items-center justify-between gap-5">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-gray-200 text-gray-500 flex items-center justify-center">
                                        <span className="material-symbols-outlined">location_on</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{dict.hub.officeLabel}</p>
                                        <p className="text-xs text-gray-600">6205, Boul des Grandes-Prairies, QC H1P1A5</p>
                                    </div>
                                </div>
                                <a
                                    href="https://www.linkedin.com/company/stigmatech/"
                                    target="_blank"
                                    className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center text-surface-dark hover:bg-surface-dark hover:text-white transition-all shadow-sm"
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
