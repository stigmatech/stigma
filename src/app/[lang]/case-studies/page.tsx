import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { BookingSection } from "@/components/booking-section";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { caseStudies, CaseStudy } from "@/lib/case-studies-data";
import { client } from "@/sanity/lib/client";
import { getAllCaseStudiesQuery } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import Link from "next/link";
import CaseStudiesGrid from "@/components/case-studies/CaseStudiesGrid";

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await props.params;
    const isFr = lang === "fr";
    return {
        title: isFr 
            ? "Tactical Success & Portfolio | Stigma Technologies" 
            : "Tactical Success & Portfolio | Stigma Technologies",
        description: isFr
            ? "Orchestration de la transformation numérique et de la cybersécurité. Résultats mesurables et ROI technologique pour l'entreprise moderne."
            : "Orchestrating digital transformation and cybersecurity. Measurable results and technological ROI for the modern enterprise.",
        openGraph: {
            title: isFr 
                ? "Portfolio Tactique : Excellence Technologique Globale" 
                : "Tactical Portfolio: Global Technological Excellence",
            description: isFr 
                ? "Impact stratégique et ROI technologique pour l'entreprise moderne." 
                : "Strategic impact and technological ROI for the modern enterprise.",
            url: `https://stigmatech.ca/${lang}/case-studies`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/case-studies` },
    };
}


export default async function CaseStudiesPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const dict = dictionary.caseStudies;
    const isFr = lang === "fr";

    let sanityStudies = [];
    try {
        sanityStudies = await client.fetch(getAllCaseStudiesQuery);
    } catch (e) {
        console.error("Sanity fetch error:", e);
    }

    const dynamicStudies = sanityStudies.map((s: any) => ({
        slug: s.slug?.current || "",
        title: s.title || { en: "Untitled", fr: "Sans titre" },
        category: s.category || "IT",
        industry: s.industry || "B2B",
        heroImage: s.heroImage || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
        description: s.description || { en: "", fr: "" },
        stats: [], 
        challenge: { en: "", fr: "" },
        solution: { en: "", fr: "" },
        impact: { en: "", fr: "" },
        testimonial: undefined,
        relatedSlugs: []
    }));

    const displayStudies = dynamicStudies.length > 0 ? dynamicStudies : caseStudies;

    return (
        <div className="min-h-screen bg-slate-950 selection:bg-amber-500/30 font-sans">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main className="relative overflow-hidden font-sans">
                {/* Hero Section - Elite Dark */}
                <section className="bg-slate-950 text-white pt-12 lg:pt-20 pb-20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-white/10 animate-[scan_4s_linear_infinite] shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20"></div>
                    <style dangerouslySetInnerHTML={{ __html: `
                        @keyframes scan {
                            0% { transform: translateY(-100%); opacity: 0; }
                            5% { opacity: 1; }
                            95% { opacity: 1; }
                            100% { transform: translateY(100vh); opacity: 0; }
                        }
                    `}} />

                    <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.05]" 
                         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
                    />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-4xl">
                            {/* Elite Badge */}
                            <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 mb-10 backdrop-blur-3xl">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">{dict.hero.tag}</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 mb-10 font-sans">
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl font-sans">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                                    {isFr ? "RÉSULTATS OPÉRATIONNELS MESURABLES" : "MEASURABLE OPERATIONAL RESULTS"}
                                </span>
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10 whitespace-pre-line italic">
                                {dict.title}<span className="text-slate-500 block">{dict.titleLight}</span>
                            </h1>
                            
                            <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl tracking-tight">
                                {dict.hero.description}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Case Studies Segmented Grid - Elite Industrial Treatment */}
                <section className="py-32 bg-white relative selection:bg-amber-500/30">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-20">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block">{isFr ? "PROJETS & DÉPLOIEMENTS" : "PROJECTS & DEPLOYMENTS"}</span>
                            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter italic mb-8">{isFr ? "Portfolio Tactique" : "Tactical Portfolio"}</h2>
                        </div>
                        
                        {/* Note: In a real implementation, CaseStudiesGrid should also be harmonized. 
                            For now, we wrap its host section in Elite styles. */}
                        <CaseStudiesGrid caseStudies={displayStudies} dict={dict} lang={lang} />
                    </div>
                </section>

                {/* ROI Protocol Callout */}
                <section className="py-32 bg-slate-950 text-white relative overflow-hidden border-t border-white/5 font-sans">
                    <div className="absolute inset-0 opacity-10 font-sans" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 font-sans">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-400 mb-12 block font-sans italic">{isFr ? "PROTOCOLE DE PERFORMANCE" : "PERFORMANCE PROTOCOL"}</span>
                        <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-10 italic">
                            {isFr ? "TRANSFORMEZ VOS OPÉRATIONS EN SUCCÈS MESURABLE." : "TRANSFORM YOUR OPERATIONS INTO MEASURABLE SUCCESS."}
                        </h2>
                        <Button asChild size="lg" className="rounded-none px-12 py-8 text-[11px] uppercase tracking-[0.4em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none font-sans italic">
                            <Link href={`/${lang}/contact`}>{isFr ? "Planifier mon Audit Industriel" : "Schedule my Industrial Audit"}</Link>
                        </Button>
                    </div>
                </section>

                <BookingSection lang={lang} dictionary={dictionary.services.booking} />
                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
