"use client";

import { useState } from "react";
import Image from "next/image";
import type { Pax8Subscription } from "@/lib/pax8";
import { getProductLogo } from "@/lib/pax8";
import { SeatAdjustmentModal } from "./seat-adjustment-modal";

interface SubscriptionCardProps {
  subscription: Pax8Subscription;
  lang: string;
  onUpdate: (subscriptionId: string, newQuantity: number) => void;
}

const STATUS_CONFIG = {
  Active: {
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
    dot: "bg-emerald-400",
    labelFr: "Actif",
    labelEn: "Active",
  },
  Cancelled: {
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/20",
    dot: "bg-red-400",
    labelFr: "Annulé",
    labelEn: "Cancelled",
  },
  Pending: {
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
    dot: "bg-amber-400 animate-pulse",
    labelFr: "En attente",
    labelEn: "Pending",
  },
  Suspended: {
    color: "text-orange-400",
    bg: "bg-orange-400/10 border-orange-400/20",
    dot: "bg-orange-400",
    labelFr: "Suspendu",
    labelEn: "Suspended",
  },
};

export function SubscriptionCard({ subscription, lang, onUpdate }: SubscriptionCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const isFr = lang === "fr";
  const statusConfig = STATUS_CONFIG[subscription.status] || STATUS_CONFIG.Active;
  const logoSrc = getProductLogo(subscription.productName);

  return (
    <>
      <div className="dashboard-card group p-8 flex flex-col h-full">
        {/* Spotlight & Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="flex items-start justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 bg-white/95 p-3 shadow-2xl skew-x-[-4deg] group-hover:skew-x-0 transition-transform duration-500">
               <Image
                 src={logoSrc}
                 alt={subscription.productName}
                 width={40}
                 height={40}
                 className="object-contain w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
               />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-white uppercase tracking-tighter leading-none">
                {subscription.productName}
              </h3>
              <p className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
                ID: {subscription.id.slice(0, 8)}
              </p>
            </div>
          </div>

          <span className={`inline-flex items-center gap-2 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] border ${statusConfig.bg} ${statusConfig.color} rounded-full`}>
            <span className={`w-1 h-1 rounded-full ${statusConfig.dot}`} />
            {isFr ? statusConfig.labelFr : statusConfig.labelEn}
          </span>
        </div>

        {/* Seat Metric */}
        <div className="mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-3">
            {isFr ? "Capacité Déployée" : "Deployed Capacity"}
          </p>
          <div className="flex items-baseline gap-3">
             <span className="text-6xl font-display font-black text-white tracking-tighter tabular-nums">
               {subscription.quantity}
             </span>
             <span className="text-xs font-black uppercase tracking-[0.2em] text-white/30">
               {isFr ? "Sièges" : "Seats"}
             </span>
          </div>

          {/* Snippet 8a: Banked Licenses Indicator */}
          {typeof subscription.bankedCount === 'number' && subscription.bankedCount > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/20 rounded">
               <span className="material-symbols-outlined text-[14px] text-emerald-400">inventory_2</span>
               <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">
                 {subscription.bankedCount} {isFr ? "Licences Disponibles" : "Banked Licenses"}
               </span>
            </div>
          )}
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-6 p-4 bg-white/3 border border-white/5 mb-8">
           <div>
             <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-1">{isFr ? "Facturation" : "Billing"}</p>
             <p className="text-[11px] font-bold text-white/60 tracking-wider capitalize">{subscription.billingTerm || "Monthly"}</p>
           </div>
           <div>
             <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-1">{isFr ? "Activé le" : "Activated on"}</p>
             <p className="text-[11px] font-bold text-white/60 tracking-wider">
               {new Date(subscription.startDate).toLocaleDateString(isFr ? 'fr-CA' : 'en-CA', { day: '2-digit', month: 'short', year: 'numeric' })}
             </p>
           </div>
        </div>

        <div className="grow" />

        {/* Primary Action */}
        <button
          onClick={() => setModalOpen(true)}
          disabled={subscription.status !== "Active"}
          className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-500 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 disabled:opacity-20 disabled:cursor-not-allowed group/btn"
        >
          <span className="material-symbols-outlined text-[18px] group-hover/btn:rotate-90 transition-transform">settings_applications</span>
          {isFr ? "Gérer l'Instance" : "Manage Instance"}
        </button>
      </div>

      {modalOpen && (
        <SeatAdjustmentModal
          subscription={subscription}
          lang={lang}
          onClose={() => setModalOpen(false)}
          onConfirm={(newQty) => {
            onUpdate(subscription.id, newQty);
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
}
