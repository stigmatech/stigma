"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function DashboardLoginPage() {
  const params = useParams();
  const lang = (params.lang as string) || "en";
  const isFr = lang === "fr";
  const router = useRouter();

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
      setError(
        isFr
          ? "Identifiants incorrects. Vérifiez votre email et mot de passe."
          : "Invalid credentials. Please check your email and password."
      );
      setLoading(false);
      return;
    }

    // Success State
    if (data.user) {
      setLoading(false); // Reset button loading
      setError(null);
      // We rely on the browser's native transition + our dashboard/loading.tsx 
      // for the high-end experience now.
      router.push(`/${lang}/dashboard/subscriptions`);
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
          <Image
            src="/logoStigmaTechnologies188x64.png"
            alt="Stigma Technologies"
            width={160}
            height={55}
            className="object-contain brightness-0 invert"
          />
        </div>

        {/* Card */}
        <div className="bg-[#0d0e14] border border-white/5 shadow-2xl">
          {/* Header */}
          <div className="p-8 border-b border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">
                {isFr ? "Portail Client Sécurisé" : "Secure Client Portal"}
              </span>
            </div>
            <h1 className="text-2xl font-display font-bold text-white">
              {mode === "login"
                ? isFr ? "Connexion" : "Sign In"
                : isFr ? "Réinitialiser" : "Reset Password"}
            </h1>
            <p className="text-sm text-white/40 mt-1">
              {mode === "login"
                ? isFr
                  ? "Accédez à vos licences et abonnements"
                  : "Access your licenses and subscriptions"
                : isFr
                  ? "Entrez votre email pour recevoir un lien"
                  : "Enter your email to receive a reset link"}
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            {resetSent ? (
               // ...
              <div className="text-center space-y-4 py-4">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-3xl">mark_email_read</span>
                </div>
                <p className="text-white font-bold">
                  {isFr ? "Email envoyé !" : "Email sent!"}
                </p>
                <p className="text-sm text-white/40">
                  {isFr
                    ? "Vérifiez votre boîte mail pour réinitialiser votre mot de passe."
                    : "Check your inbox to reset your password."}
                </p>
                <button
                  onClick={() => { setMode("login"); setResetSent(false); }}
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-bold uppercase tracking-wider"
                >
                  {isFr ? "← Retour à la connexion" : "← Back to login"}
                </button>
              </div>
            ) : (
              <form onSubmit={mode === "login" ? handleLogin : handleReset} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                    {isFr ? "Adresse email" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isFr ? "vous@entreprise.com" : "you@company.com"}
                    className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 focus:bg-purple-900/5 transition-colors"
                  />
                </div>

                {mode === "login" && (
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                      {isFr ? "Mot de passe" : "Password"}
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
                      {isFr ? "Connexion..." : "Signing in..."}
                    </>
                  ) : (
                    <>
                      {mode === "login"
                        ? isFr ? "Se connecter" : "Sign In"
                        : isFr ? "Envoyer le lien" : "Send Reset Link"}
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
                    {isFr ? "Mot de passe oublié ?" : "Forgot your password?"}
                  </button>
                )}

                {mode === "reset" && (
                  <button
                    type="button"
                    onClick={() => { setMode("login"); setError(null); }}
                    className="w-full text-center text-xs text-white/30 hover:text-purple-400 transition-colors"
                  >
                    {isFr ? "← Retour à la connexion" : "← Back to login"}
                  </button>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-white/20 mt-6">
          {isFr
            ? "Accès réservé aux clients Stigma Technologies. "
            : "Restricted access for Stigma Technologies clients. "}
          <Link href={`/${lang}/client-register`} className="text-purple-400/60 hover:text-purple-400 transition-colors font-bold underline">
            {isFr ? "Créer un compte" : "Create an account"}
          </Link>
        </p>
      </div>
    </div>
  );
}
