"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RegistrationModal } from "@/components/registration-modal";
import { Calendar, MapPin, Clock, Share2, ArrowLeft, Users, ListChecks } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface EventDetailContentProps {
  event: any;
  lang: string;
  dictionary: any;
}

export function EventDetailContent({ event, lang, dictionary }: EventDetailContentProps) {
  const isFr = lang === "fr";
  const title = (isFr ? event.title_fr : event.title_en) || event.title;
  const description = (isFr ? event.description_fr : event.description_en) || event.description;
  const dateObj = new Date(event.event_date);
  
  const formattedDate = dateObj.toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  
  const formattedTime = dateObj.toLocaleTimeString(isFr ? 'fr-FR' : 'en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const agenda = (isFr ? event.agenda_fr : event.agenda_en) || event.agenda || [];
  const speakers = event.speakers || [];

  return (
    <div className="relative pt-20">
      {/* Back Button & Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href={`/${lang}/events`}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-[10px] font-black uppercase tracking-widest"
        >
          <ArrowLeft size={14} />
          {isFr ? "Retour aux événements" : "Back to Events"}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden mb-12 lg:mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden shadow-2xl group">
            <Image 
              src={event.image_url || "/images/event-placeholder.webp"}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge className="bg-blue-600 text-white border-none px-4 py-1 text-[10px] font-black uppercase tracking-widest">
                  {isFr ? event.type : (event.type === 'Webinaire' ? 'Webinar' : event.type)}
                </Badge>
                <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em]">
                  {event.category?.replace('-', ' ')}
                </span>
              </div>
              <h1 className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 max-w-4xl">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Description */}
            <div className="prose prose-slate prose-lg max-w-none">
              <h2 className="text-3xl font-display font-black uppercase tracking-tight text-slate-950 mb-8 border-b-4 border-slate-950 pb-4 inline-block">
                {isFr ? "À PROPOS DE L'ÉVÉNEMENT" : "ABOUT THE EVENT"}
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed font-light">
                {description}
              </p>
            </div>

            {/* Agenda */}
            {agenda.length > 0 && (
              <div className="space-y-8">
                <h3 className="flex items-center gap-4 text-2xl font-black uppercase tracking-tight text-slate-950">
                  <ListChecks className="text-blue-600" />
                  {isFr ? "Programme" : "Agenda"}
                </h3>
                <div className="space-y-4">
                  {agenda.map((item: any, i: number) => (
                    <div key={i} className="flex gap-8 p-6 bg-slate-50 border-l-4 border-blue-600">
                      <div className="text-blue-600 font-black text-lg min-w-[80px]">
                        {item.time}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-900 uppercase text-sm tracking-tight">{item.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Speakers */}
            {speakers.length > 0 && (
              <div className="space-y-8">
                <h3 className="flex items-center gap-4 text-2xl font-black uppercase tracking-tight text-slate-950">
                  <Users className="text-blue-600" />
                  {isFr ? "Intervenants" : "Speakers"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {speakers.map((speaker: any, i: number) => (
                    <div key={i} className="flex items-center gap-6 p-6 border border-slate-100 bg-white shadow-sm">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-slate-100">
                        {speaker.avatar_url ? (
                          <Image src={speaker.avatar_url} alt={speaker.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300 font-black text-2xl">
                            {speaker.name?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-black uppercase text-sm text-slate-950">{speaker.name}</h4>
                        <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-1">{speaker.role}</p>
                        <p className="text-xs text-slate-500 mt-2 line-clamp-2">{speaker.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Registration Card */}
            <div className="bg-slate-950 p-10 text-white rounded-none shadow-2xl relative overflow-hidden sticky top-28">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />
              
              <div className="space-y-8 relative z-10">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Calendar className="text-blue-500 mt-1" size={20} />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{isFr ? "DATE" : "DATE"}</p>
                      <p className="text-sm font-bold uppercase">{formattedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="text-blue-500 mt-1" size={20} />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{isFr ? "HEURE" : "TIME"}</p>
                      <p className="text-sm font-bold uppercase">{formattedTime}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="text-blue-500 mt-1" size={20} />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{isFr ? "LIEU" : "LOCATION"}</p>
                      <p className="text-sm font-bold uppercase">{event.location || (isFr ? "En ligne" : "Online")}</p>
                    </div>
                  </div>
                </div>

                <RegistrationModal eventId={event.id} eventTitle={title} lang={lang} dictionary={dictionary}>
                  <Button className="w-full bg-white text-slate-950 hover:bg-slate-100 h-16 text-[11px] font-black uppercase tracking-[0.3em] rounded-none shadow-xl">
                    {isFr ? "S'INSCRIRE MAINTENANT" : "REGISTER NOW"}
                  </Button>
                </RegistrationModal>

                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{isFr ? "PARTAGER" : "SHARE"}</span>
                  <div className="flex gap-4">
                    <button className="text-white hover:text-blue-500 transition-colors"><Share2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
