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
        title: isFr
            ? "Support 360 | Impartition Informatique Complète | Stigma Technologies"
            : "Support 360 | Comprehensive IT Outsourcing | Stigma Technologies",
        description: isFr
            ? "Découvrez Support 360, la solution d'impartition informatique tout-en-un pour les PME canadiennes. Assistance, Maintenance, Conseil et Cybersécurité."
            : "Discover Support 360, the all-in-one IT outsourcing solution for Canadian SMEs. Assistance, Maintenance, Consulting, and Cybersecurity.",
        openGraph: {
            title: "Support 360 | Stigma Technologies",
            description: isFr
                ? "Le département informatique complet des PME au Canada."
                : "The complete IT department for SMEs in Canada.",
            url: `https://stigmatech.ca/${lang}/products/support-360`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/products/support-360` },
    };
}

// ─── Content ──────────────────────────────────────────────────────────────────

const content = {
    en: {
        tag: "MANAGED IT OUTSOURCING",
        heroTitle: "Support 360",
        heroSubtitle: "Your Comprehensive IT Outsourcing Solution",
        heroDesc:
            "A reliable and high-performing IT environment is essential for Canadian SMEs. Support 360 integrates premium assistance, proactive maintenance, strategic consulting, and advanced cybersecurity to ensure your business growth.",
        cta: "Start Support 360",
        stats: [
            { value: "360°", label: "Managed Coverage" },
            { value: "Loi 25", label: "Ready / Compliant" },
            { value: "Canada", label: "Data Residency" },
            { value: "Bilingual", label: "Expert Support" },
        ],
        benefits: {
            title: "The Human Factor of IT Excellence",
            p1: "At Stigma Technologies, we understand that for a Canadian SME, IT shouldn't be a burden. It should be a catalyst.",
            p2: "Support 360 is our flagship all-in-one solution. It replaces the need for an internal IT department by providing Maintenance Plus, Assistance Plus, and Strategic Consulting in one unified package.",
            p3: "Our mission is to allow your team to focus on your core business while we handle the technical foundations, ensuring your data remains in Canada and your systems stay compliant with PIPEDA and Loi 25."
        },
        capabilities: {
            title: "Support 360 Pillars",
            description: "A complete synergy of technical expertise and strategic management tailored for Canada.",
            items: [
                {
                    icon: "build",
                    title: "Maintenance Plus",
                    description: "Preventive maintenance for workstations & servers, automated security updates, and verified immutable backups."
                },
                {
                    icon: "support_agent",
                    title: "Assistance Plus",
                    description: "Unlimited technical support, remote or on-site troubleshooting across Canada, and expert configuration."
                },
                {
                    icon: "insights",
                    title: "Strategic Consulting",
                    description: "Full IT infrastructure audits, strategic roadmap planning (vCIO), and technology cost optimization."
                },
                {
                    icon: "security",
                    title: "Cybersecurity Plus",
                    description: "Continuous 24/7 security monitoring from our Canadian SOC, EDR management, and compliance assessment."
                },
                {
                    icon: "admin_panel_settings",
                    title: "CISO on Demand (vCISO)",
                    description: "Strategic security leadership providing custom policies (NIST/ISO), proactive risk management, and business alignment."
                },
                {
                    icon: "verified",
                    title: "Compliance Assistance",
                    description: "Direct assistance for meeting Quebec's Loi 25 and modern data privacy requirements."
                }
            ]
        },
        expertise: {
            title: "Why Canadian SME's Choose Support 360",
            description: "High-level impartition with a local, personal touch.",
            items: [
                {
                    icon: "person",
                    title: "Dedicated Technician",
                    description: "A single, expert point of contact who knows your Canadian business operations inside out."
                },
                {
                    icon: "emergency_home",
                    title: "Emergency Included",
                    description: "Urgent interventions included with guaranteed response times to avoid critical downtime."
                },
                {
                    icon: "public",
                    title: "100% Local Support",
                    description: "Bilingual support teams located in Canada, ensuring culture and language alignment."
                }
            ]
        },
        process: {
            title: "Our Implementation Methodology",
            steps: [
                {
                    title: "Audit & Compliance",
                    description: "A complete evaluation of your infrastructure and security posture through the lens of local regulations."
                },
                {
                    title: "Canadian Onboarding",
                    description: "Seamless integration of monitoring tools and standardization of security patches on local servers."
                },
                {
                    title: "Strategic Evolution",
                    description: "Continuous cycles to improve ROI, performance, and long-term technological competitiveness."
                }
            ]
        }
    },
    fr: {
        tag: "IMPARTITION IT GÉRÉE",
        heroTitle: "Support 360",
        heroSubtitle: "Votre Solution d'Impartition Informatique Complète",
        heroDesc:
            "Un environnement informatique fiable et performant est essentiel pour les PME d'ici. Support 360 intègre assistance, maintenance proactive, conseil stratégique et cybersécurité pour assurer votre succès.",
        cta: "Activer Support 360",
        stats: [
            { value: "360°", label: "Couverture Gérée" },
            { value: "Loi 25", label: "Prêt / Conforme" },
            { value: "Canada", label: "Données Locales" },
            { value: "Bilingue", label: "Support Expert" },
        ],
        benefits: {
            title: "L'Humain au cœur de l'Excellence IT",
            p1: "Chez Stigma Technologies, nous comprenons que pour une PME canadienne, l'informatique ne doit pas être un fardeau, mais un moteur.",
            p2: "Support 360 est notre solution phare tout-en-un. Elle remplace avantageusement un département IT interne en regroupant Maintenance Plus, Assistance Plus et Conseil Stratégique.",
            p3: "Notre mission est de permettre à vos équipes de se concentrer sur leur croissance pendant que nous gérons vos fondations numériques, en assurant que vos données restent au Canada et conformes à la Loi 25."
        },
        capabilities: {
            title: "Piliers Support 360",
            description: "Une synergie complète entre expertise technique et gestion stratégique adaptée aux PME d'ici.",
            items: [
                {
                    icon: "build",
                    title: "Maintenance Plus",
                    description: "Entretien préventif des postes et serveurs, mises à jour de sécurité et vérification des sauvegardes."
                },
                {
                    icon: "support_agent",
                    title: "Assistance Plus",
                    description: "Support technique illimité, dépannage réactif à distance ou sur site partout au Canada."
                },
                {
                    icon: "insights",
                    title: "Conseil Stratégique",
                    description: "Audit complet d'infrastructure IT, plan d'action vCIO et optimisation de vos investissements technologiques."
                },
                {
                    icon: "security",
                    title: "Cybersécurité Plus",
                    description: "Surveillance SOC 24/7 au Canada, gestion EDR et accompagnement à la conformité réglementaire."
                },
                {
                    icon: "admin_panel_settings",
                    title: "CISO à la demande (vCISO)",
                    description: "Leadership stratégique offrant des politiques sur mesure (NIST/ISO), une gestion proactive des risques et l'alignement business."
                },
                {
                    icon: "verified",
                    title: "Aide à la Conformité",
                    description: "Assistance directe pour répondre aux exigences de la Loi 25 et de la protection des renseignements personnels."
                }
            ]
        },
        expertise: {
            title: "Pourquoi choisir Support 360",
            description: "Une impartition de haut niveau avec une approche locale et personnalisée.",
            items: [
                {
                    icon: "person",
                    title: "Technicien Dédié",
                    description: "Un interlocuteur unique qui connaît l'historique de votre PME et vos besoins spécifiques."
                },
                {
                    icon: "emergency_home",
                    title: "Urgence Incluse",
                    description: "Des interventions prioritaires incluses pour minimiser tout risque d'interruption d'activité."
                },
                {
                    icon: "public",
                    title: "Support 100% Local",
                    description: "Des équipes de support basées au Canada, garantissant une parfaite compréhension de votre réalité."
                }
            ]
        },
        process: {
            title: "Notre Méthodologie d'Implémentation",
            steps: [
                {
                    title: "Audit & Conformité",
                    description: "Évaluation complète de votre parc et de vos vulnérables sous l'angle des réglementations locales."
                },
                {
                    title: "Intégration Canadienne",
                    description: "Déploiement des outils de surveillance et standardisation du parc informatique sur des serveurs locaux."
                },
                {
                    title: "Évolution Stratégique",
                    description: "Cycles continus pour améliorer le ROI, la performance et la compétitivité technologique à long terme."
                }
            ]
        }
    },
};

export default async function Support360Page(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const isFr = lang === 'fr';
    const dictionary = await getDictionary(lang);
    const d = isFr ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-white selection:bg-[#0b0c10] selection:text-white ">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* ─── Hero ─────────────────────────────────────────── */}
                <section className="relative pt-32 pb-32 overflow-hidden bg-[#0b0c10] border-b border-white/5 flex flex-col items-center text-center">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-indigo-600/15 blur-[120px] rounded-none rotate-12 transform" />
                        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] border border-white/5 rotate-45 transform" />
                        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] border border-white/5 rotate-[-15deg] transform" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]" />
                    </div>

                    <div className="container relative z-10 mx-auto px-6 flex flex-col items-center">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex justify-center mb-8">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-indigo-400 uppercase bg-indigo-900/30 border border-indigo-500/30 rounded-none backdrop-blur-sm">
                                    <span className="w-1.5 h-1.5 bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse" />
                                    {d.tag}
                                </span>
                            </div>

                            <h1 className="mb-8 text-6xl md:text-8xl lg:text-[6rem] font-display font-medium tracking-tight text-white leading-[1.05] uppercase">
                                {d.heroTitle}
                                <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-300 to-indigo-200 text-3xl md:text-5xl lg:text-6xl mt-4 block p-2">
                                    {d.heroSubtitle}
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-indigo-100/60 leading-relaxed font-light mb-12 max-w-3xl mx-auto">
                                {d.heroDesc}
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Button asChild className="rounded-none bg-indigo-600 text-white font-bold uppercase tracking-wider text-xs px-10 py-5 h-auto hover:bg-indigo-700 transition-all duration-300 shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] border border-indigo-500/50">
                                    <a href="#booking" className="flex items-center gap-2">
                                        {d.cta}
                                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-black/40 backdrop-blur-md z-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                                {d.stats.map((stat, i) => (
                                    <div key={i} className="py-6 px-6 text-center group">
                                        <div className="text-3xl font-display font-bold text-indigo-300 group-hover:text-indigo-400 transition-colors">{stat.value}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-2">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── Benefits Section ────────────────────────────────────────── */}
                <section className="py-24 bg-white border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#0b0c10]">
                        <h2 className="text-4xl font-display font-bold mb-8 uppercase tracking-tight">{d.benefits.title}</h2>
                        <div className="space-y-6 text-gray-500 leading-relaxed text-lg text-left">
                            <p>{d.benefits.p1}</p>
                            <p>{d.benefits.p2}</p>
                            <p className="font-bold border-l-4 border-indigo-500 pl-4 bg-indigo-50/50 py-4 px-4">{d.benefits.p3}</p>
                        </div>
                    </div>
                </section>

                {/* ─── Pillars Grid ────────────────────────────────────────── */}
                <section className="py-24 bg-gray-50 border-y border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-4 uppercase tracking-tight">{d.capabilities.title}</h2>
                            <p className="text-gray-500 leading-relaxed px-4">{d.capabilities.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {d.capabilities.items.map((mod, i) => (
                                <div key={i} className="bg-white border border-gray-100 p-8 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors">
                                        <span className="material-symbols-outlined text-gray-400 group-hover:text-white text-[20px] transition-colors">{mod.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0b0c10] mb-3 uppercase tracking-tight">{mod.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{mod.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Methodology Grid ────────────────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-4 uppercase tracking-tight">{d.process.title}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {d.process.steps.map((feature, i) => (
                                <div key={i} className="flex gap-6 border border-gray-100 bg-gray-50/50 p-8 hover:shadow-md hover:border-indigo-200 transition-all duration-300 group">
                                    <div className="w-14 h-14 rounded-none bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100 group-hover:bg-indigo-600 transition-colors">
                                        <span className="text-indigo-600 text-xl font-bold group-hover:text-white transition-colors">0{i + 1}</span>
                                    </div>
                                    <div className="grow">
                                        <h3 className="text-xl font-bold text-[#0b0c10] mb-3 uppercase">{feature.title}</h3>
                                        <p className="text-gray-500 leading-relaxed text-sm">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Why Stigma ────────────────────────────────── */}
                <section className="py-24 bg-[#0b0c10] text-white overflow-hidden relative">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] opacity-20" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3 block">{isFr ? "SUPPORT PREMIUM" : "PREMIUM SUPPORT"}</span>
                            <h2 className="text-4xl font-display font-bold uppercase tracking-tight">{d.expertise.title}</h2>
                            <p className="text-indigo-100/50 mt-4 leading-relaxed">{d.expertise.description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {d.expertise.items.map((item, i) => (
                                <div key={i} className="flex flex-col items-center text-center gap-6 bg-white/5 border border-white/5 p-8 hover:bg-white/10 transition-all">
                                    <div className="w-16 h-16 bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center shrink-0 rounded-full">
                                        <span className="material-symbols-outlined text-indigo-400 text-[28px]">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-4 uppercase">{item.title}</h3>
                                        <p className="text-indigo-100/60 leading-relaxed text-sm">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Final CTA ─────────────────────────────────────── */}
                <section className="py-24 bg-white text-center border-t border-gray-100">
                    <div className="max-w-3xl mx-auto px-4 text-[#0b0c10]">
                        <div className="w-20 h-20 bg-indigo-50 border border-indigo-100 mx-auto flex items-center justify-center mb-8">
                            <span className="material-symbols-outlined text-indigo-600 text-4xl">headphones</span>
                        </div>
                        <h2 className="text-5xl font-display font-bold mb-6 tracking-tight">{d.heroTitle}</h2>
                        <p className="text-gray-500 leading-relaxed mb-12 text-lg px-4">{d.heroDesc}</p>
                        <Button asChild className="rounded-none bg-[#0b0c10] text-white font-bold uppercase tracking-wider text-xs px-12 py-6 h-auto hover:bg-indigo-600 transition-colors shadow-xl shadow-indigo-600/10">
                            <a href="#booking" className="flex items-center gap-2">
                                {d.cta}
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </a>
                        </Button>
                    </div>
                </section>

                <div id="booking">
                    <BookingSection lang={lang} dictionary={dictionary.services.booking} />
                </div>
                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
