import { test, expect } from "@playwright/test";
const routes = [
  "/fr",
  "/en",
  "/es",
  "/fr/work",
  "/fr/pricing",
  "/fr/studio",
  "/fr/event",
  "/fr/legals",
  "/fr/projects/table22",
];
test("pages, translations, image delivery, and responsive layout", async ({
  page,
}) => {
  for (const width of [
    375, 390, 500, 600, 700, 768, 820, 900, 1000, 1100, 1280, 1366, 1512, 1680,
    1920,
  ]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(await page.locator("html").getAttribute("lang")).toBe(
        route.split("/")[1],
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
        `${route} at ${width}px`,
      ).toBe(true);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/,
      );
    }
  }
});
test("menu keyboard behavior and client-side project navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/en");
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await expect(page.locator("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open menu", exact: true }),
  ).toBeFocused();
  await page.locator(".feed-card a").first().click();
  await expect(page).toHaveURL(/\/en\/projects\/table22$/);
  await expect(
    page.getByRole("heading", { name: "Table 22", exact: true, level: 1 }),
  ).toBeVisible();
  await page.getByRole("link", { name: "ES", exact: true }).click();
  await expect(page).toHaveURL(/\/es\/projects\/table22$/);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  expect(errors).toEqual([]);
});
test("unknown routes return 404 and images are nonempty", async ({ page }) => {
  for (const route of ["/de", "/fr/missing", "/fr/projects/missing"])
    expect((await page.goto(route))?.status()).toBe(404);
  await page.goto("/en");
  await page.locator(".footer").scrollIntoViewIfNeeded();
  await page.locator(".hero").scrollIntoViewIfNeeded();
  await expect
    .poll(async () =>
      page
        .locator("img")
        .evaluateAll(
          (images) =>
            images.filter(
              (img) =>
                (img as HTMLImageElement).complete &&
                !(img as HTMLImageElement).naturalWidth,
            ).length,
        ),
    )
    .toBe(0);
});
