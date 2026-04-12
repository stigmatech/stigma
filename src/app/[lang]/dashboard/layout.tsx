import { redirect } from "next/navigation";
import type { Locale } from "@/i18n-config";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isFr = lang === "fr";
  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${lang}/client-login`);
  }
  
  const isAdmin = user.email?.toLowerCase().endsWith("@stigmatech.ca") ?? false;

  // Fetch profile but handle potential errors/missing records gracefully
  const { data: profile, error: profileError } = await supabase
    .from("client_profiles")
    .select("company_name, email, pax8_company_id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (profileError || !profile) {
    if (!isAdmin) {
      redirect(`/${lang}/onboarding`);
    }
  }
  
  const isPending = !isAdmin && !profile?.pax8_company_id;

  return (
    <div className="min-h-screen bg-[#080910]">
      <DashboardSidebar
        lang={lang as Locale}
        companyName={profile?.company_name}
        userEmail={user.email}
        isAdmin={isAdmin}
      />
      <main className="ml-64 min-h-screen relative">
        {isPending && (
           <div className="absolute inset-0 z-50 bg-[#080910]/60 backdrop-blur-md flex items-center justify-center p-12">
              <div className="max-w-md w-full bg-[#0d0e14] border border-blue-500/30 p-10 shadow-[0_0_100px_rgba(37,99,235,0.2)] text-center relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-purple-600 animate-pulse" />
                 <span className="material-symbols-outlined text-[48px] text-blue-400 mb-6 block mx-auto">hourglass_empty</span>
                 <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
                   {isFr ? "Dossier en révision" : "Account Under Review"}
                 </h2>
                 <p className="text-white/60 text-sm leading-relaxed mb-8">
                   {isFr 
                    ? "Nos ingénieurs procèdent actuellement à la vérification de votre identité corporative avant d'émettre votre catalogue cloud Pax8. Vous recevrez un courriel d'activation sous peu." 
                    : "Our engineers are currently verifying your corporate identity before provisioning your Pax8 cloud catalog. You will receive an activation email shortly."}
                 </p>
                 <a href={`/${lang}`} className="text-[10px] uppercase font-black tracking-widest text-white/30 hover:text-white transition-colors border border-white/10 px-4 py-2 block w-max mx-auto">
                   {isFr ? "Retour à l'accueil" : "Return home"}
                 </a>
              </div>
           </div>
        )}
        <div className={isPending ? "pointer-events-none blur-sm opacity-50 select-none h-screen overflow-hidden" : ""}>
          {children}
        </div>
      </main>
    </div>
  );
}
