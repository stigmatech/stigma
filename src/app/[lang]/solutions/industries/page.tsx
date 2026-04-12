import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { PartnersMarquee } from "@/components/partners-marquee";
import { BookingSection } from "@/components/booking-section";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await props.params;
    const isFr = lang === "fr";
    return {
        title: isFr
            ? "Solutions TI par Industrie Montréal | Expertise Sectorielle QC | Stigma"
            : "Industry IT Solutions Montreal | Sector Expertise QC | Stigma",
        description: isFr
            ? "Solutions technologiques spécialisées pour la construction, le manufacturier, la santé et les services professionnels à Montréal."
            : "Specialized technological solutions for construction, manufacturing, healthcare, and professional services in Montreal.",
        openGraph: {
            title: isFr ? "Solutions par Industrie | Stigma Technologies" : "Industry Solutions | Stigma Technologies",
            description: isFr
                ? "Nous concevons des solutions informatiques et IA adaptées aux défis uniques de votre secteur d'activité."
                : "We architect IT and AI solutions designed to solve the unique challenges of your industry.",
            url: `https://stigmatech.ca/${lang}/solutions/industries`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: {
            canonical: `https://stigmatech.ca/${lang}/solutions/industries`,
        },
    };
}


export default async function Industries(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const dict = dictionary.services.industries;

    return (
        <div className="min-h-screen bg-white selection:bg-slate-950 selection:text-white">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* Hero Section */}
                <section className="bg-slate-950 text-white pt-12 lg:pt-20 pb-0 relative overflow-hidden">
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

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20">
                        <div className="max-w-4xl">
                            <div className="flex flex-wrap items-center gap-4 mb-10">
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                                    {dict.tag}
                                </span>
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-slate-400 text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    {lang === 'fr' ? "SPÉCIALISATION SECTORIELLE" : "SECTOR SPECIALIZATION"}
                                </span>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10">
                                {dict.title.split(' | ')[0]} <br/>
                                <span className="text-slate-500">{dict.title.split(' | ')[1]}</span>
                            </h1>

                            <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl tracking-tight">
                                {dict.description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <Button asChild size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none">
                                    <a href="#sectors">{dict.cta}</a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Industries Sectors Grid */}
                <section id="sectors" className="py-32 bg-white relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-12">
                            {dict.sectors.map((sector: any, i: number) => (
                                <div key={i} className="group border border-slate-100 bg-slate-50 p-8 lg:p-16 hover:bg-white hover:shadow-2xl transition-all duration-700 flex flex-col lg:flex-row gap-12 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-0 bg-blue-600 group-hover:h-full transition-all duration-700"></div>

                                    <div className="lg:w-1/3 shrink-0">
                                        <div className="w-16 h-16 bg-white border border-slate-200 flex items-center justify-center mb-10 group-hover:border-slate-950 transition-all duration-500 scale-100 group-hover:scale-110 relative rotate-3 group-hover:rotate-0">
                                            <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-blue-600 transition-colors">{sector.icon}</span>
                                        </div>
                                        <h3 className="text-3xl font-display font-black text-slate-950 uppercase tracking-tighter mb-4 italic leading-none">{sector.title}</h3>
                                        <p className="text-slate-500 font-light tracking-tight italic mb-8">{sector.description}</p>

                                        {sector.caseStudy && (
                                            <Link href={`/${lang}/case-studies/${sector.caseStudy.slug}`} className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 hover:text-slate-950 transition-colors">
                                                {sector.caseStudy.cta}
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </Link>
                                        )}
                                    </div>

                                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-l border-slate-200 lg:pl-16">
                                        {Object.entries(sector.services).map(([key, value]: [string, any], j: number) => {
                                            if (key === 'support') return null;
                                            return (
                                                <div key={j} className="space-y-3">
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                                                        {key === 'ai' ? (lang === 'fr' ? "IA" : "AI") :
                                                         key === 'it' ? (lang === 'fr' ? "TI" : "IT") :
                                                         key === 'cyber' ? (lang === 'fr' ? "CYBERSÉCURITÉ" : "CYBERSECURITY") :
                                                         key === 'compliance' ? (lang === 'fr' ? "CONFORMITÉ" : "COMPLIANCE") :
                                                         key === 'digital' ? (lang === 'fr' ? "TRANSFORMATION DIGITALE" : "DIGITAL TRANSFORMATION") :
                                                         key}
                                                    </h4>
                                                    <p className="text-sm text-slate-600 font-light leading-relaxed tracking-tight">{value}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <PartnersMarquee dictionary={dictionary.home.partners} />

                <BookingSection lang={lang} dictionary={dictionary.services.aiMachineLearning.booking} />
                <ContactForm lang={lang} dictionary={dictionary} overrideDict={dict.contactForm} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
