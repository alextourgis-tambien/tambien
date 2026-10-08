import {
  defineType,
  defineField as field,
  defineArrayMember as member,
} from "sanity";
import { DocumentIcon } from "@sanity/icons/Document";
import { ImageIcon } from "@sanity/icons/Image";
import { CogIcon } from "@sanity/icons/Cog";
const languages = [
  { name: "fr", title: "Français" },
  { name: "en", title: "English" },
  { name: "es", title: "Español" },
];
const localized = defineType({
  name: "localized",
  title: "Texte traduit",
  type: "object",
  icon: DocumentIcon,
  fields: languages.map((lang) => field({ ...lang, type: "text", rows: 3 })),
});
const media = defineType({
  name: "media",
  title: "Image",
  type: "object",
  icon: ImageIcon,
  fields: [
    field({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    field({
      name: "alt",
      title: "Description pour l’accessibilité",
      type: "localized",
      description: "Décrivez ce que montre l’image, dans chaque langue.",
    }),
    field({ name: "frameWidth", title: "Largeur du cadre", type: "number" }),
    field({ name: "frameHeight", title: "Hauteur du cadre", type: "number" }),
    field({ name: "background", title: "Couleur du fond", type: "string" }),
    field({ name: "crop", title: "Position dans le cadre", type: "string" }),
    field({
      name: "embedSearch",
      title: "Afficher le cartouche de recherche Exploro",
      type: "boolean",
    }),
    field({
      name: "overlay",
      title: "Logo centré",
      type: "object",
      fields: [
        field({ name: "image", title: "Logo", type: "image" }),
        field({ name: "width", title: "Largeur", type: "number" }),
        field({ name: "height", title: "Hauteur", type: "number" }),
      ],
    }),
  ],
});
const richText = defineType({
  name: "richText",
  title: "Texte enrichi traduit",
  type: "object",
  icon: DocumentIcon,
  fields: languages.map((lang) =>
    field({
      ...lang,
      type: "array",
      of: [
        member({
          type: "block",
          styles: [
            { title: "Paragraphe", value: "normal" },
            { title: "Titre de section", value: "h2" },
            { title: "Sous-titre", value: "h3" },
          ],
        }),
      ],
    }),
  ),
});
const seo = defineType({
  name: "seo",
  title: "Référencement",
  type: "object",
  icon: DocumentIcon,
  fields: [
    field({
      name: "title",
      title: "Titre dans les moteurs de recherche",
      type: "localized",
    }),
    field({ name: "description", title: "Description", type: "localized" }),
    field({
      name: "ogTitle",
      title: "Titre pour le partage",
      type: "localized",
    }),
    field({
      name: "ogDescription",
      title: "Description pour le partage",
      type: "localized",
    }),
    field({ name: "ogImage", title: "Image de partage", type: "image" }),
    field({
      name: "canonical",
      title: "URL canonique",
      type: "url",
      description: "Laisser vide pour utiliser l’adresse de cette page.",
    }),
    field({
      name: "noIndex",
      title: "Masquer des moteurs de recherche",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
const contentBlock = defineType({
  name: "contentBlock",
  title: "Bloc éditorial",
  type: "object",
  icon: DocumentIcon,
  fields: [
    field({
      name: "kind",
      title: "Type de contenu",
      type: "string",
      initialValue: "text",
      options: {
        list: [
          { title: "Texte", value: "text" },
          { title: "Image pleine largeur", value: "image" },
          { title: "Deux images", value: "imagePair" },
          { title: "Image et texte", value: "imageText" },
          { title: "Vidéo", value: "video" },
          { title: "Galerie", value: "gallery" },
          { title: "Citation", value: "quote" },
          { title: "Grand texte", value: "statement" },
          { title: "Espacement", value: "spacer" },
          { title: "Crédits", value: "credits" },
        ],
      },
    }),
    field({ name: "title", title: "Titre", type: "localized" }),
    field({ name: "text", title: "Texte", type: "richText" }),
    field({ name: "image", title: "Image", type: "media" }),
    field({
      name: "images",
      title: "Images",
      type: "array",
      of: [member({ type: "media" })],
    }),
    field({
      name: "url",
      title: "URL vidéo YouTube ou Vimeo",
      type: "url",
      description:
        "Utiliser un service de streaming ; ne pas téléverser le fichier vidéo ici.",
    }),
    field({ name: "quote", title: "Citation", type: "localized" }),
    field({
      name: "attribution",
      title: "Auteur de la citation",
      type: "string",
    }),
    field({ name: "caption", title: "Légende", type: "localized" }),
    field({
      name: "height",
      title: "Espacement",
      type: "number",
      initialValue: 64,
      validation: (r) => r.min(0).max(240),
    }),
    field({
      name: "credits",
      title: "Crédits",
      type: "array",
      of: [
        member({
          type: "object",
          fields: [
            field({ name: "name", title: "Nom", type: "string" }),
            field({ name: "role", title: "Rôle", type: "localized" }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title.fr", subtitle: "kind" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Bloc éditorial",
      subtitle,
    }),
  },
});
const groups = [
  { name: "content", title: "Contenu", default: true },
  { name: "seo", title: "SEO" },
];
const shared = [
  field({ name: "title", title: "Titre", type: "localized", group: "content" }),
  field({
    name: "description",
    title: "Description",
    type: "localized",
    group: "content",
  }),
  field({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
];
const blocks = field({
  name: "blocks",
  title: "Composition du contenu",
  type: "array",
  group: "content",
  of: [member({ type: "contentBlock" })],
});
const order = field({
  name: "order",
  title: "Ordre d’affichage",
  type: "number",
  initialValue: 0,
});
const project = defineType({
  name: "project",
  title: "Projet",
  type: "document",
  icon: DocumentIcon,
  groups,
  fields: [
    field({
      name: "name",
      title: "Nom du projet",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    field({
      name: "slug",
      title: "Adresse de la page",
      type: "slug",
      group: "content",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    ...shared,
    field({
      name: "client",
      title: "Client",
      type: "string",
      group: "content",
    }),
    field({ name: "year", title: "Année", type: "number", group: "content" }),
    field({
      name: "services",
      title: "Services",
      type: "array",
      group: "content",
      of: [member({ type: "reference", to: [{ type: "service" }] })],
    }),
    field({
      name: "workCover",
      title: "Visuel de la grille Work",
      type: "media",
      group: "content",
      description:
        "Format portrait 348 × 422. Distinct du visuel utilisé sur l’accueil.",
    }),
    field({
      name: "workPosition",
      title: "Position dans la grille Work",
      type: "number",
      group: "content",
      validation: (r) => r.integer().min(1).max(16),
      description:
        "1 à 16, de gauche à droite. Permet de remplacer une carte provisoire.",
    }),
    field({
      name: "cover",
      title: "Image de couverture",
      type: "media",
      group: "content",
      validation: (r) => r.required(),
    }),
    blocks,
    field({
      name: "website",
      title: "Site du client",
      type: "url",
      group: "content",
    }),
    field({
      name: "related",
      title: "Projets associés",
      type: "array",
      group: "content",
      of: [member({ type: "reference", to: [{ type: "project" }] })],
    }),
    field({
      name: "credits",
      title: "Crédits",
      type: "text",
      group: "content",
    }),
    field({
      name: "awards",
      title: "Prix",
      type: "array",
      group: "content",
      of: [member({ type: "string" })],
    }),
    order,
  ],
  preview: { select: { title: "name", media: "cover.image" } },
});
const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  groups,
  fields: [
    field({
      name: "name",
      title: "Nom dans le CMS",
      type: "string",
      group: "content",
    }),
    field({
      name: "slug",
      title: "Adresse",
      type: "slug",
      group: "content",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    ...shared,
    field({
      name: "media",
      title: "Image principale",
      type: "media",
      group: "content",
    }),
    field({
      name: "videoUrl",
      title: "Vidéo YouTube ou Vimeo",
      type: "url",
      group: "content",
    }),
    field({
      name: "status",
      title: "Message de disponibilité",
      type: "localized",
      group: "content",
    }),
    blocks,
  ],
  preview: { select: { title: "name" } },
});
const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: DocumentIcon,
  groups,
  fields: [
    field({ name: "name", title: "Nom", type: "localized", group: "content" }),
    field({ name: "slug", title: "Adresse", type: "slug", group: "content" }),
    ...shared,
    field({ name: "media", title: "Image", type: "media", group: "content" }),
    blocks,
    field({
      name: "related",
      title: "Projets associés",
      type: "array",
      group: "content",
      of: [member({ type: "reference", to: [{ type: "project" }] })],
    }),
    order,
  ],
  preview: { select: { title: "name.fr" } },
});
const feedItem = defineType({
  name: "feedItem",
  title: "Carte du feed",
  type: "document",
  icon: DocumentIcon,
  fields: [
    field({
      name: "kind",
      title: "Catégorie",
      type: "string",
      options: { list: ["project", "youtube", "event", "news"] },
      validation: (r) => r.required(),
    }),
    field({
      name: "project",
      title: "Projet associé",
      type: "reference",
      to: [{ type: "project" }],
      hidden: ({ document }) => document?.kind !== "project",
    }),
    field({ name: "title", title: "Titre", type: "localized" }),
    field({ name: "description", title: "Description", type: "localized" }),
    field({ name: "media", title: "Image", type: "media" }),
    field({ name: "url", title: "Lien externe", type: "url" }),
    order,
  ],
  preview: {
    select: { title: "title.fr", subtitle: "kind", media: "media.image" },
  },
});
const processStep = defineType({
  name: "processStep",
  title: "Étape du processus",
  type: "document",
  icon: DocumentIcon,
  fields: [
    field({ name: "title", title: "Nom", type: "localized" }),
    field({ name: "summary", title: "Résumé", type: "localized" }),
    field({ name: "description", title: "Description", type: "localized" }),
    field({ name: "time", title: "Repère temporel", type: "localized" }),
    field({ name: "media", title: "Image", type: "media" }),
    order,
  ],
  preview: { select: { title: "title.fr" } },
});
const testimonial = defineType({
  name: "testimonial",
  title: "Témoignage",
  type: "document",
  icon: DocumentIcon,
  fields: [
    field({ name: "person", title: "Personne", type: "string" }),
    field({ name: "company", title: "Entreprise", type: "string" }),
    field({ name: "role", title: "Rôle", type: "localized" }),
    field({ name: "quote", title: "Témoignage validé", type: "localized" }),
    field({ name: "media", title: "Portrait", type: "media" }),
    order,
  ],
  preview: { select: { title: "person" } },
});
const offer = defineType({
  name: "offer",
  title: "Offre",
  type: "document",
  icon: DocumentIcon,
  fields: [
    field({ name: "name", title: "Nom", type: "string" }),
    field({ name: "price", title: "Tarif affiché", type: "string" }),
    field({ name: "promise", title: "Promesse", type: "localized" }),
    field({ name: "description", title: "Description", type: "localized" }),
    field({ name: "weeks", title: "Durée en semaines", type: "string" }),
    field({
      name: "includes",
      title: "Prestations incluses",
      type: "array",
      of: [member({ type: "localized" })],
    }),
    field({ name: "media", title: "Image", type: "media" }),
    order,
  ],
  preview: { select: { title: "name" } },
});
const settings = defineType({
  name: "settings",
  title: "Réglages du site",
  type: "document",
  icon: CogIcon,
  fields: [
    field({
      name: "siteName",
      title: "Nom du studio",
      type: "string",
      initialValue: "También",
    }),
    ...["hero", "cta", "ctaSecondary", "processIntro", "processSubline"].map(
      (name, index) =>
        field({
          name,
          title: [
            "Présentation d’accueil",
            "Appel à l’action",
            "Suite de l’appel à l’action",
            "Introduction du processus",
            "Information tarifaire",
          ][index],
          type: "localized",
        }),
    ),
    ...["callUrl", "whatsappUrl", "youtubeUrl", "toolsUrl"].map((name, index) =>
      field({
        name,
        title: ["Réservation Calendly", "WhatsApp", "YouTube", "Tools"][index],
        type: "url",
      }),
    ),
    field({ name: "email", title: "E-mail", type: "string" }),
    field({
      name: "socials",
      title: "Réseaux sociaux",
      type: "array",
      of: [
        member({
          type: "object",
          fields: [
            field({ name: "title", title: "Nom", type: "string" }),
            field({ name: "url", title: "Lien", type: "url" }),
          ],
        }),
      ],
    }),
    field({
      name: "clients",
      title: "Clients",
      type: "array",
      of: [
        member({
          type: "object",
          fields: [
            field({ name: "name", title: "Nom", type: "string" }),
            field({ name: "icon", title: "Logo", type: "image" }),
          ],
        }),
      ],
    }),
    field({
      name: "videos",
      title: "Vidéos recommandées",
      type: "array",
      of: [
        member({
          type: "object",
          fields: [
            field({ name: "title", title: "Titre", type: "localized" }),
            field({ name: "url", title: "Lien", type: "url" }),
          ],
        }),
      ],
    }),
    field({ name: "defaultSeo", title: "SEO par défaut", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Réglages du site" }) },
});
export const schemaTypes = [
  localized,
  media,
  richText,
  seo,
  contentBlock,
  project,
  page,
  service,
  feedItem,
  processStep,
  testimonial,
  offer,
  settings,
];
