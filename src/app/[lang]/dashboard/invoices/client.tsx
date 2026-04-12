"use client";

import { useState } from "react";
import Link from "next/link";

interface Props {
  lang: string;
  dictionary: any;
  companyName: string;
}

// Elite B2B Mock Data
const MOCK_INVOICES = [
  { id: "INV-2024-0012", date: "2024-04-01", amount: 1250.00, status: "pending", items: "Microsoft 365 E3, SentinelOne" },
  { id: "INV-2024-0011", date: "2024-03-01", amount: 1250.00, status: "paid", items: "Microsoft 365 E3, SentinelOne" },
  { id: "INV-2024-0010", date: "2024-02-01", amount: 1100.00, status: "paid", items: "Microsoft 365 Business Premium" },
  { id: "INV-2024-0009", date: "2024-01-01", amount: 1100.00, status: "paid", items: "Microsoft 365 Business Premium" },
  { id: "INV-2023-0105", date: "2023-12-01", amount: 1100.00, status: "paid", items: "Microsoft 365 Business Premium" },
];

export default function InvoicesClient({ lang, dictionary, companyName }: Props) {
  const isFr = lang === "fr";
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const totalPaid = MOCK_INVOICES.filter(i => i.status === "paid").reduce((acc, curr) => acc + curr.amount, 0);
  const openBalance = MOCK_INVOICES.filter(i => i.status === "pending").reduce((acc, curr) => acc + curr.amount, 0);

  const handleDownload = (invoiceId: string) => {
    setDownloadingId(invoiceId);
    // Simulate generation time
    setTimeout(() => {
      setDownloadingId(null);
    }, 1500);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(lang === "fr" ? "fr-CA" : "en-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-12 pb-32">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
            {isFr ? "Centre Financier" : "Financial Center"}
          </span>
        </div>
        <h1 className="text-4xl font-display font-black text-white tracking-tighter">
          {isFr ? "Facturation B2B" : "B2B Billing"}
        </h1>
        <p className="text-white/40 text-sm max-w-xl leading-relaxed">
          {isFr 
            ? `Consultez l'historique de facturation et les soldes en attente pour ${companyName}. Téléchargez vos factures consolidées au format PDF.` 
            : `View billing history and open balances for ${companyName}. Download your consolidated statements in PDF format.`}
        </p>
      </header>

      {/* Analytics Hero Setup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="dashboard-card overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/20 transition-all duration-700" />
          <div className="p-8">
            <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">
              {isFr ? "Solde Ouvert (À Payer)" : "Open Balance (Due)"}
            </p>
            <h2 className="text-5xl font-display font-black text-white tracking-tighter">
              {formatCurrency(openBalance)}
            </h2>
            <div className="mt-6">
              <button 
                onClick={() => alert("Paiement Stripe: Coming Soon")} 
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              >
                {isFr ? "Régler le Solde" : "Pay Balance"}
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard-card overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/20 transition-all duration-700" />
          <div className="p-8">
            <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">
              {isFr ? "Total Dépensé (YTD)" : "Total Spent (YTD)"}
            </p>
            <h2 className="text-5xl font-display font-black text-white tracking-tighter">
              {formatCurrency(totalPaid)}
            </h2>
            <div className="mt-6 flex items-center justify-between text-xs font-bold text-white/30 border-t border-white/5 pt-4">
              <span>{isFr ? "Dernier paiement" : "Last payment"}</span>
              <span className="text-white/80">01 Mar 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-white/80 flex items-center gap-2">
           <span className="material-symbols-outlined text-[20px] text-blue-400">receipt</span>
           {isFr ? "Historique des Factures" : "Invoice History"}
        </h3>

        <div className="dashboard-card border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-white/30 whitespace-nowrap">
                    {isFr ? "Facture #" : "Invoice #"}
                  </th>
                  <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-white/30 whitespace-nowrap">
                    Date
                  </th>
                  <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-white/30 whitespace-nowrap">
                    {isFr ? "Détails" : "Details"}
                  </th>
                  <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-white/30 whitespace-nowrap">
                    {isFr ? "Montant" : "Amount"}
                  </th>
                  <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-white/30 whitespace-nowrap">
                    Statut
                  </th>
                  <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-white/30 text-right whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MOCK_INVOICES.map((inv) => (
                  <tr key={inv.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-5 px-6">
                      <span className="text-xs font-bold text-white">{inv.id}</span>
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-xs text-white/60">{inv.date}</span>
                    </td>
                    <td className="py-5 px-6 max-w-[200px] truncate text-xs text-white/40">
                      {inv.items}
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-sm font-bold text-white">{formatCurrency(inv.amount)}</span>
                    </td>
                    <td className="py-5 px-6">
                      {inv.status === "paid" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black uppercase tracking-widest text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {isFr ? "Payé" : "Paid"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[9px] font-black uppercase tracking-widest text-amber-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          {isFr ? "En attente" : "Pending"}
                        </span>
                      )}
                    </td>
                    <td className="py-5 px-6 text-right">
                      <button
                        onClick={() => handleDownload(inv.id)}
                        disabled={downloadingId === inv.id}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-blue-500/20 text-white/40 hover:text-blue-400 transition-colors disabled:opacity-50 group-hover:opacity-100 opacity-50 xl:opacity-100"
                        title="Download PDF"
                      >
                        {downloadingId === inv.id ? (
                           <span className="w-4 h-4 border-2 border-white/20 border-t-blue-400 rounded-full animate-spin" />
                        ) : (
                           <span className="material-symbols-outlined text-[18px]">download</span>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
