import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Linkedin, Facebook, Youtube, Twitter } from "lucide-react";

import { Locale } from "@/i18n-config";

export function Footer({ lang, dictionary }: { lang: Locale; dictionary: any }) {
    return (
        <footer className="bg-background-dark pt-24 pb-8 relative overflow-hidden">
            {/* Subtle background glow effect - Dark Neutral */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/5 blur-[120px] rounded-none rotate-12 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20 font-sans">

                    {/* Branding and Contact */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Logo with invert filter for Dark Mode */}
                        <Link href={`/${lang}`}>
                            <img src="/logoStigmaTechnologies188x64.png" alt="Stigma Technologies Logo" className="h-10 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" />
                        </Link>

                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            {dictionary.common.footer.description}
                        </p>

                        <div className="space-y-4 pt-4 border-t border-white/10">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 shrink-0">
                                    <span className="material-symbols-outlined text-gray-400 text-[20px]">location_on</span>
                                </div>
                                <p className="text-sm text-gray-300">
                                    6205, Boul des Grandes-Prairies<br />
                                    St-Léonard, Qc, H1P1A5
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="shrink-0">
                                    <span className="material-symbols-outlined text-gray-400 text-[20px]">call</span>
                                </div>
                                <a href="tel:+18449784462" className="text-sm text-gray-300 font-medium hover:text-white transition-colors">+1 (844) 978-4462</a>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="shrink-0">
                                    <span className="material-symbols-outlined text-gray-400 text-[20px]">mail</span>
                                </div>
                                <a href="mailto:contact@stigmatech.ca" className="text-sm text-gray-300 font-medium hover:text-white transition-colors">contact@stigmatech.ca</a>
                            </div>
                        </div>
                    </div>

                    {/* Solutions */}
                    <div className="lg:col-span-2 lg:col-start-5">
                        <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-8">{dictionary.common.footer.solutions}</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href={`/${lang}/solutions/managed-it-services`} className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[14px] mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:block transition-all text-gray-400">
                                        arrow_right_alt</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        {dictionary.services.managedIt.title}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/solutions/managed-cybersecurity`} className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[14px] mr-2 opacity-0 -ml-5 group-hover:opacity-100 transition-all text-gray-400">arrow_right_alt</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        {dictionary.services.managedCybersecurity.title}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/solutions/ai-machine-learning`} className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[14px] mr-2 opacity-0 -ml-5 group-hover:opacity-100 transition-all text-gray-400">arrow_right_alt</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        {dictionary.services.aiMachineLearning.title}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/solutions/grc`} className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[14px] mr-2 opacity-0 -ml-5 group-hover:opacity-100 transition-all text-gray-400">arrow_right_alt</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        {dictionary.services.grc.title}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/solutions/cloud-computing`} className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[14px] mr-2 opacity-0 -ml-5 group-hover:opacity-100 transition-all text-gray-400">arrow_right_alt</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        {dictionary.services.cloudComputing.title}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/solutions/digital-transformation`} className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[14px] mr-2 opacity-0 -ml-5 group-hover:opacity-100 transition-all text-gray-400">arrow_right_alt</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        {dictionary.services.digitalTransformation.title}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/solutions/industries`} className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[14px] mr-2 opacity-0 -ml-5 group-hover:opacity-100 transition-all text-gray-400">arrow_right_alt</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        {dictionary.common.nav.industries || "Industries"}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Trainings */}
                    <div className="lg:col-span-2">
                        <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-8">{dictionary.common.footer.training}</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href={`/${lang}/products/ai-training/ia-decouverte`} className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[14px] mr-2 opacity-0 -ml-5 group-hover:opacity-100 transition-all text-gray-400">arrow_right_alt</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">IA Découverte</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/products/ai-training/ia-booster`} className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[14px] mr-2 opacity-0 -ml-5 group-hover:opacity-100 transition-all text-gray-400">arrow_right_alt</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">IA Booster</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/products/ai-training/microsoft-copilot`} className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[14px] mr-2 opacity-0 -ml-5 group-hover:opacity-100 transition-all text-gray-400">arrow_right_alt</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">Microsoft Copilot</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/products/ai-training/chatgpt-expert`} className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[14px] mr-2 opacity-0 -ml-5 group-hover:opacity-100 transition-all text-gray-400">arrow_right_alt</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">ChatGPT Expert</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/products/ai-training`} className="group flex items-center text-sm font-bold text-gray-400 hover:text-white transition-colors pt-2">
                                    <span className="material-symbols-outlined text-[14px] mr-2 opacity-0 -ml-5 group-hover:opacity-100 transition-all">arrow_right_alt</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">Catalogue complet</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="lg:col-span-2">
                        <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-8">{dictionary.common.footer.company}</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href={`/${lang}/about`} className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[14px] mr-2 opacity-0 -ml-5 group-hover:opacity-100 transition-all text-gray-400">arrow_right_alt</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">{dictionary.common.nav.about}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/case-studies`} className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[14px] mr-2 opacity-0 -ml-5 group-hover:opacity-100 transition-all text-gray-400">arrow_right_alt</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">{dictionary.common.nav.caseStudies}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/events`} className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[14px] mr-2 opacity-0 -ml-5 group-hover:opacity-100 transition-all text-gray-400">arrow_right_alt</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">{dictionary.common.nav.events || (lang === "fr" ? "Événements" : "Events")}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/blog`} className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[14px] mr-2 opacity-0 -ml-5 group-hover:opacity-100 transition-all text-gray-400">arrow_right_alt</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">{dictionary.common.nav.blog}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/contact`} className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[14px] mr-2 opacity-0 -ml-5 group-hover:opacity-100 transition-all text-gray-400">arrow_right_alt</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300 font-bold text-white">{dictionary.common.nav.contact}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter and Social */}
                    <div className="lg:col-span-3">
                        <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-8">{dictionary.common.footer.stayConnected}</h4>

                        <p className="text-sm text-gray-400 mb-4">
                            {dictionary.common.footer.newsletterText}
                        </p>

                        <form className="mb-10 relative">
                            <input
                                type="email"
                                placeholder={dictionary.common.footer.emailPlaceholder || "Email"}
                                className="w-full bg-white/5 border border-white/10 rounded-none py-3 pl-5 pr-12 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all font-sans"
                                required
                            />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-surface-dark rounded-none flex items-center justify-center hover:bg-surface-dark/80 transition-colors">
                                <span className="material-symbols-outlined text-white text-[16px]">arrow_forward</span>
                            </button>
                        </form>

                        <div className="flex items-center space-x-4">
                            <a href="https://www.linkedin.com/company/stigmatech/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all transform hover:-translate-y-1" aria-label="LinkedIn">
                                <Linkedin size={18} />
                            </a>
                            <a href="https://x.com/StigmaTechno" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all transform hover:-translate-y-1" aria-label="X (Twitter)">
                                <Twitter size={18} />
                            </a>
                            <a href="https://www.facebook.com/StigmaTechnologie" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all transform hover:-translate-y-1" aria-label="Facebook">
                                <Facebook size={18} />
                            </a>
                            <a href="https://www.youtube.com/@Stigmatech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all transform hover:-translate-y-1" aria-label="YouTube">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500 font-medium">
                        © {new Date().getFullYear()} Stigma Technologies. {dictionary.common.footer.rights}
                    </p>
                    <div className="flex items-center space-x-6 text-xs text-gray-500 font-medium">
                        <Link href={`/${lang}/privacy`} className="hover:text-white transition-colors">{dictionary.common.footer.privacy}</Link>
                        <Link href={`/${lang}/terms-of-use`} className="hover:text-white transition-colors">{dictionary.common.footer.terms}</Link>
                        <Link href={`/${lang}/cookie-policy`} className="hover:text-white transition-colors">{dictionary.common.footer.cookies}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
