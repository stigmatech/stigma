import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { i18n, type Locale } from "@/i18n-config";
import "./globals.css";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/json-ld";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stigma Technologies - Solutions de Cybersécurité Avancées",
  description: "Libérez le potentiel de votre infrastructure technologique avec des solutions simples, sûres et innovantes conçues pour l'avenir.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const { children } = props;

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(manrope.variable, spaceGrotesk.variable, "font-sans antialiased")}
        suppressHydrationWarning
      >
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
