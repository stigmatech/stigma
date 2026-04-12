import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { BookingSection } from "@/components/booking-section";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { blogPosts, BlogPost } from "@/lib/blog-posts-data";
import { client } from "@/sanity/lib/client";
import { getAllPostsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await props.params;
    const isFr = lang === "fr";
    return {
        title: isFr ? "Blog IT & Cybersécurité | Stigma Technologies" : "IT & Cybersecurity Blog | Stigma Technologies",
        description: isFr
            ? "Explorez nos articles d'experts sur la cybersécurité, l'IA, la gouvernance IT et la transformation numérique. Insights pour les leaders technologiques."
            : "Explore our expert articles on cybersecurity, AI, IT governance and digital transformation. Insights for technology leaders.",
        openGraph: {
            title: isFr ? "Blog IT & Cybersécurité | Stigma Technologies" : "IT & Cybersecurity Blog | Stigma Technologies",
            description: isFr ? "Insights d'experts pour les leaders technologiques." : "Expert insights for technology leaders.",
            url: `https://stigmatech.ca/${lang}/blog`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/blog` },
    };
}


export default async function Blog(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const dict = dictionary.blog;
    const isFr = lang === "fr";

    const t = (field: { en: string; fr: string } | string | undefined) => {
        if (!field) return "";
        if (typeof field === "string") return field;
        return lang === "fr" ? (field.fr || field.en) : (field.en || field.fr);
    };

    // 1. Fetch from Sanity
    let sanityPosts: any[] = [];
    try {
        sanityPosts = await client.fetch(getAllPostsQuery);
    } catch (e) {
        console.error("Sanity fetch error:", e);
    }

    // 2. Map Sanity data to the same shape as static data
    const dynamicPosts = sanityPosts.map(p => ({
        slug: p.slug?.current || "",
        title: p.title || { en: "Untitled", fr: "Sans titre" },
        excerpt: p.excerpt || { en: "", fr: "" },
        image: p.mainImage || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
        date: { en: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" }) : "", 
                fr: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("fr-CA", { month: "short", day: "numeric", year: "numeric" }) : "" },
        tag: { en: p.categories?.[0] || "Update", fr: p.categories?.[0] || "Mise à jour" },
        time: { en: "5 min", fr: "5 min" },
        longDescription: p.excerpt
    }));

    // 3. Fallback: If Sanity is empty, use the static array
    const displayPosts = dynamicPosts.length > 0 ? dynamicPosts : blogPosts;

    return (
        <div className="min-h-screen bg-white selection:bg-amber-500/30 pt-24 font-sans leading-relaxed">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main className="relative overflow-hidden font-sans">
                {/* Hero Section - Elite Dark */}
                <section className="bg-slate-950 text-white pt-12 lg:pt-20 pb-32 relative overflow-hidden">
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

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 mb-10 backdrop-blur-3xl">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">{dict.hero.tag}</span>
                        </div>
                        
                        <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10 whitespace-pre-line italic">
                            {isFr ? (
                                <>Réflexions <br /><span className="text-slate-500 block">stratégiques.</span></>
                            ) : (
                                <>Strategic <br /><span className="text-slate-500 block">reflections.</span></>
                            )}
                        </h1>
                        
                        <p className="text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto tracking-tight">
                            {dict.hero.description}
                        </p>
                    </div>
                </section>

                {/* Articles Grid - Elite Industrial Design */}
                <section className="py-32 bg-white relative z-20 -mt-16 selection:bg-amber-500/30">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 gap-y-20">
                            {displayPosts.map((article) => (
                                <div key={article.slug} className="group flex flex-col h-full bg-white border border-slate-50 hover:border-slate-950 transition-all duration-500 relative">
                                    {/* Industrial framing elements */}
                                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-slate-950 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-slate-950 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    <Link href={`/${lang}/blog/${article.slug}`} className="block relative aspect-video overflow-hidden bg-slate-950">
                                        <img
                                            src={article.image}
                                            alt={t(article.title)}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 opacity-80 group-hover:opacity-100 grayscale-[0.5] group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-slate-950/20 group-hover:opacity-0 transition-opacity duration-700"></div>
                                    </Link>
                                    
                                    <div className="p-10 grow flex flex-col items-start space-y-6">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-3 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] italic leading-none">
                                                <span>{t(article.date)}</span>
                                                <span className="w-4 h-px bg-slate-200"></span>
                                                <span className="text-amber-500">{t(article.tag)}</span>
                                            </div>
                                            <span className="material-symbols-outlined text-[18px] text-slate-200 group-hover:text-slate-950 transition-colors">
                                                arrow_outward
                                            </span>
                                        </div>
                                        
                                        <Link href={`/${lang}/blog/${article.slug}`}>
                                            <h3 className="text-2xl font-black font-display text-slate-950 group-hover:text-amber-600 transition-colors uppercase tracking-tighter italic leading-none">
                                                {t(article.title)}
                                            </h3>
                                        </Link>
                                        
                                        <p className="text-slate-500 font-light text-base leading-relaxed tracking-tight line-clamp-3 font-sans italic">
                                            {t(article.excerpt)}
                                        </p>
                                        
                                        <div className="mt-auto pt-8 w-full border-t border-slate-50">
                                            <Link
                                                href={`/${lang}/blog/${article.slug}`}
                                                className="inline-flex items-center text-[10px] font-black text-slate-950 group-hover:text-amber-600 transition-all uppercase tracking-[0.4em] italic leading-none"
                                            >
                                                {dict.labels.readArticle}
                                                <span className="material-symbols-outlined text-[16px] ml-4 font-black">east</span>
                                            </Link>
                                        </div>
                                    </div>
                                    
                                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-slate-950 group-hover:w-full transition-all duration-700" />
                                </div>
                            ))}
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
