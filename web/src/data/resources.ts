import { localized as l } from "@/lib/i18n";
import type { Page, Resource } from "@/lib/types";
import { homeAssets } from "./seed";

export const resources: Resource[] = [
  {
    _key: "course",
    name: "Course",
    title: l(
      "Build better Webflow websites. Grow your creative business.",
      "Créez de meilleurs sites Webflow. Faites grandir votre activité.",
      "Crea mejores webs con Webflow. Haz crecer tu negocio.",
    ),
    category: l("Course", "Formation", "Curso"),
    url: "https://www.youtube.com/@alextourgis/courses",
    media: {
      src: homeAssets.imgRectangle2,
      width: 293,
      height: 164,
      alt: l(
        "Alex Tourgis presenting a Webflow course",
        "Alex Tourgis présente une formation Webflow",
        "Alex Tourgis presenta un curso de Webflow",
      ),
    },
  },
  {
    _key: "fluent",
    name: "Fluent",
    title: l(
      "Turn your design values into fluid, responsive CSS.",
      "Transformez vos valeurs de maquette en CSS responsive fluide.",
      "Convierte los valores de tu diseño en CSS responsive fluido.",
    ),
    category: l("Tool", "Outil", "Herramienta"),
    url: "/tools/fluent",
  },
  {
    _key: "style-guide",
    name: "Style Guide",
    title: l(
      "A clear foundation for your next Webflow project.",
      "Une base claire pour votre prochain projet Webflow.",
      "Una base clara para tu próximo proyecto en Webflow.",
    ),
    category: l("Template", "Template", "Plantilla"),
    url: "https://webflow.com/made-in-webflow/website/style-guide-2025-tambien",
  },
];

export const resourcesPage: Page = {
  _id: "resources",
  slug: "resources",
  title: l(
    "Learn, build, and go further.",
    "Apprenez, créez et allez plus loin.",
    "Aprende, crea y llega más lejos.",
  ),
  description: l(
    "Courses, tools, and a solid starting point for your next website.",
    "Des formations, des outils et une base solide pour votre prochain site.",
    "Cursos, herramientas y una base sólida para tu próxima web.",
  ),
  resources,
};

export const fluentPage: Page = {
  _id: "fluent",
  slug: "tools/fluent",
  title: l(
    "Your design. Fluid on every screen.",
    "Votre design. Fluide sur tous les écrans.",
    "Tu diseño. Fluido en todas las pantallas.",
  ),
  description: l(
    "Enter your design values. Fluent generates the responsive CSS, ready to copy into Webflow or your website.",
    "Renseignez les valeurs de votre maquette. Fluent génère le CSS responsive, prêt à copier dans Webflow ou sur votre site.",
    "Introduce los valores de tu diseño. Fluent genera el CSS responsive, listo para copiar en Webflow o en tu web.",
  ),
};
