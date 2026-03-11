import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = "fleurykoyo@stigmatech.ca";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            firstName, lastName, email, phone, company, jobTitle,
            companySize, sector, selectedSubsidies, courseTitle, lang,
            turnstileToken
        } = body;

        // Verify Cloudflare Turnstile Token
        if (process.env.TURNSTILE_SECRET_KEY) {
            const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    secret: process.env.TURNSTILE_SECRET_KEY,
                    response: turnstileToken,
                    remoteip: req.headers.get('x-forwarded-for') || undefined,
                }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyData.success) {
                return NextResponse.json({ error: "Invalid Turnstile token" }, { status: 403 });
            }
        } else {
            console.warn("TURNSTILE_SECRET_KEY is missing. Skipping verification.");
        }

        if (!firstName || !lastName || !email || !company) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const subsidyList: string[] = selectedSubsidies ?? [];

        const subsidyLabels: Record<string, string> = {
            "scale-ai": "Scale AI - Formation IA (jusqu'a 85%)",
            "essor": "ESSOR - Diagnostic Numerique (jusqu'a 20 000$)",
            "productivite": "Productivite-Competences (50%+)",
            "dec": "DEC - Initiative Regionale IA (50%)",
            "cdae": "Credit d'impot CDAE (jusqu'a 30%)",
            "pari": "PARI - AI Assist CNRC (jusqu'a 100%)",
        };

        const subsidyRows = subsidyList.length > 0
            ? subsidyList.map(id => subsidyLabels[id] ?? id).map(label =>
                `<li style="margin: 6px 0; font-size: 14px; color: #374151;">- ${label}</li>`
            ).join("")
            : `<li style="font-size: 14px; color: #9ca3af;">Aucune selection specifique</li>`;

        const { data, error } = await resend.emails.send({
            from: "Stigma Technologies <onboarding@resend.dev>",
            to: [TO_EMAIL],
            replyTo: email,
            subject: `[Subventions Formation] Demande de ${firstName} ${lastName} - ${company}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #ffffff; padding: 24px; color: #0a0f2c;">
                    <!-- Header -->
                    <div style="border-bottom: 2px solid #f3f4f6; padding-bottom: 24px; margin-bottom: 32px;">
                        <p style="font-size: 18px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin: 0;">Stigma Technologies</p>
                        <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 4px 0 0;">Demande de Renseignements - Subventions</p>
                    </div>

                    <!-- Priority Banner -->
                    <div style="background: #fdf2f2; border-left: 4px solid #ef4444; padding: 16px; margin-bottom: 32px;">
                        <p style="color: #991b1b; font-size: 13px; font-weight: 700; margin: 0;">
                            Action requise : Evaluer l'admissibilite et contacter le prospect sous 48h.
                        </p>
                    </div>

                    <!-- Details Table -->
                    <h2 style="font-size: 14px; font-weight: 800; text-transform: uppercase; color: #6b7280; letter-spacing: 1px; margin: 0 0 20px;">Informations du prospect</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 11px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; width: 160px; vertical-align: top;">Nom</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; font-weight: 600;">${firstName} ${lastName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 11px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Titre</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px;">${jobTitle || "Non renseigne"}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 11px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Courriel</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 11px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Telephone</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px;">${phone || "Non renseigne"}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 11px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Entreprise</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; font-weight: 600;">${company}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 11px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Taille</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px;">${companySize ? companySize + " employes" : "Non renseignee"}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 11px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Secteur</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px;">${sector || "Non renseigne"}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; font-size: 11px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Formation</td>
                            <td style="padding: 12px 0; font-size: 15px; font-weight: 600; color: #2563eb;">${courseTitle || "Formation IA"}</td>
                        </tr>
                    </table>

                    <!-- Subsidies -->
                    <div style="margin-top: 32px; padding: 24px; background: #f8fafc; border: 1px solid #e2e8f0;">
                        <h3 style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #475569; margin: 0 0 16px;">Subventions d'interet</h3>
                        <ul style="margin: 0; padding: 0; list-style: none;">
                            ${subsidyRows}
                        </ul>
                    </div>

                    <!-- Authorization Note -->
                    <div style="margin-top: 24px; padding: 16px; background: #fffbeb; border-left: 4px solid #fbbf24;">
                        <p style="font-size: 12px; color: #92400e; margin: 0; font-weight: 600;">
                            Ce prospect a autorise Stigma Technologies a agir comme intermediaire officiel pour ses demandes de subventions.
                        </p>
                    </div>

                    <div style="margin-top: 48px; border-top: 1px solid #f3f4f6; padding-top: 24px;">
                        <a href="mailto:${email}" style="display: inline-block; background: #0a0f2c; color: #ffffff; padding: 14px 28px; text-decoration: none; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Contacter le prospect</a>
                    </div>
                    
                    <p style="font-size: 11px; color: #9ca3af; margin-top: 32px;">Ceci est une notification automatique de stigmatech.ca</p>
                </div>
            `,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
        }

        return NextResponse.json({ success: true, id: data?.id });
    } catch (err) {
        console.error("Unexpected error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
