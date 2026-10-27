import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/site";
import { Analytics } from "@/components/analytics";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = siteConfig.url;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await getMessages({ locale })) as unknown as { metadata: { title: string; description: string; keywords?: string } };
  const image = `${siteUrl}${siteConfig.images.hero}`;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: messages.metadata.title, template: "%s" },
    description: messages.metadata.description,
    ...(messages.metadata.keywords ? { keywords: messages.metadata.keywords } : {}),
    openGraph: { type: "website", locale, url: siteUrl, siteName: siteConfig.wikiName, images: [{ url: image }] },
    twitter: { card: "summary_large_image", images: [image] },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages();
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.wikiName,
    url: siteUrl,
    logo: `${siteUrl}${siteConfig.images.logo}`,
    image: `${siteUrl}${siteConfig.images.hero}`,
  };

  return (
    <html lang={locale} className={`${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Analytics />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NextIntlClientProvider messages={messages}>
            <JsonLd data={organization} />
            <SiteHeader locale={locale} />
            {children}
            <SiteFooter locale={locale} />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
