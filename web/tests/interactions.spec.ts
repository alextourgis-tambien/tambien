import { test, expect } from "@playwright/test";
test("menu matches the compact black dropdown and hover emphasis", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1512, height: 1000 });
  await page.goto("/en");
  const trigger = page.getByRole("button", { name: "Open menu", exact: true });
  expect((await trigger.boundingBox())?.width).toBeCloseTo(37, 0);
  await trigger.click();
  await expect(page.locator(".menu-panel")).toHaveCSS(
    "background-color",
    "rgb(0, 0, 0)",
  );
  await expect(page.locator(".menu-panel nav > *")).toHaveCount(6);
  await expect(page.locator(".menu-panel nav")).not.toContainText("Services");
  const studio = page
    .locator(".menu-panel nav a")
    .filter({ hasText: "Studio" });
  await studio.hover();
  await expect(studio).toHaveCSS("opacity", "1");
  await expect(page.locator(".menu-panel nav a").first()).toHaveCSS(
    "opacity",
    "0.5",
  );
  await expect(page.locator(".menu-languages > small")).toHaveText("07");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});
test("Work has sixteen equal portrait frames and the original first row", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1512, height: 1000 });
  await page.goto("/fr/work");
  const cards = page.locator(".work-cover");
  await expect(cards).toHaveCount(16);
  const boxes = await cards.evaluateAll((nodes) =>
    nodes.map((node) => {
      const box = node.getBoundingClientRect();
      return { w: box.width, h: box.height };
    }),
  );
  for (const box of boxes) {
    expect(box.w / box.h).toBeCloseTo(348 / 422, 3);
    expect(box.w).toBeCloseTo(boxes[0].w, 1);
  }
  await expect(page.locator(".work-grid h2").nth(1)).toHaveText("Green Got");
  await expect(page.locator(".work-grid h2").nth(3)).toHaveText(
    "Carrés Solidaires",
  );
  await page.screenshot({
    path: "/Users/alextourgis/.codex/visualizations/2026/10/08/01a11b3e-8c5c-7e13-a1d0-ef8c1a6e125d/tambien-work-corrected.png",
  });
});
test("process descriptions start hidden, open on click, and pointer image follows", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1512, height: 1000 });
  await page.goto("/fr");
  await expect(
    page.locator('.process-summary[aria-expanded="true"]'),
  ).toHaveCount(0);
  const strategy = page.locator(".process-summary").nth(1);
  await strategy.scrollIntoViewIfNeeded();
  await strategy.click();
  await expect(strategy).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#step-strategy")).toHaveCSS("opacity", "1");
  const box = (await strategy.boundingBox())!;
  await page.mouse.move(box.x + 200, box.y + 10);
  await expect(page.locator(".process-follow")).toHaveAttribute(
    "data-visible",
    "true",
  );
  await expect
    .poll(() =>
      page
        .locator(".process-follow")
        .evaluate((node) => getComputedStyle(node).transform),
    )
    .not.toBe("matrix(1, 0, 0, 1, 0, 0)");
  const firstImage = await page
    .locator(".process-follow img")
    .getAttribute("src");
  await page.locator(".process-summary").nth(2).hover();
  await expect
    .poll(() => page.locator(".process-follow img").getAttribute("src"))
    .not.toBe(firstImage);
  await strategy.click();
  await expect(strategy).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#step-strategy")).toHaveCSS("opacity", "0");
});
test("contact card follows on desktop and is centered below the mobile action", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1512, height: 1000 });
  await page.goto("/fr");
  await page.locator(".contact-cta").scrollIntoViewIfNeeded();
  const area = (await page.locator(".contact-cta").boundingBox())!;
  await page.mouse.move(area.x + 100, area.y + 100);
  await expect
    .poll(() =>
      page
        .locator(".founder")
        .evaluate((node) => getComputedStyle(node).transform),
    )
    .not.toBe("matrix(1, 0, 0, 1, 0, 0)");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".contact-cta").scrollIntoViewIfNeeded();
  const card = (await page.locator(".founder").boundingBox())!;
  const call = (await page.locator(".cta-actions > a").first().boundingBox())!;
  expect(card.y).toBeGreaterThan(call.y + call.height);
  expect(card.x + card.width / 2).toBeCloseTo(195, 0);
});
test("Studio video loads, loops its preview, and starts full playback on click", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1512, height: 1000 });
  await page.goto("/fr/studio");
  const video = page.locator(".studio-video video");
  await expect
    .poll(
      () => video.evaluate((node) => (node as HTMLVideoElement).readyState),
      { timeout: 30000 },
    )
    .toBeGreaterThanOrEqual(2);
  await expect
    .poll(() => video.evaluate((node) => (node as HTMLVideoElement).paused))
    .toBe(false);
  await video.evaluate((node) => {
    (node as HTMLVideoElement).currentTime = 9.7;
  });
  await expect
    .poll(
      () => video.evaluate((node) => (node as HTMLVideoElement).currentTime),
      { timeout: 5000 },
    )
    .toBeLessThan(3);
  await page.locator(".video-start").click();
  await expect
    .poll(() =>
      video.evaluate(
        (node) =>
          (node as HTMLVideoElement).controls &&
          !(node as HTMLVideoElement).muted,
      ),
    )
    .toBe(true);
  await page.locator(".studio-lists").scrollIntoViewIfNeeded();
  await expect(page.locator(".studio-lists > div")).toHaveCount(3);
  await expect(
    page.locator(".studio-lists > div").nth(2).locator("a"),
  ).toHaveCount(7);
});
