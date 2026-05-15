"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ManageConsentButton } from "@/components/consent-manager";
import { Locale } from "@/i18n-config";

interface PrivacyContentProps {
	lang: Locale;
	dictionary: any;
}

export function PrivacyContent({ lang, dictionary }: PrivacyContentProps) {
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
								<span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
								{isFr ? "CADRE LÉGAL & CONFORMITÉ" : "LEGAL FRAMEWORK & COMPLIANCE"}
							</span>
							<h1 className="text-6xl lg:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-slate-950">
								{isFr ? "POLITIQUE DE" : "PRIVACY"} <br />
								<span className="text-slate-400">{isFr ? "CONFIDENTIALITÉ" : "POLICY"}</span>
							</h1>
						</div>
						
						<div className="flex flex-wrap items-center gap-8 text-sm font-medium text-slate-500 uppercase tracking-widest border-t border-slate-100 pt-8 mt-8">
							<div className="flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-green-500" />
								{isFr ? "CONFORME LOI 25" : "LAW 25 COMPLIANT"}
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
									{ id: "intro", label: isFr ? "1. Introduction" : "1. Introduction" },
									{ id: "collecte", label: isFr ? "2. Collecte" : "2. Collection" },
									{ id: "utilisation", label: isFr ? "3. Utilisation" : "3. Usage" },
									{ id: "consentement", label: isFr ? "4. Consentement" : "4. Consent" },
									{ id: "tiers", label: isFr ? "5. Tiers" : "5. Third Parties" },
									{ id: "securite", label: isFr ? "6. Sécurité" : "6. Security" },
									{ id: "droits", label: isFr ? "7. Vos Droits" : "7. Your Rights" },
									{ id: "contact", label: isFr ? "8. Contact RPRP" : "8. Contact PRPI" },
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
							
							{/* 1. Introduction */}
							<motion.div 
								id="intro"
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="space-y-6"
							>
								<span className="inline-block bg-slate-950 text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1">01</span>
								<h2 className="text-3xl font-display font-black tracking-tight uppercase text-slate-950">
									{isFr ? "1. Introduction" : "1. Introduction"}
								</h2>
								<p className="text-slate-500 text-lg font-light leading-relaxed tracking-tight max-w-3xl">
									{isFr
										? "La présente Politique de confidentialité décrit nos règles concernant la collecte, l'utilisation, la divulgation et la conservation de vos renseignements personnels. En utilisant nos services, notre site web (stigmatech.ca) ou en communiquant avec nous, vous acceptez les pratiques décrites dans cette Politique."
										: "This Privacy Policy describes our rules regarding the collection, use, disclosure, and retention of your personal information. By using our services, our website (stigmatech.ca), or by communicating with us, you agree to the practices described in this Policy."}
								</p>
							</motion.div>

							{/* 2. Collection */}
							<motion.div 
								id="collecte"
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="space-y-8"
							>
								<span className="inline-block bg-slate-950 text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1">02</span>
								<h2 className="text-3xl font-display font-black tracking-tight uppercase text-slate-950">
									{isFr ? "2. Renseignements collectés" : "2. Collected Information"}
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{[
										{ t: isFr ? "Identité" : "Identity", d: isFr ? "Nom, prénom" : "Full name" },
										{ t: isFr ? "Contact" : "Contact", d: isFr ? "Email, téléphone, adresse pro" : "Email, phone, biz address" },
										{ t: isFr ? "Professionnel" : "Professional", d: isFr ? "Entreprise, titre de poste" : "Company, job title" },
										{ t: isFr ? "Technique" : "Technical", d: isFr ? "IP, Cookies de navigation" : "IP, Tracking cookies" },
									].map((item, i) => (
										<div key={i} className="bg-slate-50 p-6 border border-slate-100 flex flex-col gap-2">
											<span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">{item.t}</span>
											<span className="text-sm font-bold text-slate-950">{item.d}</span>
										</div>
									))}
								</div>
							</motion.div>

							{/* 3. Utilisation */}
							<motion.div 
								id="utilisation"
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="space-y-8"
							>
								<span className="inline-block bg-slate-950 text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1">03</span>
								<h2 className="text-3xl font-display font-black tracking-tight uppercase text-slate-950">
									{isFr ? "3. Finalités de traitement" : "3. Purpose of Processing"}
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{(isFr
										? [
											"Fournir et améliorer nos services TI et de cybersécurité.",
											"Répondre à vos demandes de soumission ou d'information.",
											"Gérer nos relations d'affaires avec vous.",
											"Assurer la sécurité de notre site et prévenir la fraude.",
											"Conformité légale et réglementaire (Loi 25).",
											"Envoi d'informations marketing (si vous y avez consenti)."
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
										<div key={i} className="flex items-center gap-3 p-4 bg-white border border-slate-100">
											<span className="material-symbols-outlined text-slate-300">verified</span>
											<span className="text-xs font-bold uppercase tracking-tight text-slate-600">{item}</span>
										</div>
									))}
								</div>
							</motion.div>

							{/* 4. Consentement */}
							<motion.div 
								id="consentement"
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="relative bg-slate-50 p-10 lg:p-16 border border-slate-100 overflow-hidden"
							>
								<div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl" />
								<div className="relative z-10 space-y-8">
									<span className="inline-block bg-slate-950 text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1">04</span>
									<h2 className="text-3xl font-display font-black tracking-tight uppercase text-slate-950">
										{isFr ? "4. Gestion du Consentement" : "4. Consent Management"}
									</h2>
									<p className="text-slate-500 text-lg font-light leading-relaxed tracking-tight max-w-2xl">
										{isFr
											? "Nous obtenons votre consentement avant de collecter vos renseignements personnels. Conformément à la Loi 25, vous gardez le contrôle total sur vos préférences de confidentialité."
											: "We obtain your consent before collecting your personal information. In accordance with Law 25, you maintain total control over your privacy preferences."}
									</p>
									<div className="pt-4">
										<ManageConsentButton className="bg-slate-950 text-white rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black hover:bg-blue-600 shadow-2xl transition-all border-none">
											{isFr ? "OUVRIR LE CENTRE DE PRÉFÉRENCES" : "OPEN PREFERENCE CENTER"}
										</ManageConsentButton>
									</div>
								</div>
							</motion.div>

							{/* 5. Tiers */}
							<motion.div 
								id="tiers"
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="space-y-8"
							>
								<span className="inline-block bg-slate-950 text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1">05</span>
								<h2 className="text-3xl font-display font-black tracking-tight uppercase text-slate-950">
									{isFr ? "5. Communication à des tiers" : "5. Third-party disclosure"}
								</h2>
								<p className="text-slate-500 text-lg font-light leading-relaxed tracking-tight max-w-3xl">
									{isFr
										? "Nous ne vendons ni n'échangeons vos renseignements personnels. Nous pouvons les communiquer à des partenaires technologiques de confiance (ex. : PostHog, Vercel) sous contrat strict de confidentialité."
										: "We do not sell or trade your personal information. We may disclose it to trusted technological partners (e.g., PostHog, Vercel) under strict confidentiality agreements."}
								</p>
							</motion.div>

							{/* 6. Sécurité */}
							<motion.div 
								id="securite"
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="space-y-8"
							>
								<span className="inline-block bg-slate-950 text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1">06</span>
								<h2 className="text-3xl font-display font-black tracking-tight uppercase text-slate-950">
									{isFr ? "6. Conservation et Sécurité" : "6. Retention & Security"}
								</h2>
								<ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{(isFr
										? ["Chiffrement de bout en bout", "Accès restreint au personnel", "Audits réguliers", "Souveraineté des données"]
										: ["End-to-end encryption", "Restricted personnel access", "Regular audits", "Data sovereignty"]
									).map((item, i) => (
										<li key={i} className="flex items-center gap-3 text-xs font-bold uppercase text-slate-400">
											<span className="w-1.5 h-1.5 bg-slate-950 rounded-none" />
											{item}
										</li>
									))}
								</ul>
							</motion.div>

							{/* 7. Vos Droits */}
							<motion.div 
								id="droits"
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="space-y-10"
							>
								<span className="inline-block bg-slate-950 text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1">07</span>
								<h2 className="text-3xl font-display font-black tracking-tight uppercase text-slate-950">
									{isFr ? "7. Vos droits (Loi 25)" : "7. Your Rights (Law 25)"}
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-slate-500">
									{(isFr 
										? ["Droit d'accès", "Droit de rectification", "Droit à l'oubli", "Portabilité", "Retrait du consentement"]
										: ["Right to Access", "Right to Correct", "Right to Deletion", "Portability", "Withdrawal"]
									).map((right, i) => (
										<div key={i} className="flex items-start gap-4 group">
											<span className="material-symbols-outlined text-slate-300 group-hover:text-blue-500 transition-colors">verified</span>
											<span className="text-sm font-bold uppercase tracking-tight text-slate-950">{right}</span>
										</div>
									))}
								</div>
								<div className="pt-4">
									<Link
										href={`/${lang}/contact`}
										className="inline-flex items-center gap-4 text-slate-950 hover:text-blue-600 transition-colors"
									>
										<span className="text-[10px] font-black tracking-[0.2em] uppercase">{isFr ? "Soumettre une demande relative à mes droits" : "Submit a request regarding my rights"}</span>
										<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
									</Link>
								</div>
							</motion.div>

							{/* 8. RPRP Digital ID Card */}
							<motion.div 
								id="contact"
								initial={{ opacity: 0, scale: 0.98 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								className="bg-slate-950 text-white p-10 lg:p-16 relative overflow-hidden"
							>
								<div className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 animate-pulse" />
								<div className="absolute right-[-5%] top-[-10%] text-[10rem] font-black text-white/2 select-none uppercase tracking-tighter">
									PRPI
								</div>
								<div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-12">
									<div className="space-y-6">
										<span className="inline-block bg-blue-500 text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1">RESPONSABLE RPRP</span>
										<div>
											<h3 className="text-4xl font-display font-black tracking-tight uppercase mb-2">Nelly Kake</h3>
											<p className="text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase">DIRECTRICE CONFORMITÉ ET SÉCURITÉ</p>
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
										<span className="text-[8px] font-black tracking-[0.2em] text-slate-500 uppercase block mb-4 italic">VERIFIED BY STIGMA SECURITY FRAMEWORK</span>
										<p className="text-xs text-slate-300 leading-relaxed font-light mb-6">
											{isFr 
												? "Contactez notre responsable pour toute demande relative à la protection de vos renseignements personnels."
												: "Contact our officer for any requests regarding the protection of your personal information."}
										</p>
										<div className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
											<span className="text-[9px] font-black tracking-widest text-white uppercase">{isFr ? "OPÉRATIONNEL" : "OPERATIONAL"}</span>
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
