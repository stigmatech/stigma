"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TurnstileWidget } from "./turnstile-widget";
import { AiAuditPdfReport } from "./ai-audit-pdf-report";
import { AiAuditChatbot } from "./ai-audit-chatbot";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Download, Loader2 } from "lucide-react";

interface AIAuditFormProps {
    lang: string;
    dictionary: any;
}


export function AIAuditForm({ lang, dictionary }: AIAuditFormProps) {
    const [step, setStep] = useState(0); // 0: Start, 1-5: Questions, 6: Lead Form, 7: Results
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [leadData, setLeadData] = useState({ email: "", company: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const pdfRef = useRef<HTMLDivElement>(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    if (!dictionary) return null;

    const dict = dictionary.home.aiAudit;
    const questions = dict.questions;
    const totalQuestions = questions.length;

    const generatePDF = async () => {
        if (!pdfRef.current) return;
        setIsGeneratingPdf(true);
        try {
            const canvas = await html2canvas(pdfRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
            });
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width / 2, canvas.height / 2]
            });
            pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width / 2, canvas.height / 2);
            pdf.save(`stigmatech-ai-audit-${leadData.company.replace(/\s+/g, '-').toLowerCase() || 'report'}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    const handleAnswer = (questionId: string, score: number) => {

        setAnswers(prev => ({ ...prev, [questionId]: score }));
        if (step < totalQuestions) {
            setStep(step + 1);
        } else {
            setStep(totalQuestions + 1);
        }
    };

    const calculateTotalScore = () => {
        return Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    };

    const getResultTier = () => {
        const score = calculateTotalScore();
        if (score >= 24) return "gold";
        if (score >= 15) return "silver";
        return "bronze";
    };

    const getHighImpactCategories = () => {
        return Object.entries(answers)
            .filter(([_, score]) => score >= 4)
            .map(([id, _]) => id);
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/audit-submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: leadData.email,
                    company: leadData.company,
                    score: calculateTotalScore(),
                    tier: getResultTier(),
                    answers: answers,
                    lang: lang,
                    turnstileToken
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to submit audit.");
            }

            setStep(totalQuestions + 2);
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
                        className="text-center space-y-8"
                    >
                        <span className="inline-block bg-blue-600/10 text-blue-600 text-[10px] font-black tracking-[0.2em] uppercase px-4 py-1.5 border border-blue-600/20 rounded-none">
                            {dict.tag}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-black text-[#0b0c10] tracking-tighter uppercase leading-none">
                            {dict.title}
                        </h1>
                        <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">
                            {dict.description}
                        </p>
                        <Button 
                            onClick={() => setStep(1)}
                            className="bg-[#0b0c10] hover:bg-blue-600 text-white rounded-none px-12 py-8 text-xs font-black uppercase tracking-widest transition-all hover:scale-105"
                        >
                            {dict.cta_start}
                        </Button>
                    </motion.div>
                )}

                {/* Steps 1-5: Questions */}
                {step >= 1 && step <= totalQuestions && (
                    <motion.div 
                        key={`q-${step}`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-12"
                    >
                        <div className="w-full bg-gray-100 h-1 overflow-hidden">
                            <motion.div 
                                className="h-full bg-blue-600"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                            />
                        </div>
                        
                        <div className="space-y-6">
                            <p className="text-blue-600 font-black text-xs uppercase tracking-widest">Question {step} / {totalQuestions}</p>
                            <h2 className="text-3xl md:text-5xl font-display font-black text-[#0b0c10] tracking-tight leading-tight">
                                {questions[step - 1].text}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {questions[step - 1].options.map((option: any, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(questions[step - 1].id, option.score)}
                                    className="group relative text-left p-8 border border-gray-100 hover:border-[#0b0c10] hover:bg-[#0b0c10] transition-all duration-300 rounded-none overflow-hidden"
                                >
                                    <div className="relative z-10 flex items-center justify-between">
                                        <span className="text-lg text-gray-700 group-hover:text-white transition-colors font-medium">{option.text}</span>
                                        <span className="material-symbols-outlined text-gray-200 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">arrow_forward</span>
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
                        className="max-w-md mx-auto w-full space-y-10 text-center"
                    >
                        <div className="space-y-4">
                            <h2 className="text-4xl font-display font-black text-[#0b0c10] uppercase tracking-tighter">
                                {dict.lead_form.title}
                            </h2>
                            <p className="text-gray-500 font-light italic text-sm">
                                {dict.lead_form.description}
                            </p>
                        </div>

                        <form onSubmit={handleLeadSubmit} className="space-y-6 text-left">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-[#0b0c10]">{dict.lead_form.email}</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    required 
                                    className="rounded-none border-gray-200 focus:border-blue-600 h-12"
                                    placeholder="vous@entreprise.ca"
                                    value={leadData.email}
                                    onChange={e => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-[10px] font-black uppercase tracking-widest text-[#0b0c10]">{dict.lead_form.company}</Label>
                                <Input 
                                    id="company" 
                                    type="text" 
                                    required 
                                    className="rounded-none border-gray-200 focus:border-blue-600 h-12"
                                    placeholder="Nom de votre PME"
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
                                <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider bg-red-50 p-3 border-l-4 border-red-500">
                                    {submitError}
                                </p>
                            )}
                            
                            <Button 
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-none h-14 font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-blue-100"
                                disabled={isSubmitting || !turnstileToken}
                            >
                                {isSubmitting ? "Processing..." : dict.lead_form.cta}
                            </Button>
                        </form>
                    </motion.div>
                )}

                {/* Step: Final Results */}
                {step === totalQuestions + 2 && (
                    <motion.div 
                        key="result"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-10"
                    >
                        <div className="space-y-4">
                            <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-200">
                                <span className="text-3xl font-black">{(calculateTotalScore() / (totalQuestions * 4) * 100).toFixed(0)}%</span>
                            </div>
                            <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px]">Maturité IA Détectée</p>
                            <h2 className="text-5xl md:text-7xl font-display font-black text-[#0b0c10] uppercase tracking-tighter">
                                {dict.results[getResultTier()].title}
                            </h2>
                            <p className="text-xl text-gray-500 font-light max-w-xl mx-auto italic">
                                {dict.results[getResultTier()].description}
                            </p>
                        </div>

                        {getHighImpactCategories().length > 0 && (
                            <div className="max-w-4xl mx-auto text-left space-y-6">
                                <div className="h-px w-20 bg-blue-600 mb-8 mx-auto" />
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#0b0c10] text-center mb-8">
                                    Vos Priorités Stratégiques IA
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                                    {getHighImpactCategories().map((catId) => (
                                        <motion.div 
                                            key={catId}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="p-6 bg-white border border-gray-100 shadow-sm border-l-4 border-l-blue-600"
                                        >
                                            <h4 className="font-black text-blue-600 uppercase text-xs tracking-widest mb-2">
                                                {dict.recommendations[catId].title}
                                            </h4>
                                            <p className="text-sm text-gray-600 leading-relaxed font-light">
                                                {dict.recommendations[catId].description}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contextual AI Chatbot */}
                        <div className="w-full py-8 text-left">
                            <AiAuditChatbot 
                                dict={dictionary}
                                contextData={{
                                    score: calculateTotalScore(),
                                    company: leadData.company,
                                    weakness: getHighImpactCategories().length > 0 
                                        ? dict.recommendations[getHighImpactCategories()[0]].title 
                                        : "optimisation globale"
                                }}
                            />
                        </div>

                        {/* PDF Download Action */}
                        <div className="flex justify-center pt-2 pb-6">
                            <Button 
                                onClick={generatePDF}
                                disabled={isGeneratingPdf}
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-none px-8 py-6 font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-200"
                            >
                                {isGeneratingPdf ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {dict.pdf_report.downloading}</>
                                ) : (
                                    <><Download className="w-4 h-4 mr-2" /> {dict.pdf_report.download_button}</>
                                )}
                            </Button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button className="bg-[#0b0c10] hover:bg-gray-800 text-white rounded-none px-10 py-7 font-black uppercase tracking-widest text-xs">
                                {dict.results[getResultTier()].action}
                            </Button>
                            <Button variant="outline" className="border-[#0b0c10] text-[#0b0c10] hover:bg-gray-50 rounded-none px-10 py-7 font-black uppercase tracking-widest text-xs" asChild>
                                <Link href={`/${lang}/solutions/managed-ai-agents`}>Voir les Agents</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hidden PDF Canvas Component */}
            {step === totalQuestions + 2 && (
                <AiAuditPdfReport 
                    ref={pdfRef}
                    score={calculateTotalScore()}
                    tier={getResultTier()}
                    answers={answers}
                    dict={dictionary}
                    company={leadData.company}
                />
            )}
        </div>
    );
}
