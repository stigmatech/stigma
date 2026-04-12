"use client";

import React, { useEffect } from 'react';
import Cal, { getCalApi } from "@calcom/embed-react";

export function BookingSection({
    dictionary,
    lang,
    overrides,
    variant = "default"
}: {
    dictionary: any;
    lang: string;
    overrides?: {
        title?: string;
        titleHighlight?: string;
        description?: string;
    };
    variant?: "default" | "elite";
}) {
    const isElite = variant === "elite";
    const dict = dictionary;

    const displayTitle = overrides?.title || dict.title;
    const displayTitleHighlight = overrides?.titleHighlight || dict.titleHighlight;
    const displayDescription = overrides?.description || dict.description;

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "30min" });
            cal("ui", {
                "theme": isElite ? "dark" : "light",
                "styles": { "branding": { "brandColor": isElite ? "#ffffff" : "#0b0c10" } },
                "hideEventTypeDetails": false,
                "layout": "month_view"
            });
        })();
    }, [isElite]);

    return (
        <section id="booking" className={`py-24 relative overflow-hidden transition-colors duration-500 ${isElite ? 'bg-slate-950 text-white' : 'bg-white'}`}>
            {/* Decorative background elements */}
            {!isElite && <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>}
            
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                <div className={`grid grid-cols-1 lg:grid-cols-4 gap-0 overflow-hidden group ${
                    isElite 
                    ? 'border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]' 
                    : 'shadow-[0_40px_100px_-20px_rgba(10,15,44,0.08)] border border-gray-100'
                }`}>

                    {/* Left Column: Persuasive Brand Content (1/4 width) */}
                    <div className={`lg:col-span-1 p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden ${
                        isElite ? 'bg-white text-slate-950' : 'bg-[#0b0c10] text-white'
                    }`}>
                        {/* Subtle background glow */}
                        <div className={`absolute -top-24 -left-24 w-64 h-64 rounded-none blur-3xl pointer-events-none ${
                            isElite ? 'bg-slate-900/10' : 'bg-white/5'
                        }`}></div>

                        <div className="relative z-10">
                            <span className={`inline-block px-4 py-1.5 border text-[10px] font-bold tracking-[0.2em] uppercase mb-8 ${
                                isElite ? 'bg-slate-950/5 border-slate-950/10 text-slate-950' : 'bg-white/5 border-white/10 text-white'
                            }`}>
                                {dict.tag}
                            </span>
                            <h2 className="text-2xl lg:text-3xl font-display font-black mb-6 leading-tight tracking-tight uppercase">
                                {displayTitle} <br />
                                <span className={isElite ? 'text-slate-500' : 'text-gray-400'}>{displayTitleHighlight}</span>
                            </h2>
                            <p className={`text-xs leading-relaxed mb-10 font-medium ${isElite ? 'text-slate-600' : 'text-gray-400'}`}>
                                {displayDescription}
                            </p>

                            <div className="space-y-4 mb-10">
                                {[
                                    { label: dict.values.client, icon: "person_check" },
                                    { label: dict.values.results, icon: "trending_up" },
                                    { label: dict.values.independent, icon: "verified_user" },
                                    { label: dict.values.transparency, icon: "visibility" }
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-3">
                                        <div className={`w-7 h-7 rounded-none flex items-center justify-center border ${
                                            isElite ? 'bg-slate-950/5 border-slate-950/10' : 'bg-white/5 border-white/10'
                                        }`}>
                                            <span className={`material-symbols-outlined text-[14px] ${isElite ? 'text-slate-950' : 'text-gray-400'}`}>{item.icon}</span>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${isElite ? 'text-slate-950' : 'text-gray-300'}`}>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`relative z-10 mt-8 pt-8 border-t flex flex-col gap-6 ${isElite ? 'border-slate-950/10' : 'border-white/10'}`}>
                            <div>
                                <h4 className={`text-[8px] font-black uppercase tracking-widest mb-3 ${isElite ? 'text-slate-400' : 'text-gray-500'}`}>{dict.onboardingFlow}</h4>
                                <div className="flex gap-4">
                                    {[dict.steps.schedule, dict.steps.consult, dict.steps.propose].map((step, idx) => (
                                        <div key={idx} className="flex flex-col gap-1">
                                            <span className={`text-base font-black ${isElite ? 'text-slate-950/20' : 'text-white/20'}`}>0{idx + 1}</span>
                                            <p className={`text-[7px] uppercase font-black tracking-wider ${isElite ? 'text-slate-950' : 'text-gray-400'}`}>{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={`p-5 border ${isElite ? 'bg-slate-950 text-white border-transparent' : 'bg-white/5 border-white/10'}`}>
                                <p className={`text-[8px] uppercase font-black tracking-[0.2em] mb-1 ${isElite ? 'text-white/40' : 'text-gray-500'}`}>{dict.supportLine}</p>
                                <p className="text-lg font-display font-black tracking-tight">+1 855-552-1005</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Scheduler Interface (3/4 width) */}
                    <div className={`lg:col-span-3 p-6 lg:p-10 flex flex-col h-full border-l relative ${
                        isElite ? 'bg-slate-900 border-white/5' : 'bg-white border-gray-100'
                    }`}>
                        <div className="mb-8 block">
                            <h3 className={`text-2xl font-display font-black uppercase tracking-tight mb-2 ${isElite ? 'text-white' : 'text-[#0b0c10]'}`}>
                                {dict.schedulerTitle}
                            </h3>
                            <p className={`text-[13px] leading-relaxed max-w-sm font-light tracking-tight ${isElite ? 'text-slate-400' : 'text-gray-500'}`}>
                                {dict.schedulerDescription}
                            </p>
                        </div>

                        <div className={`flex-1 w-full min-h-[500px] border ${
                            isElite ? 'bg-slate-950/50 border-white/5' : 'bg-gray-50/20 border-gray-100'
                        }`}>
                            <Cal
                                namespace="30min"
                                calLink="stigmatech/30min"
                                style={{ width: "100%", height: "100%", minHeight: "500px" }}
                                config={{ 
                                    "layout": "month_view", 
                                    "theme": isElite ? "dark" : "light",
                                    "ui.lang": lang
                                }}
                            />
                        </div>

                        <div className={`mt-10 flex items-center justify-center gap-4 text-[10px] font-black tracking-[0.3em] uppercase ${
                            isElite ? 'text-slate-500' : 'text-gray-400'
                        }`}>
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-none animate-pulse"></span>
                            {dict.secureBooking}
                        </div>
                    </div>
                </div>
            </div>

            {isElite && (
                <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10 rotate-[-15deg]"></div>
            )}
        </section>
    );
}
