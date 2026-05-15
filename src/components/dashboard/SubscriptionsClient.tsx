"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";
import type { Pax8Subscription } from "@/lib/pax8";
import { SubscriptionCard } from "@/components/dashboard/subscription-card";
import { Locale } from "@/i18n-config";

interface SubscriptionsClientProps {
  lang: Locale;
  dict: any;
}

export default function SubscriptionsClient({ lang, dict }: SubscriptionsClientProps) {
  const isFr = lang === "fr";
  const dashboard = dict.common.dashboard.subscriptions;

  const [subscriptions, setSubscriptions] = useState<Pax8Subscription[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<{ planId: string; quantity: number } | null>(null);
  const allPlans = dict.pme?.pricing?.plans || [];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check for success from Stripe
    if (urlParams.get("success") === "true") {
      setSuccess(true);
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }

    // Check for pending order from registration/login
    const planId = urlParams.get("plan");
    const quantity = urlParams.get("quantity");
    if (planId) {
      setPendingOrder({
        planId,
        quantity: parseInt(quantity || "5")
      });
      // Don't clean up URL yet so user knows what they are confirming, or clean it up if you want a clean UI
    }

    fetch("/api/pax8/subscriptions")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setSubscriptions(data.subscriptions || []);
        setCompanyName(data.company_name || "");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = (subscriptionId: string, updatedSub: any) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === subscriptionId ? { ...sub, ...updatedSub } : sub
      )
    );
  };

  const handleFinalCheckout = async () => {
    if (!pendingOrder) return;
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          productId: pendingOrder.planId,
          lang: lang,
          isInternalPlan: true,
          quantity: pendingOrder.quantity
        })
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error("No URL returned");
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  const activeCount = subscriptions.filter((s) => s.status === "Active").length;
  const totalSeats = subscriptions
    .filter((s) => s.status === "Active")
    .reduce((acc, s) => acc + s.quantity, 0);

  const hasSupport360 = subscriptions.some(sub => 
    sub.isInternal || 
    sub.productName.toLowerCase().includes("support 360") ||
    sub.productName.toLowerCase().includes("essentiel") ||
    sub.productName.toLowerCase().includes("pro") ||
    sub.productName.toLowerCase().includes("elite")
  );

  return (
    <div className="p-12 max-w-7xl mx-auto space-y-12 pb-24">
      {/* Header Section */}
      <section>
        {success && (
          <div className="mb-12 bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-none flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-emerald-400">check_circle</span>
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest">{dashboard.pendingOrder?.success || "Commande réussie"}</h3>
              <p className="text-xs text-white/40 mt-1">{dashboard.pendingOrder?.syncNote || "Votre forfait a été activé. La synchronisation avec Pax8 peut prendre quelques minutes."}</p>
            </div>
            <button onClick={() => setSuccess(false)} className="ml-auto text-white/20 hover:text-white transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        )}

        {pendingOrder && (
          <div className="mb-12 bg-blue-600/10 border border-blue-500/20 p-8 rounded-none flex flex-col md:flex-row items-center justify-between gap-8 animate-in fade-in zoom-in duration-500 shadow-[0_20px_50px_rgba(37,99,235,0.1)]">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-blue-400 text-3xl">shopping_cart</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-black text-white uppercase tracking-tighter">{dashboard.pendingOrder?.title || "Finalisez votre commande"}</h3>
                <p className="text-sm text-white/40 mt-1">
                  {(dashboard.pendingOrder?.details || "Plan : {plan} • Sièges : {quantity}")
                    .replace("{plan}", allPlans.find((p: any) => p.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === pendingOrder.planId)?.name || pendingOrder.planId)
                    .replace("{quantity}", pendingOrder.quantity.toString())}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button 
                onClick={() => {
                  setPendingOrder(null);
                  const newUrl = window.location.pathname;
                  window.history.replaceState({}, "", newUrl);
                }}
                className="flex-1 md:flex-none px-8 py-4 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40 hover:bg-white/5 transition-colors"
              >
                {dashboard.pendingOrder?.cancel || "Annuler"}
              </button>
              <button 
                onClick={handleFinalCheckout}
                disabled={loading}
                className="flex-1 md:flex-none px-12 py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] disabled:opacity-50"
              >
                {loading ? (dashboard.pendingOrder?.loading || "Chargement...") : (dashboard.pendingOrder?.confirm || "Confirmer et Payer")}
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">
                {dashboard.performance}
              </span>
            </div>
            <h1 className="text-4xl font-display font-black text-white tracking-tighter">
              {companyName || dashboard.title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={async () => {
                const res = await fetch("/api/stripe/portal", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ lang }),
                });
                const data = await res.json();
                if (data.url) window.location.href = data.url;
                else alert(dashboard.billingError);
              }}
              className="flex items-center gap-3 px-6 py-4 bg-white text-[#080910] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/90 transition-all duration-300"
            >
              <span className="material-symbols-outlined text-[18px]">payments</span>
              {dashboard.manageBilling}
            </button>

            <Link
              href={`/${lang}/dashboard/marketplace`}
              className="flex items-center gap-3 px-6 py-4 bg-purple-600 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-purple-500 transition-all duration-300 shadow-lg shadow-purple-900/20"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_basket</span>
              {dict.common.nav.marketplace.title}
            </Link>
          </div>
        </div>

        {/* Insight Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="dashboard-card p-8 group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/5 rounded-lg">
                <span className="material-symbols-outlined text-white/40 group-hover:text-purple-400 transition-colors">apps</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Live</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">{dashboard.activeProducts}</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-4xl font-display font-black text-white">{activeCount}</h3>
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                {activeCount > 1 ? dashboard.stigmaPlans.seats : dashboard.stigmaPlans.seat}
              </span>
            </div>
          </div>

          <div className="dashboard-card p-8 group relative overflow-hidden backdrop-blur-xl bg-white/3 border-white/5 hover:border-blue-500/30 transition-all duration-500">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <span className="material-symbols-outlined text-white/40 group-hover:text-blue-400 transition-colors">group</span>
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2 relative z-10">{dashboard.totalUsers}</p>
            <div className="flex items-baseline gap-1 relative z-10">
              <h3 className="text-4xl font-display font-black text-white">{totalSeats}</h3>
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{dashboard.stigmaPlans.seats}</span>
            </div>
          </div>

          <div className="dashboard-card p-8 group relative overflow-hidden backdrop-blur-xl bg-white/3 border-white/5 hover:border-emerald-500/30 transition-all duration-500">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <span className="material-symbols-outlined text-white/40 group-hover:text-emerald-400 transition-colors">sync</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">{dashboard.stigmaPlans.live}</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2 relative z-10">{dashboard.lastSync}</p>
            <h3 className="text-xl font-bold text-white/80 mt-2 lowercase font-mono relative z-10">
              {new Date().toLocaleTimeString(isFr ? "fr-CA" : "en-CA", { hour: '2-digit', minute: '2-digit' })}
            </h3>
          </div>
        </div>
      </section>
 
      {/* Subscription Grid */}
      <section className="space-y-8">
        {!hasSupport360 && !loading && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-10 bg-linear-to-r from-blue-600 to-blue-800 border border-blue-400/30 relative overflow-hidden group">
               {/* Decorative background element */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/10 transition-all duration-700" />
               
               <div className="relative z-10 space-y-4 max-w-2xl">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                   <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                   <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">
                     {dashboard.upsell?.recommended || "RECOMMENDED"}
                   </span>
                 </div>
                 <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter leading-none">
                   {dashboard.upsell?.title || "Activate your Support 360 protection"}
                 </h2>
                 <p className="text-sm text-blue-100 font-medium leading-relaxed opacity-80">
                   {dashboard.upsell?.description || "Power your business with our complete managed services."}
                 </p>
               </div>
 
               <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
                 <div className="text-center md:text-right hidden sm:block">
                   <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1 opacity-60">
                     {dashboard.upsell?.startingAt || "Starting at"}
                   </p>
                   <p className="text-3xl font-display font-black text-white">15$<span className="text-sm opacity-40">/{isFr ? "siège" : "seat"}</span></p>
                 </div>
                 <button 
                   onClick={() => document.getElementById('support-360-plans')?.scrollIntoView({ behavior: 'smooth' })}
                   className="w-full sm:w-auto px-10 py-5 bg-white text-blue-700 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-50 transition-all shadow-2xl shadow-blue-900/40"
                 >
                   {dashboard.upsell?.cta || "Discover Plans"}
                 </button>
               </div>
            </div>
          </div>
        )}
 
        <div className="flex items-center gap-4 pt-8">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/30">{dashboard.listTitle}</h2>
          <div className="flex-1 h-px bg-white/5" />
        </div>
 
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="dashboard-card p-8 h-64 animate-pulse bg-white/5" />
            ))}
          </div>
        ) : error ? (
          <div className="dashboard-card p-12 text-center border-red-500/20">
            <span className="material-symbols-outlined text-[48px] text-red-400 mb-4">error_outline</span>
            <h3 className="text-lg font-bold text-white mb-2">{dashboard.connectionError}</h3>
            <p className="text-white/40 text-sm mb-8">{error}</p>
            <button onClick={() => window.location.reload()} className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest">{dashboard.retry}</button>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="space-y-12">
            <div className="dashboard-card p-16 text-center">
              <div className="mb-8 p-6 inline-block bg-white/5 rounded-full">
                <span className="material-symbols-outlined text-[48px] text-purple-400">rocket_launch</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">
                {dashboard.emptyState.title}
              </h3>
              <p className="max-w-md mx-auto text-white/40 text-sm mb-12 leading-relaxed">
                {dashboard.emptyState.description}
              </p>
              <Link
                href={`/${lang}/marketplace`}
                className="px-12 py-5 bg-purple-600 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-purple-50 transition-all duration-300"
              >
                {dashboard.emptyState.cta}
              </Link>
            </div>
 
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: dashboard.categories.security, icon: "shield", label: "Acronis, SentinelOne", href: "/marketplace?category=security" },
                { title: dashboard.categories.compute, icon: "cloud", label: "Azure, AWS", href: "/marketplace?category=compute" },
                { title: dashboard.categories.apps, icon: "grid_view", label: "Microsoft 365, Pax8", href: "/marketplace?category=apps" },
                { title: dashboard.categories.draas, icon: "backup", label: "Veeam, Datto", href: "/marketplace?category=draas" }
              ].map((cat, i) => (
                <Link 
                  key={i} 
                  href={`/${lang}${cat.href}`}
                  className="dashboard-card p-8 flex flex-col items-center text-center group transition-all duration-500 hover:border-purple-500/30 hover:bg-white/5 backdrop-blur-xl border-white/5"
                >
                  <div className="w-12 h-12 bg-white/5 border border-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:border-purple-500 transition-all duration-500">
                    <span className="material-symbols-outlined text-white/20 group-hover:text-white transition-colors">{cat.icon}</span>
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-3">{cat.title}</h4>
                  <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest">{cat.label}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {subscriptions.map((sub) => (
              <SubscriptionCard
                key={sub.id}
                subscription={sub}
                lang={lang}
                dict={dict}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        )}
      </section>

      {/* Stigma Support 360 Plans Section */}
      <section id="support-360-plans" className="space-y-12 pt-12 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500">
              {dashboard.stigmaPlans?.title || "Solutions Support 360"}
            </h2>
            <p className="text-xl font-display font-black text-white uppercase tracking-tighter">
              {dashboard.stigmaPlans?.subtitle || "Cybersécurité et Conformité"}
            </p>
          </div>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest bg-white/5 px-4 py-2 border border-white/10">
            {dashboard.stigmaPlans?.minSeats || "Minimum 5 sièges"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allPlans.map((plan: any, i: number) => {
            const planId = plan.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            // Use a local state for seat quantities of these specific plans
            // We'll initialize it to 5
            return (
              <div key={i} className={`dashboard-card p-8 flex flex-col group transition-all duration-500 hover:border-blue-500/30 ${plan.popular ? 'border-blue-500/20 bg-blue-500/5' : ''}`}>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">
                      {dashboard.stigmaPlans?.plans?.[planId.toLowerCase()] || plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-display font-black text-white">{plan.price}$</span>
                      <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{dashboard.stigmaPlans?.perSeat || "/ siège / mois"}</span>
                    </div>
                  </div>
                  {plan.popular && (
                    <span className="text-[8px] font-black uppercase tracking-widest bg-blue-600 text-white px-2 py-1">
                      {dashboard.stigmaPlans.bestValue}
                    </span>
                  )}
                </div>

                <ul className="space-y-4 mb-10 grow">
                  {plan.features.slice(0, 5).map((feat: string, j: number) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-blue-500 text-sm mt-0.5">check_circle</span>
                      <span className="text-xs text-white/60 font-medium leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5">
                     <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">
                       {dashboard.stigmaPlans.seats}
                     </span>
                     <div className="flex items-center gap-4">
                        <button 
                          onClick={() => {
                            const input = document.getElementById(`qty-${planId}`) as HTMLInputElement;
                            if (input) {
                              const val = Math.max(5, parseInt(input.value) - 1);
                              input.value = val.toString();
                            }
                          }}
                          className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white"
                        >
                          -
                        </button>
                        <input 
                          id={`qty-${planId}`}
                          type="number" 
                          defaultValue="5"
                          min="5"
                          className="w-8 bg-transparent text-center text-sm font-black text-blue-400 border-none focus:ring-0"
                        />
                        <button 
                          onClick={() => {
                            const input = document.getElementById(`qty-${planId}`) as HTMLInputElement;
                            if (input) {
                              const val = parseInt(input.value) + 1;
                              input.value = val.toString();
                            }
                          }}
                          className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white"
                        >
                          +
                        </button>
                     </div>
                  </div>

                  <button 
                    onClick={async () => {
                      const qty = parseInt((document.getElementById(`qty-${planId}`) as HTMLInputElement)?.value || "5");
                      setLoading(true);
                      try {
                        const res = await fetch("/api/stripe/checkout", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ 
                            productId: planId,
                            lang: lang,
                            isInternalPlan: true,
                            quantity: qty
                          })
                        });
                        const data = await res.json();
                        if (data.url) window.location.href = data.url;
                        else throw new Error("No URL returned");
                      } catch (e: any) {
                        setError(e.message);
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                    className={`w-full py-4 text-[10px] font-black uppercase tracking-widest transition-all ${
                      plan.popular 
                      ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_10px_20px_rgba(37,99,235,0.2)]' 
                      : 'bg-white text-black hover:bg-white/90'
                    }`}
                  >
                    {loading ? (dashboard.pendingOrder?.loading || "Chargement...") : (dashboard.stigmaPlans?.subscribe || "S'abonner")}
                  </button>
                </div>
              </div>
            );
          })}
          
          {/* Custom Plan / Enterprise Proposal */}
           <div className="dashboard-card p-8 flex flex-col group border-dashed border-white/10 hover:border-blue-500/30 transition-all duration-500 bg-white/1">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">
                  {dashboard.customPlan?.title || "Custom Plan"}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-display font-black text-white">{dashboard.customPlan?.price || "Custom"}</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                <span className="material-symbols-outlined text-blue-400">enterprise</span>
              </div>
            </div>

            <p className="text-xs text-white/40 mb-10 grow leading-relaxed">
              {dashboard.customPlan?.description || "Have specific needs or a team of 50+ users? We design tailored architectural and cybersecurity solutions adapted to your business reality."}
            </p>

            <Link
              href={`/${lang}/contact`}
              className="w-full py-4 bg-white/5 text-white text-[10px] font-black uppercase tracking-widest text-center border border-white/10 hover:bg-white/10 hover:border-blue-500/40 transition-all"
            >
              {dashboard.customPlan?.cta || "Propose a Plan"}
            </Link>
          </div>
        </div>
      </section>

      {/* Support Footer */}
      <footer className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4 opacity-40">
          <NextImage src="/logoStigmaTechnologies188x64.png" width={80} height={27} alt="Logo" className="grayscale brightness-0 invert" />
          <div className="w-px h-8 bg-white/20" />
          <p className="text-[9px] font-medium uppercase tracking-widest text-white/60">
            {dashboard.footer.certified}
          </p>
        </div>
        <div className="flex gap-8">
          <div className="text-right">
            <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">{dashboard.footer.support}</p>
            <p className="text-xs font-bold text-white">+1 855-552-1005</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">{dashboard.footer.status}</p>
            <p className="flex items-center justify-end gap-2 text-xs font-bold text-emerald-400">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              {dashboard.footer.operational}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
