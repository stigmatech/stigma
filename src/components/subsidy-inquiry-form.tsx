"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { TurnstileWidget } from "./turnstile-widget";

interface SubsidyInquiryFormProps {
    lang: string;
    courseTitle?: string;
}

export function SubsidyInquiryForm({ lang, courseTitle }: SubsidyInquiryFormProps) {
    const isFr = lang === "fr";
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedSubsidies, setSelectedSubsidies] = useState<string[]>([]);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const [form, setForm] = useState({
        firstName: "", lastName: "", email: "", phone: "",
        company: "", jobTitle: "", companySize: "", sector: "",
    });

    const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setForm(prev => ({ ...prev, [field]: e.target.value }));

    const subsidies = [
        { id: "scale-ai", label: isFr ? "Scale AI — Formation IA (jusqu'à 85%)" : "Scale AI — AI Training (up to 85%)" },
        { id: "essor", label: isFr ? "ESSOR – Diagnostic Numérique (jusqu'à 20 000$)" : "ESSOR – Digital Diagnosis (up to $20,000)" },
        { id: "productivite", label: isFr ? "Productivité-Compétences (50%+)" : "Productivité-Compétences (50%+)" },
        { id: "dec", label: isFr ? "DEC — Initiative Régionale IA (50%)" : "DEC — Regional AI Initiative (50%)" },
        { id: "cdae", label: isFr ? "Crédit d'impôt CDAE (jusqu'à 30%)" : "CDAE Tax Credit (up to 30%)" },
        { id: "pari", label: isFr ? "PARI – AI Assist CNRC (jusqu'à 100%)" : "IRAP – AI Assist NRC (up to 100%)" },
    ];

    const toggleSubsidy = (id: string) => {
        setSelectedSubsidies(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
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
            const res = await fetch("/api/subsidy-inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, selectedSubsidies, courseTitle, lang, turnstileToken }),
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
                    {isFr ? "Demande de renseignements envoyée !" : "Inquiry Sent!"}
                </h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                    {isFr
                        ? "Notre spécialiste en financement vous contactera sous 48 heures ouvrables pour évaluer votre admissibilité et initier votre dossier de subvention."
                        : "Our funding specialist will contact you within 48 business hours to assess your eligibility and start your grant application."}
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl w-full">

            {/* Important Notice */}
            <div className="bg-amber-50/30 border-l-4 border-amber-400 rounded-none p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-none bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">info</span>
                </div>
                <div>
                    <p className="text-sm text-amber-900 font-bold mb-1">
                        {isFr ? "Note importante" : "Important Note"}
                    </p>
                    <p className="text-[12px] text-amber-800 leading-relaxed font-light">
                        {isFr
                            ? "Les subventions gouvernementales en formation IA doivent être demandées via un prestataire accrédité. Stigma Technologies est votre intermédiaire officiel."
                            : "Government AI training subsidies must be applied for through an accredited provider. Stigma Technologies is your official intermediary."}
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
                    {isFr ? "1. Vos informations professionnelles" : "1. Your Professional Info"}
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
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">{isFr ? "Titre / Poste*" : "Job Title*"}</label>
                        <Input required value={form.jobTitle} onChange={set("jobTitle")}
                            placeholder={`${isFr ? "Titre / Poste" : "Job Title"}*`}
                            className="bg-transparent border-t-0 border-r-0 border-l-0 border-b border-gray-300 rounded-none h-12 focus-visible:ring-0 focus-visible:border-black px-0 transition-all font-light" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">{isFr ? "Téléphone" : "Phone Number"}</label>
                        <Input type="tel" value={form.phone} onChange={set("phone")}
                            placeholder={`${isFr ? "Téléphone" : "Phone Number"}`}
                            className="bg-transparent border-t-0 border-r-0 border-l-0 border-b border-gray-300 rounded-none h-12 focus-visible:ring-0 focus-visible:border-black px-0 transition-all font-light" />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">{isFr ? "Courriel professionnel*" : "Business Email*"}</label>
                    <Input required type="email" value={form.email} onChange={set("email")}
                        placeholder={`${isFr ? "Courriel professionnel" : "Business Email"}*`}
                        className="bg-transparent border-t-0 border-r-0 border-l-0 border-b border-gray-300 rounded-none h-12 focus-visible:ring-0 focus-visible:border-black px-0 transition-all font-light" />
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
                    {/* Company Size */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                            {isFr ? "Taille de l'entreprise*" : "Company Size*"}
                        </label>
                        <div className="relative">
                            <select required value={form.companySize} onChange={set("companySize")}
                                className="w-full bg-transparent border-t-0 border-r-0 border-l-0 border-b border-gray-300 rounded-none h-12 text-sm text-gray-500 px-0 focus:outline-none focus:border-black appearance-none transition-all font-light">
                                <option value="">{isFr ? "Taille de l'entreprise*" : "Company Size*"}</option>
                                <option value="1-9">1 – 9 {isFr ? "employés" : "employees"}</option>
                                <option value="10-49">10 – 49 {isFr ? "employés" : "employees"}</option>
                                <option value="50-249">50 – 249 {isFr ? "employés" : "employees"}</option>
                                <option value="250+">250+ {isFr ? "employés" : "employees"}</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 text-[20px] pointer-events-none">expand_more</span>
                        </div>
                    </div>

                    {/* Sector */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                            {isFr ? "Secteur d'activité*" : "Industry Sector*"}
                        </label>
                        <div className="relative">
                            <select required value={form.sector} onChange={set("sector")}
                                className="w-full bg-transparent border-t-0 border-r-0 border-l-0 border-b border-gray-300 rounded-none h-12 text-sm text-gray-500 px-0 focus:outline-none focus:border-black appearance-none transition-all font-light">
                                <option value="">{isFr ? "Secteur d'activité*" : "Industry Sector*"}</option>
                                <option value="services-pro">{isFr ? "Services professionnels" : "Professional Services"}</option>
                                <option value="finance">{isFr ? "Finance & Assurances" : "Finance & Insurance"}</option>
                                <option value="sante">{isFr ? "Santé" : "Healthcare"}</option>
                                <option value="fabrication">{isFr ? "Fabrication" : "Manufacturing"}</option>
                                <option value="commerce">{isFr ? "Commerce de détail" : "Retail"}</option>
                                <option value="immobilier">{isFr ? "Immobilier" : "Real Estate"}</option>
                                <option value="ti">{isFr ? "Technologie de l'information" : "Information Technology"}</option>
                                <option value="education">{isFr ? "Éducation" : "Education"}</option>
                                <option value="autre">{isFr ? "Autre" : "Other"}</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 text-[20px] pointer-events-none">expand_more</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subsidies of Interest */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
                    {isFr ? "2. Subventions d'intérêt" : "2. Subsidies of Interest"}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {subsidies.map((subsidy) => (
                        <div key={subsidy.id} className="flex items-center gap-3 p-2 rounded-none hover:bg-gray-50 transition-colors">
                            <Checkbox
                                id={subsidy.id}
                                checked={selectedSubsidies.includes(subsidy.id)}
                                onCheckedChange={() => toggleSubsidy(subsidy.id)}
                                className="h-5 w-5 rounded-none border-gray-300 data-[state=checked]:bg-surface-dark data-[state=checked]:border-surface-dark"
                            />
                            <label htmlFor={subsidy.id} className="text-sm text-gray-700 font-medium cursor-pointer leading-tight">
                                {subsidy.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Course pre-filled */}
            {courseTitle && (
                <div className="bg-gray-50 border-l-4 border-surface-dark rounded-none p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-none bg-surface-dark text-white flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-xl">school</span>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{isFr ? "Formation concernée" : "Related Course"}</p>
                            <p className="text-sm font-bold text-surface-dark">{courseTitle}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Privacy */}
            <div className="p-0 border-none">
                <div className="flex items-start gap-4">
                    <Checkbox id="privacy-subsidy" required className="mt-1 h-5 w-5 rounded-none border-gray-300 data-[state=checked]:bg-surface-dark data-[state=checked]:border-surface-dark" />
                    <label htmlFor="privacy-subsidy" className="text-[10px] text-gray-400 leading-snug cursor-pointer font-light">
                        {isFr
                            ? "J'autorise Stigma Technologies à agir comme intermédiaire officiel dans mes démarches de subventions et j'accepte la politique de confidentialité.*"
                            : "I authorize Stigma Technologies to act as official intermediary for my grant applications and I accept the privacy policy.*"}
                    </label>
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
                <Button type="submit" disabled={loading}
                    className="w-full h-16 rounded-none font-bold text-xs uppercase tracking-[0.2em] bg-surface-dark hover:bg-background-dark text-white transition-all disabled:opacity-50">
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
                            <span className="material-symbols-outlined text-[20px] mr-3">check_circle</span>
                            {isFr ? "Vérifier mon admissibilité" : "Check My Eligibility"}
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}
