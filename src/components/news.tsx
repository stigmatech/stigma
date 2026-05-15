import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import { motion } from "framer-motion";

export function News({ lang, dictionary }: { lang: Locale, dictionary: any }) {
  const dict = dictionary;
  const news = [
    {
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
      date: lang === 'en' ? "APRIL 15, 2024" : "15 AVRIL 2024",
      tag: lang === 'en' ? "CYBERSECURITY" : "CYBERSÉCURITÉ",
      title: lang === 'en'
        ? "The Zero Trust Evolution: Securing Hybrid Workforces in 2024"
        : "L'évolution du Zero Trust : Sécuriser les effectifs hybrides en 2024",
    },
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
      date: lang === 'en' ? "DECEMBER 6, 2023" : "6 DÉCEMBRE 2023",
      tag: lang === 'en' ? "CYBERSECURITY" : "CYBERSÉCURITÉ",
      title: lang === 'en'
        ? "Enterprise Resilience: Navigating the New Cyber Threat Landscape"
        : "Résilience d'entreprise : Naviguer dans le nouveau paysage des cybermenaces",
    },
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
      date: lang === 'en' ? "OCTOBER 10, 2023" : "10 OCTOBRE 2023",
      tag: "HRM",
      title: lang === 'en'
        ? "Beyond Compliance: Scaling Security for Global Operations"
        : "Au-delà de la conformité : Faire évoluer la sécurité pour les opérations mondiales",
    },
    {
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop",
      date: lang === 'en' ? "SEPTEMBER 5, 2023" : "5 SEPTEMBRE 2023",
      tag: lang === 'en' ? "PRODUCTS" : "PRODUITS",
      title: lang === 'en'
        ? "Unlocking ROI: The Strategic Advantage of Managed IT"
        : "Libérer le ROI : L'avantage stratégique de l'informatique gérée",
    },
    {
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
      date: lang === 'en' ? "AUGUST 12, 2023" : "12 AOÛT 2023",
      tag: lang === 'en' ? "IT SUPPORT" : "SUPPORT IT",
      title: lang === 'en'
        ? "The AI Frontier: Optimizing Infrastructure for Machine Learning"
        : "La frontière de l'IA : Optimiser l'infrastructure pour le Machine Learning",
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-100 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 bg-slate-950 text-white text-[9px] font-black tracking-[0.3em] uppercase">
              {lang === 'en' ? 'LATEST' : 'DERNIÈRES'}
            </span>
            <h2 className="font-display text-4xl lg:text-5xl text-slate-950 uppercase tracking-tighter">
              <span className="font-black">{lang === 'en' ? 'Strategic' : 'Actualités'}</span> <br className="md:hidden" /><span className="text-slate-400 font-bold">{lang === 'en' ? 'Insights' : 'Stratégiques'}</span>
            </h2>
          </div>
          <Link href={`/${lang}/blog`}>
            <Button variant="outline" className="rounded-none border-2 border-slate-950 text-slate-950 px-8 py-6 uppercase tracking-widest text-[10px] font-black hover:bg-slate-950 hover:text-white transition-all shadow-md hover:shadow-xl">
              {dict.viewAll}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Featured / Larger Card */}
          <div className="lg:col-span-1 group cursor-pointer flex flex-col h-full bg-slate-50 border border-slate-100 hover:border-blue-500 transition-colors duration-500 shadow-sm hover:shadow-xl">
            <div className="overflow-hidden rounded-none h-64 relative border-b border-slate-100">
              <div className="absolute top-4 right-4 bg-slate-950 text-white px-3 py-1.5 text-[9px] tracking-widest font-black uppercase z-20">23%</div>
              <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/0 transition-colors z-10 duration-700" />
              <img src={news[0].image} alt="News abstract" className="w-full h-full object-cover grayscale mix-blend-multiply opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
            </div>
            <div className="p-8 flex-1 flex flex-col space-y-4">
              <div className="flex items-center gap-3 text-[9px] font-black text-slate-500 tracking-[0.2em] uppercase">
                <span>{news[0].date}</span>
                <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                <span className="text-blue-600">{news[0].tag}</span>
              </div>
              <h3 className="font-black text-slate-950 text-2xl leading-tight group-hover:text-blue-600 transition-colors">{news[0].title}</h3>
            </div>
          </div>

          {/* Grid for remaining items */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            {news.slice(1, 5).map((item, index) => (
              <div key={index} className="group cursor-pointer flex flex-col bg-white border border-slate-100 hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="overflow-hidden rounded-none h-40 relative border-b border-slate-100">
                  <div className="absolute inset-0 bg-slate-950/5 group-hover:bg-slate-950/0 transition-colors z-10 duration-500" />
                  <img src={item.image} alt="News image" className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                </div>
                <div className="p-6 flex-1 flex flex-col space-y-3">
                  <div className="flex items-center gap-2 text-[9px] font-bold text-slate-500 tracking-[0.2em] uppercase">
                    <span>{item.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>{item.tag}</span>
                  </div>
                  <h3 className="font-bold text-slate-950 text-lg leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
