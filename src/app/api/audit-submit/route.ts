import { Resend } from "resend";
import { isProfessionalEmail, isValidPhoneNumber } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import { createTwentyLead } from "@/lib/twenty-crm";
import { getPostHogClient } from "@/lib/posthog-server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      firstName,
      lastName,
      phone,
      company,
      score,
      tier,
      answers,
      lang,
      turnstileToken,
      type = "ai" // Default to ai for backward compatibility
    } = body;

    // 1. Verify Cloudflare Turnstile Token
    if (process.env.TURNSTILE_SECRET_KEY && turnstileToken) {
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
      if (!verifyData.success && process.env.NODE_ENV !== 'development') {
        console.error("Turnstile verification failed:", verifyData);
        return NextResponse.json({ error: "Invalid Turnstile token" }, { status: 403 });
      }
      if (!verifyData.success) {
        console.warn("[Turnstile] Validation failed but bypassing in development mode.");
      }
    }

    if (!email || !firstName || !lastName || !phone || !company) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. Server-side validation for Data Hardening
    if (!isProfessionalEmail(email)) {
      return NextResponse.json({ error: "Professional email required" }, { status: 400 });
    }

    if (!isValidPhoneNumber(phone)) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 });
    }

    // 3. Process the submission
    // 3. Calculate Lead Score (Business Intelligence)
    let leadScore = 20; // Base points for completion
    if (tier === "bronze") leadScore += 70;
    else if (tier === "silver") leadScore += 35;
    else if (tier === "gold") leadScore += 10;
    
    if (company && company.length > 3) leadScore += 10;
    leadScore = Math.min(leadScore, 100);

    const auditTitle = type === "cyber" ? "Audit de Maturité Cybersécurité" : "Audit de Maturité IA";
    const successDict = lang === "fr" ? 
      { subject: "Votre Diagnostic Stratégique - Stigma Technologies", thanks: "Merci pour votre confiance." } : 
      { subject: "Your Strategic Diagnostic - Stigma Technologies", thanks: "Thank you for your trust." };

    // 2. Map answers to readable format for email
    const answersList = Object.entries(answers || {}).map(([id, val]) => {
        return `<li><strong>${id}</strong>: Score ${val}</li>`;
    }).join("");

    // 3. Send Notification Email to Admin
    await resend.emails.send({
      from: 'Stigma Audit <onboarding@resend.dev>',
      to: ['fleurykoyo@stigmatech.ca'],
      subject: `[Audit ${type.toUpperCase()}] ${firstName || ''} ${lastName || ''} - ${company || email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9;">
          <div style="background: #0b0c10; padding: 24px; text-align: center; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 18px; letter-spacing: 2px; text-transform: uppercase;">Stigma Diagnostic</h1>
          </div>
          
          <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-top: 4px solid ${type === 'cyber' ? '#1e293b' : '#3b82f6'};">
            <h2 style="font-size: 16px; margin: 0 0 16px 0; color: #0b0c10;">${auditTitle}</h2>
            <p><strong>Nom:</strong> ${firstName || ''} ${lastName || ''}</p>
            <p><strong>Entreprise:</strong> ${company || "Non spécifiée"}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Téléphone:</strong> ${phone || "Non spécifié"}</p>
            <p><strong>Score:</strong> ${score} / 100</p>
            <p><strong>Niveau:</strong> ${tier.toUpperCase()}</p>
          </div>

          <div style="margin-top: 24px; background: white; padding: 24px; border: 1px solid #e5e7eb;">
            <h3 style="font-size: 14px; text-transform: uppercase; color: #6b7280; margin-bottom: 12px;">Détail des Réponses</h3>
            <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #374151;">
              ${answersList}
            </ul>
          </div>
        </div>
      `,
    });

    // 3b. Send Confirmation Email to Prospect
    const attachments = body.pdfBase64 ? [{
      filename: `Audit_Stigma_${lastName || 'Export'}.pdf`,
      content: body.pdfBase64.split(",")[1], // Remove data:application/pdf;base64,
    }] : [];

    await resend.emails.send({
      from: 'Stigma Technologies <onboarding@resend.dev>',
      to: [email],
      subject: successDict.subject,
      attachments,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <img src="https://stigmatech.ca/logo.png" alt="Stigma" style="height: 40px;" />
          </div>
          <h1 style="font-size: 24px; color: #0b0c10; margin-bottom: 16px;">${lang === 'fr' ? 'Votre Diagnostic' : 'Your Diagnostic'}</h1>
          <p style="font-size: 16px; color: #374151; line-height: 1.6;">
            ${lang === 'fr' ? 
              `Bonjour ${firstName},<br><br>Merci d'avoir complété votre <strong>${auditTitle}</strong>. Vous trouverez ci-joint votre rapport détaillé au format PDF.<br><br>Votre score de maturité est de <strong>${score}/100</strong> (${tier.toUpperCase()}).<br><br>Nos experts reviendront vers vous prochainement pour discuter des points d'amélioration identifiés.` :
              `Hello ${firstName},<br><br>Thank you for completing your <strong>${auditTitle}</strong>. Please find attached your detailed report in PDF format.<br><br>Your maturity score is <strong>${score}/100</strong> (${tier.toUpperCase()}).<br><br>Our experts will get back to you shortly to discuss the identified areas for improvement.`
            }
          </p>
          <div style="margin-top: 32px; padding: 24px; background: #f8fafc; border: 1px solid #e2e8f0; text-align: center;">
             <p style="margin: 0; font-size: 14px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Status: ${tier.toUpperCase()}</p>
          </div>
          <p style="margin-top: 32px; font-size: 12px; color: #94a3b8; text-align: center;">
            © ${new Date().getFullYear()} Stigma Technologies. Tous droits réservés.
          </p>
        </div>
      `,
    });

    // 4. Create Lead in CRM
    await createTwentyLead({
      firstName: firstName || company || "Audit",
      lastName: lastName || "User",
      email,
      phone,
      company: company || "Audit Lead",
      service: auditTitle,
      tier: tier,
      leadScore: leadScore,
      message: `Audit Score: ${score}. Answers: ${JSON.stringify(answers)}`,
    });

    // 5. Log to PostHog
    const posthog = getPostHogClient();
    if (posthog) {
        posthog.capture({
            distinctId: email,
            event: 'lead_captured',
            properties: {
                audit_type: type,
                score,
                tier,
                company,
                lead_score: leadScore,
                lang
            }
        });
        await posthog.shutdown();
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Audit submission error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
