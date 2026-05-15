import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getPostHogClient } from "@/lib/posthog-server";
import { createTwentyLead } from "@/lib/twenty-crm";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      company,
      websiteUrl,
      eventId,
      lang,
      turnstileToken
    } = body;

    // 1. Verify Cloudflare Turnstile Token
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

    if (!firstName || !lastName || !email || !eventId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. Fetch event details to get the title
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('title_fr, title_en, title, event_date, location')
      .eq('id', eventId)
      .single();

    if (eventError || !event) {
      console.error("Error fetching event for registration:", eventError);
    }

    const eventTitle = (lang === 'fr' ? event?.title_fr : event?.title_en) || event?.title || "Événement Stigma";
    const eventDate = event?.event_date ? new Date(event.event_date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : "";

    // 3. Save registration to Supabase
    const { error: dbError } = await supabase
      .from('event_registrations')
      .insert([
        {
          event_id: eventId,
          first_name: firstName,
          last_name: lastName,
          email: email,
          company: company || null,
          website_url: websiteUrl || null,
          lang: lang
        }
      ]);

    if (dbError) {
      console.error("Supabase registration error:", dbError);
      // We continue even if DB fails to ensure email and CRM are triggered
    }

    // 4. Send Confirmation Email to Participant
    await resend.emails.send({
      from: 'Stigma Technologies <onboarding@resend.dev>',
      to: [email],
      subject: lang === 'fr' ? `Confirmation d'inscription : ${eventTitle}` : `Registration Confirmation: ${eventTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; border: 1px solid #e5e7eb;">
          <h1 style="color: #0a0f2c; font-size: 24px; font-weight: 800; border-bottom: 4px solid #0a0f2c; padding-bottom: 12px; margin-bottom: 24px;">STIGMA</h1>
          <p style="font-size: 16px; color: #374151;">Bonjour ${firstName},</p>
          <p style="font-size: 16px; color: #374151;">
            Nous avons bien reçu votre inscription pour l'événement suivant :
          </p>
          <div style="background: #f9fafb; padding: 24px; border-left: 4px solid #2563eb; margin: 24px 0;">
            <p style="margin: 0; font-weight: bold; font-size: 18px; color: #0a0f2c;">${eventTitle}</p>
            <p style="margin: 8px 0 0; color: #6b7280; font-size: 14px;">📅 ${eventDate}</p>
            <p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">📍 ${event?.location || (lang === 'fr' ? "En ligne" : "Online")}</p>
          </div>
          <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">
            Vous recevrez sous peu un e-mail contenant les instructions de connexion ou les détails de l'ordre du jour.
          </p>
          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px;">L'équipe Stigma Technologies</p>
          </div>
        </div>
      `
    });

    // 5. Send Notification Email to Admin
    await resend.emails.send({
      from: 'Stigma System <onboarding@resend.dev>',
      to: ['fleurykoyo@stigmatech.ca'],
      subject: `[Nouvelle Inscription] ${eventTitle} - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Nouvelle inscription reçue</h2>
          <p><strong>Événement:</strong> ${eventTitle}</p>
          <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Entreprise:</strong> ${company || "Non spécifiée"}</p>
          <p><strong>Site:</strong> ${websiteUrl || "Non spécifié"}</p>
        </div>
      `
    });

    // 6. CRM & Analytics Integration
    await createTwentyLead({
      firstName,
      lastName,
      email,
      company,
      service: `[Event Registration] ${eventTitle}`,
      message: `Registered for ${eventTitle} (${eventId})`
    });

    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: email,
      event: 'event_registration_submitted',
      properties: {
        event_id: eventId,
        event_title: eventTitle,
        company: company || null,
        lang
      }
    });
    await posthog.shutdown();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Registration API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
