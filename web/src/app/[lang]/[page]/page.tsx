import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLanguage, labels, translate } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { metadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Media } from "@/components/Media";
import { Blocks, Video } from "@/components/Blocks";
import { homeAssets } from "@/data/seed";
type Props = { params: Promise<{ lang: string; page: string }> };
export async function generateMetadata({ params }: Props) {
  const { lang, page } = await params;
  if (!isLanguage(lang)) return {};
  const content = await getContent();
  const data = content.pages.find((item) => item.slug === page);
  const title =
    labels[lang][page as "studio" | "pricing" | "event" | "legals" | "work"];
  return metadata(
    lang,
    `/${page}`,
    title || translate(data?.title, lang),
    translate(data?.description, lang) ||
      translate(content.settings.hero, lang),
    content.settings,
    data?.seo,
  );
}
export default async function Page({ params }: Props) {
  const { lang, page } = await params;
  if (!isLanguage(lang)) notFound();
  const content = await getContent();
  const { settings } = content;
  const t = labels[lang];
  const data = content.pages.find((item) => item.slug === page);
  if (!data && !["pricing", "work"].includes(page)) notFound();
  return (
    <>
      <Header lang={lang} settings={settings} />
      <main id="content" className={`page page-${page}`}>
        {page === "work" ? (
          <>
            <h1 className="work-title">
              {t.selected} <span>({content.projects.length})</span>
            </h1>
            <div className="project-grid">
              {content.projects.map((project) => (
                <article key={project._id}>
                  <Link href={`/${lang}/projects/${project.slug}`}>
                    <Media media={project.cover} lang={lang} />
                    <h2>{project.name}</h2>
                    <p>{translate(project.description, lang)}</p>
                  </Link>
                </article>
              ))}
            </div>
          </>
        ) : null}
        {page === "pricing" ? (
          <>
            <h1 className="sr-only">{t.pricing}</h1>
            <div className="offers">
              {content.offers.map((offer) => (
                <article className="offer" key={offer._id}>
                  <Media media={offer.media} lang={lang} />
                  <div className="offer-main">
                    <h2>
                      {offer.name} <span>{offer.price}</span>
                    </h2>
                    <p className="offer-promise">
                      {translate(offer.promise, lang)}
                    </p>
                    <div className="offer-bottom">
                      <p>{translate(offer.description, lang)}</p>
                      <strong>
                        {offer.weeks} {t.weeks}
                      </strong>
                    </div>
                  </div>
                  <div className="offer-includes">
                    <h3>{t.includes}</h3>
                    <ul>
                      {offer.includes.map((item, index) => (
                        <li key={index}>{translate(item, lang)}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : null}
        {page === "studio" && data ? (
          <>
            <section className="studio-hero">
              <h1>{translate(data.title, lang)}</h1>
              <div className="studio-portrait">
                {data.media ? (
                  <Media media={data.media} lang={lang} priority />
                ) : null}
                {data.videoUrl ? (
                  <Video url={data.videoUrl} title={t.play} />
                ) : null}
              </div>
              <div className="studio-mark">
                <Image
                  src={homeAssets.imgVector1}
                  width={710}
                  height={642}
                  alt=""
                />
              </div>
            </section>
            <section id="services" className="studio-lists">
              <div>
                <h2>{t.services}</h2>
                <ul>
                  {settings.services.map((item) => (
                    <li key={item.slug}>{translate(item.name, lang)}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2>{t.clients}</h2>
                <ul>
                  {settings.clients.map((item) => (
                    <li key={item.name}>
                      {item.icon ? (
                        <Image src={item.icon} width={25} height={25} alt="" />
                      ) : null}
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
              {settings.videos.length ? (
                <div>
                  <h2>{t.videos}</h2>
                  <ul>
                    {settings.videos.map((item) => (
                      <li key={item.url}>
                        <a href={item.url}>{translate(item.title, lang)}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
            {data.blocks ? <Blocks blocks={data.blocks} lang={lang} /> : null}
          </>
        ) : null}
        {page === "event" && data ? (
          <section className="editorial">
            <div>
              <h1>{translate(data.title, lang)}</h1>
              <div className="multiline">
                {translate(data.description, lang)}
              </div>
              <strong>{translate(data.status, lang) || t.soon}</strong>
            </div>
            <div>
              {data.media ? (
                <Media media={data.media} lang={lang} priority />
              ) : null}
              {data.blocks ? <Blocks blocks={data.blocks} lang={lang} /> : null}
            </div>
          </section>
        ) : null}
        {page === "legals" && data ? (
          <section className="legal-page">
            <h1>{translate(data.title, lang)}</h1>
            {data.blocks?.length ? (
              <Blocks blocks={data.blocks} lang={lang} />
            ) : (
              <p>{t.legalPending}</p>
            )}
          </section>
        ) : null}
      </main>
      {page !== "work" ? (
        <Footer lang={lang} settings={settings} path={`/${page}`} />
      ) : null}
    </>
  );
}
