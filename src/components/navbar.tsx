"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n-config";
import LanguageSwitcher from "./language-switcher";

export function Navbar({ lang, dictionary = {}, minimal = false }: { lang: Locale; dictionary?: Record<string, any>; minimal?: boolean }) {
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [isTrainingMenuOpen, setIsTrainingMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close menus on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsMegaMenuOpen(false);
            setIsTrainingMenuOpen(false);
            setIsMobileMenuOpen(false);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo Area */}
                    <div className="shrink-0 flex items-center">
                        <Link href={`/${lang}`} className="flex items-center">
                            <img src="/logoStigmaTechnologies188x64.png" alt="Stigma Technologies Logo" className="h-9 w-auto hover:opacity-80 transition-opacity" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    {!minimal && (
                        <div className="hidden lg:flex items-center space-x-10">
                            <div
                                className="flex items-center h-20"
                                onMouseLeave={() => setIsMegaMenuOpen(false)}
                            >
                                <button
                                    className="relative flex items-center text-[13px] font-bold text-surface-dark uppercase tracking-widest hover:text-surface-dark/60 transition-colors h-full group"
                                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                                >
                                    {dictionary.services || "Services"}
                                    <span className={`material-symbols-outlined text-[18px] ml-1 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`}>expand_more</span>
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-surface-dark transition-all duration-300 group-hover:w-full"></div>
                                </button>

                                {/* Dropdown Mega Menu */}
                                {isMegaMenuOpen && (
                                    <div className="fixed top-20 left-0 w-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-t border-gray-100 py-12 transition-all duration-300 origin-top animate-in slide-in-from-top-2 fade-in">
                                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                            <div className="grid grid-cols-4 gap-12 text-left">

                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span className="material-symbols-outlined text-surface-dark/40 text-xl">inventory_2</span>
                                                        <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400">{dictionary.products}</h3>
                                                    </div>
                                                    <ul className="space-y-4">
                                                        <li><Link className="text-[15px] font-medium text-surface-dark hover:text-surface-dark/60 transition-colors" href={`/${lang}/products/cyber-protect-cloud#data-protection`} onClick={() => setIsMegaMenuOpen(false)}>{dictionary.disasterRecovery || "Reprise après sinistre"}</Link></li>
                                                        <li><Link className="text-[15px] font-medium text-surface-dark hover:text-surface-dark/60 transition-colors" href={`/${lang}/products/cyber-protect-cloud#data-protection`} onClick={() => setIsMegaMenuOpen(false)}>{dictionary.backup || "Sauvegarde"}</Link></li>
                                                        <li><Link className="text-[15px] font-medium text-surface-dark hover:text-surface-dark/60 transition-colors" href={`/${lang}/products/cyber-protect-cloud`} onClick={() => setIsMegaMenuOpen(false)}>{dictionary.cybersecurity || "Cybersécurité"}</Link></li>
                                                        <li><Link className="text-[15px] font-medium text-surface-dark hover:text-surface-dark/60 transition-colors" href={`/${lang}/products/sentinelone`} onClick={() => setIsMegaMenuOpen(false)}>{dictionary.sentinelOne || "SentinelOne"}</Link></li>
                                                        <li><Link className="text-[15px] font-medium text-surface-dark hover:text-surface-dark/60 transition-colors" href={`/${lang}/solutions/managed-cybersecurity`} onClick={() => setIsMegaMenuOpen(false)}>{dictionary.humanRiskManagement || "Human Risk Management"}</Link></li>
                                                        <li><Link className="text-[15px] font-medium text-surface-dark hover:text-surface-dark/60 transition-colors" href={`/${lang}/products/support-360`} onClick={() => setIsMegaMenuOpen(false)}>{dictionary.support360 || "Support 360"}</Link></li>
                                                        <li><Link className="text-[15px] font-bold text-surface-dark hover:text-surface-dark/60 transition-colors flex items-center gap-2" href={`/${lang}/marketplace`} onClick={() => setIsMegaMenuOpen(false)}>{dictionary.marketplace?.label || "Marketplace"} <span className="text-[8px] bg-surface-dark text-white px-1 leading-none py-0.5 font-black uppercase">Alpha</span></Link></li>
                                                    </ul>
                                                </div>

                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span className="material-symbols-outlined text-surface-dark/40 text-xl">layers</span>
                                                        <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400">{dictionary.services}</h3>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-y-5">
                                                        <Link className="group flex items-center gap-3" href={`/${lang}/solutions/managed-it-services`} onClick={() => setIsMegaMenuOpen(false)}>
                                                            <span className="material-symbols-outlined text-[18px] text-gray-300 group-hover:text-surface-dark transition-colors">settings_suggest</span>
                                                            <span className="text-[14px] font-medium text-surface-dark group-hover:pl-1 transition-all">Managed IT Services</span>
                                                        </Link>
                                                        <Link className="group flex items-center gap-3" href={`/${lang}/solutions/managed-cybersecurity`} onClick={() => setIsMegaMenuOpen(false)}>
                                                            <span className="material-symbols-outlined text-[18px] text-gray-300 group-hover:text-surface-dark transition-colors">shield_lock</span>
                                                            <span className="text-[14px] font-medium text-surface-dark group-hover:pl-1 transition-all">Managed Cybersecurity</span>
                                                        </Link>
                                                        <Link className="group flex items-center gap-3" href={`/${lang}/solutions/ai-machine-learning`} onClick={() => setIsMegaMenuOpen(false)}>
                                                            <span className="material-symbols-outlined text-[18px] text-gray-300 group-hover:text-surface-dark transition-colors">psychology</span>
                                                            <span className="text-[14px] font-medium text-surface-dark group-hover:pl-1 transition-all">AI & Machine Learning</span>
                                                        </Link>
                                                        <Link className="group flex items-center gap-3" href={`/${lang}/solutions/grc`} onClick={() => setIsMegaMenuOpen(false)}>
                                                            <span className="material-symbols-outlined text-[18px] text-gray-300 group-hover:text-surface-dark transition-colors">fact_check</span>
                                                            <span className="text-[14px] font-medium text-surface-dark group-hover:pl-1 transition-all">Governance, Risk and Compliance</span>
                                                        </Link>
                                                        <Link className="group flex items-center gap-3" href={`/${lang}/solutions/digital-transformation`} onClick={() => setIsMegaMenuOpen(false)}>
                                                            <span className="material-symbols-outlined text-[18px] text-gray-300 group-hover:text-surface-dark transition-colors">dynamic_feed</span>
                                                            <span className="text-[14px] font-medium text-surface-dark group-hover:pl-1 transition-all">Digital Transformation</span>
                                                        </Link>
                                                        <Link className="group flex items-center gap-3" href={`/${lang}/solutions/cloud-computing`} onClick={() => setIsMegaMenuOpen(false)}>
                                                            <span className="material-symbols-outlined text-[18px] text-gray-300 group-hover:text-surface-dark transition-colors">cloud_upload</span>
                                                            <span className="text-[14px] font-medium text-surface-dark group-hover:pl-1 transition-all">Cloud Computing</span>
                                                        </Link>
                                                        <Link className="group flex items-center gap-3" href={`/${lang}/solutions/industries`} onClick={() => setIsMegaMenuOpen(false)}>
                                                            <span className="material-symbols-outlined text-[18px] text-gray-300 group-hover:text-surface-dark transition-colors">business</span>
                                                            <span className="text-[14px] font-medium text-surface-dark group-hover:pl-1 transition-all">{dictionary.industries || "Industry Solutions"}</span>
                                                        </Link>
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span className="material-symbols-outlined text-surface-dark/40 text-xl">account_tree</span>
                                                        <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400">{dictionary.caseStudies}</h3>
                                                    </div>
                                                    <div className="space-y-6">
                                                        <Link className="group block" href={`/${lang}/case-studies/financial-security-overhaul`} onClick={() => setIsMegaMenuOpen(false)}>
                                                            <div className="w-full h-24 bg-gray-50 mb-3 overflow-hidden border border-gray-100 relative">
                                                                <img
                                                                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&auto=format&fit=crop"
                                                                    alt="Financial Sector Security"
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                />
                                                                <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[9px] font-bold text-surface-dark tracking-widest uppercase px-2 py-0.5">Cybersecurity</span>
                                                            </div>
                                                            <h4 className="text-[13px] font-bold text-surface-dark group-hover:text-gray-600 mb-1 transition-colors">Financial Sector Security Overhaul</h4>
                                                            <p className="text-[11px] text-gray-500 line-clamp-1">Zero Trust architecture for a major regional bank</p>
                                                        </Link>
                                                        <Link className="group block" href={`/${lang}/case-studies/retail-cloud-migration`} onClick={() => setIsMegaMenuOpen(false)}>
                                                            <div className="w-full h-24 bg-gray-50 mb-3 overflow-hidden border border-gray-100 relative">
                                                                <img
                                                                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop"
                                                                    alt="Retail Cloud Migration"
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                />
                                                                <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[9px] font-bold text-surface-dark tracking-widest uppercase px-2 py-0.5">Cloud Computing</span>
                                                            </div>
                                                            <h4 className="text-[13px] font-bold text-surface-dark group-hover:text-gray-600 mb-1 transition-colors">Retail Cloud Migration</h4>
                                                            <p className="text-[11px] text-gray-500 line-clamp-1">Scaling infrastructure for global peak-season traffic</p>
                                                        </Link>
                                                        <Link className="flex items-center gap-1.5 text-[11px] font-bold text-surface-dark hover:gap-2.5 transition-all pt-1" href={`/${lang}/case-studies`} onClick={() => setIsMegaMenuOpen(false)}>
                                                            View all case studies
                                                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                                        </Link>
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span className="material-symbols-outlined text-surface-dark/40 text-xl">newspaper</span>
                                                        <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400">BLOG</h3>
                                                    </div>
                                                    <ul className="space-y-5">
                                                        <li>
                                                            <Link className="group flex items-center justify-between" href={`/${lang}/blog/zero-trust-evolution-2024`} onClick={() => setIsMegaMenuOpen(false)}>
                                                                <span className="text-[14px] font-medium text-surface-dark group-hover:text-surface-dark/60 transition-colors">Zero Trust Evolution 2024</span>
                                                                <span className="bg-gray-100 text-surface-dark text-[9px] font-black px-1.5 py-0.5 rounded tracking-tighter uppercase">New</span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="group block" href={`/${lang}/blog/ai-frontier-business`} onClick={() => setIsMegaMenuOpen(false)}>
                                                                <span className="text-[14px] font-medium text-surface-dark group-hover:text-surface-dark/60 transition-colors">The AI Frontier in Business</span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="group block" href={`/${lang}/blog/managed-security-101`} onClick={() => setIsMegaMenuOpen(false)}>
                                                                <span className="text-[14px] font-medium text-surface-dark group-hover:text-surface-dark/60 transition-colors">Managed Security 101</span>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                    <div className="pt-6 border-t border-gray-100 mt-6">
                                                        <Link className="flex items-center gap-2 text-[12px] font-bold text-surface-dark hover:gap-3 transition-all" href={`/${lang}/blog`} onClick={() => setIsMegaMenuOpen(false)}>
                                                            {dictionary.viewAllInsights}
                                                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                                        </Link>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Training Mega Menu */}
                            <div
                                className="flex items-center h-20"
                                onMouseLeave={() => setIsTrainingMenuOpen(false)}
                            >
                                <button
                                    className="relative flex items-center text-[13px] font-bold text-surface-dark uppercase tracking-widest hover:text-surface-dark/60 transition-colors h-full group"
                                    onMouseEnter={() => setIsTrainingMenuOpen(true)}
                                >
                                    {dictionary.training}
                                    <span className={`material-symbols-outlined text-[18px] ml-1 transition-transform duration-300 ${isTrainingMenuOpen ? 'rotate-180' : ''}`}>expand_more</span>
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-surface-dark transition-all duration-300 group-hover:w-full"></div>
                                </button>

                                {isTrainingMenuOpen && (
                                    <div className="fixed top-20 left-0 w-full bg-white shadow-[0_20px_60px_rgba(10,15,44,0.10)] border-t border-surface-dark/10 transition-all duration-300 origin-top animate-in slide-in-from-top-2 fade-in">

                                        {/* Slim top accent bar */}
                                        <div className="h-[2px] w-full bg-surface-dark" />

                                        {/* Main content */}
                                        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
                                            <div className="grid grid-cols-12 gap-0 text-left">

                                                {/* Column 1: Parcours IA */}
                                                <div className="col-span-3 pr-8 border-r border-gray-100">
                                                    <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-surface-dark/30 mb-5">Parcours IA</p>
                                                    <div className="space-y-0.5">
                                                        {[
                                                            { slug: "ia-decouverte", label: "IA Découverte", desc: "Fondamentaux & cas d'usage" },
                                                            { slug: "ia-booster", label: "IA Booster", desc: "Workflows & automatisation" },
                                                            { slug: "ia-crea", label: "IA Créative", desc: "Génération de contenu" },
                                                            { slug: "ia-rh", label: "IA pour les RH", desc: "Culture organisationnelle" },
                                                            { slug: "microsoft-copilot", label: "Microsoft Copilot", desc: "Suite Office 365 + IA" },
                                                        ].map(({ slug, label, desc }) => (
                                                            <Link key={slug} className="group flex items-baseline justify-between py-2.5 border-b border-transparent hover:border-surface-dark/8 transition-all duration-200" href={`/${lang}/products/ai-training/${slug}`} onClick={() => setIsTrainingMenuOpen(false)}>
                                                                <span className="text-[13.5px] font-medium text-surface-dark group-hover:tracking-wide transition-all duration-300 leading-none">{label}</span>
                                                                <span className="text-[11px] text-gray-400 ml-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">{desc}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Column 2: Agents IA — Processus Métiers */}
                                                <div className="col-span-4 px-8 border-r border-gray-100">
                                                    <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-surface-dark/30 mb-5">
                                                        Agents IA <span className="text-surface-dark/15 mx-1">—</span> Processus Métiers
                                                    </p>
                                                    <div className="grid grid-cols-2 gap-x-6 gap-y-0.5">
                                                        {[
                                                            { slug: "ia-finance", label: "Finance & Comptabilité", desc: "Facturation, reporting, trésorerie" },
                                                            { slug: "ia-marketing-agents", label: "Marketing", desc: "Campagnes & agents de contenu" },
                                                            { slug: "ia-production", label: "Production & Opérations", desc: "Maintenance prédictive" },
                                                            { slug: "ia-logistique", label: "Logistique & Transport", desc: "Optimisation & dispatch" },
                                                            { slug: "ia-juridique", label: "Droit & Conformité", desc: "Contrats & Loi 25" },
                                                        ].map(({ slug, label, desc }) => (
                                                            <Link key={slug} className="group py-2.5 border-b border-transparent hover:border-surface-dark/8 transition-all duration-200" href={`/${lang}/products/ai-training/${slug}`} onClick={() => setIsTrainingMenuOpen(false)}>
                                                                <span className="block text-[13px] font-medium text-surface-dark group-hover:tracking-wide transition-all duration-300 leading-none">{label}</span>
                                                                <span className="block text-[11px] text-gray-400 mt-1.5 leading-none">{desc}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Column 3: Cybersécurité */}
                                                <div className="col-span-2 px-8 border-r border-gray-100">
                                                    <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-surface-dark/30 mb-5 flex items-center gap-3">
                                                        Cybersécurité
                                                        <span className="text-[8px] font-bold tracking-[0.15em] text-surface-dark border border-surface-dark px-1.5 py-0.5 leading-none">NOUVEAU</span>
                                                    </p>
                                                    <div className="space-y-0.5">
                                                        {[
                                                            { slug: "cyber-sensibilisation", label: "Sensibilisation", desc: "Tous les employés" },
                                                            { slug: "cyber-loi25", label: "Données & Loi 25", desc: "Conformité & gouvernance" },
                                                            { slug: "cyber-defense", label: "Défense Active", desc: "Équipes TI avancées" },
                                                        ].map(({ slug, label, desc }) => (
                                                            <Link key={slug} className="group py-2.5 block border-b border-transparent hover:border-surface-dark/8 transition-all duration-200" href={`/${lang}/products/ai-training/${slug}`} onClick={() => setIsTrainingMenuOpen(false)}>
                                                                <span className="block text-[13px] font-medium text-surface-dark group-hover:tracking-wide transition-all duration-300 leading-none">{label}</span>
                                                                <span className="block text-[11px] text-gray-400 mt-1.5 leading-none">{desc}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Right column: editorial promo */}
                                                <div className="col-span-3 pl-8 flex flex-col justify-between">
                                                    <div>
                                                        <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-surface-dark/30 mb-5">Financement</p>
                                                        <h3 className="text-[22px] font-black text-surface-dark leading-tight mb-3 tracking-tight">
                                                            Jusqu&apos;à <span className="relative inline-block">85%<span className="absolute bottom-0.5 left-0 w-full h-[2px] bg-surface-dark/20" /></span>
                                                            <br />subventionné
                                                        </h3>
                                                        <p className="text-[12px] text-gray-500 leading-relaxed mb-6">
                                                            Programmes Emploi Québec, PAMT et fonds sectoriels couvrent nos formations IA et cybersécurité.
                                                        </p>
                                                        <div className="flex gap-4 mb-8">
                                                            <div className="border-l-2 border-surface-dark pl-3">
                                                                <span className="block text-[17px] font-black text-surface-dark">7h</span>
                                                                <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold mt-0.5">Par atelier</span>
                                                            </div>
                                                            <div className="border-l-2 border-surface-dark/20 pl-3">
                                                                <span className="block text-[17px] font-black text-surface-dark">12+</span>
                                                                <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold mt-0.5">Formations</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Link className="group inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-surface-dark hover:gap-5 transition-all duration-300" href={`/${lang}/products/ai-training`} onClick={() => setIsTrainingMenuOpen(false)}>
                                                        Voir le catalogue
                                                        <span className="block h-px w-8 bg-surface-dark group-hover:w-12 transition-all duration-300" />
                                                    </Link>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link className="flex items-center text-[13px] font-bold text-surface-dark uppercase tracking-widest hover:text-surface-dark/60 transition-colors h-20 relative group" href={`/${lang}/case-studies`}>
                                {dictionary.caseStudies}
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-surface-dark transition-all duration-300 group-hover:w-full"></div>
                            </Link>
                            <Link className="flex items-center text-[13px] font-bold text-surface-dark uppercase tracking-widest hover:text-surface-dark/60 transition-colors h-20 relative group" href={`/${lang}/events`}>
                                {dictionary.events || (lang === "fr" ? "Événements" : "Events")}
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-surface-dark transition-all duration-300 group-hover:w-full"></div>
                            </Link>
                            <Link className="flex items-center text-[13px] font-bold text-surface-dark uppercase tracking-widest hover:text-surface-dark/60 transition-colors h-20 relative group" href={`/${lang}/contact`}>
                                {dictionary.contact}
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-surface-dark transition-all duration-300 group-hover:w-full"></div>
                            </Link>
                        </div>
                    )}

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-6">
                        <LanguageSwitcher />
                        {!minimal && (
                            <Link href={`/${lang}/quote`}>
                                <Button className="bg-surface-dark hover:bg-surface-dark/90 text-white rounded-none px-8 py-5 text-xs font-bold uppercase tracking-widest shadow-lg shadow-surface-dark/10">
                                    {dictionary.requestQuote}
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    {!minimal && (
                        <div className="lg:hidden flex items-center gap-4">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-surface-dark hover:text-gray-600 transition-colors focus:outline-none"
                            >
                                {isMobileMenuOpen ? (
                                    <span className="material-symbols-outlined text-[28px]">close</span>
                                ) : (
                                    <span className="material-symbols-outlined text-[28px]">menu</span>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Navigation Sidebar */}
            {
                !minimal && isMobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 top-20 bg-white z-40 overflow-y-auto animate-in slide-in-from-right duration-300 border-t border-gray-100">
                        <div className="p-6 space-y-8 pb-32">
                            <div>
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Menu</h3>
                                <nav className="space-y-6">
                                    <Link className="block text-2xl font-bold text-surface-dark" href={`/${lang}/about`} onClick={() => setIsMobileMenuOpen(false)}>{dictionary.about}</Link>
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-surface-dark uppercase tracking-wider">{dictionary.services}</h4>
                                        <ul className="space-y-4 pl-4 border-l-2 border-gray-100">
                                            <li><Link className="block text-lg font-medium text-surface-dark" href={`/${lang}/solutions/managed-it-services`} onClick={() => setIsMobileMenuOpen(false)}>Managed IT</Link></li>
                                            <li><Link className="block text-lg font-medium text-surface-dark" href={`/${lang}/solutions/managed-cybersecurity`} onClick={() => setIsMobileMenuOpen(false)}>Cybersecurity</Link></li>
                                            <li><Link className="block text-lg font-medium text-surface-dark" href={`/${lang}/solutions/digital-transformation`} onClick={() => setIsMobileMenuOpen(false)}>Digital Transformation</Link></li>
                                            <li><Link className="block text-lg font-medium text-surface-dark" href={`/${lang}/solutions/industries`} onClick={() => setIsMobileMenuOpen(false)}>{dictionary.industries || "Industries"}</Link></li>
                                            <li><Link className="block text-lg font-medium text-surface-dark" href={`/${lang}/products/support-360`} onClick={() => setIsMobileMenuOpen(false)}>Support 360</Link></li>
                                            <li><Link className="block text-lg font-bold text-surface-dark" href={`/${lang}/marketplace`} onClick={() => setIsMobileMenuOpen(false)}>{dictionary.marketplace?.label || "Marketplace"}</Link></li>
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-surface-dark uppercase tracking-wider">{dictionary.training}</h4>
                                        <ul className="space-y-4 pl-4 border-l-2 border-gray-100">
                                            <li><Link className="block text-lg font-medium text-surface-dark" href={`/${lang}/products/ai-training/ia-decouverte`} onClick={() => setIsMobileMenuOpen(false)}>IA Découverte</Link></li>
                                            <li><Link className="block text-lg font-medium text-surface-dark" href={`/${lang}/products/ai-training/ia-booster`} onClick={() => setIsMobileMenuOpen(false)}>IA Booster</Link></li>
                                            <li><Link className="block text-lg font-medium text-surface-dark" href={`/${lang}/products/ai-training/microsoft-copilot`} onClick={() => setIsMobileMenuOpen(false)}>Microsoft Copilot</Link></li>
                                            <li className="pt-1"><span className="text-[10px] font-bold tracking-widest text-surface-dark uppercase">Agents IA</span></li>
                                            <li><Link className="block text-lg font-medium text-surface-dark" href={`/${lang}/products/ai-training/ia-finance`} onClick={() => setIsMobileMenuOpen(false)}>IA Finance</Link></li>
                                            <li><Link className="block text-lg font-medium text-surface-dark" href={`/${lang}/products/ai-training/ia-marketing-agents`} onClick={() => setIsMobileMenuOpen(false)}>IA Marketing</Link></li>
                                            <li><Link className="block text-lg font-medium text-surface-dark" href={`/${lang}/products/ai-training/ia-production`} onClick={() => setIsMobileMenuOpen(false)}>IA Production</Link></li>
                                            <li><Link className="block text-lg font-medium text-surface-dark" href={`/${lang}/products/ai-training/ia-logistique`} onClick={() => setIsMobileMenuOpen(false)}>IA Logistique</Link></li>
                                            <li><Link className="block text-lg font-medium text-surface-dark" href={`/${lang}/products/ai-training/ia-juridique`} onClick={() => setIsMobileMenuOpen(false)}>IA Juridique</Link></li>
                                            <li className="pt-2"><span className="text-[10px] font-bold tracking-widest text-red-600 uppercase flex items-center gap-2">Cybersécurité <span className="text-[7px] bg-red-600 text-white px-1 leading-none py-0.5">NEW</span></span></li>
                                            <li><Link className="block text-lg font-medium text-surface-dark" href={`/${lang}/products/ai-training/cyber-sensibilisation`} onClick={() => setIsMobileMenuOpen(false)}>Sensibilisation Cyber</Link></li>
                                            <li><Link className="block text-lg font-medium text-surface-dark" href={`/${lang}/products/ai-training/cyber-loi25`} onClick={() => setIsMobileMenuOpen(false)}>Données & Loi 25</Link></li>
                                            <li><Link className="block text-lg font-medium text-surface-dark" href={`/${lang}/products/ai-training/cyber-defense`} onClick={() => setIsMobileMenuOpen(false)}>Défense Active</Link></li>
                                            <li><Link className="block font-bold text-surface-dark pt-2" href={`/${lang}/products/ai-training`} onClick={() => setIsMobileMenuOpen(false)}>Voir tout le catalogue →</Link></li>
                                        </ul>
                                    </div>
                                    <Link className="block text-2xl font-bold text-surface-dark" href={`/${lang}/case-studies`} onClick={() => setIsMobileMenuOpen(false)}>{dictionary.caseStudies}</Link>
                                    <Link className="block text-2xl font-bold text-surface-dark" href={`/${lang}/events`} onClick={() => setIsMobileMenuOpen(false)}>{dictionary.events || (lang === "fr" ? "Événements" : "Events")}</Link>
                                    <Link className="block text-2xl font-bold text-surface-dark" href={`/${lang}/contact`} onClick={() => setIsMobileMenuOpen(false)}>{dictionary.contact}</Link>
                                </nav>
                            </div>

                            <div className="pt-8 border-t border-gray-100">
                                <Link href={`/${lang}/quote`} onClick={() => setIsMobileMenuOpen(false)} className="block w-full">
                                    <Button className="w-full bg-surface-dark text-white rounded-none py-7 text-sm font-bold uppercase tracking-widest hover:bg-background-dark transition-colors">
                                        {dictionary.requestQuote}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
        </nav>
    );
}
