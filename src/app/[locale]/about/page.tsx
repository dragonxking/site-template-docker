import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/config/site";
import { staticPageMetadata } from "@/lib/static-page-metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return staticPageMetadata("About", `Learn about ${siteConfig.wikiName}, an independent fan guide resource, and how its game information is compiled.`, "/about", locale);
}

export default function AboutPage() {
  return (
    <LegalPage title="About">
      <p>{siteConfig.wikiName} is an independent fan-built guide hub covering progression, mechanics, and essential game knowledge for new and veteran players alike.</p>
      <p>Guides are compiled and reviewed from publicly available sources. Game details can change with updates, so please verify important information in-game or through official channels.</p>
      {siteConfig.contactEmail && (
        <p>
          To report an error or suggest a correction, email{" "}
          <a className="underline" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
      )}
    </LegalPage>
  );
}
