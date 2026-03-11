import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = "fleurykoyo@stigmatech.ca";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            firstName, lastName, email, phone, company,
            groupType, participants, preferredDate,
            courseTitle, subsidyHelp, lang,
            turnstileToken
        } = body;

        // Verify Clouflare Turnstile Token
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

        if (!firstName || !lastName || !email || !company || !groupType) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const isFr = lang === "fr";
        const groupLabel = groupType === "executives"
            ? (isFr ? "Dirigeants (min. 5)" : "Executives (min. 5)")
            : (isFr ? "Employés (max. 15)" : "Employees (max. 15)");

        const { data, error } = await resend.emails.send({
            from: "Stigma Technologies <onboarding@resend.dev>",
            to: [TO_EMAIL],
            replyTo: email,
            subject: `[Reservation Formation] ${courseTitle ?? "Formation IA"} - ${company}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #ffffff; padding: 24px; color: #0a0f2c;">
                    <!-- Header -->
                    <div style="border-bottom: 2px solid #f3f4f6; padding-bottom: 24px; margin-bottom: 32px;">
                        <p style="font-size: 18px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin: 0;">Stigma Technologies</p>
                        <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 4px 0 0;">Notification de nouvelle reservation</p>
                    </div>

                    <!-- Course Detail -->
                    <div style="margin-bottom: 32px;">
                        <p style="color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Formation demandee</p>
                        <p style="font-size: 20px; font-weight: 700; margin: 0; color: #2563eb;">${courseTitle}</p>
                    </div>

                    <!-- Details Table -->
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 11px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; width: 160px; vertical-align: top;">Contact</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; font-weight: 600;">${firstName} ${lastName}</td>
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
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 11px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Type de groupe</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px;">${groupLabel}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 11px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Participants</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px;">${participants || "Non precise"}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 11px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Date souhaitee</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px;">${preferredDate || "A confirmer"}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; font-size: 11px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Aide subventions</td>
                            <td style="padding: 12px 0; font-size: 15px;">
                                ${subsidyHelp ? '<span style="color: #059669; font-weight: bold;">OUI - Accompagnement demande</span>' : "NON"}
                            </td>
                        </tr>
                    </table>

                    <div style="margin-top: 48px; border-top: 1px solid #f3f4f6; padding-top: 24px;">
                        <a href="mailto:${email}" style="display: inline-block; background: #0a0f2c; color: #ffffff; padding: 14px 28px; text-decoration: none; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Repondre au client</a>
                    </div>
                    
                    <p style="font-size: 11px; color: #9ca3af; margin-top: 32px;">Ceci est une notification automatique de stigmatech.ca</p>
                </div>
            `,
        });

        if (error) {
            console.error("Resend error:", JSON.stringify(error));
            return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
        }

        return NextResponse.json({ success: true, id: data?.id });
    } catch (err) {
        console.error("Unexpected error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
