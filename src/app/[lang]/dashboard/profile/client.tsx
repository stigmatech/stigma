"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Contact {
 id: string;
 firstName: string;
 lastName: string;
 email: string;
 phone: string;
 roles: string[];
 createdDate: string;
}

interface Props {
  lang: string;
  dict: any;
  company: any;
  contacts: Contact[];
  orders: any[];
  error: string | null;
}

export default function DashboardProfileClient({ lang, dict, company, contacts, orders, error }: Props) {
 const router = useRouter();
 const profile = dict.common.dashboard.profile;
 const [modalOpen, setModalOpen] = useState(false);
 const [isRemoving, setIsRemoving] = useState<string | null>(null);
 const [removeConfirm, setRemoveConfirm] = useState<{ id: string, email: string, name: string } | null>(null);

 const handleDelete = async () => {
  if (!removeConfirm) return;
  setIsRemoving(removeConfirm.id);
  try {
    const res = await fetch(`/api/team/remove`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactId: removeConfirm.id, email: removeConfirm.email }),
    });
    if (!res.ok) throw new Error("Failed to remove member");
    setRemoveConfirm(null);
    router.refresh();
  } catch (err) {
    console.error(err);
    alert("Une erreur est survenue lors de la suppression.");
  } finally {
    setIsRemoving(null);
  }
 };

 if (error) {
 return (
 <div className="p-12 max-w-7xl mx-auto">
 <div className="p-8 border border-red-500/20 bg-red-500/5 text-red-400 text-center uppercase tracking-widest font-black text-xs">
 <span className="material-symbols-outlined text-[32px] block mb-4">error_outline</span>
 {error}
 </div>
 </div>
 );
 }

 return (
    <div className="p-12 max-w-7xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">
                {profile.title}
              </span>
            </div>
            <h1 className="text-4xl font-display font-black text-white tracking-tighter">
              {company?.name || (lang === 'fr' ? "Organisation" : "Organization")}
            </h1>
          </div>
        </div>

        {/* Insight Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="dashboard-card p-8 group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/5 rounded-lg">
                <span className="material-symbols-outlined text-white/40 group-hover:text-purple-400 transition-colors">groups</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Active</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">{profile.headers.user}</p>
            <h3 className="text-4xl font-display font-black text-white">{contacts.length}</h3>
          </div>

          <div className="dashboard-card p-8 group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/5 rounded-lg">
                <span className="material-symbols-outlined text-white/40 group-hover:text-purple-400 transition-colors">identifier</span>
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">Pax8 ID</p>
            <h3 className="text-xl font-mono font-bold text-white/80 mt-2 lowercase truncate">
              {company?.id?.split('-')[0] || "N/A"}
            </h3>
          </div>

          <div className="dashboard-card p-8 group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/5 rounded-lg">
                <span className="material-symbols-outlined text-white/40 group-hover:text-purple-400 transition-colors">verified</span>
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">{profile.registry}</p>
            <h3 className="text-xl font-bold text-white/80 mt-2">
              {profile.synchronized}
            </h3>
          </div>
        </div>
      </section>

 {/* Grid Layout */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 {/* Identity Side */}
 <div className="space-y-8 lg:col-span-1">
 <div className="dashboard-card p-8">
 <h3 className="text-xs font-black text-white/30 uppercase tracking-[0.3em] mb-6">
 {profile.identity}
 </h3>
 <div className="space-y-6">
 <div>
 <p className="text-[9px] uppercase tracking-widest text-white/20 mb-1">{profile.labels.companyName}</p>
 <p className="text-sm font-bold text-white">{company?.name || "N/A"}</p>
 </div>
 {company?.address && (
 <div>
 <p className="text-[9px] uppercase tracking-widest text-white/20 mb-1">{profile.labels.address}</p>
 <p className="text-sm text-white/60">
 {company.address.street}<br/>
 {company.address.city}, {company.address.stateOrProvince} {company.address.postalCode}
 </p>
 </div>
 )}
 <div>
 <p className="text-[9px] uppercase tracking-widest text-white/20 mb-1">{profile.labels.phone}</p>
 <p className="text-sm text-white/60">{company?.phone || "N/A"}</p>
 </div>
 
 <div className="pt-6 border-t border-white/5">
 <p className="text-[9px] text-white/20 uppercase tracking-widest leading-relaxed">
 {profile.disclaimer}
 </p>
 </div>
 </div>
 </div>
 </div>

 {/* Team Side */}
 <div className="lg:col-span-2 space-y-6">
 <div className="flex items-center justify-between mb-8">
 <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em]">
 {profile.teamTitle}
 </h3>
 <button 
 onClick={() => setModalOpen(true)}
 className="flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-500 transition-colors text-white text-[9px] uppercase tracking-[0.2em] font-black"
 >
 <span className="material-symbols-outlined text-[14px]">person_add</span>
 {profile.inviteBtn}
 </button>
 </div>

      <div className="dashboard-card overflow-hidden border border-white/5 shadow-2xl">
  {contacts.length === 0 ? (
  <div className="p-20 text-center flex flex-col items-center space-y-6">
    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-linear-to-tr from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="material-symbols-outlined text-5xl text-white/10 group-hover:text-purple-400/50 transition-colors">person_search</span>
    </div>
    <div className="space-y-2">
      <h4 className="text-sm font-bold text-white uppercase tracking-widest">{profile.emptyTitle || "No Members Found"}</h4>
      <p className="text-xs text-white/30 leading-relaxed max-w-xs mx-auto">
        {profile.emptyDesc || "Your organization's team is currently empty. Start by inviting your collaborators to give them access to the dashboard."}
      </p>
    </div>
    <button 
      onClick={() => setModalOpen(true)}
      className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all"
    >
      {profile.inviteBtn}
    </button>
  </div>
  ) : (
 <table className="w-full text-left">
 <thead className="bg-white/5 border-b border-white/5">
 <tr>
 <th className="p-5 text-[9px] uppercase tracking-[0.2em] font-black text-white/30">{profile.headers.user}</th>
 <th className="p-5 text-[9px] uppercase tracking-[0.2em] font-black text-white/30 hidden md:table-cell">{profile.headers.contact}</th>
 <th className="p-5 text-[9px] uppercase tracking-[0.2em] font-black text-white/30">{profile.headers.roles}</th>
 <th className="p-5 text-right text-[9px] uppercase tracking-[0.2em] font-black text-white/30">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-white/5">
 {contacts.map(c => (
 <tr key={c.id} className="hover:bg-white/2 transition-colors group">
 <td className="p-5">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-xs font-black text-purple-400 uppercase">
 {c.firstName?.[0]}{c.lastName?.[0]}
 </div>
 <div>
 <p className="text-sm font-bold text-white capitalize">{c.firstName} {c.lastName}</p>
 </div>
 </div>
 </td>
 <td className="p-5 hidden md:table-cell">
 <p className="text-xs text-white/60 mb-1">{c.email}</p>
 <p className="text-[10px] text-white/20 font-mono tracking-wider">{c.phone}</p>
 </td>
 <td className="p-5">
 <div className="flex flex-wrap gap-2">
 {c.roles.map(r => {
 const roleLabel = r === 'Admin' ? profile.inviteModal.roles.admin : 
 r === 'Billing' ? profile.inviteModal.roles.billing : 
 r === 'Technical' ? profile.inviteModal.roles.technical : r;
 return (
 <span key={r} className={`px-2 py-1 text-[8px] uppercase tracking-widest font-black rounded ${
 r === 'Admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
 r === 'Billing' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
 }`}>
 {roleLabel}
 </span>
 );
 })}
 {c.roles.length === 0 && <span className="text-[10px] text-white/20">—</span>}
 </div>
 </td>
 <td className="p-5 text-right">
    <button 
      onClick={() => setRemoveConfirm({ id: c.id, email: c.email, name: `${c.firstName} ${c.lastName}` })}
      disabled={isRemoving !== null}
      className="p-2 text-white/10 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
      title="Supprimer"
    >
      <span className="material-symbols-outlined text-sm">delete</span>
    </button>
  </td>
 </tr>
 ))}
        </tbody>
      </table>
      )}
    </div>
  </div>

  {/* Order History */}
  <section className="space-y-8">
    <div className="flex items-center justify-between">
      <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em]">
        {profile.orders.title}
      </h3>
    </div>

    <div className="dashboard-card overflow-hidden border border-white/5">
      {orders.length === 0 ? (
        <div className="p-12 text-center text-white/20 text-xs font-bold uppercase tracking-widest">
          {profile.orders.empty}
        </div>
      ) : (
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/5">
            <tr>
              <th className="p-5 text-[9px] uppercase tracking-[0.2em] font-black text-white/30">{profile.orders.table.product}</th>
              <th className="p-5 text-[9px] uppercase tracking-[0.2em] font-black text-white/30">{profile.orders.table.date}</th>
              <th className="p-5 text-[9px] uppercase tracking-[0.2em] font-black text-white/30 text-center">{profile.orders.table.qty}</th>
              <th className="p-5 text-[9px] uppercase tracking-[0.2em] font-black text-white/30">{profile.orders.table.amount}</th>
              <th className="p-5 text-[9px] uppercase tracking-[0.2em] font-black text-white/30">{profile.orders.table.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-white/2 transition-colors">
                <td className="p-5">
                  <p className="text-xs font-bold text-white uppercase tracking-tight truncate max-w-[200px]">
                    {o.product_id}
                  </p>
                </td>
                <td className="p-5">
                  <p className="text-xs text-white/40">
                    {new Date(o.created_at).toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-US')}
                  </p>
                </td>
                <td className="p-5 text-center">
                  <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-white/60">
                    {o.quantity}
                  </span>
                </td>
                <td className="p-5">
                  <p className="text-xs font-mono text-white/80">
                    {(o.amount).toLocaleString(lang === 'fr' ? 'fr-CA' : 'en-US', { style: 'currency', currency: o.currency })}
                  </p>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 text-[8px] uppercase tracking-widest font-black rounded ${
                      o.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      o.status === 'failed' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {profile.orders.status[o.status] || o.status}
                    </span>
                    {o.status === 'failed' && o.failure_reason && (
                      <div className="group relative">
                        <span className="material-symbols-outlined text-sm text-red-400/40 cursor-help">info</span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-red-950 border border-red-500/20 rounded text-[9px] text-red-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-2xl">
                          {o.failure_reason}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </section>
</div>

 {modalOpen && (
 <InviteModal 
 lang={lang} 
 dict={dict}
 onClose={() => setModalOpen(false)} 
 onSuccess={() => {
 setModalOpen(false);
 router.refresh();
 }} 
 />
 )}

 {removeConfirm && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
          <div className="w-full max-w-md bg-[#0D0D11] border border-white/10 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-red-500 text-3xl">warning</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Supprimer le collaborateur ?</h3>
            <p className="text-sm text-white/40 mb-8 leading-relaxed">
              Vous êtes sur le point de retirer <strong>{removeConfirm.name}</strong> de votre équipe. Cette personne n'aura plus accès au tableau de bord.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setRemoveConfirm(null)}
                className="py-3 px-6 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest text-white/40 hover:bg-white/5 transition-all"
              >
                Annuler
              </button>
              <button 
                onClick={handleDelete}
                disabled={isRemoving !== null}
                className="py-3 px-6 rounded-full bg-red-500 hover:bg-red-600 text-xs font-bold uppercase tracking-widest text-white transition-all disabled:opacity-50"
              >
                {isRemoving ? "Suppression..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}
 </div>
 );
}

// ── Invite Modal ─────────────────────────────────────────────────────────────

function InviteModal({ lang, dict, onClose, onSuccess }: { lang: string, dict: any, onClose: () => void, onSuccess: () => void }) {
 const profile = dict.common.dashboard.profile;
 const invite = profile.inviteModal;
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string|null>(null);

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
 e.preventDefault();
 setLoading(true);
 setError(null);
 const fd = new FormData(e.currentTarget);
 const payload = {
 firstName: fd.get('firstName'),
 lastName: fd.get('lastName'),
 email: fd.get('email'),
 role: fd.get('role')
 };

 try {
 const res = await fetch('/api/team/invite', {
 method: "POST",
 headers:{"Content-Type":"application/json"},
 body: JSON.stringify(payload)
 });
 const data = await res.json();
 if (!res.ok) throw new Error(data.error || (lang === 'fr' ? "Échec de l'invitation" : "Failed to invite"));
 onSuccess();
 } catch(err: any) {
 setError(err.message);
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
 <div className="bg-[#080910] border border-white/10 w-full max-w-md shadow-[0_0_100px_rgba(147,51,234,0.1)] overflow-hidden">
 <div className="relative p-10 border-b border-white/5">
 <h2 className="text-xl font-black text-white uppercase tracking-tighter">
 {invite.title}
 </h2>
 <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest mt-2 leading-relaxed">
 {invite.description}
 </p>
 </div>

 <form onSubmit={handleSubmit} className="p-10 space-y-6">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-[9px] uppercase tracking-widest font-black text-white/40">{invite.firstName}</label>
 <input required name="firstName" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50" />
 </div>
 <div className="space-y-2">
 <label className="text-[9px] uppercase tracking-widest font-black text-white/40">{invite.lastName}</label>
 <input required name="lastName" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50" />
 </div>
 </div>
 
 <div className="space-y-2">
 <label className="text-[9px] uppercase tracking-widest font-black text-white/40">{invite.email}</label>
 <input required type="email" name="email" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50" />
 </div>

 <div className="space-y-2">
 <label className="text-[9px] uppercase tracking-widest font-black text-white/40">{invite.role}</label>
 <select required name="role" defaultValue="Admin" className="w-full bg-[#080910] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 appearance-none">
 <option value="Admin">{invite.roles.admin}</option>
 <option value="Billing">{invite.roles.billing}</option>
 <option value="Technical">{invite.roles.technical}</option>
 </select>
 </div>

 {error && <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest bg-red-400/10 p-3 text-center">{error}</p>}

 <div className="pt-6 border-t border-white/5 flex gap-4">
 <button type="button" onClick={onClose} disabled={loading} className="flex-1 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors">
 {invite.cancel}
 </button>
 <button type="submit" disabled={loading} className="flex-1 py-4 bg-purple-600 text-white text-[9px] font-black uppercase tracking-[0.2em] hover:bg-purple-500 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
 {loading ? (
 <>
 <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
 {invite.sending}
 </>
 ) : (invite.send)}
 </button>
 </div>
 </form>
 </div>
 </div>
 );
}
