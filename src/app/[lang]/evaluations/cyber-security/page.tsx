import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { CyberAuditForm } from "@/components/cyber-audit-form";
import { Suspense } from "react";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const isFr = lang === "fr";
  return {
    title: isFr 
      ? "Audit Stratégique Cybersécurité | Évaluation de Maturité | Stigma" 
      : "Strategic Cyber Audit | Maturity Assessment | Stigma",
    description: isFr
      ? "Évaluez la posture de sécurité de votre entreprise selon les standards NIST et ISO 27001 avec notre outil de diagnostic interactif."
      : "Assess your enterprise's security posture according to NIST and ISO 27001 standards with our interactive diagnostic tool.",
    openGraph: {
      title: isFr ? "Audit Cyber Stratégique | Stigma" : "Strategic Cyber Audit | Stigma",
      description: isFr
        ? "Diagnostic de maturité cybersécurité en 2 minutes."
        : "Cybersecurity maturity diagnostic in 2 minutes.",
      url: `https://stigmatech.ca/${lang}/evaluations/cyber-security`,
      siteName: "Stigma Technologies",
      type: "website",
    },
    alternates: {
      canonical: `https://stigmatech.ca/${lang}/evaluations/cyber-security`,
    },
  };
}

export default async function CyberAuditPage(props: {
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
              {lang === 'fr' ? 'ÉVALUATION NORMATIVE' : 'NORMATIVE ASSESSMENT'}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter mb-4 leading-none">
              {lang === 'fr' ? 'PÉRIMÈTRE DE' : 'SECURITY'} <span className="text-slate-500">{lang === 'fr' ? 'SÉCURITÉ' : 'PERIMETER'}</span>
            </h1>
          </div>
        </section>

        {/* Diagnostic Tool Container */}
        <section className="py-24 bg-white relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Design accents */}
            <div className="absolute -left-20 top-0 text-[12vw] font-black text-slate-50 select-none tracking-tighter opacity-50 z-0">
              SECURE
            </div>
            
            <div className="relative z-10">
              <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]">Chargement...</div>}>
                <CyberAuditForm lang={lang} dictionary={dictionary} />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Framework Reference Banner */}
        <section className="py-16 border-t border-slate-100 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale contrast-125">
               <div className="text-xl font-black uppercase tracking-widest text-slate-950">NIST CSF</div>
               <div className="text-xl font-black uppercase tracking-widest text-slate-950">ISO 27001</div>
               <div className="text-xl font-black uppercase tracking-widest text-slate-950">CIS CONTROLS</div>
               <div className="text-xl font-black uppercase tracking-widest text-slate-950">SOC2 TYPE II</div>
               <div className="text-xl font-black uppercase tracking-widest text-slate-950">LOI 25 QC</div>
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
