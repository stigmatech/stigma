"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ClientProfile {
  user_id: string;
  email: string;
  company_name: string;
  pax8_company_id: string;
  created_at: string;
}

interface Pax8Company {
  id: string;
  name: string;
}

const ADMIN_SECRET = ""; // Entered at runtime for security

export default function AdminPage() {
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [pax8Companies, setPax8Companies] = useState<Pax8Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminSecret, setAdminSecret] = useState("");

  // Invite form
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteCompanyName, setInviteCompanyName] = useState("");
  const [invitePax8Id, setInvitePax8Id] = useState("");
  const [inviting, setInviting] = useState(false);
  const [inviteResult, setInviteResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const headers = { 'x-admin-secret': adminSecret, 'Content-Type': 'application/json' };

  const fetchClients = async () => {
    if (!adminSecret) return;
    setLoading(true);
    try {
      const [clientsRes, companiesRes] = await Promise.all([
        fetch('/api/admin/clients', { headers }),
        fetch('/api/admin/clients', { method: 'PATCH', headers }),
      ]);
      const clientsData = await clientsRes.json();
      const companiesData = await companiesRes.json();
      setClients(clientsData.clients || []);
      setPax8Companies(companiesData.companies || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminSecret) fetchClients();
  }, [adminSecret]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);
    setInviteResult(null);

    try {
      const res = await fetch('/api/admin/invite', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email: inviteEmail,
          companyName: inviteCompanyName,
          pax8CompanyId: invitePax8Id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setInviteResult({ type: 'success', message: data.message });
        setInviteEmail("");
        setInviteCompanyName("");
        setInvitePax8Id("");
        fetchClients();
      } else {
        setInviteResult({ type: 'error', message: data.error });
      }
    } catch (err: any) {
      setInviteResult({ type: 'error', message: err.message });
    } finally {
      setInviting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06070b] text-white">
      {/* Top Bar */}
      <header className="border-b border-white/5 bg-[#0b0c12] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/logoStigmaTechnologies188x64.png"
            alt="Stigma"
            width={120}
            height={40}
            className="object-contain brightness-0 invert"
          />
          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 border border-purple-500/30 px-2 py-1">
            Admin Panel
          </span>
        </div>

        {/* Quick secret entry */}
        {!adminSecret && (
          <div className="flex items-center gap-3">
            <input
              type="password"
              placeholder="Enter admin secret to unlock…"
              className="bg-black/30 border border-white/10 text-white px-4 py-2 text-xs w-64 placeholder:text-white/20 focus:outline-none focus:border-purple-500/50"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setAdminSecret((e.target as HTMLInputElement).value);
                }
              }}
            />
            <button
              onClick={(e) => {
                const input = (e.currentTarget.previousSibling as HTMLInputElement);
                setAdminSecret(input.value);
              }}
              className="px-4 py-2 bg-purple-700 text-xs font-bold uppercase tracking-wider hover:bg-purple-600 transition-colors"
            >
              Unlock
            </button>
          </div>
        )}

        {adminSecret && (
          <span className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Authenticated
          </span>
        )}
      </header>

      <div className="max-w-7xl mx-auto p-8 grid grid-cols-3 gap-8">
        {/* Invite Form */}
        <div className="col-span-1">
          <div className="bg-[#0d0e14] border border-white/5 p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-1">
              Invite a Client
            </h2>
            <p className="text-xs text-white/30 mb-6">
              Send a magic link and link to their Pax8 account.
            </p>

            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold block mb-1">
                  Client Email *
                </label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="client@company.com"
                  className="w-full bg-black/30 border border-white/10 text-white px-3 py-2 text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold block mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={inviteCompanyName}
                  onChange={(e) => setInviteCompanyName(e.target.value)}
                  placeholder="Acme Corp"
                  className="w-full bg-black/30 border border-white/10 text-white px-3 py-2 text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold block mb-1">
                  Pax8 Company ID *
                </label>
                {pax8Companies.length > 0 ? (
                  <select
                    required
                    value={invitePax8Id}
                    onChange={(e) => {
                      const company = pax8Companies.find(c => c.id === e.target.value);
                      setInvitePax8Id(e.target.value);
                      if (company && !inviteCompanyName) setInviteCompanyName(company.name);
                    }}
                    className="w-full bg-black/30 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="">Select a Pax8 company…</option>
                    {pax8Companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    required
                    value={invitePax8Id}
                    onChange={(e) => setInvitePax8Id(e.target.value)}
                    placeholder="Paste Pax8 Company UUID…"
                    className="w-full bg-black/30 border border-white/10 text-white px-3 py-2 text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/50"
                  />
                )}
              </div>

              {inviteResult && (
                <div className={`p-3 border text-xs ${
                  inviteResult.type === 'success'
                    ? 'border-emerald-500/30 bg-emerald-900/10 text-emerald-300'
                    : 'border-red-500/30 bg-red-900/10 text-red-300'
                }`}>
                  {inviteResult.message}
                </div>
              )}

              <button
                type="submit"
                disabled={inviting || !adminSecret}
                className="w-full py-3 bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-bold uppercase tracking-wider"
              >
                {inviting ? "Sending Invitation…" : "Send Invitation"}
              </button>
            </form>
          </div>
        </div>

        {/* Client List */}
        <div className="col-span-2">
          <div className="bg-[#0d0e14] border border-white/5">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-white">
                  Active Clients
                </h2>
                <p className="text-xs text-white/30 mt-0.5">{clients.length} clients linked</p>
              </div>
              <button
                onClick={fetchClients}
                className="flex items-center gap-2 text-xs text-white/30 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="p-8 text-center text-white/20 text-sm">Loading clients…</div>
            ) : clients.length === 0 ? (
              <div className="p-8 text-center">
                <span className="material-symbols-outlined text-[48px] text-white/10">group</span>
                <p className="text-sm text-white/20 mt-2">No clients invited yet.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-6 py-3 text-[9px] uppercase tracking-widest text-white/30 font-bold">Client</th>
                    <th className="text-left px-6 py-3 text-[9px] uppercase tracking-widest text-white/30 font-bold">Pax8 Company ID</th>
                    <th className="text-left px-6 py-3 text-[9px] uppercase tracking-widest text-white/30 font-bold">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.user_id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-white">{client.company_name || '—'}</p>
                        <p className="text-xs text-white/30">{client.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono text-purple-400/70">{client.pax8_company_id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-white/30">
                          {new Date(client.created_at).toLocaleDateString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
