import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n-config";
import Link from "next/link";

export function News({ lang, dictionary }: { lang: Locale, dictionary: any }) {
    const dict = dictionary;
    const news = [
        {
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
            date: lang === 'en' ? "APRIL 15, 2024" : "15 AVRIL 2024",
            tag: lang === 'en' ? "CYBERSECURITY" : "CYBERSÉCURITÉ",
            title: lang === 'en'
                ? "The Zero Trust Evolution: Securing Hybrid Workforces in 2024"
                : "L'évolution du Zero Trust : Sécuriser les effectifs hybrides en 2024",
        },
        {
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
            date: lang === 'en' ? "DECEMBER 6, 2023" : "6 DÉCEMBRE 2023",
            tag: lang === 'en' ? "CYBERSECURITY" : "CYBERSÉCURITÉ",
            title: lang === 'en'
                ? "Enterprise Resilience: Navigating the New Cyber Threat Landscape"
                : "Résilience d'entreprise : Naviguer dans le nouveau paysage des cybermenaces",
        },
        {
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
            date: lang === 'en' ? "OCTOBER 10, 2023" : "10 OCTOBRE 2023",
            tag: "HRM",
            title: lang === 'en'
                ? "Beyond Compliance: Scaling Security for Global Operations"
                : "Au-delà de la conformité : Faire évoluer la sécurité pour les opérations mondiales",
        },
        {
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop",
            date: lang === 'en' ? "SEPTEMBER 5, 2023" : "5 SEPTEMBRE 2023",
            tag: lang === 'en' ? "PRODUCTS" : "PRODUITS",
            title: lang === 'en'
                ? "Unlocking ROI: The Strategic Advantage of Managed IT"
                : "Libérer le ROI : L'avantage stratégique de l'informatique gérée",
        },
        {
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
            date: lang === 'en' ? "AUGUST 12, 2023" : "12 AOÛT 2023",
            tag: lang === 'en' ? "IT SUPPORT" : "SUPPORT IT",
            title: lang === 'en'
                ? "The AI Frontier: Optimizing Infrastructure for Machine Learning"
                : "La frontière de l'IA : Optimiser l'infrastructure pour le Machine Learning",
        }
    ];

    return (
        <section className="py-24 bg-white border-t border-background-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex justify-between items-end mb-12">
                    <h2 className="font-display text-4xl lg:text-5xl text-background-dark">
                        <span className="font-bold">{lang === 'en' ? 'Strategic' : 'Insights'}</span> <span className="text-surface-dark/30 font-light">{lang === 'en' ? 'Insights' : 'Stratégiques'}</span>
                    </h2>
                    <Link href={`/${lang}/blog`}>
                        <Button variant="outline" className="rounded-none border border-surface-dark/20 text-background-dark px-6 uppercase tracking-wider text-[10px] font-bold hover:bg-background-light transition-colors">
                            {dict.viewAll}
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Featured / Larger Card */}
                    <div className="lg:col-span-1 group cursor-pointer space-y-3">
                        <div className="overflow-hidden rounded-none bg-gray-100 h-64 relative">
                            <div className="absolute top-2 right-2 bg-white px-2 py-1 text-[10px] font-bold rounded">23%</div>
                            <img src={news[0].image} alt="News abstract" className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-surface-dark/40 tracking-wider">
                            <span>{news[0].date}</span>
                            <span className="w-1 h-1 rounded-none bg-surface-dark/20 rotate-45"></span>
                            <span className="uppercase">{news[0].tag}</span>
                        </div>
                        <h3 className="font-bold text-background-dark text-lg group-hover:underline">{news[0].title}</h3>
                    </div>

                    {/* Grid for remaining items */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {news.slice(1, 5).map((item, index) => (
                            <div key={index} className="group cursor-pointer space-y-3">
                                <div className="overflow-hidden rounded-none bg-gray-100 h-40 relative">
                                    <img src={item.image} alt="News image" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-surface-dark/40 tracking-wider">
                                    <span>{item.date}</span>
                                    <span className="w-1 h-1 rounded-none bg-surface-dark/20 rotate-45"></span>
                                    <span className="uppercase">{item.tag}</span>
                                </div>
                                <h3 className="font-bold text-background-dark text-sm group-hover:underline">{item.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
