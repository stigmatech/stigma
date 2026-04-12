import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await props.params;
    const isFr = lang === "fr";
    return {
        title: isFr ? "Conditions d'Utilisation | Stigma Technologies" : "Terms of Use | Stigma Technologies",
        description: isFr
            ? "Conditions d'utilisation du site web de Stigma Technologies. Régies par les lois du Québec et conformes à la Loi 25."
            : "Terms of use for the Stigma Technologies website. Governed by Quebec laws and compliant with Law 25.",
        alternates: { canonical: `https://stigmatech.ca/${lang}/terms-of-use` },
    };
}

export default async function TermsOfUse(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const isFr = lang === "fr";

    const sections = isFr ? [
        {
            title: "1. Acceptation des conditions",
            body: "En accédant au site web de Stigma Technologies (ci-après « le Site »), vous acceptez sans réserve les présentes Conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le Site. Nous nous réservons le droit de modifier ces conditions à tout moment ; les changements prennent effet dès leur publication sur le Site.",
        },
        {
            title: "2. Description des services",
            body: "Stigma Technologies est une entreprise québécoise spécialisée dans les services informatiques gérés, la cybersécurité, l'intelligence artificielle et la formation en technologie. Le Site fournit des informations sur nos services, ressources éducatives et moyens de contact. Il ne constitue pas une offre contractuelle.",
        },
        {
            title: "3. Informations sur l'hébergeur",
            body: "Ce Site est hébergé par Vercel Inc. dont le siège social est situé au 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. Les données transitant par le Site sont stockées sur les serveurs de Vercel, qui garantit un niveau de sécurité élevé et une conformité aux standards de l'industrie.",
        },
        {
            title: "4. Propriété intellectuelle",
            body: "Tout le contenu publié sur ce Site — textes, images, logos, graphiques, vidéos, code source — est la propriété exclusive de Stigma Technologies ou de ses partenaires et est protégé par les lois canadiennes et québécoises sur le droit d'auteur. Toute reproduction, distribution, modification ou utilisation à des fins commerciales sans autorisation écrite préalable est strictement interdite. La marque « Stigma Technologies » et son logo sont des marques de commerce déposées.",
        },
        {
            title: "5. Utilisation acceptable",
            body: null,
            list: [
                "Utiliser le Site à des fins légales uniquement",
                "Ne pas tenter d'accéder sans autorisation aux systèmes, réseaux ou données de Stigma Technologies",
                "Ne pas transmettre de contenu malveillant, offensant, diffamatoire ou illicite",
                "Ne pas effectuer de scraping, crawling ou extraction automatisée de données sans accord écrit",
                "Ne pas usurper l'identité de Stigma Technologies ou de ses employés",
                "Ne pas interférer avec le bon fonctionnement du Site (attaques DDoS, injection, etc.)",
            ],
            intro: "En utilisant le Site, vous vous engagez à :",
        },
        {
            title: "6. Limitation de responsabilité",
            body: "Les informations publiées sur ce Site sont fournies à titre indicatif uniquement. Stigma Technologies s'efforce d'assurer l'exactitude et la mise à jour des informations, mas ne peut garantir leur exhaustivité ou leur précision à tout moment. Stigma Technologies ne pourra être tenu responsable des dommages directs, indirects, accessoires ou consécutifs résultant de l'utilisation ou de l'incapacité à utiliser le Site. Certaines législations ne permettant pas l'exclusion de certaines garanties ou la limitation de responsabilité, ces exclusions peuvent ne pas s'appliquer à votre situation.",
        },
        {
            title: "7. Liens vers des sites tiers",
            body: "Le Site peut contenir des liens vers des sites web de tiers (partenaires, fournisseurs, ressources). Ces liens sont fournis à titre de commodité uniquement. Stigma Technologies n'est pas responsable du contenu, des pratiques de confidentialité ou des politiques de ces sites. Nous vous encourageons à consulter les conditions d'utilisation et politiques de confidentialité de chaque site tiers que vous visitez.",
        },
        {
            title: "8. Protection des renseignements personnels (Loi 25)",
            body: "La collecte et le traitement de vos renseignements personnels sur ce Site sont régis par notre Politique de confidentialité et conformes à la Loi 25 du Québec (Loi modernisant des dispositions législatives en matière de protection des renseignements personnels, L.Q. 2021, c. 25). Vos données ne sont jamais vendues à des tiers. Vous disposez de droits d'accès, de rectification, d'effacement et de portabilité de vos données. Pour en savoir plus, consultez notre Politique de confidentialité ou contactez notre responsable de la protection des renseignements personnels (RPRP).",
            link: { text: "Voir la Politique de cookies", href: `/${lang}/cookie-policy` },
        },
        {
            title: "9. Droit applicable et juridiction",
            body: "Les présentes Conditions d'utilisation sont régies et interprétées conformément aux lois de la province de Québec et aux lois fédérales du Canada applicables. Tout litige découlant de l'utilisation de ce Site sera soumis à la compétence exclusive des tribunaux du district judiciaire de Montréal, Québec, Canada.",
        },
        {
            title: "10. Résiliation",
            body: "Stigma Technologies se réserve le droit de suspendre ou de mettre fin à votre accès au Site, sans préavis ni responsabilité, pour toute violation des présentes conditions, comportement frauduleux ou toute autre raison jugée appropriée à notre discrétion.",
        },
        {
            title: "11. Nous contacter",
            body: "Pour toute question relative aux présentes Conditions d'utilisation :",
            contact: true,
        },
    ] : [
        {
            title: "1. Acceptance of terms",
            body: "By accessing the Stigma Technologies website (hereinafter \"the Site\"), you unreservedly accept these Terms of Use. If you do not accept these terms, please do not use the Site. We reserve the right to modify these terms at any time; changes take effect upon publication on the Site.",
        },
        {
            title: "2. Description of services",
            body: "Stigma Technologies is a Quebec-based company specializing in managed IT services, cybersecurity, artificial intelligence, and technology training. The Site provides information about our services, educational resources, and contact means. It does not constitute a contractual offer.",
        },
        {
            title: "3. Hosting information",
            body: "This Site is hosted by Vercel Inc., with its headquarters located at 440 N Barranca Ave #4133, Covina, CA 91723, USA. Data passing through the Site is stored on Vercel's servers, which guarantee a high level of security and compliance with industry standards.",
        },
        {
            title: "4. Intellectual property",
            body: "All content published on this Site — texts, images, logos, graphics, videos, source code — is the exclusive property of Stigma Technologies or its partners and is protected by Canadian and Quebec copyright laws. Any reproduction, distribution, modification, or use for commercial purposes without prior written authorization is strictly prohibited. The trademark \"Stigma Technologies\" and its logo are registered trademarks.",
        },
        {
            title: "5. Acceptable use",
            body: null,
            list: [
                "Use the Site for lawful purposes only",
                "Not attempt to gain unauthorized access to Stigma Technologies' systems, networks, or data",
                "Not transmit malicious, offensive, defamatory, or unlawful content",
                "Not perform scraping, crawling, or automated data extraction without written agreement",
                "Not impersonate Stigma Technologies or its employees",
                "Not interfere with the proper functioning of the Site (DDoS attacks, injection, etc.)",
            ],
            intro: "By using the Site, you agree to:",
        },
        {
            title: "6. Limitation of liability",
            body: "The information published on this Site is provided for informational purposes only. Stigma Technologies strives to ensure the accuracy and currency of information, but cannot guarantee its completeness or accuracy at all times. Stigma Technologies shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of or inability to use the Site. Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability, so these exclusions may not apply to your situation.",
        },
        {
            title: "7. Links to third-party sites",
            body: "The Site may contain links to third-party websites (partners, vendors, resources). These links are provided for convenience only. Stigma Technologies is not responsible for the content, privacy practices, or policies of these sites. We encourage you to review the terms of use and privacy policies of each third-party site you visit.",
        },
        {
            title: "8. Protection of personal information (Law 25)",
            body: "The collection and processing of your personal information on this Site is governed by our Privacy Policy and complies with Quebec's Law 25 (Act to modernize legislative provisions as regards the protection of personal information, S.Q. 2021, c. 25). Your data is never sold to third parties. You have the right to access, rectify, erase, and port your data. To learn more, see our Cookie Policy or contact our person responsible for the protection of personal information (PRPI).",
            link: { text: "See Cookie Policy", href: `/${lang}/cookie-policy` },
        },
        {
            title: "9. Governing law and jurisdiction",
            body: "These Terms of Use are governed by and construed in accordance with the laws of the province of Quebec and applicable federal laws of Canada. Any dispute arising from the use of this Site shall be subject to the exclusive jurisdiction of the courts of the judicial district of Montreal, Quebec, Canada.",
        },
        {
            title: "10. Termination",
            body: "Stigma Technologies reserves the right to suspend or terminate your access to the Site, without notice or liability, for any violation of these terms, fraudulent behavior, or any other reason deemed appropriate at our sole discretion.",
        },
        {
            title: "11. Contact us",
            body: "For any questions regarding these Terms of Use:",
            contact: true,
        },
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-[#0b0c10] selection:text-white">
            <Navbar lang={lang} dictionary={dictionary} />

            <main>
                {/* Hero */}
                <section className="bg-[#0b0c10] text-white pt-36 lg:pt-40 pb-20 lg:pb-28 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 background-grid pointer-events-none"></div>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="inline-block bg-white/10 text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded">
                                {isFr ? "Documents Légaux" : "Legal Documents"}
                            </span>
                            <span className="inline-block bg-green-500/20 text-green-400 text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded border border-green-500/30">
                                {isFr ? "Droit Québécois" : "Quebec Law"}
                            </span>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-display font-extrabold tracking-tight mb-6">
                            {isFr ? "Conditions d'Utilisation" : "Terms of Use"}
                        </h1>
                        <p className="text-sm text-gray-400 font-medium">
                            {isFr ? "Dernière mise à jour : 5 mars 2026" : "Last updated: March 5, 2026"}
                        </p>
                    </div>
                </section>

                {/* Banner */}
                <div className="bg-[#0b0c10] text-white border-b border-[#0b0c10]">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                        <div className="flex items-start gap-4">
                            <span className="material-symbols-outlined text-white/70 text-[22px] shrink-0 mt-0.5">balance</span>
                            <p className="text-sm text-white/90 leading-relaxed">
                                {isFr
                                    ? <><strong>Droit applicable :</strong> Les présentes conditions sont régies par les lois de la province de <strong>Québec</strong> et les lois fédérales du Canada. Elles sont conformes à la <strong>Loi 25</strong> sur la protection des renseignements personnels.</>
                                    : <><strong>Governing law:</strong> These terms are governed by the laws of the province of <strong>Quebec</strong> and applicable federal laws of Canada. They comply with <strong>Law 25</strong> on the protection of personal information.</>
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <section className="py-20 bg-white">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
                        {sections.map((section, idx) => (
                            <div key={idx}>
                                <h2 className="text-2xl font-display font-bold text-[#0b0c10] border-l-4 border-[#0b0c10] pl-4 mb-5">
                                    {section.title}
                                </h2>

                                {"list" in section && section.list ? (
                                    <div className="space-y-3">
                                        {"intro" in section && section.intro && (
                                            <p className="text-gray-600 leading-relaxed">{section.intro as string}</p>
                                        )}
                                        <ul className="space-y-2 pl-2">
                                            {section.list.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <span className="material-symbols-outlined text-[#0b0c10] text-[16px] shrink-0 mt-0.5">arrow_right</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : "contact" in section && section.contact ? (
                                    <div className="space-y-3">
                                        <p className="text-gray-600 leading-relaxed">{section.body as string}</p>
                                        <div className="bg-gray-50 border border-gray-200 p-6 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-[#0b0c10] text-[20px]">business</span>
                                                <p className="font-bold text-[#0b0c10]">Stigma Technologies</p>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <span className="material-symbols-outlined text-[18px] text-gray-400">location_on</span>
                                                6205, Boul des Grandes-Prairies, St-Léonard, Qc, H1P1A5
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <span className="material-symbols-outlined text-[18px] text-gray-400">mail</span>
                                                <a href="mailto:legal@stigmatech.ca" className="text-[#0b0c10] font-semibold hover:underline">
                                                    legal@stigmatech.ca
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <span className="material-symbols-outlined text-[18px] text-gray-400">call</span>
                                                <a href="tel:+18555521005" className="hover:text-[#0b0c10] transition-colors">+1 855-552-1005</a>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <p className="text-gray-600 leading-relaxed">{section.body as string}</p>
                                        {"link" in section && section.link && (
                                            <Link href={(section.link as { text: string; href: string }).href}
                                                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0b0c10] hover:underline mt-2">
                                                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                                {(section.link as { text: string; href: string }).text}
                                            </Link>
                                        )}
                                    </div>
                                )}

                                {idx < sections.length - 1 && <div className="h-px bg-gray-100 mt-10" />}
                            </div>
                        ))}

                        {/* Bottom links */}
                        <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-6">
                            <Link href={`/${lang}/cookie-policy`}
                                className="inline-flex items-center gap-2 text-sm font-bold text-[#0b0c10] hover:underline transition-colors">
                                <span className="material-symbols-outlined text-[18px]">cookie</span>
                                {isFr ? "Politique de cookies" : "Cookie Policy"}
                            </Link>
                            <Link href={`/${lang}/contact`}
                                className="inline-flex items-center gap-2 text-sm font-bold text-[#0b0c10] hover:underline transition-colors">
                                <span className="material-symbols-outlined text-[18px]">mail</span>
                                {isFr ? "Nous contacter" : "Contact us"}
                            </Link>
                            <Link href={`/${lang}`}
                                className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#0b0c10] transition-colors">
                                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                {isFr ? "Retour à l'accueil" : "Back to home"}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
