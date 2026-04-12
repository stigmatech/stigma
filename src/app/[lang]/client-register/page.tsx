"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ClientRegisterPage() {
  const params = useParams();
  const lang = (params.lang as string) || "en";
  const isFr = lang === "fr";
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    phone: "",
    address: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Register with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.name,
        }
      }
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (!authData.user) {
      setError(isFr ? "Erreur lors de la création du compte." : "Error creating account.");
      setLoading(false);
      return;
    }

    // 2. Insert into public.client_profiles
    const { error: profileError } = await supabase
      .from("client_profiles")
      .insert({
        user_id: authData.user.id,
        email: formData.email,
        company_name: formData.companyName,
        contact_name: formData.name,
        phone: formData.phone,
        address: formData.address
      });

    if (profileError) {
      console.error(profileError);
      setError(
        isFr
          ? "Votre compte a été créé, mais nous n'avons pas pu enregistrer votre profil. Veuillez contacter le support."
          : "Your account was created but the profile could not be saved. Please contact support."
      );
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    
    // Redirect instantly to dashboard or marketplace
    setTimeout(() => {
      router.push(`/${lang}/dashboard/subscriptions`);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#080910] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="w-full max-w-md bg-[#0d0e14] border border-white/5 shadow-2xl p-10 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto rounded-full">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            {isFr ? "Compte créé !" : "Account Created!"}
          </h2>
          <p className="text-white/50 text-sm">
            {isFr ? "Redirection vers la Marketplace..." : "Redirecting to Marketplace..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080910] flex items-center justify-center p-4 relative overflow-hidden py-24">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
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
            <h1 className="text-2xl font-display font-bold text-white mb-2">
              {isFr ? "Créer un compte d'entreprise" : "Create a Business Account"}
            </h1>
            <p className="text-sm text-white/40">
              {isFr
                ? "Rejoignez le portail client Stigma pour commander et gérer vos licences logicielles."
                : "Join the Stigma client portal to order and manage your software licenses."}
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleRegister} className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                    {isFr ? "Nom & Prénom" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-900/5 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                    {isFr ? "Entreprise" : "Company Name"}
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-900/5 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                    {isFr ? "Email Professionnel" : "Work Email"}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-900/5 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                    {isFr ? "Téléphone" : "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-900/5 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                  {isFr ? "Mot de passe" : "Password"}
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-900/5 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                  {isFr ? "Adresse complète (Obligatoire pour Pax8)" : "Full Address (Required by Pax8)"}
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Rue Principale, Montréal, QC, H1A 2B3"
                  className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-900/5 transition-colors"
                />
              </div>

              {error && (
                <div className="px-4 py-3 border border-red-500/30 bg-red-900/10">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-4 bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  isFr ? "S'inscrire" : "Sign Up"
                )}
              </button>

              <div className="text-center pt-4 border-t border-white/5">
                <p className="text-sm text-white/40">
                  {isFr ? "Déjà client ?" : "Already a client?"}{" "}
                  <Link href={`/${lang}/client-login`} className="text-blue-400 hover:underline">
                    {isFr ? "Connectez-vous" : "Log in"}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
