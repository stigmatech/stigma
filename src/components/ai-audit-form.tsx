"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TurnstileWidget } from "./turnstile-widget";

export function AIAuditForm({ dictionary, lang }: { dictionary: any; lang: string }) {
    const dict = dictionary.home.aiAudit.form;
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [contact, setContact] = useState({ name: "", email: "", phone: "", company: "" });
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const totalSteps = dict.steps.length;
    const isLastStep = step === totalSteps;

    const isMultiSelect = step === 1; // "Quelle est votre priorité actuelle?" is step 1

    const handleOptionSelect = (option: string) => {
        if (isMultiSelect) {
            setAnswers(prev => {
                const current = (prev[step] as string[]) || [];
                if (current.includes(option)) {
                    return { ...prev, [step]: current.filter(o => o !== option) };
                }
                return { ...prev, [step]: [...current, option] };
            });
        } else {
            setAnswers(prev => ({ ...prev, [step]: option }));
            setTimeout(() => setStep(step + 1), 300);
        }
    };

    const handleNextStep = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        }
    };

    const handleContactChange = (field: string, value: string) => {
        setContact(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!turnstileToken) {
            setError(lang === 'fr' ? "Veuillez compléter le test de sécurité." : "Please complete the security check.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            // Include survey answers and turnstile token in the payload
            const payload = {
                firstName: contact.name.split(' ')[0] || contact.name,
                lastName: contact.name.split(' ').slice(1).join(' ') || ' ',
                email: contact.email,
                phone: contact.phone,
                company: contact.company,
                service: "Audit IA",
                message: JSON.stringify(answers),
                turnstileToken
            };

            const res = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Submission failed");

            setIsSubmitted(true);
        } catch (err) {
            setError(lang === 'fr' ? "Une erreur est survenue. Veuillez réessayer." : "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="text-center py-12 animate-in fade-in duration-700">
                <div className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <h3 className="text-3xl font-display font-black text-[#0b0c10] mb-4">
                    {dict.success.title}
                </h3>
                <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                    {dict.success.message}
                </p>
                <div className="mt-10">
                    <Button
                        onClick={() => window.location.href = `/${lang}`}
                        className="bg-[#0b0c10] text-white px-8 py-4 rounded-none uppercase text-[10px] tracking-widest font-bold"
                    >
                        {lang === 'fr' ? 'Retour à l\'accueil' : 'Back to Home'}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            {/* Progress Bar */}
            {!isLastStep && (
                <div className="mb-12">
                    <div className="flex justify-between text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-2 font-display">
                        <span>Question {step + 1} / {totalSteps}</span>
                        <span>{Math.round(((step + 1) / totalSteps) * 100)}%</span>
                    </div>
                    <div className="h-1 bg-gray-100 w-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {step < totalSteps ? (
                /* Question Step */
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="mb-10 text-center md:text-left">
                        <h3 className="text-2xl md:text-3xl font-display font-black text-[#0b0c10] mb-2">
                            {dict.steps[step].question}
                        </h3>
                        {isMultiSelect && (
                            <p className="text-indigo-600/60 text-xs font-bold uppercase tracking-widest">
                                {lang === 'fr' ? '(Plusieurs choix possibles)' : '(Multiple choices possible)'}
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dict.steps[step].options.map((option: string) => {
                            const isSelected = isMultiSelect
                                ? (answers[step] as string[] || []).includes(option)
                                : answers[step] === option;

                            return (
                                <button
                                    key={option}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`p-6 text-left border transition-all duration-300 group hover:border-indigo-600 hover:shadow-lg ${isSelected ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-200 bg-white'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-indigo-600 font-bold' : 'text-[#0b0c10]'
                                            }`}>
                                            {option}
                                        </span>
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                                            }`}>
                                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-12 flex items-center justify-between">
                        {step > 0 ? (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#0b0c10] transition-colors flex items-center gap-2"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                                </svg>
                                {dict.back}
                            </button>
                        ) : <div></div>}

                        {isMultiSelect && (
                            <Button
                                onClick={handleNextStep}
                                disabled={!answers[step] || (answers[step] as string[]).length === 0}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-none uppercase text-[10px] tracking-widest font-bold shadow-lg"
                            >
                                {dict.next}
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                /* Contact Step */
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="text-center mb-10">
                        <h3 className="text-3xl font-display font-black text-[#0b0c10] mb-4">
                            {dict.contact.title}
                        </h3>
                        <p className="text-gray-500 font-light">
                            {dict.contact.description}
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
                        <Input
                            required
                            placeholder={dict.contact.namePlaceholder}
                            value={contact.name}
                            onChange={(e) => handleContactChange('name', e.target.value)}
                            className="h-14 rounded-none border-gray-200 focus:border-indigo-600 focus:ring-0"
                        />
                        <Input
                            required
                            type="email"
                            placeholder={dict.contact.emailPlaceholder}
                            value={contact.email}
                            onChange={(e) => handleContactChange('email', e.target.value)}
                            className="h-14 rounded-none border-gray-200 focus:border-indigo-600 focus:ring-0"
                        />
                        <Input
                            required
                            type="tel"
                            placeholder={dict.contact.phonePlaceholder}
                            value={contact.phone}
                            onChange={(e) => handleContactChange('phone', e.target.value)}
                            className="h-14 rounded-none border-gray-200 focus:border-indigo-600 focus:ring-0"
                        />
                        <Input
                            required
                            placeholder={dict.contact.companyPlaceholder}
                            value={contact.company}
                            onChange={(e) => handleContactChange('company', e.target.value)}
                            className="h-14 rounded-none border-gray-200 focus:border-indigo-600 focus:ring-0"
                        />

                        {error && (
                            <p className="text-red-500 text-[10px] font-bold uppercase text-center mb-4 animate-in fade-in slide-in-from-top-1">
                                {error}
                            </p>
                        )}

                        <TurnstileWidget
                            lang={lang}
                            onVerify={(token) => setTurnstileToken(token)}
                            onExpire={() => setTurnstileToken(null)}
                            onError={() => setTurnstileToken(null)}
                        />

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-[0.2em] text-[10px] rounded-none shadow-xl transition-all"
                            >
                                {loading ? (lang === 'fr' ? 'Analyse en cours...' : 'Analyzing...') : dict.contact.submit}
                            </Button>
                        </div>

                        <button
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="w-full text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#0b0c10] transition-colors"
                        >
                            {dict.back}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
