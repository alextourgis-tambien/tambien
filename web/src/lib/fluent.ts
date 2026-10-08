export type FluidRange = {
  minWidth: number;
  maxWidth: number;
  minFont: number;
  maxFont: number;
  rem: number;
  enabled: boolean;
};
export type FluentConfig = {
  desktop: FluidRange;
  tablet: FluidRange;
  mobile: FluidRange;
  large: { enabled: boolean; width: number; font: number };
};
export const defaultFluentConfig: FluentConfig = {
  desktop: {
    minWidth: 992,
    maxWidth: 1440,
    minFont: 80,
    maxFont: 120,
    rem: 16,
    enabled: true,
  },
  tablet: {
    minWidth: 768,
    maxWidth: 991,
    minFont: 60,
    maxFont: 80,
    rem: 16,
    enabled: true,
  },
  mobile: {
    minWidth: 240,
    maxWidth: 479,
    minFont: 20,
    maxFont: 40,
    rem: 16,
    enabled: true,
  },
  large: { enabled: false, width: 1920, font: 150 },
};
export const rounded = (value: number) => Number(value.toFixed(6));
export function rootMinimum(range: FluidRange) {
  return (range.minFont / range.maxFont) * range.rem;
}
export function validateFluent(
  config: FluentConfig,
): "positive" | "range" | "overlap" | null {
  const ranges = [config.mobile, config.tablet, config.desktop].filter(
    (r) => r.enabled,
  );
  if (
    ranges.some((r) =>
      [r.minWidth, r.maxWidth, r.minFont, r.maxFont, r.rem].some(
        (n) => !Number.isFinite(n) || n <= 0,
      ),
    )
  )
    return "positive";
  if (ranges.some((r) => r.maxWidth <= r.minWidth || r.maxFont < r.minFont))
    return "range";
  if (ranges.some((r, i) => i > 0 && r.minWidth <= ranges[i - 1].maxWidth))
    return "overlap";
  if (config.large.enabled) {
    if (
      ![config.large.width, config.large.font].every(
        (n) => Number.isFinite(n) && n > 0,
      )
    )
      return "positive";
    if (
      config.large.width <= config.desktop.maxWidth ||
      config.large.font < config.desktop.maxFont
    )
      return "range";
  }
  return null;
}
export function fluidValue(
  minWidth: number,
  maxWidth: number,
  min: number,
  max: number,
) {
  const slope = (max - min) / (maxWidth - minWidth);
  const intercept = min - slope * minWidth;
  return `clamp(${rounded(min)}px, calc(${rounded(intercept)}px + ${rounded(slope * 100)}vw), ${rounded(max)}px)`;
}
export function generateFluentCSS(config: FluentConfig) {
  if (validateFluent(config)) return "";
  const ranges = [config.mobile, config.tablet, config.desktop].filter(
    (r) => r.enabled,
  );
  const lines = [
    "<style>",
    `  html { font-size: ${rounded(rootMinimum(ranges[0]))}px; }`,
  ];
  for (const range of ranges) {
    lines.push(
      `\n  @media (min-width: ${range.minWidth}px) {`,
      `    html { font-size: ${fluidValue(range.minWidth, range.maxWidth, rootMinimum(range), range.rem)}; }`,
      "  }",
    );
  }
  const desktop = config.desktop;
  let container = desktop.maxWidth / desktop.rem;
  if (config.large.enabled) {
    const maxRem = (config.large.font / desktop.maxFont) * desktop.rem;
    lines.push(
      `\n  @media (min-width: ${desktop.maxWidth}px) {`,
      `    html { font-size: ${fluidValue(desktop.maxWidth, config.large.width, desktop.rem, maxRem)}; }`,
      "  }",
    );
    container = config.large.width / maxRem;
  }
  lines.push(
    `\n  .container { width: 100%; max-width: ${rounded(container)}rem; margin-inline: auto; }`,
    "</style>",
  );
  return lines.join("\n");
}
