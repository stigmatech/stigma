import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { ContactFormWidget } from "@/components/contact-form-widget";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const isFr = lang === "fr";
  return {
    title: isFr ? "Contactez-Nous | Stigma Technologies" : "Contact Us | Stigma Technologies",
    description: isFr
      ? "Contactez l'équipe Stigma Technologies pour discuter de vos besoins en IT, cybersécurité ou transformation numérique. Expertise globale et support 24/7."
      : "Connect with Stigma Technologies to discuss your IT, cybersecurity, or digital transformation vision. Global expertise with 24/7 support availability.",
    openGraph: {
      title: isFr ? "Contactez-Nous | Stigma Technologies" : "Contact Us | Stigma Technologies",
      description: isFr ? "Parlons de votre projet IT." : "Let’s talk about your IT project.",
      url: `https://stigmatech.ca/${lang}/contact`,
      siteName: "Stigma Technologies",
      type: "website",
    },
    alternates: { canonical: `https://stigmatech.ca/${lang}/contact` },
  };
}

interface Step {
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default async function Contact(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dictionary = await getDictionary(lang);
  const dict = dictionary.contact;
  const isFr = lang === "fr";
  const formDict = {
    ...dictionary.common.contactForm,
    badges: dict.badges,
    urgent: dict.urgent
  };

  return (
    <div className="min-h-screen bg-white selection:bg-amber-500/30 font-sans leading-relaxed">
      <Navbar lang={lang} dictionary={dictionary.common.nav} />

      <main className="relative overflow-hidden font-sans">
        {/* Hero Section - Elite Dark */}
        <section className="bg-slate-950 text-white pt-12 lg:pt-20 pb-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-white/10 animate-[scan_4s_linear_infinite] shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20"></div>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes scan {
              0% { transform: translateY(-100%); opacity: 0; }
              5% { opacity: 1; }
              95% { opacity: 1; }
              100% { transform: translateY(100vh); opacity: 0; }
            }
          `}} />

          <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.05]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 mb-10 backdrop-blur-3xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">{isFr ? "PROTOCOLE DE CONTACT" : "CONTACT PROTOCOL"}</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10 whitespace-pre-line">
              {isFr ? "Contactez" : "Contact"}<span className="text-slate-500 block">{isFr ? "nos experts" : "our experts"}</span>
            </h1>
            
            <p className="text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto tracking-tight">
              {dict.hero.description}
            </p>
          </div>
        </section>

        {/* Contact Content Section */}
        <section className="py-32 bg-white relative z-20 -mt-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

              {/* Left: Contact Form Widget - Elite Industrial */}
              <div className="lg:col-span-7">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block">{isFr ? "CANAL DE TRANSMISSION" : "TRANSMISSION CHANNEL"}</span>
                <h3 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter mb-12">
                  {dict.info.sendUsMessage}
                </h3>
                
                <div className="max-w-3xl">
                  <ContactFormWidget lang={lang} dict={formDict} />
                </div>
              </div>

              {/* Right: Contact Information - Elite Industrial Blocks */}
              <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block">{isFr ? "COORDONNÉES GLOBALES" : "GLOBAL COORDINATES"}</span>
                <h3 className="text-5xl lg:text-6xl font-display font-black text-slate-950 uppercase tracking-tighter mb-16">
                  {dict.info.title}
                </h3>

                <div className="space-y-12">
                  {/* Office Address */}
                  <div className="group border-l-2 border-slate-50 pl-10 hover:border-amber-500 transition-colors">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 group-hover:text-amber-600 transition-colors">{dict.info.office}</h4>
                    <p className="text-2xl font-black text-slate-950 uppercase tracking-tighter leading-tight font-sans">
                      {dictionary.common.footer.address}<br />
                      <span className="text-slate-400">{dictionary.common.footer.addressSubtitle}</span>
                    </p>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                    <div className="group border-l-2 border-slate-50 pl-10 hover:border-amber-500 transition-colors">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 group-hover:text-amber-600 transition-colors">{dict.info.phone}</h4>
                      <p className="text-xl font-black text-slate-950 uppercase tracking-tighter">
                        <a href="tel:+18555521005" className="hover:text-amber-600 transition-all">+1 855-552-1005</a>
                      </p>
                    </div>
                    <div className="group border-l-2 border-slate-50 pl-10 hover:border-amber-500 transition-colors">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 group-hover:text-amber-600 transition-colors">{dict.info.email}</h4>
                      <p className="text-xl font-black text-slate-950 uppercase tracking-tighter">
                        <a href="mailto:contact@stigmatech.ca" className="hover:text-amber-600 transition-all font-sans">contact@stigmatech.ca</a>
                      </p>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="group border-l-2 border-slate-50 pl-10 hover:border-amber-500 transition-colors">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 group-hover:text-amber-600 transition-colors">{dict.info.hours}</h4>
                    <p className="text-xl font-black text-slate-950 uppercase tracking-tighter">
                      {dict.info.mondayFriday}<br />
                      <span className="text-slate-400 text-xs font-black uppercase tracking-widest">{dict.info.hoursDescription}</span>
                    </p>
                  </div>
                </div>

                {/* Radar Overlay Map Styling */}
                <div className="mt-20 relative group bg-slate-950 overflow-hidden border border-white/5 shadow-2xl">
                  <div className="absolute inset-0 opacity-40 mix-blend-multiply group-hover:opacity-20 transition-opacity duration-700">
                    <img
                      src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop"
                      alt="Stigma Technologies HQ"
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-tr from-slate-950 via-transparent to-transparent opacity-60"></div>
                  <div className="relative z-10 p-12 aspect-video flex flex-col justify-end">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-amber-500 flex items-center justify-center animate-pulse">
                        <span className="material-symbols-outlined text-slate-950 font-black">location_on</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-1 block">{dict.info.montrealArea}</span>
                        <span className="text-xl font-black text-white uppercase tracking-tighter">{isFr ? "QG OPÉRATIONNEL" : "OPERATIONAL HQ"}</span>
                      </div>
                    </div>
                  </div>
                  {/* Scanline overlay for map */}
                  <div className="absolute inset-0 pointer-events-none opacity-20" 
                     style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)`, backgroundSize: '100% 4px' }} 
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Operational Pipeline - Process Section */}
        <section className="py-32 bg-slate-50 border-t border-slate-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block">{dict.process.tag}</span>
              <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter">{dict.process.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {dict.process.steps.map((step: Step, index: number) => (
                <div key={index} className="bg-white p-12 border border-slate-100 relative group hover:shadow-2xl hover:shadow-slate-200 transition-all duration-700">
                  <div className="absolute top-0 right-0 p-8 text-slate-100 font-display font-black text-7xl group-hover:text-slate-950/5 transition-colors">0{index + 1}</div>
                  <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tighter mb-8 relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-base leading-relaxed relative z-10 font-light tracking-tight font-sans">
                    {step.description}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Elite FAQ - Documentation Style */}
        <section className="py-32 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 lg:text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block">{isFr ? "PROTOCOLES DE TRANSPARENCE" : "TRANSPARENCY PROTOCOLS"}</span>
              <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter mb-8">
                {dict.faq.title}
              </h2>
              <div className="w-20 h-1 bg-amber-500 lg:mx-0 mx-auto"></div>
            </div>

            <div className="space-y-16">
              {dict.faq.items.map((item: FAQItem, index: number) => (
                <div key={index} className="group border-b border-slate-50 pb-12 last:border-0 hover:border-slate-100 transition-colors">
                  <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tighter mb-6 group-hover:text-amber-600 transition-colors flex gap-6 font-sans">
                    <span className="text-slate-100 font-black group-hover:text-amber-500/20 transition-colors">Q/</span>
                    {item.question}
                  </h3>
                  <p className="text-slate-500 text-lg leading-relaxed pl-14 border-l-2 border-slate-50 group-hover:border-amber-200 transition-all font-light tracking-tight font-sans">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
