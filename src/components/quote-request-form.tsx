"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { getCalApi } from "@calcom/embed-react";
import { TurnstileWidget } from "./turnstile-widget";

interface QuoteRequestFormProps {
    lang: string;
}

export function QuoteRequestForm({ lang }: QuoteRequestFormProps) {
    const isFr = lang === "fr";

    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    // Initialize Cal.com popup
    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", {
                styles: { branding: { brandColor: "#0F2D2B" } },
                hideEventTypeDetails: false,
                layout: "month_view"
            });
        })();
    }, []);

    const [form, setForm] = useState({
        service: "",
        specificNeeds: [] as string[],
        industry: "",
        companySize: "",
        itSetup: "",
        timeline: "",
        firstName: "",
        lastName: "",
        jobTitle: "",
        email: "",
        phone: "",
        company: "",
        message: "",
    });

    const setField = (field: string, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setField(field, e.target.value);
    };

    const toggleSpecificNeed = (need: string) => {
        setForm(prev => {
            const needs = prev.specificNeeds.includes(need)
                ? prev.specificNeeds.filter(n => n !== need)
                : [...prev.specificNeeds, need];
            return { ...prev, specificNeeds: needs };
        });
    };

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
                body: JSON.stringify({
                    ...form,
                    subject: `Nouveau Lead: ${form.service} - ${form.company}`,
                    turnstileToken
                }),
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

    const services = [
        { id: "managed-it", label: isFr ? "Services Informatiques Gérés" : "Managed IT Services", icon: "computer" },
        { id: "cybersecurity", label: isFr ? "Cybersécurité" : "Cybersecurity", icon: "shield_lock" },
        { id: "ai", label: isFr ? "IA & Machine Learning" : "AI & Machine Learning", icon: "psychology" },
        { id: "cloud", label: isFr ? "Cloud Computing & Migration" : "Cloud Computing & Migration", icon: "cloud" },
        { id: "other", label: isFr ? "Autre / Stratégie Globale" : "Other / Global Strategy", icon: "strategy" },
    ];

    const getSpecificNeedsForService = () => {
        if (form.service.includes("IT") || form.service.includes("Informatique")) return [
            isFr ? "Support Technique (Helpdesk)" : "Technical Support (Helpdesk)",
            isFr ? "Gestion des Serveurs & Réseau" : "Server & Network Management",
            isFr ? "Achat de Matériel/Licences" : "Hardware/Software Procurement",
            isFr ? "Directeur TI Virtuel (vCIO)" : "Virtual CIO (vCIO)",
            isFr ? "Sauvegarde & Continuité d'Affaires" : "Backup & Business Continuity"
        ];
        if (form.service.includes("Cyber")) return [
            isFr ? "Audit de Sécurité" : "Security Audit",
            isFr ? "Détection et Réponse (EDR/XDR)" : "Detection & Response (EDR/XDR)",
            isFr ? "Sensibilisation des employés" : "Employee Security Awareness",
            isFr ? "Conformité (Loi 25, ISO 27001)" : "Compliance (Loi 25, ISO)",
            isFr ? "Tests de Pénétration" : "Penetration Testing"
        ];
        if (form.service.includes("IA") || form.service.includes("AI")) return [
            isFr ? "Automatisation des processus (RPA)" : "Process Automation (RPA)",
            isFr ? "Agents IA / Chatbots" : "AI Agents / Chatbots",
            isFr ? "Analyse de données prédictive" : "Predictive Data Analysis",
            isFr ? "Formation des employés à l'IA" : "Employee AI Training",
            isFr ? "Outils Microsoft Copilot" : "Microsoft Copilot Tools"
        ];
        return [
            isFr ? "Optimisation des coûts" : "Cost Optimization",
            isFr ? "Migration vers le Cloud (Azure/AWS)" : "Cloud Migration (Azure/AWS)",
            isFr ? "Planification stratégique" : "Strategic Planning",
            isFr ? "Autre (Veuillez préciser à la fin)" : "Other (Please specify at the end)"
        ];
    };

    const industries = isFr ? [
        "Finance / Assurances", "Santé / Dentaire", "Manufacturier", "Logistique / Distribution",
        "Aérospatiale", "Commerce de détail", "Services Professionnels", "Construction / Immobilier", "Technologie", "Autre"
    ] : [
        "Finance / Insurance", "Healthcare / Dental", "Manufacturing", "Logistics / Distribution",
        "Aerospace", "Retail", "Professional Services", "Construction / Real Estate", "Technology", "Other"
    ];

    const companySizes = ["1-10", "11-50", "51-200", "201-500", "500+"];

    const itSetups = isFr ? [
        "Équipe interne 100%", "Partenaire externe exclusif", "Hybride (Interne + Externe)", "Aucun support TI dédié"
    ] : [
        "100% In-house team", "Exclusive External Partner", "Hybrid (In-house + External)", "No dedicated IT support"
    ];

    const timelines = isFr ? [
        "Immédiatement (Urgence)", "Dans les 1-3 mois", "Dans les 3-6 mois", "Exploration / Plus de 6 mois"
    ] : [
        "Immediately (Emergency)", "Within 1-3 months", "Within 3-6 months", "Exploration / 6+ months"
    ];

    if (submitted) {
        return (
            <div className="bg-white p-8 lg:p-16 shadow-2xl border border-gray-100 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 pointer-events-none"></div>
                <div className="w-24 h-24 bg-surface-dark flex items-center justify-center mx-auto mb-8 relative z-10 shadow-xl shadow-gray-900/10">
                    <span className="material-symbols-outlined text-white text-5xl">task_alt</span>
                </div>
                <h3 className="text-4xl font-display font-bold text-background-dark mb-6 relative z-10">
                    {isFr ? "Demande transmise avec succès." : "Request Successfully Submitted."}
                </h3>
                <p className="text-gray-500 max-w-xl mx-auto relative z-10 text-lg">
                    {isFr
                        ? "Merci d'avoir pris le temps de nous détailler vos besoins. Un expert Stigma analysera vos informations et vous contactera dans les prochaines heures avec des recommandations préliminaires."
                        : "Thank you for detailing your needs. A Stigma expert will review your information and contact you within the next few hours with preliminary recommendations."}
                </p>
                <div className="mt-12 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button asChild className="bg-surface-dark hover:bg-background-dark text-white rounded-none px-10 py-7 uppercase tracking-widest font-bold text-xs transition-colors shadow-xl shadow-gray-900/10 cursor-pointer">
                        <div data-cal-link="stigmatech/30min">
                            <span className="material-symbols-outlined mr-3 text-lg">calendar_month</span>
                            {isFr ? "Planifier l'appel maintenant" : "Schedule the call now"}
                        </div>
                    </Button>
                    <a href={`/${lang}`} className="text-sm font-bold text-gray-400 hover:text-surface-dark uppercase tracking-widest transition-colors underline-offset-4 hover:underline">
                        {isFr ? "Retour à l'accueil" : "Back to Home"}
                    </a>
                </div>
            </div>
        );
    }

    const renderProgress = () => (
        <div className="mb-12">
            <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-surface-dark">
                    {isFr ? `Étape ${step} sur 5` : `Step ${step} of 5`}
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
                    {step === 1 && (isFr ? "Besoins" : "Needs")}
                    {step === 2 && (isFr ? "Détails" : "Details")}
                    {step === 3 && (isFr ? "Écosystème" : "Ecosystem")}
                    {step === 4 && (isFr ? "Échéancier" : "Timeline")}
                    {step === 5 && (isFr ? "Contact" : "Contact")}
                </span>
            </div>
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={cn(
                        "h-1.5 flex-1 transition-all duration-500 ease-out",
                        step >= i ? "bg-surface-dark" : "bg-gray-100",
                        step === i ? "scale-y-150" : ""
                    )} />
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-white p-6 lg:p-14 shadow-[0_20px_50px_rgba(10,15,44,0.05)] border border-gray-100 relative">
            {renderProgress()}

            <div className="mb-10 lg:mb-12">
                <h2 className="text-3xl lg:text-4xl font-display font-medium text-surface-dark leading-tight">
                    {step === 1 && (isFr ? "Quel est le défi principal de votre entreprise ?" : "What is your company's main challenge?")}
                    {step === 2 && (isFr ? "Préçisons vos besoins concernant : " : "Let's specify your needs for : ")}
                    {step === 2 && <span className="font-bold text-surface-dark text-2xl lg:text-3xl block mt-2">{form.service}</span>}
                    {step === 3 && (isFr ? "Comprendre votre environnement actuel" : "Understanding your current environment")}
                    {step === 4 && (isFr ? "Quel est votre horizon de temps ?" : "What is your timeline?")}
                    {step === 5 && (isFr ? "Où devons-nous envoyer notre analyse ?" : "Where should we send our analysis?")}
                </h2>
                {step === 3 && <p className="text-gray-500 mt-4 text-sm">{isFr ? "Ces informations nous aident à associer le bon expert à votre dossier." : "This information helps us pair the right expert with your case."}</p>}
                {step === 5 && <p className="text-gray-500 mt-4 text-sm">{isFr ? "Dernière étape ! Promis, nous ne spammerons pas votre boîte de réception." : "Final step! We promise not to spam your inbox."}</p>}
            </div>

            <form onSubmit={step === 5 ? handleSubmit : (e) => { e.preventDefault(); setStep(step + 1); }} className="space-y-8">

                {/* STEP 1: Main Service */}
                {step === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {services.map(s => (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => {
                                    setField("service", s.label);
                                    setField("specificNeeds", []); // reset needs when changing service
                                    setTimeout(() => setStep(2), 300);
                                }}
                                className={cn(
                                    "p-6 text-left border border-gray-100 transition-all duration-300 hover:border-surface-dark hover:shadow-lg group flex items-start gap-5",
                                    form.service === s.label ? "border-surface-dark bg-gray-50 ring-1 ring-surface-dark" : ""
                                )}
                            >
                                <span className={cn(
                                    "material-symbols-outlined text-[28px] transition-colors",
                                    form.service === s.label ? "text-surface-dark" : "text-gray-300 group-hover:text-gray-400"
                                )}>
                                    {s.icon}
                                </span>
                                <div>
                                    <span className={cn(
                                        "font-bold text-base block mt-1 transition-colors",
                                        form.service === s.label ? "text-surface-dark" : "text-gray-600 group-hover:text-surface-dark"
                                    )}>
                                        {s.label}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* STEP 2: Specific Needs (Dynamic) */}
                {step === 2 && (
                    <div className="space-y-4">
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{isFr ? "Sélectionnez tout ce qui s'applique :" : "Select all that apply:"}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {getSpecificNeedsForService().map(need => (
                                <button
                                    key={need}
                                    type="button"
                                    onClick={() => toggleSpecificNeed(need)}
                                    className={cn(
                                        "p-5 text-left border transition-all duration-200 flex items-center justify-between group",
                                        form.specificNeeds.includes(need) ? "border-surface-dark bg-gray-50/50" : "border-gray-100 hover:border-gray-300"
                                    )}
                                >
                                    <span className={cn(
                                        "font-medium text-sm transition-colors",
                                        form.specificNeeds.includes(need) ? "text-surface-dark" : "text-gray-600 group-hover:text-surface-dark"
                                    )}>
                                        {need}
                                    </span>
                                    <div className={cn(
                                        "w-5 h-5 border flex items-center justify-center transition-colors",
                                        form.specificNeeds.includes(need) ? "border-surface-dark bg-surface-dark" : "border-gray-300 bg-white"
                                    )}>
                                        {form.specificNeeds.includes(need) && <span className="material-symbols-outlined text-white text-[16px]">check</span>}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* STEP 3: Ecosystem (Industry, Size, Setup) */}
                {step === 3 && (
                    <div className="space-y-8">
                        <div>
                            <label className="block text-xs font-bold text-surface-dark uppercase tracking-widest mb-3">{isFr ? "Votre secteur d'activité" : "Your Industry"}</label>
                            <select
                                value={form.industry}
                                onChange={handleInputChange("industry")}
                                className="w-full bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-gray-200 rounded-none h-14 focus-visible:ring-0 focus:border-surface-dark md:text-lg appearance-none cursor-pointer"
                                required
                            >
                                <option value="" disabled>{isFr ? "Sélectionnez un secteur..." : "Select an industry..."}</option>
                                {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-surface-dark uppercase tracking-widest mb-3">{isFr ? "Taille de l'entreprise" : "Company Size"}</label>
                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                                {companySizes.map(size => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => setField("companySize", size)}
                                        className={cn(
                                            "py-3 text-center border transition-all duration-200 font-bold text-sm",
                                            form.companySize === size ? "border-surface-dark bg-surface-dark text-white" : "border-gray-200 text-gray-500 hover:border-surface-dark hover:text-surface-dark"
                                        )}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-surface-dark uppercase tracking-widest mb-3">{isFr ? "Gestion TI Actuelle" : "Current IT Management"}</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {itSetups.map(setup => (
                                    <button
                                        key={setup}
                                        type="button"
                                        onClick={() => setField("itSetup", setup)}
                                        className={cn(
                                            "p-4 text-left border transition-all duration-200 text-sm",
                                            form.itSetup === setup ? "border-surface-dark bg-gray-50 font-bold text-surface-dark" : "border-gray-200 text-gray-500 hover:border-surface-dark hover:text-surface-dark"
                                        )}
                                    >
                                        {setup}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 4: Timeline */}
                {step === 4 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {timelines.map((time, idx) => (
                            <button
                                key={time}
                                type="button"
                                onClick={() => {
                                    setField("timeline", time);
                                    setTimeout(() => setStep(5), 300);
                                }}
                                className={cn(
                                    "p-6 lg:p-8 text-left border transition-all duration-300 group relative overflow-hidden",
                                    form.timeline === time ? "border-surface-dark bg-gray-50" : "border-gray-100 hover:border-surface-dark"
                                )}
                            >
                                <span className={cn(
                                    "font-bold text-lg lg:text-xl block relative z-10 transition-colors",
                                    form.timeline === time ? "text-surface-dark" : "text-gray-600 group-hover:text-surface-dark"
                                )}>
                                    {time}
                                </span>
                                {idx === 0 && <span className="absolute top-0 right-0 bg-red-600 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1">Priorité</span>}
                            </button>
                        ))}
                    </div>
                )}

                {/* STEP 5: Contact Info */}
                {step === 5 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{isFr ? "Prénom*" : "First Name*"}</label>
                                <Input value={form.firstName} onChange={handleInputChange("firstName")} required className="bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-gray-200 rounded-none h-12 focus-visible:ring-0 focus-visible:border-surface-dark px-0 md:text-lg transition-colors" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{isFr ? "Nom*" : "Last Name*"}</label>
                                <Input value={form.lastName} onChange={handleInputChange("lastName")} required className="bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-gray-200 rounded-none h-12 focus-visible:ring-0 focus-visible:border-surface-dark px-0 md:text-lg transition-colors" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{isFr ? "Courriel professionnel*" : "Work Email*"}</label>
                                <Input value={form.email} onChange={handleInputChange("email")} required type="email" className="bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-gray-200 rounded-none h-12 focus-visible:ring-0 focus-visible:border-surface-dark px-0 md:text-lg transition-colors" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{isFr ? "Téléphone*" : "Phone Number*"}</label>
                                <Input value={form.phone} onChange={handleInputChange("phone")} required type="tel" className="bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-gray-200 rounded-none h-12 focus-visible:ring-0 focus-visible:border-surface-dark px-0 md:text-lg transition-colors" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{isFr ? "Entreprise*" : "Company Name*"}</label>
                                <Input value={form.company} onChange={handleInputChange("company")} required className="bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-gray-200 rounded-none h-12 focus-visible:ring-0 focus-visible:border-surface-dark px-0 md:text-lg transition-colors" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{isFr ? "Titre / Poste" : "Job Title"}</label>
                                <Input value={form.jobTitle} onChange={handleInputChange("jobTitle")} className="bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-gray-200 rounded-none h-12 focus-visible:ring-0 focus-visible:border-surface-dark px-0 md:text-lg transition-colors" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{isFr ? "Voulez-vous nous donner plus de contexte ? (Optionnel)" : "Want to give us more context? (Optional)"}</label>
                            <textarea
                                value={form.message}
                                onChange={handleInputChange("message") as any}
                                className="w-full bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-gray-200 rounded-none h-24 focus-visible:ring-0 focus-visible:border-surface-dark outline-none px-0 py-3 md:text-lg resize-none transition-colors"
                            />
                        </div>

                        <TurnstileWidget
                            lang={lang}
                            onVerify={(token) => setTurnstileToken(token)}
                            onExpire={() => setTurnstileToken(null)}
                            onError={() => setTurnstileToken(null)}
                        />

                        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                        <div className="flex items-start gap-4 pt-2">
                            <Checkbox required id="privacy" className="mt-1 border-gray-300 data-[state=checked]:bg-surface-dark data-[state=checked]:border-surface-dark" />
                            <label htmlFor="privacy" className="text-xs text-gray-500 leading-relaxed max-w-2xl">
                                {isFr
                                    ? "J'accepte que Stigma Technologies traite mes informations pour répondre à ma demande et me fournir des insights stratégiques."
                                    : "I agree that Stigma Technologies may process my information to respond to my request and provide strategic insights."}
                            </label>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end pt-8 border-t border-gray-100 mt-12 gap-8 sm:gap-0">
                    {step > 1 ? (
                        <button
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="text-xs font-bold text-gray-400 hover:text-surface-dark uppercase tracking-widest transition-colors flex items-center gap-2 group w-full sm:w-auto order-2 sm:order-1"
                        >
                            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                            {isFr ? "Retour" : "Back"}
                        </button>
                    ) : <div className="hidden sm:block"></div>}

                    <div className="flex flex-col items-center sm:items-end gap-3 w-full sm:w-auto order-1 sm:order-2">
                        <Button
                            type="submit"
                            disabled={loading ||
                                (step === 1 && !form.service) ||
                                (step === 2 && form.specificNeeds.length === 0) ||
                                (step === 3 && (!form.industry || !form.companySize || !form.itSetup)) ||
                                (step === 4 && !form.timeline)
                            }
                            className="w-full sm:w-auto h-16 bg-surface-dark hover:bg-background-dark text-white rounded-none px-12 text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-30 disabled:hover:bg-surface-dark flex items-center gap-3 shadow-[0_10px_20px_rgba(10,15,44,0.1)] group"
                        >
                            {loading
                                ? (isFr ? "Transmission..." : "Transmitting...")
                                : step === 5
                                    ? (isFr ? "Soumettre l'analyse" : "Submit Request")
                                    : (isFr ? "Étape Suivante" : "Next Step")}
                            {!loading && step < 5 && <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>}
                            {!loading && step === 5 && <span className="material-symbols-outlined text-[20px]">send</span>}
                        </Button>

                        {/* Skip form / Book direct link during form flow via Popup */}
                        <div data-cal-link="stigmatech/30min" className="text-center sm:text-right cursor-pointer">
                            <span className="text-xs text-gray-400 hover:text-surface-dark font-medium transition-colors underline-offset-4 hover:underline">
                                {isFr ? "Trop urgent ? Prenez rdv directement &rarr;" : "Too urgent? Book a meeting directly &rarr;"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                {step === 5 && (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-8 pt-6 opacity-60">
                        <div className="flex items-center gap-2 text-gray-500">
                            <span className="material-symbols-outlined text-[18px]">lock</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{isFr ? "Données cryptées" : "Encrypted Data"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <span className="material-symbols-outlined text-[18px]">security</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{isFr ? "100% Confidentiel" : "100% Confidential"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <span className="material-symbols-outlined text-[18px]">health_and_safety</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{isFr ? "Conforme Loi 25" : "Law 25 Compliant"}</span>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
