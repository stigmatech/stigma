"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import NextImage from "next/image";
import type { Pax8Subscription } from "@/lib/pax8";
import { SubscriptionCard } from "@/components/dashboard/subscription-card";

export default function SubscriptionsPage() {
  const params = useParams();
  const lang = (params.lang as string) || "en";
  const isFr = lang === "fr";

  const [subscriptions, setSubscriptions] = useState<Pax8Subscription[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

  const handleUpdate = (subscriptionId: string, newQuantity: number) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === subscriptionId ? { ...sub, quantity: newQuantity } : sub
      )
    );
  };

  const activeCount = subscriptions.filter((s) => s.status === "Active").length;
  const totalSeats = subscriptions
    .filter((s) => s.status === "Active")
    .reduce((acc, s) => acc + s.quantity, 0);

  return (
    <div className="p-12 max-w-7xl mx-auto space-y-12 pb-24">
      {/* Header Section */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">
                {isFr ? "Performance Overview" : "Performance Overview"}
              </span>
            </div>
            <h1 className="text-4xl font-display font-black text-white tracking-tighter">
              {companyName || (isFr ? "Tableau de Bord" : "Client Dashboard")}
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
                else alert(isFr ? "Erreur d'accès à la facturation." : "Billing access error.");
              }}
              className="flex items-center gap-3 px-6 py-4 bg-white text-[#080910] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/90 transition-all duration-300"
            >
              <span className="material-symbols-outlined text-[18px]">payments</span>
              {isFr ? "Gérer Facturation" : "Manage Billing"}
            </button>
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
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">{isFr ? "Produits Actifs" : "Active Products"}</p>
            <h3 className="text-4xl font-display font-black text-white">{activeCount}</h3>
          </div>

          <div className="dashboard-card p-8 group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/5 rounded-lg">
                <span className="material-symbols-outlined text-white/40 group-hover:text-blue-400 transition-colors">group</span>
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">{isFr ? "Utilisateurs Totaux" : "Total Users"}</p>
            <h3 className="text-4xl font-display font-black text-white">{totalSeats}</h3>
          </div>

          <div className="dashboard-card p-8 group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/5 rounded-lg">
                <span className="material-symbols-outlined text-white/40 group-hover:text-emerald-400 transition-colors">sync</span>
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">{isFr ? "Dernière Synchro" : "Last Sync"}</p>
            <h3 className="text-xl font-bold text-white/80 mt-2 lowercase font-mono">
              {new Date().toLocaleTimeString(isFr ? "fr-CA" : "en-CA", { hour: '2-digit', minute: '2-digit' })}
            </h3>
          </div>
        </div>
      </section>

      {/* Subscription Grid */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/30">{isFr ? "Abonnements" : "Subscriptions"}</h2>
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
            <h3 className="text-lg font-bold text-white mb-2">{isFr ? "Erreur de connexion" : "Connection Error"}</h3>
            <p className="text-white/40 text-sm mb-8">{error}</p>
            <button onClick={() => window.location.reload()} className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest">{isFr ? "Réessayer" : "Retry"}</button>
          </div>
        ) : subscriptions.length === 0 ? (
          /* Empty State: Product Discovery */
          <div className="space-y-12">
            <div className="dashboard-card p-16 text-center">
              <div className="mb-8 p-6 inline-block bg-white/5 rounded-full">
                <span className="material-symbols-outlined text-[48px] text-purple-400">rocket_launch</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">
                {isFr ? "Activez votre puissance technologique" : "Activate your tech power"}
              </h3>
              <p className="max-w-md mx-auto text-white/40 text-sm mb-12 leading-relaxed">
                {isFr 
                  ? "Votre espace est prêt, mais aucun abonnement n'est actif. Explorez nos solutions cloud pour propulser votre entreprise."
                  : "Your space is ready, but no subscriptions are active. Explore our cloud solutions to power up your business."}
              </p>
              <Link
                href={`/${lang}/marketplace`}
                className="px-12 py-5 bg-purple-600 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-purple-500 transition-all duration-300"
              >
                {isFr ? "Explorer le Marché" : "Explore Marketplace"}
              </Link>
            </div>

            {/* Featured Pax8 Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Security", icon: "shield", label: "Acronis, SentinelOne" },
                { title: "Compute", icon: "cloud", label: "Azure, AWS" },
                { title: "Apps", icon: "grid_view", label: "Microsoft 365, Pax8" },
                { title: "DRaaS", icon: "backup", label: "Veeam, Datto" }
              ].map((cat, i) => (
                <div key={i} className="dashboard-card p-6 flex flex-col items-center text-center group cursor-pointer hover:border-purple-500/30">
                  <span className="material-symbols-outlined text-white/20 group-hover:text-purple-400 transition-colors mb-4">{cat.icon}</span>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-2">{cat.title}</h4>
                  <p className="text-[9px] text-white/30">{cat.label}</p>
                </div>
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
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        )}
      </section>

      {/* Support Footer */}
      <footer className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4 opacity-40">
           <NextImage src="/logoStigmaTechnologies188x64.png" width={80} height={27} alt="Logo" className="grayscale brightness-0 invert" />
           <div className="w-px h-8 bg-white/20" />
           <p className="text-[9px] font-medium uppercase tracking-widest text-white/60">
             Official Pax8 Cloud Partner
           </p>
        </div>
        <div className="flex gap-8">
          <div className="text-right">
            <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">{isFr ? "Assistance Technique" : "Tech Support"}</p>
            <p className="text-xs font-bold text-white">+1 855-552-1005</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">{isFr ? "Statut API" : "API Status"}</p>
            <p className="flex items-center justify-end gap-2 text-xs font-bold text-emerald-400">
               <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
               Operational
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

