import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { resourcesData } from "@/lib/resources-data";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
    const { lang, slug } = await props.params;
    const resource = resourcesData.find((r) => r.slug === slug);
    if (!resource) return { title: "Not Found" };
    return {
        title: `${resource.title[lang as "en" | "fr"]} | Stigma Technologies Insights`,
        description: resource.description[lang as "en" | "fr"],
    };
}

export default async function InsightDetailPage(props: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const { lang, slug } = await props.params;
    const dictionary = await getDictionary(lang as Locale);
    const dict = dictionary.common.insights;

    const resource = resourcesData.find((r) => r.slug === slug);
    if (!resource) {
        notFound();
    }

    const title = resource.title[lang as "en" | "fr"];
    const description = resource.description[lang as "en" | "fr"];
    const highlights = resource.highlights[lang as "en" | "fr"];

    return (
        <div className="min-h-screen bg-gray-50 selection:bg-surface-dark selection:text-background-dark">
            <Navbar lang={lang as Locale} dictionary={dictionary} />
            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Breadcrumbs */}
                    <div className="mb-8">
                        <Link href={`/${lang}/insights`} className="text-surface-dark/60 hover:text-surface-dark text-sm tracking-widest uppercase font-bold transition-colors flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Back to Insights
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Left Column: Resource Details */}
                        <div className="lg:col-span-7">
                            <div className="flex gap-3 mb-6">
                                <span className="bg-background-dark px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white shadow-sm">
                                    {resource.category}
                                </span>
                                <span className="bg-surface-dark/10 px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-surface-dark shadow-sm">
                                    {dict.labels.readTime}: {resource.readTime}
                                </span>
                            </div>
                            
                            <h1 className="font-display text-4xl lg:text-6xl text-background-dark mb-8 leading-tight font-bold">
                                {title}
                            </h1>
                            
                            <p className="text-xl text-background-dark/70 font-light leading-relaxed mb-12">
                                {description}
                            </p>

                            <div className="bg-white p-8 border border-gray-100 shadow-sm mb-12">
                                <h3 className="text-sm tracking-widest font-bold uppercase text-surface-dark mb-6">
                                    {dict.labels.highlights}
                                </h3>
                                <ul className="space-y-4">
                                    {highlights.map((highlight, index) => (
                                        <li key={index} className="flex items-start gap-4">
                                            <span className="material-symbols-outlined text-surface-dark mt-1">check_circle</span>
                                            <span className="text-background-dark/80">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="hidden lg:block">
                                <img 
                                    src={resource.image} 
                                    alt={title} 
                                    className="w-full h-auto object-cover border border-gray-200 shadow-2xl"
                                />
                            </div>
                        </div>

                        {/* Right Column: Lead Capture Form */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-32">
                                <LeadCaptureForm dict={dict.form} resourceName={title} />
                            </div>
                        </div>
                        
                        {/* Mobile Image Fallback */}
                        <div className="block lg:hidden col-span-1 mt-8">
                            <img 
                                src={resource.image} 
                                alt={title} 
                                className="w-full h-auto object-cover border border-gray-200 shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer lang={lang as Locale} dictionary={dictionary} />
        </div>
    );
}
