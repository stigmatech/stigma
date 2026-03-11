import Link from "next/link";
import { Locale } from "@/i18n-config";

export function AIAuditCTA({ lang, dictionary }: { lang: Locale; dictionary: any }) {
    const dict = dictionary;

    return (
        <section className="pb-24 pt-12 relative overflow-hidden">
            {/* High-end gradient background */}
            <div className="absolute inset-0 bg-background-dark"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(10,37,64,0.3),transparent_50%)]"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-16 text-center rounded-none relative overflow-hidden group">

                    {/* Animated background element */}
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-surface-dark/10 rounded-full blur-3xl group-hover:bg-surface-dark/20 transition-all duration-700"></div>

                    <div className="relative z-10">
                        <span className="inline-flex items-center gap-2 bg-surface-dark/10 text-surface-dark text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-2 mb-8 border border-surface-dark/20">
                            <span className="w-1.5 h-1.5 bg-surface-dark rounded-full animate-ping"></span>
                            {dict.tag}
                        </span>

                        <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-8 leading-tight">
                            {dict.title}
                        </h2>

                        <p className="text-white/50 text-lg font-light max-w-2xl mx-auto mb-12 leading-relaxed">
                            {dict.description}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                href={`/${lang}/solutions/ai-machine-learning/audit`}
                                className="w-full sm:w-auto bg-surface-dark text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-white hover:text-surface-dark shadow-[0_0_30px_rgba(15,45,43,0.3)] hover:shadow-[0_0_50px_rgba(15,45,43,0.5)]"
                            >
                                {dict.cta}
                            </Link>

                            <div className="flex items-center gap-3 text-white/30 text-[10px] uppercase font-bold tracking-widest">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                                </svg>
                                <span>Est. 2 MIN</span>
                            </div>
                        </div>
                    </div>

                    {/* Subtle progress indicator preview at the bottom */}
                    <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
                        <div className="h-full bg-surface-dark/40 w-[15%] group-hover:w-[35%] transition-all duration-1000 ease-out"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
