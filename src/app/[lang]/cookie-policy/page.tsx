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
        title: isFr ? "Politique de Cookies | Stigma Technologies" : "Cookie Policy | Stigma Technologies",
        description: isFr
            ? "Politique de cookies de Stigma Technologies — engagement envers la protection de la vie privée et la conformité aux standards internationaux (RGPD, Loi 25)."
            : "Cookie Policy of Stigma Technologies — committed to privacy and international compliance standards (GDPR, Law 25).",
        alternates: { canonical: `https://stigmatech.ca/${lang}/cookie-policy` },
    };
}

export default async function CookiePolicy(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const isFr = lang === "fr";

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
                                {isFr ? "Transparence & Confidentialité" : "Transparency & Privacy"}
                            </span>
                            <span className="inline-block bg-green-500/20 text-green-400 text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded border border-green-500/30">
                                {isFr ? "Confidentialité Globale" : "Privacy Compliant"}
                            </span>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-display font-extrabold tracking-tight mb-6">
                            {isFr ? "Politique de Cookies" : "Cookie Policy"}
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
                            <span className="material-symbols-outlined text-white/70 text-[22px] shrink-0 mt-0.5">gavel</span>
                            <p className="text-sm text-white/90 leading-relaxed">
                                {isFr
                                    ? <>Cette politique est conforme aux plus hauts standards de protection des données, incluant le <strong>RGPD</strong>, la <strong>Loi 25</strong> et les normes internationales. Stigma Technologies s'engage à respecter votre vie privée partout dans le monde.</>
                                    : <>This policy complies with the highest data protection standards, including <strong>GDPR</strong>, <strong>Law 25</strong>, and international regulations. Stigma Technologies is committed to respecting your privacy worldwide.</>
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <section className="py-20 bg-white">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

                        {/* 1. What is a cookie */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-[#0b0c10] border-l-4 border-[#0b0c10] pl-4 mb-5">
                                {isFr ? "1. Qu'est-ce qu'un cookie ?" : "1. What is a cookie?"}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {isFr
                                    ? "Un cookie est un petit fichier texte déposé sur votre appareil. Conformément aux standards de protection des données, tout dépôt de cookie non essentiel nécessite votre consentement préalable, libre, éclairé et spécifique."
                                    : "A cookie is a small text file placed on your device. In accordance with data protection standards, any placement of non-essential cookies requires your prior, free, informed and specific consent."}
                            </p>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* 2. Consent */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-[#0b0c10] border-l-4 border-[#0b0c10] pl-4 mb-5">
                                {isFr ? "2. Votre consentement" : "2. Your consent"}
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    {isFr
                                        ? "Conformément aux réglementations internationales (RGPD/Loi 25), nous vous demandons votre consentement explicite avant de déposer tout cookie non strictement nécessaire. Votre consentement doit être :"
                                        : "In accordance with international regulations (GDPR/Law 25), we ask for your explicit consent before placing any cookie not strictly necessary. Your consent must be:"}
                                </p>
                                <ul className="space-y-2 pl-4">
                                    {(isFr
                                        ? ["Libre : vous pouvez refuser sans conséquences sur votre accès au site", "Éclairé : nous vous informons clairement de la finalité de chaque cookie", "Spécifique : vous consentez catégorie par catégorie", "Révocable : vous pouvez retirer votre consentement à tout moment"]
                                        : ["Free: you can refuse without consequences on your access to the site", "Informed: we clearly inform you of the purpose of each cookie", "Specific: you consent category by category", "Revocable: you can withdraw your consent at any time"]
                                    ).map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <span className="material-symbols-outlined text-green-600 text-[16px] shrink-0 mt-0.5">check_circle</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="bg-amber-50 border border-amber-200 p-4 rounded-none mt-4">
                                    <p className="text-sm text-amber-800 font-medium">
                                        {isFr
                                            ? "⚠ Vous pouvez retirer votre consentement à tout moment en effaçant les cookies dans les paramètres de votre navigateur ou en nous contactant directement."
                                            : "⚠ You can withdraw your consent at any time by clearing cookies in your browser settings or by contacting us directly."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* 3. Cookie categories */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-[#0b0c10] border-l-4 border-[#0b0c10] pl-4 mb-5">
                                {isFr ? "3. Catégories de cookies utilisés" : "3. Categories of cookies used"}
                            </h2>
                            <div className="space-y-4">
                                {/* Necessary */}
                                <div className="border border-gray-200 p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-bold text-[#0b0c10]">{isFr ? "Cookies strictement nécessaires" : "Strictly necessary cookies"}</h3>
                                        <span className="text-[10px] font-bold uppercase tracking-widest bg-[#0b0c10] text-white px-2 py-0.5">
                                            {isFr ? "Pas de consentement requis" : "No consent required"}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {isFr
                                            ? "Indispensables au fonctionnement du site (navigation, sécurité, préférences de langue). Ces cookies ne collectent aucune donnée personnelle à des fins de marketing. Durée : session ou jusqu'à 12 mois."
                                            : "Essential for the website to function (navigation, security, language preferences). These cookies do not collect personal data for marketing purposes. Duration: session or up to 12 months."}
                                    </p>
                                </div>
                                {/* Analytics */}
                                <div className="border border-gray-200 p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-bold text-[#0b0c10]">{isFr ? "Cookies d'analyse et de performance" : "Analytics and performance cookies"}</h3>
                                        <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-500 text-white px-2 py-0.5">
                                            {isFr ? "Consentement requis" : "Consent required"}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {isFr
                                            ? "Permettent de mesurer l'audience et d'améliorer notre site (ex. : Google Analytics). Les données sont anonymisées. Tiers concerné : Google LLC (USA — transfert encadré par des clauses contractuelles types). Durée : jusqu'à 24 mois."
                                            : "Used to measure audience and improve our site (e.g., Google Analytics). Data is anonymized. Third party: Google LLC (USA — transfer governed by standard contractual clauses). Duration: up to 24 months."}
                                    </p>
                                </div>
                                {/* Functional */}
                                <div className="border border-gray-200 p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-bold text-[#0b0c10]">{isFr ? "Cookies de fonctionnalité" : "Functionality cookies"}</h3>
                                        <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-500 text-white px-2 py-0.5">
                                            {isFr ? "Consentement requis" : "Consent required"}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {isFr
                                            ? "Mémorisent vos préférences pour personnaliser votre expérience (langue, formulaires pré-remplis). Tiers concernés : Cal.com (prise de rendez-vous). Durée : jusqu'à 12 mois."
                                            : "Remember your preferences to personalize your experience (language, pre-filled forms). Third parties: Cal.com (appointment booking). Duration: up to 12 months."}
                                    </p>
                                </div>
                                {/* Marketing */}
                                <div className="border border-gray-200 p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-bold text-[#0b0c10]">{isFr ? "Cookies de marketing et de ciblage" : "Marketing and targeting cookies"}</h3>
                                        <span className="text-[10px] font-bold uppercase tracking-widest bg-red-500 text-white px-2 py-0.5">
                                            {isFr ? "Consentement explicite requis" : "Explicit consent required"}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {isFr
                                            ? "Utilisés pour vous proposer des publicités ciblées sur d'autres plateformes. Nous n'utilisons actuellement aucun cookie de ciblage publicitaire. Si nous en utilisions à l'avenir, cette politique serait mise à jour et votre consentement serait redemandé."
                                            : "Used to show you targeted ads on other platforms. We currently do not use any advertising targeting cookies. If we were to use them in the future, this policy would be updated and your consent would be requested again."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* 4. Your rights */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-[#0b0c10] border-l-4 border-[#0b0c10] pl-4 mb-5">
                                {isFr ? "4. Vos droits" : "4. Your rights"}
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-5">
                                {isFr
                                    ? "Conformément aux normes RGPD et Loi 25, vous disposez des droits suivants à l'égard de vos renseignements personnels :"
                                    : "In accordance with GDPR and Law 25 standards, you have the following rights regarding your personal information:"}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {(isFr
                                    ? [
                                        { icon: "person_search", title: "Droit d'accès", desc: "Consulter les renseignements personnels que nous détenons sur vous." },
                                        { icon: "edit", title: "Droit de rectification", desc: "Corriger vos renseignements s'ils sont inexacts ou incomplets." },
                                        { icon: "delete_forever", title: "Droit à l'effacement", desc: "Demander la suppression de vos données personnelles (droit à l'oubli)." },
                                        { icon: "drive_export", title: "Droit à la portabilité", desc: "Recevoir vos données dans un format technologique couramment utilisé." },
                                        { icon: "cancel", title: "Droit de retrait du consentement", desc: "Retirer votre consentement à tout moment sans préjudice." },
                                        { icon: "report", title: "Droit de plainte", desc: "Déposer une plainte auprès de la Commission d'accès à l'information (CAI)." },
                                    ]
                                    : [
                                        { icon: "person_search", title: "Right of access", desc: "Access the personal information we hold about you." },
                                        { icon: "edit", title: "Right of rectification", desc: "Correct your information if it is inaccurate or incomplete." },
                                        { icon: "delete_forever", title: "Right to erasure", desc: "Request the deletion of your personal data (right to be forgotten)." },
                                        { icon: "drive_export", title: "Right to portability", desc: "Receive your data in a commonly used technological format." },
                                        { icon: "cancel", title: "Right to withdraw consent", desc: "Withdraw your consent at any time without prejudice." },
                                        { icon: "report", title: "Right to complaint", desc: "File a complaint with the Commission d'accès à l'information (CAI)." },
                                    ]
                                ).map((right, i) => (
                                    <div key={i} className="bg-gray-50 p-4 border-l-2 border-[#0b0c10]/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-symbols-outlined text-[18px] text-[#0b0c10]">{right.icon}</span>
                                            <span className="font-bold text-sm text-[#0b0c10]">{right.title}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed">{right.desc}</p>
                                    </div>
                                ))}
                            </div>
                            {/* CAI info */}
                            <div className="mt-6 bg-[#0b0c10]/5 border border-[#0b0c10]/20 p-5">
                                <p className="text-sm font-bold text-[#0b0c10] mb-1">
                                    {isFr ? "Commission d'accès à l'information du Québec (CAI)" : "Quebec Commission on Access to Information (CAI)"}
                                </p>
                                <p className="text-xs text-gray-600 mb-2">
                                    {isFr
                                        ? "Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une plainte auprès de la CAI :"
                                        : "If you believe your rights are not being respected, you can file a complaint with the CAI:"}
                                </p>
                                <a href="https://www.cai.gouv.qc.ca" target="_blank" rel="noopener noreferrer" className="text-sm text-[#0b0c10] hover:underline font-medium">
                                    www.cai.gouv.qc.ca
                                </a>
                                <span className="text-gray-400 mx-2">·</span>
                                <span className="text-sm text-gray-600">1 888 528-7741</span>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* 5. Third-party transfers */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-[#0b0c10] border-l-4 border-[#0b0c10] pl-4 mb-5">
                                {isFr ? "5. Transferts internationaux de données" : "5. International data transfers"}
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-5">
                                {isFr
                                    ? "Certains de nos fournisseurs tiers sont établis à l'extérieur de votre région locale. En conformité avec les articles de protection des données (RGPD/Loi 25), nous avons évalué le niveau de protection et mis en place des ententes adéquates :"
                                    : "Some of our third-party providers are located outside your local region. In compliance with data protection articles (GDPR/Law 25), we have assessed the level of protection and implemented adequate agreements:"}
                            </p>
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr className="bg-[#0b0c10] text-white text-left text-xs uppercase tracking-widest">
                                        <th className="px-4 py-3">{isFr ? "Service" : "Service"}</th>
                                        <th className="px-4 py-3">{isFr ? "Pays" : "Country"}</th>
                                        <th className="px-4 py-3">{isFr ? "Finalité" : "Purpose"}</th>
                                        <th className="px-4 py-3">{isFr ? "Encadrement" : "Framework"}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { service: "Google Analytics", country: isFr ? "États-Unis" : "United States", purpose: isFr ? "Analyse d'audience" : "Audience analytics", framework: isFr ? "Clauses contractuelles types" : "Standard contractual clauses" },
                                        { service: "Cal.com", country: isFr ? "États-Unis" : "United States", purpose: isFr ? "Prise de rendez-vous" : "Appointment booking", framework: isFr ? "Clauses contractuelles types" : "Standard contractual clauses" },
                                        { service: "YouTube (Google)", country: isFr ? "États-Unis" : "United States", purpose: isFr ? "Lecture vidéo" : "Video playback", framework: isFr ? "Clauses contractuelles types" : "Standard contractual clauses" },
                                        { service: "Resend", country: isFr ? "États-Unis" : "United States", purpose: isFr ? "Envoi de courriels" : "Email delivery", framework: isFr ? "Clauses contractuelles types" : "Standard contractual clauses" },
                                        { service: "Vercel Inc.", country: isFr ? "États-Unis" : "United States", purpose: isFr ? "Hébergement du site web (adresses IP, logs serveur)" : "Website hosting (IP addresses, server logs)", framework: isFr ? "Clauses contractuelles types" : "Standard contractual clauses" },
                                    ].map((row, i) => (
                                        <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                            <td className="px-4 py-3 font-medium text-[#0b0c10]">{row.service}</td>
                                            <td className="px-4 py-3 text-gray-600">{row.country}</td>
                                            <td className="px-4 py-3 text-gray-600">{row.purpose}</td>
                                            <td className="px-4 py-3 text-gray-600">{row.framework}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* 6. How to control */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-[#0b0c10] border-l-4 border-[#0b0c10] pl-4 mb-5">
                                {isFr ? "6. Comment gérer ou supprimer les cookies ?" : "6. How to manage or delete cookies?"}
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {isFr
                                    ? "Vous pouvez à tout moment modifier ou retirer votre consentement via les paramètres de votre navigateur :"
                                    : "You can at any time modify or withdraw your consent via your browser settings:"}
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[
                                    { browser: "Chrome", link: "https://support.google.com/chrome/answer/95647" },
                                    { browser: "Firefox", link: "https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent" },
                                    { browser: "Safari", link: "https://support.apple.com/fr-ca/guide/safari/sfri11471/mac" },
                                    { browser: "Edge", link: "https://support.microsoft.com/fr-fr/windows/supprimer-et-g%C3%A9rer-les-cookies-168dab11-0753-043d-7c16-ede5947fc64d" },
                                ].map((b, i) => (
                                    <a key={i} href={b.link} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 border border-gray-200 p-3 text-sm font-semibold text-[#0b0c10] hover:bg-[#0b0c10] hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                        {b.browser}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* 7. DPP Contact */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-[#0b0c10] border-l-4 border-[#0b0c10] pl-4 mb-5">
                                {isFr ? "7. Responsable de la protection des renseignements personnels" : "7. Person responsible for personal information protection"}
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-5">
                                {isFr
                                    ? "Conformément à la Loi 25, Stigma Technologies a désigné un responsable de la protection des renseignements personnels (RPRP). Pour exercer vos droits ou pour toute question relative à cette politique :"
                                    : "In accordance with Law 25, Stigma Technologies has designated a person responsible for the protection of personal information (PRPI). To exercise your rights or for any questions regarding this policy:"}
                            </p>
                            <div className="bg-gray-50 border border-gray-200 p-6 space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[#0b0c10] text-[20px]">business</span>
                                    <div>
                                        <p className="font-bold text-[#0b0c10]">Stigma Technologies</p>
                                        <p className="text-sm text-[#0b0c10] font-bold">Nelly Kake</p>
                                        <p className="text-sm text-gray-500">{isFr ? "Responsable de la protection des renseignements personnels" : "Person responsible for personal information protection"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <span className="material-symbols-outlined text-[18px] text-gray-400">location_on</span>
                                    6205, Boul des Grandes-Prairies, St-Léonard, Qc, H1P1A5
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <span className="material-symbols-outlined text-[18px] text-gray-400">mail</span>
                                    <a href="mailto:privacy@stigmatech.ca" className="text-[#0b0c10] hover:underline">privacy@stigmatech.ca</a>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <span className="material-symbols-outlined text-[18px] text-gray-400">call</span>
                                    <a href="tel:+18555521005" className="hover:text-[#0b0c10] transition-colors">+1 855-552-1005</a>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <span className="material-symbols-outlined text-[18px] text-gray-400">schedule</span>
                                    {isFr ? "Délai de réponse : 30 jours maximum (Loi 25, art. 97)" : "Response time: 30 days maximum (Law 25, art. 97)"}
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* 8. Policy updates */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-[#0b0c10] border-l-4 border-[#0b0c10] pl-4 mb-5">
                                {isFr ? "8. Mise à jour de cette politique" : "8. Policy updates"}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {isFr
                                    ? "Nous pouvons mettre à jour cette politique pour refléter des changements dans nos pratiques ou dans la réglementation applicable (notamment la Loi 25). En cas de modification substantielle affectant vos droits, nous vous en informerons par courriel ou par un avis prominent sur notre site web. La date de la dernière mise à jour est indiquée en haut de cette page."
                                    : "We may update this policy to reflect changes in our practices or applicable regulations (including Law 25). In the event of a material change affecting your rights, we will notify you by email or through a prominent notice on our website. The date of the last update is indicated at the top of this page."}
                            </p>
                        </div>

                        {/* Back link */}
                        <div className="pt-8 border-t border-gray-100">
                            <Link
                                href={`/${lang}/contact`}
                                className="inline-flex items-center gap-2 text-sm font-bold text-[#0b0c10] hover:text-[#0b0c10] transition-colors mr-8"
                            >
                                <span className="material-symbols-outlined text-[18px]">mail</span>
                                {isFr ? "Exercer mes droits" : "Exercise my rights"}
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
