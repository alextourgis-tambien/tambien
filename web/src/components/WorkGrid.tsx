import Image from "next/image";
import Link from "@/components/AppLink";
import { Media } from "./Media";
import assets from "@/data/assets.json";
import { translate, type Language } from "@/lib/i18n";
import type { Project } from "@/lib/types";
const images = assets["4115-4616"];
const cards = [
  ["table22", "imgRectangle1"],
  ["green-got", "imgRectangle5"],
  ["mat-crepel", "imgRectangle9"],
  ["carres-solidaires", "imgRectangle11"],
  ["last-prisoner-project", "imgRectangle2"],
  ["exploro-tour", "imgRectangle6"],
  ["velia", "imgCaptureDecran20241109A2242011"],
  ["pending-8", "imgRectangle12"],
  ["rose-island", "imgRectangle4"],
  ["pending-10", "imgRectangle7"],
  ["socialclub", "imgRectangle10"],
  ["heetch", "imgRectangle13"],
  ["pending-13", "imgRectangle3"],
  ["pending-14", "imgRectangle21"],
  ["pending-15", "imgBilzig031"],
  ["pending-16", "imgRectangle8"],
] as const;
export const workCardCount = cards.length;
export function WorkGrid({
  projects,
  lang,
}: {
  projects: Project[];
  lang: Language;
}) {
  return (
    <div className="project-grid work-grid">
      {cards.map(([slug, key], index) => {
        const project =
          projects.find((item) => item.workPosition === index + 1) ||
          projects.find((item) => item.slug === slug);
        const name =
          project?.name ||
          (slug === "rose-island"
            ? "Rose Island"
            : {
                fr: "Projet à venir",
                en: "Project coming soon",
                es: "Proyecto próximamente",
              }[lang]);
        const body = (
          <>
            {project?.workCover ? (
              <Media
                media={{ ...project.workCover, width: 348, height: 422 }}
                lang={lang}
              />
            ) : (
              <div className={`work-cover work-cover-${index + 1}`}>
                <Image
                  src={images[key]}
                  fill
                  alt={name}
                  sizes="(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 24vw"
                />
                {index === 5 ? (
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
                {index === 13 ? (
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
                {index === 14 ? (
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
          <article key={slug}>
            {project ? (
              <Link href={`/${lang}/projects/${project.slug}`}>{body}</Link>
            ) : (
              body
            )}
          </article>
        );
      })}
    </div>
  );
}
