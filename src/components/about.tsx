export function About({ dictionary }: { dictionary: any }) {
    const dict = dictionary;
    const sections = dict.sections;

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* MONUMENTAL HEADER */}
                    <div className="lg:col-span-5 space-y-6">
                        <span className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase">
                            {dict.tag}
                        </span>
                        <h2 className="font-display text-6xl lg:text-8xl text-slate-950 leading-[0.85] uppercase font-extrabold tracking-tighter">
                            {dict.title}<br />
                            <span className="text-slate-200">{dict.titleLight}</span>
                        </h2>
                    </div>

                    {/* CONTENT COLUMN */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="flex flex-col space-y-12 border-l border-slate-100 pl-0 lg:pl-16">
                            {sections.map((section: any, index: number) => (
                                <div key={index} className="space-y-4 max-w-2xl">
                                    <h3 className="text-xs font-black text-slate-950 tracking-[0.2em] uppercase">
                                        {section.title}
                                    </h3>
                                    <p className="text-lg text-slate-500 font-light leading-relaxed">
                                        {section.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                        
                        {/* Subtle decorative line */}
                        <div className="w-full h-px bg-slate-100" />
                    </div>

                </div>
            </div>
            
            {/* Background Detail */}
            <div className="absolute bottom-0 right-0 p-20 opacity-[0.03] pointer-events-none">
                <span className="text-[15rem] font-black text-slate-950 leading-none tracking-tighter uppercase select-none">
                    STIGMA
                </span>
            </div>
        </section>
    );
}

