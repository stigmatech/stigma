"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Locale } from "@/i18n-config";

interface RegisterClientProps {
  lang: Locale;
  dict: any;
}

export default function RegisterClient({ lang, dict }: RegisterClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080910] flex items-center justify-center p-4"><div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <RegisterClientContent lang={lang} dict={dict} />
    </Suspense>
  );
}

function RegisterClientContent({ lang, dict }: RegisterClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = dict.common.auth.register;
  const selectedPlanId = searchParams.get("plan");
  const selectedQuantity = searchParams.get("quantity") || "5";

  // Find plan details if plan is selected
  const allPlans = dict.pme?.pricing?.plans || [];
  const selectedPlan = allPlans.find((p: any) => 
    p.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === selectedPlanId
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    phone: "",
    address: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && selectedPlanId) {
        // User is already logged in and has a plan selected, land on dashboard first
        router.push(`/${lang}/dashboard/subscriptions?plan=${selectedPlanId}&quantity=${selectedQuantity}`);
      } else if (session) {
        // Logged in but no plan, go to dashboard
        router.push(`/${lang}/dashboard/subscriptions`);
      }
    };
    checkUser();
  }, [selectedPlanId, lang, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation: Passwords match
    if (formData.password !== formData.confirmPassword) {
      setError(lang === "fr" ? "Les mots de passe ne correspondent pas." : "Passwords do not match.");
      setLoading(false);
      return;
    }

    // Validation: Address length (Pax8 requirement usually needs a real address)
    if (formData.address.length < 10) {
      setError(lang === "fr" ? "Veuillez entrer une adresse complète valide." : "Please enter a valid full address.");
      setLoading(false);
      return;
    }

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
      console.error("Auth Error:", authError);
      if (authError.message.toLowerCase().includes("already registered") || authError.message.toLowerCase().includes("exists")) {
        setError(lang === "fr" 
          ? "Un compte existe déjà avec cet email. Veuillez vous connecter." 
          : "An account already exists with this email. Please log in.");
      } else {
        setError(authError.message);
      }
      setLoading(false);
      return;
    }

    if (!authData.user) {
      setError(auth.errorCreating);
      setLoading(false);
      return;
    }

    // 2. Create/Update Profile via Server Action (bypasses RLS issues)
    const { createClientProfile } = await import("@/lib/actions/auth");
    const profileResult = await createClientProfile({
      userId: authData.user.id,
      email: formData.email,
      companyName: formData.companyName,
      contactName: formData.name,
      phone: formData.phone,
      address: formData.address
    });

    if (!profileResult.success) {
      console.error("Profile Creation Error:", profileResult.error);
      setError(auth.profileError);
      setLoading(false);
      return;
    }

    // 3. Go to Dashboard first to see the account, passing plan info
    router.push(`/${lang}/dashboard/subscriptions?plan=${selectedPlanId || ''}&quantity=${selectedQuantity}`);
    setSuccess(true);
    setLoading(false);
    
    // Redirect after a short delay (only if no checkout redirect)
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
          <h2 className="text-2xl font-bold text-white">{auth.successTitle}</h2>
          <p className="text-white/50 text-sm">{auth.redirecting}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080910] flex items-center justify-center p-4 relative overflow-hidden py-24">
      {/* Background glow - Purple for Elite branding consistency */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Plan Summary if selected */}
        {selectedPlan && (
          <div className="mb-8 p-8 bg-white/[0.03] border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-600/10 transition-colors duration-500" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Récapitulatif de la commande</h3>
                  <p className="text-2xl font-bold text-white tracking-tight">{selectedPlan.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-white">{selectedPlan.price}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.1em] font-medium mt-1">{selectedPlan.period}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {selectedPlan.features.slice(0, 3).map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-none shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Premier mois à payer après l'inscription</span>
                <Link 
                  href={`/${lang}/solutions/industries`}
                  className="text-[10px] text-blue-500 font-bold uppercase tracking-widest hover:text-blue-400 transition-colors"
                >
                  Modifier
                </Link>
              </div>
            </div>
          </div>
        )}

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
              {auth.title}
            </h1>
            <p className="text-sm text-white/40">
              {auth.subtitle}
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleRegister} className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                    {auth.nameLabel}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-purple-900/5 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                    {auth.companyLabel}
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-purple-900/5 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                    {auth.emailLabel}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-purple-900/5 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                    {auth.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-purple-900/5 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                    {auth.passwordLabel}
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-purple-900/5 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                    {auth.confirmPasswordLabel}
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-purple-900/5 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                  {auth.addressLabel}
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={auth.addressPlaceholder}
                  className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-purple-900/5 transition-colors"
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
                className="w-full py-4 mt-4 bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {auth.signingUp}
                  </>
                ) : (
                  auth.signUp
                )}
              </button>

              <div className="text-center pt-4 border-t border-white/5">
                <p className="text-sm text-white/40">
                  {auth.alreadyClient}{" "}
                  <Link href={`/${lang}/client-login${selectedPlanId ? `?plan=${selectedPlanId}&quantity=${selectedQuantity}` : ''}`} className="text-purple-400 hover:underline">
                    {auth.login}
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
