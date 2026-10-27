import { defineRouting } from "next-intl/routing";

/**
 * URL 语言前缀策略，供 `paths.ts` 生成 canonical / hreflang / sitemap / 内链。
 * cloudflare 模板（静态导出）必须是 "always"；docker 模板为 "as-needed"。
 */
export const LOCALE_PREFIX: "always" | "as-needed" = "as-needed";

/**
 * Single source of truth for supported locales.
 *
 * To add a new language you must update THREE places that have to stay in sync:
 *   1. The `locales` array below.
 *   2. The static imports + `messagesMap` in `src/i18n/request.ts`.
 *   3. The matching JSON file in `src/locales/<locale>.json`.
 * The language name shown in the switcher is set in `src/components/language-switcher.tsx`.
 */
export const routing = defineRouting({
  locales: ["en", "ja"],
  defaultLocale: "en",
  // English is served without a `/en` prefix (e.g. `/bosses`, `/bosses/gelum`).
  localePrefix: LOCALE_PREFIX,
  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];
