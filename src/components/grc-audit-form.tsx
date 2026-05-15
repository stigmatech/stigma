"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { usePostHog } from 'posthog-js/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TurnstileWidget } from "./turnstile-widget";
import { GrcAuditPdfReport } from "./grc-audit-pdf-report";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Download, Loader2, AlertTriangle, ShieldCheck, ChevronRight, Scale } from "lucide-react";
import { BookingSession } from "./booking-session";
import { isProfessionalEmail, isValidPhoneNumber, formatToE164 } from "@/lib/validation";

interface GRCAuditFormProps {
  lang: string;
  dictionary: any;
}

export function GRCAuditForm({ lang, dictionary }: GRCAuditFormProps) {
  const [step, setStep] = useState(0); // 0: Start, 1-6: Questions, 7: Lead Form, 8: Results
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [leadData, setLeadData] = useState({ firstName: "", lastName: "", email: "", phone: "", company: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const posthog = usePostHog();
  if (!dictionary || !dictionary.grcAudit) return null;

  const dict = dictionary.grcAudit;
  const questions = dict.questions;
  const totalQuestions = questions.length;

  // Handle initialization from URL (for return from success page)
  useEffect(() => {
    const results = searchParams.get("results");
    const urlScore = searchParams.get("score");
    const urlTier = searchParams.get("tier");
    
    if (results === "true" && urlScore) {
      setStep(totalQuestions + 2);
    }
  }, [searchParams, totalQuestions]);

  const generatePDF = async () => {
    if (!pdfRef.current) return;
    setIsGeneratingPdf(true);
    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        onclone: (clonedDoc: Document) => {
          const elements = clonedDoc.getElementsByTagName('*');
          for (let i = 0; i < elements.length; i++) {
            const el = elements[i] as HTMLElement;
            if (el.style) {
              el.style.setProperty('--background', '#ffffff', 'important');
              el.style.setProperty('--foreground', '#020617', 'important');
              el.style.setProperty('--primary', '#020617', 'important');
              el.style.setProperty('--primary-foreground', '#ffffff', 'important');
              el.style.setProperty('--muted', '#f1f5f9', 'important');
              el.style.setProperty('--muted-foreground', '#64748b', 'important');
              el.style.setProperty('--accent', '#f1f5f9', 'important');
              el.style.setProperty('--destructive', '#ef4444', 'important');
              el.style.setProperty('--border', '#e2e8f0', 'important');
              el.style.setProperty('--input', '#e2e8f0', 'important');
              el.style.setProperty('--ring', '#0b0c10', 'important');
            }
          }
        }
      });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2]
      });
      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`stigma-grc-audit-${leadData.company.replace(/\s+/g, '-').toLowerCase() || 'report'}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleAnswer = (score: number) => {
    const questionId = questions[step - 1].id;
    setAnswers({ ...answers, [questionId]: score });

    // Track question answered
    posthog?.capture('question_answered', {
      audit_type: 'grc',
      question_id: questionId,
      score: score,
      step: step,
      lang: lang
    });

    if (step < totalQuestions) {
      setStep(step + 1);
    } else {
      setStep(totalQuestions + 1);
    }
  };

  const handleStart = () => {
    setStep(1);
    posthog?.capture('audit_started', {
      audit_type: 'grc',
      lang: lang
    });
  };

  const calculateTotalScore = () => {
    return Object.values(answers).reduce((acc, curr) => acc + curr, 0);
  };

  const getResultTier = () => {
    const score = calculateTotalScore();
    if (score >= 18) return "gold";
    if (score >= 10) return "silver";
    return "bronze";
  };

  const getHighPriorityGaps = () => {
    return Object.entries(answers)
      .filter(([_, score]) => score <= 2)
      .map(([id, _]) => id);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // 1. Validate Email Professionalism
    if (!isProfessionalEmail(leadData.email)) {
      setSubmitError(dictionary.common.audit.error_generic_email);
      return;
    }

    // 2. Validate Phone Number
    if (!isValidPhoneNumber(leadData.phone)) {
      setSubmitError(dictionary.common.audit.error_invalid_phone);
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Generate PDF as base64 for email
      let pdfBase64 = "";
      if (pdfRef.current) {
        const canvas = await html2canvas(pdfRef.current, {
          scale: 1, 
          useCORS: true,
          logging: false
        });
        pdfBase64 = canvas.toDataURL("image/jpeg", 0.7);
      }

      const formattedPhone = formatToE164(leadData.phone);

      const response = await fetch("/api/audit-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: leadData.email,
          firstName: leadData.firstName,
          lastName: leadData.lastName,
          phone: formattedPhone,
          company: leadData.company,
          score: calculateTotalScore(),
          tier: getResultTier(),
          answers: answers,
          lang: lang,
          turnstileToken,
          pdfBase64: pdfBase64,
          type: "grc"
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit audit.");
      }

      // 2. Redirect to Success Page with results in URL
      const score = calculateTotalScore();
      const tier = getResultTier();
      const successUrl = lang === 'fr' ? '/fr/evaluations/success' : '/en/evaluations/success';
      router.push(`${successUrl}?score=${score}&tier=${tier}&name=${leadData.firstName}&email=${leadData.email}&phone=${formattedPhone}&type=grc`);

    } catch (error: any) {
      console.error("Submission error:", error);
      setSubmitError(error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (step / (totalQuestions + 1)) * 100;

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {/* Step 0: Welcome */}
        {step === 0 && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-10"
          >
            <div className="inline-flex items-center gap-3 bg-indigo-600/10 text-indigo-600 text-[10px] font-black tracking-[0.4em] uppercase px-6 py-2 border border-indigo-600/20">
              <Scale className="w-4 h-4" />
              {dict.tag}
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-black text-slate-950 tracking-tighter uppercase leading-[0.9] max-w-4xl mx-auto">
              {dict.title}
            </h1>
            <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto tracking-tight">
              {dict.description}
            </p>
            <Button 
              onClick={handleStart}
              className="bg-indigo-600 hover:bg-slate-950 text-white rounded-none px-12 py-8 text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:scale-105 shadow-2xl shadow-indigo-100"
            >
              {dict.cta_start}
            </Button>
          </motion.div>
        )}

        {/* Steps: Questions */}
        {step >= 1 && step <= totalQuestions && (
          <motion.div 
            key={`q-${step}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-16"
          >
            <div className="w-full bg-slate-100 h-1 overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="space-y-10">
              <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em] block">{dictionary.common.audit.question} {step} / {totalQuestions}</span>
              <h2 className="text-4xl md:text-6xl font-display font-black text-slate-950 tracking-tighter leading-none uppercase">
                {questions[step - 1].text}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {questions[step - 1].options.map((option: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.score)}
                  className="group relative text-left p-10 border border-slate-100 hover:border-indigo-600 hover:bg-indigo-600 transition-all duration-500 rounded-none overflow-hidden"
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-lg font-black uppercase tracking-tight text-slate-900 group-hover:text-white transition-colors">{option.text}</span>
                    <span className="material-symbols-outlined text-slate-200 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">arrow_forward</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step: Lead Form */}
        {step === totalQuestions + 1 && (
          <motion.div 
            key="lead"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto w-full space-y-12 text-center"
          >
            <div className="space-y-6">
              <h2 className="text-5xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none">
                {dict.lead_form?.title}
              </h2>
              <p className="text-slate-500 font-light text-lg tracking-tight">
                {dict.lead_form?.description}
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-6 text-left bg-white p-10 border border-slate-100 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-950">{dictionary.common.audit.label_first_name}</Label>
                  <input 
                    id="firstName" 
                    type="text" 
                    required 
                    className="w-full rounded-none border-t-0 border-l-0 border-r-0 border-b-2 border-slate-200 focus:border-indigo-600 h-12 text-lg font-black uppercase tracking-tighter bg-transparent outline-none transition-colors"
                    placeholder={dictionary.common.audit.placeholder_first_name.toUpperCase()}
                    value={leadData.firstName}
                    onChange={e => setLeadData(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-950">{dictionary.common.audit.label_last_name}</Label>
                  <input 
                    id="lastName" 
                    type="text" 
                    required 
                    className="w-full rounded-none border-t-0 border-l-0 border-r-0 border-b-2 border-slate-200 focus:border-indigo-600 h-12 text-lg font-black uppercase tracking-tighter bg-transparent outline-none transition-colors"
                    placeholder={dictionary.common.audit.placeholder_last_name.toUpperCase()}
                    value={leadData.lastName}
                    onChange={e => setLeadData(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-950">{dictionary.common.audit.label_email}</Label>
                  <input 
                    id="email" 
                    type="email" 
                    required 
                    className="w-full rounded-none border-t-0 border-l-0 border-r-0 border-b-2 border-slate-200 focus:border-indigo-600 h-12 text-lg font-black uppercase tracking-tighter bg-transparent outline-none transition-colors"
                    placeholder={dictionary.common.audit.placeholder_email.toUpperCase()}
                    value={leadData.email}
                    onChange={e => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-950">{dictionary.common.audit.label_phone}</Label>
                  <input 
                    id="phone" 
                    type="tel" 
                    required 
                    className="w-full rounded-none border-t-0 border-l-0 border-r-0 border-b-2 border-slate-200 focus:border-indigo-600 h-12 text-lg font-black uppercase tracking-tighter bg-transparent outline-none transition-colors"
                    placeholder={dictionary.common.audit.placeholder_phone.toUpperCase()}
                    value={leadData.phone}
                    onChange={e => setLeadData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="company" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-950">{dictionary.common.audit.placeholder_company}</Label>
                <input 
                  id="company" 
                  type="text" 
                  required 
                  className="w-full rounded-none border-t-0 border-l-0 border-r-0 border-b-2 border-slate-200 focus:border-indigo-600 h-12 text-lg font-black uppercase tracking-tighter bg-transparent outline-none transition-colors"
                  placeholder={dictionary.common.audit.placeholder_company.toUpperCase()}
                  value={leadData.company}
                  onChange={e => setLeadData(prev => ({ ...prev, company: e.target.value }))}
                />
              </div>
              
              <div className="py-2">
                <TurnstileWidget 
                  onVerify={setTurnstileToken}
                  onExpire={() => setTurnstileToken(null)}
                  onError={() => setTurnstileToken(null)}
                  lang={lang === "fr" ? "fr" : "en"}
                />
              </div>

              {submitError && (
                <p className="text-red-600 text-[10px] font-black uppercase tracking-widest bg-red-50 p-4 border border-red-100">
                  {submitError}
                </p>
              )}
              
              <Button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-slate-950 text-white rounded-none h-16 font-black uppercase tracking-[0.3em] text-[11px] transition-all"
                disabled={isSubmitting || !turnstileToken}
              >
                {isSubmitting ? dictionary.common.audit.processing : dict.lead_form?.cta}
              </Button>
            </form>
          </motion.div>
        )}

        {/* Step: Final Results */}
        {step === totalQuestions + 2 && (
          <motion.div 
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-24"
          >
            {/* 1. Header Scoreboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center bg-slate-950 p-12 lg:p-20 border border-white/5 shadow-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-indigo-600/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="absolute -right-20 -top-20 text-[20vw] font-black text-white/2 select-none pointer-events-none uppercase">
                {dict.dashboard.risk_label}
              </div>

              <div className="lg:col-span-1 flex justify-center lg:justify-start">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-900" />
                    <motion.circle
                      cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="4" fill="transparent"
                      strokeDasharray="553"
                      initial={{ strokeDashoffset: 553 }}
                      animate={{ strokeDashoffset: 553 - (553 * (calculateTotalScore() / (totalQuestions * 4))) }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="text-indigo-500"
                    />
                  </svg>
                  <div className="text-center z-10">
                    <span className="text-5xl font-black text-white block leading-none tracking-tighter">
                      {(calculateTotalScore() / (totalQuestions * 4) * 100).toFixed(0)}%
                    </span>
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mt-2 block">
                      {dict.dashboard.compliance_label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6 text-center lg:text-left">
                <div className="inline-block bg-indigo-600 text-white text-[9px] font-black px-4 py-1 uppercase tracking-[0.4em] mb-4">
                  {dict.results[getResultTier()].title}
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none">
                  {dict.dashboard.diagnostic_label}
                </h2>
                <p className="text-lg text-slate-400 font-light max-w-2xl tracking-tight leading-relaxed">
                  {getResultTier() === 'bronze' ? dict.results.bronze.description : getResultTier() === 'silver' ? dict.results.silver.description : dict.results.gold.description}
                </p>
              </div>
            </div>

            
            {/* 1.5 Radar Chart Visualization (Integrated into Dashboard) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-12 lg:p-20 border border-slate-100 shadow-xl overflow-hidden mt-12 mb-12">
              <div className="space-y-6">
                <h3 className="text-3xl font-display font-black text-slate-950 uppercase tracking-tighter leading-tight">
                  {dict.pdf_report.radar_title}
                </h3>
                <p className="text-slate-500 font-light leading-relaxed">
                  {dict.pdf_report.subtitle}
                </p>
                <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(answers).slice(0, 6).map(([id]) => (
                    <div key={id} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-none" />
                      <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest leading-none">
                        {dict.recommendations[id]?.title || id}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden flex justify-center scale-90 sm:scale-100 origin-center">
                <GrcAuditPdfReport 
                  isDashboard 
                  score={(calculateTotalScore() / (totalQuestions * 4)) * 100}
                  tier={getResultTier()}
                  answers={answers}
                  dict={dict} 
                  lang={lang}
                  company={leadData.company}
                />
              </div>
            </div>

            {/* 2. Gap Analysis Matrix */}
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
                <div className="space-y-4">
                  <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em] block">{dict.dashboard.priority_label}</span>
                  <h3 className="text-4xl font-display font-black text-slate-950 uppercase tracking-tighter">{dict.dashboard.diagnostic_label}</h3>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-none bg-red-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{dict.dashboard.shortcoming_label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-none bg-indigo-600" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{dict.dashboard.remedy_label}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-1">
                {getHighPriorityGaps().map((catId, idx) => (
                  <motion.div 
                    key={catId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-slate-100 group-hover:bg-slate-50 transition-colors">
                      <div className="p-10 lg:p-12 border-r border-slate-100 relative">
                        <div className="flex gap-6 items-start">
                          <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                          <div className="space-y-3">
                            <h4 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.4em]">{dict.recommendations[catId].title}</h4>
                            <p className="text-lg font-black text-slate-950 uppercase tracking-tighter leading-tight">
                              {dict.recommendations[catId].shortcoming}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-10 lg:p-12 bg-indigo-50/10 group-hover:bg-indigo-600/5 transition-colors relative">
                        <div className="flex gap-6 items-start">
                          <ShieldCheck className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
                          <div className="space-y-3">
                            <h4 className="font-black text-indigo-600 text-[10px] uppercase tracking-[0.4em]">{dict.dashboard.remedy_label}</h4>
                            <p className="text-lg font-light text-slate-700 tracking-tight leading-snug">
                              {dict.recommendations[catId].remedy}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-200 group-hover:text-indigo-600 transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 3. Expert Consultation Booking */}
            <div className="pt-12">
              <BookingSession 
                lang={lang}
                variant="elite"
                dictionary={{
                  ...dict.dashboard.booking,
                  title: dict.dashboard.booking_title,
                  description: dict.dashboard.booking_desc,
                  schedulerTitle: dict.dashboard.booking_title,
                  schedulerDescription: dict.dashboard.booking_desc,
                }}
              />
            </div>

            {/* 4. Action Bar Footer */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-24 border-t border-slate-100 pb-24">
              <Button asChild size="lg" className="rounded-none px-12 py-8 text-[11px] uppercase tracking-[0.3em] font-black bg-slate-950 text-white hover:bg-slate-800 shadow-2xl">
                <Link href={`/${lang}/quote?service=grc`}>
                  {dict.results[getResultTier()].action}
                </Link>
              </Button>
              
              <Button 
                id="download-report-button"
                variant="outline" 
                onClick={generatePDF}
                disabled={isGeneratingPdf}
                className="rounded-none px-12 py-8 text-[11px] uppercase tracking-[0.3em] font-black border-slate-200 text-slate-900 hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl hover:border-slate-400"
              >
                {isGeneratingPdf ? (
                  <><Loader2 className="w-4 h-4 mr-3 animate-spin" /> {dict.pdf_report.downloading}</>
                ) : (
                  <><Download className="w-4 h-4 mr-3" /> {dict.pdf_report.download_button}</>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden PDF Canvas Component */}
      {step === totalQuestions + 2 && (
        <GrcAuditPdfReport 
          ref={pdfRef}
          score={(calculateTotalScore() / (totalQuestions * 4)) * 100}
          tier={getResultTier()}
          answers={answers}
          dict={dict} 
          lang={lang}
          company={leadData.company}
        />
      )}
    </div>
  );
}
