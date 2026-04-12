"use client";

import { useState } from "react";

interface PendingClient {
  id: string;
  user_id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
}

interface Props {
  lang: string;
  dictionary: any;
  pendingClients: PendingClient[];
}

export default function AdminClient({ lang, pendingClients: initialClients }: Props) {
  const isFr = lang === "fr";
  const [clients, setClients] = useState(initialClients);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  const handleAction = async (client: PendingClient, action: 'approve' | 'reject') => {
    setProcessingId(client.id);
    setStatusMsg(null);

    try {
      const endpoint = action === 'approve' ? '/api/admin/approve' : '/api/admin/reject';
      
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId: client.id, userId: client.user_id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Action failed");
      }

      setStatusMsg({
        type: 'success',
        text: action === 'approve' 
          ? `Entreprise ${client.company_name} provisionnée avec succès chez Pax8 !` 
          : `Inscription de ${client.company_name} rejetée.`
      });

      // Remove the processed client from the list
      setClients(prev => prev.filter(c => c.id !== client.id));

    } catch (err: any) {
      console.error(err);
      setStatusMsg({ type: 'error', text: err.message });
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="p-12 max-w-6xl mx-auto space-y-12 pb-32">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
          <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400">
            {isFr ? "Espace Sécurisé" : "Secure Zone"}
          </span>
        </div>
        <h1 className="text-4xl font-display font-black text-white tracking-tighter">
          {isFr ? "Contrôle des Inscriptions" : "Registration Control"}
        </h1>
        <p className="text-white/40 text-sm max-w-xl leading-relaxed">
          {isFr 
            ? "Passez en revue les demandes d'accès à votre portail B2B. L'approbation créera instantanément un tenant sur l'API Pax8." 
            : "Review B2B portal access requests. Approval instantly provisions a tenant via the Pax8 API."}
        </p>
      </header>

      {statusMsg && (
        <div className={`p-4 border text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 ${
          statusMsg.type === 'success' 
            ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400" 
            : "border-red-500/20 bg-red-500/5 text-red-400"
        }`}>
          <span className="material-symbols-outlined text-[18px]">
            {statusMsg.type === 'success' ? 'check_circle' : 'error'}
          </span>
          {statusMsg.text}
        </div>
      )}

      {clients.length === 0 ? (
        <div className="dashboard-card p-24 text-center border-dashed border-white/10">
          <span className="material-symbols-outlined text-[48px] text-white/10 mb-6 block mx-auto">inbox</span>
          <h3 className="text-xl font-black text-white mb-2">
             {isFr ? "Aucune demande en attente" : "No pending requests"}
          </h3>
          <p className="text-white/30 text-sm">
             {isFr ? "Vous avez traité toutes les inscriptions." : "You have processed all registrations."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {clients.map(client => (
            <div key={client.id} className="dashboard-card p-8 flex border-l-4 border-l-blue-500 flex-col lg:flex-row gap-8 items-start lg:items-center">
               <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                     <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{client.company_name}</h3>
                     <span className="text-[9px] uppercase tracking-widest font-black text-amber-400 bg-amber-500/10 px-3 py-1 mt-1">
                        Client Potentiel
                     </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                     <div>
                        <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">Contact</p>
                        <p className="text-white/80">{client.contact_name}</p>
                     </div>
                     <div>
                        <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">Email</p>
                        <p className="text-blue-400">{client.email}</p>
                     </div>
                     <div>
                        <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">Téléphone</p>
                        <p className="text-white/80">{client.phone}</p>
                     </div>
                     <div>
                        <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">Date</p>
                        <p className="text-white/80">{new Date(client.created_at).toLocaleDateString()}</p>
                     </div>
                  </div>
               </div>

               <div className="flex flex-row lg:flex-col w-full lg:w-48 gap-3">
                  <button 
                     onClick={() => handleAction(client, 'approve')}
                     disabled={processingId === client.id}
                     className="flex-1 lg:flex-none py-4 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/20 text-emerald-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
                  >
                     {processingId === client.id ? '...' : (isFr ? 'Approuver & Créer' : 'Approve & Create')}
                  </button>
                  <button 
                     onClick={() => handleAction(client, 'reject')}
                     disabled={processingId === client.id}
                     className="flex-1 lg:flex-none py-4 bg-white/5 hover:bg-red-500 text-white/40 hover:text-white border border-white/5 hover:border-red-500 transition-all text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
                  >
                     {processingId === client.id ? '...' : (isFr ? 'Rejeter' : 'Reject')}
                  </button>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
