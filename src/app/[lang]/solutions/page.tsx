import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n-config';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ContactForm } from '@/components/contact-form';
import { BookingSection } from '@/components/booking-section';
import { getDictionary } from '@/get-dictionary';

export const metadata: Metadata = {
    title: 'Solutions | Stigma Technologies',
    description: 'Explore our comprehensive suite of enterprise IT and cybersecurity solutions.',
};

const solutionsData = [
    {
        id: 'managed-it-services',
        title: { en: 'Managed IT Services', fr: 'Services Informatiques Gérés' },
        description: { en: 'End-to-end infrastructure management and support for modern enterprises.', fr: 'Gestion et support d\'infrastructure de bout en bout pour les entreprises modernes.' },
        href: '/solutions/managed-it-services',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
        category: 'Infrastructure',
    },
    {
        id: 'managed-cybersecurity',
        title: { en: 'Advanced Cybersecurity', fr: 'Cybersécurité Avancée' },
        description: { en: 'Military-grade protection against evolving digital threats and ransomware.', fr: 'Protection de niveau militaire contre les menaces numériques et les ransomwares.' },
        href: '/solutions/managed-cybersecurity',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
        category: 'Security',
    },
    {
        id: 'cloud-computing',
        title: { en: 'Cloud Computing & Migration', fr: 'Cloud Computing & Migration' },
        description: { en: 'Secure, scalable cloud architectures tailored to your business needs.', fr: 'Architectures cloud sécurisées et évolutives adaptées aux besoins de votre entreprise.' },
        href: '/solutions/cloud-computing',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80',
        category: 'Cloud',
    },
    {
        id: 'ai-machine-learning',
        title: { en: 'AI & Machine Learning', fr: 'Intelligence Artificielle & ML' },
        description: { en: 'Drive innovation and automate complex workflows with data-driven AI.', fr: 'Stimulez l\'innovation et automatisez les flux de travail complexes avec l\'IA.' },
        href: '/solutions/ai-machine-learning',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80',
        category: 'Intelligence',
    },
    {
        id: 'digital-transformation',
        title: { en: 'Digital Transformation', fr: 'Transformation Numérique' },
        description: { en: 'Modernize legacy systems and accelerate your digital journey.', fr: 'Modernisez les systèmes obsolètes et accélérez votre parcours numérique.' },
        href: '/solutions/digital-transformation',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
        category: 'Strategy',
    },
    {
        id: 'grc',
        title: { en: 'Governance, Risk & Compliance', fr: 'Gouvernance, Risque (GRC)' },
        description: { en: 'Ensure regulatory alignment and manage corporate risk effectively.', fr: 'Assurez l\'alignement réglementaire et gérez efficacement les risques.' },
        href: '/solutions/grc',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
        category: 'Risk Management',
    },
    {
        id: 'managed-ai-agents',
        title: { en: 'Managed AI Agents', fr: 'Agents IA Gérés' },
        description: { en: 'Deploy autonomous intelligence customized for your operations.', fr: 'Déployez une intelligence autonome personnalisée pour vos opérations.' },
        href: '/solutions/managed-ai-agents',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
        category: 'Automation',
    }
];

export default async function SolutionsIndexPage(props: { params: Promise<{ lang: string }> }) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const isFr = lang === 'fr';
    const dictionary = await getDictionary(lang);

    return (
        <div className="min-h-screen selection:bg-[#0b0c10] selection:text-white bg-white ">
            <Navbar lang={lang} dictionary={dictionary} />

            <main>
                {/* Hero Section - Premium Compact (Sync) */}
                <section className="bg-[#0f172a] text-white pt-14 lg:pt-16 pb-24 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 background-grid pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-4xl">
                            <span className="inline-block border border-blue-500/50 text-blue-400 text-[11px] font-bold tracking-[0.2em] uppercase px-3 py-1 mb-8 rounded-none bg-blue-500/10 backdrop-blur-sm">
                                {isFr ? "Catalogue de Solutions" : "Solutions Catalog"}
                            </span>
                            <h1 className="text-6xl lg:text-8xl font-display font-black tracking-tighter mb-10 text-white leading-none uppercase">
                                {isFr ? "Nos Solutions" : "Our Solutions"} <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-600 italic font-light">Entreprise</span>
                            </h1>
                            <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-2xl">
                                {isFr 
                                    ? "Découvrez l'ensemble complet de nos expertises technologiques. De la gestion d'infrastructure réseau à la cybersécurité avancée, nous propulsons votre transformation numérique." 
                                    : "Explore our comprehensive suite of technological expertise. From network infrastructure management to advanced cybersecurity, we drive your digital transformation."}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Solutions Grid */}
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {solutionsData.map((solution) => (
                                <Link 
                                    href={`/${lang}${solution.href}`} 
                                    key={solution.id}
                                    className="group flex flex-col h-full border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-2xl transition-all duration-500"
                                >
                                    <div className="relative overflow-hidden aspect-4/3 bg-background-dark">
                                        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                            <span className="bg-surface-dark/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white shadow-sm">
                                                {solution.category}
                                            </span>
                                        </div>
                                        <Image
                                            src={solution.image}
                                            alt={isFr ? solution.title.fr : solution.title.en}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                        />
                                    </div>
                                    <div className="p-8 grow flex flex-col">
                                        <h3 className="text-2xl font-bold font-display text-background-dark mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {isFr ? solution.title.fr : solution.title.en}
                                        </h3>
                                        <p className="text-background-dark/60 font-light text-sm line-clamp-3 leading-relaxed mb-6 grow">
                                            {isFr ? solution.description.fr : solution.description.en}
                                        </p>
                                        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-surface-dark mt-auto border-t border-gray-100 pt-6">
                                            <span className="text-blue-600 font-bold">{isFr ? "Découvrir l'expertise" : "Explore expertise"}</span>
                                            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform text-blue-600">
                                                arrow_forward
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <BookingSection lang={lang} dictionary={dictionary?.services?.booking || {}} />
                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
