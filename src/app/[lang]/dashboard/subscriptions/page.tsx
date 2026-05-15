import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import SubscriptionsClient from "@/components/dashboard/SubscriptionsClient";
import { Suspense } from "react";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const isFr = lang === "fr";
  return {
    title: isFr 
      ? "Gestion des Abonnements | Stigma Technologies" 
      : "Subscription Management | Stigma Technologies",
    description: isFr
      ? "Gérez vos abonnements Pax8 et vos solutions Support 360 en temps réel."
      : "Manage your Pax8 subscriptions and Support 360 solutions in real-time.",
  };
}

export default async function SubscriptionsPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-[#080910]">
      {/* Elite Background Accent */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-purple-500/10 animate-[scan_6s_linear_infinite] z-20 shadow-[0_0_15px_rgba(168,85,247,0.1)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(147,51,234,0.05),transparent_70%)]" />
      </div>

      <main className="relative z-10">
        <Suspense fallback={
          <div className="p-12 max-w-7xl mx-auto space-y-12 pb-24 animate-pulse">
            <div className="h-20 bg-white/5 w-1/3 rounded-sm" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white/5 rounded-sm" />)}
            </div>
            <div className="space-y-8">
              <div className="h-6 bg-white/5 w-1/4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => <div key={i} className="h-64 bg-white/5 rounded-sm" />)}
              </div>
            </div>
          </div>
        }>
          <SubscriptionsClient lang={lang} dict={dict} />
        </Suspense>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}} />
    </div>
  );
}
