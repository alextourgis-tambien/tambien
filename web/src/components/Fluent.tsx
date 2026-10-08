"use client";
import { useState } from "react";
import {
  defaultFluentConfig,
  generateFluentCSS,
  rootMinimum,
  validateFluent,
  type FluidRange,
} from "@/lib/fluent";
import type { Language } from "@/lib/i18n";
const copy = {
  fr: {
    desktop: "Desktop",
    tablet: "Tablette",
    mobile: "Mobile",
    min: "Valeurs minimum",
    max: "Valeurs de la maquette",
    width: "Largeur",
    font: "Taille du texte",
    root: "1 rem à cette largeur",
    enabled: "Utiliser ce breakpoint",
    large: "Étendre aux grands écrans",
    largeWidth: "Largeur maximum",
    largeFont: "Taille du texte maximum",
    code: "Votre CSS responsive",
    instructions:
      "Collez ce code dans un Embed ou dans le code personnalisé du <head>. Utilisez ensuite les rem pour vos tailles et espacements, et la classe container pour votre conteneur.",
    help: "Choisissez un texte de référence dans votre maquette, puis sa taille à la largeur minimum. Fluent conserve ses proportions en faisant varier la taille de 1 rem.",
    copy: "Copier le CSS",
    copied: "Copié",
    reset: "Réinitialiser",
    copyError: "La copie a échoué. Sélectionnez le code pour le copier.",
    positive: "Renseignez une valeur positive dans chaque champ actif.",
    range:
      "La largeur maximum doit dépasser le minimum. La taille du texte maximum doit être au moins égale au minimum.",
    overlap:
      "Les plages mobile, tablette et desktop ne doivent pas se chevaucher.",
  },
  en: {
    desktop: "Desktop",
    tablet: "Tablet",
    mobile: "Mobile",
    min: "Minimum values",
    max: "Design values",
    width: "Width",
    font: "Text size",
    root: "1 rem at this width",
    enabled: "Use this breakpoint",
    large: "Extend to larger screens",
    largeWidth: "Maximum width",
    largeFont: "Maximum text size",
    code: "Your responsive CSS",
    instructions:
      "Paste this code into an Embed or the custom <head> code. Use rem for sizes and spacing, and the container class for your content wrapper.",
    help: "Choose a reference text in your design, then its size at the minimum width. Fluent preserves its proportions by adjusting the size of 1 rem.",
    copy: "Copy CSS",
    copied: "Copied",
    reset: "Reset",
    copyError: "Copy failed. Select the code to copy it manually.",
    positive: "Enter a positive value in every active field.",
    range:
      "Maximum width must exceed minimum width. Maximum text size must be at least the minimum.",
    overlap: "Mobile, tablet, and desktop ranges must not overlap.",
  },
  es: {
    desktop: "Desktop",
    tablet: "Tablet",
    mobile: "Móvil",
    min: "Valores mínimos",
    max: "Valores del diseño",
    width: "Ancho",
    font: "Tamaño del texto",
    root: "1 rem a este ancho",
    enabled: "Usar este breakpoint",
    large: "Ampliar a pantallas grandes",
    largeWidth: "Ancho máximo",
    largeFont: "Tamaño máximo del texto",
    code: "Tu CSS responsive",
    instructions:
      "Pega este código en un Embed o en el código personalizado del <head>. Usa rem para tamaños y espacios, y la clase container para tu contenedor.",
    help: "Elige un texto de referencia en tu diseño y su tamaño al ancho mínimo. Fluent conserva sus proporciones ajustando el tamaño de 1 rem.",
    copy: "Copiar CSS",
    copied: "Copiado",
    reset: "Restablecer",
    copyError:
      "No se pudo copiar. Selecciona el código para copiarlo manualmente.",
    positive: "Introduce un valor positivo en cada campo activo.",
    range:
      "El ancho máximo debe superar el mínimo. El tamaño máximo del texto debe ser al menos igual al mínimo.",
    overlap: "Los rangos de móvil, tablet y desktop no deben solaparse.",
  },
};
type RangeKey = "desktop" | "tablet" | "mobile";
export function Fluent({ lang }: { lang: Language }) {
  const t = copy[lang];
  const [config, setConfig] = useState(defaultFluentConfig);
  const [status, setStatus] = useState("");
  const error = validateFluent(config);
  const css = generateFluentCSS(config);
  const update = (
    key: RangeKey,
    field: keyof FluidRange,
    value: number | boolean,
  ) => {
    setConfig((old) => ({ ...old, [key]: { ...old[key], [field]: value } }));
    setStatus("");
  };
  const input = (
    key: RangeKey,
    field: "minWidth" | "maxWidth" | "minFont" | "maxFont" | "rem",
    label: string,
  ) => (
    <label className="fluent-field" htmlFor={`${key}-${field}`}>
      <span>{label}</span>
      <div>
        <input
          id={`${key}-${field}`}
          type="number"
          min="0.01"
          step="any"
          inputMode="decimal"
          value={Number.isNaN(config[key][field]) ? "" : config[key][field]}
          onChange={(event) =>
            update(key, field, event.currentTarget.valueAsNumber)
          }
        />
        <span aria-hidden="true">px</span>
      </div>
    </label>
  );
  return (
    <div className="fluent-tool">
      <p className="fluent-help">{t.help}</p>
      <div className="fluent-ranges">
        {(["desktop", "tablet", "mobile"] as RangeKey[]).map((key) => (
          <section className="fluent-range" key={key}>
            <div className="fluent-range-heading">
              <h2>{t[key]}</h2>
              {key !== "desktop" ? (
                <label className="fluent-toggle">
                  <input
                    type="checkbox"
                    checked={config[key].enabled}
                    onChange={(e) => update(key, "enabled", e.target.checked)}
                  />
                  {t.enabled}
                </label>
              ) : null}
            </div>
            <fieldset disabled={!config[key].enabled}>
              <legend className="sr-only">{t[key]}</legend>
              <h3>{t.max}</h3>
              {input(key, "maxWidth", t.width)}
              {input(key, "maxFont", t.font)}
              {key !== "desktop" ? (
                input(key, "rem", t.root)
              ) : (
                <p className="fluent-rem">
                  {t.root} <strong>16 px</strong>
                </p>
              )}
              <h3>{t.min}</h3>
              {input(key, "minWidth", t.width)}
              {input(key, "minFont", t.font)}
              <p className="fluent-rem">
                {t.root}{" "}
                <strong>
                  {Number.isFinite(rootMinimum(config[key]))
                    ? Number(rootMinimum(config[key]).toFixed(2))
                    : "—"}{" "}
                  px
                </strong>
              </p>
            </fieldset>
          </section>
        ))}
      </div>
      <section className="fluent-large">
        <label className="fluent-toggle">
          <input
            type="checkbox"
            checked={config.large.enabled}
            onChange={(e) => {
              setConfig((old) => ({
                ...old,
                large: { ...old.large, enabled: e.target.checked },
              }));
              setStatus("");
            }}
          />
          {t.large}
        </label>
        {config.large.enabled ? (
          <div className="fluent-large-fields">
            {(["width", "font"] as const).map((field) => (
              <label className="fluent-field" key={field}>
                {field === "width" ? t.largeWidth : t.largeFont}
                <div>
                  <input
                    type="number"
                    min="0.01"
                    step="any"
                    inputMode="decimal"
                    value={
                      Number.isNaN(config.large[field])
                        ? ""
                        : config.large[field]
                    }
                    onChange={(e) => {
                      const value = e.currentTarget.valueAsNumber;
                      setConfig((old) => ({
                        ...old,
                        large: { ...old.large, [field]: value },
                      }));
                      setStatus("");
                    }}
                  />
                  <span aria-hidden="true">px</span>
                </div>
              </label>
            ))}
          </div>
        ) : null}
      </section>
      <section className="fluent-output" aria-labelledby="fluent-code-title">
        <div className="fluent-output-heading">
          <h2 id="fluent-code-title">{t.code}</h2>
          <div className="fluent-output-actions">
            <button
              className="pill"
              onClick={() => {
                setConfig(defaultFluentConfig);
                setStatus("");
              }}
            >
              {t.reset}
            </button>
            <button
              className="pill dark"
              disabled={!!error}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(css);
                  setStatus(t.copied);
                } catch {
                  setStatus(t.copyError);
                }
              }}
            >
              {t.copy}
            </button>
          </div>
        </div>
        <p>{t.instructions}</p>
        {error ? (
          <p className="fluent-error" role="alert">
            {t[error]}
          </p>
        ) : (
          <pre tabIndex={0}>
            <code>{css}</code>
          </pre>
        )}
        <p className="fluent-status" role="status">
          {status}
        </p>
      </section>
    </div>
  );
}
