"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function OnboardingPage() {
  const params = useParams();
  const lang = (params.lang as string) || "en";
  const isFr = lang === "fr";
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    companyName: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
         router.replace(`/${lang}/client-login`);
      } else {
         setUser(data.user);
         setLoading(false);
      }
    });
  }, [lang, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSaving(true);
    setError(null);

    const email = user.email || "";
    // Grab name from OAuth metadata if exists
    const contactName = user.user_metadata?.full_name || user.user_metadata?.name || email.split("@")[0] || "Contact";

    const { error: profileError } = await supabase
      .from("client_profiles")
      .insert({
        user_id: user.id,
        email: email,
        company_name: formData.companyName,
        contact_name: contactName,
        phone: formData.phone,
        address: formData.address,
      });

    if (profileError) {
      console.error(profileError);
      setError(
        isFr
          ? "Erreur lors de la sauvegarde du profil."
          : "Error saving profile."
      );
      setSaving(false);
      return;
    }

    // Success! Redirect to dashboard (will hit the Waiting Room)
    router.push(`/${lang}/dashboard/subscriptions`);
  };

  if (loading) return <div className="min-h-screen bg-[#080910]" />;

  return (
    <div className="min-h-screen bg-[#080910] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logoStigmaTechnologies188x64.png"
            alt="Stigma"
            width={160}
            height={55}
            className="object-contain brightness-0 invert"
          />
        </div>

        {/* Card */}
        <div className="bg-[#0d0e14] border border-white/5 shadow-2xl">
          <div className="p-8 border-b border-white/5">
            <h1 className="text-2xl font-display font-bold text-white mb-2">
              {isFr ? "Dernière Étape !" : "One Last Step!"}
            </h1>
            <p className="text-sm text-white/40">
              {isFr
                ? "Microsoft nous a transmis votre email, mais nous avons besoin de vos informations d'entreprise pour le registre Pax8."
                : "Microsoft provided your email, but we need your company details for the Pax8 registry."}
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                  {isFr ? "Nom de l'Entreprise" : "Company Name"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Contoso Ltd."
                  className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-900/5 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                  {isFr ? "Téléphone" : "Phone Number"}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-900/5 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                  {isFr ? "Adresse Complète" : "Full Address"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="123 Avenue des Affaires, MTL, QC..."
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
                disabled={saving}
                className="w-full py-4 mt-4 bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-40 transition-colors text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2"
              >
                {saving ? "..." : (isFr ? "Terminer l'Inscription" : "Complete Registration")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
