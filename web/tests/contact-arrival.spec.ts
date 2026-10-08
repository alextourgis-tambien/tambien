import { test, expect } from "@playwright/test";
test("contact card starts following a stationary mouse when scrolling into its section", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1512, height: 1000 });
  await page.goto("/en/studio");
  await page.waitForTimeout(500);
  await page.mouse.move(350, 400);
  await page.evaluate(() => {
    const section = document.querySelector(".contact-cta")!;
    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY - 500,
      behavior: "instant",
    });
  });
  const card = page.locator(".founder");
  await expect
    .poll(async () => Math.abs((await card.boundingBox())!.x - 374))
    .toBeLessThan(1);
  const before = await card.evaluate(
    (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42,
  );
  await page.mouse.wheel(0, 120);
  await expect
    .poll(() =>
      card.evaluate(
        (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42,
      ),
    )
    .toBeGreaterThan(before + 30);
  await card.focus();
  const focused = await card.evaluate((el) => getComputedStyle(el).transform);
  await page.mouse.wheel(0, 40);
  await expect(card).toHaveCSS("transform", focused);
});
