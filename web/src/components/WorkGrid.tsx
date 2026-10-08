import { CardCue } from "./CardCue";
import Image from "next/image";
import Link from "@/components/AppLink";
import { Media } from "./Media";
import assets from "@/data/assets.json";
import { translate, type Language } from "@/lib/i18n";
import type { Project } from "@/lib/types";
import { getWorkCards } from "@/lib/work";
const images = assets["4115-4616"];
export function WorkGrid({
  projects,
  lang,
}: {
  projects: Project[];
  lang: Language;
}) {
  return (
    <div className="project-grid work-grid">
      {getWorkCards(projects).map(({ key, project, slot, assetKey }) => {
        const name =
          project?.name ||
          {
            fr: "Projet à identifier",
            en: "Project to identify",
            es: "Proyecto por identificar",
          }[lang];
        const body = (
          <>
            {project && (project.workCover || !assetKey) ? (
              <Media
                media={{
                  ...(project.workCover || project.cover),
                  width: 348,
                  height: 422,
                }}
                lang={lang}
              />
            ) : (
              <div className={`work-cover work-cover-${slot}`}>
                <div className="motion-visual">
                  <Image
                    src={images[assetKey!]}
                    fill
                    alt={name}
                    sizes="(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 24vw"
                  />
                  {slot === 6 ? (
                    <div className="travel-search" aria-hidden="true">
                      <span>
                        City
                        <br />
                        <strong>Rome</strong>
                      </span>
                      <span>
                        Type of experience
                        <br />
                        <strong>Private Tours in the City</strong>
                      </span>
                      <span className="pill dark">Discover</span>
                    </div>
                  ) : null}
                  {slot === 14 ? (
                    <>
                      <Image
                        className="work-layer-top"
                        src={images.imgRectangle23}
                        fill
                        alt=""
                        sizes="24vw"
                      />
                      <Image
                        className="work-layer-bottom"
                        src={images.imgRectangle22}
                        fill
                        alt=""
                        sizes="24vw"
                      />
                    </>
                  ) : null}
                  {slot === 15 ? (
                    <>
                      <Image
                        className="work-layer-bottom"
                        src={images.imgBilzig011}
                        fill
                        alt=""
                        sizes="24vw"
                      />
                      <Image
                        className="work-layer-logo"
                        src={images.imgVector1}
                        fill
                        alt=""
                        sizes="16vw"
                      />
                    </>
                  ) : null}
                </div>
                <CardCue />
              </div>
            )}
            <h2>{name}</h2>
            <p>
              {project
                ? translate(project.description, lang)
                : {
                    fr: "Présentation prochainement.",
                    en: "Case study coming soon.",
                    es: "Presentación próximamente.",
                  }[lang]}
            </p>
          </>
        );
        return (
          <article key={key}>
            {project ? (
              <Link data-motion-card href={`/${lang}/projects/${project.slug}`}>
                {body}
              </Link>
            ) : (
              body
            )}
          </article>
        );
      })}
    </div>
  );
}
