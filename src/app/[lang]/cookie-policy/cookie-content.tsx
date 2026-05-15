"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ManageConsentButton } from "@/components/consent-manager";
import { Locale } from "@/i18n-config";

interface CookieContentProps {
	lang: Locale;
	dictionary: any;
}

export function CookieContent({ lang, dictionary }: CookieContentProps) {
	const isFr = lang === "fr";

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
			<section className="relative pt-44 pb-32 overflow-hidden border-b border-slate-100">
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
								{isFr ? "TRANSPARENCE & ANALYTIQUE" : "TRANSPARENCY & ANALYTICS"}
							</span>
							<h1 className="text-6xl lg:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-slate-950">
								{isFr ? "POLITIQUE DE" : "COOKIE"} <br />
								<span className="text-slate-400">{isFr ? "COOKIES" : "POLICY"}</span>
							</h1>
						</div>
						
						<div className="flex flex-wrap items-center gap-8 text-sm font-medium text-slate-500 uppercase tracking-widest border-t border-slate-100 pt-8 mt-8">
							<div className="flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-blue-500" />
								{isFr ? "GESTION SÉCURISÉE" : "SECURE MANAGEMENT"}
							</div>
							<div>
								{isFr ? "DERNIÈRE MISE À JOUR : 13 AVRIL 2026" : "LAST UPDATED: APRIL 13, 2026"}
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* CONTENT GRID */}
			<section className="relative py-32">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
						{/* LEFT SIDEBAR - NAV */}
						<aside className="lg:col-span-3 hidden lg:block sticky top-32 h-fit">
							<nav className="space-y-4">
								{[
									{ id: "intro", label: isFr ? "1. Qu'est-ce qu'un cookie ?" : "1. What is a cookie?" },
									{ id: "consentement", label: isFr ? "2. Votre consentement" : "2. Your consent" },
									{ id: "categories", label: isFr ? "3. Catégories" : "3. Categories" },
									{ id: "droits", label: isFr ? "4. Vos droits" : "4. Your rights" },
									{ id: "transferts", label: isFr ? "5. Transferts" : "5. Transfers" },
									{ id: "gestion", label: isFr ? "6. Gestion" : "6. Management" },
									{ id: "contact", label: isFr ? "7. Contact" : "7. Contact" },
								].map((item) => (
									<a 
										key={item.id}
										href={`#${item.id}`}
										className="block text-[10px] font-black tracking-[0.2em] uppercase text-slate-400 hover:text-slate-950 transition-colors border-l-2 border-transparent hover:border-slate-950 pl-4"
									>
										{item.label}
									</a>
								))}
							</nav>
						</aside>

						{/* MAIN CONTENT */}
						<div className="lg:col-span-9 space-y-24">
							
							{/* 1. What is a cookie */}
							<motion.div 
								id="intro"
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="space-y-6"
							>
								<span className="inline-block bg-slate-950 text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1">01</span>
								<h2 className="text-3xl font-display font-black tracking-tight uppercase text-slate-950">
									{isFr ? "1. Qu'est-ce qu'un cookie ?" : "1. What is a cookie?"}
								</h2>
								<p className="text-slate-500 text-lg font-light leading-relaxed tracking-tight max-w-3xl">
									{isFr
										? "Un cookie est un petit fichier texte déposé sur votre appareil. Conformément aux standards de protection des données, tout dépôt de cookie non essentiel nécessite votre consentement préalable, libre, éclairé et spécifique."
										: "A cookie is a small text file placed on your device. In accordance with data protection standards, any placement of non-essential cookies requires your prior, free, informed and specific consent."}
								</p>
							</motion.div>

							{/* 2. Consent */}
							<motion.div 
								id="consentement"
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="relative bg-slate-50 p-10 lg:p-16 border border-slate-100 overflow-hidden"
							>
								<div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl" />
								<div className="relative z-10 space-y-8">
									<span className="inline-block bg-slate-950 text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1">02</span>
									<h2 className="text-3xl font-display font-black tracking-tight uppercase text-slate-950">
										{isFr ? "2. Votre Consentement" : "2. Your Consent"}
									</h2>
									<div className="space-y-6">
										<p className="text-slate-500 text-lg font-light leading-relaxed tracking-tight max-w-2xl">
											{isFr
												? "Conformément aux réglementations internationales (RGPD/Loi 25), nous vous demandons votre consentement explicite avant de déposer tout cookie non strictement nécessaire."
												: "In accordance with international regulations (GDPR/Law 25), we ask for your explicit consent before placing any cookie not strictly necessary."}
										</p>
										<ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{(isFr
												? ["Libre et consenti", "Éclairé et transparent", "Spécifique par but", "Réversible à tout moment"]
												: ["Free and consented", "Informed and transparent", "Specific per purpose", "Reversible at any time"]
											).map((item, i) => (
												<li key={i} className="flex items-center gap-3 text-xs font-bold uppercase text-slate-400">
													<div className="w-1.5 h-1.5 bg-green-500 rounded-none shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
													{item}
												</li>
											))}
										</ul>
										<div className="pt-6 border-t border-slate-200 mt-6">
											<p className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest leading-relaxed">
												{isFr 
													? "Vous pouvez consulter, modifier ou retirer votre consentement à tout moment via notre centre de gestion :"
													: "You can view, modify, or withdraw your consent at any time via our management center:"}
											</p>
											<ManageConsentButton className="bg-slate-950 text-white rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black hover:bg-slate-800 shadow-2xl transition-all border-none">
												{isFr ? "GÉRER MES PRÉFÉRENCES" : "MANAGE MY PREFERENCES"}
											</ManageConsentButton>
										</div>
									</div>
								</div>
							</motion.div>

							{/* 3. Categories */}
							<motion.div 
								id="categories"
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="space-y-8"
							>
								<span className="inline-block bg-slate-950 text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1">03</span>
								<h2 className="text-3xl font-display font-black tracking-tight uppercase text-slate-950">
									{isFr ? "3. Catégories de cookies" : "3. Cookie Categories"}
								</h2>
								<div className="space-y-4">
									{[
										{
											t: isFr ? "Strictement nécessaires" : "Strictly necessary",
											s: isFr ? "SÉCURITÉ & NAV" : "SECURITY & NAV",
											d: isFr ? "Indispensables au fonctionnement du site. Ces cookies ne collectent aucune donnée à des fins marketing. Durée : session ou 12 mois." : "Essential for the website to function. These cookies do not collect personal data for marketing. Duration: session or 12 months."
										},
										{
											t: isFr ? "Analyse et performance" : "Analytics & Performance",
											s: isFr ? "POSTHOG & VERCEL" : "POSTHOG & VERCEL",
											d: isFr ? "Permettent de mesurer l'audience de manière sécurisée. Tiers : PostHog Inc. et Vercel Inc. (USA). Durée : 12 mois." : "Used to measure audience securely. Third parties: PostHog Inc. and Vercel Inc. (USA). Duration: 12 months."
										},
										{
											t: isFr ? "Fonctionnalité" : "Functionality",
											s: isFr ? "CAL.COM & PRÉFÉRENCES" : "CAL.COM & PREFERENCES",
											d: isFr ? "Mémorisent vos choix pour personnaliser votre expérience. Tiers : Cal.com. Durée : 12 mois." : "Remember your choices to personalize your experience. Third party: Cal.com. Duration: 12 months."
										}
									].map((row, i) => (
										<div key={i} className="bg-white border border-slate-100 p-8 flex flex-col md:flex-row justify-between gap-6 hover:shadow-lg transition-shadow duration-500">
											<div className="space-y-3">
												<div className="flex items-center gap-3">
													<div className="w-px h-6 bg-blue-500" />
													<h3 className="font-bold text-slate-950 uppercase text-sm tracking-tight">{row.t}</h3>
												</div>
												<p className="text-xs text-slate-500 leading-relaxed font-light max-w-xl">{row.d}</p>
											</div>
											<div className="shrink-0">
												<span className="text-[9px] font-black tracking-[0.2em] bg-slate-100 px-4 py-2 text-slate-400">
													{row.s}
												</span>
											</div>
										</div>
									))}
								</div>
							</motion.div>

							{/* 5. Transferts Table */}
							<motion.div 
								id="transferts"
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="space-y-8"
							>
								<span className="inline-block bg-slate-950 text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1">05</span>
								<h2 className="text-3xl font-display font-black tracking-tight uppercase text-slate-950">
									{isFr ? "5. Transferts de données" : "5. Data Transfers"}
								</h2>
								<div className="overflow-x-auto border border-slate-100">
									<table className="w-full text-left text-xs uppercase tracking-tight">
										<thead>
											<tr className="bg-slate-50 border-b border-slate-100">
												<th className="px-6 py-4 font-black">{isFr ? "SERVICE" : "SERVICE"}</th>
												<th className="px-6 py-4 font-black">{isFr ? "PAYS" : "COUNTRY"}</th>
												<th className="px-6 py-4 font-black">{isFr ? "FINALITÉ" : "PURPOSE"}</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-slate-100">
											{[
												{ s: "PostHog", c: isFr ? "États-Unis" : "United States", p: isFr ? "Analyse comportementale" : "Behavioral analytics" },
												{ s: "Vercel Analytics", c: isFr ? "États-Unis" : "United States", p: isFr ? "Performance Web" : "Web Performance" },
												{ s: "Cal.com", c: isFr ? "États-Unis" : "United States", p: isFr ? "Prise de rendez-vous" : "Appointment booking" },
												{ s: "Vercel hosting", c: isFr ? "États-Unis" : "United States", p: isFr ? "Hébergement" : "Hosting" },
											].map((row, i) => (
												<tr key={i} className="hover:bg-slate-50/50 transition-colors">
													<td className="px-6 py-4 font-bold text-slate-950">{row.s}</td>
													<td className="px-6 py-4 text-slate-500">{row.c}</td>
													<td className="px-6 py-4 text-slate-500">{row.p}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</motion.div>

							{/* 7. Contact PRPI */}
							<motion.div 
								id="contact"
								initial={{ opacity: 0, scale: 0.98 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								className="bg-slate-950 text-white p-10 lg:p-16 relative overflow-hidden"
							>
								<div className="absolute left-0 bottom-0 w-full h-1 bg-green-500 animate-pulse" />
								<div className="absolute right-[-5%] top-[-10%] text-[10rem] font-black text-white/2 select-none uppercase tracking-tighter">
									DATA
								</div>
								<div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-12">
									<div className="space-y-6">
										<span className="inline-block bg-blue-500 text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1">POINT DE CONTACT</span>
										<div>
											<h3 className="text-4xl font-display font-black tracking-tight uppercase mb-2">Service Conformité</h3>
											<p className="text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase">STIGMA TECHNOLOGIES</p>
										</div>
										<div className="space-y-4 pt-4 border-t border-white/10">
											<div className="flex items-center gap-4 text-sm text-slate-400">
												<span className="material-symbols-outlined text-[18px]">mail</span>
												<a href="mailto:privacy@stigmatech.ca" className="hover:text-white transition-colors">privacy@stigmatech.ca</a>
											</div>
											<div className="flex items-center gap-4 text-sm text-slate-400">
												<span className="material-symbols-outlined text-[18px]">location_on</span>
												6205, Boul des Grandes-Prairies, QC
											</div>
										</div>
									</div>
									<div className="bg-white/5 border border-white/10 p-8 backdrop-blur-xl md:w-80">
										<span className="text-[8px] font-black tracking-[0.2em] text-slate-500 uppercase block mb-4 italic">INTERNATIONAL PRIVACY STANDARDS</span>
										<p className="text-xs text-slate-300 leading-relaxed font-light mb-6">
											{isFr 
												? "Nos pratiques sont auditées pour garantir le respect de la Loi 25 et du RGPD."
												: "Our practices are audited to ensure compliance with Law 25 and GDPR."}
										</p>
										<div className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
											<span className="text-[9px] font-black tracking-widest text-white uppercase">{isFr ? "ACTIF : MIP FRAMEWORK" : "ACTIVE : MIP FRAMEWORK"}</span>
										</div>
									</div>
								</div>
							</motion.div>

						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
