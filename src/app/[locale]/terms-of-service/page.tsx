import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/config/site";

export default function TermsOfServicePage() {
  return (
    <LegalPage title="Terms of Service">
      <p>This site is an independent fan-made guide hub. Content is provided for informational and entertainment purposes only.</p>
      <p>Game systems, codes, drops, and update details may change without notice. Always verify important information in-game or through official channels.</p>
      <p>By using this site, you agree not to misuse it, attempt unauthorized access, or present {siteConfig.wikiName} as an official property of the {siteConfig.name} developer or publisher.</p>
    </LegalPage>
  );
}
