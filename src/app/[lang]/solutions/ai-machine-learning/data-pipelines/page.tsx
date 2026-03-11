import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { PartnersMarquee } from "@/components/partners-marquee";
import { BookingSection } from "@/components/booking-section";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await props.params;
    const isFr = lang === "fr";
    return {
        title: isFr ? "Pipelines de Données | Data Engineering | Stigma Technologies" : "Data Pipelines | Data Engineering | Stigma Technologies",
        description: isFr
            ? "Construisez les fondations de votre stratégie IA avec des architectures ETL modernes."
            : "Build the foundation of your AI strategy with modern ETL architectures.",
        openGraph: {
            title: isFr ? "Ingénierie des Données | Stigma Technologies" : "Data Engineering | Stigma Technologies",
            description: isFr ? "L'infrastructure critique de l'entreprise moderne." : "The critical infrastructure for the modern enterprise.",
            url: `https://stigmatech.ca/${lang}/solutions/ai-machine-learning/data-pipelines`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/solutions/ai-machine-learning/data-pipelines` },
    };
}

export default async function DataPipelinesPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const dict = dictionary.services.dataPipelines;
    const shared = dictionary.services.shared;

    const expertiseItems = [
        {
            icon: "cloud_sync",
            title: dict.expertise.support.title,
            description: dict.expertise.support.description
        },
        {
            icon: "account_tree",
            title: dict.expertise.sales.title,
            description: dict.expertise.sales.description
        },
        {
            icon: "verified_user",
            title: dict.expertise.search.title,
            description: dict.expertise.search.description
        }
    ];

    const dataPartners = [
        { name: "Snowflake" },
        { name: "Databricks" },
        { name: "dbt Labs" },
        { name: "Fivetran" },
        { name: "Google BigQuery" },
        { name: "AWS Redshift" }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-surface-dark selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                <section className="relative pt-32 pb-24 overflow-hidden bg-surface-dark border-b border-white/5">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#1a2333]/40 blur-[100px] rounded-full pointer-events-none" />
                    <div className="absolute inset-0 opacity-10 background-grid pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <Button asChild variant="ghost" className="mb-8 text-gray-400 hover:text-white pl-0 gap-2 font-medium">
                                <a href={`/${lang}/solutions/ai-machine-learning`}>
                                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                                    {lang === 'fr' ? "Retour à l'Expertise IA" : "Back to AI Expertise"}
                                </a>
                            </Button>

                            <div>
                                <span className="inline-block bg-white/10 text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 mb-6 rounded-none border border-white/20">
                                    {dict.tag}
                                </span>
                                <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight mb-8 text-transparent bg-clip-text bg-linear-to-r from-white via-white/90 to-white/70 drop-shadow-sm">
                                    {dict.title}
                                </h1>
                                <p className="text-xl text-gray-300 font-light leading-relaxed mb-10">
                                    {dict.description}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button asChild className="bg-white text-surface-dark hover:bg-gray-100 rounded-none px-8 py-6 uppercase tracking-wider text-xs font-bold shadow-xl transition-all hover:-translate-y-0.5">
                                        <a href="#booking">{dict.cta}</a>
                                    </Button>
                                    <Button asChild className="bg-transparent text-white hover:bg-white/5 border border-white/20 rounded-none px-8 py-6 uppercase tracking-wider text-xs font-bold transition-all hover:-translate-y-0.5">
                                        <a href="#expertise">{shared.learnMore}</a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="border-b border-gray-100 py-10 bg-gray-50/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {dict.stats.map((stat: any, index: number) => (
                                <div key={index} className="flex flex-col items-center justify-center text-center">
                                    <span className="text-3xl lg:text-4xl font-display font-bold text-surface-dark mb-2">{stat.value}</span>
                                    <span className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-display font-bold text-surface-dark mb-8">{dict.benefits.title}</h2>
                                <div className="space-y-6">
                                    <p className="text-gray-600 text-lg leading-relaxed">{dict.benefits.p1}</p>
                                    <p className="text-gray-600 leading-relaxed">{dict.benefits.p2}</p>
                                    <p className="text-gray-600 leading-relaxed font-medium">{dict.benefits.p3}</p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-[4/3] w-full bg-gray-100 relative overflow-hidden group rounded-none border border-gray-200">
                                    <Image
                                        src="/images/data-pipelines-hero.png"
                                        alt="Data Pipelines Concept"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-surface-dark/5 border border-surface-dark/10 -z-10"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-gray-50 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
                            <div>
                                <span className="text-surface-dark/60 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">{shared.processTag || "OUR METHODOLOGY"}</span>
                                <h2 className="text-3xl font-display font-bold text-surface-dark">{dict.process.title}</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -translate-y-1/2 hidden md:block z-0"></div>
                            {dict.process.steps.map((step: any, index: number) => (
                                <div key={index} className="relative z-10 flex flex-col items-center text-center bg-gray-50">
                                    <div className="w-16 h-16 rounded-none bg-white border-2 border-surface-dark text-surface-dark flex items-center justify-center text-xl font-bold mb-6 shadow-md transition-transform group hover:scale-110">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-surface-dark mb-3">{step.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed px-4">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="expertise" className="py-24 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center mb-16">
                            <h2 className="text-4xl font-display font-bold text-surface-dark mb-4">{dict.expertise.title}</h2>
                            <p className="text-lg text-gray-600">{dict.expertise.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            <div className="absolute top-16 left-0 w-full h-px bg-gray-100 hidden md:block z-0"></div>
                            {expertiseItems.map((item, index) => (
                                <div key={index} className="relative z-10 flex flex-col items-center text-center group bg-white">
                                    <div className="w-20 h-20 rounded-none bg-white border border-gray-200 flex items-center justify-center mb-8 shadow-xs group-hover:border-surface-dark transition-all duration-300">
                                        <span className="material-symbols-outlined text-[32px] text-gray-400 group-hover:text-surface-dark transition-colors duration-300">{item.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-surface-dark mb-3">{item.title}</h3>
                                    <p className="text-gray-500 leading-relaxed px-4">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <PartnersMarquee partnersList={dataPartners} />

                <BookingSection dictionary={dictionary.services.aiMachineLearning.booking} />
                <ContactForm lang={lang} dictionary={dictionary} overrideDict={dictionary.services.aiMachineLearning.contactForm} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
