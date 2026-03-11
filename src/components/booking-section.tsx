"use client";

import React, { useEffect } from 'react';
import Cal, { getCalApi } from "@calcom/embed-react";

export function BookingSection({
    dictionary,
    overrides
}: {
    dictionary: any;
    overrides?: {
        title?: string;
        titleHighlight?: string;
        description?: string;
    };
}) {
    const dict = dictionary;

    const displayTitle = overrides?.title || dict.title;
    const displayTitleHighlight = overrides?.titleHighlight || dict.titleHighlight;
    const displayDescription = overrides?.description || dict.description;

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "30min" });
            cal("ui", {
                "theme": "light",
                "styles": { "branding": { "brandColor": "#0b0c10" } },
                "hideEventTypeDetails": false,
                "layout": "month_view"
            });
        })();
    }, []);

    return (
        <section id="booking" className="py-24 bg-white relative overflow-hidden">
            {/* Soft decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 shadow-[0_40px_100px_-20px_rgba(10,15,44,0.08)] border border-gray-100 overflow-hidden group">

                    {/* Left Column: Persuasive Brand Content (1/4 width) */}
                    <div className="lg:col-span-1 bg-[#0b0c10] text-white p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
                        {/* Subtle background glow */}
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/5 rounded-none blur-3xl pointer-events-none"></div>

                        <div className="relative z-10">
                            <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                                {dict.tag}
                            </span>
                            <h2 className="text-2xl lg:text-3xl font-display font-bold mb-6 leading-tight tracking-tight">
                                {displayTitle} <br />
                                <span className="text-gray-400">{displayTitleHighlight}</span>
                            </h2>
                            <p className="text-gray-400 text-xs leading-relaxed mb-10">
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
                                        <div className="w-6 h-6 rounded-none bg-white/5 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-gray-400 text-[14px]">{item.icon}</span>
                                        </div>
                                        <span className="text-[11px] font-medium text-gray-300">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative z-10 mt-8 pt-8 border-t border-white/10 flex flex-col gap-6">
                            <div>
                                <h4 className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-3">{dict.onboardingFlow}</h4>
                                <div className="flex gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-base font-bold text-white/20">01</span>
                                        <p className="text-[7px] uppercase font-bold tracking-wider text-gray-400">{dict.steps.schedule}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-base font-bold text-white/20">02</span>
                                        <p className="text-[7px] uppercase font-bold tracking-wider text-gray-400">{dict.steps.consult}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-base font-bold text-white/20">03</span>
                                        <p className="text-[7px] uppercase font-bold tracking-wider text-gray-400">{dict.steps.propose}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-4">
                                <p className="text-[8px] text-gray-500 uppercase font-extrabold tracking-widest mb-1">{dict.supportLine}</p>
                                <p className="text-base font-display font-bold text-white tracking-tight">+1 (844) 978-4462</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Scheduler Interface (3/4 width) */}
                    <div className="lg:col-span-3 bg-white p-6 lg:p-10 flex flex-col h-full border-l border-gray-100 relative">
                        <div className="mb-6 block">
                            <h3 className="text-xl font-display font-bold text-[#0b0c10] mb-1">{dict.schedulerTitle}</h3>
                            <p className="text-gray-500 text-[13px] leading-relaxed max-w-sm">
                                {dict.schedulerDescription}
                            </p>
                        </div>

                        <div className="flex-1 w-full min-h-[500px] bg-gray-50/20 border border-gray-100">
                            <Cal
                                namespace="30min"
                                calLink="stigmatech/30min"
                                style={{ width: "100%", height: "100%", minHeight: "500px" }}
                                config={{ "layout": "month_view", "theme": "light" }}
                            />
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-4 text-gray-400 text-[10px] font-bold tracking-wider uppercase">
                            <span className="w-1 h-1 bg-green-500 rounded-none animate-pulse"></span>
                            {dict.secureBooking}
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>
        </section>
    );
}
