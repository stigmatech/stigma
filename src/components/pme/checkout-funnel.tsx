"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Trash2, 
  Building2, 
  Users2, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Info,
  ShieldAlert,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n-config";

interface CheckoutFunnelProps {
  lang: Locale;
  dictionary: any;
}

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export function CheckoutFunnel({ lang, dictionary }: CheckoutFunnelProps) {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") || "pro";
  const isFr = lang === "fr";
  const dict = dictionary.pme;

  const [step, setStep] = useState(1);
  const [priority, setPriority] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [plan, setPlan] = useState(initialPlan);
  const [company, setCompany] = useState({
    name: "",
    industry: "",
    address: "",
    website: "",
    taxId: ""
  });
  const [employees, setEmployees] = useState<Employee[]>([
    { id: Math.random().toString(36).substr(2, 9), firstName: "", lastName: "", email: "", role: "" }
  ]);
  const [addons, setAddons] = useState<{ id: string; selected: boolean }[]>([
    { id: "m365-standard", selected: false },
    { id: "backup-premium", selected: false },
    { id: "training-premium", selected: false }
  ]);

  const plans = [
    { 
      id: "essentiel", 
      name: isFr ? "Essentiel" : "Essential", 
      price: 119,
      features: isFr ? [
        "Support TI illimité (Agent IA, Téléphone, À distance & Sur site)",
        "EDR (Endpoint Detection & Response)",
        "Sauvegardes infonuagiques quotidiennes",
        "Supervision proactive 24/7",
        "Gestion Microsoft 365"
      ] : [
        "Unlimited IT Support (AI Agent, Phone, Remote & On-site)",
        "EDR (Endpoint Detection & Response)",
        "Daily Cloud Backups",
        "24/7 Proactive Monitoring",
        "Microsoft 365 Management"
      ]
    },
    { 
      id: "pro", 
      name: "Pro", 
      price: 179,
      features: isFr ? [
        "Tout l'Essentiel +",
        "XDR (Extended Detection & Response)",
        "Authentification multi-facteurs",
        "Formation cybersécurité employés",
        "Conformité Loi 25 (registre + politique)",
        "Plan d'incident documenté"
      ] : [
        "All Essential +",
        "XDR (Extended Detection & Response)",
        "Multi-factor Authentication",
        "Employee Cybersecurity Training",
        "Law 25 Compliance",
        "Documented Incident Plan"
      ]
    },
    { 
      id: "élite", 
      name: "Élite", 
      price: 249,
      features: isFr ? [
        "Tout le Pro +",
        "Audit Loi 25 complet annuel",
        "DLP (prévention de fuite de données)",
        "vCISO dédié (1 h / mois)",
        "Support prioritaire (SLA 1 h)",
        "Tests de pénétration annuels"
      ] : [
        "All Pro +",
        "Annual Full Law 25 Audit",
        "DLP (Data Loss Prevention)",
        "Dedicated vCISO (1 hr / month)",
        "Priority Support (1 hr SLA)",
        "Annual Penetration Tests"
      ]
    }
  ];

  const currentPlan = plans.find(p => p.id === plan) || plans[1];

  const addEmployee = () => {
    setEmployees([...employees, { id: Math.random().toString(36).substr(2, 9), firstName: "", lastName: "", email: "", role: "" }]);
  };

  const removeEmployee = (id: string) => {
    if (employees.length > 1) {
      setEmployees(employees.filter(e => e.id !== id));
    }
  };

  const updateEmployee = (id: string, field: keyof Employee, value: string) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const toggleAddon = (id: string) => {
    setAddons(addons.map(a => a.id === id ? { ...a, selected: !a.selected } : a));
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "pme_order",
          company,
          employees,
          plan: currentPlan,
          addons: addons.filter(a => a.selected),
          lang
        })
      });
      
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 7));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 text-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-950 p-16 text-white border border-white/10"
        >
          <div className="w-20 h-20 bg-blue-600 flex items-center justify-center mx-auto mb-10">
            <Check size={40} className="text-white" />
          </div>
          <h2 className="text-5xl font-display font-black uppercase tracking-tighter mb-6">
            {isFr ? "COMMANDE REÇUE." : "ORDER RECEIVED."}
          </h2>
          <p className="text-slate-400 text-xl font-light mb-12 max-w-xl mx-auto">
            {isFr 
              ? "Nous préparons votre environnement. Un expert Stigma vous contactera dans les prochaines 24h pour finaliser le déploiement."
              : "We are preparing your environment. A Stigma expert will contact you within the next 24 hours to finalize the deployment."}
          </p>
          <Button asChild className="bg-white text-slate-950 hover:bg-slate-200 rounded-none px-12 h-14 font-black uppercase tracking-widest">
            <a href={`/${lang}/pme`}>{isFr ? "RETOUR AU SITE" : "BACK TO SITE"}</a>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header / Breadcrumb */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <Link 
            href={`/${lang}/pme`}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-950 transition-colors group"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            {isFr ? "RETOUR AUX FORFAITS" : "BACK TO PLANS"}
          </Link>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div 
                  className={`w-6 h-6 rounded-none flex items-center justify-center text-[8px] font-black transition-all duration-500 ${
                    step >= i ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {i}
                </div>
                {i < 7 && (
                  <div className={`w-4 h-px ${step > i ? "bg-slate-950" : "bg-slate-100"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Funnel Steps */}
        <div className="lg:col-span-8">
          
          {/* Progress Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">
                {isFr ? "CONFIGURATEUR PME" : "SME CONFIGURATOR"}
              </span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>
            <div className="flex justify-between items-end">
              <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none">
                {step === 1 && (isFr ? "CONFIRMER LE PLAN" : "CONFIRM PLAN")}
                {step === 2 && (isFr ? "VOTRE SECTEUR" : "YOUR SECTOR")}
                {step === 3 && (isFr ? "BESOINS URGENTS ?" : "URGENT NEEDS?")}
                {step === 4 && (isFr ? "VOTRE ENTREPRISE" : "YOUR COMPANY")}
                {step === 5 && (isFr ? "VOS EMPLOYÉS" : "YOUR EMPLOYEES")}
                {step === 6 && (isFr ? "OPTIONS & PROMOTIONS" : "OPTIONS & PROMOS")}
                {step === 7 && (isFr ? "RÉCAPITULATIF" : "REVIEW")}
              </h1>
              <div className="text-3xl font-display font-black text-slate-200">0{step}/07</div>
            </div>
            {/* Visual Progress Bar */}
            <div className="h-1 w-full bg-slate-100 mt-6 relative overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: `${(step / 7) * 100}%` }}
                className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-500 ease-out"
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white border border-slate-100 p-8 md:p-12 shadow-sm"
            >
              
              {/* STEP 1: Plan Confirmation */}
              {step === 1 && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPlan(p.id)}
                        className={cn(
                          "p-8 text-left border transition-all duration-300 flex flex-col h-full",
                          plan === p.id 
                            ? "border-slate-950 bg-slate-950 text-white" 
                            : "border-slate-100 hover:border-slate-400"
                        )}
                      >
                        <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">
                          {p.name}
                        </h3>
                        {p.id === "pro" && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1">
                            {isFr ? "PLUS POPULAIRE" : "MOST POPULAR"}
                          </div>
                        )}
                        <div className="text-3xl font-display font-black mb-1">{p.price}$</div>
                        <div className="text-[9px] uppercase tracking-widest opacity-50 mb-8">/ siège / mois</div>
                        
                        <div className="mt-auto space-y-3">
                          {p.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <Check size={10} className={cn("mt-1 shrink-0", plan === p.id ? "text-blue-400" : "text-blue-600")} />
                              <span className={cn("text-[10px] font-medium leading-tight", plan === p.id ? "text-slate-300" : "text-slate-600")}>
                                {feat}
                              </span>
                            </div>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="p-6 bg-slate-50 border-l-4 border-blue-600">
                    <p className="text-sm font-light text-slate-600 leading-relaxed">
                      {isFr 
                        ? "Le plan sélectionné sera appliqué à tous les utilisateurs que vous ajouterez à l'étape suivante. Vous pourrez modifier ces paramètres plus tard."
                        : "The selected plan will be applied to all users you add in the next step. You can modify these settings later."}
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 2: Industry Selection */}
              {step === 2 && (
                <div className="space-y-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { id: "finance", name: "Finance & Assurance", icon: "💰" },
                      { id: "legal", name: "Juridique / Notaire", icon: "⚖️" },
                      { id: "health", name: "Santé / Clinique", icon: "🏥" },
                      { id: "tech", name: "Technologie / SaaS", icon: "💻" },
                      { id: "retail", name: "Commerce de détail", icon: "🛒" },
                      { id: "construction", name: "Construction / Immobilier", icon: "🏗️" },
                      { id: "mfg", name: "Manufacturier", icon: "🏭" },
                      { id: "edu", name: "Éducation / Formation", icon: "🎓" },
                      { id: "other", name: "Autre Secteur", icon: "🌐" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setCompany({...company, industry: s.name});
                          nextStep();
                        }}
                        className={cn(
                          "p-6 text-center border transition-all duration-300 flex flex-col items-center gap-3",
                          company.industry === s.name 
                            ? "border-slate-950 bg-slate-950 text-white" 
                            : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                        )}
                      >
                        <span className="text-3xl">{s.icon}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest leading-tight">{s.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Urgent Needs Selection */}
              {step === 3 && (
                <div className="space-y-8">
                  <div className="p-4 bg-orange-50 border border-orange-100 flex items-center gap-3 mb-6">
                    <Zap size={16} className="text-orange-600" />
                    <p className="text-[10px] font-bold text-orange-800 uppercase tracking-tight">
                      {isFr ? "SIGNALEZ-NOUS TOUTE SITUATION NÉCESSITANT UNE INTERVENTION DANS LES 24H" : "REPORT ANY SITUATION REQUIRING INTERVENTION WITHIN 24H"}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { id: "incident", title: "Incident de sécurité / Cyberattaque", desc: "Urgence absolue : mon infrastructure est compromise ou à risque.", icon: <ShieldAlert size={20} className="text-red-600" /> },
                      { id: "deployment", title: "Déploiement immédiat requis", desc: "Nous devons être opérationnels sur ce nouveau plan dès demain.", icon: <Zap size={20} className="text-orange-600" /> },
                      { id: "compliance", title: "Échéance de conformité proche", desc: "Audit imminent ou deadline légale (Loi 25) à respecter.", icon: <Calendar size={20} className="text-blue-600" /> },
                      { id: "no_urgency", title: "Pas d'urgence particulière", desc: "Je souhaite simplement moderniser mon infrastructure sereinement.", icon: <Check size={20} className="text-green-600" /> },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setPriority(p.title);
                          nextStep();
                        }}
                        className={cn(
                          "p-8 text-left border transition-all duration-300 flex items-center gap-6 group",
                          priority === p.title 
                            ? "border-slate-950 bg-slate-50 shadow-lg shadow-slate-200/50" 
                            : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                        )}
                      >
                        <div className={cn(
                          "w-12 h-12 flex items-center justify-center shrink-0 border border-slate-100 bg-white",
                          priority === p.title ? "border-slate-950 scale-110" : ""
                        )}>
                          {p.icon}
                        </div>
                        <div>
                          <h4 className="font-black uppercase text-sm tracking-tight mb-1 text-slate-950">{p.title}</h4>
                          <p className="text-[11px] font-medium text-slate-500 leading-snug">{p.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Company Info */}
              {step === 4 && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-blue-600 transition-colors">NOM DE L'ENTREPRISE</label>
                      <Input 
                        value={company.name} 
                        onChange={(e) => setCompany({...company, name: e.target.value})}
                        className="rounded-none border-t-0 border-x-0 border-b-2 border-slate-200 focus-visible:ring-0 focus-visible:border-blue-600 px-0 h-12 text-xl font-bold uppercase tracking-tight transition-all"
                      />
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-blue-600 transition-colors">ADRESSE DU SIÈGE</label>
                      <Input 
                        value={company.address} 
                        onChange={(e) => setCompany({...company, address: e.target.value})}
                        className="rounded-none border-t-0 border-x-0 border-b-2 border-slate-200 focus-visible:ring-0 focus-visible:border-blue-600 px-0 h-12 text-xl font-bold uppercase tracking-tight transition-all"
                      />
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-blue-600 transition-colors">SITE WEB</label>
                      <Input 
                        value={company.website} 
                        onChange={(e) => setCompany({...company, website: e.target.value})}
                        className="rounded-none border-t-0 border-x-0 border-b-2 border-slate-200 focus-visible:ring-0 focus-visible:border-blue-600 px-0 h-12 text-xl font-bold uppercase tracking-tight transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Employees */}
              {step === 5 && (
                <div className="space-y-10">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {isFr ? `LISTE DES UTILISATEURS (${employees.length})` : `USER LIST (${employees.length})`}
                    </p>
                    <div className="flex gap-4">
                      <Button variant="ghost" className="rounded-none border border-slate-200 text-slate-400 hover:text-slate-950 flex items-center gap-2 h-10 text-[10px] font-black uppercase tracking-widest">
                        {isFr ? "IMPORTER CSV" : "IMPORT CSV"}
                      </Button>
                      <Button onClick={addEmployee} variant="outline" className="rounded-none border-slate-950 text-slate-950 hover:bg-slate-950 hover:text-white flex items-center gap-2 h-10 text-[10px] font-black uppercase tracking-widest">
                        <Plus size={14} />
                        {isFr ? "AJOUTER" : "ADD"}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {employees.map((emp, idx) => (
                      <div key={emp.id} className="p-6 bg-slate-50 border border-slate-100 relative group/row">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                          <div className="md:col-span-1 flex items-center justify-center">
                            <span className="text-2xl font-display font-black text-slate-200">{idx + 1}</span>
                          </div>
                          <div className="md:col-span-3">
                            <Input 
                              placeholder={isFr ? "Prénom" : "First Name"}
                              value={emp.firstName}
                              onChange={(e) => updateEmployee(emp.id, "firstName", e.target.value)}
                              className="rounded-none border-slate-200 focus-visible:ring-slate-950 h-10 text-sm"
                            />
                          </div>
                          <div className="md:col-span-3">
                            <Input 
                              placeholder={isFr ? "Nom" : "Last Name"}
                              value={emp.lastName}
                              onChange={(e) => updateEmployee(emp.id, "lastName", e.target.value)}
                              className="rounded-none border-slate-200 focus-visible:ring-slate-950 h-10 text-sm"
                            />
                          </div>
                          <div className="md:col-span-4">
                            <Input 
                              placeholder="Email"
                              value={emp.email}
                              onChange={(e) => updateEmployee(emp.id, "email", e.target.value)}
                              className="rounded-none border-slate-200 focus-visible:ring-slate-950 h-10 text-sm"
                            />
                          </div>
                          <div className="md:col-span-1 flex items-center justify-end">
                            <button 
                              onClick={() => removeEmployee(emp.id)}
                              disabled={employees.length === 1}
                              className="text-slate-300 hover:text-red-600 transition-colors disabled:opacity-0"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 6: Add-ons & Promos */}
              {step === 6 && (
                <div className="space-y-8">
                  <div className="p-6 bg-blue-50 border border-blue-100 flex items-start gap-4 mb-8">
                    <Zap className="text-blue-600 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-black uppercase text-sm text-blue-900 tracking-tight mb-1">OFFRE DE LANCEMENT</h4>
                      <p className="text-xs text-blue-700 font-medium">Microsoft 365 Business Standard inclus pour 0$ les 3 premiers mois.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <button 
                      onClick={() => toggleAddon("m365-standard")}
                      className={cn(
                        "p-8 text-left border transition-all flex items-center justify-between",
                        addons.find(a => a.id === "m365-standard")?.selected 
                          ? "border-slate-950 bg-slate-50 shadow-lg shadow-slate-200/50" 
                          : "border-slate-100 hover:border-slate-300"
                      )}
                    >
                      <div className="flex items-center gap-6">
                        <div className={cn(
                          "w-12 h-12 flex items-center justify-center",
                          addons.find(a => a.id === "m365-standard")?.selected ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-400"
                        )}>
                          <ShieldCheck size={24} />
                        </div>
                        <div>
                          <h4 className="font-black uppercase text-base tracking-tight mb-1">Microsoft 365 Business Standard</h4>
                          <p className="text-xs text-slate-500">Suite complète + Copilot Ready</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-display font-black text-slate-950">PROMO 0$</div>
                        <div className="text-[10px] text-slate-400 uppercase font-black">VALEUR : 18.50$</div>
                      </div>
                    </button>

                    <button 
                      onClick={() => toggleAddon("backup-premium")}
                      className={cn(
                        "p-8 text-left border transition-all flex items-center justify-between",
                        addons.find(a => a.id === "backup-premium")?.selected 
                          ? "border-slate-950 bg-slate-50 shadow-lg shadow-slate-200/50" 
                          : "border-slate-100 hover:border-slate-300"
                      )}
                    >
                      <div className="flex items-center gap-6">
                        <div className={cn(
                          "w-12 h-12 flex items-center justify-center",
                          addons.find(a => a.id === "backup-premium")?.selected ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-400"
                        )}>
                          <Zap size={24} />
                        </div>
                        <div>
                          <h4 className="font-black uppercase text-base tracking-tight mb-1">Protection Données Premium</h4>
                          <p className="text-xs text-slate-500">Rétention illimitée & Immuabilité</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-display font-black text-slate-950">+15$</div>
                        <div className="text-[10px] text-slate-400 uppercase font-black">/ mois / siège</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 7: Review */}
              {step === 7 && (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">DÉTAILS DU COMPTE</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between border-b border-slate-50 pb-2">
                          <span className="text-xs font-medium text-slate-500 uppercase tracking-tight">Entreprise</span>
                          <span className="text-xs font-black text-slate-950 uppercase">{company.name}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-50 pb-2">
                          <span className="text-xs font-medium text-slate-500 uppercase tracking-tight">Secteur</span>
                          <span className="text-xs font-black text-slate-950 uppercase">{company.industry}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-50 pb-2">
                          <span className="text-xs font-medium text-slate-500 uppercase tracking-tight">Priorité</span>
                          <span className="text-xs font-black text-blue-600 uppercase tracking-tight">{priority}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-50 pb-2">
                          <span className="text-xs font-medium text-slate-500 uppercase tracking-tight">Plan Choisi</span>
                          <span className="text-xs font-black text-blue-600 uppercase">{currentPlan.name}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-50 pb-2">
                          <span className="text-xs font-medium text-slate-500 uppercase tracking-tight">Utilisateurs</span>
                          <span className="text-xs font-black text-slate-950 uppercase">{employees.length}</span>
                        </div>
                      </div>
                      <div className="mt-6 space-y-2">
                        {currentPlan.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                            <Check size={10} className="text-blue-600" />
                            {feat}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">RÉSUMÉ FINANCIER</h4>
                      <div className="bg-slate-50 p-6 border border-slate-100">
                        <div className="flex justify-between mb-4">
                          <span className="text-sm font-medium text-slate-600">Sous-total mensuel</span>
                          <span className="text-sm font-black">{(currentPlan.price * employees.length).toFixed(2)}$</span>
                        </div>
                        <div className="flex justify-between items-end border-t border-slate-200 pt-6">
                          <span className="text-xs font-black uppercase tracking-widest">Total mensuel</span>
                          <div className="text-right">
                            <div className="text-3xl font-display font-black text-slate-950">
                              {(currentPlan.price * employees.length).toFixed(2)}$
                            </div>
                            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">CAD / MOIS</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-slate-950 text-white flex flex-col md:flex-row items-center gap-8">
                    <div className="w-16 h-16 bg-white/10 flex items-center justify-center shrink-0">
                      <Info size={32} className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-base tracking-tighter mb-2">Processus de vérification</h4>
                      <p className="text-sm text-slate-400 font-light leading-relaxed">
                        En soumettant cette commande, vous initiez le processus de déploiement technique. Notre équipe vérifiera les informations de votre entreprise et vous enverra le contrat final via DocuSign pour signature électronique.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons - Sticky on mobile, stable outside animations */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 flex justify-between items-center z-50 md:relative md:p-0 md:bg-transparent md:border-t-0 md:mt-16 md:z-auto">
            {step > 1 ? (
              <Button 
                onClick={prevStep}
                variant="ghost"
                className="text-slate-400 hover:text-slate-950 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest h-14 px-6"
              >
                <ChevronLeft size={16} />
                {isFr ? "RETOUR" : "BACK"}
              </Button>
            ) : <div />}

            <Button 
              onClick={step === 7 ? handleSubmit : nextStep}
              disabled={loading}
              className="bg-slate-950 hover:bg-slate-900 text-white rounded-none px-8 md:px-12 h-14 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4 group"
            >
              {loading ? (isFr ? "TRAITEMENT..." : "PROCESSING...") : (
                <>
                  {step === 7 ? (isFr ? "CONFIRMER LA COMMANDE" : "CONFIRM ORDER") : (isFr ? "SUIVANT" : "NEXT")}
                  {step < 7 && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                  {step === 7 && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Right Side: Order Summary Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-8">
            
            {/* Summary Card */}
            <div className="bg-slate-50 border border-slate-100 p-8 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 border-b border-slate-200 pb-4">
                {isFr ? "VOTRE CONFIGURATION" : "YOUR SETUP"}
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">FORFAIT</div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-black uppercase tracking-tight text-slate-950">{currentPlan.name}</span>
                    <span className="text-xs font-bold text-slate-400">{currentPlan.price}$/siège</span>
                  </div>
                </div>

                <div>
                  <div className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">UTILISATEURS</div>
                  <div className="flex items-center gap-2">
                    <Users2 size={16} className="text-slate-400" />
                    <span className="font-black text-slate-950">{employees.length}</span>
                  </div>
                </div>

                {addons.some(a => a.selected) && (
                  <div>
                    <div className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">ADD-ONS</div>
                    <div className="space-y-2">
                      {addons.filter(a => a.selected).map(addon => (
                        <div key={addon.id} className="flex items-center gap-2 text-[11px] font-bold text-blue-600 uppercase">
                          <Check size={12} />
                          {addon.id === "m365-standard" ? "M365 Business Standard" : addon.id}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-12 pt-8 border-t-2 border-dashed border-slate-200">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">TOTAL MENSUEL</span>
                  <div className="text-right">
                    <div className="text-4xl font-display font-black text-slate-950 leading-none">
                      {(currentPlan.price * employees.length).toFixed(0)}$
                    </div>
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">/ mois</div>
                    <div className="text-[7px] font-black text-blue-600 uppercase tracking-[0.2em] mt-2">
                      SOIT ENV. {((currentPlan.price * employees.length) / 30).toFixed(2)}$ / JOUR
                    </div>
                  </div>
                </div>
              </div>

              {/* ROI Calculator Section */}
              <div className="mt-8 p-6 bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                    <Zap size={14} />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-950">ROI ESTIMÉ</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[9px] font-bold text-slate-500 uppercase">Productivité gagnée</span>
                    <span className="text-sm font-black text-blue-600">+{employees.length * 2.5}H / MOIS</span>
                  </div>
                  <div className="h-1 w-full bg-slate-200 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "70%" }}
                      className="h-full bg-blue-600"
                    />
                  </div>
                  <p className="text-[8px] font-medium text-slate-400 uppercase leading-relaxed tracking-tight">
                    {isFr 
                      ? "BASÉ SUR LA RÉDUCTION DU DOWNTIME ET L'OPTIMISATION DES PROCESSUS IA." 
                      : "BASED ON DOWNTIME REDUCTION AND AI PROCESS OPTIMIZATION."}
                  </p>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest">
              <ShieldCheck size={12} className="text-green-600" />
              {isFr ? "PAIEMENT SÉCURISÉ SSL 256-BIT" : "SECURE 256-BIT SSL PAYMENT"}
            </div>

            {/* Support Box */}
            <div className="p-8 bg-white border border-slate-100 shadow-sm flex items-center gap-6">
              <div className="w-12 h-12 bg-slate-950 text-white flex items-center justify-center shrink-0">
                <Building2 size={24} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-950 mb-1">BESOIN D'AIDE ?</h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest underline cursor-pointer hover:text-blue-600 transition-colors">
                  PARLER À UN ARCHITECTE
                </p>
              </div>
            </div>

            {/* Trust Logos */}
            <div className="pt-8 opacity-40 grayscale group hover:grayscale-0 transition-all duration-700">
              <div className="text-[8px] font-black uppercase tracking-[0.3em] text-center mb-6 text-slate-400">
                {isFr ? "PARTENAIRES TECHNOLOGIQUES" : "TECH PARTNERS"}
              </div>
              <div className="grid grid-cols-2 gap-8 items-center">
                <div className="h-6 bg-slate-200" title="Microsoft" />
                <div className="h-6 bg-slate-200" title="Pax8" />
                <div className="h-6 bg-slate-200" title="SentinelOne" />
                <div className="h-6 bg-slate-200" title="Acronis" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
