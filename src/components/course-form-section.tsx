"use client";

import { useState } from "react";
import { TrainingBookingForm } from "@/components/training-booking-form";
import { SubsidyInquiryForm } from "@/components/subsidy-inquiry-form";

interface CourseFormSectionProps {
    lang: string;
    courseTitle: string;
}

export function CourseFormSection({ lang, courseTitle }: CourseFormSectionProps) {
    const isFr = lang === "fr";
    const [activeTab, setActiveTab] = useState<"booking" | "subsidy">("booking");

    return (
        <div id="contact" className="bg-white overflow-hidden">
            {/* Section Header with Gradient Background */}
            <div className="relative bg-background-dark py-20 px-4 overflow-hidden">
                {/* Subtle background decoration */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-white/5 blur-[100px] translate-y-1/2 -translate-x-1/4" />

                <div className="relative max-w-4xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 rounded-none bg-white text-[10px] font-bold tracking-[0.2em] text-surface-dark uppercase mb-6 shadow-sm border border-gray-100">
                        {isFr ? "Passer à l'action" : "Take Action"}
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6 tracking-tight leading-[1.1]">
                        {isFr ? "Réservez ou faites" : "Book or Fund"} <span className="text-gray-300 italic">{isFr ? "subventionner" : "Fund"}</span> {isFr ? "votre formation" : "Your Training"}
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        {isFr
                            ? "Formez vos équipes au tarif de 2 500$/jour, ou laissez-nous gérer vos demandes de subventions pour réduire votre coût net jusqu'à 85%."
                            : "Train your teams at $2,500/day, or let us handle your grant applications to reduce your net cost by up to 85%."}
                    </p>

                    {/* Enhanced Tab Switcher */}
                    <div className="inline-flex mt-12 bg-white/5 backdrop-blur-md p-0 border border-white/10 rounded-none">
                        <button
                            onClick={() => setActiveTab("booking")}
                            className={`px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 rounded-none flex items-center gap-3 ${activeTab === "booking"
                                ? "bg-white text-surface-dark"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                            {isFr ? "Réserver une session" : "Book a Session"}
                        </button>
                        <button
                            onClick={() => setActiveTab("subsidy")}
                            className={`px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 rounded-none flex items-center gap-3 ${activeTab === "subsidy"
                                ? "bg-white text-surface-dark"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">monetization_on</span>
                            {isFr ? "Renseignements subventions" : "Grant Information"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Form Area with better balance and cards */}
            <div className="relative py-24 px-4 bg-gray-50/50">
                <div className="max-w-6xl mx-auto">
                    {activeTab === "booking" && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                            {/* Left: Info Card */}
                            <div className="lg:col-span-5 space-y-8">
                                <div>
                                    <h3 className="text-3xl lg:text-4xl font-display font-bold text-surface-dark mb-6 leading-tight">
                                        {isFr ? "Réservez pour votre équipe" : "Book for Your Team"}
                                    </h3>
                                    <p className="text-gray-500 text-lg leading-relaxed">
                                        {isFr
                                            ? "Choisissez votre format : jusqu'à 15 employés ou minimum 5 dirigeants. La session se déroule dans vos locaux ou en ligne."
                                            : "Choose your format: up to 15 employees or a minimum of 5 executives. The session takes place at your premises or online."}
                                    </p>
                                </div>

                                <div className="grid gap-4">
                                    {[
                                        { icon: "groups", title: isFr ? "Employés" : "Employees", desc: isFr ? "Jusqu'à 15 par session" : "Up to 15 per session" },
                                        { icon: "manage_accounts", title: isFr ? "Dirigeants" : "Executives", desc: isFr ? "Format stratégique (min. 5)" : "Strategic format (min. 5)" },
                                        { icon: "restaurant", title: isFr ? "Lunch offert" : "Lunch included", desc: isFr ? "Uber Eats / Doordash" : "Uber Eats / Doordash" },
                                        { icon: "workspace_premium", title: isFr ? "Certification" : "Certification", desc: isFr ? "Stigma Technologies" : "Stigma Technologies" },
                                        { icon: "payments", title: isFr ? "Tarif fixe" : "Fixed rate", desc: isFr ? "2 500 $ / jour, all-inclusive" : "$2,500 / day, all-inclusive" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 rounded-none bg-white border border-gray-100 transition-all hover:border-surface-dark/30">

                                            <div className="w-10 h-10 rounded-none bg-gray-50 flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-surface-dark text-xl">{item.icon}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-surface-dark">{item.title}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-6 rounded-none bg-surface-dark text-white">
                                    <p className="text-sm font-medium leading-relaxed opacity-90">
                                        {isFr
                                            ? "Besoin d'aide pour le financement ? Sélectionnez 'Aide aux subventions' dans le formulaire. Notez que l'admissibilité est sujette à l'approbation des organismes compétents et ne dépend pas de Stigma Technologies."
                                            : "Need help with funding? Select 'Grant Assistance' in the form. Please note that eligibility is subject to approval by the relevant authorities and does not depend on Stigma Technologies."}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Form Card */}
                            <div className="lg:col-span-7">
                                <div className="bg-white p-8 lg:p-12 rounded-none border border-gray-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
                                    {/* Accent line */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-surface-dark rounded-none shadow-sm" />
                                    <TrainingBookingForm lang={lang} courseTitle={courseTitle} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "subsidy" && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                            {/* Left: Info Card */}
                            <div className="lg:col-span-5 space-y-8">
                                <div>
                                    <h3 className="text-3xl lg:text-4xl font-display font-bold text-surface-dark mb-6 leading-tight">
                                        {isFr ? "Laissez-nous gérer vos subventions" : "Let Us Manage Your Grants"}
                                    </h3>
                                    <p className="text-gray-500 text-lg leading-relaxed">
                                        {isFr
                                            ? "En tant que prestataire accrédité, nous gérons l'intégralité de votre dossier de subvention auprès d'Investissement Québec et Scale AI."
                                            : "As an accredited provider, we manage your entire grant application with Investissement Québec and Scale AI."}
                                    </p>
                                </div>

                                <div className="grid gap-4">
                                    {[
                                        { icon: "auto_awesome", title: "Scale AI", desc: isFr ? "Remboursement jusqu'à 85%" : "Reimbursement up to 85%" },
                                        { icon: "account_balance", title: "ESSOR (IQ)", desc: isFr ? "Volet 1 : jusqu'à 20 000 $" : "Component 1: up to $20,000" },
                                        { icon: "school", title: "MSSS / PACME", desc: isFr ? "Soutien aux compétences 50%+" : "Skills support 50%+" },
                                        { icon: "flag", title: "DEC IRIA", desc: isFr ? "Régions : 50% des coûts" : "Regions: 50% of costs" },
                                        { icon: "science", title: "PARI / CNRC", desc: isFr ? "Volet IA : jusqu'à 100%" : "AI context: up to 100%" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 rounded-none bg-white border border-gray-100 transition-all hover:border-surface-dark/30">

                                            <div className="w-10 h-10 rounded-none bg-gray-50 flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-surface-dark text-xl">{item.icon}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-surface-dark">{item.title}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-6 rounded-none bg-surface-dark text-white">
                                    <p className="text-sm font-medium leading-relaxed opacity-90">
                                        {isFr
                                            ? "📋 Aucun frais de dossier. Nous sommes payés au succès. Si vous ne recevez pas la subvention, nous ajustons nos services."
                                            : "📋 No application fees. We are paid on success. If you don't receive the grant, we adjust our services."}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Form Card */}
                            <div className="lg:col-span-7">
                                <div className="bg-white p-8 lg:p-12 rounded-none border border-gray-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
                                    {/* Accent line */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-surface-dark rounded-none shadow-sm" />
                                    <SubsidyInquiryForm lang={lang} courseTitle={courseTitle} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
