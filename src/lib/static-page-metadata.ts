import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl, languageAlternates, localizedPath } from "@/i18n/paths";
import type { Locale } from "@/i18n/routing";

export function staticPageMetadata(title: string, description: string, pathname: string, locale: Locale): Metadata {
  const pageTitle = `${title} — ${siteConfig.wikiName}`;
  // 页面自己的 openGraph 会整体覆盖布局里的 openGraph（包括 images），所以这里必须显式带上 og:image。
  const image = new URL(siteConfig.images.hero, siteConfig.url).toString();
  return {
    title: pageTitle,
    description,
    alternates: { canonical: localizedPath(pathname, locale), languages: languageAlternates(pathname) },
    openGraph: { title: pageTitle, description, url: absoluteUrl(siteConfig.url, pathname, locale), images: [{ url: image }] },
  };
}
