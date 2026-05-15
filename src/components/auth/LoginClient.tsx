"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Locale } from "@/i18n-config";

interface LoginClientProps {
  lang: Locale;
  dict: any;
}

export default function LoginClient({ lang, dict }: LoginClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080910] flex items-center justify-center p-4"><div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <LoginClientContent lang={lang} dict={dict} />
    </Suspense>
  );
}

function LoginClientContent({ lang, dict }: LoginClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPlanId = searchParams.get("plan");
  const selectedQuantity = searchParams.get("quantity") || "5";
  const auth = dict.common.auth.login;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "reset">("login");
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(auth.invalidCredentials);
      setLoading(false);
      return;
    }

    if (data.user) {
      if (selectedPlanId) {
        router.push(`/${lang}/dashboard/subscriptions?plan=${selectedPlanId}&quantity=${selectedQuantity}`);
      } else {
        router.push(`/${lang}/dashboard/subscriptions`);
      }
      setLoading(false);
      setError(null);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/${lang}/dashboard/subscriptions`,
    });

    if (error) {
      setError(error.message);
    } else {
      setResetSent(true);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#080910] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-900/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href={`/${lang}`}>
            <Image
              src="/logoStigmaTechnologies188x64.png"
              alt="Stigma Technologies"
              width={160}
              height={55}
              className="object-contain brightness-0 invert"
            />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[#0d0e14] border border-white/5 shadow-2xl">
          {/* Header */}
          <div className="p-8 border-b border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">
                {auth.portal}
              </span>
            </div>
            <h1 className="text-2xl font-display font-bold text-white">
              {mode === "login" ? auth.title : auth.resetTitle}
            </h1>
            <p className="text-sm text-white/40 mt-1">
              {mode === "login" ? auth.access : auth.resetAccess}
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            {resetSent ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-3xl">mark_email_read</span>
                </div>
                <p className="text-white font-bold">{auth.emailSent}</p>
                <p className="text-sm text-white/40">{auth.checkInbox}</p>
                <button
                  onClick={() => { setMode("login"); setResetSent(false); }}
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-bold uppercase tracking-wider"
                >
                  {auth.backToLogin}
                </button>
              </div>
            ) : (
              <form onSubmit={mode === "login" ? handleLogin : handleReset} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                    {auth.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={auth.emailPlaceholder}
                    className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 focus:bg-purple-900/5 transition-colors"
                  />
                </div>

                {mode === "login" && (
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                      {auth.passwordLabel}
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 focus:bg-purple-900/5 transition-colors"
                    />
                  </div>
                )}

                {error && (
                  <div className="px-4 py-3 border border-red-500/30 bg-red-900/10">
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {auth.signingIn}
                    </>
                  ) : (
                    <>
                      {mode === "login" ? auth.signIn : auth.sendReset}
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </>
                  )}
                </button>

                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => { setMode("reset"); setError(null); }}
                    className="w-full text-center text-xs text-white/30 hover:text-purple-400 transition-colors"
                  >
                    {auth.forgotPassword}
                  </button>
                )}

                {mode === "reset" && (
                  <button
                    type="button"
                    onClick={() => { setMode("login"); setError(null); }}
                    className="w-full text-center text-xs text-white/30 hover:text-purple-400 transition-colors"
                  >
                    {auth.backToLogin}
                  </button>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-white/20 mt-6">
          {auth.restricted}
          <Link href={`/${lang}/client-register${selectedPlanId ? `?plan=${selectedPlanId}&quantity=${selectedQuantity}` : ''}`} className="text-purple-400/60 hover:text-purple-400 transition-colors font-bold underline">
            {auth.createAccount}
          </Link>
        </p>
      </div>
    </div>
  );
}
