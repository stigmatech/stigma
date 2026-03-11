import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AIAuditForm } from "@/components/ai-audit-form";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function AIAuditPage(props: {
    params: Promise<{ lang: Locale }>;
}) {
    const params = await props.params;
    const { lang } = params;
    const dictionary = await getDictionary(lang);

    return (
        <main className="min-h-screen bg-white">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            {/* Hero Padding */}
            <div className="pt-24 md:pt-32 pb-16 md:pb-20 bg-[#0b0c10] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block bg-white/10 text-indigo-400 text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-2 mb-8 border border-white/10 backdrop-blur-sm">
                        Audit IA Gratuit
                    </span>
                    <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6 uppercase tracking-tight">
                        {dictionary.home.aiAudit.title}
                    </h1>
                    <p className="text-indigo-100/60 max-w-xl mx-auto font-light leading-relaxed">
                        {dictionary.home.aiAudit.description}
                    </p>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 L100 0" stroke="white" strokeWidth="0.1" fill="none" />
                        <path d="M0 0 L100 100" stroke="white" strokeWidth="0.1" fill="none" />
                    </svg>
                </div>
            </div>

            {/* Audit Form Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AIAuditForm dictionary={dictionary} lang={lang} />
                </div>
            </section>

            <Footer lang={lang} dictionary={dictionary} />
        </main>
    );
}
