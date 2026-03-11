import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/get-dictionary";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Locale } from "@/i18n-config";
import { RegistrationModal } from "@/components/registration-modal";
import { MapPin, Calendar, Clock, ArrowLeft, Users, Trophy } from "lucide-react";
import Link from "next/link";

interface PageProps {
    params: Promise<{
        lang: string;
        slug: string;
    }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;
    const { lang, slug } = params;

    const { data: event } = await supabase
        .from('events')
        .select('title, description')
        .eq('slug', slug)
        .single();

    if (!event) return { title: "Event Not Found" };

    return {
        title: `${event.title} | Stigma Technologies`,
        description: event.description,
    };
}

export default async function EventDetailPage(props: PageProps) {
    const params = await props.params;
    const { lang, slug } = params;
    const locale = lang as Locale;
    const dictionary = await getDictionary(locale);
    const isFr = lang === "fr";

    const { data: event, error } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !event) {
        notFound();
    }

    const eventDate = new Date(event.event_date);
    const formattedDate = eventDate.toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    const formattedTime = eventDate.toLocaleTimeString(isFr ? 'fr-FR' : 'en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    const dict = (dictionary as any).common.events;

    return (
        <div className="min-h-screen bg-white dark:bg-background-dark selection:bg-surface-dark selection:text-background-dark">
            <Navbar lang={locale} dictionary={dictionary.common.nav} />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
                    <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-background-dark/70 dark:bg-black/80 backdrop-blur-[2px]" />
                    <div className="absolute inset-0 bg-linear-to-t from-background-dark via-transparent to-transparent" />
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                        <Link 
                            href={`/${lang}/events`}
                            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-xs font-black uppercase tracking-widest group"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            {dict.backToEvents}
                        </Link>
                        
                        <div className="max-w-4xl space-y-6">
                            <div className="inline-block bg-surface-dark text-white text-[10px] font-black tracking-[0.3em] uppercase px-4 py-2">
                                {event.type}
                            </div>
                            <h1 className="text-5xl lg:text-8xl font-display font-bold text-white leading-[0.95] tracking-tighter">
                                {event.title}
                            </h1>
                            
                            <div className="flex flex-wrap gap-8 pt-4">
                                <div className="flex items-center gap-3 text-white/80">
                                    <div className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center">
                                        <Calendar size={18} className="text-white" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-black uppercase tracking-widest text-[10px] text-white/40">{isFr ? "DATE" : "DATE"}</p>
                                        <p className="font-bold">{formattedDate}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-white/80">
                                    <div className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center">
                                        <Clock size={18} className="text-white" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-black uppercase tracking-widest text-[10px] text-white/40">{isFr ? "HEURE" : "TIME"}</p>
                                        <p className="font-bold">{formattedTime}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-white/80">
                                    <div className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center">
                                        <MapPin size={18} className="text-white" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-black uppercase tracking-widest text-[10px] text-white/40">{isFr ? "LIEU" : "LOCATION"}</p>
                                        <p className="font-bold">{event.location || (isFr ? "En ligne" : "Online")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-24 bg-white dark:bg-background-dark">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                            
                            {/* Left Column: Description & Media */}
                            <div className="lg:col-span-8 space-y-16">
                                <div className="prose prose-xl prose-invert max-w-none">
                                    <h2 className="text-3xl font-display font-bold text-background-dark dark:text-white mb-8 border-l-4 border-surface-dark pl-6">
                                        {isFr ? "À propos de cet événement" : "About this event"}
                                    </h2>
                                    <div className="text-gray-600 dark:text-gray-400 font-light leading-relaxed space-y-6 text-xl">
                                        {event.full_description ? (
                                            <div dangerouslySetInnerHTML={{ __html: event.full_description.replace(/\n/g, '<br/>') }} />
                                        ) : (
                                            <p>{event.description}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Agenda Section */}
                                {event.agenda && event.agenda.length > 0 && (
                                    <div className="space-y-12 pt-16 border-t border-gray-100 dark:border-white/5">
                                        <h2 className="text-3xl font-display font-bold text-background-dark dark:text-white flex items-center gap-4">
                                            <Trophy size={32} className="text-surface-dark" />
                                            {dict.agenda}
                                        </h2>
                                        <div className="space-y-8">
                                            {event.agenda.map((item: any, idx: number) => (
                                                <div key={idx} className="flex gap-8 group">
                                                    <div className="w-24 shrink-0 font-black text-surface-dark text-lg pt-1">
                                                        {item.time}
                                                    </div>
                                                    <div className="grow space-y-2 pb-8 border-b border-gray-100 dark:border-white/5 group-last:border-0">
                                                        <h4 className="text-xl font-bold text-background-dark dark:text-white">
                                                            {item.title}
                                                        </h4>
                                                        <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Registration & Speakers */}
                            <div className="lg:col-span-4 space-y-12 sticky top-32">
                                {/* Registration Sidebar Card */}
                                <div className="bg-surface-dark p-10 text-white space-y-8 shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -rotate-45 translate-x-16 -translate-y-16" />
                                    <div className="relative z-10 space-y-6">
                                        <h3 className="text-2xl font-display font-bold leading-tight">
                                            {isFr ? "Prêt à transformer votre entreprise ?" : "Ready to transform your business?"}
                                        </h3>
                                        <p className="text-white/70 font-light text-sm leading-relaxed">
                                            {isFr 
                                                ? "Le nombre de places est limité. Réservez la vôtre dès aujourd'hui pour garantir votre participation."
                                                : "Seats are limited. Book yours today to guarantee your participation."}
                                        </p>
                                        <RegistrationModal eventId={event.id} eventTitle={event.title} lang={lang}>
                                            <button className="w-full bg-white text-background-dark py-5 text-xs font-black uppercase tracking-[0.2em] hover:bg-gray-100 transition-all shadow-xl">
                                                {dict.register}
                                            </button>
                                        </RegistrationModal>
                                    </div>
                                </div>

                                {/* Speakers Section */}
                                {event.speakers && event.speakers.length > 0 && (
                                    <div className="space-y-8">
                                        <h3 className="text-xl font-display font-bold text-background-dark dark:text-white flex items-center gap-3">
                                            <Users size={20} className="text-surface-dark" />
                                            {dict.speakers}
                                        </h3>
                                        <div className="space-y-6">
                                            {event.speakers.map((speaker: any, idx: number) => (
                                                <div key={idx} className="flex items-center gap-4 group">
                                                    {speaker.image && (
                                                        <img 
                                                            src={speaker.image} 
                                                            alt={speaker.name} 
                                                            className="w-16 h-16 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                        />
                                                    )}
                                                    <div>
                                                        <h4 className="font-bold text-background-dark dark:text-white">{speaker.name}</h4>
                                                        <p className="text-[11px] text-gray-500 uppercase tracking-widest font-medium">{speaker.role}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </section>
            </main>

            <Footer lang={locale} dictionary={dictionary} />
        </div>
    );
}
