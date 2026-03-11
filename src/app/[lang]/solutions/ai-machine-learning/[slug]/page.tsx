import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { BookingSection } from "@/components/booking-section";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
    const langs = ["fr", "en"];
    const slugs = [
        "dentistes", "comptables", "avocats", "plombiers-electriciens", "manufacturier",
        "dentists", "accountants", "lawyers", "manufacturing"
    ];

    const params = [];
    for (const lang of langs) {
        for (const slug of slugs) {
            params.push({ lang, slug });
        }
    }
    return params;
}

export async function generateMetadata(props: {
    params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
    const { lang, slug } = await props.params;
    const dictionary = await getDictionary(lang as Locale);
    const details = (dictionary.services.aiMachineLearning as any).useCaseDetails?.[slug];

    if (!details) return { title: "Stigma Technologies" };

    return {
        title: `${details.title} | Stigma Technologies`,
        description: details.description,
        openGraph: {
            title: details.title,
            description: details.description,
            url: `https://stigmatech.ca/${lang}/solutions/ai-machine-learning/${slug}`,
            siteName: "Stigma Technologies",
            type: "website",
        },
    };
}

export default async function AIUseCasePage(props: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const { lang, slug } = await props.params;
    const dictionary = await getDictionary(lang as Locale);
    const details = (dictionary.services.aiMachineLearning as any).useCaseDetails?.[slug];

    if (!details) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white pt-24">
            <Navbar lang={lang as Locale} dictionary={dictionary.common.nav} />

            <main>
                {/* Hero Section */}
                <section className="bg-[#0b0c10] text-white py-20 lg:py-32 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 background-grid-neural opacity-20"></div>
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
                    </div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .background-grid-neural {
                            background-image: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0);
                            background-size: 50px 50px;
                        }
                    `}} />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-4xl">
                            <span className="inline-block border border-white/20 text-white text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-1.5 mb-8 bg-white/5 backdrop-blur-sm">
                                {lang === 'fr' ? "Cas d'usage Industriel" : "Industrial Use Case"}
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-display font-black tracking-tight mb-8 leading-[1.1]">
                                {details.title}
                            </h1>
                            <p className="text-xl lg:text-2xl text-gray-400 font-light leading-relaxed mb-12 max-w-2xl border-l border-white/10 pl-6">
                                {details.description}
                            </p>
                            <Button asChild className="bg-white text-[#0b0c10] hover:bg-gray-100 rounded-none px-10 py-7 uppercase tracking-[0.2em] text-[10px] font-bold">
                                <a href="#contact">{(dictionary.services.aiMachineLearning as any).useCaseDetails.ui.cta}</a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl font-display font-bold text-[#0c0a1f] mb-12">{(dictionary.services.aiMachineLearning as any).useCaseDetails.ui.benefitsTitle}</h2>
                                <div className="space-y-6">
                                    {details.benefits.map((benefit: string, i: number) => (
                                        <div key={i} className="flex items-start">
                                            <div className="w-6 h-6 bg-gray-50 text-[#0b0c10] flex items-center justify-center mr-4 mt-1 border border-gray-100 italic font-black text-xs">
                                                {i + 1}
                                            </div>
                                            <p className="text-slate-600 leading-relaxed font-light">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-slate-50 p-12 border border-slate-100 relative group overflow-hidden">
                                <div className="absolute top-0 left-0 w-2 h-0 bg-[#0b0c10] transition-all duration-700 group-hover:h-full"></div>
                                <h3 className="text-xl font-bold text-[#0c0a1f] mb-6 tracking-tight">{(dictionary.services.aiMachineLearning as any).useCaseDetails.ui.whyChooseTitle}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8 font-light italic">
                                    {lang === 'fr'
                                        ? "\"Nous ne vendons pas qu'une technologie, nous vendons une expertise locale. Nous comprenons les régulations et les besoins spécifiques du marché québécois pour votre secteur.\""
                                        : "\"We don't just sell technology, we sell local expertise. We understand the regulations and specific needs of the Quebec market for your industry.\""}
                                </p>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-[#0b0c10] text-white flex items-center justify-center font-bold">S</div>
                                    <div>
                                        <p className="text-sm font-bold text-[#0c0a1f]">{(dictionary.services.aiMachineLearning as any).useCaseDetails.ui.teamTitle}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{(dictionary.services.aiMachineLearning as any).useCaseDetails.ui.consultantLabel}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <BookingSection dictionary={dictionary.services.aiMachineLearning.booking} />
                <ContactForm lang={lang as Locale} dictionary={dictionary} overrideDict={dictionary.services.aiMachineLearning.contactForm} />
            </main>

            <Footer lang={lang as Locale} dictionary={dictionary} />
        </div>
    );
}
