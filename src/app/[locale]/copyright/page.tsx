import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/config/site";
import { staticPageMetadata } from "@/lib/static-page-metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return staticPageMetadata("Copyright", `Copyright and ownership information for ${siteConfig.wikiName} and the ${siteConfig.name} game materials it references.`, "/copyright", locale);
}

export default function CopyrightPage() {
  return (
    <LegalPage title="Copyright">
      <p>{siteConfig.name}, its logos, artwork, and related media belong to their respective owners.</p>
      <p>{siteConfig.wikiName} is a non-official fan site created for informational and guide purposes.</p>
      <p>
        If you own rights to content displayed here and have a concern, please{" "}
        {siteConfig.contactEmail ? (
          <>
            email <a className="underline" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          </>
        ) : (
          "contact the site operator"
        )}{" "}
        for review.
      </p>
    </LegalPage>
  );
}
