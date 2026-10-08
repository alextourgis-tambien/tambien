import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { isLanguage, labels, translate } from "@/lib/i18n";
import { metadata } from "@/lib/seo";
import { resourcesPage, resources } from "@/data/resources";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageFade } from "@/components/PageFade";
import { Resources } from "@/components/Resources";
type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  const content = await getContent();
  const page =
    content.pages.find((p) => p.slug === "resources") || resourcesPage;
  return metadata(
    lang,
    "/resources",
    labels[lang].resources,
    translate(page.description, lang),
    content.settings,
    page.seo,
  );
}
export default async function ResourcesPage({ params }: Props) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const content = await getContent();
  const page =
    content.pages.find((p) => p.slug === "resources") || resourcesPage;
  return (
    <PageFade key={`${lang}/resources`}>
      <Header lang={lang} settings={content.settings} />
      <main id="content" className="page page-resources">
        <Resources
          page={page}
          items={page.resources || resources}
          lang={lang}
        />
      </main>
      <Footer lang={lang} settings={content.settings} path="/resources" />
    </PageFade>
  );
}
