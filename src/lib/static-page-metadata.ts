import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl, languageAlternates, localizedPath } from "@/i18n/paths";
import type { Locale } from "@/i18n/routing";

export function staticPageMetadata(title: string, description: string, pathname: string, locale: Locale): Metadata {
  const pageTitle = `${title} — ${siteConfig.wikiName}`;
  return {
    title: pageTitle,
    description,
    alternates: { canonical: localizedPath(pathname, locale), languages: languageAlternates(pathname) },
    openGraph: { title: pageTitle, description, url: absoluteUrl(siteConfig.url, pathname, locale) },
  };
}
