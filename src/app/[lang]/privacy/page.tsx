import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import type { Metadata } from "next";
import { PrivacyContent } from "./privacy-content";

export async function generateMetadata(props: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await props.params;
	const isFr = lang === "fr";
	return {
		title: isFr
			? "Politique de Confidentialité | Stigma Technologies"
			: "Privacy Policy | Stigma Technologies",
		description: isFr
			? "Découvrez comment Stigma Technologies protège vos renseignements personnels conformément à la Loi 25 et au RGPD."
			: "Learn how Stigma Technologies protects your personal information in compliance with Law 25 and GDPR.",
	};
}

export default async function PrivacyPolicyPage(props: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await props.params;
	const dictionary = await getDictionary(lang as Locale);

	return (
		<div className="min-h-screen bg-white selection:bg-slate-950 selection:text-white font-sans text-slate-900 overflow-x-hidden">
			<Navbar lang={lang as Locale} dictionary={dictionary} forceSolid={true} />
			<PrivacyContent lang={lang as Locale} dictionary={dictionary} />
			<Footer lang={lang as Locale} dictionary={dictionary} />
		</div>
	);
}
