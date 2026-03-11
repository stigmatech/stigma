import { Button } from "@/components/ui/button";

export function Consultancy({ dictionary }: { dictionary: any }) {
    const dict = dictionary;
    return (
        <section className="py-24 bg-white overflow-hidden border-t border-background-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <div className="space-y-8 z-10 relative bg-white p-8 lg:p-12 border border-background-light shadow-xl rounded-none max-w-lg">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-surface-dark/40 mb-2">{dict.tag}</h4>
                        <h2 className="font-display text-4xl lg:text-5xl text-background-dark leading-[1.1]">
                            {dict.title}
                        </h2>
                        <p className="text-background-dark/60 text-lg font-light leading-relaxed">
                            {dict.description}
                        </p>
                        <Button size="lg" className="rounded-none px-8 py-6 text-sm uppercase tracking-wider font-bold bg-surface-dark hover:bg-surface-dark/90 text-white transition-colors">
                            {dict.cta}
                        </Button>
                    </div>

                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-2/3 h-[600px] pointer-events-none">
                        {/* Abstract Circuit/Line Art Background */}
                        <svg className="w-full h-full text-surface-dark opacity-90 stroke-current" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M600 100 L400 100 L300 200 L300 400 L200 500 L0 500" strokeWidth="6" className="geo-line" strokeLinecap="square" strokeLinejoin="miter" />
                            <path d="M400 300 L200 300 L100 400 L100 600" strokeWidth="6" className="geo-line" style={{ animationDelay: "0.5s" }} strokeLinecap="square" strokeLinejoin="miter" />
                            <circle cx="400" cy="100" r="8" fill="white" strokeWidth="4" />
                            <circle cx="300" cy="200" r="8" fill="white" strokeWidth="4" />
                            <circle cx="200" cy="500" r="8" fill="white" strokeWidth="4" />
                            <circle cx="400" cy="300" r="8" fill="white" strokeWidth="4" />
                            <circle cx="200" cy="300" r="8" fill="white" strokeWidth="4" />
                            <circle cx="100" cy="400" r="8" fill="white" strokeWidth="4" />
                        </svg>
                    </div>

                </div>
            </div>
        </section>
    );
}
