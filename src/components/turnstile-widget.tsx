"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useEffect } from "react";

interface TurnstileWidgetProps {
    onVerify: (token: string) => void;
    onError?: (error: any) => void;
    onExpire?: () => void;
    lang?: string;
    theme?: "light" | "dark" | "auto";
}

export function TurnstileWidget({ onVerify, onError, onExpire, lang = "fr", theme }: TurnstileWidgetProps) {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"; // Cloudflare Testing Key (Always Passes)

    return (
        <div className="my-4 flex justify-center">
            <Turnstile
                siteKey={siteKey}
                onSuccess={(token) => onVerify(token)}
                onError={onError}
                onExpire={onExpire}
                options={{
                    language: lang,
                    theme: theme,
                    size: "normal",
                }}
            />
            {!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                <p className="text-[10px] text-amber-600 mt-1 font-medium italic">
                    {lang === 'fr'
                        ? "Mode test activé (Clé manquante)"
                        : "Test mode enabled (Missing key)"}
                </p>
            )}
        </div>
    );
}
