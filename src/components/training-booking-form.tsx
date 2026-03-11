"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { TurnstileWidget } from "./turnstile-widget";

interface TrainingBookingFormProps {
    lang: string;
    courseTitle?: string;
}

export function TrainingBookingForm({ lang, courseTitle }: TrainingBookingFormProps) {
    const isFr = lang === "fr";
    const [groupType, setGroupType] = useState<"employees" | "executives" | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [subsidyHelp, setSubsidyHelp] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const [form, setForm] = useState({
        firstName: "", lastName: "", email: "", phone: "",
        company: "", participants: "", preferredDate: "",
    });

    const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setForm(prev => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!groupType) return;

        if (!turnstileToken) {
            setError(isFr ? "Veuillez compléter le test de sécurité." : "Please complete the security check.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/training-booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, groupType, courseTitle, subsidyHelp, lang, turnstileToken }),
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
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-surface-dark border-2 border-surface-dark rounded-none flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-white text-3xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-bold text-background-dark mb-3">
                    {isFr ? "Demande envoyée !" : "Request Sent!"}
                </h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                    {isFr
                        ? "Notre équipe vous contactera dans les 24 heures ouvrables pour confirmer votre réservation et discuter des subventions disponibles."
                        : "Our team will contact you within 24 business hours to confirm your booking and discuss available subsidies."}
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl w-full">
            {/* Group Type Selector */}
            <div className="space-y-4">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                    {isFr ? "1. Type de groupe*" : "1. Group Type*"}
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => setGroupType("employees")}
                        className={`group p-6 rounded-none border text-left transition-all duration-300 relative overflow-hidden ${groupType === "employees"
                            ? "border-surface-dark bg-gray-50/50"
                            : "border-gray-100 bg-white hover:border-gray-300"
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-none flex items-center justify-center mb-4 transition-colors ${groupType === "employees" ? "bg-surface-dark text-white" : "bg-gray-50 text-gray-400 border border-gray-100"}`}>
                            <span className="material-symbols-outlined text-2xl">groups</span>
                        </div>
                        <p className={`text-base font-bold transition-colors ${groupType === "employees" ? "text-surface-dark" : "text-gray-400"}`}>
                            {isFr ? "Employés" : "Employees"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            {isFr ? "Formation jusqu'à 15 participants" : "Training for up to 15 participants"}
                        </p>
                        {groupType === "employees" && (
                            <div className="absolute top-4 right-4 text-surface-dark">
                                <span className="material-symbols-outlined text-lg">check_circle</span>
                            </div>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => setGroupType("executives")}
                        className={`group p-6 rounded-none border text-left transition-all duration-300 relative overflow-hidden ${groupType === "executives"
                            ? "border-surface-dark bg-gray-50/50"
                            : "border-gray-100 bg-white hover:border-gray-300"
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-none flex items-center justify-center mb-4 transition-colors ${groupType === "executives" ? "bg-surface-dark text-white" : "bg-gray-50 text-gray-400 border border-gray-100"}`}>
                            <span className="material-symbols-outlined text-2xl">manage_accounts</span>
                        </div>
                        <p className={`text-base font-bold transition-colors ${groupType === "executives" ? "text-surface-dark" : "text-gray-400"}`}>
                            {isFr ? "Dirigeants" : "Executives"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            {isFr ? "Format stratégique (min. 5)" : "Strategic format (min. 5)"}
                        </p>
                        {groupType === "executives" && (
                            <div className="absolute top-4 right-4 text-surface-dark">
                                <span className="material-symbols-outlined text-lg">check_circle</span>
                            </div>
                        )}
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
                    {isFr ? "2. Vos coordonnées" : "2. Your Contact Info"}
                </p>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">{isFr ? "Prénom*" : "First Name*"}</label>
                        <Input required value={form.firstName} onChange={set("firstName")}
                            placeholder={`${isFr ? "Prénom" : "First Name"}*`}
                            className="bg-transparent border-t-0 border-r-0 border-l-0 border-b border-gray-300 rounded-none h-12 focus-visible:ring-0 focus-visible:border-black px-0 transition-all font-light" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">{isFr ? "Nom*" : "Last Name*"}</label>
                        <Input required value={form.lastName} onChange={set("lastName")}
                            placeholder={`${isFr ? "Nom" : "Last Name"}*`}
                            className="bg-transparent border-t-0 border-r-0 border-l-0 border-b border-gray-300 rounded-none h-12 focus-visible:ring-0 focus-visible:border-black px-0 transition-all font-light" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">{isFr ? "Courriel professionnel*" : "Business Email*"}</label>
                        <Input required type="email" value={form.email} onChange={set("email")}
                            placeholder={`${isFr ? "Courriel professionnel" : "Business Email"}*`}
                            className="bg-transparent border-t-0 border-r-0 border-l-0 border-b border-gray-300 rounded-none h-12 focus-visible:ring-0 focus-visible:border-black px-0 transition-all font-light" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">{isFr ? "Téléphone" : "Phone Number"}</label>
                        <Input type="tel" value={form.phone} onChange={set("phone")}
                            placeholder={`${isFr ? "Téléphone" : "Phone Number"}`}
                            className="bg-transparent border-t-0 border-r-0 border-l-0 border-b border-gray-300 rounded-none h-12 focus-visible:ring-0 focus-visible:border-black px-0 transition-all font-light" />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">{isFr ? "Nom de l'entreprise*" : "Company Name*"}</label>
                        <Input required value={form.company} onChange={set("company")}
                            placeholder={`${isFr ? "Nom de l'entreprise" : "Company Name"}*`}
                            className="bg-transparent border-t-0 border-r-0 border-l-0 border-b border-gray-300 rounded-none h-12 focus-visible:ring-0 focus-visible:border-black px-0 transition-all font-light" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Number of Participants */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                            {isFr ? "Nombre de participants*" : "Number of Participants*"}
                        </label>
                        <div className="relative">
                            <select required value={form.participants} onChange={set("participants")}
                                className="w-full bg-transparent border-t-0 border-r-0 border-l-0 border-b border-gray-300 rounded-none h-12 text-sm text-gray-500 px-0 focus:outline-none focus:border-black appearance-none transition-all font-light">
                                <option value="">{isFr ? "Nombre de participants*" : "Number of Participants*"}</option>
                                <option value="5-7">5 – 7</option>
                                <option value="8-10">8 – 10</option>
                                <option value="11-15">11 – 15</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 text-[20px] pointer-events-none">expand_more</span>
                        </div>
                    </div>

                    {/* Preferred Date */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                            {isFr ? "Date souhaitée" : "Preferred Date"}
                        </label>
                        <Input type="date" value={form.preferredDate} onChange={set("preferredDate")}
                            className="bg-transparent border-t-0 border-r-0 border-l-0 border-b border-gray-300 rounded-none h-12 focus-visible:ring-0 focus-visible:border-black px-0 transition-all font-light text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Combined Box for selection and options */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
                {courseTitle && (
                    <div className="bg-gray-50 border-l-4 border-surface-dark rounded-none p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-none bg-surface-dark text-white flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-xl">school</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{isFr ? "Formation sélectionnée" : "Selected Course"}</p>
                                <p className="text-sm font-bold text-surface-dark">{courseTitle}</p>
                            </div>
                        </div>
                        <div className="hidden md:block px-3 py-1 border border-gray-200 text-gray-500 rounded-none text-[10px] font-bold uppercase tracking-wider leading-none">
                            {isFr ? "Validation requise" : "Validation required"}
                        </div>
                    </div>
                )}

                {/* Subsidy Interest */}
                <div className="p-0 border-none space-y-4">
                    <div className="flex items-start gap-3">
                        <Checkbox id="subsidy-help" checked={subsidyHelp}
                            onCheckedChange={(v) => setSubsidyHelp(v === true)} className="mt-1 h-5 w-5 rounded-none border-gray-300 data-[state=checked]:bg-surface-dark data-[state=checked]:border-surface-dark" />
                        <label htmlFor="subsidy-help" className="text-[12px] text-gray-500 font-light cursor-pointer leading-relaxed">
                            {isFr
                                ? "Je souhaite être accompagné(e) pour les demandes de subventions (Scale AI, ESSOR, DEC, etc.)"
                                : "I would like guidance on grant applications (Scale AI, ESSOR, DEC, etc.)"}
                        </label>
                    </div>

                    <div className="flex items-start gap-3">
                        <Checkbox id="privacy-booking" required className="mt-1 h-5 w-5 rounded-none border-gray-300 data-[state=checked]:bg-surface-dark data-[state=checked]:border-surface-dark" />
                        <label htmlFor="privacy-booking" className="text-[10px] text-gray-400 font-light leading-tight cursor-pointer">
                            {isFr
                                ? "J'ai lu et j'accepte la politique de confidentialité concernant le traitement des données personnelles.*"
                                : "I have read and accept the privacy policy regarding the processing of personal data.*"}
                        </label>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 text-xs px-5 py-4 rounded-none flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl shrink-0">report</span>
                    {error}
                </div>
            )}

            <TurnstileWidget
                lang={lang}
                onVerify={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken(null)}
                onError={() => setTurnstileToken(null)}
            />

            <div className="pt-4">
                <Button type="submit" disabled={!groupType || loading}
                    className="w-full h-16 rounded-none font-bold text-xs uppercase tracking-[0.2em] bg-surface-dark hover:bg-background-dark text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? (
                        <span className="flex items-center gap-3">
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            {isFr ? "Traitement en cours..." : "Processing..."}
                        </span>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-[20px] mr-3">rocket_launch</span>
                            {isFr ? "Confirmer ma réservation" : "Confirm My Booking"}
                        </>
                    )}
                </Button>

                {!groupType && (
                    <p className="text-xs text-center text-gray-400 mt-4 font-medium italic">
                        {isFr ? "* Sélectionnez un format (Employés ou Dirigeants) pour débloquer le formulaire." : "* Select a format (Employees or Executives) to unlock the form."}
                    </p>
                )}
            </div>
        </form>
    );
}
