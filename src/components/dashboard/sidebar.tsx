"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface SidebarProps {
  lang: string;
  dict: any;
  companyName?: string;
  userEmail?: string;
  isAdmin?: boolean;
}

export function DashboardSidebar({ lang, dict, companyName, userEmail, isAdmin }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const sidebar = dict.common.dashboard.sidebar;

  const navItems = [
    {
      icon: "dashboard",
      label: sidebar.overview,
      href: "subscriptions",
    },
    {
      icon: "shopping_cart",
      label: sidebar.marketplace,
      href: "marketplace",
    },
    {
      icon: "receipt_long",
      label: sidebar.invoices,
      href: "invoices",
    },
    {
      icon: "support_agent",
      label: sidebar.support,
      href: "support",
    },
    {
      icon: "settings",
      label: sidebar.settings,
      href: "profile",
    },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.push(`/${lang}/client-login`);
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#080910] border-r border-white/5 flex flex-col z-40">
      {/* Brand & Context */}
      <div className="p-8">
        <Link href={`/${lang}`} className="block mb-8">
          <Image
            src="/logoStigmaTechnologies188x64.png"
            alt="Stigma Technologies"
            width={120}
            height={40}
            className="object-contain brightness-0 invert"
          />
        </Link>
        
        <div className="relative p-4 rounded-xl bg-linear-to-br from-purple-500/10 to-blue-500/10 border border-white/5 overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-400 mb-2">
            {sidebar.clientSpace}
          </p>
          <h4 className="text-xs font-bold text-white truncate max-w-full">
            {companyName || sidebar.myCompany}
          </h4>
          <p className="text-[10px] text-white/30 truncate mt-1">
            {userEmail}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const href = `/${lang}/dashboard/${item.href}`;
          const isActive = pathname === href || pathname.startsWith(href + "/");

          return (
            <div key={item.href}>
              {(item as any).comingSoon ? (
                <div className="flex items-center gap-3 px-4 py-3 text-white/10 cursor-not-allowed select-none transition-opacity opacity-50">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                </div>
              ) : (
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 transition-all duration-300 relative group ${
                    isActive
                      ? "text-white"
                      : "text-white/40 hover:text-white/80"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-white/5 rounded-lg -z-10 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]" />
                  )}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-purple-500 rounded-full" />
                  )}
                  <span className={`material-symbols-outlined text-[20px] transition-colors ${isActive ? "text-purple-400" : "group-hover:text-white"}`}>
                    {item.icon}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest leading-none">{item.label}</span>
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Premium Footer */}
      <div className="p-6 space-y-4">
        {isAdmin && (
          <Link
            href={`/${lang}/dashboard/admin`}
            className="w-full flex items-center justify-between px-4 py-3 bg-red-900/20 hover:bg-red-900/40 border border-red-500/20 hover:border-red-500/40 transition-all rounded-lg text-red-500 group"
          >
            <span className="flex items-center gap-3 text-xs font-black uppercase tracking-widest">
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
              {sidebar.adminPanel}
            </span>
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </Link>
        )}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all duration-300 group text-xs font-bold uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">
            logout
          </span>
          {loggingOut ? "..." : sidebar.logout}
        </button>
      </div>
    </aside>
  );
}
