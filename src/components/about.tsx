export function About({ dictionary }: { dictionary: any }) {
    const dict = dictionary;
    const sections = dict.sections;

    return (
        <section className="py-24 bg-background-light border-t border-background-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    <div className="lg:col-span-5">
                        <h2 className="font-display text-5xl lg:text-7xl text-background-dark leading-[1.1]">
                            <span className="font-bold">{dict.title}</span><br />
                            <span className="text-surface-dark/30 font-light">{dict.titleLight}</span>
                        </h2>
                    </div>

                    <div className="lg:col-span-7 space-y-12 border-l border-background-light pl-0 lg:pl-12">
                        <div className="flex flex-col space-y-8">
                            {sections.map((section: any, index: number) => (
                                <p key={index} className="text-sm text-background-dark/70 font-light leading-relaxed max-w-xl">
                                    <span className="font-bold text-background-dark">{section.title}</span> {section.content}
                                </p>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
