import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import type { Metadata } from "next";
import { TermsContent } from "./terms-content";

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

	return (
		<div className="min-h-screen bg-white selection:bg-slate-950 selection:text-white font-sans text-slate-900 overflow-x-hidden">
			<Navbar lang={lang as Locale} dictionary={dictionary} forceSolid={true} />
			<TermsContent lang={lang as Locale} dictionary={dictionary} />
			<Footer lang={lang as Locale} dictionary={dictionary} />
		</div>
	);
}
