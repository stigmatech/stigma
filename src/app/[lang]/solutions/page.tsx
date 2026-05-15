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
    <div className="min-h-screen selection:bg-slate-950 selection:text-white bg-white">
      <Navbar lang={lang} dictionary={dictionary.common.nav} />

      <main>
        {/* Hero Section - Elite Protocol */}
        <section className="bg-slate-950 text-white pt-32 pb-24 relative overflow-hidden">
          {/* ELITE ANIMATION: SCAN LINE */}
          <div className="absolute top-0 left-0 w-full h-px bg-white/10 animate-[scan_4s_linear_infinite] shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20"></div>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes scan {
              0% { transform: translateY(-100%); opacity: 0; }
              5% { opacity: 1; }
              95% { opacity: 1; }
              100% { transform: translateY(100vh); opacity: 0; }
            }
          `}} />

          {/* NOISE OVERLAY */}
          <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.05]" 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <span className="inline-block border border-white/10 text-white/40 text-[10px] font-black tracking-[0.4em] uppercase px-5 py-2 mb-8 bg-white/5 backdrop-blur-3xl">
                {isFr ? "Catalogue de Solutions" : "Solutions Catalog"}
              </span>
              <h1 className="text-6xl lg:text-9xl font-display font-black tracking-tighter mb-10 text-white leading-[0.85] uppercase">
                {isFr ? "Nos Solutions" : "Our Solutions"} <br/>
                <span className="text-slate-500 italic font-light lowercase">Entreprise</span>
              </h1>
              <p className="text-xl text-slate-400 font-light leading-relaxed max-w-2xl tracking-tight">
                {isFr 
                  ? "Découvrez l'ensemble complet de nos expertises technologiques. De la gestion d'infrastructure réseau à la cybersécurité avancée, nous propulsons votre transformation numérique." 
                  : "Explore our comprehensive suite of technological expertise. From network infrastructure management to advanced cybersecurity, we drive your digital transformation."}
              </p>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 overflow-hidden shadow-2xl">
              {solutionsData.map((solution) => (
                <Link 
                  href={`/${lang}${solution.href}`} 
                  key={solution.id}
                  className="group flex flex-col h-full bg-white hover:bg-slate-950 transition-all duration-700 relative overflow-hidden p-12"
                >
                  <div className="relative mb-8 aspect-4/3 overflow-hidden">
                    <Image
                      src={solution.image}
                      alt={isFr ? solution.title.fr : solution.title.en}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transform group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-slate-950/90 backdrop-blur-md px-3 py-1 text-[9px] font-black tracking-[0.2em] uppercase text-white">
                        {solution.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grow flex flex-col">
                    <h3 className="text-2xl font-black font-display text-slate-950 group-hover:text-white mb-4 uppercase tracking-tight transition-colors duration-500">
                      {isFr ? solution.title.fr : solution.title.en}
                    </h3>
                    <p className="text-slate-500 group-hover:text-slate-400 font-light text-sm leading-relaxed mb-8 grow tracking-tight transition-colors duration-500">
                      {isFr ? solution.description.fr : solution.description.en}
                    </p>
                    
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white mt-auto pt-6 border-t border-slate-100 group-hover:border-white/10 transition-all duration-500">
                      <span>{isFr ? "Découvrir l'expertise" : "Explore expertise"}</span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <BookingSection lang={lang} dictionary={dictionary.services.booking} />
        <ContactForm lang={lang} dictionary={dictionary} variant="elite" />
      </main>

      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
