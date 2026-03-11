import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { PartnersMarquee } from "@/components/partners-marquee";
import { BookingSection } from "@/components/booking-section";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Image from "next/image";
import Link from "next/link";
import { TechStack } from "@/components/tech-stack";
import type { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await props.params;
    const isFr = lang === "fr";
    return {
        title: isFr
            ? "Consultant IA Montréal | Solutions Machine Learning Québec | Stigma"
            : "AI Consultant Montreal | Machine Learning Solutions Quebec | Stigma",
        description: isFr
            ? "Expert en déploiement d'IA et Machine Learning pour PME à Montréal. Automatisation, vision par ordinateur et analytics avancés pour le marché québécois."
            : "AI & Machine Learning deployment experts for SMEs in Montreal. Automation, computer vision, and advanced analytics for the Quebec market.",
        openGraph: {
            title: isFr ? "Consultation IA & Machine Learning Montréal | Stigma" : "AI & Machine Learning Consulting Montreal | Stigma",
            description: isFr
                ? "Solutions IA sur mesure conçues pour automatiser et innover au sein des entreprises du Québec."
                : "Custom AI solutions designed to automate and innovate within Quebec businesses.",
            url: `https://stigmatech.ca/${lang}/solutions/ai-machine-learning`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: {
            canonical: `https://stigmatech.ca/${lang}/solutions/ai-machine-learning`,
        },
    };
}


export default async function AIMachineLearning(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const dict = dictionary.services.aiMachineLearning;
    const shared = dictionary.services.shared;

    const expertiseItems = [
        {
            icon: "query_stats",
            title: dict.expertise.predictive.title,
            description: dict.expertise.predictive.description
        },
        {
            icon: "psychology",
            title: dict.expertise.nlp.title,
            description: dict.expertise.nlp.description
        },
        {
            icon: "videocam",
            title: dict.expertise.vision.title,
            description: dict.expertise.vision.description
        }
    ];

    const features = [
        {
            icon: "query_stats",
            title: lang === 'en' ? "Predictive Analytics" : "Analyse Prédictive",
            description: lang === 'en' ? "Leverage historical data to forecast trends and make informed, data-driven decisions." : "Exploitez les données historiques pour prévoir les tendances et prendre des décisions éclairées."
        },
        {
            icon: "memory",
            title: lang === 'en' ? "Process Automation" : "Automatisation des Processus",
            description: lang === 'en' ? "Automate repetitive tasks with intelligent bots to increase operational efficiency." : "Automatisez les tâches répétitives avec des bots intelligents pour accroître l'efficacité."
        },
        {
            icon: "videocam",
            title: lang === 'en' ? "Intelligent Video" : "Vidéo Intelligente",
            description: lang === 'en' ? "Real-time AI video surveillance and computer vision for security and analytics." : "Vidéosurveillance IA en temps réel et vision par ordinateur pour la sécurité et l'analyse."
        },
        {
            icon: "model_training",
            title: lang === 'en' ? "Data Modeling" : "Modélisation de Données",
            description: lang === 'en' ? "Custom machine learning models built specifically for your business domain." : "Modèles de machine learning personnalisés conçus spécifiquement pour votre domaine."
        },
        {
            icon: "chat",
            title: lang === 'en' ? "NLP & Chatbots" : "NLP & Chatbots",
            description: lang === 'en' ? "Deploy intelligent virtual assistants capable of natural language understanding." : "Déployez des assistants virtuels intelligents capables de comprendre le langage naturel."
        },
        {
            icon: "insights",
            title: lang === 'en' ? "Business Intelligence" : "Intelligence d'Affaires",
            description: lang === 'en' ? "Transform raw data into visualized, actionable dashboards for the C-suite." : "Transformez les données brutes en tableaux de bord visualisés et exploitables."
        }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-surface-dark selection:text-background-dark pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main className="min-h-screen selection:bg-surface-dark selection:text-background-dark bg-white overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative pt-32 pb-24 overflow-hidden bg-surface-dark border-b border-white/5">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#1a2333]/40 blur-[100px] rounded-full pointer-events-none" />
                    <div className="absolute inset-0 opacity-10 background-grid pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
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
                                <Button asChild className="bg-white text-background-dark hover:bg-gray-100 rounded-none px-8 py-6 uppercase tracking-wider text-xs font-bold">
                                    <a href="#booking">{dict.cta}</a>
                                </Button>
                                <Button variant="outline" asChild className="text-white hover:bg-white/10 rounded-none px-8 py-6 uppercase tracking-wider text-xs font-bold border-2 border-white/20">
                                    <a href="#expertise">Explore Expertise</a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-32 bg-white relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div className="relative">
                                <span className="inline-block px-4 py-1.5 rounded-none bg-surface-dark/5 text-surface-dark text-xs font-bold tracking-wider uppercase mb-6">Pourquoi Nous</span>
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-background-dark mb-10 tracking-tight leading-[1.1]">{dict.benefits.title}</h2>
                                <div className="space-y-6">
                                    <p className="text-lg text-gray-600 leading-relaxed font-light">{dict.benefits.p1}</p>
                                    <p className="text-lg text-gray-600 leading-relaxed font-light">{dict.benefits.p2}</p>
                                    <p className="text-lg text-gray-600 leading-relaxed font-light">{dict.benefits.p3}</p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-square bg-white border border-slate-100 shadow-[0_50px_100px_rgba(0,0,0,0.08)] relative overflow-hidden group rounded-none p-4">
                                    <div className="w-full h-full relative overflow-hidden">
                                        <Image
                                            src="/images/ai-expert-v2.png"
                                            alt="AI Data Scientist Professional"
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute inset-4 border border-white/20 z-10 pointer-events-none transition-all duration-700 group-hover:inset-8"></div>
                                </div>
                                {/* Decorative technical elements */}
                                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-surface-dark/5 rounded-none border border-surface-dark/10 -z-10 animate-pulse rotate-12"></div>
                                <div className="absolute -top-10 -left-10 w-48 h-48 bg-slate-50 rounded-none border border-slate-100 -z-10 -rotate-12"></div>
                                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-surface-dark/50 z-20"></div>
                                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-surface-dark/50 z-20"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Capabilities Grid */}
                <section className="py-24 bg-slate-50 border-y border-slate-100">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-20 block">
                            <span className="inline-block px-4 py-1.5 rounded-none bg-blue-100 text-blue-700 text-xs font-bold tracking-wider uppercase mb-6">
                                {dict.capabilities.tag || "Core Expertise"}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-background-dark mb-6 tracking-tight">{dict.capabilities.title}</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">{dict.capabilities.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8">
                            {dict.capabilities.items.map((feature: any, index: number) => (
                                <Link
                                    key={index}
                                    href={feature.slug === "ai-training" ? `/${lang}/products/ai-training` : `/${lang}/solutions/ai-machine-learning/${feature.slug}`}
                                    className="group bg-white p-8 rounded-none shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-background-dark/30 hover:shadow-[0_20px_40px_-15px_rgba(10,15,44,0.12)] transition-all duration-500 relative overflow-hidden flex flex-col h-full transform hover:-translate-y-1 cursor-pointer"
                                >
                                    <div className="absolute -right-4 -bottom-4 opacity-0 group-hover:opacity-[0.03] transform group-hover:scale-150 transition-all duration-700 pointer-events-none">
                                        <span className="material-symbols-outlined text-[120px] text-background-dark">{feature.icon}</span>
                                    </div>

                                    <div className="w-14 h-14 bg-gray-50 group-hover:bg-background-dark text-background-dark group-hover:text-white rounded-none flex items-center justify-center mb-8 transition-colors duration-500 relative z-10 shrink-0">
                                        <span className="material-symbols-outlined text-[26px] drop-shadow-sm">{feature.icon}</span>
                                    </div>

                                    <div className="grow relative z-10">
                                        <h3 className="text-[17px] font-bold text-background-dark mb-3 group-hover:text-gray-400 transition-colors duration-300">{feature.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-100/0 group-hover:border-gray-100 transition-colors duration-500">
                                        <div className="flex items-center text-xs font-bold text-gray-400 opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                                            {shared.learnMore || "En savoir plus"}
                                            <span className="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <PartnersMarquee />

                {/* Detailed Expertise Section - Premium Layout */}
                <section id="expertise" className="py-24 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center mb-16">
                            <h2 className="text-4xl font-display font-bold text-background-dark mb-6">{dict.expertise.title}</h2>
                            <p className="text-lg text-gray-600">{dict.expertise.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            <div className="absolute top-16 left-0 w-full h-px bg-gray-200 hidden md:block z-0"></div>
                            {expertiseItems.map((item, index) => (
                                <div key={index} className="relative z-10 flex flex-col items-center text-center bg-white group hover:-translate-y-2 transition-transform duration-500 cursor-default">
                                    <div className="w-20 h-20 rounded-none bg-white border-2 border-gray-100 flex items-center justify-center mb-8 shadow-sm group-hover:border-[#0b0c10] group-hover:shadow-[0_10px_30px_-15px_rgba(11,12,16,0.2)] transition-all duration-500 relative bg-clip-padding">
                                        {/* Inner colored circle replacement */}
                                        <div className="absolute inset-2 rounded-none bg-gray-50 group-hover:bg-gray-100 transition-colors duration-500"></div>
                                        <span className="material-symbols-outlined text-[32px] text-gray-400 group-hover:text-[#0b0c10] relative z-10 transition-colors duration-500">{item.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0b0c10] mb-4 group-hover:text-[#0b0c10] transition-colors duration-500">{item.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed px-2">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <TechStack lang={lang} dictionary={dictionary.services.aiMachineLearning.technologies} />

                {/* Use Cases Section - Industry Specific */}
                <section className="py-24 bg-slate-50 border-y border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-20 block">
                            <span className="inline-block px-4 py-1.5 rounded-none bg-blue-100 text-blue-700 text-xs font-bold tracking-wider uppercase mb-6">
                                {dict.useCases.tag}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0b0c10] mb-6 tracking-tight">
                                {dict.useCases.title}
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {dict.useCases.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {dict.useCases.items.map((item: any, index: number) => {
                                // Define slugs for linking to niche pages
                                const industrySlugs: Record<string, string> = {
                                    "Dentistes": "dentistes",
                                    "Dentists": "dentists",
                                    "Comptables": "comptables",
                                    "Accountants": "accountants",
                                    "Avocats": "avocats",
                                    "Lawyers": "lawyers",
                                    "Plombiers & Électriciens": "plombiers-electriciens",
                                    "Plumbers & Electricians": "plumbers-electricians",
                                    "Secteur Manufacturier": "manufacturier",
                                    "Manufacturing Sector": "manufacturing"
                                };
                                const slug = industrySlugs[item.sector];

                                return (
                                    <div
                                        key={index}
                                        className="bg-white p-8 border border-slate-100 hover:border-gray-300 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] rounded-none flex flex-col h-full group relative"
                                    >
                                        <div className="flex items-center space-x-5 mb-8">
                                            <div className="w-14 h-14 bg-gray-50/50 text-surface-dark flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-surface-dark/10">
                                                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                            </div>
                                            <h3 className="text-xl font-display font-bold text-[#0c0a1f] tracking-tight">{item.sector}</h3>
                                        </div>
                                        <div className="h-px bg-slate-50 w-full mb-8"></div>
                                        <p className="text-slate-500 text-sm leading-relaxed grow font-light italic">
                                            "{item.case}"
                                        </p>
                                        {slug && (
                                            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                                                <div className="flex items-center text-gray-400 font-bold text-[9px] uppercase tracking-[0.3em]">
                                                    <span className="w-6 h-px bg-gray-400/30 mr-3"></span>
                                                    <span>Cas d'usage IA</span>
                                                </div>
                                                <Link
                                                    href={`/${lang}/solutions/ai-machine-learning/${slug}`}
                                                    className="inline-flex items-center text-surface-dark font-bold text-[10px] uppercase tracking-widest hover:translate-x-1 transition-transform"
                                                >
                                                    {(dictionary.services.aiMachineLearning as any).useCaseDetails.ui.learnMore}
                                                    <span className="material-symbols-outlined text-[14px] ml-1">chevron_right</span>
                                                </Link>
                                            </div>
                                        )}
                                        {!slug && (
                                            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center text-gray-400 font-bold text-[9px] uppercase tracking-[0.3em]">
                                                <span className="w-6 h-px bg-gray-400/30 mr-3"></span>
                                                <span>Cas d'usage IA</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Intelligence Process Section */}
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-none bg-[#f1f2f4] text-surface-dark text-xs font-bold tracking-wider uppercase mb-6">
                                    {shared.processTag || "METHODOLOGY"}
                                </span>
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-surface-dark tracking-tight">{dict.process.title}</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 -translate-y-1/2 hidden md:block z-0"></div>
                            {dict.process.steps.map((step: any, index: number) => (
                                <div key={index} className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-none bg-white border-2 border-surface-dark text-surface-dark flex items-center justify-center text-xl font-bold mb-6 shadow-md transition-transform group hover:scale-110">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0c0a1f] mb-3">{step.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed px-4">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonial Section */}
                <section className="py-16 bg-white relative">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="material-symbols-outlined text-[60px] text-gray-200 mb-6 block">format_quote</span>
                        <h2 className="text-2xl md:text-3xl font-display font-medium text-[#0b0c10] leading-relaxed mb-8 italic">
                            "{dict.testimonial.quote}"
                        </h2>
                        <div className="flex flex-col items-center justify-center">
                            <h4 className="text-lg font-bold text-[#0b0c10] tracking-wide">{dict.testimonial.author}</h4>
                            <p className="text-gray-400 font-medium text-sm mt-1">{dict.testimonial.role}</p>
                            <p className="text-gray-500 text-sm mt-1">{dict.testimonial.company}</p>
                        </div>
                    </div>
                </section>

                {/* Value Prop Section */}
                <section className="pb-24 pt-12 bg-gray-50 border-t border-gray-100">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0b0c10] mb-10 tracking-tight leading-[1.1]">{dict.questions.title}</h2>
                                <div className="space-y-6">
                                    <p className="text-lg text-gray-600 leading-relaxed font-light">
                                        {dict.questions.p1}
                                    </p>
                                    <p className="text-lg text-gray-600 leading-relaxed font-light">
                                        {dict.questions.p2}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-10 rounded-none border border-gray-200">
                                <div className="space-y-8">
                                    {dict.questions.items.map((item: any, index: number) => (
                                        <div key={index}>
                                            <h4 className="text-lg font-bold text-[#0b0c10] mb-2">{item.q}</h4>
                                            <p className="text-sm text-gray-600">{item.a}</p>
                                            {index < dict.questions.items.length - 1 && <div className="h-px bg-gray-200 mt-8"></div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <BookingSection dictionary={dictionary.services.aiMachineLearning.booking} />
                <ContactForm lang={lang} dictionary={dictionary} overrideDict={dictionary.services.aiMachineLearning.contactForm} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
