import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/content";
import { CONTENT_TYPES } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/i18n/paths";
import { routing } from "@/i18n/routing";

/** 取较晚的日期（YYYY-MM-DD 字符串可直接比较）；空值忽略 */
function latest(dates: Array<string | undefined>): string | undefined {
  const valid = dates.filter((d): d is string => Boolean(d));
  return valid.length ? valid.reduce((a, b) => (a > b ? a : b)) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteConfig.url;

  // 文章页：lastmod 取文章自己的 lastModified，没有则取 date，不用构建时间
  const groups = await Promise.all(
    CONTENT_TYPES.map(async (type) => {
      const items = await getAllContent(type, "en");
      return {
        type,
        entries: items.map((item) => ({
          path: `/${[item.contentType, ...item.segments].join("/")}`,
          lastModified: item.metadata.lastModified || item.metadata.date,
        })),
      };
    }),
  );

  const articleEntries = groups.flatMap((group) => group.entries);
  const categoryEntries = groups.map((group) => ({
    path: `/${group.type}`,
    lastModified: latest(group.entries.map((entry) => entry.lastModified)),
  }));

  // 首页、分类页：取其下文章的最新日期；法律页没有可靠日期，不写 lastmod（省略比写错好）
  const entries: Array<{ path: string; lastModified?: string }> = [
    { path: "/", lastModified: latest(articleEntries.map((entry) => entry.lastModified)) },
    ...categoryEntries,
    { path: "/privacy-policy" },
    { path: "/terms-of-service" },
    { path: "/copyright" },
    { path: "/about" },
    ...articleEntries,
  ];

  return routing.locales.flatMap((locale) =>
    entries.map((entry) => ({
      url: absoluteUrl(siteUrl, entry.path, locale),
      ...(entry.lastModified ? { lastModified: entry.lastModified } : {}),
      changeFrequency: entry.path === "/" ? ("daily" as const) : ("weekly" as const),
      priority: entry.path === "/" ? 1 : 0.6,
    })),
  );
}
