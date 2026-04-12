"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n-config";
import LanguageSwitcher from "./language-switcher";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts } from "@/lib/blog-posts-data";
import { caseStudies } from "@/lib/case-studies-data";
import { supabase } from "@/lib/supabase";

export function Navbar({ lang, dictionary = {}, minimal = false }: { lang: Locale; dictionary?: Record<string, any>; minimal?: boolean }) {
    const navDict = dictionary?.common?.nav || dictionary;
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [isTrainingMenuOpen, setIsTrainingMenuOpen] = useState(false);
    const [isResourcesMenuOpen, setIsResourcesMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [latestEvent, setLatestEvent] = useState<any>(null);
    const isFr = lang === 'fr';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            if (window.scrollY > 50) {
                setIsMegaMenuOpen(false);
                setIsTrainingMenuOpen(false);
                setIsResourcesMenuOpen(false);
            }
        };
        
        // Initialize state on mount
        handleScroll();
        
        window.addEventListener("scroll", handleScroll);

        const fetchLatestEvent = async () => {
            const { data } = await supabase
                .from('events')
                .select('*')
                .gte('event_date', new Date().toISOString())
                .order('event_date', { ascending: true })
                .limit(1);
            
            if (data && data.length > 0) {
                setLatestEvent(data[0]);
            }
        };
        fetchLatestEvent();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const latestBlog = blogPosts[0];
    const latestCaseStudy = caseStudies[0];

    // Menu Item Component for consistency
    const NavLink = ({ href, children, onClick }: { href: string, children: React.ReactNode, onClick?: () => void }) => (
        <Link 
            href={href} 
            onClick={onClick}
            className={`relative flex items-center text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 h-20 group ${scrolled ? 'text-surface-dark' : 'text-white'}`}
        >
            {children}
            <motion.div 
                className={`absolute bottom-0 left-0 h-0.5 origin-left ${scrolled ? 'bg-surface-dark' : 'bg-white'}`}
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3, ease: "circOut" }}
            />
        </Link>
    );

    return (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
            <motion.nav 
                initial={false}
                animate={{
                    width: scrolled ? "95%" : "100%",
                    marginTop: scrolled ? "12px" : "0px",
                    borderRadius: scrolled ? "8px" : "0px",
                    height: "80px",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`pointer-events-auto border-b transition-all duration-700 font-sans ${
                    scrolled 
                        ? "bg-white/90 backdrop-blur-2xl border-gray-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] px-8" 
                        : "bg-transparent border-transparent px-4"
                }`}
            >
                <div className="max-w-7xl mx-auto h-full flex justify-between items-center transition-all duration-500">
                    {/* Logo Area */}
                    <div className="shrink-0 flex items-center">
                        <Link href={`/${lang}`} className="flex items-center">
                            <img 
                                src="/logoStigmaTechnologies188x64.png" 
                                alt="Stigma Technologies Logo" 
                                className={`transition-all duration-700 ${scrolled ? 'h-6 sm:h-7' : 'h-8 sm:h-9 invert brightness-0 dark:invert-0 dark:brightness-100'} w-auto hover:opacity-80`} 
                                style={{ filter: !scrolled ? 'brightness(0) invert(1)' : 'none' }}
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    {!minimal && (
                        <div className="hidden lg:flex items-center space-x-12">
                            {/* Services Menu */}
                            <div
                                className="relative flex items-center h-20"
                                onMouseLeave={() => setIsMegaMenuOpen(false)}
                            >
                                <button
                                    className={`relative flex items-center text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 h-full group ${scrolled ? 'text-surface-dark' : 'text-white'}`}
                                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                                >
                                    {navDict.services || "Services"}
                                    <motion.span 
                                        animate={{ rotate: isMegaMenuOpen ? 180 : 0 }}
                                        className="material-symbols-outlined text-[16px] ml-1.5 opacity-40 group-hover:opacity-100"
                                    >
                                        expand_more
                                    </motion.span>
                                    <motion.div 
                                        className={`absolute bottom-0 left-0 h-0.5 origin-left ${scrolled ? 'bg-surface-dark' : 'bg-white'}`}
                                        animate={{ width: isMegaMenuOpen ? "100%" : 0 }}
                                    />
                                </button>

                                <AnimatePresence>
                                    {isMegaMenuOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="fixed top-20 left-0 w-full bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-t border-gray-100/50 py-10 text-surface-dark"
                                        >
                                            <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
                                                {/* Architecture & Strategy Column */}
                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-surface-dark/20 text-lg">schema</span>
                                                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">{navDict.architecture}</h3>
                                                    </div>
                                                    <div className="grid gap-y-3">
                                                        {[
                                                            { href: `/mip`, label: navDict.mipModel, icon: "account_tree" },
                                                            { href: `/solutions/grc`, label: navDict.regOps, icon: "fact_check" },
                                                            { href: `/solutions/managed-it-services`, label: navDict.managedIt, icon: "settings_suggest" },
                                                        ].map((item, i) => (
                                                            <Link 
                                                                key={i}
                                                                href={`/${lang}${item.href}`}
                                                                className="group flex items-center gap-4 py-1"
                                                                onClick={() => setIsMegaMenuOpen(false)}
                                                            >
                                                                <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-blue-600 transition-colors">{item.icon}</span>
                                                                <span className="text-[12px] font-bold text-surface-dark group-hover:translate-x-1 transition-transform">{item.label}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Performance & Execution Column */}
                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-surface-dark/20 text-lg">rocket_launch</span>
                                                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">{navDict.solutions}</h3>
                                                    </div>
                                                    <div className="grid gap-y-3">
                                                        {[
                                                            { href: `/solutions/managed-cybersecurity`, label: navDict.managedCyber, icon: "shield_lock" },
                                                            { href: `/solutions/ai-machine-learning`, label: navDict.managedAi, icon: "smart_toy" },
                                                            { href: `/solutions/cloud-computing`, label: navDict.infraAi, icon: "cloud" },
                                                            { href: `/products/support-360`, label: navDict.support360, icon: "support_agent" },
                                                        ].map((item, i) => (
                                                            <Link 
                                                                key={i}
                                                                href={`/${lang}${item.href}`}
                                                                className="group flex items-center gap-4 py-1"
                                                                onClick={() => setIsMegaMenuOpen(false)}
                                                            >
                                                                <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-blue-600 transition-colors">{item.icon}</span>
                                                                <span className="text-[12px] font-bold text-surface-dark group-hover:translate-x-1 transition-transform">{item.label}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Software & Ecosystem Column */}
                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-surface-dark/20 text-lg">apps</span>
                                                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">{navDict.software}</h3>
                                                    </div>
                                                    <div className="grid gap-y-3">
                                                        {[
                                                            { href: `/products/microsoft-365`, label: "Microsoft 365", icon: "grid_view" },
                                                            { href: `/products/azure`, label: "Microsoft Azure", icon: "cloud_queue" },
                                                            { href: `/products/sentinelone`, label: "SentinelOne", icon: "security" },
                                                            { href: `/products/cyber-protect-cloud`, label: "Acronis Cyber", icon: "shield" },
                                                            { href: `/marketplace`, label: dictionary.marketplace?.label || "Marketplace", icon: "storefront", alpha: true },
                                                        ].map((item, i) => (
                                                            <Link 
                                                                key={i}
                                                                href={`/${lang}${item.href}`}
                                                                className="group flex items-center gap-4 py-1"
                                                                onClick={() => setIsMegaMenuOpen(false)}
                                                            >
                                                                <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-blue-600 transition-colors">{item.icon}</span>
                                                                <div className="flex items-center justify-between grow">
                                                                    <span className="text-[12px] font-bold text-surface-dark group-hover:translate-x-1 transition-transform">{item.label}</span>
                                                                    {item.alpha && <span className="text-[7px] bg-slate-950 text-white px-1.5 py-0.5 font-black uppercase ml-2">Alpha</span>}
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Strategic CTA Column */}
                                                <div className="bg-slate-950 p-8 text-white flex flex-col justify-between h-full shadow-2xl relative overflow-hidden group">
                                                    {/* Decorative background element */}
                                                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mr-24 -mt-24 transition-transform duration-700 group-hover:scale-150 rounded-bl-full"></div>
                                                    
                                                    <div className="relative z-10">
                                                        <span className="text-[8px] font-black tracking-widest uppercase border border-white/20 px-2.5 py-1 mb-6 inline-block text-blue-400">
                                                            {navDict.freeAssessment}
                                                        </span>
                                                        <h4 className="text-xl font-display font-medium leading-tight mb-4">
                                                            {navDict.cyberAuditTitle}
                                                        </h4>
                                                        <p className="text-white/40 text-[11px] leading-relaxed mb-8">
                                                            {navDict.cyberAuditDesc}
                                                        </p>
                                                    </div>
                                                    
                                                    <Link 
                                                        href={`/${lang}/quote`} 
                                                        className="relative z-10 w-full bg-white text-surface-dark py-4 px-6 flex items-center justify-between group-hover:bg-gray-50 transition-colors"
                                                        onClick={() => setIsMegaMenuOpen(false)}
                                                    >
                                                        <span className="text-[10px] font-black uppercase tracking-widest">{navDict.requestAudit}</span>
                                                        <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                                    </Link>
                                                </div>
                                            </div>

                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Training Menu */}
                            <div
                                className="relative flex items-center h-20"
                                onMouseLeave={() => setIsTrainingMenuOpen(false)}
                            >
                                <button
                                    className={`relative flex items-center text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 h-full group ${scrolled ? 'text-surface-dark' : 'text-white'}`}
                                    onMouseEnter={() => setIsTrainingMenuOpen(true)}
                                >
                                    {navDict.training}
                                    <motion.span 
                                        animate={{ rotate: isTrainingMenuOpen ? 180 : 0 }}
                                        className="material-symbols-outlined text-[16px] ml-1.5 opacity-40 group-hover:opacity-100"
                                    >
                                        expand_more
                                    </motion.span>
                                    <motion.div 
                                        className={`absolute bottom-0 left-0 h-0.5 origin-left ${scrolled ? 'bg-surface-dark' : 'bg-white'}`}
                                        animate={{ width: isTrainingMenuOpen ? "100%" : 0 }}
                                    />
                                </button>

                                <AnimatePresence>
                                    {isTrainingMenuOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="fixed top-20 left-0 w-full bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-t border-gray-100/50 py-12 text-surface-dark"
                                        >
                                            <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-12">
                                                <div className="col-span-3 grid grid-cols-3 gap-12">
                                                    <div>
                                                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 mb-6">{navDict.fundamentalPaths}</h3>
                                                        <ul className="space-y-4">
                                                            <li><Link className="text-[13px] font-bold text-surface-dark hover:text-[#0078d4]" href={`/${lang}/products/ai-training/ia-decouverte`}>{navDict.trainingItems?.discovery || "AI Discovery"}</Link></li>
                                                            <li><Link className="text-[13px] font-bold text-surface-dark hover:text-[#0078d4]" href={`/${lang}/products/ai-training/ia-booster`}>{navDict.trainingItems?.booster || "AI Booster"}</Link></li>
                                                            <li><Link className="text-[13px] font-bold text-surface-dark hover:text-[#0078d4]" href={`/${lang}/products/ai-training/microsoft-copilot`}>Microsoft Copilot</Link></li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 mb-6">{navDict.agentsProfessions}</h3>
                                                        <ul className="space-y-4">
                                                            <li><Link className="text-[13px] font-bold text-surface-dark hover:text-[#0078d4]" href={`/${lang}/products/ai-training/ia-finance`}>{navDict.trainingItems?.finance || "Finance & HR"}</Link></li>
                                                            <li><Link className="text-[13px] font-bold text-surface-dark hover:text-[#0078d4]" href={`/${lang}/products/ai-training/ia-marketing-agents`}>{navDict.trainingItems?.marketing || "Marketing Agents"}</Link></li>
                                                            <li><Link className="text-[13px] font-bold text-surface-dark hover:text-[#0078d4]" href={`/${lang}/products/ai-training/ia-juridique`}>{navDict.trainingItems?.legal || "Law & Compliance"}</Link></li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 mb-6">{navDict.cyberPrivacy}</h3>
                                                        <ul className="space-y-4">
                                                            <li><Link className="text-[13px] font-bold text-surface-dark hover:text-[#0078d4]" href={`/${lang}/products/ai-training/cyber-sensibilisation`}>{navDict.trainingItems?.cyber || "Cyber Awareness"}</Link></li>
                                                            <li><Link className="text-[13px] font-bold text-surface-dark hover:text-[#0078d4]" href={`/${lang}/products/ai-training/cyber-loi25`}>{navDict.trainingItems?.governance || "Privacy & Governance"}</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="bg-[#0b0c10] p-8 text-white flex flex-col justify-between">
                                                    <div>
                                                        <span className="text-[8px] font-black tracking-widest uppercase border border-white/20 px-2 py-1 mb-4 inline-block">{navDict.funding}</span>
                                                        <h4 className="text-xl font-bold leading-tight mb-4">{navDict.fundingTitle}</h4>
                                                        <p className="text-white/50 text-[12px] leading-relaxed">{navDict.fundingDesc}</p>
                                                    </div>
                                                    <Link href={`/${lang}/products/ai-training`} className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2 group">
                                                        {navDict.fullCatalog}
                                                        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div
                                className="relative flex items-center h-20"
                                onMouseLeave={() => setIsResourcesMenuOpen(false)}
                            >
                                <button
                                    className={`relative flex items-center text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 h-full group ${scrolled ? 'text-surface-dark' : 'text-white'}`}
                                    onMouseEnter={() => setIsResourcesMenuOpen(true)}
                                >
                                    {navDict.resources}
                                    <motion.span 
                                        animate={{ rotate: isResourcesMenuOpen ? 180 : 0 }}
                                        className="material-symbols-outlined text-[16px] ml-1.5 opacity-40 group-hover:opacity-100"
                                    >
                                        expand_more
                                    </motion.span>
                                    <motion.div 
                                        className={`absolute bottom-0 left-0 h-0.5 origin-left ${scrolled ? 'bg-surface-dark' : 'bg-white'}`}
                                        animate={{ width: isResourcesMenuOpen ? "100%" : 0 }}
                                    />
                                </button>

                                <AnimatePresence>
                                    {isResourcesMenuOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="fixed top-20 left-0 w-full bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-t border-gray-100/50 py-10 text-surface-dark"
                                        >
                                            <div className="max-w-6xl mx-auto px-8 grid grid-cols-3 gap-16">
                                                
                                                {/* Blog */}
                                                <div className="space-y-8">
                                                    <div className="flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-surface-dark/20 text-lg">newspaper</span>
                                                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">Blog</h3>
                                                    </div>
                                                    {latestBlog && (
                                                        <Link className="group block" href={`/${lang}/blog/${latestBlog.slug}`} onClick={() => setIsResourcesMenuOpen(false)}>
                                                            <div className="aspect-video bg-gray-50 mb-4 overflow-hidden border border-gray-100 relative">
                                                                <Image 
                                                                    src={latestBlog.image} 
                                                                    fill
                                                                    sizes="(max-width: 768px) 100vw, 300px"
                                                                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                                                                    alt={latestBlog.title[isFr ? 'fr' : 'en']}
                                                                />
                                                                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[8px] font-black tracking-widest uppercase px-2 py-1">{latestBlog.tag[isFr ? 'fr' : 'en']}</span>
                                                            </div>
                                                            <h4 className="text-[13px] font-bold text-surface-dark group-hover:text-[#0078d4] transition-colors leading-tight mb-2 line-clamp-2">{latestBlog.title[isFr ? 'fr' : 'en']}</h4>
                                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium block">{latestBlog.date[isFr ? 'fr' : 'en']}</span>
                                                        </Link>
                                                    )}
                                                    <div className="pt-2">
                                                        <Link href={`/${lang}/blog`} className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#0078d4] group" onClick={() => setIsResourcesMenuOpen(false)}>
                                                            {navDict.viewAllArticles}
                                                            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                                        </Link>
                                                    </div>
                                                </div>

                                                {/* Case Studies */}
                                                <div className="space-y-8">
                                                    <div className="flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-surface-dark/20 text-lg">account_tree</span>
                                                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">{navDict.caseStudies}</h3>
                                                    </div>
                                                    {latestCaseStudy && (
                                                        <Link className="group block" href={`/${lang}/case-studies/${latestCaseStudy.slug}`} onClick={() => setIsResourcesMenuOpen(false)}>
                                                            <div className="aspect-video bg-gray-50 mb-4 overflow-hidden border border-gray-100 relative">
                                                                <Image 
                                                                    src={latestCaseStudy.heroImage} 
                                                                    fill
                                                                    sizes="(max-width: 768px) 100vw, 300px"
                                                                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                                                                    alt={latestCaseStudy.title[isFr ? 'fr' : 'en']}
                                                                />
                                                                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[8px] font-black tracking-widest uppercase px-2 py-1">Featured</span>
                                                            </div>
                                                            <h4 className="text-[13px] font-bold text-surface-dark group-hover:text-[#0078d4] transition-colors leading-tight line-clamp-2">{latestCaseStudy.title[isFr ? 'fr' : 'en']}</h4>
                                                        </Link>
                                                    )}
                                                    <Link href={`/${lang}/case-studies`} className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-surface-dark group mt-4 hover:text-[#0078d4]" onClick={() => setIsResourcesMenuOpen(false)}>
                                                        {navDict.allCaseStudies}
                                                        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                                    </Link>
                                                </div>

                                                {/* Events */}
                                                <div className="space-y-8">
                                                    <div className="flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-surface-dark/20 text-lg">event</span>
                                                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">{navDict.events || (isFr ? "Événements" : "Events")}</h3>
                                                    </div>
                                                    <div className="bg-gray-50 border border-gray-100 p-6 flex flex-col h-[65%] justify-between">
                                                        {latestEvent ? (
                                                            <div>
                                                                <h4 className="text-[12px] font-bold text-surface-dark mb-2 line-clamp-2">
                                                                    {isFr ? (latestEvent.title_fr || latestEvent.title) : (latestEvent.title_en || latestEvent.title)}
                                                                </h4>
                                                                <p className="text-sm font-light text-gray-500 mb-6 flex items-center gap-2">
                                                                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                                                    {new Date(latestEvent.event_date).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                                </p>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <h4 className="text-[12px] font-bold text-surface-dark mb-2">{navDict.liveTitle}</h4>
                                                                <p className="text-sm font-light text-gray-500 mb-6">{navDict.liveDesc}</p>
                                                            </div>
                                                        )}
                                                        <Link href={`/${lang}/events`} className="inline-flex w-full justify-center items-center gap-2 bg-background-dark text-white px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors" onClick={() => setIsResourcesMenuOpen(false)}>
                                                            {navDict.viewCalendar}
                                                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                                        </Link>
                                                    </div>
                                                </div>

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <NavLink href={`/${lang}/contact`}>{navDict.contact}</NavLink>
                        </div>
                    )}

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
                        <LanguageSwitcher lang={lang} scrolled={scrolled} />
                        {!minimal && (
                            <Link href={`/${lang}/quote`}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button className={`rounded-none px-4 sm:px-10 py-4 sm:py-5 text-[9px] sm:text-[10px] font-black uppercase sm:tracking-[0.2em] shadow-2xl transition-all duration-500 ${
                                        scrolled 
                                        ? 'bg-slate-950 text-white hover:bg-black' 
                                        : 'bg-white text-slate-950 hover:bg-gray-100'
                                    }`}>
                                        <span className="xs:inline md:hidden lg:hidden">{lang === 'fr' ? 'Soumission' : 'Quote'}</span>
                                        <span className="hidden md:inline">{navDict.requestQuote}</span>
                                    </Button>
                                </motion.div>
                            </Link>
                        )}
                        
                        {/* Mobile Menu Button */}
                        {!minimal && (
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`lg:hidden h-10 w-10 flex items-center justify-center transition-all duration-500 ${scrolled || isMobileMenuOpen ? 'text-surface-dark' : 'text-white'}`}
                            >
                                <span className="material-symbols-outlined text-[28px]">
                                    {isMobileMenuOpen ? 'close' : 'menu'}
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="lg:hidden fixed inset-0 bg-white/95 backdrop-blur-2xl z-40 overflow-y-auto pt-24 px-8"
                    >
                        <div className="flex flex-col space-y-12 pb-32">
                            {/* Products Section */}
                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{navDict.productsLabel || (isFr ? "Produits" : "Products")}</h3>
                                <div className="space-y-6">
                                    {[
                                        { href: "/products/azure", label: "Microsoft Azure" },
                                        { href: "/products/microsoft-365", label: "Microsoft 365" },
                                        { href: "/products/cyber-protect-cloud", label: navDict.cybersecurity || "Cybersecurity" },
                                        { href: "/products/sentinelone", label: "SentinelOne" },
                                        { href: "/marketplace", label: dictionary.marketplace?.label || "Marketplace" },
                                    ].map((item, i) => (
                                        <Link 
                                            key={i} 
                                            className="block text-3xl font-black text-surface-dark uppercase tracking-tight" 
                                            href={`/${lang}${item.href}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Solutions Section */}
                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{navDict.services}</h3>
                                <div className="space-y-6">
                                    {[
                                        { href: "/solutions/managed-it-services", label: navDict.managedIt || (isFr ? "Support Augmenté" : "Managed IT") },
                                        { href: "/solutions/managed-cybersecurity", label: navDict.managedCyber || (isFr ? "Cyber Adaptive" : "Managed Cyber") },
                                        { href: "/solutions/grc", label: navDict.regOps || (isFr ? "RegOps & Loi 25" : "RegOps & GRC") },
                                        { href: "/solutions/ai-machine-learning", label: navDict.managedAi || (isFr ? "Agents IA" : "AI Agents") },
                                        { href: "/solutions/cloud-computing", label: navDict.infraAi || (isFr ? "Infrastructure IA" : "Cloud AI") },
                                        { href: "/products/support-360", label: navDict.support360 || (isFr ? "Support 360" : "Support 360") },
                                    ].map((item, i) => (
                                        <Link 
                                            key={i} 
                                            className="block text-3xl font-black text-surface-dark uppercase tracking-tight" 
                                            href={`/${lang}${item.href}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Training Section */}
                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{navDict.training}</h3>
                                <div className="space-y-6">
                                    {[
                                        { href: "/products/ai-training/ia-decouverte", label: navDict.trainingItems?.discovery || (isFr ? "IA Découverte" : "AI Discovery") },
                                        { href: "/products/ai-training/ia-booster", label: navDict.trainingItems?.booster || (isFr ? "IA Booster" : "AI Booster") },
                                        { href: "/products/ai-training/ia-finance", label: navDict.trainingItems?.finance || (isFr ? "IA Finance" : "AI Finance") },
                                        { href: "/products/ai-training", label: navDict.fullCatalog || "Catalogue Complet", bold: true },
                                    ].map((item, i) => (
                                        <Link 
                                            key={i} 
                                            className={`block text-2xl font-bold ${item.bold ? "text-[#0078d4]" : "text-surface-dark"}`}
                                            href={`/${lang}${item.href}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Resources Section */}
                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{navDict.resources}</h3>
                                <div className="space-y-6">
                                    {[
                                        { href: "/insights", label: navDict.insights || "Insights" },
                                        { href: "/case-studies", label: navDict.caseStudies || "Case Studies" },
                                        { href: "/events", label: navDict.events || "Events" },
                                    ].map((item, i) => (
                                        <Link 
                                            key={i} 
                                            className="block text-2xl font-bold text-surface-dark" 
                                            href={`/${lang}${item.href}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6 pt-12 border-t border-gray-100">
                                <Link className="block text-xl font-bold text-surface-dark hover:text-[#0078d4] transition-colors" href={`/${lang}/contact`} onClick={() => setIsMobileMenuOpen(false)}>{navDict.contact}</Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
