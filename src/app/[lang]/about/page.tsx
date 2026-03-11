import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import type { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await props.params;
    const isFr = lang === "fr";
    return {
        title: isFr ? "À Propos de Stigma Technologies | Notre Mission & Valeurs" : "About Stigma Technologies | Our Mission & Values",
        description: isFr
            ? "Découvrez l'histoire, la mission et les valeurs de Stigma Technologies — votre partenaire de confiance en solutions IT et cybersécurité au Canada."
            : "Discover Stigma Technologies's story, mission and values — your trusted partner for IT and cybersecurity solutions in Canada.",
        openGraph: {
            title: isFr ? "À Propos de Stigma Technologies" : "About Stigma Technologies",
            description: isFr ? "Notre mission : simplifier la TI pour un monde complexe." : "Our mission: simplifying IT for a complex world.",
            url: `https://stigmatech.ca/${lang}/about`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/about` },
    };
}


export default async function About(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const dict = dictionary.about;

    return (
        <div className="min-h-screen bg-white selection:bg-surface-dark selection:text-background-dark pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main className="min-h-screen selection:bg-surface-dark selection:text-background-dark bg-white">
                {/* Hero Section */}
                <section className="relative pt-32 pb-24 overflow-hidden bg-background-dark">
                    <div className="absolute inset-0 opacity-10 background-grid pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <span className="inline-block bg-white/10 text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 mb-6 rounded">
                                {dict.hero.tag}
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight mb-8">
                                {dict.hero.title}
                            </h1>
                            <p className="text-xl text-gray-300 font-light leading-relaxed">
                                {dict.hero.description}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content Sections */}
                <section className="py-24 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="space-y-24">

                            {/* The Beginning */}
                            <div id="story" className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start pt-12 -mt-12">
                                <div className="md:col-span-4">
                                    <h2 className="text-3xl font-display font-bold text-background-dark border-l-4 border-background-dark pl-4">{dict.story.title}</h2>
                                </div>
                                <div className="md:col-span-8 space-y-6 text-gray-600 leading-relaxed text-lg">
                                    <p>{dict.story.p1}</p>
                                    <p>{dict.story.p2}</p>
                                    <p>{dict.story.p3}</p>
                                </div>
                            </div>

                            <div className="h-px bg-gray-100"></div>

                            {/* Mission */}
                            <div id="mission" className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start pt-12 -mt-12">
                                <div className="md:col-span-4">
                                    <h2 className="text-3xl font-display font-bold text-background-dark border-l-4 border-black pl-4">{dict.mission.title}</h2>
                                </div>
                                <div className="md:col-span-8 space-y-6 text-gray-600 leading-relaxed text-lg">
                                    <p className="font-medium text-background-dark text-xl italic mb-6">
                                        {dict.mission.quote}
                                    </p>
                                    <p>{dict.mission.description}</p>
                                </div>
                            </div>

                            <div className="h-px bg-gray-100"></div>

                            {/* Our Values */}
                            <div id="values" className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start pt-12 -mt-12">
                                <div className="md:col-span-4">
                                    <h2 className="text-3xl font-display font-bold text-background-dark border-l-4 border-gray-300 pl-4">{dict.values.title}</h2>
                                </div>
                                <div className="md:col-span-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                                        <div className="bg-gray-50 p-8 rounded-none">
                                            <div className="w-12 h-12 bg-white rounded-none flex items-center justify-center mb-6 shadow-sm">
                                                <span className="material-symbols-outlined text-background-dark font-light text-2xl">psychology</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-background-dark mb-3">{dict.values.rationality.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {dict.values.rationality.description}
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 p-8 rounded-none">
                                            <div className="w-12 h-12 bg-white rounded-none flex items-center justify-center mb-6 shadow-sm">
                                                <span className="material-symbols-outlined text-background-dark font-light text-2xl">bolt</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-background-dark mb-3">{dict.values.initiative.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {dict.values.initiative.description}
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 p-8 rounded-none sm:col-span-2">
                                            <div className="w-12 h-12 bg-white rounded-none flex items-center justify-center mb-6 shadow-sm">
                                                <span className="material-symbols-outlined text-background-dark font-light text-2xl">lightbulb</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-background-dark mb-3">{dict.values.innovation.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {dict.values.innovation.description}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Additional Callout */}
                <section id="expertise" className="py-24 bg-gray-50 text-center scroll-mt-24">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <span className="material-symbols-outlined text-4xl text-background-dark mb-6 block">verified_user</span>
                        <h2 className="text-3xl font-display font-bold text-background-dark mb-6">{dict.expertise.title}</h2>
                        <p className="text-xl text-gray-500 font-light leading-relaxed mb-10">
                            {dict.expertise.description}
                        </p>
                    </div>
                </section>

                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
