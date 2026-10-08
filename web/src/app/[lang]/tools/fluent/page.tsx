import { notFound } from "next/navigation";
import Link from "@/components/AppLink";
import { getContent } from "@/lib/content";
import { isLanguage, labels, translate } from "@/lib/i18n";
import { metadata } from "@/lib/seo";
import { fluentPage } from "@/data/resources";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageFade } from "@/components/PageFade";
import { Fluent } from "@/components/Fluent";
type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  const content = await getContent();
  const page =
    content.pages.find((p) => p.slug === "tools/fluent") || fluentPage;
  return metadata(
    lang,
    "/tools/fluent",
    "Fluent",
    translate(page.description, lang),
    content.settings,
    page.seo,
  );
}
export default async function FluentPage({ params }: Props) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const content = await getContent();
  const page =
    content.pages.find((p) => p.slug === "tools/fluent") || fluentPage;
  return (
    <PageFade key={`${lang}/tools/fluent`}>
      <Header lang={lang} settings={content.settings} />
      <main id="content" className="page page-fluent">
        <div className="fluent-intro">
          <Link href={`/${lang}/resources`}>{labels[lang].resources}</Link>
          <h1>{translate(page.title, lang)}</h1>
          <p>{translate(page.description, lang)}</p>
        </div>
        <Fluent lang={lang} />
      </main>
      <Footer lang={lang} settings={content.settings} path="/tools/fluent" />
    </PageFade>
  );
}
