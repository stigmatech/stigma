"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TurnstileWidget } from "./turnstile-widget";
import posthog from "posthog-js";

interface LeadCaptureFormProps {
    dict: any;
    resourceName: string;
}

export function LeadCaptureForm({ dict, resourceName }: LeadCaptureFormProps) {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        workEmail: "",
        company: "",
        jobTitle: ""
    });

    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!turnstileToken) {
            alert("Veuillez valider le contrôle de sécurité / Please validate security check.");
            return;
        }

        setStatus("submitting");

        try {
            const res = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.workEmail,
                    company: formData.company,
                    jobTitle: formData.jobTitle,
                    service: `[Téléchargement Insight] ${resourceName}`,
                    message: "Lead généré depuis la page de téléchargement (Gated Content).",
                    turnstileToken
                })
            });

            if (!res.ok) throw new Error("API Route Failed");
            posthog.identify(formData.workEmail, {
                email: formData.workEmail,
                first_name: formData.firstName,
                last_name: formData.lastName,
                company: formData.company,
                job_title: formData.jobTitle,
            });
            posthog.capture('insight_download_requested', {
                resource_name: resourceName,
            });
            setStatus("success");
        } catch (error) {
            posthog.captureException(error instanceof Error ? error : new Error('insight_download_failed'));
            console.error("Submission failed", error);
            setStatus("idle");
            alert("Erreur réseau / Network error.");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-surface-dark/5 p-8 border border-surface-dark/10 text-center">
                <div className="w-16 h-16 bg-surface-dark text-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-3xl">check</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-background-dark mb-2">
                    {dict.successMessage}
                </h3>
                <p className="text-background-dark/60 mb-8">{resourceName}</p>
                <div className="flex justify-center">
                    <Button className="bg-surface-dark text-white rounded-none px-8 py-6 uppercase tracking-widest text-xs font-bold hover:bg-background-dark transition-all flex items-center gap-3">
                        <span className="material-symbols-outlined text-lg">download</span>
                        {dict.downloadNow}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 border border-surface-dark/10 shadow-lg">
            <h3 className="text-2xl font-display font-bold text-background-dark mb-6">
                {dict.title}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-background-dark/60 mb-2">{dict.firstName}</label>
                        <input 
                            required 
                            type="text" 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-surface-dark transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-background-dark/60 mb-2">{dict.lastName}</label>
                        <input 
                            required 
                            type="text" 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-surface-dark transition-colors"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-widest text-background-dark/60 mb-2">{dict.workEmail}</label>
                    <input 
                        required 
                        type="email" 
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-surface-dark transition-colors"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-background-dark/60 mb-2">{dict.company}</label>
                        <input 
                            required 
                            type="text" 
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-surface-dark transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-background-dark/60 mb-2">{dict.jobTitle}</label>
                        <input 
                            required 
                            type="text" 
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-surface-dark transition-colors"
                        />
                    </div>
                </div>
                
                <div className="pt-2">
                    <TurnstileWidget onVerify={(token) => setTurnstileToken(token)} />
                </div>

                <div className="pt-4">
                    <Button 
                        disabled={status === "submitting" || !turnstileToken}
                        type="submit" 
                        className="w-full bg-surface-dark text-white rounded-none py-6 uppercase tracking-widest text-xs font-bold hover:bg-background-dark transition-all"
                    >
                        {status === "submitting" ? dict.processing : dict.submit}
                    </Button>
                </div>
            </form>
            <p className="text-center text-[10px] text-background-dark/40 mt-4 uppercase tracking-wider">
                Strictly Confidential // Professional B2B Use Only
            </p>
        </div>
    );
}
