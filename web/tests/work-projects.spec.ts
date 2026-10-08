import { test, expect } from "@playwright/test";
import { getWorkCards } from "../src/lib/work";
import type { Project } from "../src/lib/types";
const project = (
  slug: string,
  order: number,
  workPosition?: number,
): Project => ({
  _id: slug,
  slug,
  name: slug,
  order,
  workPosition,
  title: { en: slug, fr: slug, es: slug },
  description: { en: slug, fr: slug, es: slug },
  cover: {
    src: "/cover.png",
    width: 348,
    height: 422,
    alt: { en: slug, fr: slug, es: slug },
  },
  blocks: [],
});
test("every CMS project is shown, including extras and displaced projects", () => {
  const projects = [
    project("table22", 0, 2),
    project("green-got", 1),
    project("custom", 2, 2),
    ...Array.from({ length: 20 }, (_, i) => project(`additional-${i}`, i + 3)),
  ];
  const cards = getWorkCards(projects);
  const slugs = cards.flatMap((card) =>
    card.project ? [card.project.slug] : [],
  );
  expect(slugs.length).toBe(projects.length);
  expect(new Set(slugs)).toEqual(new Set(projects.map((item) => item.slug)));
  expect(cards[1].project?.slug).toBe("table22");
});
test("the newly restored projects can be opened in all three languages", async ({
  page,
}) => {
  for (const lang of ["fr", "en", "es"]) {
    await page.goto(`/${lang}/work`);
    for (const slug of ["rose-island", "bond", "bilzig"]) {
      const link = page.locator(
        `.work-grid a[href="/${lang}/projects/${slug}"]`,
      );
      await expect(link).toHaveCount(1);
      await link.click();
      await expect(page.locator("h1")).toBeVisible();
      await expect(page).toHaveURL(new RegExp(`/${lang}/projects/${slug}$`));
      await page.goBack();
    }
  }
});
