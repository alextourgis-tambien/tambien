import { HoverLabel } from "@/components/HoverLabel";
import { PageFade } from "@/components/PageFade";
import Link from "@/components/AppLink";
import { notFound } from "next/navigation";
import { isLanguage, labels, translate } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { metadata, JsonLd, siteUrl } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Media } from "@/components/Media";
import { Blocks } from "@/components/Blocks";
type Props = { params: Promise<{ lang: string; slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLanguage(lang)) return {};
  const { settings, projects } = await getContent();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return metadata(
    lang,
    `/projects/${slug}`,
    project.name,
    translate(project.description, lang),
    settings,
    project.seo,
  );
}
export default async function Project({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLanguage(lang)) notFound();
  const { settings, projects } = await getContent();
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const t = labels[lang];
  const related = projects
    .filter(
      (item) =>
        item.slug !== slug &&
        (project.related?.length ? project.related.includes(item._id) : true),
    )
    .slice(0, 4);
  return (
    <PageFade key={`${lang}/projects/${slug}`}>
      <Header lang={lang} settings={settings} />
      <main id="content" className="page">
        <article className="editorial case-study">
          <div className="project-intro">
            <h1>{project.name}</h1>
            <p>{translate(project.title, lang)}</p>
            <p>{translate(project.description, lang)}</p>
            {project.website ? (
              <a className="pill" href={project.website}>
                <HoverLabel>Website ↗</HoverLabel>
              </a>
            ) : null}
            {project.client ? <p>{project.client}</p> : null}
            {project.year ? <p>{project.year}</p> : null}
            {project.credits ? <p>{project.credits}</p> : null}
          </div>
          <div>
            {project.blocks.length ? (
              <Blocks blocks={project.blocks} lang={lang} />
            ) : (
              <Media
                media={project.cover}
                lang={lang}
                priority
                sizes="(max-width: 600px) 92vw, 65vw"
              />
            )}
          </div>
        </article>
        <section className="related">
          <h2>{t.related}</h2>
          <div className="project-grid">
            {related.map((item) => (
              <article key={item._id}>
                <Link data-motion-card href={`/${lang}/projects/${item.slug}`}>
                  <Media media={item.cover} lang={lang} />
                  <h3>{item.name}</h3>
                  <p>{translate(item.description, lang)}</p>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer lang={lang} settings={settings} path={`/projects/${slug}`} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: t.home,
              item: `${siteUrl}/${lang}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: t.work,
              item: `${siteUrl}/${lang}/work`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: project.name,
              item: `${siteUrl}/${lang}/projects/${slug}`,
            },
          ],
        }}
      />
    </PageFade>
  );
}
