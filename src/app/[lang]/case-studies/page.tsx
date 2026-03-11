import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { BookingSection } from "@/components/booking-section";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { caseStudies } from "@/lib/case-studies-data";
import Link from "next/link";
import type { Metadata } from "next";

import CaseStudiesGrid from "@/components/case-studies/CaseStudiesGrid";

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await props.params;
    const isFr = lang === "fr";
    return {
        title: isFr ? "Études de Cas | Stigma Technologies" : "Case Studies | Stigma Technologies",
        description: isFr
            ? "Découvrez comment Stigma Technologies a aidé des entreprises à moderniser leur IT, renforcer leur cybersécurité et accélérer leur transformation numérique."
            : "Discover how Stigma Technologies has helped organizations modernize their IT, strengthen cybersecurity and accelerate digital transformation.",
        openGraph: {
            title: isFr ? "Études de Cas | Stigma Technologies" : "Case Studies | Stigma Technologies",
            description: isFr ? "Des résultats concrets pour nos clients." : "Concrete results for our clients.",
            url: `https://stigmatech.ca/${lang}/case-studies`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/case-studies` },
    };
}


export default async function CaseStudiesPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const dict = dictionary.caseStudies;

    return (
        <div className="min-h-screen selection:bg-surface-dark selection:text-background-dark bg-white">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* Hero Section */}
                <section className="relative pt-40 pb-32 overflow-hidden bg-background-dark">
                    <div className="absolute inset-0 opacity-10 background-grid pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-4xl">
                            <span className="inline-block bg-white/10 text-white text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-1.5 mb-8 rounded-none border border-white/20">
                                {dict.hero.tag}
                            </span>
                            <h1 className="text-6xl lg:text-8xl font-display font-extrabold tracking-tight mb-10 text-white leading-[1.1]">
                                {dict.title} <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-600 font-light">{dict.titleLight}</span>
                            </h1>
                            <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-2xl">
                                {dict.hero.description}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Case Studies Segmented Grid */}
                <section className="py-32 bg-white">
                    <CaseStudiesGrid caseStudies={caseStudies} dict={dict} lang={lang} />
                </section>

                <BookingSection dictionary={dictionary.services.booking} />
                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
