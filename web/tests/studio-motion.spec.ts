import { test, expect } from "@playwright/test";
test("video cursor stays inside its frame, parallax moves the block, and keyboard starts playback", async ({
  page,
}) => {
  await page.goto("/en/studio");
  const button = page.locator(".video-start");
  const cue = page.locator(".video-play-cue");
  await expect(cue).toHaveCSS("opacity", "0");
  await button.hover({ position: { x: 70, y: 80 } });
  await expect(cue).toHaveCSS("opacity", "1");
  const first = await cue.boundingBox();
  await button.hover({ position: { x: 150, y: 200 } });
  await expect
    .poll(async () => (await cue.boundingBox())!.x)
    .toBeGreaterThan(first!.x + 50);
  await page.mouse.move(0, 0);
  await expect(cue).toHaveCSS("opacity", "0");
  const before = await page
    .locator(".studio-video")
    .evaluate(
      (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42,
    );
  await page.mouse.wheel(0, 250);
  await expect
    .poll(() =>
      page
        .locator(".studio-video")
        .evaluate(
          (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42,
        ),
    )
    .toBeLessThan(before - 5);
  await button.focus();
  await expect(cue).toHaveCSS("opacity", "1");
  await page.keyboard.press("Enter");
  await expect(button).toHaveCount(0);
  await expect
    .poll(() =>
      page
        .locator(".studio-video video")
        .evaluate(
          (el) =>
            (el as HTMLVideoElement).controls &&
            !(el as HTMLVideoElement).muted,
        ),
    )
    .toBe(true);
});
test("touch and reduced motion keep a visible play button", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/fr/studio");
  await expect(page.locator(".video-play-cue")).toBeVisible();
  await expect(page.locator(".video-play-cue")).toHaveCSS("opacity", "1");
  await page.locator(".video-start").tap();
  await expect(page.locator(".video-start")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.locator(".studio-video")).toHaveCSS("transform", "none");
  await expect(page.locator(".video-play-cue")).toHaveCSS("opacity", "1");
  await context.close();
});
