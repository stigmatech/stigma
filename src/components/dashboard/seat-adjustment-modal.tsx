"use client";

import { useState } from "react";
import { X, Minus, Plus, AlertTriangle } from "lucide-react";
import type { Pax8Subscription } from "@/lib/pax8";

interface SeatAdjustmentModalProps {
  subscription: Pax8Subscription;
  lang: string;
  onClose: () => void;
  onConfirm: (newQuantity: number) => void;
}

export function SeatAdjustmentModal({
  subscription,
  lang,
  onClose,
  onConfirm,
}: SeatAdjustmentModalProps) {
  const [quantity, setQuantity] = useState(subscription.quantity);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const isFr = lang === "fr";

  const diff = quantity - subscription.quantity;
  const isIncrease = diff > 0;
  const isDecrease = diff < 0;

  const handleConfirm = async () => {
    if (quantity === subscription.quantity) {
      onClose();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/pax8/subscriptions/${subscription.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update subscription");
      }

      const data = await res.json();
      setSuccessMsg(data.message || "Opération complétée.");
      
      // Delay closing to let them read the banking message
      setTimeout(() => {
        onConfirm(quantity);
      }, 4000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
      <div className="bg-[#080910] border border-white/10 w-full max-w-md shadow-[0_0_100px_rgba(147,51,234,0.1)] overflow-hidden">
        {/* Header */}
        <div className="relative p-10 border-b border-white/5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full" />
          <div className="relative">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">
              {isFr ? "Gestion de l'Instance" : "Instance Management"}
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 mt-1">
              {subscription.productName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 space-y-10">
          {/* Current Status */}
          <div className="flex items-center justify-between py-4 px-6 bg-white/3 border border-white/5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
              {isFr ? "État Actuel" : "Current Status"}
            </span>
            <span className="text-sm font-bold text-white tabular-nums">
              {subscription.quantity} {isFr ? "Unités" : "Units"}
            </span>
          </div>

          {/* Seat Counter */}
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6">
              {isFr ? "Ajustement de la Capacité" : "Capacity Adjustment"}
            </p>
            <div className="flex items-center justify-center gap-10">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 disabled:opacity-5 disabled:cursor-not-allowed transition-all group"
              >
                <Minus size={20} className="text-white transition-transform group-active:scale-90" />
              </button>

              <div className="min-w-24">
                <span className="text-7xl font-display font-black text-white tabular-nums tracking-tighter">
                  {quantity}
                </span>
              </div>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-14 h-14 rounded-full bg-purple-600 border border-purple-500 flex items-center justify-center hover:bg-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all group"
              >
                <Plus size={20} className="text-white transition-transform group-active:scale-90" />
              </button>
            </div>
          </div>

          {/* Analysis Badge */}
          {diff !== 0 && (
            <div
              className={`p-4 border text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 ${
                isIncrease
                  ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                  : "border-amber-500/20 bg-amber-500/5 text-amber-400"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isIncrease ? "trending_up" : "trending_down"}
              </span>
              {isIncrease
                ? isFr
                  ? `+${diff} Provisionnement Additionnel`
                  : `+${diff} Additional Provisioning`
                : isFr
                  ? `${Math.abs(diff)} Retrait de Licence`
                  : `${Math.abs(diff)} License Removal`}
            </div>
          )}

          {/* Microsoft NCE Warning */}
          {isDecrease && (
            <div className="flex items-start gap-4 p-5 bg-amber-900/10 border border-amber-900/20">
              <AlertTriangle size={18} className="text-amber-400 shrink-0" />
              <p className="text-[10px] text-amber-300/60 leading-relaxed font-medium uppercase tracking-wider">
                {isFr
                  ? "Note : Pour Microsoft NCE, les réductions sont soumises à la fenêtre d'engagement contractuelle. Notre équipe technique validera la faisabilité."
                  : "Note: For Microsoft NCE, reductions are subject to commitment windows. Our technical team will validate feasibility."}
              </p>
            </div>
          )}

          {error && (
            <div className="p-4 border border-red-500/20 bg-red-500/5 text-red-400 text-[10px] font-black uppercase tracking-widest text-center leading-relaxed">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="p-4 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-black uppercase tracking-widest text-center leading-relaxed">
              <span className="material-symbols-outlined text-[18px] block mx-auto mb-2">check_circle</span>
              {successMsg}
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div className="p-10 pt-0 flex gap-4">
          <button
            onClick={onClose}
            disabled={successMsg !== null}
            className="flex-1 py-5 border border-white/5 text-white/20 hover:text-white hover:border-white/20 transition-all text-[10px] font-black uppercase tracking-[0.3em] disabled:opacity-20 disabled:cursor-not-allowed"
          >
            {isFr ? "Abandonner" : "Abort"}
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading || quantity === subscription.quantity || successMsg !== null}
            className="flex-1 py-5 bg-white text-[#080910] hover:bg-white/90 disabled:opacity-20 disabled:cursor-not-allowed transition-all text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <span className="w-3 h-3 border-2 border-[#080910]/30 border-t-[#080910] rounded-full animate-spin" />
                {isFr ? "Synchronisation..." : "Syncing..."}
              </>
            ) : (
              <>
                {isFr ? "Appliquer" : "Apply Changes"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
