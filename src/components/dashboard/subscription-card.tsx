"use client";

import { useState } from "react";
import Image from "next/image";
import type { Pax8Subscription } from "@/lib/pax8";
import { getProductLogo } from "@/lib/pax8";
import { SeatAdjustmentModal } from "./seat-adjustment-modal";

interface SubscriptionCardProps {
  subscription: Pax8Subscription;
  lang: string;
  dict: any;
  onUpdate: (subId: string, newQty: number) => void;
}

export function SubscriptionCard({
  subscription,
  lang,
  dict,
  onUpdate,
}: SubscriptionCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const cardDict = dict.common.dashboard.card;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "cancelled":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      case "pending":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      default:
        return "text-white/40 bg-white/5 border-white/10";
    }
  };

  const statusLabel = () => {
    const s = subscription.status.toLowerCase();
    if (s === "active") return cardDict.active;
    if (s === "cancelled") return cardDict.cancelled;
    if (s === "pending") return cardDict.pending;
    if (s === "suspended") return cardDict.suspended;
    return subscription.status;
  };

  return (
    <>
      <div className="group relative backdrop-blur-xl bg-white/3 border border-white/5 hover:border-purple-500/30 transition-all duration-500 overflow-hidden">
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative p-7 space-y-6">
          {/* Header: Logo & Status */}
          <div className="flex items-start justify-between">
            <div className="p-3 bg-white/3 border border-white/5 rounded-lg group-hover:border-white/10 transition-colors">
              <Image
                src={getProductLogo(subscription.productName)}
                alt={subscription.productName}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(subscription.status)}`}>
              {statusLabel()}
            </span>
          </div>

          {/* Product Info */}
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
              {subscription.productName}
            </h3>
            <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">
              {subscription.billingTerm === "Monthly" ? cardDict.monthly : cardDict.yearly}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">
                {cardDict.deployedCapacity}
              </p>
              <p className="text-lg font-display font-black text-white tabular-nums">
                {subscription.quantity} <span className="text-[10px] text-white/30 font-bold ml-1">{cardDict.seats}</span>
              </p>
            </div>
            {subscription.bankedCount !== undefined && subscription.bankedCount > 0 && (
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-purple-400/40 mb-1">
                  {cardDict.banked}
                </p>
                <p className="text-lg font-display font-black text-purple-400 tabular-nums">
                  {subscription.bankedCount}
                </p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between text-[10px]">
            <div className="space-y-1">
              <p className="font-black uppercase tracking-widest text-white/20">
                {cardDict.billing}
              </p>
              <p className="text-white/60 font-medium">
                {cardDict.activatedOn} {new Date(subscription.startDate).toLocaleDateString(lang, { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 bg-white/5 border border-white/10 text-white hover:bg-white hover:text-[#080910] hover:border-white transition-all duration-300 font-bold uppercase tracking-widest text-[9px]"
            >
              {cardDict.manage}
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <SeatAdjustmentModal
          subscription={subscription}
          lang={lang}
          dict={dict}
          onClose={() => setModalOpen(false)}
          onConfirm={(updatedSub) => {
            onUpdate(subscription.id, updatedSub);
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
}
