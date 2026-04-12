import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { createTwentyLead } from "@/lib/twenty-crm";
import { getPostHogClient } from "@/lib/posthog-server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            firstName, lastName, email, subject, message,
            phone, company, jobTitle, companySize,
            service, specificNeeds, industry, itSetup, timeline,
            tier, orchestration,
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

        if (!firstName || !lastName || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: 'Stigma Technologies <onboarding@resend.dev>',
            to: ['fleurykoyo@stigmatech.ca'],
            replyTo: email,
            subject: subject || `[Nouveau Lead] ${company || `${firstName} ${lastName}`} - ${service || 'Contact'}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9;">
                    <div style="background: #0a0f2c; padding: 24px; text-align: center; margin-bottom: 24px;">
                        <h1 style="color: white; margin: 0; font-size: 20px; letter-spacing: 2px; font-weight: 800; text-transform: uppercase;">STIGMATECH</h1>
                        <p style="color: rgba(255,255,255,0.5); margin: 4px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Rapport de Lead Généré</p>
                    </div>

                    ${service ? `
                    <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-top: 4px solid #2563eb; margin-bottom: 16px;">
                        <h2 style="font-size: 14px; color: #0a0f2c; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 1px;">Intérêt Principal</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-size: 12px; font-weight: bold; color: #6b7280; width: 150px;">Service :</td>
                                <td style="padding: 8px 0; font-size: 15px; color: #0a0f2c; font-weight: 600;">${service}</td>
                            </tr>
                            ${specificNeeds && specificNeeds.length > 0 ? `
                            <tr>
                                <td style="padding: 8px 0; font-size: 12px; font-weight: bold; color: #6b7280; vertical-align: top;">Besoins Spécifiques :</td>
                                <td style="padding: 8px 0; font-size: 14px; color: #0a0f2c;">
                                    <ul style="margin: 0; padding-left: 20px;">
                                        ${specificNeeds.map((need: string) => `<li>${need}</li>`).join('')}
                                    </ul>
                                </td>
                            </tr>` : ''}
                        </table>
                    </div>` : ''}

                    <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; margin-bottom: 16px;">
                        <h2 style="font-size: 14px; color: #0a0f2c; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 1px;">Profil de l'Entreprise</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-size: 12px; font-weight: bold; color: #6b7280; width: 150px;">Industrie :</td>
                                <td style="padding: 8px 0; font-size: 14px; color: #0a0f2c;">${industry || 'Non spécifié'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-size: 12px; font-weight: bold; color: #6b7280;">Taille (Employés) :</td>
                                <td style="padding: 8px 0; font-size: 14px; color: #0a0f2c;">${companySize || 'Non spécifié'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-size: 12px; font-weight: bold; color: #6b7280;">Gestion TI Actuelle :</td>
                                <td style="padding: 8px 0; font-size: 14px; color: #0a0f2c;">${itSetup || 'Non spécifié'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-size: 12px; font-weight: bold; color: #6b7280;">Urgence (Échéancier) :</td>
                                <td style="padding: 8px 0; font-size: 14px; color: #e11d48; font-weight: 600;">${timeline || 'Non spécifié'}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="background: white; padding: 24px; border: 1px solid #e5e7eb;">
                        <h2 style="font-size: 14px; color: #0a0f2c; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 1px;">Contact</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 12px; font-weight: bold; color: #6b7280; width: 150px;">Nom Complet</td>
                                <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #0a0f2c; font-weight: 600;">${firstName} ${lastName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 12px; font-weight: bold; color: #6b7280;">Titre / Poste</td>
                                <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #0a0f2c;">${jobTitle || 'Non spécifié'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 12px; font-weight: bold; color: #6b7280;">Entreprise</td>
                                <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #0a0f2c;">${company || 'Non spécifiée'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 12px; font-weight: bold; color: #6b7280;">Email</td>
                                <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #0a0f2c;">
                                    <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 12px; font-weight: bold; color: #6b7280;">Téléphone</td>
                                <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #0a0f2c;">${phone || 'Non spécifié'}</td>
                            </tr>
                        </table>

                        ${message ? `
                        <div style="margin-top: 24px;">
                            <p style="font-size: 12px; font-weight: bold; color: #6b7280; margin-bottom: 12px;">NOTES ADDITIONNELLES / MESSAGE</p>
                            <div style="background: #f9fafb; border-left: 4px solid #2563eb; padding: 16px; font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                        </div>` : ''}

                        <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
                            <a href="mailto:${email}" style="display: inline-block; background: #0a0f2c; color: white; padding: 12px 24px; text-decoration: none; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">Répondre à ${firstName}</a>
                        </div>
                    </div>
                    <p style="text-align: center; font-size: 11px; color: #9ca3af; margin-top: 16px;">This lead was captured via Stigma Technologies quote form.</p>
                </div>
            `,
        });

        if (error) {
            console.error("Internal Resend error:", error);
            // Even if email fails, we attempt to save to CRM and send auto-responder
        }

        // ==========================================
        // AUTO-RESPONDER (External Email to Prospect)
        // ==========================================
        const isGatedContent = service?.startsWith("[Téléchargement Insight]");
        
        if (isGatedContent && email) {
            const resourceName = service.replace("[Téléchargement Insight]", "").trim();
            const autoResponderResult = await resend.emails.send({
                from: 'Fleury Koyo - Stigma Technologies <fleurykoyo@stigmatech.ca>',
                to: [email],
                subject: `Votre accès exclusif : ${resourceName}`,
                html: `
                    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #ffffff; border: 1px solid #e5e7eb;">
                        <h1 style="color: #0a0f2c; font-size: 22px; margin-bottom: 24px; font-weight: 800;">Bonjour ${firstName},</h1>
                        
                        <p style="color: #374151; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
                            Merci pour votre intérêt envers l'expertise de <strong>Stigma Technologies</strong>. Comme convenu, veuillez trouver ci-dessous l'accès sécurisé à votre document exclusif :
                        </p>
                        
                        <div style="background: #f9fafb; border-left: 4px solid #0a0f2c; padding: 16px 20px; margin-bottom: 32px;">
                            <p style="margin: 0; font-size: 16px; font-weight: bold; color: #0a0f2c;">${resourceName}</p>
                        </div>
                        
                        <div style="text-align: center; margin-bottom: 40px;">
                            <a href="https://stigmatech.ca" 
                               style="background: #0a0f2c; color: #ffffff; padding: 14px 28px; text-decoration: none; font-size: 13px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">
                               Accéder au Document
                            </a>
                        </div>
                        
                        <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin-bottom: 32px;">
                            Chez Stigma Technologies, nous implémentons ces architectures sécurisées chaque jour pour les entreprises d'envergure. Si la mise en œuvre technique de ces concepts vous questionne vis-à-vis de l'infrastructure de <strong>${company || "votre organisation"}</strong>, n'hésitez pas à me répondre directement.
                        </p>
                        
                        <hr style="border: none; border-top: 1px solid #e5e7eb; margin-bottom: 24px;" />
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="width: 50px; padding-right: 16px;">
                                    <div style="width: 40px; height: 40px; background: #0a0f2c; border-radius: 50%; display: inline-block;"></div>
                                </td>
                                <td>
                                    <p style="color: #111827; font-size: 14px; margin: 0; font-weight: bold;">Fleury Koyo</p>
                                    <p style="color: #6b7280; font-size: 12px; margin: 2px 0 0 0;">Direction de l'Ingénierie & Architecture B2B</p>
                                    <p style="margin: 4px 0 0 0;"><a href="https://stigmatech.ca" style="color: #2563eb; text-decoration: none; font-size: 12px; font-weight: bold;">stigmatech.ca</a></p>
                                </td>
                            </tr>
                        </table>
                    </div>
                `
            });

            if (autoResponderResult.error) {
                console.error("Resend Auto-Responder Failed:", autoResponderResult.error);
            } else {
                console.log("Auto-Responder Email sent successfully to:", email);
            }
        }

        // ==========================================
        // CRM INGESTION (Twenty CRM Pipeline)
        // ==========================================
        await createTwentyLead({
            firstName,
            lastName,
            email,
            phone,
            company,
            jobTitle,
            message,
            service,
            specificNeeds,
            industry,
            companySize,
            itSetup,
            timeline,
            tier,
            orchestration
        });

        // ==========================================
        // POSTHOG SERVER-SIDE EVENT
        // ==========================================
        const posthog = getPostHogClient();
        posthog.identify({
            distinctId: email,
            properties: {
                email,
                first_name: firstName,
                last_name: lastName,
                company,
                job_title: jobTitle,
            },
        });
        posthog.capture({
            distinctId: email,
            event: 'lead_captured',
            properties: {
                service: service || null,
                specific_needs: specificNeeds || null,
                industry: industry || null,
                company_size: companySize || null,
                it_setup: itSetup || null,
                timeline: timeline || null,
                company: company || null,
                source: 'api',
            },
        });
        await posthog.shutdown();

        return NextResponse.json({ success: true, id: data?.id || "crm_synced" });
    } catch (err) {
        console.error("Unexpected error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
