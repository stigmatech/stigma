import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import type { Metadata } from "next";
import { CookieContent } from "./cookie-content";

export async function generateMetadata(props: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await props.params;
	const isFr = lang === "fr";
	return {
		title: isFr
			? "Politique de Cookies | Stigma Technologies"
			: "Cookie Policy | Stigma Technologies",
		description: isFr
			? "Consultez notre politique d'utilisation des cookies pour comprendre comment nous optimisons votre expérience en respectant votre vie privée."
			: "View our cookie policy to understand how we optimize your experience while respecting your privacy.",
	};
}

export default async function CookiePolicyPage(props: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await props.params;
	const dictionary = await getDictionary(lang as Locale);

	return (
		<div className="min-h-screen bg-white selection:bg-slate-950 selection:text-white font-sans text-slate-900 overflow-x-hidden">
			<Navbar lang={lang as Locale} dictionary={dictionary} forceSolid={true} />
			<CookieContent lang={lang as Locale} dictionary={dictionary} />
			<Footer lang={lang as Locale} dictionary={dictionary} />
		</div>
	);
}
