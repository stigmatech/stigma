"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Locale } from "@/i18n-config";

interface TermsContentProps {
	lang: Locale;
	dictionary: any;
}

export function TermsContent({ lang, dictionary }: TermsContentProps) {
	const isFr = lang === "fr";

	const sections = isFr ? [
		{
			id: "acceptance",
			title: "1. Acceptation des conditions",
			body: "En accédant au site web de Stigma Technologies (ci-après « le Site »), vous acceptez sans réserve les présentes Conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le Site. Nous nous réservons le droit de modifier ces conditions à tout moment ; les changements prennent effet dès leur publication sur le Site.",
		},
		{
			id: "services",
			title: "2. Description des services",
			body: "Stigma Technologies est une entreprise québécoise spécialisée dans les services informatiques gérés, la cybersécurité, l'intelligence artificielle et la formation en technologie. Le Site fournit des informations sur nos services, ressources éducatives et moyens de contact. Il ne constitue pas une offre contractuelle.",
		},
		{
			id: "hosting",
			title: "3. Informations sur l'hébergeur",
			body: "Ce Site est hébergé par Vercel Inc. dont le siège social est situé au 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. Les données transitant par le Site sont stockées sur les serveurs de Vercel, qui garantit un niveau de sécurité élevé et une conformité aux standards de l'industrie.",
		},
		{
			id: "intellectual-property",
			title: "4. Propriété intellectuelle",
			body: "Tout le contenu publié sur ce Site — textes, images, logos, graphiques, vidéos, code source — est la propriété exclusive de Stigma Technologies ou de ses partenaires et est protégé par les lois canadiennes et québécoises sur le droit d'auteur. Toute reproduction, distribution, modification ou utilisation à des fins commerciales sans autorisation écrite préalable est strictement interdite. La marque « Stigma Technologies » et son logo sont des marques de commerce déposées.",
		},
		{
			id: "acceptable-use",
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
			id: "liability",
			title: "6. Limitation de responsabilité",
			body: "Les informations publiées sur ce Site sont fournies à titre indicatif uniquement. Stigma Technologies s'efforce d'assurer l'exactitude et la mise à jour des informations, mais ne peut garantir leur exhaustivité ou leur précision à tout moment. Stigma Technologies ne pourra être tenu responsable des dommages directs, indirects, accessoires ou consécutifs résultant de l'utilisation ou de l'incapacité à utiliser le Site. Certaines législations ne permettant pas l'exclusion de certaines garanties ou la limitation de responsabilité, ces exclusions peuvent ne pas s'appliquer à votre situation.",
		},
		{
			id: "third-party",
			title: "7. Liens vers des sites tiers",
			body: "Le Site peut contenir des liens vers des sites web de tiers (partenaires, fournisseurs, ressources). Ces liens sont fournis à titre de commodité uniquement. Stigma Technologies n'est pas responsable du contenu, des pratiques de confidentialité ou des politiques de ces sites. Nous vous encourageons à consulter les conditions d'utilisation et politiques de confidentialité de chaque site tiers que vous visitez.",
		},
		{
			id: "protection",
			title: "8. Protection des renseignements personnels (Loi 25)",
			body: "La collecte et le traitement de vos renseignements personnels sur ce Site sont régis par notre Politique de confidentialité et conformes à la Loi 25 du Québec. Vos données ne sont jamais vendues à des tiers. Vous disposez de droits d'accès, de rectification, d'effacement et de portabilité de vos données.",
			link: { text: "Voir la Politique de confidentialité", href: `/${lang}/privacy` },
		},
		{
			id: "jurisdiction",
			title: "9. Droit applicable et juridiction",
			body: "Les présentes Conditions d'utilisation sont régies et interprétées conformément aux lois de la province de Québec et aux lois fédérales du Canada applicables. Tout litige découlant de l'utilisation de ce Site sera soumis à la compétence exclusive des tribunaux du district judiciaire de Montréal, Québec, Canada.",
		},
		{
			id: "termination",
			title: "10. Résiliation",
			body: "Stigma Technologies se réserve le droit de suspendre ou de mettre fin à votre accès au Site, sans préavis ni responsabilité, pour toute violation des présentes conditions, comportement frauduleux ou toute autre raison jugée appropriée à notre discrétion.",
		},
		{
			id: "contact",
			title: "11. Nous contacter",
			body: "Pour toute question relative aux présentes Conditions d'utilisation :",
			contact: true,
		},
	] : [
		{
			id: "acceptance",
			title: "1. Acceptance of terms",
			body: "By accessing the Stigma Technologies website (hereinafter \"the Site\"), you unreservedly accept these Terms of Use. If you do not accept these terms, please do not use the Site. We reserve the right to modify these terms at any time; changes take effect upon publication on the Site.",
		},
		{
			id: "services",
			title: "2. Description of services",
			body: "Stigma Technologies is a Quebec-based company specializing in managed IT services, cybersecurity, artificial intelligence, and technology training. The Site provides information about our services, educational resources, and contact means. It does not constitute a contractual offer.",
		},
		{
			id: "hosting",
			title: "3. Hosting information",
			body: "This Site is hosted by Vercel Inc., with its headquarters located at 440 N Barranca Ave #4133, Covina, CA 91723, USA. Data passing through the Site is stored on Vercel's servers, which guarantee a high level of security and compliance with industry standards.",
		},
		{
			id: "intellectual-property",
			title: "4. Intellectual property",
			body: "All content published on this Site — texts, images, logos, graphics, videos, source code — is the exclusive property of Stigma Technologies or its partners and is protected by Canadian and Quebec copyright laws. Any reproduction, distribution, modification, or use for commercial purposes without prior written authorization is strictly prohibited. The trademark \"Stigma Technologies\" and its logo are registered trademarks.",
		},
		{
			id: "acceptable-use",
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
			id: "liability",
			title: "6. Limitation of liability",
			body: "The information published on this Site is provided for informational purposes only. Stigma Technologies strives to ensure the accuracy and currency of information, but cannot guarantee its completeness or accuracy at all times. Stigma Technologies shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of or inability to use the Site. Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability, so these exclusions may not apply to your situation.",
		},
		{
			id: "third-party",
			title: "7. Links to third-party sites",
			body: "The Site may contain links to third-party websites (partners, vendors, resources). These links are provided for convenience only. Stigma Technologies is not responsible for the content, privacy practices, or policies of these sites. We encourage you to review the terms of use and privacy policies of each third-party site you visit.",
		},
		{
			id: "protection",
			title: "8. Protection of personal information (Law 25)",
			body: "The collection and processing of your personal information on this Site is governed by our Privacy Policy and complies with Quebec's Law 25. Your data is never sold to third parties. You have the right to access, rectify, erase, and port your data.",
			link: { text: "See Privacy Policy", href: `/${lang}/privacy` },
		},
		{
			id: "jurisdiction",
			title: "9. Governing law and jurisdiction",
			body: "These Terms of Use are governed by and construed in accordance with the laws of the province of Quebec and applicable federal laws of Canada. Any dispute arising from the use of this Site shall be subject to the exclusive jurisdiction of the courts of the judicial district of Montreal, Quebec, Canada.",
		},
		{
			id: "termination",
			title: "10. Termination",
			body: "Stigma Technologies reserves the right to suspend or terminate your access to the Site, without notice or liability, for any violation of these terms, fraudulent behavior, or any other reason deemed appropriate at our sole discretion.",
		},
		{
			id: "contact",
			title: "11. Contact us",
			body: "For any questions regarding these Terms of Use:",
			contact: true,
		},
	];

	return (
		<main className="relative">
			{/* DYNAMIC BACKGROUND SYSTEM */}
			<div className="fixed inset-0 pointer-events-none z-0">
				{/* TECHNICAL GRID */}
				<div 
					className="absolute inset-0 opacity-[0.03]" 
					style={{ backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
				/>
				{/* NOISE */}
				<div
					className="absolute inset-0 opacity-[0.03]"
					style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
				/>
			</div>

			{/* HERO SECTION */}
			<section className="relative pt-44 pb-32 overflow-hidden border-b border-slate-100 bg-white">
				{/* Abstract SVG Motif */}
				<div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-1/2 h-full opacity-[0.03] pointer-events-none">
					<svg className="w-full h-full text-slate-950 stroke-current" viewBox="0 0 600 600" fill="none">
						<path d="M600 100 L400 100 L300 200 L300 400 L200 500 L0 500" strokeWidth="1" />
						<path d="M400 300 L200 300 L100 400 L100 600" strokeWidth="1" />
					</svg>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<div className="flex flex-col gap-4 mb-8">
							<span className="inline-flex items-center gap-3 bg-slate-950 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 w-fit">
								<span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
								{isFr ? "CADRE LÉGAL & CONDITIONS" : "LEGAL FRAMEWORK & TERMS"}
							</span>
							<h1 className="text-6xl lg:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-slate-950">
								{isFr ? "CONDITIONS" : "TERMS OF"} <br />
								<span className="text-slate-400">{isFr ? "D'UTILISATION" : "USE"}</span>
							</h1>
						</div>
						
						<div className="flex flex-wrap items-center gap-8 text-sm font-medium text-slate-500 uppercase tracking-widest border-t border-slate-100 pt-8 mt-8">
							<div className="flex items-center gap-2">
								<span className="material-symbols-outlined text-[18px]">balance</span>
								{isFr ? "DROIT QUÉBÉCOIS" : "QUEBEC LAW"}
							</div>
							<div>
								{isFr ? "DERNIÈRE MISE À JOUR : 13 AVRIL 2026" : "LAST UPDATED: APRIL 13, 2026"}
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* CONTENT GRID */}
			<section className="relative py-32 bg-white/50 backdrop-blur-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
						{/* LEFT SIDEBAR - NAV */}
						<aside className="lg:col-span-3 hidden lg:block sticky top-32 h-fit">
							<nav className="space-y-4">
								{sections.map((item) => (
									<a 
										key={item.id}
										href={`#${item.id}`}
										className="block text-[10px] font-black tracking-[0.2em] uppercase text-slate-400 hover:text-slate-950 transition-colors border-l-2 border-transparent hover:border-slate-950 pl-4"
									>
										{item.title}
									</a>
								))}
							</nav>
						</aside>

						{/* MAIN CONTENT */}
						<div className="lg:col-span-9 space-y-24">
							{sections.map((section, idx) => (
								<motion.div 
									key={section.id}
									id={section.id}
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									className="space-y-8"
								>
									<span className="inline-block bg-slate-950 text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1">
										{(idx + 1).toString().padStart(2, '0')}
									</span>
									<h2 className="text-3xl font-display font-black tracking-tight uppercase text-slate-950">
										{section.title}
									</h2>

									{section.list ? (
										<div className="space-y-6">
											<p className="text-slate-500 text-lg font-light leading-relaxed tracking-tight max-w-3xl italic">
												{section.intro}
											</p>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												{section.list.map((item, i) => (
													<div key={i} className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 group hover:border-slate-950 transition-colors">
														<span className="material-symbols-outlined text-slate-300 group-hover:text-slate-950 transition-colors">check_circle</span>
														<span className="text-xs font-bold uppercase tracking-tight text-slate-600">{item}</span>
													</div>
												))}
											</div>
										</div>
									) : section.contact ? (
										<div className="space-y-8">
											<p className="text-slate-500 text-lg font-light leading-relaxed tracking-tight max-w-3xl">
												{section.body}
											</p>
											<div className="bg-slate-950 text-white p-10 lg:p-16 relative overflow-hidden">
												<div className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 animate-pulse" />
												<div className="absolute right-[-5%] top-[-10%] text-[10rem] font-black text-white/2 select-none uppercase tracking-tighter">
													LEGAL
												</div>
												<div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-12">
													<div className="space-y-6">
														<span className="inline-block bg-blue-500 text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1">STIGMA LEGAL HUB</span>
														<div>
															<h3 className="text-4xl font-display font-black tracking-tight uppercase mb-2">Stigma Technologies</h3>
															<p className="text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase">SERVICES JURIDIQUES ET CONFORMITÉ</p>
														</div>
														<div className="space-y-4 pt-4 border-t border-white/10">
															<div className="flex items-center gap-4 text-sm text-slate-400">
																<span className="material-symbols-outlined text-[18px]">mail</span>
																<a href="mailto:legal@stigmatech.ca" className="hover:text-white transition-colors">legal@stigmatech.ca</a>
															</div>
															<div className="flex items-center gap-4 text-sm text-slate-400">
																<span className="material-symbols-outlined text-[18px]">location_on</span>
																6205, Boul des Grandes-Prairies, QC, H1P1A5
															</div>
															<div className="flex items-center gap-4 text-sm text-slate-400">
																<span className="material-symbols-outlined text-[18px]">call</span>
																<a href="tel:+18555521005" className="hover:text-white transition-colors">+1 855-552-1005</a>
															</div>
														</div>
													</div>
													<div className="bg-white/5 border border-white/10 p-8 backdrop-blur-xl md:w-80">
														<span className="text-[8px] font-black tracking-[0.2em] text-slate-500 uppercase block mb-4 italic">OFFICIAL DOCUMENTATION</span>
														<p className="text-xs text-slate-300 leading-relaxed font-light mb-6 uppercase tracking-wider">
															{isFr 
																? "Ces conditions régissent votre utilisation de notre écosystème technologique."
																: "These terms govern your use of our technological ecosystem."}
														</p>
														<div className="flex items-center gap-2">
															<div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
															<span className="text-[9px] font-black tracking-widest text-white uppercase">{isFr ? "VALIDE" : "VALID"}</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									) : (
										<div className="space-y-6">
											<p className="text-slate-500 text-lg font-light leading-relaxed tracking-tight max-w-3xl">
												{section.body}
											</p>
											{section.link && (
												<div className="pt-4">
													<Link
														href={section.link.href}
														className="inline-flex items-center gap-4 text-slate-950 hover:text-blue-600 transition-colors"
													>
														<span className="text-[10px] font-black tracking-[0.2em] uppercase">{section.link.text}</span>
														<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
													</Link>
												</div>
											)}
										</div>
									)}
									{idx < sections.length - 1 && <div className="pt-16 border-b border-slate-100" />}
								</motion.div>
							))}

							{/* Footer Actions */}
							<div className="pt-16 flex flex-wrap gap-8 items-center border-t border-slate-950/10">
								<Link href={`/${lang}/privacy`} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-950 transition-colors">
									{isFr ? "Politique de Confidentialité" : "Privacy Policy"}
								</Link>
								<Link href={`/${lang}/cookie-policy`} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-950 transition-colors">
									{isFr ? "Politique de Cookies" : "Cookie Policy"}
								</Link>
								<Link href={`/${lang}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-950 flex items-center gap-2">
									<span className="material-symbols-outlined text-[18px]">west</span>
									{isFr ? "Retour à l'accueil" : "Back to Home"}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
