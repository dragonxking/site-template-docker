import type { MetadataRoute } from "next";
import en from "@/locales/en.json";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.wikiName,
    short_name: siteConfig.shortName,
    description: en.metadata.description,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.backgroundColor,
    theme_color: siteConfig.themeColor,
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
