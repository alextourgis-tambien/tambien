import { test, expect } from "@playwright/test";
import {
  defaultFluentConfig,
  generateFluentCSS,
  validateFluent,
} from "../src/lib/fluent";

test("CSS preserves design proportions at each breakpoint and caps desktop", async ({
  page,
}) => {
  await page.setContent(generateFluentCSS(defaultFluentConfig));
  for (const [width, expected] of [
    [240, 8],
    [479, 16],
    [768, 12],
    [991, 16],
    [992, (80 / 120) * 16],
    [1216, 40 / 3],
    [1440, 16],
    [2200, 16],
  ]) {
    await page.setViewportSize({ width, height: 600 });
    expect(
      await page.evaluate(() =>
        parseFloat(getComputedStyle(document.documentElement).fontSize),
      ),
    ).toBeCloseTo(expected, 3);
  }
});

test("large screens scale to the requested text size and container", async ({
  page,
}) => {
  const config = {
    ...defaultFluentConfig,
    large: { enabled: true, width: 1920, font: 150 },
  };
  await page.setContent(
    generateFluentCSS(config) + '<div class="container"></div>',
  );
  await page.setViewportSize({ width: 1920, height: 600 });
  expect(
    await page.evaluate(() =>
      parseFloat(getComputedStyle(document.documentElement).fontSize),
    ),
  ).toBe(20);
  expect(
    await page
      .locator(".container")
      .evaluate((e) => getComputedStyle(e).maxWidth),
  ).toBe("1920px");
  await page.setViewportSize({ width: 2560, height: 600 });
  expect(
    await page.evaluate(() =>
      parseFloat(getComputedStyle(document.documentElement).fontSize),
    ),
  ).toBe(20);
});

test("disabled ranges ignore their invalid values", () => {
  const config = {
    ...defaultFluentConfig,
    tablet: { ...defaultFluentConfig.tablet, enabled: false, maxWidth: NaN },
    mobile: { ...defaultFluentConfig.mobile, enabled: false, minFont: 0 },
  };
  expect(validateFluent(config)).toBeNull();
  expect(generateFluentCSS(config)).not.toContain("NaN");
  expect(generateFluentCSS(config)).not.toContain("768px");
});

test("invalid ranges and overlapping breakpoints cannot generate CSS", () => {
  for (const config of [
    {
      ...defaultFluentConfig,
      desktop: { ...defaultFluentConfig.desktop, maxFont: 0 },
    },
    {
      ...defaultFluentConfig,
      desktop: { ...defaultFluentConfig.desktop, maxWidth: 992 },
    },
    {
      ...defaultFluentConfig,
      tablet: { ...defaultFluentConfig.tablet, maxWidth: 1000 },
    },
    {
      ...defaultFluentConfig,
      large: { enabled: true, width: 1400, font: 150 },
    },
  ]) {
    expect(validateFluent(config)).not.toBeNull();
    expect(generateFluentCSS(config)).toBe("");
  }
});
