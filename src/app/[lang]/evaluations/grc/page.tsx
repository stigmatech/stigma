import { getDictionary } from "@/get-dictionary";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GRCAuditForm } from "@/components/grc-audit-form";
import { Locale } from "@/i18n-config";
import { Suspense } from "react";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const isFr = lang === "fr";
  return {
    title: isFr 
      ? "Audit GRC & Gouvernance IT | Évaluation de Conformité | Stigma" 
      : "GRC & IT Governance Audit | Compliance Assessment | Stigma",
    description: isFr
      ? "Évaluez la gouvernance, les risques et la conformité de votre infrastructure TI avec notre outil de diagnostic interactif."
      : "Assess your IT infrastructure's governance, risk, and compliance with our interactive diagnostic tool.",
    openGraph: {
      title: isFr ? "Audit GRC | Stigma Technologies" : "GRC Audit | Stigma Technologies",
      description: isFr
        ? "Votre diagnostic de maturité GRC en quelques minutes."
        : "Your GRC maturity diagnostic in minutes.",
      url: `https://stigmatech.ca/${lang}/evaluations/grc`,
      siteName: "Stigma Technologies",
      type: "website",
    },
    alternates: {
      canonical: `https://stigmatech.ca/${lang}/evaluations/grc`,
      languages: {
        en: "https://stigmatech.ca/en/evaluations/grc",
        fr: "https://stigmatech.ca/fr/evaluations/grc",
      },
    },
  };
}

export default async function GRCAuditPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} dictionary={dict} forceSolid={true} />
      
      <main>
        {/* Elite Background Header */}
        <section className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none z-0">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.05),transparent_50%)]" />
             <div className="absolute top-0 left-0 w-full h-px bg-white/10 animate-[scan_4s_linear_infinite] z-20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500 mb-6 block drop-shadow-[0_0_10px_rgba(99,102,241,0.3)] font-sans">
              {lang === 'fr' ? 'GOUVERNANCE & RISQUES' : 'GOVERNANCE & RISK'}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter mb-4 leading-none">
              {lang === 'fr' ? 'STRATÉGIE' : 'IT'} <span className="text-slate-500">{lang === 'fr' ? 'GRC' : 'GRC'}</span>
            </h1>
          </div>
        </section>

        {/* Diagnostic Tool Container */}
        <section className="py-24 bg-white relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Design accents */}
            <div className="absolute -left-20 top-0 text-[12vw] font-black text-slate-50 select-none tracking-tighter opacity-50 z-0">
              GOVERN
            </div>
            
            <div className="relative z-10">
              <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]">Chargement...</div>}>
                <GRCAuditForm lang={lang} dictionary={dict} />
              </Suspense>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} dictionary={dict} />

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
