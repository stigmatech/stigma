"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Invalid admin secret. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#06070b] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(126,34,206,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(126,34,206,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Image
            src="/logoStigmaTechnologies188x64.png"
            alt="Stigma"
            width={140}
            height={48}
            className="object-contain brightness-0 invert opacity-50"
          />
        </div>

        <div className="bg-[#0b0c12] border border-purple-500/10 shadow-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-purple-400 text-[18px]">shield</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">
              Admin Access
            </span>
          </div>

          <h1 className="text-xl font-display font-bold text-white mb-6">
            Internal Dashboard
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold block mb-2">
                Admin Secret Key
              </label>
              <input
                type="password"
                required
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Enter admin secret…"
                className="w-full bg-black/30 border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-700 text-white hover:bg-purple-600 disabled:opacity-40 transition-colors text-sm font-bold uppercase tracking-wider"
            >
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
