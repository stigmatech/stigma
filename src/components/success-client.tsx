"use client";

import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessClientProps {
  lang: string;
  dictionary: any;
}

export default function SuccessClient({ lang, dictionary }: SuccessClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get data from URL to redirect back to dashboard
  const score = searchParams.get("score");
  const tier = searchParams.get("tier");
  const type = searchParams.get("type");
  const firstName = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";

  if (!dictionary) return (
    <div className="min-h-screen bg-[#0b0c10] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  // Path is dictionary.common.audit.success_page
  const dict = dictionary?.common?.audit?.success_page || {
    title: lang === 'fr' ? "Diagnostic Réussi" : "Diagnostic Successful",
    subtitle: lang === 'fr' ? "Votre rapport est en cours de génération." : "Your report is being generated.",
    video_cta: lang === 'fr' ? "Découvrir Stigma" : "Discover Stigma",
    testimonial_tag: lang === 'fr' ? "Témoignage" : "Testimonial",
    btn_results: lang === 'fr' ? "Voir mes résultats" : "View my results"
  };

  const handleGoToResults = () => {
    const baseUrl = lang === 'fr' 
      ? `/fr/evaluations/${type === 'cyber' ? 'cyber-security' : type === 'grc' ? 'grc' : 'ai-strategy'}` 
      : `/en/evaluations/${type === 'cyber' ? 'cyber-security' : type === 'grc' ? 'grc' : 'ai-strategy'}`;
    
    router.push(`${baseUrl}?results=true&score=${score}&tier=${tier}`);
  };

  const testimonial = {
    quote: lang === 'fr' 
      ? "Stigma Technologies a transformé notre approche de la sécurité. Un partenaire stratégique indispensable." 
      : "Stigma Technologies transformed our approach to security. An indispensable strategic partner.",
    author: "Jean-François Moreau",
    role: lang === 'fr' ? "Directeur des Opérations" : "Operations Director",
    company: "Constructions Elite"
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white selection:bg-blue-500/30 font-sans relative overflow-x-hidden pt-20">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 lg:py-24 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Star className="w-3 h-3 fill-current" />
            {lang === 'fr' ? "Transmission Réussie" : "Transmission Successful"}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8"
          >
            {firstName && <span className="text-blue-500 block mb-2">{firstName},</span>}
            {dict.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed"
          >
            {dict.subtitle}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Video Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="group relative aspect-video bg-slate-900 border border-white/5 overflow-hidden shadow-2xl shadow-blue-500/10 transition-all hover:border-blue-500/30">
              {/* Overlay with noise */}
              <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-slate-950/40 group-hover:bg-slate-950/20 transition-all cursor-pointer">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/40 group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current text-white translate-x-1" />
                </div>
                <span className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-white/60 group-hover:text-white transition-colors text-center px-4">
                  {dict.video_cta}
                </span>
              </div>

              {/* Background Image / Placeholder */}
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" 
                alt="Presentation Video"
                className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity duration-700"
              />
            </div>

            <div className="p-8 border-l-2 border-blue-500 bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Stigma Executive Brief</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  {lang === 'fr' 
                    ? 'Découvrez comment notre plateforme Elite permet aux entreprises d\'automatiser leur conformité et de sécuriser leurs actifs numériques grâce à l\'intelligence artificielle.' 
                    : 'Discover how our Elite platform enables companies to automate compliance and secure their digital assets through intelligence.'}
                </p>
            </div>
          </motion.div>

          {/* Right: Testimonial & CTA */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-12"
          >
            {/* Testimonial */}
            <div className="relative p-10 bg-gradient-to-br from-white/3 to-transparent border border-white/5 font-sans">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-blue-500/20" />
              <div className="text-blue-500 text-[9px] font-black tracking-[0.4em] uppercase mb-8">
                {dict.testimonial_tag}
              </div>
              <p className="text-xl sm:text-2xl font-light italic text-slate-200 mb-8 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div>
                <div className="h-px w-8 bg-blue-500 mb-4" />
                <div className="text-sm font-black uppercase tracking-widest">{testimonial.author}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{testimonial.role} <span className="text-blue-500/40 mx-1">/</span> {testimonial.company}</div>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-6">
              <Button 
                onClick={handleGoToResults}
                className="w-full h-20 bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-500/20 group transition-all"
              >
                <span>{dict.btn_results}</span>
                <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Button>
              
              <div className="text-center">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">
                  {lang === 'fr' ? 'Un rapport détaillé a été envoyé à' : 'A detailed report has been sent to'}
                </p>
                <p className="text-blue-400/80 text-[11px] font-mono lowercase">
                  {email || "votre adresse email"}
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
