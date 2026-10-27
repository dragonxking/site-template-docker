import { LOCALE_PREFIX, routing } from "./routing";

/**
 * URL 约定的唯一入口：内链、canonical、hreflang、sitemap、JSON-LD 都通过这里生成，
 * 这样两个模板（cloudflare: localePrefix "always"；docker: "as-needed"）共用同一套页面代码。
 *
 * - "always"：所有页面都带语言前缀，如 `/en/guide`。
 * - "as-needed"：默认语言不带前缀（`/guide`），其他语言带前缀（`/ja/guide`）。
 */
export function localizedPath(path: string, locale: string): string {
  const normalized = path === "/" || path === "" ? "" : path.startsWith("/") ? path : `/${path}`;
  const withPrefix = LOCALE_PREFIX === "always" || locale !== routing.defaultLocale;
  const result = withPrefix ? `/${locale}${normalized}` : normalized;
  return result || "/";
}

/** 站内绝对地址（含域名），`siteUrl` 不带尾部斜杠 */
export function absoluteUrl(siteUrl: string, path: string, locale: string): string {
  const localized = localizedPath(path, locale);
  return localized === "/" ? siteUrl : `${siteUrl}${localized}`;
}

/** hreflang alternates：`{ en: "/en/guide", ja: "/ja/guide" }` */
export function languageAlternates(path: string): Record<string, string> {
  return Object.fromEntries(routing.locales.map((locale) => [locale, localizedPath(path, locale)]));
}
