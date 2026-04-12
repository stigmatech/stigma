import { getDictionary } from "@/get-dictionary";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import { EventsGallery } from "@/components/events-gallery";

// Force dynamic rendering so Supabase data is always fresh (no SSG)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const params = await props.params;
    const { lang } = params;
    const isFr = lang === "fr";
    
    return {
        title: isFr ? "Événements & Webinaires | Stigma Technologies" : "Events & Webinars | Stigma Technologies",
        description: isFr 
            ? "Participez à nos événements stratégiques sur l'IA, la cybersécurité et l'innovation technologique pour les entreprises d'envergure internationale."
            : "Join our strategic events on AI, cybersecurity, and technological innovation for global enterprise growth.",
    };
}

export default async function EventsPage(props: { params: Promise<{ lang: string }> }) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang as "en" | "fr");
    const isFr = lang === "fr";

    // Fetch events from Supabase
    const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

    if (error) {
        console.error("Error fetching events:", JSON.stringify(error, null, 2));
    }


    const dict = (dictionary as any).common.events || {
        tag: isFr ? "ÉVÉNEMENTS & WEBINAIRES" : "EVENTS & WEBINARS",
        description: isFr 
            ? "Rejoignez nos experts pour des sessions approfondies sur l'IA, la cybersécurité et l'innovation technologique."
            : "Join our experts for deep-dive sessions on AI, cybersecurity, and technological innovation.",
    };

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
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">{dict.tag}</span>
                        </div>
                        
                        <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10 whitespace-pre-line italic">
                            {isFr ? (
                                <>L'innovation <br /><span className="text-slate-500 block">en direct.</span></>
                            ) : (
                                <>Innovation <br /><span className="text-slate-500 block">unleashed.</span></>
                            )}
                        </h1>
                        
                        <p className="text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto tracking-tight">
                            {dict.description}
                        </p>
                    </div>
                </section>

                {/* Events Gallery (Filters + Grid) - Elite Industrial */}
                <section className="py-32 bg-slate-50 relative z-20 -mt-16 selection:bg-amber-500/30">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <EventsGallery 
                            events={events || []} 
                            lang={lang} 
                            dictionary={dictionary} 
                        />
                    </div>
                </section>

                {/* Premium CTA - Operational Interface */}
                <section className="py-32 bg-slate-950 text-white relative overflow-hidden border-t border-white/5">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 font-sans">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-400 mb-12 block italic">{isFr ? "PROTOCOLE D'ENGAGEMENT" : "ENGAGEMENT PROTOCOL"}</span>
                        <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-12 italic">
                            {isFr ? "Ne manquez jamais une session." : "Never miss a session."}
                        </h2>
                        <p className="text-slate-400 text-xl font-light mb-16 max-w-2xl mx-auto italic tracking-tight">
                            {isFr 
                                ? "Rejoignez notre réseau de leaders technologiques pour des invitations exclusives."
                                : "Join our network of technology leaders for exclusive invitations."}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <a 
                                href={`/${lang}/contact`}
                                className="inline-flex items-center justify-center gap-6 bg-white text-slate-950 px-12 py-8 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-slate-100 transition-all font-sans italic shadow-2xl"
                            >
                                {isFr ? "REJOINDRE LA COMMUNAUTÉ" : "JOIN THE COMMUNITY"}
                                <span className="material-symbols-outlined font-black">alternate_email</span>
                            </a>
                        </div>
                    </div>
                    {/* Scanline overlay for CTA */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
                         style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.5) 1px, rgba(255,255,255,0.5) 2px)`, backgroundSize: '100% 4px' }} 
                    />
                </section>
            </main>

            <Footer lang={lang as Locale} dictionary={dictionary} />
        </div>
    );
}
