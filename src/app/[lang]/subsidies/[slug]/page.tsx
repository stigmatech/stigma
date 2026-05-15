import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getSubsidyData, getAllSubsidies } from "@/data/subsidies-data";
import { getCourseData, getCourseSlug } from "@/data/ai-training-courses";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
    const { lang, slug } = await props.params;
    const subsidy = getSubsidyData(slug, lang);
    if (!subsidy) return { title: "Subsidy Not Found" };

    const isFr = lang === "fr";
    const category = isFr ? "Subvention & Aide Financière" : "Grant & Financial Aid";

    return {
        title: `${subsidy.name} | ${category} | Stigma Technologies`,
        description: subsidy.description,
    };
}

export default async function SubsidyDetailPage(props: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const { lang, slug } = await props.params;
    const dictionary = await getDictionary(lang as Locale);
    const subsidy = getSubsidyData(slug, lang);

    if (!subsidy) {
        notFound();
    }

    const isFr = lang === "fr";

    return (
        <div className="min-h-screen bg-white selection:bg-amber-500/30 pt-24 font-sans leading-relaxed">
            <Navbar lang={lang as Locale} dictionary={dictionary.common.nav} />

            <main className="relative overflow-hidden font-sans">
                {/* Hero Section - Elite Dark Financial Hero */}
                <section className="bg-slate-950 text-white pt-12 lg:pt-20 pb-32 relative overflow-hidden">
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

                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                        <nav className="flex items-center space-x-6 text-[10px] font-black tracking-[0.4em] text-white/40 uppercase mb-12 italic">
                            <Link href={`/${lang}/products/ai-training`} className="hover:text-amber-500 transition-colors">
                                {isFr ? "CADRE_FORMATION" : "TRAINING_FRAMEWORK"}
                            </Link>
                            <span className="w-8 h-px bg-white/10"></span>
                            <span className="text-white/20">{isFr ? "NODE_SUBVENTION" : "FINANCIAL_NODE"}</span>
                        </nav>

                        <div className="max-w-5xl">
                            <span className="inline-block bg-white/5 border border-white/10 text-amber-500 text-[10px] font-black tracking-[0.4em] uppercase px-4 py-2 mb-8 backdrop-blur-3xl italic">
                                {subsidy.category.toUpperCase()}
                            </span>
                            <h1 className="text-5xl lg:text-9xl font-display font-black text-white mb-12 tracking-tighter uppercase italic leading-[0.9]">
                                {subsidy.name}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-12 mt-12 pt-12 border-t border-white/10">
                                <div className="group">
                                    <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] mb-4 block italic group-hover:text-amber-500 transition-colors">{isFr ? "PLAFOND FINANCIER" : "FINANCIAL CAP"}</span>
                                    <span className="text-4xl font-black text-white tracking-tighter italic uppercase">{subsidy.amount}</span>
                                </div>
                                <div className="group">
                                    <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] mb-4 block italic group-hover:text-amber-500 transition-colors">{isFr ? "TAUX DE COUVERTURE" : "COVERAGE RATIO"}</span>
                                    <span className="text-3xl font-black text-white/60 tracking-tighter italic uppercase">{subsidy.coverage}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technical Documentation Content */}
                <section className="py-32 bg-white relative z-20 -mt-16 selection:bg-amber-500/30">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                            
                            {/* Main documentation blocks */}
                            <div className="lg:col-span-8 space-y-32">
                                {/* Program Overview - Industrial Section */}
                                <div className="group">
                                    <div className="flex items-center gap-6 mb-12">
                                        <div className="w-12 h-[2px] bg-slate-950"></div>
                                        <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] italic">
                                            {isFr ? "SYNTHÈSE DU PROGRAMME" : "PROGRAM SYNTHESIS"}
                                        </h2>
                                    </div>
                                    <p className="text-3xl text-slate-500 leading-relaxed font-light italic tracking-tight font-sans">
                                        {subsidy.fullDescription}
                                    </p>
                                </div>

                                {/* Financial Architecture */}
                                <div className="p-16 bg-slate-50 border border-slate-100 relative group overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 text-slate-200/40 font-display font-black text-8xl group-hover:text-slate-950/5 transition-colors">$$</div>
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] mb-12 italic">
                                        {isFr ? "ARCHITECTURE DE FINANCEMENT" : "FINANCIAL ARCHITECTURE"}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                                        <div>
                                            <span className="text-[10px] text-slate-950 font-black uppercase tracking-[0.3em] block mb-4 italic">{isFr ? "PLAFOND OPÉRATIONNEL" : "OPERATIONAL CAP"}</span>
                                            <p className="text-4xl font-black text-slate-950 tracking-tighter italic uppercase">{subsidy.amount}</p>
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-slate-950 font-black uppercase tracking-[0.3em] block mb-4 italic">{isFr ? "RATIO D'AIDE" : "AID RATIO"}</span>
                                            <p className="text-4xl font-black text-slate-950 tracking-tighter italic uppercase">{subsidy.coverage}</p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></div>
                                </div>

                                {/* Funded Activities & Eligibility - High-Density List */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                                    {subsidy.fundedActivities && (
                                        <div className="group">
                                            <h3 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.5em] mb-12 flex items-center gap-6 italic">
                                                <div className="w-8 h-[2px] bg-slate-950"></div>
                                                {isFr ? "ACTIVITÉS CIBLÉES" : "TARGETED ACTIVITIES"}
                                            </h3>
                                            <ul className="space-y-6">
                                                {subsidy.fundedActivities.map((activity, idx) => (
                                                    <li key={idx} className="flex items-start gap-4 text-slate-500 text-lg leading-relaxed italic font-sans">
                                                        <span className="text-amber-500 font-black mt-1">/</span>
                                                        <span>{activity}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div className="group">
                                        <h3 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.5em] mb-12 flex items-center gap-6 italic">
                                            <div className="w-8 h-[2px] bg-slate-950"></div>
                                            {isFr ? "CRITÈRES D'ADMISSIBILITÉ" : "ELIGIBILITY CRITERIA"}
                                        </h3>
                                        <ul className="space-y-6">
                                            {subsidy.eligibleCandidates.map((item, idx) => (
                                                <li key={idx} className="flex items-center gap-4 group/item">
                                                    <div className="w-6 h-6 border border-slate-100 flex items-center justify-center group-hover/item:border-amber-500 transition-colors">
                                                        <span className="material-symbols-outlined text-amber-500 text-[14px]">verified</span>
                                                    </div>
                                                    <span className="text-slate-950 text-base font-black uppercase tracking-tighter italic">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Application Pipeline */}
                                <div className="bg-slate-950 p-16 lg:p-20 relative overflow-hidden shadow-3xl text-white">
                                    <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-16 block italic">{isFr ? "PIPELINE DE DEMANDE" : "APPLICATION PIPELINE"}</span>
                                    
                                    <div className="space-y-12 relative">
                                        {subsidy.applicationProcess.map((step, idx) => (
                                            <div key={idx} className="relative pl-20 group">
                                                <div className="absolute left-0 top-0 w-12 h-12 bg-white/5 border border-white/10 text-white flex items-center justify-center z-10 group-hover:border-amber-500 group-hover:text-amber-500 transition-all duration-500">
                                                    <span className="text-[11px] font-black italic">0{idx + 1}</span>
                                                </div>
                                                <p className="text-slate-400 text-xl font-light leading-snug italic tracking-tight font-sans">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Tactical Action Sidebar */}
                            <div className="lg:col-span-4 space-y-16 lg:sticky lg:top-32">
                                <div className="bg-slate-950 p-12 text-white relative overflow-hidden shadow-3xl border border-white/5 font-sans">
                                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] mb-10 block italic">{isFr ? "ASSISTANCE TACTIQUE" : "TACTICAL ASSISTANCE"}</span>
                                    <h3 className="text-4xl font-display font-black leading-none uppercase tracking-tighter mb-10 italic">
                                        {isFr ? "Activez votre aide financière." : "Activate your funding."}
                                    </h3>
                                    <p className="text-slate-400 font-light text-lg mb-12 italic tracking-tight font-sans">
                                        {isFr
                                            ? "Expertise gratuite dans l'identification et le déploiement de vos protocoles de subvention."
                                            : "Free expertise in identifying and deploying your grant protocols."}
                                    </p>
                                    <Button asChild className="w-full h-20 bg-white hover:bg-slate-100 text-slate-950 border-none rounded-none py-6 uppercase text-[11px] font-black tracking-[0.4em] italic shadow-2xl transition-all">
                                        <Link href="#contact">{isFr ? "VÉRIFIER ADMISSIBILITÉ" : "CHECK ELIGIBILITY"}</Link>
                                    </Button>
                                    <a
                                        href={subsidy.officialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-10 flex items-center justify-center gap-4 text-[9px] font-black text-slate-500 hover:text-white transition-all uppercase tracking-[0.3em] italic"
                                    >
                                        <span className="material-symbols-outlined text-[16px] font-black">external_link</span>
                                        {isFr ? "SOURCE_OFFICIELLE" : "OFFICIAL_SOURCE"}
                                    </a>
                                </div>

                                {/* Admissible Training Intelligence */}
                                {subsidy.relatedCourses && subsidy.relatedCourses.length > 0 && (
                                    <div className="space-y-12 pt-16 border-t border-slate-50">
                                        <h3 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.5em] italic flex items-center gap-6">
                                            <div className="w-8 h-[2px] bg-slate-950"></div>
                                            {isFr ? "FORMATIONS COMPATIBLES" : "COMPATIBLE TRAINING"}
                                        </h3>
                                        <div className="space-y-6">
                                            {subsidy.relatedCourses.map((courseSlug) => {
                                                const course = getCourseData(courseSlug, lang);
                                                if (!course) return null;
                                                return (
                                                    <Link
                                                        key={courseSlug}
                                                        href={`/${lang}/products/ai-training/${getCourseSlug(courseSlug, lang)}`}
                                                        className="block p-8 border border-slate-50 bg-slate-50 hover:bg-white hover:border-slate-950 transition-all duration-700 group"
                                                    >
                                                        <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.3em] mb-4 block italic">{course.tag}</span>
                                                        <h4 className="text-xl font-black text-slate-950 uppercase tracking-tighter leading-none italic">{course.title}</h4>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <div id="contact" className="bg-slate-50">
                    <ContactForm lang={lang as Locale} dictionary={dictionary} />
                </div>
            </main>

            <Footer lang={lang as Locale} dictionary={dictionary} />
        </div>
    );
}

export async function generateStaticParams() {
    const langs = ["en", "fr"];
    const slugs = ["scale-ai", "essor", "productivite-competences", "dec-iria", "cdae", "pari-irap"];

    const params = [];
    for (const lang of langs) {
        for (const slug of slugs) {
            params.push({ lang, slug });
        }
    }
    return params;
}
