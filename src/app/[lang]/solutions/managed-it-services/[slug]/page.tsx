import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { BookingSection } from "@/components/booking-section";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CapabilityDetailPage(props: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const slug = params.slug;
    const dictionary = await getDictionary(lang);
    const itDict = dictionary.services.managedIt;

    // Type-safe access to details
    const detail = (itDict as any).details?.[slug];

    if (!detail) {
        notFound();
    }

    // Find the icon from the main items list
    const mainItem = itDict.capabilities.items.find((item: any) => item.slug === slug);
    const icon = mainItem?.icon || "settings";

    return (
        <div className="min-h-screen bg-white selection:bg-[#0b0c10] selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* Hero section */}
                <section className="bg-[#0b0c10] text-white py-14 lg:py-16 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 background-grid pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <Link
                                href={`/${lang}/solutions/managed-it-services`}
                                className="inline-flex items-center text-blue-400 hover:text-blue-300 text-xs font-bold tracking-widest uppercase mb-8 transition-colors group"
                            >
                                <span className="material-symbols-outlined text-[18px] mr-2 transform group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                {dictionary.services.shared?.backToSolutions || "Back to Managed IT"}
                            </Link>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-none flex items-center justify-center border border-blue-500/30">
                                    <span className="material-symbols-outlined text-[28px]">{icon}</span>
                                </div>
                                <span className="text-white/60 text-[11px] font-bold tracking-widest uppercase py-1 rounded">
                                    {itDict.tag} / {detail.title}
                                </span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight mb-8">
                                {detail.hero}
                            </h1>
                            <p className="text-xl text-gray-300 font-light leading-relaxed mb-10">
                                {detail.description}
                            </p>
                            <Button asChild className="bg-white text-[#0b0c10] hover:bg-gray-100 rounded-none px-8 py-6 uppercase tracking-wider text-xs font-bold">
                                <a href="#booking">{itDict.cta}</a>
                            </Button>
                        </div>
                    </div>

                    {/* Decorative element */}
                    <div className="absolute -right-20 -bottom-20 opacity-10 transform rotate-12 pointer-events-none hidden lg:block">
                        <span className="material-symbols-outlined text-[400px] text-white">{icon}</span>
                    </div>
                </section>

                {/* Features / Benefits section */}
                <section className="py-24 bg-gray-50 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {detail.features.map((feature: string, index: number) => (
                                <div
                                    key={index}
                                    className="bg-white p-10 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                                    <span className="material-symbols-outlined text-blue-600 mb-6 block text-[32px]">check_circle</span>
                                    <h3 className="text-xl font-bold text-[#0b0c10] mb-4 leading-tight">{feature}</h3>
                                    <div className="w-10 h-px bg-gray-200 mt-6"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                {detail.stats && (
                    <section className="py-10 bg-[#0b0c10] overflow-hidden relative w-full border-t border-b border-[#151c40]">
                        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
                            {/* Gradient Masks */}
                            <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-[#0b0c10] to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-[#0b0c10] to-transparent z-10 pointer-events-none"></div>

                            <div className="flex w-full overflow-hidden">
                                <style dangerouslySetInnerHTML={{
                                    __html: `
                                    @keyframes marqueestats {
                                        0% { transform: translateX(0); }
                                        100% { transform: translateX(-50%); }
                                    }
                                    .animate-stats-marquee {
                                        animation: marqueestats 40s linear infinite;
                                        display: flex;
                                    }
                                    .animate-stats-marquee:hover {
                                        animation-play-state: paused;
                                    }
                                `}} />

                                <div className="animate-stats-marquee w-max items-center py-4">
                                    {/* Render multiple sets to ensure seamless loop */}
                                    {[...Array(6)].map((_, arrayIndex) => (
                                        <div key={arrayIndex} className="flex items-center">
                                            {detail.stats.map((stat: any, index: number) => (
                                                <div key={`${arrayIndex}-${index}`} className="flex flex-col items-center justify-center w-64 md:w-80 mx-8 group">
                                                    <div className="text-4xl md:text-5xl font-display font-extrabold text-white/30 group-hover:text-white transition-colors duration-500 mb-2 whitespace-nowrap">{stat.value}</div>
                                                    <div className="text-sm uppercase tracking-widest font-bold text-white/30 group-hover:text-white transition-colors duration-500 whitespace-nowrap">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Content / Benefits section */}
                {detail.benefits && (
                    <section className="py-24 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-8">{detail.benefits.title}</h2>
                                    <div className="space-y-6">
                                        <p className="text-lg text-gray-600 leading-relaxed italic border-l-4 border-blue-600 pl-6">
                                            {detail.benefits.p1}
                                        </p>
                                        <p className="text-lg text-gray-600 leading-relaxed">
                                            {detail.benefits.p2}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-1 rounded-none border border-gray-100 shadow-inner">
                                    <div className="aspect-video bg-[#0b0c10] flex items-center justify-center relative overflow-hidden group">
                                        <div className="absolute inset-0 opacity-20 background-grid"></div>
                                        <span className="material-symbols-outlined text-[100px] text-blue-500 opacity-30 group-hover:scale-110 transition-transform duration-700">{icon}</span>
                                        <div className="absolute inset-0 bg-linear-to-t from-[#0b0c10] via-transparent to-transparent"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Process Section */}
                {detail.process && (
                    <section className="py-24 bg-gray-50 border-t border-gray-100">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <h2 className="text-3xl font-display font-bold text-[#0b0c10]">{detail.process.title}</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                                <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -translate-y-1/2 hidden md:block z-0"></div>
                                {detail.process.steps.map((step: any, index: number) => (
                                    <div key={index} className="relative z-10 flex flex-col items-center text-center bg-gray-50">
                                        <div className="w-16 h-16 rounded-none bg-white border-2 border-blue-600 text-blue-600 flex items-center justify-center text-xl font-bold mb-6 shadow-md">
                                            {index + 1}
                                        </div>
                                        <h3 className="text-xl font-bold text-[#0b0c10] mb-3">{step.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed px-4">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section id="booking">
                    <BookingSection dictionary={dictionary.services.booking} />
                </section>

                {/* Content section */}
                <section id="contact">
                    <ContactForm lang={lang} dictionary={dictionary} />
                </section>
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}

export async function generateStaticParams() {
    return [
        { slug: "cloud-backup-disaster-recovery" },
        { slug: "network-management" },
        { slug: "endpoint-resilience" },
        { slug: "cloud-administration" },
        { slug: "procurement-assets" },
        { slug: "it-strategy-vcio" },
        { slug: "odoo" },
        { slug: "erpnext" },
        { slug: "microsoft-365" },
        { slug: "google-workspace" }
    ];
}
