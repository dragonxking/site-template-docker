import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/config/site";
import { staticPageMetadata } from "@/lib/static-page-metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return staticPageMetadata("Privacy Policy", `Read the ${siteConfig.wikiName} privacy policy, including technical data, external links and service providers.`, "/privacy-policy", locale);
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>{siteConfig.wikiName} provides informational game guides for {siteConfig.name}. We do not request account credentials, game passwords, or private payment information.</p>
      <p>Basic analytics, advertising, and hosting providers may process standard technical information such as device type, browser, approximate region, and visited pages.</p>
      <p>External links may lead to the game&apos;s official website, community channels, video platforms, or community tools. Those services are governed by their own privacy policies.</p>
      {siteConfig.contactEmail && (
        <p>
          Questions about this policy can be sent to{" "}
          <a className="underline" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
      )}
    </LegalPage>
  );
}
