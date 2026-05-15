import { getDictionary } from "@/get-dictionary";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Shield, Zap, Scale, ChevronRight } from "lucide-react";
import { Locale } from "@/i18n-config";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const isFr = lang === "fr";
  return {
    title: isFr 
      ? "Diagnostics & Audits Technologiques | Stigma Technologies" 
      : "Technology Diagnostics & Audits | Stigma Technologies",
    description: isFr
      ? "Évaluez votre maturité technologique : IA, Cybersécurité et conformité Loi 25. Obtenez un rapport d'audit instantané."
      : "Assess your technological maturity: AI, Cybersecurity, and Law 25 compliance. Get an instant audit report.",
    openGraph: {
      title: isFr ? "Centre de Diagnostics Technologiques | Stigma" : "Tech Diagnostic Center | Stigma",
      description: isFr
        ? "Audits gratuits de maturité technologique pour entreprises."
        : "Free technology maturity audits for businesses.",
      url: `https://stigmatech.ca/${lang}/evaluations`,
      siteName: "Stigma Technologies",
      type: "website",
    },
    alternates: {
      canonical: `https://stigmatech.ca/${lang}/evaluations`,
      languages: {
        en: "https://stigmatech.ca/en/evaluations",
        fr: "https://stigmatech.ca/fr/evaluations",
      },
    },
  };
}

export default async function EvaluationsHubPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const hub = dict.common.nav.hub;

  const evaluationCards = [
    {
      id: "ai",
      title: hub.ai_title,
      description: hub.ai_desc,
      href: `/${lang}/evaluations/ai-strategy`,
      icon: Zap,
      color: "blue",
    },
    {
      id: "cyber",
      title: hub.cyber_title,
      description: hub.cyber_desc,
      href: `/${lang}/evaluations/cyber-security`,
      icon: Shield,
      color: "slate",
    },
    {
      id: "loi25",
      title: dict.loi25Audit.title,
      description: dict.loi25Audit.description,
      href: `/${lang}/evaluations/loi-25`,
      icon: Scale,
      color: "emerald",
      isNew: true,
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar lang={lang} dictionary={dict} forceSolid={true} />
      
      <main className="grow pt-32 pb-24">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6 block">
              DIAGNOSTIC STRATÉGIQUE
            </span>
            <h1 className="text-5xl md:text-8xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-10">
              {hub.title}
            </h1>
            <p className="text-xl text-slate-500 font-light tracking-tight leading-relaxed">
              {hub.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {evaluationCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link 
                  key={card.id}
                  href={card.href}
                  className="group relative bg-white border border-slate-100 p-12 hover:border-slate-950 transition-all duration-500 shadow-sm hover:shadow-2xl overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-slate-50 text-slate-100 flex items-center justify-center text-9xl font-black italic -translate-y-8 translate-x-8 transition-colors pointer-events-none ${
                    card.color === 'emerald' ? 'group-hover:text-emerald-50' : 
                    card.color === 'slate' ? 'group-hover:text-slate-50' : 
                    'group-hover:text-blue-50'
                  }`}>
                    {card.id === 'ai' ? 'IA' : card.id === 'cyber' ? 'CYBER' : 'L25'}
                  </div>
                  
                  <div className="relative z-10 space-y-10">
                    <div className={`w-16 h-16 bg-slate-950 text-white flex items-center justify-center rounded-none transition-colors ${
                      card.color === 'emerald' ? 'group-hover:bg-emerald-600' : 
                      card.color === 'slate' ? 'group-hover:bg-slate-700' : 
                      card.color === 'indigo' ? 'group-hover:bg-indigo-600' :
                      'group-hover:bg-blue-600'
                    }`}>
                      <Icon className="w-8 h-8" />
                    </div>

                    {card.isNew && (
                      <div className="absolute top-0 left-0 bg-emerald-600 text-white text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1">
                        NOUVEAU
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <h3 className={`text-2xl font-display font-black text-slate-950 uppercase tracking-tight transition-colors ${
                        card.color === 'emerald' ? 'group-hover:text-emerald-600' : 
                        card.color === 'slate' ? 'group-hover:text-slate-700' : 
                        card.color === 'indigo' ? 'group-hover:text-indigo-600' :
                        'group-hover:text-blue-600'
                      }`}>
                        {card.title}
                      </h3>
                      <p className="text-slate-500 font-light leading-relaxed tracking-tight min-h-[80px]">
                        {card.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-950 group-hover:translate-x-2 transition-transform">
                      {hub.cta}
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-32 p-12 bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 to-transparent" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter">
                  Besoin d&apos;un audit approfondi ?
                </h2>
                <p className="text-slate-400 font-light max-w-xl">
                  Nos architectes seniors peuvent intervenir pour un audit technique sur site ou à distance de vos infrastructures critiques.
                </p>
              </div>
              <div className="lg:col-span-1 flex lg:justify-end">
                <Link 
                  href={`/${lang}/contact`}
                  className="bg-white text-slate-950 px-10 py-5 text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all text-center w-full lg:w-auto"
                >
                  Contacter un Expert
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} dictionary={dict} />
    </div>
  );
}
