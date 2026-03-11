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
                    description: "Évaluation complète de votre parc et de vos vulnérabilités sous l'angle des réglementations locales."
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

export default async function Support360ConsistentPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-white selection:bg-blue-600 selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* ─── Hero Section (Restored Pattern) ──────────────── */}
                <section className="bg-[#050816] text-white py-14 lg:py-16 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 background-grid pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50 animate-[scan_4s_linear_infinite] shadow-[0_0_15px_rgba(37,99,235,0.5)] z-20"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-none rotate-45"></div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @keyframes scan {
                            0% { transform: translateY(-100%); opacity: 0; }
                            5% { opacity: 1; }
                            95% { opacity: 1; }
                            100% { transform: translateY(100vh); opacity: 0; }
                        }
                        @keyframes marquee-support-cons {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee-support-cons {
                            animation: marquee-support-cons 40s linear infinite;
                            display: flex;
                            width: fit-content;
                        }
                    `}} />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <span className="inline-block border border-blue-500/50 text-blue-400 text-[11px] font-bold tracking-[0.2em] uppercase px-3 py-1 mb-6 rounded-none bg-blue-500/5">
                                [ {d.tag} ]
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight mb-8">
                                {d.heroTitle.split(' ').map((word, i) =>
                                    i === d.heroTitle.split(' ').length - 1 ? <span key={i} className="text-blue-500 block md:inline">{word}</span> : word + ' '
                                )}
                            </h1>
                            <p className="text-xl text-gray-400 font-light leading-relaxed mb-10 max-w-2xl">
                                {d.heroDesc}
                            </p>
                            <Button asChild className="bg-blue-600 text-white hover:bg-blue-700 rounded-none px-8 py-6 uppercase tracking-wider text-xs font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                                <a href="#booking">{d.cta}</a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* ─── Stats Marquee (Restored Pattern) ──────────────── */}
                <div className="border-b border-gray-100 py-6 bg-gray-50/50 overflow-hidden">
                    <div className="animate-marquee-support-cons items-center">
                        {[...Array(4)].map((_, arrayIndex) => (
                            <div key={arrayIndex} className="flex items-center">
                                {d.stats.map((stat, index) => (
                                    <div key={`${arrayIndex}-${index}`} className="flex items-center space-x-4 mx-12 text-[#0b0c10]">
                                        <span className="text-blue-600 font-mono text-xl font-bold">{stat.value}</span>
                                        <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">{stat.label}</span>
                                        <div className="w-1.5 h-1.5 rounded-none bg-blue-600/20 rotate-45"></div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── Benefits Section (Image + Text Side-by-Side) ──── */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-8">{d.benefits.title}</h2>
                                <div className="space-y-6">
                                    <p className="text-gray-600 text-lg leading-relaxed">{d.benefits.p1}</p>
                                    <p className="text-gray-600 leading-relaxed">{d.benefits.p2}</p>
                                    <p className="text-gray-600 leading-relaxed">{d.benefits.p3}</p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-4/3 bg-white border border-gray-100 shadow-2xl relative overflow-hidden group rounded-none">
                                    <Image
                                        src="/images/it-expert-v2.png"
                                        alt="Support 360 Canadian Focus"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/5 rounded-none border border-blue-600/10 -z-10"></div>
                                <div className="absolute -top-6 -left-6 w-32 h-32 bg-gray-100 rounded-none border border-gray-200 -z-10"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── Capabilities Grid (Standard 3-Column) ────────── */}
                <section className="py-24 bg-gray-50 border-y border-gray-100">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-6 uppercase tracking-tight">{d.capabilities.title}</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">{d.capabilities.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {d.capabilities.items.map((feature, index) => (
                                <div key={index} className="group bg-white p-10 border border-gray-100 hover:border-blue-600 transition-all duration-500 hover:shadow-2xl rounded-none">
                                    <div className="w-16 h-16 bg-gray-50 text-blue-600 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 rounded-none">
                                        <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0b0c10] mb-4">{feature.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <PartnersMarquee />

                {/* ─── Expertise Section (Standard 3-Column Circle) ─── */}
                <section className="py-24 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center mb-16">
                            <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-4 uppercase tracking-tight">{d.expertise.title}</h2>
                            <p className="text-lg text-gray-600">{d.expertise.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            <div className="absolute top-16 left-0 w-full h-px bg-gray-200 hidden md:block z-0"></div>
                            {d.expertise.items.map((item, index) => (
                                <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                                    <div className="w-20 h-20 rounded-none bg-white border-2 border-gray-100 flex items-center justify-center mb-8 shadow-sm group-hover:border-blue-600 transition-all duration-500 scale-100 group-hover:scale-110">
                                        <span className="material-symbols-outlined text-[32px] text-gray-400 group-hover:text-blue-600 transition-colors duration-500">{item.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0b0c10] mb-3">{item.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed px-4">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Process Section (Standard Numbered Circular) ─── */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
                            <div>
                                <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block font-sans">IMPARTITION FRAMEWORK</span>
                                <h2 className="text-3xl font-display font-bold text-[#0b0c10] uppercase">{d.process.title}</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -translate-y-1/2 hidden md:block z-0"></div>
                            {d.process.steps.map((step, index) => (
                                <div key={index} className="relative z-10 flex flex-col items-center text-center bg-gray-50">
                                    <div className="w-16 h-16 rounded-none bg-white border-2 border-blue-600 text-blue-600 flex items-center justify-center text-xl font-bold mb-6 shadow-md transition-transform group hover:scale-110">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0b0c10] mb-3">{step.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed px-4">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div id="booking">
                    <BookingSection dictionary={dictionary.services.booking} />
                </div>
                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
