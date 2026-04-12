"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ConfiguratorSummaryProps {
    lang: string;
    selections: {
        mission?: string;
        connectors?: string[];
        tier?: string;
        tierTitle?: string;
        presetName?: string;
        orchestration?: boolean;
    };
    isMobile?: boolean;
}

export function ConfiguratorSummary({ lang, selections, isMobile = false }: ConfiguratorSummaryProps) {
    const isFr = lang === "fr";
    
    


    const getPriceIndicator = () => {
        if (!selections.tier) return "--";
        const tierId = selections.tier.toLowerCase();
        let basePrice = "";
        
        if (tierId === "free-agent") basePrice = isFr ? "Gratuit" : "Free";
        else if (tierId === "start-agent") basePrice = "99$/mois";
        else if (tierId === "pro-agent") basePrice = "490$/mois";
        else if (tierId === "elite-agent") basePrice = "1,490$/mois";
        else if (tierId === "enterprise-agent") basePrice = "2,990$/mois";
        else basePrice = isFr ? "Sur mesure" : "Custom Quote";

        if (selections.orchestration) {
            return `${basePrice} + 199$/mo`;
        }
        return basePrice;
    };
    
    const getROIEstimate = () => {
        if (!selections.tier) return null;
        const connectorBonus = (selections.connectors?.length || 0);
        const orchestratorBonus = selections.orchestration ? 1.5 : 1;
        
        const tierId = selections.tier.toLowerCase();
        
        if (tierId === "free-agent") {
            return {
                hours: [5, 10],
                efficiency: 5
            };
        }
        if (tierId === "start-agent") {
            return {
                hours: [20 + connectorBonus * 2, 30 + connectorBonus * 2],
                efficiency: 15 + Math.min(connectorBonus, 5)
            };
        }
        if (tierId === "pro-agent" || tierId === "starter-agent") {
            return {
                hours: [Math.round((40 + connectorBonus * 5) * orchestratorBonus), Math.round((60 + connectorBonus * 5) * orchestratorBonus)],
                efficiency: Math.round((25 + Math.min(connectorBonus * 2, 15)) * orchestratorBonus)
            };
        }
        if (tierId === "elite-agent" || tierId === "pro-suite" || tierId === "professional-suite") {
            return {
                hours: [Math.round((120 + connectorBonus * 10) * orchestratorBonus), Math.round((180 + connectorBonus * 10) * orchestratorBonus)],
                efficiency: Math.round((50 + Math.min(connectorBonus * 3, 25)) * orchestratorBonus)
            };
        }
        if (tierId === "enterprise-agent" || tierId === "sovereign-edge") {
            return {
                hours: [Math.round((400 + connectorBonus * 20) * orchestratorBonus), Math.round((600 + connectorBonus * 20) * orchestratorBonus)],
                efficiency: Math.round((85 + Math.min(connectorBonus, 10)) * (orchestratorBonus > 1 ? 1.1 : 1))
            };
        }
        return null;
    };

    const roi = getROIEstimate();

    const content = (
        <div className={cn(
            "bg-white border border-gray-100 p-8 h-full flex flex-col justify-between rounded-sm",
            isMobile ? "border-l-0 border-t" : ""
        )}>
            <div>
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-[#0b0c10] flex items-center justify-center">
                        <span className="material-symbols-outlined text-white">smart_toy</span>
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                            {isFr ? "Votre Configuration" : "Your Configuration"}
                        </h3>
                        <p className="font-display font-bold text-sm text-[#0b0c10]">
                            {selections.mission || (isFr ? "Nouvel Agent" : "New Agent")}
                        </p>
                    </div>
                </div>

                    {selections.presetName && (
                        <div className="mb-6 pb-6 border-b border-gray-100">
                            <span className="text-[9px] text-blue-600 font-bold uppercase tracking-widest block mb-2">{isFr ? "Modèle" : "Template"}</span>
                            <span className="text-sm font-black text-[#0b0c10] uppercase tracking-tight">{selections.presetName}</span>
                        </div>
                    )}

                <div className="space-y-6">
                    {/* Tier */}
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 block mb-2">
                           {isFr ? "Forfait Sélectionné" : "Selected Tier"}
                        </span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                            <span className="text-sm font-medium text-gray-900">
                                {selections.tierTitle || (isFr ? "En attente..." : "Waiting...")}
                            </span>
                        </div>
                    </div>

                    {/* Connectors */}
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 block mb-2">
                            {isFr ? "Connecteurs Écosystème" : "Ecosystem Connectors"}
                        </span>
                        <div className="flex flex-wrap gap-2">
                            <AnimatePresence>
                                {selections.connectors?.length ? (
                                    selections.connectors.map(c => (
                                        <motion.span
                                            key={c}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="px-2 py-1 bg-gray-50 border border-gray-100 text-[9px] font-bold text-gray-500 rounded-sm"
                                        >
                                            {c}
                                        </motion.span>
                                    ))
                                ) : (
                                    <span className="text-xs text-gray-300 italic">
                                        {isFr ? "Aucun connecteur" : "No connectors selected"}
                                    </span>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* ROI Impact - High Contrast Fix */}
                    {roi && (
                        <div className="p-5 bg-white border-2 border-blue-600 rounded-sm relative overflow-hidden shadow-xl mt-6">
                            <div className="absolute top-0 right-0 p-2 opacity-20">
                                <span className="material-symbols-outlined text-blue-600 text-3xl">trending_up</span>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 block mb-4 relative z-10">
                                {isFr ? "Impact IA Estimé" : "Estimated AI Impact"}
                            </span>
                            <div className="space-y-4 relative z-10">
                                    <div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="text-xl font-black text-[#0b0c10]">{roi.hours[0]}-{roi.hours[1]}</span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">{isFr ? "Heures / mois" : "Hours / month"}</span>
                                        </div>
                                        <div className="h-1 w-full bg-blue-100/50 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.min((roi.hours[1] / 700) * 100, 100)}%` }}
                                                className="h-full bg-blue-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[9px] font-bold text-gray-500 uppercase">{isFr ? "Gain d'efficience" : "Efficiency Gain"}</span>
                                        <span className="text-xs font-black text-blue-700">+{roi.efficiency}%</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex justify-between items-end">
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 block">
                            {isFr ? "Estimation Initiale" : "Initial Estimate"}
                        </span>
                        <p className="text-xl font-display font-black text-[#0b0c10] mt-1">
                            {getPriceIndicator()}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-[8px] font-medium text-gray-400 italic block">
                            {isFr ? "*Sujet à validation TI" : "*Subject to IT validation"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

    return content;
}
