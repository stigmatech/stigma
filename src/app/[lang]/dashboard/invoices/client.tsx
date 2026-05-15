"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Invoice {
  id: string;
  date: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  status: string;
  year: number;
  items: string;
  pdf_url?: string;
}

interface Props {
  lang: string;
  dict: any;
  companyName: string;
  initialInvoices?: Invoice[];
}

export default function InvoicesClient({ lang, dict, companyName, initialInvoices = [] }: Props) {
  const invDict = dict.common.dashboard.invoices;
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [loading, setLoading] = useState(initialInvoices.length === 0);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    if (initialInvoices.length > 0) {
      setLoading(false);
      return;
    }

    fetch("/api/stripe/invoices")
      .then((res) => res.json())
      .then((data) => {
        if (data.invoices) setInvoices(data.invoices);
      })
      .catch((err) => console.error("Error fetching invoices:", err))
      .finally(() => setLoading(false));
  }, [initialInvoices.length]);

  const currentYear = new Date().getFullYear();
  
  // Solde Ouvert: Doit être calculé dynamiquement en sommant le champ amount_due des factures Stripe ayant le statut open.
  const openBalance = invoices
    .filter(i => i.status === "open")
    .reduce((acc, curr) => acc + (curr.amount_due || 0), 0);

  // Total Dépensé (YTD): Doit être calculé à partir de l'historique des factures payées pour l'année en cours.
  const totalPaid = invoices
    .filter(i => (i.status === "paid" || i.amount_paid > 0) && i.year === currentYear)
    .reduce((acc, curr) => acc + (curr.amount_paid || 0), 0);

  // Dernier Paiement: La date doit être extraite de la facture payée la plus récente.
  const lastPaymentDate = invoices.find(i => i.status === "paid")?.date || "—";

  const handlePayBalance = async () => {
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      console.error("Error opening portal:", e);
    }
  };

  const handleDownload = (invoice: Invoice) => {
    if (!invoice.pdf_url) return;
    setDownloadingId(invoice.id);
    window.open(invoice.pdf_url, "_blank");
    setTimeout(() => setDownloadingId(null), 1000);
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
      <header className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">
            {invDict.header}
          </span>
        </div>
        <h1 className="text-4xl font-display font-black text-white tracking-tighter">
          {invDict.title}
        </h1>
        <p className="text-white/40 text-sm max-w-xl leading-relaxed">
          {invDict.description.replace("{{companyName}}", companyName)}
        </p>
      </header>

      {/* Insight Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="dashboard-card overflow-hidden relative group p-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/20 transition-all duration-700" />
          
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-white/5 rounded-lg group-hover:bg-amber-500/10 transition-colors">
              <span className="material-symbols-outlined text-white/40 group-hover:text-amber-400 transition-colors">account_balance_wallet</span>
            </div>
            {openBalance > 0 && (
              <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded">Action Required</span>
            )}
          </div>

          <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">
            {invDict.openBalance}
          </p>
          <h2 className="text-5xl font-display font-black text-white tracking-tighter">
            {loading ? "..." : formatCurrency(openBalance)}
          </h2>
          
          <div className="mt-8 pt-6 border-t border-white/5">
            <button 
              onClick={handlePayBalance} 
              disabled={loading}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed text-[#080910] text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(245,158,11,0.1)]"
            >
              {invDict.payBtn}
            </button>
          </div>
        </div>

        <div className="dashboard-card overflow-hidden relative group p-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/20 transition-all duration-700" />
          
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-white/5 rounded-lg group-hover:bg-purple-500/10 transition-colors">
              <span className="material-symbols-outlined text-white/40 group-hover:text-purple-400 transition-colors">analytics</span>
            </div>
          </div>

          <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">
            {invDict.totalSpent}
          </p>
          <h2 className="text-5xl font-display font-black text-white tracking-tighter">
            {loading ? "..." : formatCurrency(totalPaid)}
          </h2>
          
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/30">
            <span>{invDict.lastPayment}</span>
            <span className="text-white/80 font-mono">{loading ? "..." : lastPaymentDate}</span>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="space-y-6">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
          {invDict.historyTitle}
        </h3>

        <div className="dashboard-card border border-white/5 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/2">
                  <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-white/30 whitespace-nowrap">
                    {invDict.table.invoice}
                  </th>
                  <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-white/30 whitespace-nowrap">
                    {invDict.table.date}
                  </th>
                  <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-white/30 whitespace-nowrap">
                    {invDict.table.details}
                  </th>
                  <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-white/30 whitespace-nowrap">
                    {invDict.table.amount}
                  </th>
                  <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-white/30 whitespace-nowrap">
                    {invDict.table.status}
                  </th>
                  <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-white/30 text-right whitespace-nowrap">
                    {invDict.table.action}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={6} className="py-8 px-6">
                        <div className="flex items-center gap-4">
                          <div className="h-4 bg-white/5 rounded w-24" />
                          <div className="h-4 bg-white/5 rounded w-20" />
                          <div className="h-4 bg-white/5 rounded flex-1" />
                          <div className="h-4 bg-white/5 rounded w-16" />
                          <div className="h-6 bg-white/5 rounded-full w-20" />
                          <div className="h-8 bg-white/5 rounded w-8 ml-auto" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : invoices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-24 px-6 text-center">
                      <div className="flex flex-col items-center max-w-sm mx-auto space-y-6">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center relative overflow-hidden group">
                           <div className="absolute inset-0 bg-linear-to-tr from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                           <span className="material-symbols-outlined text-4xl text-white/10 group-hover:text-purple-400/50 transition-colors">receipt_long</span>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-bold text-white uppercase tracking-widest">
                            {invDict.emptyStateTitle || "No Invoices Yet"}
                          </h4>
                          <p className="text-xs text-white/30 leading-relaxed">
                            {invDict.emptyStateDesc || "You haven't generated any invoices yet. Once you subscribe to a service, your billing history will appear here."}
                          </p>
                        </div>
                        <Link 
                          href={`/${lang}/dashboard/subscriptions`}
                          className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all"
                        >
                          {invDict.exploreServices || "Explore Services"}
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  invoices.map((inv) => (
                    <tr key={inv.id} className="group hover:bg-white/2 transition-colors">
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
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                            {invDict.status.paid}
                          </span>
                        ) : inv.status === "open" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[9px] font-black uppercase tracking-widest text-amber-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                            {invDict.status.pending}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/40">
                            {inv.status}
                          </span>
                        )}
                      </td>
                      <td className="py-5 px-6 text-right">
                        <button
                          onClick={() => handleDownload(inv)}
                          disabled={downloadingId === inv.id || !inv.pdf_url}
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
