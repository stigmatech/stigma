import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            eventId, firstName, lastName, email, company, websiteUrl,
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
        }

        if (!eventId || !firstName || !lastName || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Fetch event details
        const { data: event, error: eventError } = await supabase
            .from('events')
            .select('*')
            .eq('id', eventId)
            .single();

        if (eventError || !event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        // Save registration to Supabase
        const { error: regError } = await supabase
            .from('registrations')
            .insert({
                event_id: eventId,
                first_name: firstName,
                last_name: lastName,
                email: email,
                company: company,
                website_url: websiteUrl
            });

        if (regError) {
            console.error("Registration error:", regError);
            return NextResponse.json({ error: "Failed to save registration" }, { status: 500 });
        }

        // Send confirmation email to user
        const { error: emailError } = await resend.emails.send({
            from: 'Stigma Technologies <onboarding@resend.dev>',
            to: [email],
            subject: `Confirmation d'inscription : ${event.title}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9;">
                    <div style="background: #0a2540; padding: 32px; text-align: center; margin-bottom: 24px;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">STIGMATECH</h1>
                        <p style="color: rgba(255,255,255,0.7); margin-top: 8px;">Confirmation d'enregistrement</p>
                    </div>
                    
                    <div style="background: white; padding: 32px; border: 1px solid #e5e7eb;">
                        <h2 style="color: #0a2540; margin-bottom: 16px;">Bonjour ${firstName},</h2>
                        <p>Votre inscription à l'événement <strong>${event.title}</strong> a été confirmée.</p>
                        
                        <div style="background: #f0f7ff; padding: 20px; border-left: 4px solid #0a2540; margin: 24px 0;">
                            <p style="margin: 0; font-weight: bold;">Détails de l'événement :</p>
                            <p style="margin: 8px 0 0;">Date : ${new Date(event.event_date).toLocaleDateString()}</p>
                            <p style="margin: 4px 0 0;">Lieu : ${event.location || 'En ligne'}</p>
                        </div>
                        
                        <p>Nous sommes impatients de vous y retrouver.</p>
                        <p style="margin-top: 32px; font-size: 14px; color: #6b7280;">Cordialement,<br>L'équipe Stigma Technologies</p>
                    </div>
                </div>
            `,
        });

        if (emailError) {
            console.warn("Resend email error:", emailError);
        }

        // Notification to admin
        await resend.emails.send({
            from: 'Stigma Technologies <onboarding@resend.dev>',
            to: ['fleurykoyo@stigmatech.ca'],
            subject: `Nouvelle inscription : ${event.title}`,
            html: `
                <p><strong>${firstName} ${lastName}</strong> (${email}) s'est inscrit à <strong>${event.title}</strong>.</p>
                <p>Événement : ${event.title}</p>
                <p>Entreprise : ${company || 'Non spécifié'}</p>
                <p>Site Web : ${websiteUrl || 'Non spécifié'}</p>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Unexpected error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
