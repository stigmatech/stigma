"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n-config";
import LanguageSwitcher from "./language-switcher";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts } from "@/lib/blog-posts-data";
import { caseStudies } from "@/lib/case-studies-data";
import { supabase } from "@/lib/supabase";
import { getCourseSlug } from "@/data/ai-training-courses";

export function Navbar({ lang, dictionary = {}, minimal = false, forceSolid = false }: { lang: Locale; dictionary?: Record<string, any>; minimal?: boolean; forceSolid?: boolean }) {
  const navDict = dictionary?.common?.nav || dictionary;
  
  // High-fidelity active menu and backdrop hover state
  const [activeMenu, setActiveMenu] = useState<"services" | "training" | "resources" | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  
  // Mobile drawer and accordion states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileTrainingOpen, setMobileTrainingOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  
  const [scrolled, setScrolled] = useState(false);
  const [latestEvent, setLatestEvent] = useState<any>(null);
  const isFr = lang === 'fr';
  const pathname = usePathname();
  const isPmePage = pathname?.includes(`/${lang}/pme`);
  const isSolid = scrolled || forceSolid;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > 50) {
        setActiveMenu(null);
        setHoveredNav(null);
      }
    };
    
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

  // Services Menu Configuration with Fallback Descriptions
  const servicesArchItems = [
    { href: `/mip`, label: navDict.mipModel || "Modèle MIP", icon: "account_tree", desc: isFr ? "Notre modèle méthodologique d'architecture" : "Our core architectural design methodology" },
    { href: `/solutions/grc`, label: navDict.regOps || "Compliance & Loi 25", icon: "fact_check", desc: isFr ? "Conformité proactive et gouvernance continue" : "Continuous corporate compliance & governance" },
    { href: `/solutions/loi-25`, label: navDict.loi25 || "Loi 25", icon: "policy", desc: isFr ? "Alignement Loi 25 structuré et simplifié" : "Structured & simplified Law 25 compliance" },
    { href: `/solutions/managed-it-services`, label: navDict.managedIt || "Support TI", icon: "settings_suggest", desc: isFr ? "Support informatique et IA augmenté de pointe" : "Next-generation managed IT & AI support" },
  ];

  const servicesPerfItems = [
    { href: `/solutions/managed-cybersecurity`, label: navDict.managedCyber || "Cybersécurité", icon: "shield_lock", desc: isFr ? "Protection cyber proactive et détection autonome" : "Proactive managed threat defense posture" },
    { href: `/solutions/ai-machine-learning`, label: navDict.managedAi || "Agents IA", icon: "smart_toy", desc: isFr ? "Automatisation et agents IA haute performance" : "Autonomous enterprise AI workflow automation" },
    { href: `/solutions/cloud-computing`, label: navDict.infraAi || "Cloud IA", icon: "cloud", desc: isFr ? "Cloud évolutif optimisé pour les serveurs IA" : "Scalable cloud resources tuned for AI servers" },
    { href: `/products/support-360`, label: navDict.support360 || "Support 360", icon: "support_agent", desc: isFr ? "Concierge technique disponible à chaque instant" : "Continuous expert-led IT concierge support" },
  ];

  const servicesEcosystItems = [
    { href: `/products/microsoft-365`, label: "Microsoft 365", icon: "grid_view", desc: isFr ? "Écosystème de productivité cloud collaborative" : "Collaborative enterprise productivity suites" },
    { href: `/products/azure`, label: "Microsoft Azure", icon: "cloud_queue", desc: isFr ? "Ressources cloud résilientes et intelligentes" : "Smart, resilient hyperscale cloud framework" },
    { href: `/products/sentinelone`, label: "SentinelOne", icon: "security", desc: isFr ? "EDR autonome optimisé par l'intelligence artificielle" : "Autonomous AI-powered endpoint defense" },
    { href: `/products/cyber-protect-cloud`, label: "Acronis Cyber", icon: "shield", desc: isFr ? "Sauvegarde robuste et continuité des affaires" : "Unified enterprise backup & disaster recovery" },
    { href: `/marketplace`, label: dictionary.marketplace?.label || "Marketplace", icon: "storefront", desc: isFr ? "Notre catalogue de solutions Cloud en libre-service" : "Self-serve enterprise technology marketplace", alpha: true },
  ];

  // Training Menu Configuration
  const trainingFundamentalItems = [
    { href: `/products/ai-training/${getCourseSlug("ia-decouverte", lang)}`, label: navDict.trainingItems?.discovery || "AI Discovery", desc: isFr ? "Comprendre les fondamentaux de l'IA" : "Master the basic building blocks of AI" },
    { href: `/products/ai-training/${getCourseSlug("ia-booster", lang)}`, label: navDict.trainingItems?.booster || "AI Booster", desc: isFr ? "Propulsez votre efficacité opérationnelle" : "Accelerate operational speed & productivity" },
    { href: `/products/ai-training/${getCourseSlug("microsoft-copilot", lang)}`, label: "Microsoft Copilot", desc: isFr ? "Maîtrisez votre assistant IA au quotidien" : "Deploy and utilize Microsoft Copilot safely" },
  ];

  const trainingAgentItems = [
    { href: `/products/ai-training/${getCourseSlug("ia-finance", lang)}`, label: navDict.trainingItems?.finance || "Finance & HR", desc: isFr ? "L'IA appliquée aux départements financiers et RH" : "Leverage AI workflows inside HR & Finance" },
    { href: `/products/ai-training/${getCourseSlug("ia-marketing-agents", lang)}`, label: navDict.trainingItems?.marketing || "Marketing Agents", desc: isFr ? "Automatisez votre croissance avec des agents IA" : "Build and schedule autonomous marketing growth" },
    { href: `/products/ai-training/${getCourseSlug("ia-juridique", lang)}`, label: navDict.trainingItems?.legal || "Law & Compliance", desc: isFr ? "Naviguez le cadre légal et conformité de l'IA" : "Assess and mitigate AI regulatory legal risks" },
  ];

  const trainingCyberItems = [
    { href: `/products/ai-training/${getCourseSlug("cyber-sensibilisation", lang)}`, label: navDict.trainingItems?.cyber || "Cyber Awareness", desc: isFr ? "Sensibilisation active aux menaces numériques" : "Defend your business against human error threats" },
    { href: `/products/ai-training/${getCourseSlug("cyber-loi25", lang)}`, label: navDict.trainingItems?.governance || "Privacy & Governance", desc: isFr ? "Maîtrisez la Loi 25 et la gouvernance de données" : "Handle strict personal data & Law 25 parameters" },
  ];

  // Dynamic colors based on scrolled state (Theme matching)
  const cardBgClass = "bg-white/95 border-gray-200/50 shadow-[0_30px_70px_rgba(0,0,0,0.15)] text-surface-dark";
  const textMutedClass = "text-gray-400 group-hover:text-gray-500";
  const titleClass = "text-slate-500 font-black";

  // Shared Desktop Nav Item Config
  const navItems = [
    { id: "services", label: navDict.services || "Services", isDropdown: true },
    { id: "training", label: navDict.training || (isFr ? "Formations" : "Training"), isDropdown: true },
    { id: "resources", label: navDict.resources || "Resources", isDropdown: true },
  ];

  // Custom reusable dropdown link component
  const DropdownLink = ({ href, icon, label, desc, alpha }: { href: string; icon: string; label: string; desc?: string; alpha?: boolean }) => (
    <Link 
      href={href}
      className="group flex items-start gap-4 p-3 rounded-2xl transition-all duration-300 hover:bg-slate-900/5"
      onClick={() => {
        setActiveMenu(null);
        setHoveredNav(null);
      }}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 bg-slate-100 text-slate-500 group-hover:bg-blue-500/10 group-hover:text-blue-600">
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold transition-colors text-surface-dark group-hover:text-blue-600">
            {label}
          </span>
          {alpha && (
            <span className="text-[7px] bg-blue-500 text-white px-1.5 py-0.5 font-black uppercase tracking-wider rounded-sm">
              Alpha
            </span>
          )}
        </div>
        {desc && (
          <p className={`text-[10px] font-medium leading-relaxed transition-colors ${textMutedClass}`}>
            {desc}
          </p>
        )}
      </div>
    </Link>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
      <motion.nav 
        initial={false}
        animate={{
          width: isSolid ? "95%" : "100%",
          marginTop: isSolid ? "12px" : "0px",
          borderRadius: isSolid ? "24px" : "0px",
          height: "80px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`pointer-events-auto border-b transition-all duration-700 font-sans ${
          isSolid 
            ? "bg-white/90 backdrop-blur-2xl border-gray-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] px-8" 
            : "bg-transparent border-transparent px-4"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full flex justify-between items-center relative transition-all duration-500">
          {/* Logo Area */}
          <div className="shrink-0 flex items-center">
            <Link href={`/${lang}`} className="flex items-center">
              <img 
                src="/logoStigmaTechnologies188x64.png" 
                alt="Stigma Technologies Logo" 
                className={`transition-all duration-700 ${isSolid ? 'h-6 sm:h-7' : 'h-8 sm:h-9 invert brightness-0 dark:invert-0 dark:brightness-100'} w-auto hover:opacity-80`} 
                style={{ filter: !isSolid ? 'brightness(0) invert(1)' : 'none' }}
              />
            </Link>
          </div>

          {/* Premium Desktop Navigation */}
          {!minimal && (
            <div 
              className="hidden lg:flex items-center space-x-2 h-full"
              onMouseLeave={() => {
                setActiveMenu(null);
                setHoveredNav(null);
              }}
            >
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className="relative flex items-center h-20"
                  onMouseEnter={() => {
                    setHoveredNav(item.id);
                    setActiveMenu(item.id as any);
                  }}
                >
                  <button
                    className={`relative flex items-center text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 h-full px-5 z-10 ${isSolid ? 'text-surface-dark' : 'text-white'}`}
                  >
                    {item.label}
                    <motion.span 
                      animate={{ rotate: activeMenu === item.id ? 180 : 0 }}
                      className="material-symbols-outlined text-[16px] ml-1.5 opacity-40"
                    >
                      expand_more
                    </motion.span>
                  </button>

                  {/* Elegant sliding backdrop pill */}
                  {hoveredNav === item.id && (
                    <motion.div
                      layoutId="navHoverPill"
                      className={`absolute inset-y-4 inset-x-1 rounded-full -z-0 backdrop-blur-md ${isSolid ? "bg-slate-900/5" : "bg-white/10"}`}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </div>
              ))}

              {/* Contact Link */}
              <div 
                className="relative flex items-center h-20"
                onMouseEnter={() => {
                  setHoveredNav("contact");
                  setActiveMenu(null);
                }}
              >
                <Link 
                  href={`/${lang}/contact`}
                  className={`relative flex items-center text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 h-full px-5 z-10 ${isSolid ? 'text-surface-dark' : 'text-white'}`}
                >
                  {navDict.contact}
                </Link>

                {hoveredNav === "contact" && (
                  <motion.div
                    layoutId="navHoverPill"
                    className={`absolute inset-y-4 inset-x-1 rounded-full -z-0 backdrop-blur-md ${isSolid ? "bg-slate-900/5" : "bg-white/10"}`}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </div>

              {/* Dynamic Absolute Dropdowns Container to prevent hover-gaps */}
              <AnimatePresence>
                {activeMenu === "services" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => {
                      setActiveMenu("services");
                      setHoveredNav("services");
                    }}
                    onMouseLeave={() => {
                      setActiveMenu(null);
                      setHoveredNav(null);
                    }}
                    className="absolute top-[80px] left-0 w-full pt-3 mt-[-10px] pointer-events-auto z-50"
                  >
                    <div className={`grid grid-cols-1 md:grid-cols-4 gap-10 p-10 rounded-3xl border ${cardBgClass}`}>
                      {/* Architecture & Strategy Column */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-lg text-slate-400">schema</span>
                          <h3 className={`text-[10px] uppercase tracking-[0.3em] font-black ${titleClass}`}>{navDict.architecture}</h3>
                        </div>
                        <div className="grid gap-y-2">
                          {servicesArchItems.map((item, i) => (
                            <DropdownLink key={i} {...item} />
                          ))}
                        </div>
                      </div>

                      {/* Performance & Execution Column */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-lg text-slate-400">rocket_launch</span>
                          <h3 className={`text-[10px] uppercase tracking-[0.3em] font-black ${titleClass}`}>{navDict.solutions}</h3>
                        </div>
                        <div className="grid gap-y-2">
                          {servicesPerfItems.map((item, i) => (
                            <DropdownLink key={i} {...item} />
                          ))}
                        </div>
                      </div>

                      {/* Software & Ecosystem Column */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-lg text-slate-400">apps</span>
                          <h3 className={`text-[10px] uppercase tracking-[0.3em] font-black ${titleClass}`}>{navDict.software}</h3>
                        </div>
                        <div className="grid gap-y-2">
                          {servicesEcosystItems.map((item, i) => (
                            <DropdownLink key={i} {...item} />
                          ))}
                        </div>
                      </div>

                      {/* Strategic CTA Column */}
                      <div className="bg-slate-950 p-8 text-white flex flex-col justify-between h-full shadow-2xl rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mr-24 -mt-24 transition-transform duration-700 group-hover:scale-150 rounded-bl-full" />
                        
                        <div className="relative z-10">
                          <span className="text-[8px] font-black tracking-widest uppercase border border-white/20 px-2.5 py-1 mb-6 inline-block text-blue-400 rounded-md">
                            {navDict.freeAssessment}
                          </span>
                          <h4 className="text-xl font-display font-medium leading-tight mb-4 text-white">
                            {navDict.cyberAuditTitle}
                          </h4>
                          <p className="text-white/40 text-[11px] leading-relaxed mb-8">
                            {navDict.cyberAuditDesc}
                          </p>
                        </div>
                        
                        <Link 
                          href={`/${lang}/quote`} 
                          className="relative z-10 w-full bg-white text-slate-950 py-4 px-6 flex items-center justify-between hover:bg-gray-50 transition-all rounded-xl"
                          onClick={() => {
                            setActiveMenu(null);
                            setHoveredNav(null);
                          }}
                        >
                          <span className="text-[10px] font-black uppercase tracking-widest">{navDict.requestAudit}</span>
                          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeMenu === "training" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => {
                      setActiveMenu("training");
                      setHoveredNav("training");
                    }}
                    onMouseLeave={() => {
                      setActiveMenu(null);
                      setHoveredNav(null);
                    }}
                    className="absolute top-[80px] right-0 w-[960px] pt-3 mt-[-10px] pointer-events-auto z-50"
                  >
                    <div className={`grid grid-cols-4 gap-10 p-10 rounded-3xl border ${cardBgClass}`}>
                      <div className="col-span-3 grid grid-cols-3 gap-8">
                        <div>
                          <h3 className={`text-[10px] uppercase tracking-[0.3em] font-black mb-6 ${titleClass}`}>{navDict.fundamentalPaths}</h3>
                          <div className="space-y-1">
                            {trainingFundamentalItems.map((item, i) => (
                              <DropdownLink key={i} {...item} icon="school" />
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-[10px] uppercase tracking-[0.3em] font-black mb-6 ${titleClass}`}>{navDict.agentsProfessions}</h3>
                          <div className="space-y-1">
                            {trainingAgentItems.map((item, i) => (
                              <DropdownLink key={i} {...item} icon="work" />
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-[10px] uppercase tracking-[0.3em] font-black mb-6 ${titleClass}`}>{navDict.cyberPrivacy}</h3>
                          <div className="space-y-1">
                            {trainingCyberItems.map((item, i) => (
                              <DropdownLink key={i} {...item} icon="enhanced_encryption" />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Certified Subsidies CTA Column */}
                      <div className="bg-slate-900 p-8 text-white flex flex-col justify-between h-full shadow-2xl rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mr-24 -mt-24 transition-transform duration-700 group-hover:scale-150 rounded-bl-full" />
                        <div>
                          <span className="text-[8px] font-black tracking-widest uppercase border border-white/20 px-2 py-1 mb-4 inline-block text-blue-400 rounded-md">
                            {navDict.funding}
                          </span>
                          <h4 className="text-xl font-bold leading-tight mb-4 text-white">{navDict.fundingTitle}</h4>
                          <p className="text-white/40 text-[11px] leading-relaxed mb-6">{navDict.fundingDesc}</p>
                        </div>
                        <Link 
                          href={`/${lang}/products/ai-training`} 
                          className="inline-flex w-full justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-4 px-6 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl group"
                          onClick={() => {
                            setActiveMenu(null);
                            setHoveredNav(null);
                          }}
                        >
                          {navDict.fullCatalog}
                          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeMenu === "resources" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => {
                      setActiveMenu("resources");
                      setHoveredNav("resources");
                    }}
                    onMouseLeave={() => {
                      setActiveMenu(null);
                      setHoveredNav(null);
                    }}
                    className="absolute top-[80px] right-0 w-[960px] pt-3 mt-[-10px] pointer-events-auto z-50"
                  >
                    <div className={`grid grid-cols-3 gap-10 p-10 rounded-3xl border ${cardBgClass}`}>
                      
                      {/* Blog */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-lg text-slate-400">newspaper</span>
                          <h3 className={`text-[10px] uppercase tracking-[0.3em] font-black ${titleClass}`}>Blog</h3>
                        </div>
                        {latestBlog && (
                          <Link 
                            className="group block" 
                            href={`/${lang}/blog/${latestBlog.slug}`} 
                            onClick={() => {
                              setActiveMenu(null);
                              setHoveredNav(null);
                            }}
                          >
                            <div className="aspect-video bg-gray-50 mb-4 overflow-hidden border border-gray-100/50 relative rounded-2xl shadow-sm">
                              <Image 
                                src={latestBlog.image} 
                                fill
                                sizes="(max-width: 768px) 100vw, 300px"
                                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                                alt={latestBlog.title[isFr ? 'fr' : 'en']}
                              />
                              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[8px] font-black tracking-widest uppercase px-2 py-1 rounded shadow-sm text-slate-950">
                                {latestBlog.tag[isFr ? 'fr' : 'en']}
                              </span>
                            </div>
                            <h4 className="text-[13px] font-bold transition-colors leading-tight mb-2 line-clamp-2 text-surface-dark group-hover:text-blue-600">
                              {latestBlog.title[isFr ? 'fr' : 'en']}
                            </h4>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold block">{latestBlog.date[isFr ? 'fr' : 'en']}</span>
                          </Link>
                        )}
                        <div className="pt-2">
                          <Link 
                            href={`/${lang}/blog`} 
                            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors group" 
                            onClick={() => {
                              setActiveMenu(null);
                              setHoveredNav(null);
                            }}
                          >
                            {navDict.viewAllArticles}
                            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                          </Link>
                        </div>
                      </div>

                      {/* Case Studies */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-lg text-slate-400">account_tree</span>
                          <h3 className={`text-[10px] uppercase tracking-[0.3em] font-black ${titleClass}`}>{navDict.caseStudies}</h3>
                        </div>
                        {latestCaseStudy && (
                          <Link 
                            className="group block" 
                            href={`/${lang}/case-studies/${latestCaseStudy.slug}`} 
                            onClick={() => {
                              setActiveMenu(null);
                              setHoveredNav(null);
                            }}
                          >
                            <div className="aspect-video bg-gray-50 mb-4 overflow-hidden border border-gray-100/50 relative rounded-2xl shadow-sm">
                              <Image 
                                src={latestCaseStudy.heroImage} 
                                fill
                                sizes="(max-width: 768px) 100vw, 300px"
                                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                                alt={latestCaseStudy.title[isFr ? 'fr' : 'en']}
                              />
                              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[8px] font-black tracking-widest uppercase px-2 py-1 rounded shadow-sm text-slate-950">Featured</span>
                            </div>
                            <h4 className="text-[13px] font-bold transition-colors leading-tight line-clamp-2 text-surface-dark group-hover:text-blue-600">
                              {latestCaseStudy.title[isFr ? 'fr' : 'en']}
                            </h4>
                          </Link>
                        )}
                        <div className="pt-2">
                          <Link 
                            href={`/${lang}/case-studies`} 
                            className={`inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest group transition-colors ${isFr ? 'text-blue-500 hover:text-blue-400' : 'text-blue-500 hover:text-blue-400'}`}
                            onClick={() => {
                              setActiveMenu(null);
                              setHoveredNav(null);
                            }}
                          >
                            {navDict.allCaseStudies}
                            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                          </Link>
                        </div>
                      </div>

                      {/* Upcoming Events */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-lg text-slate-400">event</span>
                          <h3 className={`text-[10px] uppercase tracking-[0.3em] font-black ${titleClass}`}>{navDict.events || (isFr ? "Événements" : "Events")}</h3>
                        </div>
                        <div className="p-6 flex flex-col h-[65%] justify-between rounded-2xl border bg-slate-50 border-gray-100">
                          {latestEvent ? (
                            <div>
                              <h4 className="text-[13px] font-bold mb-2 line-clamp-2 text-surface-dark">
                                {isFr ? (latestEvent.title_fr || latestEvent.title) : (latestEvent.title_en || latestEvent.title)}
                              </h4>
                              <p className="text-xs font-medium text-gray-400 mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                {new Date(latestEvent.event_date).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </p>
                            </div>
                          ) : (
                            <div>
                              <h4 className="text-[13px] font-bold mb-2 text-surface-dark">{navDict.liveTitle}</h4>
                              <p className="text-xs font-medium text-gray-400 mb-6 leading-relaxed">{navDict.liveDesc}</p>
                            </div>
                          )}
                          <Link 
                            href={`/${lang}/events`} 
                            className="inline-flex w-full justify-center items-center gap-2 bg-slate-950 text-white hover:bg-black px-4 py-3.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl shadow-lg shadow-black/10" 
                            onClick={() => {
                              setActiveMenu(null);
                              setHoveredNav(null);
                            }}
                          >
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
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-8">
            {/* SME / Enterprise Toggle - Minimal and Discrete */}
            <Link 
              href={isPmePage ? `/${lang}` : `/${lang}/pme`}
              className={`hidden md:flex flex-col items-center text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 group ${isSolid ? 'text-blue-600' : 'text-white/40 hover:text-white'}`}
            >
              <span>{isFr ? (isPmePage ? "Stigma Entreprise" : "Êtes-vous une PME ?") : (isPmePage ? "Stigma Enterprise" : "Are you an SME ?")}</span>
              <motion.div 
                className={`h-px w-full mt-0.5 ${isSolid ? 'bg-blue-600' : 'bg-white/40'}`}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>

            <LanguageSwitcher lang={lang} scrolled={isSolid} />
            
            {!minimal && (
              <Link href={`/${lang}/quote`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className={`rounded-full px-4 sm:px-8 py-5 text-[9px] sm:text-[10px] font-black uppercase sm:tracking-[0.2em] shadow-2xl transition-all duration-500 ${
                    isSolid 
                      ? 'bg-slate-950 text-white hover:bg-black' 
                      : 'bg-white text-slate-950 hover:bg-gray-100'
                  }`}>
                    <span className="xs:inline md:hidden lg:hidden">{lang === 'fr' ? 'Soumission' : 'Quote'}</span>
                    <span className="hidden md:inline">{navDict.requestQuote}</span>
                  </Button>
                </motion.div>
              </Link>
            )}
            
            {/* Mobile Menu Toggle Button */}
            {!minimal && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden h-10 w-10 flex items-center justify-center transition-all duration-500 ${isSolid || isMobileMenuOpen ? 'text-surface-dark' : 'text-white'}`}
              >
                <span className="material-symbols-outlined text-[28px]">
                  {isMobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Modern Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 bg-white/95 backdrop-blur-2xl z-40 overflow-y-auto pt-28 px-6"
          >
            <div className="flex flex-col space-y-8 pb-32">
              
              {/* Accordion 1: Services */}
              <div className="space-y-4">
                <button 
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex justify-between items-center w-full text-2xl font-black text-surface-dark uppercase tracking-tight py-2 border-b border-gray-100"
                >
                  <span>{navDict.services}</span>
                  <motion.span 
                    animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                    className="material-symbols-outlined text-[24px] opacity-40"
                  >
                    expand_more
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: mobileServicesOpen ? "auto" : 0, opacity: mobileServicesOpen ? 1 : 0 }}
                  className="overflow-hidden pl-4 space-y-4"
                >
                  <div className="grid gap-y-3 pt-2">
                    {[
                      ...servicesArchItems,
                      ...servicesPerfItems,
                      ...servicesEcosystItems
                    ].map((item, i) => (
                      <Link 
                        key={i} 
                        className="block text-base font-bold text-gray-700 hover:text-blue-600 py-1" 
                        href={`/${lang}${item.href}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Accordion 2: Training */}
              <div className="space-y-4">
                <button 
                  onClick={() => setMobileTrainingOpen(!mobileTrainingOpen)}
                  className="flex justify-between items-center w-full text-2xl font-black text-surface-dark uppercase tracking-tight py-2 border-b border-gray-100"
                >
                  <span>{navDict.training}</span>
                  <motion.span 
                    animate={{ rotate: mobileTrainingOpen ? 180 : 0 }}
                    className="material-symbols-outlined text-[24px] opacity-40"
                  >
                    expand_more
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: mobileTrainingOpen ? "auto" : 0, opacity: mobileTrainingOpen ? 1 : 0 }}
                  className="overflow-hidden pl-4 space-y-4"
                >
                  <div className="grid gap-y-3 pt-2">
                    {[
                      ...trainingFundamentalItems,
                      ...trainingAgentItems,
                      ...trainingCyberItems
                    ].map((item, i) => (
                      <Link 
                        key={i} 
                        className="block text-base font-bold text-gray-700 hover:text-blue-600 py-1" 
                        href={`/${lang}${item.href}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link 
                      className="block text-base font-black text-blue-600 pt-2 uppercase tracking-wider" 
                      href={`/${lang}/products/ai-training`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {navDict.fullCatalog}
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Accordion 3: Resources */}
              <div className="space-y-4">
                <button 
                  onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                  className="flex justify-between items-center w-full text-2xl font-black text-surface-dark uppercase tracking-tight py-2 border-b border-gray-100"
                >
                  <span>{navDict.resources || "Resources"}</span>
                  <motion.span 
                    animate={{ rotate: mobileResourcesOpen ? 180 : 0 }}
                    className="material-symbols-outlined text-[24px] opacity-40"
                  >
                    expand_more
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: mobileResourcesOpen ? "auto" : 0, opacity: mobileResourcesOpen ? 1 : 0 }}
                  className="overflow-hidden pl-4 space-y-4"
                >
                  <div className="grid gap-y-3 pt-2">
                    {[
                      { href: "/insights", label: navDict.insights || "Insights" },
                      { href: "/case-studies", label: navDict.caseStudies || "Case Studies" },
                      { href: "/events", label: navDict.events || "Events" },
                      { href: "/blog", label: "Blog" }
                    ].map((item, i) => (
                      <Link 
                        key={i} 
                        className="block text-base font-bold text-gray-700 hover:text-blue-600 py-1" 
                        href={`/${lang}${item.href}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Static Contact Page */}
              <div className="pt-2">
                <Link 
                  className="block text-2xl font-black text-surface-dark uppercase tracking-tight py-2 border-b border-gray-100" 
                  href={`/${lang}/contact`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {navDict.contact}
                </Link>
              </div>

              {/* Mobile CTA */}
              <div className="pt-8 space-y-4">
                <Link 
                  href={isPmePage ? `/${lang}` : `/${lang}/pme`}
                  className="block text-center py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold uppercase text-xs tracking-widest transition-all rounded-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {isFr ? (isPmePage ? "Stigma Entreprise" : "Êtes-vous une PME ?") : (isPmePage ? "Stigma Enterprise" : "Are you an SME ?")}
                </Link>
                <Link 
                  href={`/${lang}/quote`}
                  className="block text-center py-4 bg-slate-950 hover:bg-black text-white font-bold uppercase text-xs tracking-widest transition-all rounded-xl shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {navDict.requestQuote}
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
