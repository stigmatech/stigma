"use client";

import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

interface AiAuditPdfReportProps {
  score: number;
  tier: string;
  answers: Record<string, number>;
  dict: any; // This will be the aiAudit object from the dictionary
  lang: string;
  company: string;
  isDashboard?: boolean;
  common?: any;
}

// Forward ref to allow html2canvas to capture the element wrapper
export const AiAuditPdfReport = React.forwardRef<HTMLDivElement, AiAuditPdfReportProps>(
  ({ score, tier, answers, dict, lang, company, isDashboard = false, common }, ref) => {
    if (!dict || !dict.pdf_report) return null;

    // ... Prepare data for Radar Chart
    const chartData = [
      { subject: dict.pdf_report.radar.volume, A: answers.volume || 0, fullMark: 4 },
      { subject: dict.pdf_report.radar.repetition, A: answers.repetition || 0, fullMark: 4 },
      { subject: dict.pdf_report.radar.support, A: answers.support || 0, fullMark: 4 },
      { subject: dict.pdf_report.radar.tools, A: answers.tools || 0, fullMark: 4 },
      { subject: dict.pdf_report.radar.centralization, A: answers.centralization || 0, fullMark: 4 },
      { subject: dict.pdf_report.radar.adoption, A: answers.adoption || 0, fullMark: 4 },
      { subject: dict.pdf_report.radar.complexity, A: answers.complexity || 0, fullMark: 4 },
    ];

    // ...
    const today = new Date().toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // ...
    const sortedCats = Object.entries(answers)
      .sort(([, a], [, b]) => b - a);
    
    const featuredCat = sortedCats[0]?.[0];
    const featuredAgent = (featuredCat && dict.recommendations) ? dict.recommendations[featuredCat] : null;

    if (isDashboard) {
      return (
        <div className="flex justify-center w-full">
          <RadarChart 
            cx={150} 
            cy={150} 
            outerRadius={100} 
            width={300} 
            height={300} 
            data={chartData}
          >
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
            <PolarRadiusAxis angle={30} domain={[0, 4]} tick={false} />
            <Radar 
              name="Score" 
              dataKey="A" 
              stroke="#2563eb" 
              fill="#3b82f6" 
              fillOpacity={0.4} 
              strokeWidth={3}
            />
          </RadarChart>
        </div>
      );
    }

    return (
      <div 
        ref={ref}
        className="bg-white text-gray-900 w-[790px] h-auto min-h-[1115px] p-12 flex flex-col font-sans relative"
        style={{ position: 'absolute', top: '-10000px', left: '-10000px', zIndex: -10 }}
      >
        {/* Header Section */}
        <div className="flex justify-between items-start border-b-4 border-blue-600 pb-6 mb-8 mt-4">
          <div>
            <h1 className="text-3xl font-black tracking-widest uppercase text-[#0b0c10]">STIGMATECH</h1>
            <p className="text-sm font-bold text-gray-400 tracking-widest uppercase mt-1">{dict.pdf_report.division_label}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-500">{today}</p>
            <p className="text-lg font-black text-blue-600 mt-1">{company || dict.pdf_report.organization_label}</p>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-[#0b0c10]">
            {dict.pdf_report.title}
          </h2>
          <p className="text-blue-600 font-bold uppercase tracking-[0.2em] text-sm mt-2">
            {dict.pdf_report.subtitle}
          </p>
        </div>

        {/* Score & Tier Banner */}
        <div className="bg-blue-50 border-l-8 border-blue-600 p-8 rounded-lg mb-10 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">{dict.pdf_report.score_label}</p>
            <p className="text-5xl font-black text-blue-600">{score}<span className="text-2xl text-gray-400">/100</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">{dict.pdf_report.expertise_label}</p>
            <p className="text-3xl font-black text-[#0b0c10] uppercase tracking-wider">{dict.results[tier]?.title}</p>
          </div>
        </div>

        {/* Radar Chart Section */}
        <div className="mb-10">
          <h3 className="text-lg font-black uppercase tracking-widest text-[#0b0c10] mb-6 text-center">
            {dict.pdf_report.radar_title}
          </h3>
          <div className="flex justify-center w-full">
            <RadarChart 
              cx={300} 
              cy={175} 
              outerRadius={140} 
              width={600} 
              height={350} 
              data={chartData}
            >
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#374151', fontSize: 13, fontWeight: 'bold' }} />
              <PolarRadiusAxis angle={30} domain={[0, 4]} tick={{ fill: '#9ca3af' }} />
              <Radar 
                name="Score" 
                dataKey="A" 
                stroke="#2563eb" 
                fill="#3b82f6" 
                fillOpacity={0.4} 
                strokeWidth={3}
              />
            </RadarChart>
          </div>
        </div>

        {/* Recommendations Roadmap */}
        <div className="flex-1">
          <h3 className="text-lg font-black uppercase tracking-widest text-[#0b0c10] mb-6 border-b pb-2">
            {dict.pdf_report.roadmap_title}
          </h3>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-black text-blue-600 shrink-0 border-2 border-blue-200">1</div>
              <div className="flex-1 pt-2">
                <p className="text-sm font-bold text-gray-800">
                  {dict.pdf_report.roadmap.month1.replace('${agent}', featuredAgent?.title || 'IA')}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-black text-blue-600 shrink-0 border-2 border-blue-200">2</div>
              <div className="flex-1 pt-2">
                <p className="text-sm font-bold text-gray-800">
                  {dict.pdf_report.roadmap.month2.replace('${agent}', featuredAgent?.title || 'IA')}
                </p>
                {featuredAgent && (
                  <div className="mt-3 bg-blue-50/50 p-4 border border-blue-100 rounded">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">{common?.audit?.priority_label || "Priority Focus"} :</p>
                    <p className="text-sm text-gray-700 leading-snug">
                      <span className="font-bold text-[#0b0c10]">{featuredAgent.title} :</span> {featuredAgent.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-black text-blue-600 shrink-0 border-2 border-blue-200">3</div>
              <div className="flex-1 pt-2">
                <p className="text-sm font-bold text-gray-800">
                  {dict.pdf_report.roadmap.month3.replace('${agent}', featuredAgent?.title || 'IA')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-12 text-center pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 ">
            {dict.pdf_report.disclaimer}
          </p>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-2">www.stigmatech.ca</p>
        </div>
      </div>
    );
  }
);

AiAuditPdfReport.displayName = "AiAuditPdfReport";
