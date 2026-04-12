"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { TurnstileWidget } from "@/components/turnstile-widget";
import { ConfiguratorSummary } from "./configurator-summary";
import Cal, { getCalApi } from "@calcom/embed-react";
import { usePostHog } from 'posthog-js/react';

interface AgentConfiguratorProps {
    lang: string;
    initialTier?: string;
    initialPreset?: string | null;
    dictionary: any;
}

export function AgentConfigurator({ lang, initialTier, initialPreset, dictionary }: AgentConfiguratorProps) {
    const isFr = lang === "fr";
    const dict = dictionary.services.managedAiAgents;
    const blueprints = dict.blueprints?.items || [];
    const posthog = usePostHog();

    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const [form, setForm] = useState({
        mission: "",
        missionId: "",
        connectors: [] as string[],
        tier: initialTier || "",
        companySize: "",
        industry: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        isPreset: false,
        presetName: "",
        objectives: [] as string[],
        orchestration: false
    });

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "30min" });
            cal("ui", {
                "theme": "light",
                "styles": { "branding": { "brandColor": "#0b0c10" } },
                "hideEventTypeDetails": false,
                "layout": "month_view"
            });
        })();
    }, []);

    // Track Step Changes
    useEffect(() => {
        posthog?.capture('configurator_step_view', { 
            step, 
            isPreset: form.isPreset,
            presetName: form.presetName 
        });
    }, [step, posthog, form.isPreset, form.presetName]);

    useEffect(() => {
        if (initialPreset) {
            const blueprint = blueprints.find((b: any) => b.id === initialPreset);
            if (blueprint) {
                setForm(prev => ({
                    ...prev,
                    mission: blueprint.mission,
                    missionId: blueprint.id,
                    connectors: blueprint.tools,
                    isPreset: true,
                    presetName: blueprint.title
                }));
                // Skip to Step 3 if preset is valid
                setStep(3);
            }
        }
    }, [initialPreset, blueprints]);

    const missions = [
        { id: "customer-success", label: isFr ? "Succès Client & Support" : "Customer Success & Support", icon: "support_agent", desc: isFr ? "Support 24/7 et résolution autonome" : "24/7 support & autonomous resolution" },
        { id: "sales-intelligence", label: isFr ? "Intelligence Commerciale" : "Sales & Lead Intelligence", icon: "insights", desc: isFr ? "Qualification et prospection automatisée" : "Automated qualification & prospecting" },
        { id: "ops-efficiency", label: isFr ? "Efficacité Opérationnelle" : "Operational Efficiency", icon: "settings_suggest", desc: isFr ? "Automatisation des workflows internes" : "Internal workflow automation" },
        { id: "hr-talent", label: isFr ? "RH & Gestion des Talents" : "HR & Talent Management", icon: "groups", desc: isFr ? "Onboarding et assistant employé" : "Onboarding & employee assistant" },
        { id: "marketing-brand", label: isFr ? "Marketing & Image" : "Marketing & Brand", icon: "campaign", desc: isFr ? "Visibilité et réseaux sociaux" : "Visibility & social media" },
        { id: "finance-billing", label: isFr ? "Finance & Gestion" : "Finance & Management", icon: "account_balance", desc: isFr ? "Facturation et trésorerie" : "Billing & cashflow" },
        { id: "logistics-supply", label: isFr ? "Logistique & Flux" : "Logistics & Supply", icon: "local_shipping", desc: isFr ? "Stocks et livraisons" : "Inventory & deliveries" },
    ];

    const ecosystemOptions = [
        { id: "m365", label: "Microsoft 365 (Teams/Outlook)", icon: "mail" },
        { id: "slack", label: "Slack", icon: "forum" },
        { id: "hubspot", label: "HubSpot / CRM", icon: "person_search" },
        { id: "shopify", label: "Shopify", icon: "shopping_cart" },
        { id: "quickbooks", label: "QuickBooks / Finance", icon: "account_balance" },
    ];

    const tiers = dict.plans.items;

    const setField = (field: string, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const toggleConnector = (connector: string) => {
        setForm(prev => {
            const connectors = prev.connectors.includes(connector)
                ? prev.connectors.filter(c => c !== connector)
                : [...prev.connectors, connector];
            return { ...prev, connectors };
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
                    service: "Managed AI Agents",
                    specificNeeds: [form.mission, ...form.connectors, ...form.objectives],
                    ...form,
                    subject: `Agent Configuration: ${form.mission} for ${form.company}`,
                    turnstileToken
                }),
            });
            if (!res.ok) throw new Error("send_failed");
            
            posthog?.capture('configurator_submit_success', {
                tier: form.tier,
                company: form.company,
                industry: form.industry,
                orchestration: form.orchestration
            });

            setSubmitted(true);
        } catch {
            setError(isFr ? "Erreur lors de l'envoi." : "Error during transmission.");
        } finally {
            setLoading(false);
        }
    };

    const selectedTier = tiers.find((t: any) => t.id === form.tier);

    if (submitted) {
        return (
            <div className="bg-white p-12 lg:p-20 shadow-2xl text-center border border-gray-100">
                <div className="w-20 h-20 bg-[#0b0c10] flex items-center justify-center mx-auto mb-8">
                    <span className="material-symbols-outlined text-white text-4xl">check_circle</span>
                </div>
                <h2 className="text-3xl font-display font-black text-[#0b0c10] mb-4 uppercase">
                    {isFr ? "Configuration Prête" : "Configuration Ready"}
                </h2>
                <p className="text-gray-500 max-w-md mx-auto mb-10">
                    {isFr 
                        ? "Votre architecture d'agent est validée. Pour accélérer le déploiement, réservez votre créneau de mise en œuvre ci-dessous."
                        : "Your agent architecture is validated. To accelerate deployment, book your implementation slot below."}
                </p>
                
                <div className="max-w-4xl mx-auto border border-gray-100 p-4 bg-gray-50/30">
                    <Cal
                        namespace="30min"
                        calLink="stigmatech/30min"
                        style={{ width: "100%", height: "450px" }}
                        config={{ "layout": "month_view", "theme": "light" }}
                    />
                </div>

                <div className="mt-8">
                    <Button asChild variant="ghost" className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                        <a href={`/${lang}`}>{isFr ? "Retour à l'accueil" : "Back Home"}</a>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
            {/* Mobile Summary - Visible only on small screens, at the top */}
            <div className="lg:hidden w-full order-first mb-4">
                <ConfiguratorSummary 
                    lang={lang} 
                    isMobile={true}
                    selections={{
                        mission: form.mission,
                        connectors: form.connectors,
                        tier: form.tier,
                        tierTitle: selectedTier?.title,
                        presetName: form.presetName,
                        orchestration: form.orchestration
                    }} 
                />
            </div>

            <div className="flex-1 w-full bg-white p-8 lg:p-12 shadow-2xl shadow-black/5 border border-gray-100 relative order-2 lg:order-1">
                {/* Progress Bar */}
                <div className="flex gap-2 mb-12 h-2">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className={cn(
                            "h-full flex-1 transition-all duration-500",
                            step >= i ? "bg-[#0b0c10]" : "bg-gray-100"
                        )} />
                    ))}
                </div>

                <form onSubmit={(e) => { e.preventDefault(); if (step < 6) setStep(step + 1); else handleSubmit(e); }}>
                    <AnimatePresence mode="wait">
                        {/* STEP 1: MISSION */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-xl md:text-4xl font-display font-black text-[#0b0c10] uppercase tracking-tight leading-none">
                                        {isFr ? "Quelle est votre priorité ?" : "What is your priority?"}
                                    </h2>
                                    <p className="text-gray-600 mt-4 text-sm md:text-xl font-light leading-relaxed max-w-2xl">
                                        {isFr ? "Sélectionnez un modèle pré-configuré ou définissez une mission personnalisée pour vos agents." : "Choose a pre-configured blueprint or define a custom mission for your agents."}
                                    </p>
                                </div>

                                <div className="space-y-12">
                                    {/* Blueprints Section */}
                                    <div>
                                        <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                                            {isFr ? "Modèles Prêts-à-Déployer" : "Ready-to-Deploy Blueprints"}
                                            <div className="h-px flex-1 bg-blue-100" />
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {blueprints.map((b: any) => (
                                                <button
                                                    key={b.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setForm(prev => ({
                                                            ...prev,
                                                            mission: b.mission,
                                                            missionId: b.id,
                                                            connectors: b.tools,
                                                            isPreset: true,
                                                            presetName: b.title
                                                        }));
                                                    }}
                                                    className="p-6 text-left border border-blue-50 hover:border-blue-500 transition-all group bg-blue-50/20 hover:bg-blue-50/50 relative overflow-hidden"
                                                >
                                                    <div className="absolute top-0 right-0 p-2">
                                                        <span className="material-symbols-outlined text-blue-200 text-sm">auto_awesome</span>
                                                    </div>
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-12 h-12 bg-blue-600 flex items-center justify-center text-white shrink-0">
                                                            <span className="material-symbols-outlined text-2xl">
                                                                {b.id === 'support-agent' ? 'support_agent' : 
                                                                 b.id === 'sales-agent' ? 'campaign' : 
                                                                 b.id === 'hr-agent' ? 'badge' : 
                                                                 b.id === 'marketing-agent' ? 'brand_awareness' :
                                                                 b.id === 'finance-agent' ? 'account_balance_wallet' :
                                                                 b.id === 'logistics-agent' ? 'package_2' : 'analytics'}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="font-black text-sm block mb-1 text-[#0b0c10] uppercase tracking-tight">{b.title}</span>
                                                            <span className="text-[10px] text-gray-500 font-light leading-tight block mb-2">{b.description}</span>
                                                            <div className="flex flex-wrap gap-1">
                                                                {b.tools.map((t: string) => (
                                                                    <span key={t} className="text-[8px] font-bold text-blue-400 uppercase tracking-widest">{t}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Custom Section */}
                                    <div>
                                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                                            {isFr ? "Architecture Sur-Mesure" : "Custom Architecture"}
                                            <div className="h-px flex-1 bg-gray-100" />
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {missions.map(m => (
                                                <button
                                                    key={m.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setField("mission", m.label);
                                                        setField("missionId", m.id);
                                                        setField("isPreset", false);
                                                        setField("presetName", "");
                                                    }}
                                                    className={cn(
                                                        "p-6 text-left border border-gray-100 hover:border-[#0b0c10] transition-all group flex items-start gap-4",
                                                        form.missionId === m.id && !form.isPreset ? "border-[#0b0c10] bg-gray-50" : ""
                                                    )}
                                                >
                                                    <span className="material-symbols-outlined text-3xl text-gray-300 group-hover:text-[#0b0c10] transition-colors">{m.icon}</span>
                                                    <div>
                                                        <span className="font-bold text-sm block mb-1 text-[#0b0c10] uppercase">{m.label}</span>
                                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">{m.desc}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-8 border-t border-gray-50">
                                    <Button 
                                        type="button" 
                                        disabled={!form.missionId} 
                                        onClick={() => setStep(2)} 
                                        className="bg-[#0b0c10] rounded-none text-xs font-black uppercase tracking-[0.2em] px-12 h-16 group"
                                    >
                                        {isFr ? "Clarifier mes besoins" : "Clarify my needs"}
                                        <span className="material-symbols-outlined ml-2 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: DIAGNOSTIC / OBJECTIVES */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-xl md:text-4xl font-display font-black text-[#0b0c10] uppercase tracking-tight leading-none">
                                        {dict.diagnostic.title}
                                    </h2>
                                    <p className="text-gray-600 mt-4 text-sm md:text-xl font-light leading-relaxed max-w-2xl">
                                        {dict.diagnostic.subtitle}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {dict.diagnostic.options.map((opt: any) => (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onClick={() => {
                                                const objectives = form.objectives.includes(opt.label)
                                                    ? form.objectives.filter(o => o !== opt.label)
                                                    : [...form.objectives, opt.label];
                                                setField("objectives", objectives);
                                            }}
                                            className={cn(
                                                "p-6 text-left border transition-all flex items-start gap-4 group relative overflow-hidden",
                                                form.objectives.includes(opt.label) ? "border-[#0b0c10] bg-gray-50" : "border-gray-100 hover:border-gray-300"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-10 h-10 flex items-center justify-center shrink-0 border transition-colors",
                                                form.objectives.includes(opt.label) ? "bg-[#0b0c10] border-[#0b0c10] text-white" : "bg-gray-50 border-gray-100 text-gray-300 group-hover:text-[#0b0c10]"
                                            )}>
                                                <span className="material-symbols-outlined text-xl">
                                                    {opt.id === 'admin-reduction' ? 'auto_fix_high' : 
                                                     opt.id === 'response-speed' ? 'timer' : 
                                                     opt.id === 'data-quality' ? 'verified' : 
                                                     opt.id === 'growth' ? 'trending_up' : 'schedule'}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="font-black text-sm block mb-1 text-[#0b0c10] uppercase tracking-tight">{opt.label}</span>
                                                <span className="text-[10px] text-gray-400 font-light leading-tight block">{opt.desc}</span>
                                            </div>
                                            {form.objectives.includes(opt.label) && (
                                                <div className="absolute top-2 right-2">
                                                    <span className="material-symbols-outlined text-blue-600 text-sm">check_circle</span>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex justify-between pt-8 border-t border-gray-50">
                                    <button type="button" onClick={() => setStep(1)} className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#0b0c10]">{isFr ? "Retour" : "Back"}</button>
                                    <Button 
                                        type="button" 
                                        onClick={() => form.isPreset ? setStep(4) : setStep(3)} 
                                        className="bg-[#0b0c10] rounded-none text-xs font-black uppercase tracking-[0.2em] px-12 h-16 group"
                                    >
                                        {isFr ? (form.isPreset ? "Choisir mon forfait" : "Choisir mes outils") : (form.isPreset ? "Choose my plan" : "Select my tools")}
                                        <span className="material-symbols-outlined ml-2 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: ECOSYSTEM */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-xl md:text-4xl font-display font-black text-[#0b0c10] uppercase tracking-tight leading-none">
                                        {isFr ? "Vos Outils de Travail" : "Your Business Tools"}
                                    </h2>
                                    <p className="text-gray-600 mt-4 text-sm md:text-xl font-light leading-relaxed max-w-2xl">
                                        {isFr ? "Sélectionnez les logiciels que votre agent doit maîtriser pour vous assister efficacement." : "Select the software your agent needs to master to assist you effectively."}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {ecosystemOptions.map(o => (
                                        <button
                                            key={o.id}
                                            type="button"
                                            onClick={() => toggleConnector(o.label)}
                                            className={cn(
                                                "p-8 text-center border transition-all group",
                                                form.connectors.includes(o.label) ? "border-[#0b0c10] bg-gray-50" : "border-gray-100 hover:border-gray-300 hover:bg-gray-50/50"
                                            )}
                                        >
                                            <span className={cn(
                                                "material-symbols-outlined text-4xl mb-4 block transition-colors",
                                                form.connectors.includes(o.label) ? "text-[#0b0c10]" : "text-gray-200 group-hover:text-[#0b0c10]"
                                            )}>{o.icon}</span>
                                            <span className="font-bold text-xs uppercase tracking-widest text-[#0b0c10]">{o.label}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="flex justify-between pt-8 border-t border-gray-50">
                                    <button type="button" onClick={() => setStep(2)} className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#0b0c10]">{isFr ? "Retour" : "Back"}</button>
                                    <Button 
                                        type="button" 
                                        onClick={() => setStep(4)} 
                                        className="bg-[#0b0c10] rounded-none text-xs font-black uppercase tracking-[0.2em] px-12 h-16 group"
                                    >
                                        {isFr ? "Choisir mon forfait" : "Choose my plan"}
                                        <span className="material-symbols-outlined ml-2 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 4: TIER */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div>
                                    {form.isPreset && (
                                        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                            <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
                                                {isFr ? `Personnalisation du modèle: ${form.presetName}` : `Personalizing Template: ${form.presetName}`}
                                            </span>
                                        </div>
                                    )}
                                    <h2 className="text-xl md:text-4xl font-display font-black text-[#0b0c10] uppercase tracking-tight leading-none">
                                        {isFr ? "Hébergement & Sécurité" : "Hosting & Security"}
                                    </h2>
                                    <p className="text-gray-600 mt-4 text-sm md:text-xl font-light leading-relaxed max-w-2xl">
                                        {isFr ? "Choisissez le niveau de puissance et de confidentialité adapté à votre infrastructure." : "Choose the level of power and confidentiality adapted to your infrastructure."}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    {tiers.map((t: any) => (
                                        <button
                                            key={t.id}
                                            type="button"
                                            onClick={() => {
                                                setField("tier", t.id);
                                            }}
                                            className={cn(
                                                "w-full p-6 text-left border transition-all flex items-center justify-between group",
                                                form.tier === t.id ? "border-[#0b0c10] bg-gray-50" : "border-gray-100 hover:border-gray-300"
                                            )}
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className={cn(
                                                    "w-12 h-12 flex items-center justify-center border transition-colors shrink-0",
                                                    form.tier === t.id ? "border-[#0b0c10] bg-[#0b0c10] text-white" : "border-gray-100 text-gray-200 group-hover:text-gray-400"
                                                )}>
                                                    <span className="material-symbols-outlined text-xl">
                                                        {t.id === 'free-agent' ? 'auto_awesome' : 
                                                         t.id === 'start-agent' ? 'bolt' : 
                                                         t.id === 'pro-agent' ? 'rocket_launch' : 
                                                         t.id === 'elite-agent' ? 'hub' : 'workspace_premium'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-black text-sm block text-[#0b0c10] uppercase">{t.title}</span>
                                                        <span className="text-[10px] font-bold text-blue-600 px-2 py-0.5 bg-blue-50 rounded-full">{t.pricing}</span>
                                                    </div>
                                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest leading-none font-medium">{t.description}</span>
                                                </div>
                                            </div>
                                            <div className={cn(
                                                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                                form.tier === t.id ? "border-[#0b0c10]" : "border-gray-200"
                                            )}>
                                                {form.tier === t.id && <div className="w-2.5 h-2.5 rounded-full bg-[#0b0c10]" />}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* Orchestration Toggle */}
                                <div className="mt-8 p-6 border-2 border-dashed border-blue-100 bg-blue-50/30">
                                    <div className="flex items-start gap-4">
                                        <Checkbox 
                                            id="orchestration" 
                                            checked={form.orchestration} 
                                            onCheckedChange={(checked) => setField("orchestration", checked)}
                                            className="mt-1 border-blue-200 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <label
                                                htmlFor="orchestration"
                                                className="text-sm font-black text-[#0b0c10] uppercase tracking-tight flex items-center gap-2"
                                            >
                                                {isFr ? "Ajouter l'Orchestrateur Intelligent" : "Add Smart Orchestration"}
                                                <span className="text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded-sm">+199$/mo</span>
                                            </label>
                                            <p className="text-[10px] text-gray-500 font-light">
                                                {isFr 
                                                    ? "Permet à plusieurs agents de collaborer entre vos départements sous la direction d'un 'Manager' virtuel."
                                                    : "Enables multiple agents to collaborate across departments under a virtual 'Manager'."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between pt-8">
                                    <button type="button" onClick={() => form.isPreset ? setStep(2) : setStep(3)} className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#0b0c10]">{isFr ? "Retour" : "Back"}</button>
                                    <Button type="button" disabled={!form.tier} onClick={() => setStep(5)} className="bg-[#0b0c10] rounded-none text-xs font-black uppercase tracking-[0.2em] px-12 h-14">
                                        {isFr ? "Continuer" : "Continue"}
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 5: CONTEXT */}
                        {step === 5 && (
                            <motion.div
                                key="step5"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-xl md:text-4xl font-display font-black text-[#0b0c10] uppercase tracking-tight leading-none">
                                        {isFr ? "Contexte PME" : "SME Context"}
                                    </h2>
                                    <p className="text-gray-600 mt-4 text-sm md:text-xl font-light leading-relaxed max-w-2xl">{isFr ? "Aidez-nous à calibrer la charge de travail." : "Help us calibrate the workload."}</p>
                                </div>
                                <div className="space-y-10">
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-6">{isFr ? "Taille de l'entreprise" : "Company Size"}</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {["1-10", "11-50", "51-200", "200+"].map(size => (
                                                <button
                                                    key={size}
                                                    type="button"
                                                    onClick={() => setField("companySize", size)}
                                                    className={cn(
                                                        "py-4 border text-xs font-black transition-all uppercase tracking-widest",
                                                        form.companySize === size ? "bg-[#0b0c10] text-white border-[#0b0c10]" : "border-gray-100 text-gray-400 hover:border-gray-300"
                                                    )}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">{isFr ? "Votre Industrie" : "Your Industry"}</label>
                                        <Input value={form.industry} onChange={(e) => setField("industry", e.target.value)} placeholder={isFr ? "ex: Manufacturier, Santé..." : "ex: Manufacturing, Tech..."} className="rounded-none border-gray-100 focus:border-[#0b0c10] h-14 text-base" />
                                    </div>
                                </div>
                                 <div className="flex justify-between pt-8 border-t border-gray-100">
                                     <button type="button" onClick={() => setStep(4)} className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#0b0c10]">{isFr ? "Retour" : "Back"}</button>
                                     <Button 
                                        type="button" 
                                        disabled={!form.companySize || !form.industry} 
                                        onClick={() => setStep(6)} 
                                        className="bg-[#0b0c10] rounded-none text-xs font-black uppercase tracking-[0.2em] px-12 h-16 group"
                                    >
                                        {isFr ? "Finaliser" : "Finalize"}
                                        <span className="material-symbols-outlined ml-2 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 6: CONTACT */}
                        {step === 6 && (
                            <motion.div
                                key="step6"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-xl md:text-4xl font-display font-black text-[#0b0c10] uppercase tracking-tight leading-none">
                                        {isFr ? "Prêt pour le Décollage" : "Ready for Launch"}
                                    </h2>
                                    <p className="text-gray-600 mt-4 text-sm md:text-xl font-light leading-relaxed max-w-2xl">{isFr ? "Où devons-nous envoyer la proposition finale ?" : "Where should we send the final proposal?"}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">{isFr ? "Prénom" : "First Name"}</label>
                                        <Input required value={form.firstName} onChange={(e) => setField("firstName", e.target.value)} className="rounded-none border-gray-100 focus:border-[#0b0c10] h-14 text-base" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">{isFr ? "Nom" : "Last Name"}</label>
                                        <Input required value={form.lastName} onChange={(e) => setField("lastName", e.target.value)} className="rounded-none border-gray-100 focus:border-[#0b0c10] h-14 text-base" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">{isFr ? "Courriel" : "Email"}</label>
                                        <Input required type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} className="rounded-none border-gray-100 focus:border-[#0b0c10] h-14 text-base" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">{isFr ? "Téléphone" : "Phone"}</label>
                                        <Input required type="tel" value={form.phone} onChange={(e) => setField("phone", e.target.value)} className="rounded-none border-gray-100 focus:border-[#0b0c10] h-14 text-base" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">{isFr ? "Entreprise" : "Company"}</label>
                                        <Input required value={form.company} onChange={(e) => setField("company", e.target.value)} className="rounded-none border-gray-100 focus:border-[#0b0c10] h-14 text-base" />
                                    </div>
                                </div>
                                
                                <div className="pt-4">
                                    <TurnstileWidget
                                        lang={lang}
                                        onVerify={(token) => setTurnstileToken(token)}
                                        onExpire={() => setTurnstileToken(null)}
                                        onError={() => setTurnstileToken(null)}
                                    />
                                </div>

                                {error && <p className="text-red-600 text-xs font-black uppercase">{error}</p>}

                                 <div className="flex justify-between pt-8 items-center border-t border-gray-100">
                                     <button type="button" onClick={() => setStep(5)} className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#0b0c10]">{isFr ? "Retour" : "Back"}</button>
                                     <Button 
                                        disabled={loading || !form.firstName || !form.lastName || !form.email || !form.phone || !form.company} 
                                        type="submit" 
                                        className="bg-[#0b0c10] rounded-none text-xs font-black uppercase tracking-[0.2em] px-12 h-16 shadow-xl shadow-black/20"
                                    >
                                         {loading ? (isFr ? "Traitement..." : "Processing...") : (isFr ? "Confirmer & Réserver" : "Confirm & Reserve")}
                                     </Button>
                                 </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>

             {/* Desktop Sidebar - Sticky on the right */}
             <div className="hidden lg:block lg:sticky lg:top-24 w-80 order-2">
                <ConfiguratorSummary 
                    lang={lang} 
                    isMobile={false}
                    selections={{
                        mission: form.mission,
                        connectors: form.connectors,
                        tier: form.tier,
                        tierTitle: selectedTier?.title,
                        presetName: form.presetName,
                        orchestration: form.orchestration
                    }} 
                />
            </div>
        </div>
    );
}
