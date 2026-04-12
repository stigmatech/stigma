"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TurnstileWidget } from "./turnstile-widget";
import { X } from "lucide-react";
import posthog from "posthog-js";

interface RegistrationModalProps {
    eventId: string;
    eventTitle: string;
    lang: string;
    dictionary: any;
    children?: React.ReactNode;
}

export function RegistrationModal({ eventId, eventTitle, lang, dictionary, children }: RegistrationModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const isFr = lang === "fr";
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const formDict = dictionary?.common?.events?.form || {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        company: "Company",
        website: "Website",
        submit: "Register",
        placeholders: {
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            website: "https://example.com"
        }
    };
    const dict = formDict;

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        websiteUrl: "",
    });

    if (!isOpen) return children ? <div onClick={() => setIsOpen(true)}>{children}</div> : null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!turnstileToken) {
            setError(isFr ? "Veuillez compléter le test de sécurité." : "Please complete the security check.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/events/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, eventId: eventId, lang, turnstileToken }),
            });

            if (!res.ok) throw new Error("registration_failed");
            posthog.identify(form.email, {
                email: form.email,
                first_name: form.firstName,
                last_name: form.lastName,
                company: form.company,
            });
            posthog.capture('event_registration_completed', {
                event_id: eventId,
                event_title: eventTitle,
                lang,
            });
            setSubmitted(true);
        } catch {
            posthog.captureException(new Error('event_registration_failed'));
            setError(isFr ? "Une erreur s'est produite. Veuillez réessayer." : "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="bg-white dark:bg-background-dark w-full max-w-md p-8 relative border border-white/10 shadow-2xl">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
                            <span className="material-symbols-outlined text-4xl">check_circle</span>
                        </div>
                        <h3 className="text-2xl font-bold">
                            {isFr ? "Inscription réussie !" : "Registration Successful!"}
                        </h3>
                        <p className="text-gray-400">
                            {isFr 
                                ? "Vous recevrez bientôt un email de confirmation avec les détails."
                                : "You will soon receive a confirmation email with the details."}
                        </p>
                        <Button onClick={onClose} className="w-full mt-4">
                            {isFr ? "Fermer" : "Close"}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-white dark:bg-background-dark w-full max-w-lg p-8 relative border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-background-dark dark:hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-display font-bold text-background-dark dark:text-white">
                            {isFr ? "S'inscrire à l'événement" : "Register for Event"}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            {eventTitle}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                    {dict.firstName}
                                </label>
                                <Input 
                                    required 
                                    placeholder={dict.placeholders.firstName} 
                                    value={form.firstName} 
                                    onChange={(e) => setForm({...form, firstName: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                    {dict.lastName}
                                </label>
                                <Input 
                                    required 
                                    placeholder={dict.placeholders.lastName} 
                                    value={form.lastName} 
                                    onChange={(e) => setForm({...form, lastName: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                {dict.email}
                            </label>
                            <Input 
                                required 
                                type="email" 
                                placeholder={dict.placeholders.email} 
                                value={form.email} 
                                onChange={(e) => setForm({...form, email: e.target.value})}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                {dict.company}
                            </label>
                            <Input 
                                placeholder="Your Company" 
                                value={form.company} 
                                onChange={(e) => setForm({...form, company: e.target.value})}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                {dict.website}
                            </label>
                            <Input 
                                type="url"
                                placeholder={dict.placeholders.website} 
                                value={form.websiteUrl} 
                                onChange={(e) => setForm({...form, websiteUrl: e.target.value})}
                            />
                        </div>

                        <div className="py-2">
                            <TurnstileWidget onVerify={setTurnstileToken} />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <Button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full bg-background-dark dark:bg-white dark:text-background-dark hover:bg-gray-800 dark:hover:bg-gray-200 h-12 text-xs uppercase tracking-[0.2em] font-black"
                        >
                            {loading ? (isFr ? "Chargement..." : "Loading...") : dict.submit}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
