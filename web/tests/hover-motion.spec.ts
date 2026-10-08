import { test, expect } from "@playwright/test";

test("button reveal keeps its size and accessible label, then returns to rest", async ({
  page,
}) => {
  await page.goto("/fr/work");
  const button = page.locator(".header-contact a").first();
  const track = button.locator(".hover-label-track");
  const box = await button.boundingBox();
  await expect(button).toHaveAccessibleName("Réserver un appel");
  await button.hover();
  await expect
    .poll(() =>
      track.evaluate(
        (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42,
      ),
    )
    .toBeLessThan(-5);
  await expect(button).toHaveCSS("text-decoration-line", "none");
  expect(await button.boundingBox()).toEqual(box);
  await page.mouse.move(0, 0);
  await expect
    .poll(() =>
      track.evaluate(
        (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42,
      ),
    )
    .toBe(0);
  await button.focus();
  await expect
    .poll(() =>
      track.evaluate(
        (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42,
      ),
    )
    .toBeLessThan(-5);
});

test("home and Work card visuals reveal without moving titles or leaving stale motion", async ({
  page,
}) => {
  for (const path of ["/fr", "/fr/work"]) {
    await page.goto(path);
    const card = page.locator("[data-motion-card]").first();
    await card.scrollIntoViewIfNeeded();
    const title = card.locator("h2");
    const titleBox = await title.boundingBox();
    await card.hover();
    await expect(card.locator(".card-cue")).toHaveCSS("opacity", "1");
    expect(await title.boundingBox()).toEqual(titleBox);
    await expect(title).toHaveCSS("text-decoration-line", "none");
    await page.mouse.move(0, 0);
    await expect(card.locator(".card-cue")).toHaveCSS("opacity", "0");
    await expect
      .poll(() =>
        card
          .locator(".motion-visual")
          .evaluate(
            (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).a,
          ),
      )
      .toBe(1);
    await card.hover();
    await card.click();
    await expect(page).toHaveURL(/\/fr\/projects\//);
    await expect(page.locator("h1")).toBeVisible();
  }
});

test("reduced motion leaves button labels and card images stationary", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fr/work");
  const button = page.locator(".header-contact a").first();
  await button.hover();
  await expect(button.locator(".hover-label-track")).toHaveCSS(
    "transform",
    "none",
  );
  const card = page.locator("[data-motion-card]").first();
  await card.hover();
  await expect(card.locator(".motion-visual")).toHaveCSS("transform", "none");
  await expect(card.locator(".card-cue")).toBeHidden();
});
