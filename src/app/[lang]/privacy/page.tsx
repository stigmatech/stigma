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
        title: isFr ? "Politique de Confidentialité | Stigma Technologies" : "Privacy Policy | Stigma Technologies",
        description: isFr
            ? "Politique de confidentialité de Stigma Technologies — conforme à la Loi 25 du Québec sur la protection des renseignements personnels."
            : "Privacy Policy of Stigma Technologies — compliant with Quebec's Law 25 on the protection of personal information.",
        alternates: { canonical: `https://stigmatech.ca/${lang}/privacy` },
    };
}

export default async function PrivacyPolicy(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const isFr = lang === "fr";

    return (
        <div className="min-h-screen bg-white selection:bg-[#0b0c10] selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* Hero */}
                <section className="bg-[#0b0c10] text-white py-20 lg:py-28 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 background-grid pointer-events-none"></div>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="inline-block bg-white/10 text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded">
                                {isFr ? "Protection des Données" : "Data Protection"}
                            </span>
                            <span className="inline-block bg-green-500/20 text-green-400 text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded border border-green-500/30">
                                {isFr ? "Conforme Loi 25" : "Law 25 Compliant"}
                            </span>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-display font-extrabold tracking-tight mb-6">
                            {isFr ? "Politique de Confidentialité" : "Privacy Policy"}
                        </h1>
                        <p className="text-sm text-gray-400 font-medium">
                            {isFr ? "Dernière mise à jour : 5 mars 2026" : "Last updated: March 5, 2026"}
                        </p>
                    </div>
                </section>

                {/* Law 25 Alert Banner */}
                <div className="bg-[#0b0c10] text-white border-b border-[#0b0c10]">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                        <div className="flex items-start gap-4">
                            <span className="material-symbols-outlined text-white/70 text-[22px] shrink-0 mt-0.5">shield</span>
                            <p className="text-sm text-white/90 leading-relaxed">
                                {isFr
                                    ? <>Stigma Technologies s&apos;engage à protéger la vie privée de ses clients et utilisateurs. Cette politique détaille comment nous collectons, utilisons et protégeons vos renseignements personnels conformément à la <strong>Loi 25 du Québec</strong>.</>
                                    : <>Stigma Technologies is committed to protecting the privacy of its clients and users. This policy details how we collect, use, and protect your personal information in accordance with <strong>Quebec&apos;s Law 25</strong>.</>
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <section className="py-20 bg-white">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

                        {/* 1. Introduction */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-[#0b0c10] border-l-4 border-[#0b0c10] pl-4 mb-5">
                                {isFr ? "1. Introduction" : "1. Introduction"}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {isFr
                                    ? "La présente Politique de confidentialité décrit nos règles concernant la collecte, l&apos;utilisation, la divulgation et la conservation de vos renseignements personnels. En utilisant nos services, notre site web (stigmatech.ca) ou en communiquant avec nous, vous acceptez les pratiques décrites dans cette Politique."
                                    : "This Privacy Policy describes our rules regarding the collection, use, disclosure, and retention of your personal information. By using our services, our website (stigmatech.ca), or by communicating with us, you agree to the practices described in this Policy."}
                            </p>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* 2. Collecte des renseignements */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-[#0b0c10] border-l-4 border-[#0b0c10] pl-4 mb-5">
                                {isFr ? "2. Renseignements que nous collectons" : "2. Information we collect"}
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    {isFr
                                        ? "Nous ne collectons que les renseignements nécessaires aux fins identifiées. Cela peut inclure :"
                                        : "We only collect information necessary for the identified purposes. This may include:"}
                                </p>
                                <ul className="space-y-3 pl-4">
                                    {(isFr
                                        ? [
                                            "Identité : Nom, prénom.",
                                            "Coordonnées : Adresse courriel, numéro de téléphone, adresse professionnelle.",
                                            "Professionnel : Nom de l&apos;entreprise, titre de poste.",
                                            "Technique : Adresse IP, données de navigation (via cookies — voir notre Politique de Cookies).",
                                            "Communications : Contenu de vos messages via nos formulaires de contact ou par courriel."
                                        ]
                                        : [
                                            "Identity: Last name, first name.",
                                            "Contact information: Email address, phone number, professional address.",
                                            "Professional: Company name, job title.",
                                            "Technical: IP address, browsing data (via cookies — see our Cookie Policy).",
                                            "Communications: Content of your messages via our contact forms or by email."
                                        ]
                                    ).map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm italic border-l-2 border-gray-100 pl-3 py-1">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* 3. Utilisation */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-[#0b0c10] border-l-4 border-[#0b0c10] pl-4 mb-5">
                                {isFr ? "3. Pourquoi utilisons-nous vos renseignements ?" : "3. Why do we use your information?"}
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {isFr
                                    ? "Vos renseignements personnels sont utilisés exclusivement pour les finalités suivantes :"
                                    : "Your personal information is used exclusively for the following purposes:"}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(isFr
                                    ? [
                                        "Fournir et améliorer nos services TI et de cybersécurité.",
                                        "Répondre à vos demandes de soumission ou d&apos;information.",
                                        "Gérer nos relations d&apos;affaires avec vous.",
                                        "Assurer la sécurité de notre site et prévenir la fraude.",
                                        "Conformité légale et réglementaire (Loi 25).",
                                        "Envoi d&apos;informations marketing (si vous y avez consenti)."
                                    ]
                                    : [
                                        "Providing and improving our IT and cybersecurity services.",
                                        "Responding to your requests for quotes or information.",
                                        "Managing our business relationship with you.",
                                        "Ensuring the security of our site and preventing fraud.",
                                        "Legal and regulatory compliance (Law 25).",
                                        "Sending marketing information (if you have consented)."
                                    ]
                                ).map((item, i) => (
                                    <div key={i} className="bg-gray-50 p-4 border border-gray-100 flex items-center gap-3">
                                        <span className="material-symbols-outlined text-[#0b0c10] text-[18px]">verified_user</span>
                                        <span className="text-sm font-medium text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* 4. Consentement */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-[#0b0c10] border-l-4 border-[#0b0c10] pl-4 mb-5">
                                {isFr ? "4. Consentement" : "4. Consent"}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {isFr
                                    ? "Nous obtenons votre consentement avant de collecter, utiliser ou communiquer vos renseignements personnels, sauf dans les cas permis ou requis par la loi. Vous pouvez retirer votre consentement à tout moment, sous réserve de restrictions contractuelles ou légales, en nous contactant."
                                    : "We obtain your consent before collecting, using, or communicating your personal information, except where permitted or required by law. You may withdraw your consent at any time, subject to contractual or legal restrictions, by contacting us."}
                            </p>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* 5. Communication à des tiers */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-[#0b0c10] border-l-4 border-[#0b0c10] pl-4 mb-5">
                                {isFr ? "5. Communication à des tiers" : "5. Disclosure to third parties"}
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-5">
                                {isFr
                                    ? "Nous ne vendons ni n&apos;échangeons vos renseignements personnels. Nous pouvons les communiquer à des fournisseurs de services tiers qui nous aident à exploiter notre site ou à mener nos activités (ex. : hébergement, envoi de courriels), à condition que ces parties s&apos;engagent à respecter la confidentialité."
                                    : "We do not sell or trade your personal information. We may disclose it to third-party service providers who assist us in operating our site or conducting our business (e.g., hosting, email delivery), provided that these parties agree to maintain confidentiality."}
                            </p>
                            <div className="bg-blue-50 border border-blue-100 p-5">
                                <p className="text-xs text-blue-800 leading-relaxed">
                                    {isFr
                                        ? "Note : Certains fournisseurs sont situés hors du Québec. Pour plus de détails sur ces transferts, consultez notre "
                                        : "Note: Some providers are located outside Quebec. For more details on these transfers, please see our "}
                                    <Link href={`/${lang}/cookie-policy`} className="underline font-bold">{isFr ? "Politique de Cookies (Section 5)" : "Cookie Policy (Section 5)"}</Link>.
                                </p>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* 6. Conservation et Sécurité */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-[#0b0c10] border-l-4 border-[#0b0c10] pl-4 mb-5">
                                {isFr ? "6. Conservation et Sécurité" : "6. Retention and Security"}
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    {isFr
                                        ? "Nous conservons vos renseignements personnels uniquement le temps nécessaire aux fins pour lesquelles ils ont été collectés, ou selon ce que la loi exige. Nous appliquons des mesures de sécurité rigoureuses pour protéger vos données contre l&apos;accès, l&apos;utilisation ou la divulgation non autorisés :"
                                        : "We retain your personal information only as long as necessary for the purposes for which it was collected, or as required by law. We apply rigorous security measures to protect your data against unauthorized access, use, or disclosure:"}
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {(isFr
                                        ? ["Chiffrement des données sensibles", "Protocoles de sécurité réseau (pare-feu, SSL)", "Contrôle d&apos;accès strict aux employés autorisés", "Audits réguliers de nos systèmes"]
                                        : ["Encryption of sensitive data", "Network security protocols (firewalls, SSL)", "Strict access control for authorized employees", "Regular audits of our systems"]
                                    ).map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm font-medium">
                                            <span className="material-symbols-outlined text-blue-600 text-[16px]">lock</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* 7. Vos droits */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-[#0b0c10] border-l-4 border-[#0b0c10] pl-4 mb-5">
                                {isFr ? "7. Vos droits (Loi 25)" : "7. Your rights (Law 25)"}
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {isFr
                                    ? "En vertu de la Loi 25, vous disposez notamment des droits d&apos;accès, de rectification, de suppression (droit à l&apos;oubli) et de portabilité de vos données. Vous pouvez également retirer votre consentement à tout moment."
                                    : "Under Law 25, you notably have the rights of access, rectification, deletion (right to be forgotten), and portability of your data. You may also withdraw your consent at any time."}
                            </p>
                            <Link
                                href={`/${lang}/contact`}
                                className="inline-flex items-center gap-3 bg-[#0b0c10] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#0b0c10]/90 transition-all"
                            >
                                <span className="material-symbols-outlined">send</span>
                                {isFr ? "Soumettre une demande relative à mes droits" : "Submit a request regarding my rights"}
                            </Link>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* 8. DPP Contact */}
                        <div id="contact-rprp">
                            <h2 className="text-2xl font-display font-bold text-[#0b0c10] border-l-4 border-[#0b0c10] pl-4 mb-5">
                                {isFr ? "8. Responsable de la protection des renseignements personnels" : "8. Person responsible for personal information protection"}
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-5">
                                {isFr
                                    ? "Pour toute question, commentaire ou plainte concernant cette Politique ou pour exercer vos droits, veuillez contacter notre responsable :"
                                    : "For any questions, comments, or complaints regarding this Policy or to exercise your rights, please contact our responsible person:"}
                            </p>
                            <div className="bg-gray-50 border border-gray-200 p-8 space-y-4">
                                <div>
                                    <p className="font-black text-[#0b0c10] text-lg uppercase tracking-tight">Nelly Kake</p>
                                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">
                                        {isFr ? "Responsable de la protection des renseignements personnels" : "Person responsible for personal information protection"}
                                    </p>
                                </div>
                                <div className="h-px bg-gray-200 w-12" />
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <span className="material-symbols-outlined text-[20px] text-gray-400">location_on</span>
                                        6205, Boul des Grandes-Prairies, St-Léonard, Qc, H1P1A5
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="material-symbols-outlined text-[20px] text-gray-400">mail</span>
                                        <a href="mailto:privacy@stigmatech.ca" className="text-[#0b0c10] font-bold hover:underline">privacy@stigmatech.ca</a>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <span className="material-symbols-outlined text-[20px] text-gray-400">call</span>
                                        <a href="tel:+18449784462" className="hover:text-blue-600 transition-colors">+1 (844) 978-4462</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* Back link */}
                        <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                            <Link
                                href={`/${lang}/cookie-policy`}
                                className="inline-flex items-center gap-2 text-sm font-bold text-[#0b0c10] hover:underline transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">cookie</span>
                                {isFr ? "Consulter notre Politique de Cookies" : "View our Cookie Policy"}
                            </Link>
                            <Link
                                href={`/${lang}`}
                                className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#0b0c10] transition-colors"
                            >
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
