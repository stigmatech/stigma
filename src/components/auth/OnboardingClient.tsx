"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Locale } from "@/i18n-config";

interface OnboardingClientProps {
  lang: Locale;
  dict: any;
}

export default function OnboardingClient({ lang, dict }: OnboardingClientProps) {
  const router = useRouter();
  const onboarding = dict.common.onboarding;

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
      setError(onboarding.error);
      setSaving(false);
      return;
    }

    router.push(`/${lang}/dashboard/subscriptions`);
  };

  if (loading) return <div className="min-h-screen bg-[#080910]" />;

  return (
    <div className="min-h-screen bg-[#080910] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow - Purple for Elite branding consistency */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
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
          <div className="p-8 border-b border-white/5">
            <h1 className="text-2xl font-display font-bold text-white mb-2">
              {onboarding.title}
            </h1>
            <p className="text-sm text-white/40">
              {onboarding.subtitle}
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                  {onboarding.companyLabel}
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Contoso Ltd."
                  className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-purple-900/5 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                  {onboarding.phoneLabel}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/3 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-purple-900/5 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                  {onboarding.addressLabel}
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="123 Avenue des Affaires, MTL, QC..."
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
                disabled={saving}
                className="w-full py-4 mt-4 bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-40 transition-colors text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {onboarding.saving}
                  </>
                ) : (
                  onboarding.submitBtn
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
