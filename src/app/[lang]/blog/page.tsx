import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { BookingSection } from "@/components/booking-section";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { blogPosts } from "@/lib/blog-posts-data";
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

    const t = (field: { en: string; fr: string }) =>
        lang === "fr" ? field.fr : field.en;

    return (
        <div className="min-h-screen bg-white selection:bg-[#0b0c10] selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* Hero Section */}
                <section className="bg-[#0b0c10] text-white py-14 lg:py-16 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 background-grid pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <span className="inline-block bg-white/10 text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 mb-6 rounded">
                                {dict.hero.tag}
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight mb-8">
                                {dict.hero.title}
                            </h1>
                            <p className="text-xl text-gray-300 font-light leading-relaxed mb-10">
                                {dict.hero.description}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Articles Grid */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
                            {blogPosts.map((article) => (
                                <div key={article.slug} className="group cursor-pointer flex flex-col h-full">
                                    <Link href={`/${lang}/blog/${article.slug}`} className="block">
                                        <div className="overflow-hidden mb-6 relative bg-gray-50 border border-gray-100 shadow-sm aspect-video">
                                            <img
                                                src={article.image}
                                                alt={t(article.title)}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    </Link>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">
                                        <span>{t(article.date)}</span>
                                        <span className="w-1 h-1 rounded-none bg-gray-300"></span>
                                        <span>{t(article.tag)}</span>
                                    </div>
                                    <Link href={`/${lang}/blog/${article.slug}`}>
                                        <h3 className="text-xl font-bold text-[#0b0c10] mb-4 group-hover:text-gray-400 transition-colors leading-tight">
                                            {t(article.title)}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {t(article.excerpt)}
                                    </p>
                                    <div className="mt-auto">
                                        <Link
                                            href={`/${lang}/blog/${article.slug}`}
                                            className="inline-flex items-center text-xs font-bold text-[#0b0c10] group-hover:text-gray-400 transition-colors"
                                        >
                                            {dict.labels.readArticle}
                                            <span className="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
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
