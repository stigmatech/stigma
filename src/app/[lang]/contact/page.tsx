import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { ContactFormWidget } from "@/components/contact-form-widget";
import type { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await props.params;
    const isFr = lang === "fr";
    return {
        title: isFr ? "Contactez-Nous | Stigma Technologies" : "Contact Us | Stigma Technologies",
        description: isFr
            ? "Contactez l'équipe Stigma Technologies pour discuter de vos besoins en IT, cybersécurité ou transformation numérique. Bureau à Montréal, service partout au Canada."
            : "Contact the Stigma Technologies team to discuss your IT, cybersecurity or digital transformation needs. Montreal office, serving all of Canada.",
        openGraph: {
            title: isFr ? "Contactez-Nous | Stigma Technologies" : "Contact Us | Stigma Technologies",
            description: isFr ? "Parlons de votre projet IT." : "Let\u2019s talk about your IT project.",
            url: `https://stigmatech.ca/${lang}/contact`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/contact` },
    };
}

interface Step {
    title: string;
    description: string;
}

interface FAQItem {
    question: string;
    answer: string;
}

export default async function Contact(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const dict = dictionary.contact;
    const formDict = {
        ...dictionary.common.contactForm,
        badges: dict.badges,
        urgent: dict.urgent
    };

    return (
        <div className="min-h-screen bg-white selection:bg-[#0b0c10] selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* Hero Section — dark, aligned with other pages */}
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
                            <p className="text-xl text-gray-300 font-light leading-relaxed">
                                {dict.hero.description}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Content Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                            {/* Left: Contact Form */}
                            <div>
                                <h3 className="text-3xl font-display font-bold text-[#0b0c10] mb-8">
                                    {lang === 'en' ? 'Send us a message' : 'Envoyez-nous un message'}
                                </h3>
                                <ContactFormWidget lang={lang} dict={formDict} />
                            </div>

                            {/* Right: Contact Information */}
                            <div className="lg:pl-12 lg:border-l border-gray-100">
                                <h3 className="text-3xl font-display font-bold text-[#0b0c10] mb-10">{dict.info.title}</h3>

                                <div className="space-y-10">
                                    {/* Office Address */}
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 shrink-0 bg-[#f8f9fa] rounded-none flex items-center justify-center">
                                            <span className="material-symbols-outlined text-gray-600">location_on</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{dict.info.office}</h4>
                                            <p className="text-lg font-medium text-[#0b0c10]">
                                                6205, Boul des Grandes-Prairies<br />
                                                St-Léonard, Qc, H1P1A5
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 shrink-0 bg-[#f8f9fa] rounded-none flex items-center justify-center">
                                            <span className="material-symbols-outlined text-gray-600">call</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{dict.info.phone}</h4>
                                            <p className="text-lg font-medium text-[#0b0c10]">
                                                <a href="tel:+18449784462" className="hover:text-gray-600 transition-colors">+1 (844) 978-4462</a>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 shrink-0 bg-[#f8f9fa] rounded-none flex items-center justify-center">
                                            <span className="material-symbols-outlined text-gray-600">mail</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{dict.info.email}</h4>
                                            <p className="text-lg font-medium text-[#0b0c10]">
                                                <a href="mailto:contact@stigmatech.ca" className="hover:text-gray-600 transition-colors">contact@stigmatech.ca</a>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Working Hours */}
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 shrink-0 bg-[#f8f9fa] rounded-none flex items-center justify-center">
                                            <span className="material-symbols-outlined text-gray-600">schedule</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{dict.info.hours}</h4>
                                            <p className="text-lg font-medium text-[#0b0c10]">
                                                {dict.info.mondayFriday}<br />
                                                <span className="text-gray-500 text-sm">9:00 AM - 5:00 PM EST</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-gray-100 my-12"></div>

                                {/* Map Display */}
                                <div className="rounded-none overflow-hidden h-64 bg-gray-100 relative group border border-gray-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop"
                                        alt="Stigma Technologies HQ"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-[#0b0c10]/10 group-hover:bg-transparent transition-colors duration-700"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-white/95 backdrop-blur-md px-6 py-4 rounded-none shadow-2xl flex items-center gap-3 border border-gray-100">
                                            <span className="material-symbols-outlined text-[#0b0c10]">location_on</span>
                                            <span className="text-xs font-black text-[#0b0c10] uppercase tracking-[0.2em]">{dict.info.montrealArea}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Process Section - What happens next? */}
                <section className="py-24 bg-[#f8f9fa] border-y border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="inline-block text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-4">
                                {dict.process.tag}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-display font-black text-[#0b0c10] uppercase tracking-tight">
                                {dict.process.title}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                            {dict.process.steps.map((step: Step, index: number) => (
                                <div key={index} className="bg-white p-10 border border-gray-100 relative group hover:shadow-xl transition-all duration-500">
                                    <span className="absolute top-6 right-8 text-5xl font-display font-black text-gray-50 group-hover:text-gray-100 transition-colors">
                                        0{index + 1}
                                    </span>
                                    <h3 className="text-xl font-display font-bold text-[#0b0c10] mb-4 relative z-10">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed relative z-10 font-light">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-display font-black text-[#0b0c10] uppercase tracking-tight">
                                {dict.faq.title}
                            </h2>
                        </div>

                        <div className="space-y-8">
                            {dict.faq.items.map((item: FAQItem, index: number) => (
                                <div key={index} className="border-b border-gray-100 pb-8 group">
                                    <h3 className="text-lg font-display font-bold text-[#0b0c10] mb-4 group-hover:text-gray-600 transition-colors flex gap-4">
                                        <span className="text-gray-300 font-light">Q.</span>
                                        {item.question}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed pl-10 border-l-2 border-gray-100">
                                        {item.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
