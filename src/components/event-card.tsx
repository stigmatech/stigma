"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { RegistrationModal } from "./registration-modal";
import { MapPin } from "lucide-react";

interface EventCardProps {
    event: {
        id: string;
        slug: string;
        title: string;
        description: string;
        event_date: string;
        location: string;
        type: string;
        image_url?: string;
    };
    lang: string;
}

export function EventCard({ event, lang }: EventCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const date = new Date(event.event_date);
    const isFr = lang === "fr";

    const formattedDate = date.toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    const formattedTime = date.toLocaleTimeString(isFr ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' });

    return (
        <>
            <div className="group bg-white dark:bg-background-dark border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                    <img 
                        src={event.image_url || "/images/event-placeholder.webp"} 
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-white border-white/20 capitalize font-black tracking-widest text-[10px]">
                        {event.type}
                    </Badge>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col grow">
                    <div className="grow space-y-4">
                        <Link href={`/${lang}/events/${event.slug}`} className="block group/title">
                            <h3 className="text-2xl font-display font-bold text-background-dark dark:text-white leading-tight group-hover/title:text-surface-dark transition-colors">
                                {event.title}
                            </h3>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 font-light line-clamp-3 leading-relaxed">
                            {event.description}
                        </p>

                        <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <span className="material-symbols-outlined text-surface-dark text-lg font-light">calendar_today</span>
                                {formattedDate}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <span className="material-symbols-outlined text-surface-dark text-lg font-light">schedule</span>
                                {formattedTime}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <span className="material-symbols-outlined text-surface-dark text-lg font-light">location_on</span>
                                {event.location || (isFr ? "En ligne" : "Online")}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <Link 
                            href={`/${lang}/events/${event.slug}`}
                            className="flex items-center justify-center border border-gray-200 dark:border-white/10 text-background-dark dark:text-white px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                        >
                            {lang === "fr" ? "Détails" : "Details"}
                        </Link>
                        <RegistrationModal eventId={event.id} eventTitle={event.title} lang={lang}>
                            <button 
                                className="w-full bg-surface-dark text-white px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-surface-dark/90 transition-all shadow-lg shadow-surface-dark/10"
                            >
                                {lang === "fr" ? "S'inscrire" : "Register"}
                            </button>
                        </RegistrationModal>
                    </div>
                </div>
            </div>
        </>
    );
}
