import { getDictionary } from "@/get-dictionary";
import { supabase } from "@/lib/supabase";
import { EventCard } from "@/components/event-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";

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
            ? "Participez à nos événements stratégiques sur l'IA, la cybersécurité et l'innovation technologique au Québec."
            : "Join our strategic events on AI, cybersecurity, and technological innovation in Quebec.",
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
        console.error("Error fetching events:", error);
    }

    console.log(`Total events fetched from Supabase: ${events?.length || 0}`);

    const dict = (dictionary as any).common.events || {
        tag: isFr ? "ÉVÉNEMENTS & WEBINAIRES" : "EVENTS & WEBINARS",
        title: isFr ? "Découvrez nos prochains événements stratégiques" : "Discover our upcoming strategic events",
        description: isFr 
            ? "Rejoignez nos experts pour des sessions approfondies sur l'IA, la cybersécurité et l'innovation technologique."
            : "Join our experts for deep-dive sessions on AI, cybersecurity, and technological innovation.",
        noEvents: isFr ? "Aucun événement prévu pour le moment." : "No upcoming events scheduled at the moment."
    };

    return (
        <div className="min-h-screen bg-white dark:bg-background-dark selection:bg-surface-dark selection:text-background-dark">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />
            
            <main className="pt-24 min-h-screen">
                {/* Hero Section */}
                <section className="relative py-24 overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-dark/5 dark:bg-white/5 -skew-x-12 transform origin-right" />
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl space-y-8">
                            <div className="space-y-4">
                                <span className="text-background-dark dark:text-white font-bold text-xs uppercase tracking-[0.3em] bg-gray-100 dark:bg-white/10 px-4 py-2 inline-block">
                                    {dict.tag}
                                </span>
                                <h1 className="font-display text-5xl lg:text-8xl text-background-dark dark:text-white leading-[0.95] tracking-tighter">
                                    {isFr ? (
                                        <>L'innovation <br /><span className="font-bold">en direct.</span></>
                                    ) : (
                                        <>Innovation <br /><span className="font-bold">unleashed.</span></>
                                    )}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 font-light text-xl max-w-xl leading-relaxed">
                                    {dict.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Events Grid */}
                <section className="py-24 border-t border-gray-100 dark:border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {!events || events.length === 0 ? (
                            <div className="text-center py-24 border border-dashed border-gray-200 dark:border-white/10">
                                <p className="text-gray-400 font-light italic">
                                    {dict.noEvents}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {events.map((event) => (
                                    <EventCard key={event.id} event={event} lang={lang} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Premium CTA / Newsletter CTA */}
                <section className="py-24 bg-surface-dark dark:bg-background-dark relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-12">
                        <div className="space-y-4 max-w-2xl mx-auto">
                            <h2 className="text-4xl lg:text-6xl font-display font-bold text-white leading-tight">
                                {isFr ? "Ne manquez jamais une session." : "Never miss a session."}
                            </h2>
                            <p className="text-gray-400 font-light text-lg">
                                {isFr 
                                    ? "Inscrivez-vous à notre infolettre stratégique pour recevoir les invitations exclusives."
                                    : "Subscribe to our strategic newsletter to receive exclusive invitations."}
                            </p>
                        </div>
                        <div>
                            <a 
                                href={`/${lang}/contact`}
                                className="inline-flex items-center gap-4 bg-white text-background-dark px-10 py-5 font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all shadow-2xl"
                            >
                                {isFr ? "REJOINDRE LA COMMUNAUTÉ" : "JOIN THE COMMUNITY"}
                                <span className="material-symbols-outlined">alternate_email</span>
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
