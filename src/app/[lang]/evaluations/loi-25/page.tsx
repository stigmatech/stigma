import { getDictionary } from "@/get-dictionary";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Loi25AuditForm } from "@/components/loi25-audit-form";
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
      ? "Audit de Maturité Loi 25 | Évaluation de Conformité | Stigma" 
      : "Law 25 Maturity Audit | Compliance Assessment | Stigma",
    description: isFr
      ? "Diagnostic de conformité Loi 25 pour entreprises québécoises. Évaluez votre niveau de préparation et recevez un rapport détaillé."
      : "Law 25 compliance diagnostic for Quebec businesses. Assess your readiness level and receive a detailed report.",
    openGraph: {
      title: isFr ? "Audit Loi 25 | Stigma Technologies" : "Law 25 Audit | Stigma Technologies",
      description: isFr
        ? "Votre diagnostic de conformité Loi 25 en quelques minutes."
        : "Your Law 25 compliance diagnostic in minutes.",
      url: `https://stigmatech.ca/${lang}/evaluations/loi-25`,
      siteName: "Stigma Technologies",
      type: "website",
    },
    alternates: {
      canonical: `https://stigmatech.ca/${lang}/evaluations/loi-25`,
      languages: {
        en: "https://stigmatech.ca/en/evaluations/loi-25",
        fr: "https://stigmatech.ca/fr/evaluations/loi-25",
      },
    },
  };
}

export default async function Loi25AuditPage(props: { params: Promise<{ lang: string }> }) {
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
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05),transparent_50%)]" />
             <div className="absolute top-0 left-0 w-full h-px bg-white/10 animate-[scan_4s_linear_infinite] z-20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500 mb-6 block drop-shadow-[0_0_10px_rgba(16,185,129,0.3)] font-sans">
              {lang === 'fr' ? 'CONFORMITÉ LÉGALE' : 'LEGAL COMPLIANCE'}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter mb-4 leading-none">
              {lang === 'fr' ? 'GOUVERNANCE' : 'LAW 25'} <span className="text-slate-500">{lang === 'fr' ? 'LOI 25' : 'GOVERNANCE'}</span>
            </h1>
          </div>
        </section>

        {/* Diagnostic Tool Container */}
        <section className="py-24 bg-white relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Design accents */}
            <div className="absolute -left-20 top-0 text-[12vw] font-black text-slate-50 select-none tracking-tighter opacity-50 z-0">
              PRIVACY
            </div>
            
            <div className="relative z-10">
              <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]">Chargement...</div>}>
                <Loi25AuditForm lang={lang} dictionary={dict} />
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
