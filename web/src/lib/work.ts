import type { Project } from "./types";

// Preserve the sixteen design slots, and append every additional CMS project.
const slots = [
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
  ["bond", "imgRectangle3"],
  ["pending-14", "imgRectangle21"],
  ["bilzig", "imgBilzig031"],
  ["pending-16", "imgRectangle8"],
] as const;
type WorkCard = {
  key: string;
  project?: Project;
  slot?: number;
  assetKey?: (typeof slots)[number][1];
};
export function getWorkCards(projects: Project[]): WorkCard[] {
  const ordered = [...projects].sort((a, b) => a.order - b.order);
  const positioned = new Map<number, Project>();
  for (const project of ordered) {
    const position = project.workPosition;
    if (
      position &&
      Number.isInteger(position) &&
      position <= slots.length &&
      position > 0 &&
      !positioned.has(position)
    )
      positioned.set(position, project);
  }
  const reserved = new Set(
    [...positioned.values()].map((project) => project.slug),
  );
  const used = new Set<string>();
  const cards: WorkCard[] = slots.map(([slug, assetKey], index) => {
    const project =
      positioned.get(index + 1) ||
      ordered.find((item) => item.slug === slug && !reserved.has(item.slug));
    if (project) used.add(project.slug);
    return {
      key: project?.slug || slug,
      project,
      slot: index + 1,
      // A deliberately moved project keeps its own cover instead of inheriting
      // another client's image from the destination slot.
      assetKey:
        !project || project.slug === slug || slug.startsWith("pending-")
          ? assetKey
          : undefined,
    };
  });
  for (const project of ordered) {
    if (used.has(project.slug)) continue;
    cards.push({ key: project.slug, project });
    used.add(project.slug);
  }
  return cards;
}
