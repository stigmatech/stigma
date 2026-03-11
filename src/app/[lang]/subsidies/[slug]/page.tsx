import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getSubsidyData, getAllSubsidies } from "@/data/subsidies-data";
import { getCourseData } from "@/data/ai-training-courses";
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
        <div className="min-h-screen bg-white selection:bg-[#0b0c10] selection:text-white pt-24">
            <Navbar lang={lang as Locale} dictionary={dictionary.common.nav} />

            <main>
                {/* Hero Section */}
                <section className="bg-[#0b0c10] text-white py-16 lg:py-20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 background-grid pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <nav className="flex items-center space-x-2 text-[10px] font-bold tracking-widest text-white/60 uppercase mb-8">
                            <Link href={`/${lang}/products/ai-training`} className="hover:text-blue-400 transition-colors">
                                {isFr ? "Formations IA" : "AI Training"}
                            </Link>
                            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                            <span className="text-white">{isFr ? "Subventions" : "Grants"}</span>
                        </nav>

                        <div className="max-w-4xl">
                            <span className="inline-block bg-blue-600/20 text-blue-400 text-[10px] font-bold tracking-widest uppercase px-3 py-1 mb-6 border border-blue-400/20">
                                {subsidy.category}
                            </span>
                            <h1 className="text-4xl lg:text-6xl font-display font-extrabold text-white mb-6 leading-tight">
                                {subsidy.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 mt-8">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">{isFr ? "Montant" : "Amount"}</span>
                                    <span className="text-2xl font-bold text-blue-400">{subsidy.amount}</span>
                                </div>
                                <div className="w-px h-10 bg-white/10 hidden md:block"></div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">{isFr ? "Couverture" : "Coverage"}</span>
                                    <span className="text-lg font-medium text-white/80">{subsidy.coverage}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-20">
                                {/* Aperçu du Programme */}
                                <div>
                                    <h2 className="text-2xl font-bold text-[#0b0c10] mb-6">
                                        {isFr ? "Aperçu du Programme" : "Program Overview"}
                                    </h2>
                                    <p className="text-lg text-gray-600 leading-relaxed font-light">
                                        {subsidy.fullDescription}
                                    </p>
                                </div>

                                {/* Financement Disponible */}
                                <div className="p-8 border border-blue-100 bg-blue-50/30">
                                    <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6">
                                        {isFr ? "Financement Disponible" : "Available Funding"}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-2">{isFr ? "Montant Maximal" : "Maximum Amount"}</span>
                                            <p className="text-xl font-bold text-[#0b0c10]">{subsidy.amount}</p>
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-2">{isFr ? "Taux de Couverture" : "Coverage Rate"}</span>
                                            <p className="text-xl font-bold text-[#0b0c10]">{subsidy.coverage}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Activités Financées & Candidats Admissibles */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    {subsidy.fundedActivities && (
                                        <div>
                                            <h3 className="text-sm font-bold text-[#0b0c10] uppercase tracking-widest mb-6 underline decoration-blue-600 decoration-2 underline-offset-8">
                                                {isFr ? "Activités Financées" : "Funded Activities"}
                                            </h3>
                                            <ul className="space-y-4">
                                                {subsidy.fundedActivities.map((activity, idx) => (
                                                    <li key={idx} className="flex items-start space-x-3 text-gray-600 text-sm leading-relaxed">
                                                        <span className="text-blue-600 font-bold leading-none select-none mt-1">—</span>
                                                        <span>{activity}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-sm font-bold text-[#0b0c10] uppercase tracking-widest mb-6 underline decoration-blue-600 decoration-2 underline-offset-8">
                                            {isFr ? "Candidats Admissibles" : "Eligible Candidates"}
                                        </h3>
                                        <ul className="space-y-4">
                                            {subsidy.eligibleCandidates.map((item, idx) => (
                                                <li key={idx} className="flex items-start space-x-3">
                                                    <span className="material-symbols-outlined text-blue-600 text-xl">verified</span>
                                                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Processus de Demande */}
                                <div className="bg-[#0b0c10] p-10 lg:p-12 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 -mr-16 -mt-16 rounded-none rotate-45"></div>
                                    <h3 className="text-xl font-bold text-white mb-10 relative z-10">
                                        {isFr ? "Processus de Demande" : "Application Process"}
                                    </h3>
                                    <div className="space-y-8 relative before:absolute before:left-[15px] before:top-4 before:bottom-4 before:w-px before:bg-white/10">
                                        {subsidy.applicationProcess.map((step, idx) => (
                                            <div key={idx} className="relative pl-12 group">
                                                <div className="absolute left-0 top-1 w-8 h-8 rounded-none border border-white/20 bg-[#0b0c10] text-white flex items-center justify-center z-10 group-hover:border-blue-400 group-hover:text-blue-400 transition-colors duration-300">
                                                    <span className="text-[10px] font-bold">{idx + 1}</span>
                                                </div>
                                                <p className="text-gray-300 text-sm font-medium leading-relaxed">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Informations Supplémentaires */}
                                {subsidy.additionalInfo && (
                                    <div>
                                        <h3 className="text-sm font-bold text-[#0b0c10] uppercase tracking-widest mb-6">
                                            {isFr ? "Informations Supplémentaires" : "Additional Information"}
                                        </h3>
                                        <ul className="space-y-3">
                                            {subsidy.additionalInfo.map((info, idx) => (
                                                <li key={idx} className="flex items-start space-x-3 text-gray-500 text-sm italic leading-relaxed">
                                                    <span className="material-symbols-outlined text-gray-300 text-lg">info</span>
                                                    <span>{info}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-12">
                                <div className="bg-[#0b0c10] p-8 text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 -mr-16 -mt-16 rounded-none rotate-45"></div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest mb-6 relative z-10">
                                        {isFr ? "Prêt à démarrer ?" : "Ready to start?"}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed mb-8 relative z-10">
                                        {isFr
                                            ? "Nos experts vous accompagnent gratuitement dans l'identification et la soumission de vos demandes d'aide financière."
                                            : "Our experts guide you for free in identifying and submitting your financial aid applications."}
                                    </p>
                                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white border-none rounded-none py-6 uppercase text-[10px] font-bold tracking-[0.2em]">
                                        <Link href="#contact">{isFr ? "Vérifier mon admissibilité" : "Check my eligibility"}</Link>
                                    </Button>
                                    <a
                                        href={subsidy.officialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 flex items-center justify-center text-[10px] font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
                                    >
                                        <span className="material-symbols-outlined text-[14px] mr-2">open_in_new</span>
                                        {isFr ? "Source officielle" : "Official source"}
                                    </a>
                                </div>

                                {subsidy.relatedCourses && subsidy.relatedCourses.length > 0 && (
                                    <div>
                                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
                                            {isFr ? "Formations Admissibles" : "Eligible Training"}
                                        </h3>
                                        <div className="space-y-4">
                                            {subsidy.relatedCourses.map((courseSlug) => {
                                                const course = getCourseData(courseSlug, lang);
                                                if (!course) return null;
                                                return (
                                                    <Link
                                                        key={courseSlug}
                                                        href={`/${lang}/products/ai-training/${courseSlug}`}
                                                        className="block p-4 border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-blue-400/30 transition-all duration-300 group"
                                                    >
                                                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1 block">{course.tag}</span>
                                                        <h4 className="text-sm font-bold text-[#0b0c10] group-hover:text-blue-600 transition-colors">{course.title}</h4>
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

                <div id="contact">
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
