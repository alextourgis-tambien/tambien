import { PageFade } from "@/components/PageFade";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLanguage, translate } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { metadata, JsonLd, siteUrl } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Feed } from "@/components/Feed";
import { Process } from "@/components/Process";
import { Media } from "@/components/Media";
import { homeAssets } from "@/data/seed";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  const { settings } = await getContent();
  return metadata(
    lang,
    "",
    "Branding, Web & SEO",
    translate(settings.hero, lang),
    settings,
    settings.defaultSeo,
  );
}
export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const content = await getContent();
  const { settings } = content;
  const hero = translate(settings.hero, lang);
  const heroParts = hero.match(/^([\s\S]*?)(through |grâce au |a través del )(Branding[\s\S]*)$/u);
  return (
    <PageFade key={lang}>
      <Header lang={lang} settings={settings} />
      <main id="content">
        <section className="hero">
          <h1>
            {heroParts ? (
              <>
                {heroParts[1].trimEnd()}
                {" "}
                <span className="hero-ending">
                  {heroParts[2]}
                  <span className="hero-services">{heroParts[3]}</span>
                </span>
              </>
            ) : hero}
          </h1>
          <div className="awards">
            <span>
              <Image
                src={homeAssets.imgGroup37219}
                width={43}
                height={25}
                alt="Awwwards"
              />
              <span className="pill">25+</span>
            </span>
            <span>
              <Image
                src={homeAssets.imgGroup37218}
                width={41}
                height={36}
                alt="Cannes Lions"
              />
              <span className="pill">1</span>
            </span>
            <span>
              <Image
                src={homeAssets.imgVector2}
                width={39}
                height={25}
                alt="Webflow"
              />
              <span className="pill">Partner</span>
            </span>
          </div>
        </section>
        <Feed items={content.feed} lang={lang} settings={settings} />
        <Process steps={content.process} lang={lang} settings={settings} />
        {content.testimonials.length ? (
          <section className="testimonials">
            {content.testimonials.map((item) => (
              <figure key={item._id}>
                <Media
                  media={item.media}
                  lang={lang}
                  sizes="(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 32vw"
                />
                <blockquote>{translate(item.quote, lang)}</blockquote>
                <figcaption>
                  {item.person}, {translate(item.role, lang)}
                </figcaption>
              </figure>
            ))}
          </section>
        ) : null}
      </main>
      <Footer lang={lang} settings={settings} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: settings.siteName,
          url: siteUrl,
          sameAs: settings.socials.map((item) => item.url),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: settings.siteName,
          url: siteUrl,
          inLanguage: ["fr", "en", "es"],
        }}
      />
    </PageFade>
  );
}
