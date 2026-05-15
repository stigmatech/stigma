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
  dict: any;
  pendingClients: PendingClient[];
}

export default function AdminClient({ lang, dict, pendingClients: initialClients }: Props) {
  const admin = dict.common.dashboard.admin;
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
          ? admin.responses.approveSuccess.replace("{{companyName}}", client.company_name)
          : admin.responses.rejectSuccess.replace("{{companyName}}", client.company_name)
      });

      setClients(prev => prev.filter(c => c.id !== client.id));

    } catch (err: any) {
      console.error(err);
      setStatusMsg({ 
        type: 'error', 
        text: admin.responses.error.replace("{{error}}", err.message) 
      });
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="p-12 max-w-7xl mx-auto space-y-12 pb-32">
      {/* Header Section */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400">
                {admin.header}
              </span>
            </div>
            <h1 className="text-4xl font-display font-black text-white tracking-tighter">
              {admin.title}
            </h1>
            <p className="text-white/40 text-sm max-w-xl leading-relaxed">
              {admin.description}
            </p>
          </div>
        </div>

        {/* Insight Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="dashboard-card p-8 group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/5 rounded-lg group-hover:bg-red-500/10 transition-colors">
                <span className="material-symbols-outlined text-white/40 group-hover:text-red-400 transition-colors">pending_actions</span>
              </div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded">Attention</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">{admin.tiles.pending}</p>
            <h3 className="text-4xl font-display font-black text-white">{clients.length}</h3>
          </div>

          <div className="dashboard-card p-8 group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/5 rounded-lg group-hover:bg-emerald-500/10 transition-colors">
                <span className="material-symbols-outlined text-white/40 group-hover:text-emerald-400 transition-colors">how_to_reg</span>
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">{admin.tiles.total}</p>
            <h3 className="text-4xl font-display font-black text-white">42</h3>
          </div>

          <div className="dashboard-card p-8 group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-2xl rounded-full" />
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/5 rounded-lg group-hover:bg-red-500/10 transition-colors">
                <span className="material-symbols-outlined text-white/40 group-hover:text-red-400 transition-colors">dns</span>
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">{admin.tiles.system}</p>
            <h3 className="text-xl font-bold text-white/80 mt-2 uppercase tracking-tighter">
              Pax8 Connect: Operational
            </h3>
          </div>
        </div>
      </section>

      {statusMsg && (
        <div className={`p-4 border text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl transition-all animate-in fade-in slide-in-from-top-4 duration-500 ${
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
        <div className="dashboard-card p-24 text-center border-dashed border-white/10 group">
          <div className="mb-8 p-6 inline-block bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[48px] text-white/10 group-hover:text-white/40 transition-colors">inbox</span>
          </div>
          <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">
            {admin.empty.title}
          </h3>
          <p className="text-white/30 text-sm max-w-xs mx-auto">
            {admin.empty.description}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
            {admin.tiles.pending}
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {clients.map(client => (
              <div key={client.id} className="dashboard-card group relative overflow-hidden bg-linear-to-r from-[#0d0e14] to-[#080910] hover:border-white/10 transition-all duration-500">
                <div className="p-8 flex flex-col lg:flex-row gap-8 items-start lg:items-center relative z-10">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{client.company_name}</h3>
                      <span className="text-[9px] uppercase tracking-widest font-black text-amber-400 bg-amber-500/10 px-3 py-1 rounded">
                        {admin.item.potentialClient}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                      <div>
                        <p className="text-[9px] uppercase font-black text-white/20 tracking-widest mb-1">{admin.item.labels.contact}</p>
                        <p className="text-white font-bold">{client.contact_name}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-black text-white/20 tracking-widest mb-1">{admin.item.labels.email}</p>
                        <p className="text-red-400/80 font-mono text-xs">{client.email}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-black text-white/20 tracking-widest mb-1">{admin.item.labels.phone}</p>
                        <p className="text-white/60">{client.phone}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-black text-white/20 tracking-widest mb-1">{admin.item.labels.date}</p>
                        <p className="text-white/40">{new Date(client.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col w-full lg:w-56 gap-3">
                    <button 
                      onClick={() => handleAction(client, 'approve')}
                      disabled={processingId === client.id}
                      className="flex-1 py-4 bg-red-600 text-white hover:bg-red-500 transition-all text-[9px] font-black uppercase tracking-[0.2em] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {processingId === client.id ? (
                        <>
                          <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {admin.item.actions.processing}
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[14px]">bolt</span>
                          {admin.item.actions.approve}
                        </>
                      )}
                    </button>
                    <button 
                      onClick={() => handleAction(client, 'reject')}
                      disabled={processingId === client.id}
                      className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/5 text-white/30 hover:text-white transition-all text-[9px] font-black uppercase tracking-[0.2em] disabled:opacity-50"
                    >
                      {admin.item.actions.reject}
                    </button>
                  </div>
                </div>
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-linear-to-r from-red-500/0 via-red-500/[0.02] to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
