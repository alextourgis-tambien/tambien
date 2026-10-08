import { test, expect } from "@playwright/test";
test("navigation fades through white, including sibling pages and project routes", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    const observed = window as typeof window & { fades: string[][] };
    observed.fades = [];
    if (!document.startViewTransition) return;
    const original = document.startViewTransition.bind(document);
    document.startViewTransition = ((...args: Parameters<typeof original>) => {
      const transition = original(...args);
      transition.ready.then(
        () =>
          observed.fades.push(
            document
              .getAnimations()
              .filter((a) => a instanceof CSSAnimation)
              .map((a) => (a as CSSAnimation).animationName),
          ),
        () => {},
      );
      return transition;
    }) as typeof document.startViewTransition;
  });
  await page.goto("/fr/work");
  await page.locator(".header-nav a").filter({ hasText: "Services" }).click();
  await expect(page).toHaveURL(/\/fr\/studio#services$/);
  await expect(page.locator(".studio-lists")).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(() =>
        (window as typeof window & { fades: string[][] }).fades.flat(),
      ),
    )
    .toEqual(expect.arrayContaining(["page-out", "page-in"]));
  await page.locator(".header-nav a").filter({ hasText: "Projets" }).click();
  await expect(page).toHaveURL(/\/fr\/work$/);
  await page.locator(".work-grid a").first().click();
  await expect(page).toHaveURL(/\/fr\/projects\/table22$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/fr\/work$/);
  await expect(page.locator(".initial-loader")).not.toBeVisible();
  expect(errors).toEqual([]);
});
test("scroll stays native and same-page anchors are smooth", async ({
  page,
}) => {
  await page.goto("/fr/studio");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "smooth");
  await page.mouse.wheel(0, 500);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(300);
  await page.locator(".header-nav a").filter({ hasText: "Services" }).click();
  await expect
    .poll(
      () =>
        page
          .locator(".studio-lists")
          .evaluate((node) => Math.abs(node.getBoundingClientRect().top)),
      { timeout: 5000 },
    )
    .toBeLessThan(50);
});
test("reduced motion and disabled JavaScript keep the site usable", async ({
  browser,
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fr/work");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await expect(page.locator(".initial-loader")).not.toBeVisible();
  await page.locator(".header-nav a").filter({ hasText: "Services" }).click();
  await expect(page).toHaveURL(/\/fr\/studio#services$/);
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto("http://127.0.0.1:3000/fr/work");
  await expect(staticPage.locator(".initial-loader")).not.toBeVisible();
  await expect(staticPage.locator("h1")).toBeVisible();
  await context.close();
});
test("a slow navigation shows its loader and releases it when the destination is ready", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1512, height: 1000 });
  await page.goto("/fr/work");
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/fr/event*", async (route) => {
    await gate;
    await route.continue();
  });
  await page
    .getByRole("button", { name: "Ouvrir le menu", exact: true })
    .click();
  await page.locator(".menu-panel a").filter({ hasText: "Événement" }).click();
  await expect(page.locator(".navigation-loader")).toBeVisible();
  await page.screenshot({
    path: "/Users/alextourgis/.codex/visualizations/2026/10/08/01a11b3e-8c5c-7e13-a1d0-ef8c1a6e125d/tambien-loader.png",
  });
  release();
  await expect(page).toHaveURL(/\/fr\/event$/);
  await expect(page.locator(".navigation-loader")).toHaveCount(0);
  await expect(page.locator("h1")).toBeVisible();
});
