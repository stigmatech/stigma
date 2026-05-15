import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CoreValues } from "@/components/core-values";
import { Solutions } from "@/components/solutions";
import { AIInnovation } from "@/components/ai-innovation";
import { HowItWorks } from "@/components/how-it-works";
import { MarketplaceSpotlight } from "@/components/marketplace-spotlight";
import { TrainingTeaser } from "@/components/training-teaser";
import { Partners } from "@/components/partners";
import { CaseStudies } from "@/components/case-studies";
import { About } from "@/components/about";
import { News } from "@/components/news";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import type { Metadata } from "next";

export async function generateMetadata(props: {
 params: Promise<{ lang: string }>;
}): Promise<Metadata> {
 const { lang } = await props.params;
 const isFr = lang === "fr";
 return {
 title: isFr
 ? "Stigma Technologies | Managed Intelligence Provider (MIP)"
 : "Stigma Technologies | Managed Intelligence Provider (MIP)",
 description: isFr
 ? "Managed Intelligence Provider (MIP). Solutions IT gérées, cybersécurité adaptive, infrastructure IA et conformité Loi 25 pour entreprises."
 : "Managed Intelligence Provider (MIP). Adaptive cybersecurity, AI-ready infrastructure, and Law 25 compliance for global enterprises.",
 openGraph: {
 title: isFr ? "Stigma Technologies | Solutions IT & Cybersécurité" : "Stigma Technologies | Managed IT & Cybersecurity",
 description: isFr
 ? "Votre partenaire stratégique pour une infrastructure sécurisée, évolutive et innovante."
 : "Your strategic partner for a secure, scalable, and innovative IT infrastructure.",
 url: `https://stigmatech.ca/${lang}`,
 siteName: "Stigma Technologies",
 type: "website",
 },
 alternates: {
 canonical: `https://stigmatech.ca/${lang}`,
 languages: { en: "https://stigmatech.ca/en", fr: "https://stigmatech.ca/fr" },
 },
 category: "technology",
 };
}


export default async function Home(props: {
 params: Promise<{ lang: string }>;
}) {
 const params = await props.params;
 const lang = params.lang as Locale;
 const dictionary = await getDictionary(lang);

 return (
 <div className="min-h-screen bg-white selection:bg-surface-dark selection:text-background-dark">
 <Navbar lang={lang} dictionary={dictionary} />
 <main>
 <div className="bg-slate-950">
 <Hero lang={lang} dictionary={(dictionary as any).home.hero} />
 <CoreValues dictionary={(dictionary as any).home.coreValues} />
 </div>
 <Solutions lang={lang} dictionary={(dictionary as any).home.solutions} />
 <AIInnovation lang={lang} dictionary={(dictionary as any).home.innovation} />
 <HowItWorks lang={lang} dictionary={(dictionary as any).home.howItWorks} />
 <MarketplaceSpotlight lang={lang} dictionary={(dictionary as any).home.marketplaceSpotlight} />
 <TrainingTeaser lang={lang} dictionary={(dictionary as any).home.trainingTeaser} />
 <Partners dictionary={(dictionary as any).home.partners} />
 <CaseStudies lang={lang} dictionary={(dictionary as any).home.caseStudies} />
 <About dictionary={(dictionary as any).home?.about || (dictionary as any).about} />
 <News lang={lang} dictionary={(dictionary as any).home.news} />
 <ContactForm lang={lang} dictionary={dictionary} variant="elite" />
 </main>
 <Footer lang={lang} dictionary={dictionary} />
 </div>
 );
}
