"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProductLogo } from "@/lib/pax8";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  HelpCircle, 
  Globe, 
  CreditCard,
  CheckCircle2,
  Lock,
  Layers,
  ArrowRight,
  ShieldAlert,
  Fingerprint,
  Users
} from "lucide-react";

interface ProductDetailContentProps {
  product: any;
  pricing: any[];
  lang: string;
  dictionary: any;
  isAuthenticated: boolean;
}

export function ProductDetailContent({ product, pricing, lang, dictionary, isAuthenticated }: ProductDetailContentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isFr = lang === "fr";

  const logoUrl = getProductLogo(product.vendorName);
  
  // Find standard monthly pricing
  const monthRate = pricing.find(p => p.billingTerm === 'Monthly' && p.commitmentTerm === '1-Year') 
                  || pricing.find(p => p.billingTerm === 'Monthly')
                  || pricing[0];
  
  const priceValue = monthRate?.rates?.[0]?.suggestedRetailPrice;

  // Find specialized dict entry for benefits
  const marketplaceDict = dictionary.common.nav.marketplace.products;
  const productKey = Object.keys(marketplaceDict).find(key => 
    marketplaceDict[key].name === product.name || 
    product.vendorName.toLowerCase().includes(key.toLowerCase()) ||
    product.name.toLowerCase().includes(key.toLowerCase())
  );
  
  const specializedData = productKey ? marketplaceDict[productKey] : null;
  const benefits = specializedData?.benefits || [];
  const isHighTicket = specializedData?.msrp === "On Request" || specializedData?.msrp === "Sur Demande" || !priceValue;

  const handleSubscribe = async () => {
    if (isHighTicket) {
      router.push(`/${lang}/contact?subject=Quote request: ${product.name}`);
      return;
    }

    if (!isAuthenticated) {
      router.push(`/${lang}/client-register`);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, lang })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      console.error("Error redirecting to checkout:", e);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative pt-20 pb-32 overflow-hidden bg-slate-50 min-h-screen">
      {/* Subtle Technical Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      {/* Background Decor - Mesh Gradient for Elite Feel */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent opacity-50" />
        <div className="absolute top-[10%] left-[5%] w-[800px] h-[800px] bg-blue-500/[0.03] blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-indigo-500/[0.03] blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs / Back */}
        <div className="mb-12 flex items-center gap-4">
          <Link 
            href={`/${lang}/marketplace`}
            className="group inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all text-[10px] font-black uppercase tracking-widest"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            {isFr ? "BACK TO MARKETPLACE" : "BACK TO MARKETPLACE"}
          </Link>
          <div className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            {product.category || "PRODUCT"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Hero Segment */}
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row md:items-end gap-8">
                <div className="relative h-32 w-48 bg-white p-6 flex items-center justify-center border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden rounded-sm group">
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors" />
                  <Image 
                    src={logoUrl} 
                    alt={product.vendorName} 
                    fill 
                    className="object-contain p-6 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-slate-950 text-white rounded-none text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 border-none">
                      {product.vendorName}
                    </Badge>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-blue-600 uppercase tracking-widest">
                      <Zap size={10} fill="currentColor" />
                      Instant Provisioning
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-[0.85]">
                    {product.name}
                  </h1>
                </div>
              </div>
            </div>

            {/* Specialized Benefits Section (Only for curated products) */}
            {benefits.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit: string, idx: number) => (
                  <div key={idx} className="bg-white p-6 border border-slate-200 flex items-center gap-4 shadow-sm hover:border-blue-500 transition-colors">
                    <div className="w-10 h-10 bg-slate-50 flex items-center justify-center text-blue-600">
                      {idx % 2 === 0 ? <Fingerprint size={20} /> : <ShieldAlert size={20} />}
                    </div>
                    <span className="text-xs font-black text-slate-950 uppercase tracking-tight">{benefit}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Content Tabs / Description */}
            <div className="space-y-10">
              <div className="flex items-center gap-8 border-b border-slate-200 overflow-x-auto no-scrollbar">
                <button className="pb-4 text-[11px] font-black uppercase tracking-widest text-slate-950 border-b-2 border-slate-950 whitespace-nowrap">
                  Description
                </button>
                <button className="pb-4 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors whitespace-nowrap">
                  Technical Specifications
                </button>
                <button className="pb-4 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors whitespace-nowrap">
                   Stigma Advantage
                </button>
              </div>

              <div className="prose prose-slate prose-lg max-w-none">
                <p className="text-slate-600 font-normal leading-relaxed whitespace-pre-wrap text-lg">
                  {product.description || "No detailed description available for this product."}
                </p>
              </div>
            </div>

            {/* Managed Section - Clean & High End */}
            <div className="bg-white border border-slate-200 p-12 space-y-12 relative overflow-hidden shadow-[0_15px_40px_-20px_rgba(0,0,0,0.1)]">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                <Layers size={200} className="text-slate-900" />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="max-w-md">
                  <h3 className="text-3xl font-black text-slate-950 uppercase tracking-tight mb-4">
                    {isFr ? "Performance Gérée par Stigma" : "Stigma Managed Performance"}
                  </h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    {isFr 
                      ? "Nous ne vendons pas seulement des licences. Nous orchestrons votre environnement numérique avec une expertise d'intelligence artificielle et de cybersécurité native."
                      : "We don't just sell licenses. We orchestrate your digital environment with native AI and cybersecurity expertise."}
                  </p>
                </div>
                <div className="flex h-12 items-center px-6 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.3em] font-sans">
                  MIP STANDARD VERIFIED
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {[
                  { 
                    title: isFr ? "Souveraineté des Données" : "Data Sovereignty", 
                    desc: isFr ? "Accompagnement Loi 25 et conformité réglementaire canadienne." : "Law 25 support and Canadian regulatory compliance.",
                    icon: <ShieldCheck className="text-blue-600" size={24} />
                  },
                  { 
                    title: isFr ? "Optimisation IA" : "AI Optimization", 
                    desc: isFr ? "Intégration native avec nos agents IA pour automatiser vos workflows." : "Native integration with our AI agents to automate your workflows.",
                    icon: <Zap className="text-amber-500" size={24} />
                  },
                  { 
                    title: isFr ? "Support Élite 24/7" : "24/7 Elite Support", 
                    desc: isFr ? "Temps de réponse garanti < 15 minutes pour les incidents critiques." : "Guaranteed response time < 15 minutes for critical incidents.",
                    icon: <HelpCircle className="text-indigo-600" size={24} />
                  },
                  { 
                    title: isFr ? "Facturation Unifiée" : "Unified Billing", 
                    desc: isFr ? "Une seule interface, une seule facture pour tout votre écosystème SaaS." : "One interface, one invoice for your entire SaaS ecosystem.",
                    icon: <CreditCard className="text-emerald-600" size={24} />
                  }
                ].map((feat, i) => (
                  <div key={i} className="group">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 p-2 bg-slate-50 rounded-sm group-hover:bg-slate-100 transition-colors">
                        {feat.icon}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-slate-950 text-xs uppercase tracking-tight">{feat.title}</h4>
                        <p className="text-[11px] text-slate-500 leading-normal font-light">{feat.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar CTA - Modern Floating Style */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white border border-slate-200 p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] space-y-10 relative">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-950" />

                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing Model</span>
                    <Badge variant="outline" className="rounded-none border-slate-200 text-slate-600 text-[8px] font-bold uppercase tracking-widest">Monthly</Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="text-[11px] font-black text-slate-950 uppercase tracking-widest flex items-center gap-2">
                       {isFr ? "TARIF ENTREPRISE" : "ENTERPRISE RATE"}
                       <div className="h-px grow bg-slate-100" />
                    </div>
                    
                    {isAuthenticated ? (
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-2">
                          {isHighTicket ? (
                            <span className="text-3xl font-black text-slate-950 tracking-tighter animate-pulse">
                              {isFr ? "SUR DEMANDE" : "UPON REQUEST"}
                            </span>
                          ) : (
                            <>
                              <span className="text-5xl font-black text-slate-950 tracking-tighter">
                                ${priceValue}
                              </span>
                              <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">CAD / month / seat</span>
                            </>
                          )}
                        </div>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Tax excluded. Managed Advantage included.</p>
                      </div>
                    ) : (
                      <div className="p-6 bg-slate-50 border border-slate-100 space-y-4">
                        <div className="flex items-center gap-3">
                          <Lock className="text-slate-400" size={24} />
                          <div className="space-y-0.5">
                            <p className="text-[11px] font-black text-slate-950 uppercase leading-none tracking-tight">
                              {isFr ? "Contenu Protégé" : "Protected Content"}
                            </p>
                            <p className="text-[9px] text-slate-400 uppercase tracking-tighter leading-none">
                              Authentication required for pricing
                            </p>
                          </div>
                        </div>
                        <Button asChild variant="outline" className="w-full h-10 rounded-none border-slate-900 text-slate-900 text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                          <Link href={`/${lang}/login`}>
                             {isFr ? "Se Connecter" : "Sign In To View"}
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <Button 
                    onClick={handleSubscribe}
                    disabled={isLoading}
                    className="w-full h-16 bg-slate-950 text-white hover:bg-blue-600 rounded-none text-[11px] font-black uppercase tracking-[0.4em] shadow-xl transform transition-all active:scale-95 flex items-center justify-center gap-4 group"
                  >
                    {isLoading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {isHighTicket 
                          ? (isFr ? "CONSULTER UN EXPERT" : "CONSULT AN EXPERT")
                          : (isFr ? "COMMANDER MAINTENANT" : "ORDER NOW")}
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 text-center space-y-1">
                       <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Delivery</p>
                       <p className="text-[9px] font-bold text-slate-900 uppercase">Dedicated</p>
                    </div>
                    <div className="p-3 bg-slate-50 text-center space-y-1">
                       <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Support</p>
                       <p className="text-[9px] font-bold text-slate-900 uppercase">24/7 Elite</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-3 opacity-6 grayscale hover:grayscale-0 transition-all cursor-default group">
                    <Image src="/Logos/StigmaTechnologiesNoir-188x64.svg" alt="Verified by Stigma" width={80} height={27} className="opacity-40" />
                    <div className="h-4 w-px bg-slate-200" />
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Provisioning Partner 2026</span>
                  </div>
                </div>
              </div>

              {/* Expert Help Card */}
              <div className="bg-slate-900 p-8 space-y-6 group">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Users size={20} className="text-white" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1">Architecture Desk</p>
                      <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-none italic">Talk to a specialist</p>
                   </div>
                </div>
                <Button asChild variant="link" className="p-0 h-auto text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2">
                   <Link href={`/${lang}/contact`}>
                    {isFr ? "Demander conseil" : "Request Expert Advice"}
                    <ArrowRight size={12} />
                   </Link>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
