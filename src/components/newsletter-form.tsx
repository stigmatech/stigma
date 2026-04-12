"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { motion, AnimatePresence } from "framer-motion";
import posthog from "posthog-js";

export function NewsletterForm({ dictionary }: { dictionary: any }) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("loading");
        
        const formData = new FormData(event.currentTarget);
        const result = await subscribeToNewsletter(formData);

        if (result.success) {
            const email = formData.get('email') as string;
            posthog.capture('newsletter_subscribed', { email });
            setStatus("success");
            (event.target as HTMLFormElement).reset();
        } else {
            setStatus("error");
            setErrorMessage(result.error || "An error occurred");
        }
    };

    return (
        <div className="mb-10 w-full">
            <form onSubmit={handleSubmit} className="relative mb-2">
                <input
                    name="email"
                    type="email"
                    placeholder={dictionary.common.footer.emailPlaceholder || "Email"}
                    className="w-full bg-white/5 border border-white/10 rounded-none py-3 pl-5 pr-12 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all font-sans"
                    required
                    disabled={status === "loading" || status === "success"}
                />
                <button 
                    type="submit" 
                    disabled={status === "loading" || status === "success"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-surface-dark rounded-none flex items-center justify-center hover:bg-surface-dark/80 transition-colors disabled:opacity-50"
                >
                    {status === "loading" ? (
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                        <span className="material-symbols-outlined text-white text-[16px]">
                            {status === "success" ? "check" : "arrow_forward"}
                        </span>
                    )}
                </button>
            </form>

            <AnimatePresence mode="wait">
                {status === "success" && (
                    <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[12px] text-green-400 font-medium"
                    >
                        {dictionary.common.footer.successMessage || "Merci pour votre inscription !"}
                    </motion.p>
                )}
                {status === "error" && (
                    <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[12px] text-red-400 font-medium"
                    >
                        {errorMessage}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
