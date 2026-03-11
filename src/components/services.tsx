import Link from "next/link";
import { Locale } from "@/i18n-config";

export function Services({ lang, dictionary }: { lang: Locale; dictionary: any }) {
    const services = [
        {
            id: "01",
            title: dictionary.items.managedIt.title,
            description: dictionary.items.managedIt.description,
            icon: "settings_suggest",
            color: "bg-[#0b0c10]",
            href: `/${lang}/solutions/managed-it-services`
        },
        {
            id: "02",
            title: dictionary.items.managedCybersecurity.title,
            description: dictionary.items.managedCybersecurity.description,
            icon: "shield_lock",
            color: "bg-purple-600",
            href: `/${lang}/solutions/managed-cybersecurity`
        },
        {
            id: "03",
            title: dictionary.items.aiMachineLearning.title,
            description: dictionary.items.aiMachineLearning.description,
            icon: "psychology",
            color: "bg-teal-600",
            href: `/${lang}/solutions/ai-machine-learning`
        },
        {
            id: "04",
            title: dictionary.items.grc.title,
            description: dictionary.items.grc.description,
            icon: "fact_check",
            color: "bg-indigo-600",
            href: `/${lang}/solutions/grc`
        },
        {
            id: "05",
            title: dictionary.items.cloudComputing.title,
            description: dictionary.items.cloudComputing.description,
            icon: "cloud_upload",
            color: "bg-cyan-600",
            href: `/${lang}/solutions/cloud-computing`
        },
        {
            id: "06",
            title: dictionary.items.digitalTransformation.title,
            description: dictionary.items.digitalTransformation.description,
            icon: "dynamic_feed",
            color: "bg-orange-600",
            href: `/${lang}/solutions/digital-transformation`
        },
    ];

    return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center md:text-left">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">{dictionary.tag}</h4>
                    <h2 className="font-display font-medium text-4xl lg:text-5xl text-primary">
                        {dictionary.title} <br />
                        <span className="font-bold">{dictionary.titleBold}</span> {dictionary.forYou}
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`group relative bg-primary rounded-none p-8 overflow-hidden h-96 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 ${index < 3 ? "lg:col-span-2" : index === 3 ? "lg:col-start-2 lg:col-span-2" : "lg:col-span-2"
                                }`}
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-60 transition-opacity">
                                <span className="material-symbols-outlined text-[80px] text-white">{service.icon}</span>
                            </div>
                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 rounded-none bg-white/10 text-white text-xs backdrop-blur-sm mb-4">{service.id}</span>
                                <h3 className="text-2xl font-display font-bold text-white mb-2">{service.title}</h3>
                            </div>
                            <div className="relative z-10">
                                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                    {service.description}
                                </p>
                                <Link href={service.href} className="inline-flex items-center text-white text-sm font-bold hover:underline">
                                    {dictionary.learnMore} <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                                </Link>
                            </div>
                            <div className={`absolute -bottom-10 -left-10 w-40 h-40 ${service.color} rounded-none rotate-45 mix-blend-screen filter blur-3xl opacity-40`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
