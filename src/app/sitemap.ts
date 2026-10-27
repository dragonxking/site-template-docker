import type { MetadataRoute } from "next";
import { getAllContentPaths } from "@/lib/content";
import { CONTENT_TYPES } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/i18n/paths";
import { routing } from "@/i18n/routing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteConfig.url;

  // Static paths that always exist
  const staticPaths = ["/", ...CONTENT_TYPES.map((type) => `/${type}`), "/privacy-policy", "/terms-of-service", "/copyright", "/about"];

  // Dynamic paths: scan actual MDX content files
  const contentPaths = await getAllContentPaths("en");
  const dynamicPaths = contentPaths.map((item) => `/${[item.contentType, ...item.slug].join("/")}`);

  const paths = [...staticPaths, ...dynamicPaths];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: absoluteUrl(siteUrl, path, locale),
      lastModified: new Date(),
      changeFrequency: path === "/" ? ("daily" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : 0.6,
    })),
  );
}
