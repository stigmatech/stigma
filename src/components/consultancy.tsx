import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Consultancy({ dictionary }: { dictionary: any }) {
    const dict = dictionary;
    return (
        <section className="py-32 bg-white overflow-hidden relative border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    <div className="space-y-10 z-10 relative bg-slate-50 p-10 lg:p-16 border border-slate-100 rounded-none max-w-2xl shadow-sm">
                        <div className="flex flex-col gap-4">
                            <span className="inline-flex items-center gap-3 bg-slate-950 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 w-fit">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                {dict.tag || "NOTRE POINT FORT"}
                            </span>
                            <h2 className="font-display text-5xl lg:text-7xl text-slate-950 leading-[0.9] tracking-tighter uppercase font-black">
                                {dict.title}
                            </h2>
                        </div>
                        
                        <p className="text-slate-500 text-xl font-light leading-relaxed tracking-tight">
                            {dict.description}
                        </p>

                        <Button asChild size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black bg-slate-950 text-white hover:bg-blue-600 transition-all border-none shadow-xl">
                            <Link href="/contact">{dict.cta}</Link>
                        </Button>
                    </div>

                    <div className="hidden lg:block absolute right-[-5%] top-1/2 -translate-y-1/2 w-3/4 h-[700px] pointer-events-none opacity-5">
                        {/* Abstract Circuit/Line Art Background */}
                        <svg className="w-full h-full text-slate-950 stroke-current" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M600 100 L400 100 L300 200 L300 400 L200 500 L0 500" strokeWidth="2" className="geo-line" strokeLinecap="square" strokeLinejoin="miter" />
                            <path d="M400 300 L200 300 L100 400 L100 600" strokeWidth="2" className="geo-line" style={{ animationDelay: "0.5s" }} strokeLinecap="square" strokeLinejoin="miter" />
                            <circle cx="400" cy="100" r="4" fill="currentColor" />
                            <circle cx="300" cy="200" r="4" fill="currentColor" />
                            <circle cx="200" cy="500" r="4" fill="currentColor" />
                            <circle cx="400" cy="300" r="4" fill="currentColor" />
                            <circle cx="200" cy="300" r="4" fill="currentColor" />
                            <circle cx="100" cy="400" r="4" fill="currentColor" />
                        </svg>
                    </div>

                </div>
            </div>
        </section>
    );
}
