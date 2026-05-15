"use client";

import { useState } from "react";
import { TrainingBookingForm } from "@/components/training-booking-form";
import { SubsidyInquiryForm } from "@/components/subsidy-inquiry-form";

interface CourseFormSectionProps {
  lang: string;
  courseTitle: string;
  dictionary: any;
  price?: number;
}

export function CourseFormSection({ lang, courseTitle, dictionary, price = 2500 }: CourseFormSectionProps) {
  const [activeTab, setActiveTab] = useState<"booking" | "subsidy">("booking");
  const t = dictionary.training.formSection;
  const formattedPrice = price.toLocaleString(lang === 'fr' ? 'fr-CA' : 'en-CA');

  return (
    <div id="contact" className="bg-white overflow-hidden">
      {/* Section Header with Gradient Background */}
      <div className="relative bg-background-dark py-20 px-4 overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-white/5 blur-[100px] translate-y-1/2 -translate-x-1/4" />

        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-none bg-white text-[10px] font-bold tracking-[0.2em] text-surface-dark uppercase mb-6 shadow-sm border border-gray-100">
            {t.takeAction}
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6 tracking-tight leading-[1.1]">
            {t.bookOrFund} <span className="text-gray-300 ">{t.fundHighlight}</span> {t.yourTraining}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {t.subtitle.replace('{price}', formattedPrice)}
          </p>

          {/* Enhanced Tab Switcher */}
          <div className="inline-flex mt-12 bg-white/5 backdrop-blur-md p-0 border border-white/10 rounded-none">
            <button
              onClick={() => setActiveTab("booking")}
              className={`px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 rounded-none flex items-center gap-3 ${activeTab === "booking"
                ? "bg-white text-surface-dark"
                : "text-gray-400 hover:text-white"
                }`}
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              {t.tabBooking}
            </button>
            <button
              onClick={() => setActiveTab("subsidy")}
              className={`px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 rounded-none flex items-center gap-3 ${activeTab === "subsidy"
                ? "bg-white text-surface-dark"
                : "text-gray-400 hover:text-white"
                }`}
            >
              <span className="material-symbols-outlined text-[18px]">monetization_on</span>
              {t.tabSubsidy}
            </button>
          </div>
        </div>
      </div>

      {/* Form Area with better balance and cards */}
      <div className="relative py-24 px-4 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          {activeTab === "booking" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              {/* Left: Info Card */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-display font-bold text-surface-dark mb-6 leading-tight">
                    {t.bookingTitle}
                  </h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    {t.bookingDesc}
                  </p>
                </div>

                <div className="grid gap-4">
                  {[
                    { icon: "groups", title: t.featEmployeesTitle, desc: t.featEmployeesDesc },
                    { icon: "manage_accounts", title: t.featExecsTitle, desc: t.featExecsDesc },
                    { icon: "restaurant", title: t.featLunchTitle, desc: t.featLunchDesc },
                    { icon: "workspace_premium", title: t.featCertTitle, desc: t.featCertDesc },
                    { icon: "payments", title: t.featPriceTitle, desc: t.featPriceDesc.replace('{price}', formattedPrice) },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-none bg-white border border-gray-100 transition-all hover:border-surface-dark/30">

                      <div className="w-10 h-10 rounded-none bg-gray-50 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-surface-dark text-xl">{item.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-surface-dark">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-none bg-surface-dark text-white">
                  <p className="text-sm font-medium leading-relaxed opacity-90">
                    {t.bookingNotice}
                  </p>
                </div>
              </div>

              {/* Right: Form Card */}
              <div className="lg:col-span-7">
                <div className="bg-white p-8 lg:p-12 rounded-none border border-gray-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
                  {/* Accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-surface-dark rounded-none shadow-sm" />
                  <TrainingBookingForm lang={lang} courseTitle={courseTitle} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "subsidy" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              {/* Left: Info Card */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-display font-bold text-surface-dark mb-6 leading-tight">
                    {t.subsidyTitle}
                  </h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    {t.subsidyDesc}
                  </p>
                </div>

                <div className="grid gap-4">
                  {[
                    { icon: "auto_awesome", title: "Scale AI", desc: t.subScaleAIDesc },
                    { icon: "account_balance", title: "ESSOR (IQ)", desc: t.subEssorDesc },
                    { icon: "school", title: "MSSS / PACME", desc: t.subPacmeDesc },
                    { icon: "flag", title: "DEC IRIA", desc: t.subDecDesc },
                    { icon: "science", title: "PARI / CNRC", desc: t.subPariDesc },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-none bg-white border border-gray-100 transition-all hover:border-surface-dark/30">

                      <div className="w-10 h-10 rounded-none bg-gray-50 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-surface-dark text-xl">{item.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-surface-dark">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-none bg-surface-dark text-white">
                  <p className="text-sm font-medium leading-relaxed opacity-90">
                    {t.subsidyNotice}
                  </p>
                </div>
              </div>

              {/* Right: Form Card */}
              <div className="lg:col-span-7">
                <div className="bg-white p-8 lg:p-12 rounded-none border border-gray-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
                  {/* Accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-surface-dark rounded-none shadow-sm" />
                  <SubsidyInquiryForm lang={lang} courseTitle={courseTitle} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
