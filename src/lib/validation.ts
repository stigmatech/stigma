import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * List of generic email domains to block.
 * These are common public providers (B2C) that we want to avoid for high-quality B2B leads.
 */
const GENERIC_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "live.com",
  "msn.com",
  "mail.ru",
  "yandex.ru",
  "free.fr",
  "orange.fr",
  "wanadoo.fr",
  "sfr.fr",
  "me.com",
  "protonmail.com",
  "proton.me",
  "zoho.com",
  "gmx.com",
  "mail.com",
  "wanadoo.fr",
  "libero.it",
  "virgilio.it",
  "t-online.de",
  "web.de",
  "gmx.de",
  "mail.be",
  "skynet.be",
  "bluewin.ch",
  "sunrise.ch",
  "fastmail.com",
  "hushmail.com"
];

/**
 * Validates if an email is professional (not from a generic public provider).
 */
export function isProfessionalEmail(email: string): boolean {
  if (!email || !email.includes("@")) return false;
  
  const domain = email.split("@")[1].toLowerCase();
  return !GENERIC_DOMAINS.includes(domain);
}

/**
 * Validates a phone number using libphonenumber-js.
 * Defaults to international validation, but can be customized with a default country.
 */
export function isValidPhoneNumber(phone: string, defaultCountry: any = "CA"): boolean {
  if (!phone) return false;
  
  try {
    const phoneNumber = parsePhoneNumberFromString(phone, defaultCountry);
    return phoneNumber ? phoneNumber.isValid() : false;
  } catch (error) {
    return false;
  }
}
/**
 * Formats a phone number to E.164 format (e.g., +15141234567).
 * Useful for CRM integrations and ensuring consistent data.
 */
export function formatToE164(phone: string, defaultCountry: any = "CA"): string {
  try {
    const phoneNumber = parsePhoneNumberFromString(phone, defaultCountry);
    return phoneNumber && phoneNumber.isValid() ? phoneNumber.format("E.164") : phone.replace(/\s+/g, "");
  } catch (error) {
    return phone.replace(/\s+/g, "");
  }
}
