import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/config/site";
import { staticPageMetadata } from "@/lib/static-page-metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return staticPageMetadata("Terms of Service", `Read the ${siteConfig.wikiName} terms of service for using this independent ${siteConfig.name} fan guide website.`, "/terms-of-service", locale);
}

export default function TermsOfServicePage() {
  return (
    <LegalPage title="Terms of Service">
      <p>This site is an independent fan-made guide hub. Content is provided for informational and entertainment purposes only.</p>
      <p>Game systems, codes, drops, and update details may change without notice. Always verify important information in-game or through official channels.</p>
      <p>By using this site, you agree not to misuse it, attempt unauthorized access, or present {siteConfig.wikiName} as an official property of the {siteConfig.name} developer or publisher.</p>
    </LegalPage>
  );
}
