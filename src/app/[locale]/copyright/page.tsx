import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/config/site";

export default function CopyrightPage() {
  return (
    <LegalPage title="Copyright">
      <p>{siteConfig.name}, its logos, artwork, and related media belong to their respective owners.</p>
      <p>{siteConfig.wikiName} is a non-official fan site created for informational and guide purposes.</p>
      <p>If you own rights to content displayed here and have a concern, please contact the site operator for review.</p>
    </LegalPage>
  );
}
