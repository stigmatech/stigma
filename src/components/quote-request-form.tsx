"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { getCalApi } from "@calcom/embed-react";
import { TurnstileWidget } from "./turnstile-widget";
import posthog from "posthog-js";

interface QuoteRequestFormProps {
    lang: string;
    initialService?: string;
    initialSpecificNeeds?: string[];
    initialMessage?: string;
}

export function QuoteRequestForm({ lang, initialService, initialSpecificNeeds, initialMessage }: QuoteRequestFormProps) {
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
                styles: { branding: { brandColor: "#050608" } },
                hideEventTypeDetails: false,
                layout: "month_view"
            });
        })();
    }, []);

    const [form, setForm] = useState({
        service: initialService || "",
        specificNeeds: initialSpecificNeeds || [] as string[],
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
        message: initialMessage || "",
    });

    // Reactive update for deep-linked selections
    useEffect(() => {
        if (initialService) setForm(prev => ({ ...prev, service: initialService }));
        if (initialSpecificNeeds) setForm(prev => ({ ...prev, specificNeeds: initialSpecificNeeds }));
        if (initialMessage) setForm(prev => ({ ...prev, message: initialMessage }));
        
        // If we have an initial service, jump to step 2 automatically to feel more interactive
        if (initialService && step === 1) {
            setStep(2);
        }
    }, [initialService, initialSpecificNeeds, initialMessage]);

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
            posthog.identify(form.email, {
                email: form.email,
                first_name: form.firstName,
                last_name: form.lastName,
                company: form.company,
                job_title: form.jobTitle,
            });
            posthog.capture('quote_form_submitted', {
                service: form.service,
                specific_needs: form.specificNeeds,
                industry: form.industry,
                company_size: form.companySize,
                it_setup: form.itSetup,
                timeline: form.timeline,
                lang,
            });
            setSubmitted(true);
        } catch {
            posthog.captureException(new Error('quote_form_submission_failed'));
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
            <div className="bg-slate-950 p-12 lg:p-24 shadow-2xl relative overflow-hidden text-center border border-white/10">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                
                <div className="w-24 h-24 bg-white flex items-center justify-center mx-auto mb-10 relative z-10 shadow-2xl">
                    <span className="material-symbols-outlined text-slate-950 text-5xl">task_alt</span>
                </div>
                
                <h3 className="text-4xl lg:text-6xl font-display font-black text-white mb-8 relative z-10 uppercase tracking-tighter">
                    {isFr ? "DEMANDE REÇUE." : "REQUEST RECEIVED."}
                </h3>
                
                <p className="text-slate-400 max-w-xl mx-auto relative z-10 text-xl font-light tracking-tight leading-relaxed">
                    {isFr
                        ? "Votre demande a bien été reçue par notre équipe. Un expert Stigma analysera vos informations et vous contactera rapidement."
                        : "Your request has been successfully received. A Stigma expert will analyze your information and follow up promptly."}
                </p>
                
                <div className="mt-16 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-8">
                    <Button asChild className="bg-white hover:bg-slate-100 text-slate-950 rounded-none px-12 py-8 uppercase tracking-[0.4em] font-black text-[11px] transition-all shadow-2xl cursor-pointer">
                        <div data-cal-link="stigmatech/30min">
                            <span className="material-symbols-outlined mr-4 text-lg">calendar_month</span>
                            {isFr ? "Planifier un appel" : "Book a Call"}
                        </div>
                    </Button>
                    <a href={`/${lang}`} className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.5em] transition-all">
                        {isFr ? "RETOUR À L'ACCUEIL" : "BACK TO HOME"}
                    </a>
                </div>
            </div>
        );
    }

    const renderProgress = () => (
        <div className="mb-20">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400 block mb-2">
                        {isFr ? "FORMULAIRE DE DEMANDE" : "REQUEST FORM"}
                    </span>
                    <span className="text-4xl font-display font-black tracking-tighter text-slate-950 uppercase">
                        {step === 1 && (isFr ? "Besoins" : "Needs")}
                        {step === 2 && (isFr ? "Détails" : "Details")}
                        {step === 3 && (isFr ? "Écosystème" : "Ecosystem")}
                        {step === 4 && (isFr ? "Échéancier" : "Timeline")}
                        {step === 5 && (isFr ? "Contact" : "Contact")}
                    </span>
                </div>
                <div className="text-4xl font-display font-black text-slate-200 tracking-tighter">
                    0{step}/05
                </div>
            </div>
            <div className="flex gap-1 h-1.5 bg-slate-50">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={cn(
                        "flex-1 transition-all duration-700 ease-in-out",
                        step >= i ? "bg-amber-500" : "bg-transparent",
                        step === i ? "opacity-100 shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "opacity-30"
                    )} />
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-white p-10 lg:p-20 shadow-2xl border border-slate-100 relative overflow-hidden group">
            {/* Industrial Framing */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 opacity-50 -mr-16 -mt-16 rotate-45 pointer-events-none group-hover:bg-amber-500/5 transition-colors"></div>
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-slate-950"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-950"></div>

            {renderProgress()}

            <div className="mb-16">
                <h2 className="text-4xl lg:text-5xl font-display font-black text-slate-950 leading-none uppercase tracking-tighter">
                    {step === 1 && (isFr ? "Quel est le défi principal de votre entreprise ?" : "What is your company's main challenge?")}
                    {step === 2 && (isFr ? "Précisons vos besoins concernant : " : "Let's specify your needs for : ")}
                    {step === 2 && <span className="text-amber-600 block mt-4 uppercase">{form.service}</span>}
                    {step === 3 && (isFr ? "Comprendre votre environnement actuel" : "Understanding your current environment")}
                    {step === 4 && (isFr ? "Quel est votre horizon de temps ?" : "What is your timeline?")}
                    {step === 5 && (isFr ? "Où devons-nous envoyer notre analyse ?" : "Where should we send our analysis?")}
                </h2>
                {step === 3 && <p className="text-slate-400 mt-6 text-lg font-light tracking-tight">{isFr ? "Ces informations nous aident à associer le bon expert à votre dossier." : "This information helps us pair the right expert with your case."}</p>}
                {step === 5 && <p className="text-slate-400 mt-6 text-lg font-light tracking-tight">{isFr ? "Dernière étape. La soumission est sécurisée." : "Final step. Submission is secure."}</p>}
            </div>

            <form onSubmit={step === 5 ? handleSubmit : (e) => { e.preventDefault(); setStep(step + 1); }} className="space-y-12">

                {/* STEP 1: Main Service */}
                {step === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map(s => (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => {
                                    setField("service", s.label);
                                    setField("specificNeeds", []); // reset needs when changing service
                                    posthog.capture('quote_service_selected', { service: s.label, lang });
                                    setTimeout(() => setStep(2), 400);
                                }}
                                className={cn(
                                    "p-8 text-left border border-slate-100 transition-all duration-500 hover:border-slate-950 hover:shadow-2xl hover:shadow-slate-200/50 group flex items-start gap-8 relative",
                                    form.service === s.label ? "border-slate-950 bg-slate-50 ring-1 ring-slate-950" : ""
                                )}
                            >
                                <span className={cn(
                                    "material-symbols-outlined text-4xl transition-colors font-light",
                                    form.service === s.label ? "text-slate-950" : "text-slate-200 group-hover:text-slate-400"
                                )}>
                                    {s.icon}
                                </span>
                                <div>
                                    <span className={cn(
                                        "font-black text-xl block transition-colors uppercase tracking-tight",
                                        form.service === s.label ? "text-slate-950" : "text-slate-400 group-hover:text-slate-950"
                                    )}>
                                        {s.label}
                                    </span>
                                </div>
                                <div className={cn(
                                    "absolute top-0 right-0 w-2 h-2 bg-slate-950 opacity-0 group-hover:opacity-100 transition-opacity",
                                    form.service === s.label ? "opacity-100" : ""
                                )} />
                            </button>
                        ))}
                    </div>
                )}

                {/* STEP 2: Specific Needs (Dynamic) */}
                {step === 2 && (
                    <div className="space-y-6">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8">{isFr ? "SÉLECTIONNEZ LES SERVICES REQUIS :" : "SELECT REQUIRED SERVICES:"}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {getSpecificNeedsForService().map(need => (
                                <button
                                    key={need}
                                    type="button"
                                    onClick={() => toggleSpecificNeed(need)}
                                    className={cn(
                                        "p-6 text-left border transition-all duration-300 flex items-center justify-between group",
                                        form.specificNeeds.includes(need) ? "border-slate-950 bg-slate-950 text-white" : "border-slate-100 hover:border-slate-950 bg-white"
                                    )}
                                >
                                    <span className={cn(
                                        "font-black text-base uppercase tracking-tight transition-colors",
                                        form.specificNeeds.includes(need) ? "text-white" : "text-slate-500 group-hover:text-slate-950"
                                    )}>
                                        {need}
                                    </span>
                                    <div className={cn(
                                        "w-6 h-6 border flex items-center justify-center transition-all duration-500",
                                        form.specificNeeds.includes(need) ? "border-amber-500 bg-amber-500" : "border-slate-200 bg-slate-50 group-hover:border-slate-950"
                                    )}>
                                        {form.specificNeeds.includes(need) && <span className="material-symbols-outlined text-slate-950 text-[18px] font-black">check</span>}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* STEP 3: Ecosystem (Industry, Size, Setup) */}
                {step === 3 && (
                    <div className="space-y-12">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">{isFr ? "VOTRE SECTEUR D'ACTIVITÉ" : "YOUR INDUSTRY"}</label>
                            <select
                                value={form.industry}
                                onChange={handleInputChange("industry")}
                                className="w-full bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-slate-100 rounded-none h-16 focus-visible:ring-0 focus:border-slate-950 text-2xl font-black uppercase tracking-tighter appearance-none cursor-pointer transition-colors"
                                required
                            >
                                <option value="" disabled className="text-slate-400">{isFr ? "SÉLECTIONNEZ..." : "SELECT..."}</option>
                                {industries.map(ind => <option key={ind} value={ind} className="bg-white text-slate-950 uppercase font-black text-lg">{ind}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">{isFr ? "TAILLE DE L'ENTREPRISE" : "COMPANY SIZE"}</label>
                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                                {companySizes.map(size => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => setField("companySize", size)}
                                        className={cn(
                                            "py-5 text-center border transition-all duration-500 font-black text-lg tracking-tighter",
                                            form.companySize === size ? "border-slate-950 bg-slate-950 text-white shadow-xl" : "border-slate-100 text-slate-400 hover:border-slate-950 hover:text-slate-950 bg-white"
                                        )}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">{isFr ? "GESTION TI ACTUELLE" : "CURRENT IT MANAGEMENT"}</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {itSetups.map(setup => (
                                    <button
                                        key={setup}
                                        type="button"
                                        onClick={() => setField("itSetup", setup)}
                                        className={cn(
                                            "p-6 text-left border transition-all duration-500 text-base font-black uppercase tracking-tight",
                                            form.itSetup === setup ? "border-slate-950 bg-slate-950 text-white shadow-xl" : "border-slate-100 text-slate-400 hover:border-slate-950 hover:text-slate-950 bg-white"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {timelines.map((time, idx) => (
                            <button
                                key={time}
                                type="button"
                                onClick={() => {
                                    setField("timeline", time);
                                    setTimeout(() => setStep(5), 400);
                                }}
                                className={cn(
                                    "p-10 text-left border transition-all duration-500 group relative overflow-hidden",
                                    form.timeline === time ? "border-slate-950 bg-slate-50" : "border-slate-100 hover:border-slate-950 bg-white shadow-sm hover:shadow-2xl hover:shadow-slate-200/50"
                                )}
                            >
                                <span className={cn(
                                    "font-black text-2xl block relative z-10 transition-colors uppercase tracking-tighter leading-none truncate",
                                    form.timeline === time ? "text-slate-950" : "text-slate-400 group-hover:text-slate-950"
                                )}>
                                    {time}
                                </span>
                                {idx === 0 && (
                                    <span className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-black uppercase tracking-[0.4em] px-4 py-2 transition-transform group-hover:scale-110">
                                        {isFr ? "PRIORITÉ ÉLEVÉE" : "HIGH PRIORITY"}
                                    </span>
                                )}
                                <div className={cn(
                                    "absolute top-0 right-0 w-2 h-2 bg-slate-950 opacity-0 group-hover:opacity-100 transition-opacity",
                                    form.timeline === time ? "opacity-100" : ""
                                )} />
                            </button>
                        ))}
                    </div>
                )}

                {/* STEP 5: Contact Info */}
                {step === 5 && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="group">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2 group-hover:text-slate-950 transition-colors">{isFr ? "PRÉNOM*" : "FIRST NAME*"}</label>
                                <Input value={form.firstName} onChange={handleInputChange("firstName")} required className="bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-slate-100 rounded-none h-14 focus-visible:ring-0 focus-visible:border-slate-950 px-0 text-xl font-black uppercase tracking-tight transition-all placeholder:text-slate-200" />
                            </div>
                            <div className="group">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2 group-hover:text-slate-950 transition-colors">{isFr ? "NOM*" : "LAST NAME*"}</label>
                                <Input value={form.lastName} onChange={handleInputChange("lastName")} required className="bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-slate-100 rounded-none h-14 focus-visible:ring-0 focus-visible:border-slate-950 px-0 text-xl font-black uppercase tracking-tight transition-all placeholder:text-slate-200" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="group">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2 group-hover:text-slate-950 transition-colors">{isFr ? "COURRIEL PROFESSIONNEL*" : "WORK EMAIL*"}</label>
                                <Input value={form.email} onChange={handleInputChange("email")} required type="email" className="bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-slate-100 rounded-none h-14 focus-visible:ring-0 focus-visible:border-slate-950 px-0 text-xl font-black uppercase tracking-tight transition-all placeholder:text-slate-200" />
                            </div>
                            <div className="group">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2 group-hover:text-slate-950 transition-colors">{isFr ? "TÉLÉPHONE*" : "PHONE NUMBER*"}</label>
                                <Input value={form.phone} onChange={handleInputChange("phone")} required type="tel" className="bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-slate-100 rounded-none h-14 focus-visible:ring-0 focus-visible:border-slate-950 px-0 text-xl font-black uppercase tracking-tight transition-all placeholder:text-slate-200" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="group">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2 group-hover:text-slate-950 transition-colors">{isFr ? "ENTREPRISE*" : "COMPANY NAME*"}</label>
                                <Input value={form.company} onChange={handleInputChange("company")} required className="bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-slate-100 rounded-none h-14 focus-visible:ring-0 focus-visible:border-slate-950 px-0 text-xl font-black uppercase tracking-tight transition-all placeholder:text-slate-200" />
                            </div>
                            <div className="group">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2 group-hover:text-slate-950 transition-colors">{isFr ? "TITRE / POSTE" : "JOB TITLE"}</label>
                                <Input value={form.jobTitle} onChange={handleInputChange("jobTitle")} className="bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-slate-100 rounded-none h-14 focus-visible:ring-0 focus-visible:border-slate-950 px-0 text-xl font-black uppercase tracking-tight transition-all placeholder:text-slate-200" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2 group-hover:text-slate-950 transition-colors">{isFr ? "INFORMATIONS ADDITIONNELLES (OPTIONNEL)" : "ADDITIONAL INFORMATION (OPTIONAL)"}</label>
                            <textarea
                                value={form.message}
                                onChange={handleInputChange("message") as any}
                                className="w-full bg-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-slate-100 rounded-none h-40 focus-visible:ring-0 focus-visible:border-slate-950 outline-none px-0 py-6 text-xl font-light tracking-tight transition-colors resize-none placeholder:text-slate-200"
                            />
                        </div>

                        <div className="bg-slate-50 p-6 border border-slate-100">
                             <TurnstileWidget
                                lang={lang}
                                onVerify={(token) => setTurnstileToken(token)}
                                onExpire={() => setTurnstileToken(null)}
                                onError={() => setTurnstileToken(null)}
                            />
                        </div>

                        {error && <p className="text-red-600 text-sm font-black uppercase tracking-widest">{error}</p>}

                        <div className="flex items-start gap-6 pt-4 border-t border-slate-50">
                            <Checkbox required id="privacy" className="mt-1 border-slate-200 data-[state=checked]:bg-slate-950 data-[state=checked]:border-slate-950 w-6 h-6 rounded-none" />
                            <label htmlFor="privacy" className="text-[11px] text-slate-400 leading-relaxed max-w-2xl font-light tracking-tight">
                                {isFr
                                    ? "J'AUTORISE STIGMA TECHNOLOGIES À TRAITER CES INFORMATIONS DANS LE CADRE DE MA DEMANDE DE DEVIS ET DE MON ACCOMPAGNEMENT."
                                    : "I AUTHORIZE STIGMA TECHNOLOGIES TO PROCESS THIS INFORMATION AS PART OF MY QUOTE REQUEST AND ONBOARDING."}
                            </label>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end pt-12 border-t border-slate-100 mt-20 gap-10">
                    {step > 1 ? (
                        <button
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="text-[10px] font-black text-slate-300 hover:text-slate-950 uppercase tracking-[0.5em] transition-all flex items-center gap-4 group w-full sm:w-auto order-2 sm:order-1"
                        >
                            <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-2 transition-transform">arrow_back</span>
                            {isFr ? "PRÉCÉDENT" : "PREVIOUS"}
                        </button>
                    ) : <div className="hidden sm:block"></div>}

                    <div className="flex flex-col items-center sm:items-end gap-6 w-full sm:w-auto order-1 sm:order-2">
                        <Button
                            type="submit"
                            disabled={loading ||
                                (step === 1 && !form.service) ||
                                (step === 2 && form.specificNeeds.length === 0) ||
                                (step === 3 && (!form.industry || !form.companySize || !form.itSetup)) ||
                                (step === 4 && !form.timeline)
                            }
                            className="w-full sm:w-auto h-20 bg-slate-950 hover:bg-slate-900 text-white rounded-none px-16 text-[11px] font-black uppercase tracking-[0.5em] transition-all disabled:opacity-30 flex items-center gap-4 shadow-2xl group border-none"
                        >
                            {loading
                                ? (isFr ? "ENVOI EN COURS..." : "SENDING...")
                                : step === 5
                                    ? (isFr ? "SOUMETTRE LA DEMANDE" : "SUBMIT REQUEST")
                                    : (isFr ? "ÉTAPE SUIVANTE" : "NEXT STEP")}
                            {!loading && step < 5 && <span className="material-symbols-outlined text-[22px] group-hover:translate-x-2 transition-transform">arrow_forward</span>}
                            {!loading && step === 5 && <span className="material-symbols-outlined text-[22px]">send</span>}
                        </Button>

                        <div data-cal-link="stigmatech/30min" className="text-center sm:text-right cursor-pointer group">
                            <span className="text-[10px] text-slate-400 group-hover:text-amber-600 font-black tracking-widest transition-all border-b border-transparent group-hover:border-amber-600 pb-1">
                                {isFr ? "BESOIN URGENT ? PRENEZ RDV MAINTENANT" : "URGENT NEED? BOOK MEETING NOW"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Trust Badges - Tactical UI */}
                {step === 5 && (
                    <div className="flex flex-wrap items-center justify-center gap-10 mt-12 pt-10 opacity-30 border-t border-slate-50">
                        <div className="flex items-center gap-3 text-slate-500">
                            <span className="material-symbols-outlined text-[20px] font-light">encrypted</span>
                            <span className="text-[9px] font-black uppercase tracking-[0.4em]">{isFr ? "CHIFFREMENT DE BOUT EN BOUT" : "END-TO-END ENCRYPTION"}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500">
                            <span className="material-symbols-outlined text-[20px] font-light">policy</span>
                            <span className="text-[9px] font-black uppercase tracking-[0.4em]">{isFr ? "CONFORMITÉ GARANTIE" : "GUARANTEED COMPLIANCE"}</span>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

