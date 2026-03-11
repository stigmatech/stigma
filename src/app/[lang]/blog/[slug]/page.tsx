import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingSection } from "@/components/booking-section";
import { ContactForm } from "@/components/contact-form";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getBlogPostBySlug, blogPosts } from "@/lib/blog-posts-data";
import { caseStudies } from "@/lib/case-studies-data";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
    const { lang, slug } = await props.params;
    const post = getBlogPostBySlug(slug);
    if (!post) return {};
    const isFr = lang === "fr";
    const title = isFr ? post.title.fr : post.title.en;
    const description = isFr ? post.excerpt.fr : post.excerpt.en;
    return {
        title: `${title} | Stigma Technologies Blog`,
        description,
        openGraph: {
            title: `${title} | Stigma Technologies`,
            description,
            url: `https://stigmatech.ca/${lang}/blog/${slug}`,
            siteName: "Stigma Technologies",
            type: "article",
            images: [{ url: post.image, width: 1200, height: 630, alt: title }],
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/blog/${slug}` },
    };
}


export async function generateStaticParams() {
    const langs = ["en", "fr"];
    return langs.flatMap((lang) =>
        blogPosts.map((p) => ({ lang, slug: p.slug }))
    );
}

export default async function BlogPostPage(props: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const post = getBlogPostBySlug(params.slug);

    if (!post) notFound();

    const t = (field: { en: string; fr: string }) =>
        lang === "fr" ? field.fr : field.en;

    const relatedPosts = blogPosts.filter((p) =>
        post.relatedSlugs.includes(p.slug)
    );

    return (
        <div className="min-h-screen bg-white selection:bg-[#0b0c10] selection:text-white">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="bg-[#0b0c10] text-white pt-14 lg:pt-16 pb-0 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 background-grid pointer-events-none" />
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-12">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-white/50 text-sm mb-8">
                            <Link href={`/${lang}/blog`} className="hover:text-white transition-colors">
                                Blog
                            </Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-white/30 line-clamp-1">{t(post.title)}</span>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="bg-[#0b0c10] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1">
                                {t(post.tag)}
                            </span>
                            <span className="text-white/40 text-sm">
                                {t(post.date)} · {post.readTime} {lang === "fr" ? "min de lecture" : "min read"}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight max-w-4xl mb-8">
                            {t(post.title)}
                        </h1>

                        {/* Author */}
                        <div className="flex items-center gap-4">
                            <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-11 h-11 rounded-none object-cover border-2 border-white/20"
                            />
                            <div>
                                <p className="text-white font-semibold text-sm">{post.author.name}</p>
                                <p className="text-white/50 text-xs">{t(post.author.role)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero image strip */}
                    <div className="w-full h-72 md:h-96 overflow-hidden relative">
                        <img
                            src={post.image}
                            alt={t(post.title)}
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent" />
                    </div>
                </section>

                {/* Article Body */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                            {/* Main Content — 2 cols */}
                            <div className="lg:col-span-2">
                                {/* Intro */}
                                <p className="text-xl text-gray-700 leading-relaxed mb-12 font-light border-l-4 border-[#0b0c10] pl-6">
                                    {t(post.content.intro)}
                                </p>

                                {/* Sections */}
                                <div className="space-y-12">
                                    {post.content.sections.map((section, i) => (
                                        <div key={i}>
                                            <h2 className="text-2xl font-display font-bold text-[#0b0c10] mb-4">
                                                {t(section.heading)}
                                            </h2>
                                            <p className="text-gray-600 leading-relaxed text-lg">
                                                {t(section.body)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Conclusion */}
                                <div className="mt-12 bg-[#0b0c10] text-white p-8">
                                    <p className="text-white/80 text-lg leading-relaxed italic">
                                        {t(post.content.conclusion)}
                                    </p>
                                </div>

                                {/* Author Card */}
                                <div className="mt-12 flex items-center gap-6 border-t border-b border-gray-100 py-8">
                                    <img
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        className="w-16 h-16 rounded-none object-cover shrink-0"
                                    />
                                    <div>
                                        <p className="text-[#0b0c10] font-bold text-lg">{post.author.name}</p>
                                        <p className="text-gray-400 text-sm font-medium">{t(post.author.role)}</p>
                                        <p className="text-gray-400 text-sm mt-1">Stigma Technologies</p>
                                    </div>
                                </div>

                                {/* Back */}
                                <Link
                                    href={`/${lang}/blog`}
                                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0b0c10] hover:gap-3 transition-all mt-8"
                                >
                                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                    {lang === "fr" ? "Tous les articles" : "All Articles"}
                                </Link>
                            </div>

                            {/* Sidebar — 1 col */}
                            <div className="space-y-8">

                                {/* Related articles */}
                                {relatedPosts.length > 0 && (
                                    <div>
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">
                                            {lang === "fr" ? "Articles connexes" : "Related Articles"}
                                        </h3>
                                        <div className="space-y-6">
                                            {relatedPosts.map((related) => (
                                                <Link
                                                    key={related.slug}
                                                    href={`/${lang}/blog/${related.slug}`}
                                                    className="group flex gap-4 items-start"
                                                >
                                                    <div className="w-20 h-14 shrink-0 overflow-hidden bg-gray-50">
                                                        <img
                                                            src={related.image}
                                                            alt={t(related.title)}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                                            {t(related.tag)}
                                                        </span>
                                                        <p className="text-sm font-bold text-[#0b0c10] group-hover:text-gray-400 transition-colors leading-snug mt-0.5 line-clamp-2">
                                                            {t(related.title)}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* CTA */}
                                <div className="bg-gray-50 border border-gray-100 p-8">
                                    <h3 className="text-xl font-bold text-[#0b0c10] mb-3">
                                        {lang === "fr" ? "Prêt à agir ?" : "Ready to take action?"}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                        {lang === "fr"
                                            ? "Nos experts peuvent vous aider à mettre en place les meilleures pratiques pour votre organisation."
                                            : "Our experts can help you implement these best practices for your organization."}
                                    </p>
                                    <Link
                                        href={`/${lang}/contact`}
                                        className="inline-flex items-center gap-2 bg-[#0b0c10] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-[#0b0c10]/80 transition-colors w-full justify-center"
                                    >
                                        {lang === "fr" ? "Nous contacter" : "Talk to an Expert"}
                                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                    </Link>
                                </div>

                                {/* Related case studies */}
                                {post.relatedCaseStudies && post.relatedCaseStudies.length > 0 && (
                                    <div className="pt-8 border-t border-gray-100">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">
                                            {lang === "fr" ? "Études de cas associées" : "Related Case Studies"}
                                        </h3>
                                        <div className="space-y-6">
                                            {post.relatedCaseStudies.map((csSlug) => {
                                                const cs = caseStudies.find(c => c.slug === csSlug);
                                                if (!cs) return null;
                                                return (
                                                    <Link
                                                        key={cs.slug}
                                                        href={`/${lang}/case-studies/${cs.slug}`}
                                                        className="group block"
                                                    >
                                                        <div className="aspect-video overflow-hidden bg-gray-50 mb-3">
                                                            <img
                                                                src={cs.heroImage}
                                                                alt={t(cs.title)}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                        </div>
                                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                                            {cs.category}
                                                        </span>
                                                        <p className="text-sm font-bold text-[#0b0c10] group-hover:text-gray-400 transition-colors leading-snug mt-0.5">
                                                            {t(cs.title)}
                                                        </p>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Tags */}
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                        {lang === "fr" ? "Catégorie" : "Category"}
                                    </h3>
                                    <span className="bg-[#f1f2f4] text-[#0b0c10] text-[11px] font-bold px-3 py-1.5 uppercase tracking-wider">
                                        {t(post.tag)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <BookingSection dictionary={dictionary.services.booking} />
                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
