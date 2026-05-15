"use client";

import { useState } from "react";

interface Props {
  lang: string;
  dictionary: any;
}

const PRIORITY_COLORS: Record<string, string> = {
  low: "text-emerald-400 bg-emerald-400/10 border-emerald-500/20",
  medium: "text-blue-400 bg-blue-400/10 border-blue-500/20",
  high: "text-amber-400 bg-amber-400/10 border-amber-500/20",
  urgent: "text-red-400 bg-red-400/10 border-red-500/20",
};

export default function DashboardSupportClient({ lang, dictionary }: Props) {
  const isFr = lang === "fr";
  const t = dictionary?.common?.dashboard?.support || {};

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [priority, setPriority] = useState("medium");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const priorityKeys = ["low", "medium", "high", "urgent"];

  return (
    <div className="p-12 max-w-7xl mx-auto space-y-12 pb-24">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <section className="space-y-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">
              {t?.header}
            </span>
          </div>
          <h1 className="text-4xl font-display font-black text-white tracking-tighter uppercase leading-none">
            {t?.title}
          </h1>
          <p className="text-slate-400 text-sm max-w-xl font-light leading-relaxed">
            {t?.description}
          </p>
        </div>

        {/* Insight Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active Tickets */}
          <div className="dashboard-card p-8 group overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/5 rounded-lg group-hover:bg-purple-500/10 transition-colors">
                <span className="material-symbols-outlined text-white/40 group-hover:text-purple-400 transition-colors">
                  confirmation_number
                </span>
              </div>
              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-500/20 px-3 py-1 uppercase tracking-widest">
                Active
              </span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
              {t?.tiles?.tickets}
            </p>
            <h3 className="text-4xl font-display font-black text-white">0</h3>
          </div>

          {/* Avg Response */}
          <div className="dashboard-card p-8 group overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/5 rounded-lg group-hover:bg-blue-500/10 transition-colors">
                <span className="material-symbols-outlined text-white/40 group-hover:text-blue-400 transition-colors">
                  schedule
                </span>
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
              {t?.tiles?.responseTime}
            </p>
            <h3 className="text-4xl font-display font-black text-white">&lt; 4h</h3>
          </div>

          {/* System Status */}
          <div className="dashboard-card p-8 group overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/5 rounded-lg group-hover:bg-emerald-500/10 transition-colors">
                <span className="material-symbols-outlined text-white/40 group-hover:text-emerald-400 transition-colors">
                  verified
                </span>
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
              {t?.tiles?.status}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <h3 className="text-xl font-display font-black text-emerald-400 uppercase tracking-widest">
                Operational
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Grid ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Panel */}
        <div className="lg:col-span-2">
          <div className="dashboard-card p-10 relative overflow-hidden">
            {/* Decorative watermark */}
            <span className="material-symbols-outlined absolute bottom-6 right-6 text-[128px] text-white/[0.02] pointer-events-none select-none rotate-12">
              support_agent
            </span>

            <div className="relative z-10">
              <h2 className="text-2xl font-display font-black text-white uppercase tracking-tighter mb-10 flex items-center gap-4">
                <span className="w-8 h-px bg-purple-500/50" />
                {t?.form?.title}
              </h2>

              {isSuccess ? (
                /* ── Success State ─────────────────────────────── */
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-16 text-center space-y-6">
                  <span className="material-symbols-outlined text-[64px] text-emerald-400 block">
                    check_circle
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-white font-black uppercase tracking-widest text-sm">
                      {t?.form?.success}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setSubject("");
                      setDescription("");
                      setPriority("medium");
                    }}
                    className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 hover:text-white transition-colors border-b border-emerald-500/30 pb-px"
                  >
                    {isFr ? "Ouvrir un autre ticket" : "Open another ticket"}
                  </button>
                </div>
              ) : (
                /* ── Ticket Form ─────────────────────────────────── */
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Subject */}
                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
                      {t?.form?.subject}
                    </label>
                    <input
                      required
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={t?.form?.subjectPlaceholder}
                      className="w-full bg-white/5 border-b border-white/10 px-4 py-4 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-white/10 font-light"
                    />
                  </div>

                  {/* Priority */}
                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
                      {t?.form?.priority}
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {priorityKeys.map((key) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setPriority(key)}
                          className={`px-6 py-3 text-[9px] font-black uppercase tracking-[0.3em] border transition-all duration-200 ${
                            priority === key
                              ? PRIORITY_COLORS[key]
                              : "bg-white/5 border-white/10 text-white/30 hover:text-white hover:border-white/20"
                          }`}
                        >
                          {t?.priorities?.[key]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
                      {t?.form?.description}
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t?.form?.descriptionPlaceholder}
                      className="w-full bg-white/5 border border-white/10 px-6 py-5 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-white/10 font-light leading-relaxed resize-none"
                    />
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3 text-white/20">
                      <span className="material-symbols-outlined text-[16px]">info</span>
                      <span className="text-[8px] font-black uppercase tracking-[0.2em]">
                        {isFr
                          ? "Réponse garantie sous 4h ouvrables"
                          : "Guaranteed response within 4 business hours"}
                      </span>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-10 py-5 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center gap-3 shadow-2xl shadow-purple-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t?.form?.sending}
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[18px]">send</span>
                          {t?.form?.submit}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Contact Sidebar */}
        <div className="space-y-6">
          {/* Priority Channels */}
          <div className="dashboard-card p-10 space-y-8">
            <h2 className="text-xl font-display font-black text-white uppercase tracking-tighter flex items-center gap-3">
              <span className="w-4 h-px bg-white/20" />
              {t?.contact?.title}
            </h2>

            <div className="space-y-6">
              <a
                href="tel:+18555521005"
                className="group flex items-center gap-4 hover:bg-white/5 p-3 -m-3 transition-colors"
              >
                <div className="p-3 bg-white/5 group-hover:bg-purple-500/20 transition-colors flex-shrink-0">
                  <span className="material-symbols-outlined text-white/40 group-hover:text-purple-400 transition-colors text-[20px]">
                    call
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                    {t?.contact?.vip}
                  </p>
                  <p className="text-lg font-display font-black text-white group-hover:text-purple-400 transition-colors">
                    +1 855-552-1005
                  </p>
                </div>
              </a>

              <a
                href="mailto:support@stigmatech.ca"
                className="group flex items-center gap-4 hover:bg-white/5 p-3 -m-3 transition-colors"
              >
                <div className="p-3 bg-white/5 group-hover:bg-purple-500/20 transition-colors flex-shrink-0">
                  <span className="material-symbols-outlined text-white/40 group-hover:text-purple-400 transition-colors text-[20px]">
                    mail
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                    {t?.contact?.email}
                  </p>
                  <p className="text-sm font-black text-white/80 group-hover:text-purple-400 transition-colors truncate">
                    support@stigmatech.ca
                  </p>
                </div>
              </a>
            </div>

            <div className="pt-6 border-t border-white/5">
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 leading-relaxed">
                {isFr
                  ? "Service VIP réservé aux clients enregistrés. Urgences Niveau 1 disponibles 24/7."
                  : "VIP service for registered clients. Level 1 emergencies available 24/7."}
              </p>
            </div>
          </div>

          {/* Knowledge Base (Coming Soon) */}
          <div className="dashboard-card p-10 bg-gradient-to-br from-indigo-600/5 to-transparent border-indigo-500/10">
            <div className="space-y-5">
              <div className="p-3 bg-indigo-500/10 w-fit">
                <span className="material-symbols-outlined text-indigo-400 text-[24px]">
                  menu_book
                </span>
              </div>
              <div>
                <h3 className="text-white font-black uppercase tracking-tighter text-lg mb-2">
                  {isFr ? "Base de Connaissances" : "Knowledge Base"}
                </h3>
                <p className="text-slate-500 text-xs font-light leading-relaxed">
                  {isFr
                    ? "Documentation technique et guides de déploiement pour l'auto-résolution."
                    : "Technical documentation and deployment guides for self-service resolution."}
                </p>
              </div>
              <span className="inline-block text-[9px] font-black uppercase tracking-widest text-indigo-400/50 border border-indigo-500/20 px-4 py-2">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
