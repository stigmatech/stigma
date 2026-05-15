import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { AIAuditForm } from "@/components/ai-audit-form";
import { Suspense } from "react";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const isFr = lang === "fr";
  return {
    title: isFr 
      ? "Audit Stratégique IA & Agents | Évaluation de Maturité | Stigma" 
      : "Strategic AI Audit | Maturity Assessment | Stigma",
    description: isFr
      ? "Évaluez la maturité IA de votre entreprise et identifiez vos opportunités d'automatisation agentique avec notre diagnostic interactif."
      : "Evaluate your company's AI maturity and identify agentic automation opportunities with our interactive diagnostic tool.",
    openGraph: {
      title: isFr ? "Audit IA Stratégique | Stigma" : "Strategic AI Audit | Stigma",
      description: isFr
        ? "Diagnostic de maturité Intelligence Artificielle en 2 minutes."
        : "AI maturity diagnostic in 2 minutes.",
      url: `https://stigmatech.ca/${lang}/evaluations/ai-strategy`,
      siteName: "Stigma Technologies",
      type: "website",
    },
    alternates: {
      canonical: `https://stigmatech.ca/${lang}/evaluations/ai-strategy`,
      languages: {
        en: "https://stigmatech.ca/en/evaluations/ai-strategy",
        fr: "https://stigmatech.ca/fr/evaluations/ai-strategy",
      },
    },
  };
}

export default async function AIAuditPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} dictionary={dictionary} forceSolid={true} />
      
      <main>
        {/* Elite Background Header */}
        <section className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none z-0">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.05),transparent_50%)]" />
             <div className="absolute top-0 left-0 w-full h-px bg-white/10 animate-[scan_4s_linear_infinite] z-20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-6 block drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] font-sans">
              {lang === 'fr' ? 'ÉVALUATION COGNITIVE' : 'COGNITIVE ASSESSMENT'}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter mb-4 leading-none">
              {lang === 'fr' ? 'MATURITÉ' : 'AI'} <span className="text-slate-500">{lang === 'fr' ? 'INTELLIGENCE ARTIFICIELLE' : 'MATURITY'}</span>
            </h1>
          </div>
        </section>

        {/* Diagnostic Tool Container */}
        <section className="py-24 bg-white relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Design accents */}
            <div className="absolute -left-20 top-0 text-[12vw] font-black text-slate-50 select-none tracking-tighter opacity-50 z-0">
              AGENTS
            </div>
            
            <div className="relative z-10">
              <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]">Chargement...</div>}>
                <AIAuditForm lang={lang} dictionary={dictionary} />
              </Suspense>
            </div>
          </div>
        </section>

        {/* AI Frameworks Banner */}
        <section className="py-16 border-t border-slate-100 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale contrast-125">
               <div className="text-xl font-black uppercase tracking-widest text-slate-950">RAG ARCHITECTURE</div>
               <div className="text-xl font-black uppercase tracking-widest text-slate-950">LLM ORCHESTRATION</div>
               <div className="text-xl font-black uppercase tracking-widest text-slate-950">AGENTIC WORKFLOWS</div>
               <div className="text-xl font-black uppercase tracking-widest text-slate-950">DATA PRIVACY IA</div>
               <div className="text-xl font-black uppercase tracking-widest text-slate-950">ROI AUTOMATION</div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} dictionary={dictionary} />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translateY(500px); opacity: 0; }
        }
      `}} />
    </div>
  );
}
