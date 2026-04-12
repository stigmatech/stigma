import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingSection } from "@/components/booking-section";
import { ContactForm } from "@/components/contact-form";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getBlogPostBySlug, blogPosts } from "@/lib/blog-posts-data";
import { caseStudies } from "@/lib/case-studies-data";
import { client } from "@/sanity/lib/client";
import { getPostBySlugQuery } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
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
    const isFr = lang === "fr";

    const t = (field: { en: string; fr: string } | string | undefined) => {
        if (!field) return "";
        if (typeof field === "string") return field;
        return lang === "fr" ? (field.fr || field.en) : (field.en || field.fr);
    };

    // 1. Fetch from Sanity
    let sanityPost = null;
    try {
        sanityPost = await client.fetch(getPostBySlugQuery, { slug: params.slug });
    } catch (e) {
        console.error("Sanity fetch error:", e);
    }

    let post: any = null;

    if (sanityPost) {
        post = {
            slug: sanityPost.slug?.current || params.slug,
            title: sanityPost.title || { en: "Untitled", fr: "Sans titre" },
            excerpt: sanityPost.excerpt || { en: "", fr: "" },
            image: sanityPost.mainImage || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
            date: { en: sanityPost.publishedAt ? new Date(sanityPost.publishedAt).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" }) : "", 
                    fr: sanityPost.publishedAt ? new Date(sanityPost.publishedAt).toLocaleDateString("fr-CA", { month: "short", day: "numeric", year: "numeric" }) : "" },
            tag: { en: sanityPost.categories?.[0] || "Update", fr: sanityPost.categories?.[0] || "Mise à jour" },
            readTime: "5",
            author: {
                name: sanityPost.author?.name || "Stigma Team",
                role: { en: "Expert", fr: "Expert" },
                avatar: sanityPost.author?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
            isSanity: true,
            body: sanityPost.body, // Rich text
            relatedSlugs: [],
            relatedCaseStudies: []
        };
    } else {
        post = getBlogPostBySlug(params.slug);
    }

    if (!post) notFound();

    const relatedPosts = blogPosts.filter((p) =>
        post.relatedSlugs?.includes(p.slug)
    );

    return (
        <div className="min-h-screen bg-white selection:bg-amber-500/30 pt-24 font-sans leading-relaxed">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main className="relative overflow-hidden font-sans">
                {/* Hero Section - Elite Dark */}
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

                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20">
                        {/* Breadcrumb - Technical */}
                        <div className="flex items-center gap-6 text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-12 italic">
                            <Link href={`/${lang}/blog`} className="hover:text-white transition-colors">
                                BLOG_DIR
                            </Link>
                            <span className="w-8 h-px bg-white/10"></span>
                            <span className="text-white/20 line-clamp-1">CONTENT_NODE: {post.slug.toUpperCase()}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 mb-10">
                            <span className="bg-white text-slate-950 text-[10px] font-black tracking-[0.4em] uppercase px-4 py-2 italic font-sans">
                                {t(post.tag)}
                            </span>
                            <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] italic">
                                {t(post.date)} // {post.readTime.toUpperCase()} {isFr ? "MIN DE LECTURE" : "MIN READ"}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[0.9] text-white italic mb-12 uppercase">
                            {t(post.title)}
                        </h1>

                        {/* Author Metadata - Industrial */}
                        <div className="flex items-center gap-8 pt-10 border-t border-white/10 group">
                            <div className="relative w-16 h-16 bg-slate-900 border border-white/10 overflow-hidden">
                                <img
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 font-sans italic"
                                />
                            </div>
                            <div>
                                <p className="text-white font-black text-xl uppercase tracking-tighter italic font-sans">{post.author.name}</p>
                                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1 italic">{t(post.author.role)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Industrial Strip image */}
                    <div className="w-full h-80 md:h-[500px] overflow-hidden relative border-t border-white/5 bg-slate-950">
                        <img
                            src={post.image}
                            alt={t(post.title)}
                            className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent" />
                        <div className="absolute inset-0 pointer-events-none opacity-20" 
                             style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)`, backgroundSize: '100% 4px' }} 
                        />
                    </div>
                </section>

                {/* Article Payload - Elite Technical Framework */}
                <section className="py-32 bg-white relative z-20">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">

                            {/* Main Payload Column */}
                            <div className="lg:col-span-8">
                                {post.isSanity ? (
                                    <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-a:text-amber-600 prose-img:border prose-img:border-slate-200">
                                        <PortableText value={post.body ? (lang === "fr" ? post.body.fr : post.body.en) : []} />
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-3xl text-slate-500 leading-relaxed mb-20 font-light border-l-4 border-slate-950 pl-10 tracking-tight font-sans italic">
                                            {t(post.content.intro)}
                                        </p>

                                        <div className="space-y-24">
                                            {post.content.sections.map((section: any, i: number) => (
                                                <div key={i} className="group">
                                                    <div className="flex items-center gap-6 mb-10">
                                                        <div className="w-12 h-[2px] bg-slate-950"></div>
                                                        <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] italic">
                                                            SECTION_0{i + 1}
                                                        </h2>
                                                    </div>
                                                    <h3 className="text-4xl font-display font-black text-slate-950 mb-8 uppercase tracking-tighter italic">
                                                        {t(section.heading)}
                                                    </h3>
                                                    <div className="text-slate-500 leading-relaxed text-2xl font-sans font-light tracking-tight italic">
                                                        {t(section.body)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Conclusion Protocol */}
                                        <div className="mt-24 bg-slate-950 text-white p-16 relative overflow-hidden shadow-3xl">
                                            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                                            <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.5em] mb-10 block italic">{isFr ? "CADRE DE CONCLUSION" : "CONCLUSION FRAMEWORK"}</span>
                                            <p className="text-white text-2xl font-light leading-relaxed relative z-10 tracking-tight font-sans italic">
                                                {t(post.content.conclusion)}
                                            </p>
                                        </div>
                                    </>
                                )}

                                {/* Industrial Signature */}
                                <div className="mt-24 border-t border-slate-100 pt-16 group flex items-start gap-10">
                                    <div className="relative w-24 h-24 bg-slate-900 border border-slate-100 overflow-hidden">
                                        <img
                                            src={post.author.avatar}
                                            alt={post.author.name}
                                            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 font-sans italic"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic">{isFr ? "SIGNATURE ANALYTIQUE" : "ANALYTICAL SIGNATURE"}</p>
                                        <h4 className="text-3xl font-black text-slate-950 uppercase tracking-tighter italic">{post.author.name}</h4>
                                        <p className="text-slate-500 text-lg font-light italic">{t(post.author.role)} — STIGMA TECHNOLOGIES</p>
                                    </div>
                                </div>

                                <Link
                                    href={`/${lang}/blog`}
                                    className="inline-flex items-center gap-6 text-[11px] font-black text-slate-400 hover:text-slate-950 transition-all mt-20 uppercase tracking-[0.5em] italic"
                                >
                                    <span className="material-symbols-outlined font-black">west</span>
                                    {isFr ? "RETOURNER AU BLOG" : "BACK TO BLOG"}
                                </Link>
                            </div>

                            {/* High-Density Sidebar */}
                            <div className="lg:col-span-4 space-y-20 lg:sticky lg:top-32">

                                {/* Related Intelligence */}
                                {relatedPosts.length > 0 && (
                                    <div className="space-y-10">
                                        <h3 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.5em] italic flex items-center gap-6">
                                            <div className="w-8 h-[2px] bg-slate-950"></div>
                                            {isFr ? "ARTICLES CONNEXES" : "RELATED INTELLIGENCE"}
                                        </h3>
                                        <div className="space-y-12">
                                            {relatedPosts.map((related) => (
                                                <Link
                                                    key={related.slug}
                                                    href={`/${lang}/blog/${related.slug}`}
                                                    className="group block space-y-4"
                                                >
                                                    <div className="aspect-video overflow-hidden bg-slate-950 border border-slate-100 hover:border-slate-950 transition-all">
                                                        <img
                                                            src={related.image}
                                                            alt={t(related.title)}
                                                            className="w-full h-full object-cover grayscale-[0.8] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 font-sans italic"
                                                        />
                                                    </div>
                                                    <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.3em] block italic">
                                                        {t(related.tag)}
                                                    </span>
                                                    <h4 className="text-xl font-black text-slate-950 group-hover:text-amber-600 transition-colors uppercase tracking-tighter leading-none italic">
                                                        {t(related.title)}
                                                    </h4>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Technical Action CTA */}
                                <div className="bg-slate-950 p-12 text-white shadow-3xl relative overflow-hidden border border-white/5">
                                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                                    <h3 className="text-3xl font-display font-black leading-none uppercase tracking-tighter mb-8 italic">
                                        {isFr ? "Prêt à agir ?" : "Ready to take action?"}
                                    </h3>
                                    <p className="text-slate-400 font-light text-lg mb-10 tracking-tight font-sans italic">
                                        {isFr
                                            ? "Nos ingénieurs déploient ces stratégies au cœur de votre infrastructure."
                                            : "Our engineers deploy these strategies at the heart of your infrastructure."}
                                    </p>
                                    <Link
                                        href={`/${lang}/contact`}
                                        className="inline-flex justify-center items-center gap-6 bg-white text-slate-950 py-6 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-slate-100 transition-all w-full italic"
                                    >
                                        {isFr ? "DÉPLOYER" : "DEPLOY"}
                                        <span className="material-symbols-outlined font-black">east</span>
                                    </Link>
                                </div>

                                {/* Associated Tactical Portfolio (Case Studies) */}
                                {post.relatedCaseStudies && post.relatedCaseStudies.length > 0 && (
                                    <div className="space-y-10 pt-16 border-t border-slate-50">
                                        <h3 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.5em] italic flex items-center gap-6">
                                            <div className="w-8 h-[2px] bg-slate-950"></div>
                                            {isFr ? "PORTFOLIO TACTIQUE" : "TACTICAL PORTFOLIO"}
                                        </h3>
                                        <div className="space-y-12">
                                            {post.relatedCaseStudies.map((csSlug: string) => {
                                                const cs = caseStudies.find(c => c.slug === csSlug);
                                                if (!cs) return null;
                                                return (
                                                    <Link
                                                        key={cs.slug}
                                                        href={`/${lang}/case-studies/${cs.slug}`}
                                                        className="group block space-y-4"
                                                    >
                                                        <div className="aspect-4/3 overflow-hidden bg-slate-950 border border-slate-100 hover:border-slate-950 transition-all">
                                                            <img
                                                                src={cs.heroImage}
                                                                alt={t(cs.title)}
                                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 font-sans italic"
                                                            />
                                                        </div>
                                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] block italic">
                                                            {cs.category}
                                                        </span >
                                                        <h4 className="text-xl font-black text-slate-950 group-hover:text-amber-600 transition-colors uppercase tracking-tighter leading-none italic">
                                                            {t(cs.title)}
                                                        </h4>
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

                <div className="bg-slate-50">
                    <BookingSection lang={lang} dictionary={dictionary.services.booking} />
                </div>
                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang as Locale} dictionary={dictionary} />
        </div>
    );
}

