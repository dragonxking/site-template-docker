import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/config/site";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>{siteConfig.wikiName} provides informational game guides for {siteConfig.name}. We do not request account credentials, game passwords, or private payment information.</p>
      <p>Basic analytics, advertising, and hosting providers may process standard technical information such as device type, browser, approximate region, and visited pages.</p>
      <p>External links may lead to the game&apos;s official website, community channels, video platforms, or community tools. Those services are governed by their own privacy policies.</p>
    </LegalPage>
  );
}
