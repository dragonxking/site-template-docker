import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/config/site";

export default function AboutPage() {
  return (
    <LegalPage title="About">
      <p>{siteConfig.wikiName} is an independent fan-built guide hub covering progression, mechanics, and essential game knowledge for new and veteran players alike.</p>
      <p>Guides are compiled and reviewed from publicly available sources. Game details can change with updates, so please verify important information in-game or through official channels.</p>
    </LegalPage>
  );
}
