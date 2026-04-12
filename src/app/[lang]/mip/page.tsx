import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import type { Metadata } from "next";
import { MIPHero, ParadigmShift, MIPPillars, MIPLifecycle, MIPContact } from "./mip-components";

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await props.params;
    const isFr = lang === "fr";
    return {
        title: isFr ? "Le Modèle MIP | L'Évolution de l'Intelligence Gérée" : "The MIP Model | The Evolution of Managed Intelligence",
        description: isFr
            ? "Découvrez le modèle Managed Intelligence Provider (MIP). Orchestration de l'intelligence, cybersécurité adaptive et infrastructure souveraine."
            : "Discover the Managed Intelligence Provider (MIP) model. Intelligence orchestration, adaptive cybersecurity, and sovereign infrastructure.",
        openGraph: {
            title: isFr ? "Stigma MIP Model" : "Stigma MIP Model",
            description: isFr ? "L'architecture de l'intelligence d'entreprise." : "The architecture of enterprise intelligence.",
            url: `https://stigmatech.ca/${lang}/mip`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/mip` },
    };
}

export default async function MIPPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const mipDict = dictionary.mip;

    return (
        <div className="min-h-screen bg-slate-950 selection:bg-blue-500/30 font-sans">
            <Navbar lang={lang} dictionary={dictionary} />

            <main>
                <MIPHero dict={mipDict} lang={lang} />
                <ParadigmShift dict={mipDict} />
                <MIPPillars dict={mipDict} />
                <MIPLifecycle dict={mipDict} />
                <MIPContact dict={mipDict} lang={lang} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
