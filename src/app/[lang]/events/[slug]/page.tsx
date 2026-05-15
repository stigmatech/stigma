import { getDictionary } from "@/get-dictionary";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetailContent } from "./event-detail-content";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(props: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { lang, slug } = params;
  
  const { data: event } = await supabase
    .from('events')
    .select('title_fr, title_en, title, description_fr, description_en, description')
    .eq('slug', slug)
    .single();

  if (!event) return { title: "Event Not Found | Stigma Technologies" };

  const isFr = lang === "fr";
  const title = (isFr ? event.title_fr : event.title_en) || event.title;
  const description = (isFr ? event.description_fr : event.description_en) || event.description;

  return {
    title: `${title} | Stigma Technologies Events`,
    description: description,
  };
}

export default async function EventPage(props: { params: Promise<{ lang: string; slug: string }> }) {
  const params = await props.params;
  const { lang, slug } = params;
  const dictionary = await getDictionary(lang as Locale);

  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang as Locale} dictionary={dictionary.common.nav} />
      <main>
        <EventDetailContent 
          event={event} 
          lang={lang as Locale} 
          dictionary={dictionary} 
        />
      </main>
      <Footer lang={lang as Locale} dictionary={dictionary} />
    </div>
  );
}
