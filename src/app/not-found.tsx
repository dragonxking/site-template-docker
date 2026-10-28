import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@/components/analytics";
import { SiteFooter, SiteHeader } from "@/components/site";
import { Button } from "@/components/ui/button";
import { NAVIGATION_CONFIG } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { localizedPath } from "@/i18n/paths";
import { routing } from "@/i18n/routing";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: `Page not found — ${siteConfig.wikiName}`,
  robots: { index: false, follow: true },
};

/**
 * 全站兜底 404：静态导出时生成 `out/404.html`，Cloudflare Workers 的
 * `not_found_handling: "404-page"` 会对所有未匹配路径返回它（状态码 404）。
 * 根布局不含 <html>，这里自带完整文档，并复用站点页眉页脚，访客可以回到首页或分类页。
 */
export default async function GlobalNotFound() {
  const locale = routing.defaultLocale;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const t = (messages as unknown as { nav: Record<string, string> }).nav;

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Analytics />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NextIntlClientProvider messages={messages}>
            <SiteHeader locale={locale} />
            <main className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-16 text-center">
              <div className="rounded-3xl border border-border bg-card/70 p-8">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">404</p>
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground">Page not found</h1>
                <p className="mt-4 text-muted-foreground">
                  This page does not exist or has moved. Try the home page or one of the sections below.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button asChild>
                    <Link href={localizedPath("/", locale)}>Home</Link>
                  </Button>
                  {NAVIGATION_CONFIG.map((item) => (
                    <Button key={item.key} asChild variant="outline">
                      <Link href={localizedPath(item.path, locale)}>{t[item.key] ?? item.key}</Link>
                    </Button>
                  ))}
                </div>
              </div>
            </main>
            <SiteFooter locale={locale} />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
