import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingSection } from "@/components/booking-section";
import { ContactForm } from "@/components/contact-form";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getCaseStudyBySlug, caseStudies } from "@/lib/case-studies-data";
import { blogPosts } from "@/lib/blog-posts-data";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
    const { lang, slug } = await props.params;
    const cs = getCaseStudyBySlug(slug);
    if (!cs) return {};
    const isFr = lang === "fr";
    const title = isFr ? cs.title.fr : cs.title.en;
    const description = isFr ? cs.description.fr : cs.description.en;
    return {
        title: `${title} | Stigma Technologies Case Study`,
        description,
        openGraph: {
            title: `${title} | Stigma Technologies`,
            description,
            url: `https://stigmatech.ca/${lang}/case-studies/${slug}`,
            siteName: "Stigma Technologies",
            type: "article",
            images: [{ url: cs.heroImage, width: 1200, height: 630, alt: title }],
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/case-studies/${slug}` },
    };
}


export async function generateStaticParams() {
    const langs = ["en", "fr"];
    return langs.flatMap((lang) =>
        caseStudies.map((cs) => ({ lang, slug: cs.slug }))
    );
}

export default async function CaseStudyDetailPage(props: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const caseStudy = getCaseStudyBySlug(params.slug);

    if (!caseStudy) {
        notFound();
    }

    const t = (field: { en: string; fr: string }) =>
        lang === "fr" ? field.fr : field.en;

    // Refined related projects logic
    // 1. Priority: Manual overrides
    let relatedStudies = (caseStudy.relatedSlugs || [])
        .map(slug => caseStudies.find(cs => cs.slug === slug))
        .filter((cs): cs is any => !!cs && cs.slug !== caseStudy.slug);

    // 2. Secondary: Tag-based similarity (matching tag count)
    if (relatedStudies.length < 2) {
        const remainingNeeded = 2 - relatedStudies.length;
        const others = caseStudies.filter(cs =>
            cs.slug !== caseStudy.slug &&
            !relatedStudies.find(r => r.slug === cs.slug)
        );

        const byTags = others
            .map(cs => ({
                study: cs,
                matches: cs.tags.filter(tag => caseStudy.tags.includes(tag)).length
            }))
            .filter(item => item.matches > 0)
            .sort((a, b) => b.matches - a.matches)
            .map(item => item.study);

        relatedStudies = [...relatedStudies, ...byTags].slice(0, 2);
    }

    // 3. Fallback: Category-based matching
    if (relatedStudies.length < 2) {
        const remainingNeeded = 2 - relatedStudies.length;
        const byCategory = caseStudies.filter(cs =>
            cs.category === caseStudy.category &&
            cs.slug !== caseStudy.slug &&
            !relatedStudies.find(r => r.slug === cs.slug)
        );
        relatedStudies = [...relatedStudies, ...byCategory].slice(0, 2);
    }

    // 4. Ultimate Fallback: Any other studies (to ensure we always have 2)
    if (relatedStudies.length < 2) {
        const finalOthers = caseStudies.filter(cs =>
            cs.slug !== caseStudy.slug &&
            !relatedStudies.find(r => r.slug === cs.slug)
        );
        relatedStudies = [...relatedStudies, ...finalOthers].slice(0, 2);
    }

    const bookingOverrides = caseStudy.bookingOverride ? {
        title: t(caseStudy.bookingOverride.title),
        titleHighlight: t(caseStudy.bookingOverride.titleHighlight),
        description: t(caseStudy.bookingOverride.description),
    } : undefined;

    return (
        <div className="min-h-screen bg-white selection:bg-[#0b0c10] selection:text-white">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative flex items-end overflow-hidden bg-[#0b0c10] py-14 lg:py-16">
                    <div className="absolute inset-0">
                        <img
                            src={caseStudy.heroImage}
                            alt={t(caseStudy.title)}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[#0b0c10]/30" />
                        <div className="absolute inset-0 bg-linear-to-t from-[#0b0c10] via-[#0b0c10]/80 to-transparent pointer-events-none" />
                    </div>

                    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
                            <Link href={`/${lang}/case-studies`} className="hover:text-white transition-colors">
                                {lang === "fr" ? "Études de cas" : "Case Studies"}
                            </Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-white/40">{t(caseStudy.title)}</span>
                        </div>

                        <div className="flex items-center gap-3 mb-5">
                            <span className="material-symbols-outlined text-white/60 text-xl">{caseStudy.categoryIcon}</span>
                            <span className="text-[11px] font-bold text-white/60 tracking-widest uppercase">
                                {caseStudy.category}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight max-w-4xl leading-none mb-6">
                            {t(caseStudy.title)}
                        </h1>
                        <p className="text-lg text-white/70 max-w-2xl font-light leading-relaxed">
                            {t(caseStudy.description)}
                        </p>
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="bg-[#0b0c10] border-t border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                            {caseStudy.stats.map((stat, i) => (
                                <div key={i} className="py-8 px-6 text-center">
                                    <p className="text-3xl md:text-4xl font-display font-extrabold text-white mb-1 tracking-tight">
                                        {stat.value}
                                    </p>
                                    <p className="text-[11px] text-white/40 font-medium uppercase tracking-widest">
                                        {t(stat.label)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Key Result Banner */}
                <section className="bg-[#0b0c10] py-6 border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <span className="material-symbols-outlined text-white/80 text-2xl shrink-0">emoji_events</span>
                        <div>
                            <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
                                {lang === "fr" ? "Résultat clé" : "Key Result"}
                            </span>
                            <p className="text-white font-semibold text-lg leading-snug">
                                {t(caseStudy.result)}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                            {/* Main Article — 2 cols */}
                            <div className="lg:col-span-2 space-y-16">

                                {/* Challenge */}
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-none bg-red-50 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-red-500 text-xl">report_problem</span>
                                        </div>
                                        <h2 className="text-2xl font-display font-bold text-[#0b0c10]">
                                            {lang === "fr" ? "Le Défi" : "The Challenge"}
                                        </h2>
                                    </div>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {t(caseStudy.challenge)}
                                    </p>
                                </div>

                                {/* Solution */}
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-none bg-gray-50 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-[#0b0c10] text-xl">lightbulb</span>
                                        </div>
                                        <h2 className="text-2xl font-display font-bold text-[#0b0c10]">
                                            {lang === "fr" ? "Notre Approche" : "Our Approach"}
                                        </h2>
                                    </div>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {t(caseStudy.solution)}
                                    </p>
                                </div>

                                {/* Impact */}
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-none bg-green-50 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-green-600 text-xl">trending_up</span>
                                        </div>
                                        <h2 className="text-2xl font-display font-bold text-[#0b0c10]">
                                            {lang === "fr" ? "L'Impact" : "The Impact"}
                                        </h2>
                                    </div>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {t(caseStudy.impact)}
                                    </p>
                                </div>

                                {/* Timeline */}
                                <div>
                                    <h2 className="text-2xl font-display font-bold text-[#0b0c10] mb-10">
                                        {lang === "fr" ? "Chronologie du Projet" : "Project Timeline"}
                                    </h2>
                                    <div className="space-y-0">
                                        {caseStudy.timeline.map((step, i) => (
                                            <div key={i} className="flex gap-6 group">
                                                {/* Left — phase indicator */}
                                                <div className="flex flex-col items-center">
                                                    <div className="w-10 h-10 rounded-none bg-[#0b0c10] text-white flex items-center justify-center font-bold text-sm shrink-0 z-10">
                                                        {i + 1}
                                                    </div>
                                                    {i < caseStudy.timeline.length - 1 && (
                                                        <div className="w-px flex-1 bg-gray-200 my-2" />
                                                    )}
                                                </div>
                                                {/* Right — content */}
                                                <div className="pb-10">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                        {t(step.phase)}
                                                    </span>
                                                    <h3 className="text-xl font-bold text-[#0b0c10] mt-1 mb-2">
                                                        {t(step.title)}
                                                    </h3>
                                                    <p className="text-gray-600 leading-relaxed">
                                                        {t(step.description)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar — 1 col */}
                            <div className="space-y-8">

                                {/* Testimonial */}
                                <div className="bg-[#0b0c10] text-white p-8">
                                    <span className="material-symbols-outlined text-gray-400 text-4xl mb-4 block">format_quote</span>
                                    <blockquote className="text-white/80 text-lg font-light italic leading-relaxed mb-6">
                                        "{t(caseStudy.testimonial.quote)}"
                                    </blockquote>
                                    <div className="border-t border-white/10 pt-6">
                                        <p className="text-white font-bold">{caseStudy.testimonial.author}</p>
                                        <p className="text-gray-400 text-sm">{caseStudy.testimonial.role}</p>
                                        <p className="text-white/40 text-sm">{caseStudy.testimonial.company}</p>
                                    </div>
                                </div>

                                {/* Related Insights (Blog Posts) */}
                                {caseStudy.relatedBlogPosts && caseStudy.relatedBlogPosts.length > 0 && (
                                    <div className="pt-8 border-t border-gray-100">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">
                                            {lang === "fr" ? "Insights Relatés" : "Related Insights"}
                                        </h3>
                                        <div className="space-y-6">
                                            {caseStudy.relatedBlogPosts.map((blogSlug) => {
                                                const post = blogPosts.find(p => p.slug === blogSlug);
                                                if (!post) return null;
                                                return (
                                                    <Link
                                                        key={post.slug}
                                                        href={`/${lang}/blog/${post.slug}`}
                                                        className="group flex gap-4 items-start"
                                                    >
                                                        <div className="w-20 h-14 shrink-0 overflow-hidden bg-gray-50 border border-gray-100">
                                                            <img
                                                                src={post.image}
                                                                alt={t(post.title)}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                                                {t(post.tag)}
                                                            </span>
                                                            <p className="text-sm font-bold text-[#0b0c10] group-hover:text-gray-400 transition-colors leading-snug mt-0.5 line-clamp-2">
                                                                {t(post.title)}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Tags */}
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                        {lang === "fr" ? "Technologies & Domaines" : "Technologies & Domains"}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {caseStudy.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="bg-gray-100 text-[#0b0c10] text-[11px] font-bold px-3 py-1.5 uppercase tracking-wider"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="bg-gray-50 border border-gray-100 p-8">
                                    <h3 className="text-xl font-bold text-[#0b0c10] mb-3">
                                        {caseStudy.ctaOverride ? t(caseStudy.ctaOverride.title) : (lang === "fr" ? "Un défi similaire ?" : "Similar challenge?")}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                        {caseStudy.ctaOverride
                                            ? t(caseStudy.ctaOverride.description)
                                            : (lang === "fr"
                                                ? "Découvrez comment nous pouvons transformer votre infrastructure et sécuriser votre avenir numérique."
                                                : "Discover how we can transform your infrastructure and secure your digital future.")}
                                    </p>
                                    <Link
                                        href={`/${lang}/contact`}
                                        className="inline-flex items-center gap-2 bg-[#0b0c10] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-[#0b0c10]/80 transition-colors w-full justify-center"
                                    >
                                        {lang === "fr" ? "Nous contacter" : "Talk to an Expert"}
                                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                    </Link>
                                </div>

                                {/* Back to all */}
                                <Link
                                    href={`/${lang}/case-studies`}
                                    className="flex items-center gap-2 text-sm font-bold text-[#0b0c10] hover:gap-3 transition-all"
                                >
                                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                    {lang === "fr" ? "Toutes les études de cas" : "All Case Studies"}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Projects */}
                {relatedStudies.length > 0 && (
                    <section className="py-20 border-t border-gray-100 bg-gray-50/30">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-end justify-between mb-12">
                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                                        {lang === "fr" ? "Explorer Plus" : "Explore More"}
                                    </span>
                                    <h2 className="text-3xl font-bold text-[#0b0c10]">
                                        {lang === "fr" ? "Projets Similaires" : "Related Projects"}
                                    </h2>
                                </div>
                                <Link
                                    href={`/${lang}/case-studies`}
                                    className="text-sm font-bold text-[#0b0c10] hover:underline"
                                >
                                    {lang === "fr" ? "Voir tout" : "View all"} →
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {relatedStudies.map((study) => (
                                    <Link
                                        key={study.slug}
                                        href={`/${lang}/case-studies/${study.slug}`}
                                        className="group block bg-white border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500"
                                    >
                                        <div className="aspect-video overflow-hidden">
                                            <img
                                                src={study.heroImage}
                                                alt={t(study.title)}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="p-8">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="material-symbols-outlined text-gray-400 text-sm">{study.categoryIcon}</span>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{study.category}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-[#0b0c10] group-hover:text-gray-600 transition-colors mb-3">
                                                {t(study.title)}
                                            </h3>
                                            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                                                {t(study.description)}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <BookingSection dictionary={dictionary.services.booking} overrides={bookingOverrides} />
                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
