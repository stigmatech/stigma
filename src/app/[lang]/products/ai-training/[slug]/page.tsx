import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getCourseData, getAllCourseSlugs } from "@/data/ai-training-courses";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { TrainingBookingForm } from "@/components/training-booking-form";
import { SubsidyInquiryForm } from "@/components/subsidy-inquiry-form";
import { CourseFormSection } from "@/components/course-form-section";
import { getAllSubsidies } from "@/data/subsidies-data";

export async function generateMetadata(props: {
    params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
    const { lang, slug } = await props.params;
    const course = getCourseData(slug, lang);
    if (!course) return { title: "Course Not Found" };

    const isFr = lang === "fr";
    const isCyber = slug.startsWith("cyber-");

    let category = isFr ? "Formation IA" : "AI Training";
    if (isCyber) {
        category = isFr ? "Formation Cybersécurité" : "Cybersecurity Training";
    }

    return {
        title: `${course.title} | ${category} | Stigma Technologies`,
        description: course.description,
    };
}

export default async function CourseDetailPage(props: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const { lang, slug } = await props.params;
    const dictionary = await getDictionary(lang as Locale);
    const course = getCourseData(slug, lang);

    if (!course) {
        notFound();
    }

    const isFr = lang === "fr";

    return (
        <div className="min-h-screen bg-white selection:bg-[#0b0c10] selection:text-white pt-24">
            <Navbar lang={lang as Locale} dictionary={dictionary.common.nav} />

            {/* Sticky Header Mini-Bar */}
            <div className="fixed top-[72px] left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-40 py-3 hidden md:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{isFr ? "Formation" : "Course"}</span>
                        <h2 className="text-sm font-bold text-[#0b0c10]">{course.title}</h2>
                    </div>
                    <Button asChild size="sm" className="bg-blue-600 text-white hover:bg-blue-700 rounded-none text-[10px] font-bold uppercase tracking-wider">
                        <a href="#contact">{isFr ? "S'inscrire" : "Enroll Now"}</a>
                    </Button>
                </div>
            </div>

            <main>
                {/* Hero Section */}
                <section className="bg-[#0b0c10] text-white py-14 lg:py-16 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 background-grid pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center space-x-2 text-[10px] font-bold tracking-widest text-white/60 uppercase mb-8 relative z-10">
                            <Link href={`/${lang}/products/ai-training`} className="hover:text-blue-400 transition-colors">
                                {isFr ? "Formations IA" : "AI Training"}
                            </Link>
                            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                            <span className="text-white">{course.title}</span>
                        </nav>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                            <div className="lg:col-span-2">
                                <h1 className="text-4xl lg:text-5xl font-display font-extrabold text-white mb-6 leading-tight relative z-10">
                                    {course.title}
                                </h1>
                                <p className="text-lg text-blue-400 font-medium mb-6 relative z-10">{course.subtitle}</p>
                                <p className="text-xl text-gray-300 font-light leading-relaxed mb-10 max-w-2xl relative z-10">
                                    {course.description}
                                </p>

                                <div className="flex flex-wrap gap-4 mb-10 relative z-10">
                                    <div className="bg-white/5 border border-white/10 px-6 py-4 flex flex-col">
                                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">{isFr ? "Niveau" : "Level"}</span>
                                        <span className="text-white font-bold">{course.level}</span>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 px-6 py-4 flex flex-col">
                                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">{isFr ? "Durée" : "Duration"}</span>
                                        <span className="text-white font-bold">{course.duration}</span>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 px-6 py-4 flex flex-col">
                                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Format</span>
                                        <span className="text-white font-bold">{course.format}</span>
                                    </div>
                                </div>

                                <Button asChild className="bg-white text-[#0b0c10] hover:bg-gray-100 rounded-none px-10 py-7 uppercase tracking-wider text-xs font-bold relative z-10">
                                    <a href="#contact">{isFr ? "Réserver pour mon équipe" : "Book for my team"}</a>
                                </Button>
                                <p className="mt-4 text-[10px] text-gray-400 font-medium italic">
                                    {isFr ? "* Formez jusqu'à 15 employés par session" : "* Train up to 15 employees per session"}
                                </p>
                            </div>

                            <div className="bg-white border border-gray-100 shadow-2xl p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 -mr-12 -mt-12 rounded-none transition-transform duration-500 group-hover:scale-110 rotate-45"></div>
                                <div className="relative z-10">
                                    <h3 className="text-sm font-bold text-[#0b0c10] uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">
                                        {isFr ? "Offert par" : "Offered by"}
                                    </h3>
                                    <div className="flex items-center space-x-4 mb-8">
                                        <div className="w-12 h-12 bg-[#050816] flex items-center justify-center">
                                            <span className="text-blue-500 font-bold text-xl">S</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#0b0c10]">Stigma Technologies</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">AI Center of Excellence</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                                            <span className="material-symbols-outlined text-blue-600 text-lg">workspace_premium</span>
                                            <span>{isFr ? "Certificat Stigma Technologies" : "Stigma Technologies Certificate"}</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                                            <span className="material-symbols-outlined text-blue-600 text-lg">public</span>
                                            <span>100% {isFr ? "En français & Anglais" : "French & English"}</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                                            <span className="material-symbols-outlined text-blue-600 text-lg">restaurant</span>
                                            <span>{isFr ? "Lunch offert (Uber Eats / Doordash)" : "Lunch included (Uber Eats / Doordash)"}</span>
                                        </div>
                                        <div className="mt-2 pt-4 border-t border-gray-100">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                                {isFr ? "Subventions Admissibles" : "Eligible Subsidies"}
                                            </p>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between bg-[#0b0c10]/5 border border-[#0b0c10]/20 px-3 py-2 rounded-none">
                                                    <span className="text-[10px] font-bold text-[#0b0c10] uppercase tracking-wider">Scale AI</span>
                                                    <span className="text-[10px] font-bold text-[#0b0c10]">Jusqu&apos;à 85%</span>
                                                </div>
                                                <div className="flex items-center justify-between bg-[#0b0c10]/5 border border-[#0b0c10]/20 px-3 py-2 rounded-none">
                                                    <span className="text-[10px] font-bold text-[#0b0c10] uppercase tracking-wider">ESSOR (IQ)</span>
                                                    <span className="text-[10px] font-bold text-[#0b0c10]">{isFr ? "Jusqu&apos;à 20 000$" : "Up to $20,000"}</span>
                                                </div>
                                                <div className="flex items-center justify-between bg-[#0b0c10]/5 border border-[#0b0c10]/20 px-3 py-2 rounded-none">
                                                    <span className="text-[10px] font-bold text-[#0b0c10] uppercase tracking-wider">{isFr ? "Productivité" : "Productivity"}</span>
                                                    <span className="text-[10px] font-bold text-[#0b0c10]">50%+</span>
                                                </div>
                                            </div>
                                            <a href="#subsidies" className="mt-3 flex items-center text-[10px] font-bold text-blue-500 uppercase tracking-widest hover:text-blue-700 transition-colors">
                                                <span className="material-symbols-outlined text-[12px] mr-1">arrow_downward</span>
                                                {isFr ? "Voir toutes les subventions" : "See all grants"}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What You'll Learn & Skills */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                            <div className="lg:col-span-2">
                                <div className="bg-gray-50 border border-gray-100 p-10 lg:p-14 mb-16">
                                    <h2 className="text-2xl font-bold text-[#0b0c10] mb-10">
                                        {isFr ? "Ce que vous allez apprendre" : "What you will learn"}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                        {course.outcomes.map((outcome, idx) => (
                                            <div key={idx} className="flex items-start space-x-3">
                                                <span className="material-symbols-outlined text-blue-600 text-xl">check_circle</span>
                                                <span className="text-gray-600 text-sm leading-relaxed">{outcome}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-16">
                                    <h2 className="text-2xl font-bold text-[#0b0c10] mb-10">
                                        {isFr ? "Programme de la journée" : "Course Syllabus"}
                                    </h2>
                                    <div className="space-y-8 relative before:absolute before:left-[15px] before:top-4 before:bottom-4 before:w-px before:bg-gray-100">
                                        {course.syllabus.map((module, idx) => {
                                            const isLunch = module.title.toLowerCase().includes("lunch") || module.title.toLowerCase().includes("déjeuner");
                                            return (
                                                <div key={idx} className={`relative pl-12 p-4 transition-all duration-300 ${isLunch ? 'bg-blue-50/50 border-l-4 border-blue-600 -ml-1' : ''}`}>
                                                    <div className={`absolute left-0 top-5 w-8 h-8 rounded-none border-2 flex items-center justify-center z-10 ${isLunch ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-500/20' : 'bg-white border-[#0b0c10]'}`}>
                                                        {isLunch ? (
                                                            <span className="material-symbols-outlined text-[16px] text-white">restaurant</span>
                                                        ) : (
                                                            <span className="text-[10px] font-bold text-[#0b0c10]">{idx + 1}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                                                        <h3 className={`text-lg font-bold ${isLunch ? 'text-blue-700' : 'text-[#0b0c10]'}`}>{module.title}</h3>
                                                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{module.hour}</span>
                                                    </div>
                                                    <p className={`text-sm leading-relaxed ${isLunch ? 'text-blue-600/80 font-medium' : 'text-gray-500'}`}>{module.description}</p>
                                                    {isLunch && (
                                                        <div className="mt-3 flex items-center gap-2">
                                                            <div className="h-px flex-1 bg-blue-100"></div>
                                                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest px-2 bg-white">Bon Appétit</span>
                                                            <div className="h-px flex-1 bg-blue-100"></div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-12">
                                <div>
                                    <h3 className="text-sm font-bold text-[#0b0c10] uppercase tracking-widest mb-6 underline decoration-blue-600 decoration-2 underline-offset-8">
                                        {isFr ? "Compétences visées" : "Skills you will gain"}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {course.skills.map((skill, idx) => (
                                            <span key={idx} className="bg-transparent text-[#0b0c10] text-[10px] font-bold border border-gray-200 px-3 py-1.5 rounded-none uppercase tracking-wider">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-[#0b0c10] uppercase tracking-widest mb-6 underline decoration-blue-600 decoration-2 underline-offset-8">
                                        {isFr ? "Configuration" : "Prerequisites"}
                                    </h3>
                                    {course.prerequisiteSlug && (
                                        <Link
                                            href={`/${lang}/products/ai-training/${course.prerequisiteSlug}`}
                                            className="block bg-blue-50 border border-blue-100 p-4 mb-4 hover:border-blue-300 transition-colors group"
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="material-symbols-outlined text-blue-600 text-sm">info</span>
                                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{isFr ? "Prérequis Recommandé" : "Recommended Prerequisite"}</span>
                                            </div>
                                            <p className="text-sm font-bold text-[#0b0c10] group-hover:text-blue-700">
                                                {isFr ? "Ce cours nécessite les bases de " : "This course requires the fundamentals of "}
                                                <span className="underline">{course.prerequisiteSlug.replace('ia-', 'IA ').charAt(0).toUpperCase() + course.prerequisiteSlug.replace('ia-', 'IA ').slice(1)}</span>
                                            </p>
                                        </Link>
                                    )}
                                    <p className="text-sm text-gray-500 leading-relaxed italic">
                                        {course.prerequisites}
                                    </p>
                                </div>

                                <div className="bg-[#0b0c10] p-8 text-white relative overflow-hidden group rounded-none border-l-4 border-blue-600">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 -mr-16 -mt-16 rounded-none rotate-45 group-hover:scale-110 transition-transform duration-500"></div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest mb-6 relative z-10">{isFr ? "Public Cible" : "Who it is for"}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed relative z-10">
                                        {course.whoItIsFor}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Subsidies Section - Conversion Booster */}
                <section id="subsidies" className="py-24 bg-[#0b0c10] text-white relative overflow-hidden">
                    {/* Background accents */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 translate-x-1/2 translate-y-1/2 rotate-45"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-16">
                            <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-4 block">
                                {isFr ? "Aide Financière Disponible" : "Available Financial Aid"}
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
                                {isFr ? "Réduisez votre coût net jusqu'à 85%" : "Reduce your net cost by up to 85%"}
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                                {isFr
                                    ? "Ce programme de formation est admissible à plusieurs subventions gouvernementales canadiennes et québécoises. Stigma Technologies vous accompagne dans vos demandes."
                                    : "This training program is eligible for several Canadian and Quebec government grants. Stigma Technologies guides you through the application process."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {getAllSubsidies(lang).map((subsidy, idx) => (
                                <Link
                                    key={idx}
                                    href={`/${lang}/subsidies/${subsidy.slug}`}
                                    className="p-8 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 text-left flex flex-col group"
                                >
                                    <div className="text-white font-bold mb-3 flex items-start group-hover:text-blue-400 transition-colors">
                                        <span className="material-symbols-outlined mr-2 mt-0.5 shrink-0 opacity-50">{subsidy.icon}</span>
                                        <span>{subsidy.name}</span>
                                    </div>
                                    <span className="inline-block mb-3 text-[11px] font-bold tracking-widest text-blue-400 bg-blue-600/10 border border-blue-600/20 px-2 py-1 w-fit uppercase">
                                        {subsidy.amount}
                                    </span>
                                    <p className="text-sm text-gray-400 leading-relaxed flex-1">{subsidy.description}</p>
                                    <div className="mt-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
                                        {isFr ? "Détails de la subvention" : "Subsidy Details"}
                                        <span className="material-symbols-outlined text-[13px] ml-1">arrow_forward</span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* CTA Banner */}
                        <div className="border border-blue-500/30 bg-blue-600/10 p-8 text-center">
                            <p className="text-gray-300 mb-2 text-sm">
                                {isFr
                                    ? "Stigma Technologies vous aide à identifier et à soumettre vos demandes de subvention. Demandez votre diagnostic gratuit."
                                    : "Stigma Technologies helps you identify and submit grant applications. Request your free subsidy diagnostic."}
                            </p>
                            <a
                                href="#contact"
                                className="inline-flex items-center mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider px-8 py-4 transition-colors duration-200"
                            >
                                <span className="material-symbols-outlined text-[16px] mr-2">monetization_on</span>
                                {isFr ? "Vérifier mon admissibilité" : "Check my eligibility"}
                            </a>
                        </div>
                    </div>
                </section>

                <CourseFormSection lang={lang} courseTitle={course.title} />
            </main>

            <Footer lang={lang as Locale} dictionary={dictionary} />
        </div >
    );
}

export async function generateStaticParams() {
    const langs = ["en", "fr"];
    const slugs = getAllCourseSlugs();

    const params = [];
    for (const lang of langs) {
        for (const slug of slugs) {
            params.push({ lang, slug });
        }
    }
    return params;
}
