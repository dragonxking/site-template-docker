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
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
        <p>
          This site uses Google Analytics 4 to measure traffic. It sets cookies or uses similar technologies in your browser to collect usage data such as pages visited, approximate location, device type and browser. Google processes this data under its own privacy policy. You can block cookies in your browser settings or use Google&apos;s{" "}
          <a className="underline" href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">Analytics opt-out browser add-on</a>.
        </p>
      )}
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
