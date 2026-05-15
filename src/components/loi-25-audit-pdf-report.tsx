"use client";

import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

interface Loi25AuditPdfReportProps {
  score: number;
  tier: string;
  answers: Record<string, number>;
  dict: any;
  lang: string;
  company: string;
  isDashboard?: boolean;
  common?: any;
}

export const Loi25AuditPdfReport = React.forwardRef<HTMLDivElement, Loi25AuditPdfReportProps>(
  ({ score, tier, answers, dict, lang, company, isDashboard, common }, ref) => {
    if (!dict || !dict.pdf_report) return null;

    const chartData = dict.questions.map((q: any) => ({
      subject: dict.pdf_report.radar[q.id] || q.id,
      A: answers[q.id] || 0,
      fullMark: 4
    }));

    const today = new Date().toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div 
        ref={ref}
        className={isDashboard ? "bg-transparent p-0 w-full h-auto" : "bg-white text-gray-900 w-[790px] h-auto min-h-[1115px] p-12 flex flex-col font-sans relative"}
        style={isDashboard ? {} : { position: 'absolute', top: '-10000px', left: '-10000px', zIndex: -10 }}
      >
        {isDashboard ? (
          <div className="flex justify-center w-full">
            <RadarChart cx={150} cy={150} outerRadius={100} width={300} height={300} data={chartData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
              <PolarRadiusAxis angle={30} domain={[0, 4]} tick={false} />
              <Radar 
                name="Score" 
                dataKey="A" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.5} 
                strokeWidth={2}
              />
            </RadarChart>
          </div>
        ) : (
          <>
            {/* Header Section */}
            <div className="flex justify-between items-start border-b-4 border-emerald-600 pb-6 mb-8 mt-4">
          <div>
            <h1 className="text-3xl font-black tracking-widest uppercase text-[#0b0c10]">STIGMATECH</h1>
            <p className="text-sm font-bold text-gray-400 tracking-widest uppercase mt-1">{dict.pdf_report.division_label}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-500">{today}</p>
            <p className="text-lg font-black text-emerald-600 mt-1">{company || dict.pdf_report.organization_label}</p>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-[#0b0c10]">
            {dict.pdf_report.title}
          </h2>
          <p className="text-emerald-600 font-bold uppercase tracking-[0.2em] text-sm mt-2">
            {dict.pdf_report.subtitle}
          </p>
        </div>

        {/* Score & Tier Banner */}
        <div className="bg-emerald-50 border-l-8 border-emerald-600 p-8 rounded-lg mb-10 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">{dict.pdf_report.score_label}</p>
            <p className="text-5xl font-black text-emerald-600">{score.toFixed(0)}<span className="text-2xl text-gray-400">%</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">{dict.pdf_report.posture_label}</p>
            <p className="text-3xl font-black text-[#0b0c10] uppercase tracking-wider">{dict.results[tier]?.title}</p>
          </div>
        </div>

        {/* Radar Chart Section */}
        <div className="mb-10 text-center">
          <h3 className="text-lg font-black uppercase tracking-widest text-[#0b0c10] mb-6">
            {dict.pdf_report.radar_title}
          </h3>
          <div className="flex justify-center w-full">
            <RadarChart cx={300} cy={175} outerRadius={140} width={600} height={350} data={chartData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#374151', fontSize: 13, fontWeight: 'bold' }} />
              <PolarRadiusAxis angle={30} domain={[0, 4]} tick={{ fill: '#9ca3af' }} />
              <Radar 
                name="Score" 
                dataKey="A" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.4} 
                strokeWidth={3}
              />
            </RadarChart>
          </div>
        </div>

        {/* Priorities */}
        <div className="flex-1">
          <h3 className="text-lg font-black uppercase tracking-widest text-[#0b0c10] mb-6 border-b pb-2">
            {dict.pdf_report.roadmap_title}
          </h3>
          
          <div className="grid grid-cols-1 gap-6">
            {Object.entries(answers).filter(([_, s]) => s <= 2).slice(0, 3).map(([id], idx) => (
              <div key={id} className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center font-black text-emerald-600 shrink-0 border-2 border-emerald-200">{idx + 1}</div>
                <div className="flex-1 pt-2">
                  <p className="text-sm font-bold text-gray-950 uppercase tracking-tight mb-1">{dict.recommendations[id].title}</p>
                  <p className="text-sm text-gray-600 leading-snug">
                    {dict.recommendations[id].remedy || common?.audit?.investigation_required || "Investigation required."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 italic">
            {dict.pdf_report.disclaimer}
          </p>
          <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mt-2">www.stigmatech.ca</p>
        </div>
      </>
    )}
  </div>
    );
  }
);

Loi25AuditPdfReport.displayName = "Loi25AuditPdfReport";
