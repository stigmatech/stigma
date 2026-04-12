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
  dictionary: any;
  company: any;
  contacts: Contact[];
  error: string | null;
}

export default function DashboardProfileClient({ lang, company, contacts, error }: Props) {
  const isFr = lang === "fr";
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

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
    <div className="p-12 max-w-5xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <section>
        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
             <span className="material-symbols-outlined text-[14px] text-white/40">business</span>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
              {isFr ? "Paramètres d'Entreprise" : "Company Settings"}
             </span>
          </div>
          <h1 className="text-4xl font-display font-black text-white tracking-tighter">
            {company?.name || "Organisation"}
          </h1>
        </div>
      </section>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Identity Side */}
         <div className="space-y-8 lg:col-span-1">
            <div className="dashboard-card p-8">
               <h3 className="text-xs font-black text-white/30 uppercase tracking-[0.3em] mb-6">
                 {isFr ? "Identité" : "Identity"}
               </h3>
               <div className="space-y-6">
                 <div>
                   <p className="text-[9px] uppercase tracking-widest text-white/20 mb-1">Company Name</p>
                   <p className="text-sm font-bold text-white">{company?.name || "N/A"}</p>
                 </div>
                 {company?.address && (
                 <div>
                   <p className="text-[9px] uppercase tracking-widest text-white/20 mb-1">HQ Address</p>
                   <p className="text-sm text-white/60">
                     {company.address.street}<br/>
                     {company.address.city}, {company.address.stateOrProvince} {company.address.postalCode}
                   </p>
                 </div>
                 )}
                 <div>
                   <p className="text-[9px] uppercase tracking-widest text-white/20 mb-1">Primary Phone</p>
                   <p className="text-sm text-white/60">{company?.phone || "N/A"}</p>
                 </div>
                 
                 <div className="pt-6 border-t border-white/5">
                   <p className="text-[9px] text-white/20 uppercase tracking-widest leading-relaxed">
                     {isFr 
                       ? "Ces informations sont synchronisées avec le registre principal. Contactez le support pour toute modification."
                       : "Business identity is synced with the primary registry. Contact support to amend records."}
                   </p>
                 </div>
               </div>
            </div>
         </div>

         {/* Team Side */}
         <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em]">
                 {isFr ? "Accès & Équipe" : "Team & Access"}
               </h3>
               <button 
                 onClick={() => setModalOpen(true)}
                 className="flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-500 transition-colors text-white text-[9px] uppercase tracking-[0.2em] font-black"
               >
                 <span className="material-symbols-outlined text-[14px]">person_add</span>
                 {isFr ? "Inviter" : "Invite"}
               </button>
            </div>

            <div className="dashboard-card overflow-hidden">
               {contacts.length === 0 ? (
                 <div className="p-12 text-center text-white/30 text-sm">
                    {isFr ? "Aucun membre trouvé." : "No team members found."}
                 </div>
               ) : (
                 <table className="w-full text-left">
                   <thead className="bg-white/5 border-b border-white/5">
                     <tr>
                       <th className="p-5 text-[9px] uppercase tracking-[0.2em] font-black text-white/30">User</th>
                       <th className="p-5 text-[9px] uppercase tracking-[0.2em] font-black text-white/30 hidden md:table-cell">Contact</th>
                       <th className="p-5 text-[9px] uppercase tracking-[0.2em] font-black text-white/30">Roles</th>
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
                               {c.roles.map(r => (
                                 <span key={r} className={`px-2 py-1 text-[8px] uppercase tracking-widest font-black rounded ${
                                   r === 'Admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                                   r === 'Billing' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                                   'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                 }`}>
                                    {r}
                                 </span>
                               ))}
                               {c.roles.length === 0 && <span className="text-[10px] text-white/20">—</span>}
                            </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               )}
            </div>
         </div>
      </div>

      {modalOpen && (
        <InviteModal 
          lang={lang} 
          onClose={() => setModalOpen(false)} 
          onSuccess={() => {
            setModalOpen(false);
            router.refresh();
          }} 
        />
      )}
    </div>
  );
}

// ── Invite Modal ─────────────────────────────────────────────────────────────

function InviteModal({ lang, onClose, onSuccess }: { lang: string, onClose: () => void, onSuccess: () => void }) {
  const isFr = lang === "fr";
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
      if (!res.ok) throw new Error(data.error || "Failed to invite");
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
             {isFr ? "Ajouter un collaborateur" : "Invite Team Member"}
           </h2>
           <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest mt-2 leading-relaxed">
             {isFr 
              ? "Une invitation sécurisée lui sera envoyée par email pour configurer son accès."
              : "A secure invitation will be sent to their email to configure their access."}
           </p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest font-black text-white/40">First Name</label>
                <input required name="firstName" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50" />
             </div>
             <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest font-black text-white/40">Last Name</label>
                <input required name="lastName" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50" />
             </div>
          </div>
          
          <div className="space-y-2">
             <label className="text-[9px] uppercase tracking-widest font-black text-white/40">Email Address</label>
             <input required type="email" name="email" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50" />
          </div>

          <div className="space-y-2">
             <label className="text-[9px] uppercase tracking-widest font-black text-white/40">Access Role</label>
             <select required name="role" defaultValue="Admin" className="w-full bg-[#080910] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 appearance-none">
                <option value="Admin">Administrator (Full Access)</option>
                <option value="Billing">Billing Contact</option>
                <option value="Technical">Technical Contact</option>
             </select>
          </div>

          {error && <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest bg-red-400/10 p-3 text-center">{error}</p>}

          <div className="pt-6 border-t border-white/5 flex gap-4">
            <button type="button" onClick={onClose} disabled={loading} className="flex-1 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors">
              {isFr ? "Annuler" : "Cancel"}
            </button>
            <button type="submit" disabled={loading} className="flex-1 py-4 bg-purple-600 text-white text-[9px] font-black uppercase tracking-[0.2em] hover:bg-purple-500 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (isFr ? "Envoyer l'invitation" : "Send Invite")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
