import assets from "./assets.json";
import { localized as l } from "@/lib/i18n";
import type { SiteContent, Media, FeedItem, Project } from "@/lib/types";
export const homeAssets = assets.home;
const studio = assets["4115-4812"];
const pricing = assets["4115-4757"];
const event = assets["4115-4904"];
const media = (
  src: string,
  width: number,
  height: number,
  en: string,
  fr = en,
  es = en,
): Media => ({ src, width, height, alt: l(en, fr, es) });
const feed: FeedItem[] = [
  {
    _id: "table22",
    kind: "project",
    projectSlug: "table22",
    order: 0,
    media: media(
      homeAssets.imgRectangle4,
      348,
      422,
      "Table22 website displayed in a restaurant",
      "Site Table22 présenté dans un restaurant",
      "Sitio de Table22 en un restaurante",
    ),
    title: l(
      "Table 22, helping local businesses unlock recurring revenue beyond their physical locations.",
      "Table 22, aider les commerces locaux à générer des revenus récurrents au-delà de leurs établissements.",
      "Table 22, ayudamos a los negocios locales a generar ingresos recurrentes más allá de sus locales.",
    ),
    description: l(
      "We partnered with the fast-growing American startup Table22 to redesign and develop their website. The goal was to create a clearer experience that communicates their value and supports their continued growth.",
      "Nous avons accompagné la startup américaine Table22 dans la refonte et le développement de son site. L’objectif : clarifier son offre et créer une expérience qui soutient sa croissance.",
      "Colaboramos con la startup estadounidense Table22 en el rediseño y desarrollo de su web. El objetivo: comunicar su valor con claridad y apoyar su crecimiento.",
    ),
  },
  {
    _id: "youtube",
    kind: "youtube",
    order: 1,
    media: media(
      homeAssets.imgRectangle2,
      348,
      356,
      "Alex sharing design insights",
      "Alex partage ses connaissances en design",
      "Alex comparte sus conocimientos de diseño",
    ),
    title: l(
      "Sharing practical insights on design, Webflow, AI, and the future of digital experiences.",
      "Partager nos découvertes sur le design, Webflow, l’IA et l’avenir des expériences numériques.",
      "Compartimos ideas prácticas sobre diseño, Webflow, IA y el futuro de las experiencias digitales.",
    ),
    description: l(
      "Through our YouTube channel, we share what we’re learning, building, and experimenting with. From Webflow tutorials to AI workflows and design thinking, every video is created to help ambitious creators and founders move faster.",
      "Sur notre chaîne YouTube, nous partageons ce que nous apprenons, créons et expérimentons. Tutoriels Webflow, workflows IA et réflexion design : chaque vidéo aide les créateurs et entrepreneurs à avancer.",
      "En nuestro canal de YouTube compartimos lo que aprendemos, creamos y experimentamos. Desde tutoriales de Webflow hasta flujos de trabajo con IA, cada vídeo ayuda a creadores y emprendedores a avanzar.",
    ),
  },
  {
    _id: "green-got",
    kind: "project",
    projectSlug: "green-got",
    order: 2,
    media: {
      ...media(
        assets["4115-4616"].imgRectangle2,
        348,
        216,
        "Green-Got brand identity",
        "Identité de Green-Got",
        "Identidad de Green-Got",
      ),
      crop: "center",
    },
    title: l(
      "Green Got, designing the next chapter for one of France’s leading green banking startups.",
      "Green Got, dessiner la prochaine étape d’une des principales startups bancaires vertes en France.",
      "Green Got, diseñamos la siguiente etapa de una de las principales startups de banca verde de Francia.",
    ),
    description: l(
      "Green-Got is helping people align their money with their values. We collaborated on the design of their new website, creating an experience that reflects their mission while supporting their rapid growth and growing community.",
      "Green-Got aide chacun à aligner son argent avec ses valeurs. Nous avons conçu une expérience qui reflète sa mission tout en accompagnant sa croissance et celle de sa communauté.",
      "Green-Got ayuda a las personas a alinear su dinero con sus valores. Diseñamos una experiencia que refleja su misión y acompaña el crecimiento de la empresa y su comunidad.",
    ),
  },
  {
    _id: "mat-crepel",
    kind: "project",
    projectSlug: "mat-crepel",
    order: 3,
    media: media(
      homeAssets.imgRectangle7,
      348,
      540,
      "Mat Crépel mountain website",
      "Site de Mat Crépel dans un paysage de montagne",
      "Web de Mat Crépel en un paisaje de montaña",
    ),
    title: l(
      "Mat Crepel, building a digital home for an adventurer, filmmaker, and former Olympian pushing beyond sport.",
      "Mat Crépel, un univers numérique pour un aventurier, réalisateur et ancien athlète olympique qui dépasse les frontières du sport.",
      "Mat Crépel, un hogar digital para un aventurero, cineasta y exolímpico que va más allá del deporte.",
    ),
    description: l(
      "From snowboarding to environmental documentaries, Mat Crépel’s journey deserved more than a traditional portfolio. We designed and developed an immersive website that captures the depth of his story and the spirit of exploration.",
      "Du snowboard aux documentaires environnementaux, le parcours de Mat Crépel méritait plus qu’un portfolio classique. Nous avons créé un site immersif qui raconte son histoire et son esprit d’exploration.",
      "Del snowboard a los documentales medioambientales, la trayectoria de Mat Crépel merecía más que un portfolio tradicional. Creamos una web inmersiva que refleja su historia y su espíritu de exploración.",
    ),
  },
  {
    _id: "last-prisoner-project",
    kind: "project",
    projectSlug: "last-prisoner-project",
    order: 4,
    media: media(
      homeAssets.imgRectangle5,
      348,
      540,
      "Last Prisoner Project, Silver Cannes Lion",
      "Last Prisoner Project, Lion d’argent à Cannes",
      "Last Prisoner Project, León de Plata en Cannes",
    ),
    title: l(
      "Last Prisoner Project, an award-winning platform supporting justice reform across the United States.",
      "Last Prisoner Project, une plateforme primée qui soutient la réforme de la justice aux États-Unis.",
      "Last Prisoner Project, una plataforma premiada que apoya la reforma de la justicia en Estados Unidos.",
    ),
    description: l(
      "We helped create an interactive experience for Last Prisoner Project, an organization fighting to release individuals incarcerated for cannabis-related offenses. The project received a Silver Cannes Lion for its impact, creativity, and execution.",
      "Nous avons contribué à une expérience interactive pour Last Prisoner Project, qui milite pour la libération des personnes incarcérées pour des infractions liées au cannabis. Le projet a reçu un Lion d’argent à Cannes.",
      "Contribuimos a crear una experiencia interactiva para Last Prisoner Project, una organización que lucha por liberar a personas encarceladas por delitos relacionados con el cannabis. El proyecto recibió un León de Plata en Cannes.",
    ),
  },
  {
    _id: "carres-solidaires",
    kind: "project",
    projectSlug: "carres-solidaires",
    order: 5,
    media: {
      ...media(
        homeAssets.imgRectangle3,
        348,
        356,
        "Carrés Solidaires website on a desktop display",
        "Site Carrés Solidaires sur un écran",
        "Web de Carrés Solidaires en una pantalla",
      ),
      crop: "center",
    },
    title: l(
      "Carrés Solidaires, connecting landlords and associations to create more housing opportunities.",
      "Carrés Solidaires, connecter propriétaires et associations pour ouvrir de nouvelles possibilités de logement.",
      "Carrés Solidaires, conectamos propietarios y asociaciones para crear más oportunidades de vivienda.",
    ),
    description: l(
      "Carrés Solidaires helps associations secure homes for people in vulnerable situations. We designed and developed both the public website and the platform powering the entire ecosystem, from property matching to operational workflows.",
      "Carrés Solidaires aide les associations à trouver des logements pour les personnes vulnérables. Nous avons conçu et développé le site public et la plateforme qui anime cet écosystème, de la mise en relation aux opérations.",
      "Carrés Solidaires ayuda a las asociaciones a encontrar viviendas para personas vulnerables. Diseñamos y desarrollamos la web pública y la plataforma que conecta todo el ecosistema, desde las viviendas hasta los procesos operativos.",
    ),
  },
  {
    _id: "event",
    kind: "event",
    order: 6,
    media: media(
      homeAssets.imgRectangle1,
      348,
      422,
      "Tambien creative community gathering",
      "Rencontre de la communauté créative Tambien",
      "Encuentro de la comunidad creativa de Tambien",
    ),
    title: l(
      "Bringing together Europe’s creative community through conversations and shared experiences.",
      "Rassembler la communauté créative européenne autour de conversations et d’expériences partagées.",
      "Reunimos a la comunidad creativa europea a través de conversaciones y experiencias compartidas.",
    ),
    description: l(
      "We host events focused on Webflow, design, AI, and entrepreneurship. These gatherings create opportunities to learn, exchange ideas, and connect with people shaping the future of digital experiences across Europe.",
      "Nous organisons des événements autour de Webflow, du design, de l’IA et de l’entrepreneuriat. Des occasions d’apprendre, d’échanger et de rencontrer celles et ceux qui façonnent le numérique en Europe.",
      "Organizamos encuentros sobre Webflow, diseño, IA y emprendimiento. Oportunidades para aprender, intercambiar ideas y conectar con quienes dan forma al futuro digital en Europa.",
    ),
  },
  {
    _id: "exploro-tour",
    kind: "project",
    projectSlug: "exploro-tour",
    order: 7,
    media: {
      ...media(
        homeAssets.imgRectangle8,
        348,
        216,
        "Exploro Tour travel platform",
        "Plateforme de voyages Exploro Tour",
        "Plataforma de viajes Exploro Tour",
      ),
      embedSearch: true,
    },
    title: l(
      "Exploro Tour, creating a premium travel platform inspired by the best booking experiences.",
      "Exploro Tour, une plateforme de voyages premium inspirée des meilleures expériences de réservation.",
      "Exploro Tour, una plataforma de viajes premium inspirada en las mejores experiencias de reserva.",
    ),
    description: l(
      "Exploro Tour helps travelers discover unique journeys across the world. We designed and developed a custom platform featuring advanced search functionality and a seamless browsing experience inspired by the simplicity of Airbnb.",
      "Exploro Tour fait découvrir des voyages uniques à travers le monde. Nous avons créé une plateforme sur mesure avec une recherche avancée et une navigation fluide inspirée de la simplicité d’Airbnb.",
      "Exploro Tour permite descubrir viajes únicos por todo el mundo. Creamos una plataforma a medida con búsqueda avanzada y una navegación fluida inspirada en la sencillez de Airbnb.",
    ),
  },
  {
    _id: "club-des-da",
    kind: "news",
    order: 8,
    media: media(
      homeAssets.imgRectangle6,
      348,
      216,
      "Club des DA award for Rose Island",
      "Prix du Club des DA pour Rose Island",
      "Premio del Club des DA por Rose Island",
    ),
    title: l(
      "Club des DA, recognized by one of France’s most respected creative institutions.",
      "Club des DA, une reconnaissance par l’une des institutions créatives les plus respectées en France.",
      "Club des DA, reconocimiento de una de las instituciones creativas más respetadas de Francia.",
    ),
    description: l(
      "Our work for Rose Island was awarded by the Club des DA, recognizing the quality of the experience, design craft, and creative thinking behind the project. A milestone we’re particularly proud of.",
      "Notre travail pour Rose Island a été récompensé par le Club des DA pour la qualité de l’expérience, du design et de la démarche créative. Une étape dont nous sommes particulièrement fiers.",
      "Nuestro trabajo para Rose Island fue premiado por el Club des DA por la calidad de la experiencia, el diseño y el enfoque creativo. Un hito del que estamos especialmente orgullosos.",
    ),
  },
  {
    _id: "velia",
    kind: "project",
    projectSlug: "velia",
    order: 9,
    media: {
      ...media(
        homeAssets.imgCaptureDecran20241109A2242011,
        348,
        422,
        "Vélia health ring",
        "Bague connectée Vélia",
        "Anillo conectado de Vélia",
      ),
      background: "#f5f5f5",
      overlay: {
        src: homeAssets.imgCaptureDecran20241109A2242011,
        width: 229,
        height: 282,
      },
    },
    title: l(
      "Vélia, launching a connected health brand through strategy, identity, and digital design.",
      "Vélia, lancer une marque de santé connectée grâce à la stratégie, l’identité et au design numérique.",
      "Vélia, lanzamos una marca de salud conectada a través de estrategia, identidad y diseño digital.",
    ),
    description: l(
      "Velia developed a smart ring designed to help people better understand their health. We created the brand identity and website, transforming a complex technology into a clear and engaging digital experience.",
      "Vélia a développé une bague connectée pour mieux comprendre sa santé. Nous avons créé son identité de marque et son site, transformant une technologie complexe en une expérience claire et engageante.",
      "Vélia desarrolló un anillo inteligente para comprender mejor la salud. Creamos su identidad de marca y su web, transformando una tecnología compleja en una experiencia clara y atractiva.",
    ),
  },
  {
    _id: "heetch",
    kind: "project",
    projectSlug: "heetch",
    order: 10,
    media: {
      ...media(
        homeAssets.imgLogo1,
        348,
        356,
        "Heetch logo",
        "Logo Heetch",
        "Logo de Heetch",
      ),
      background: "#ff0871",
      overlay: { src: homeAssets.imgLogo1, width: 188, height: 35 },
    },
    title: l(
      "Heetch, supporting international growth through scalable design and development systems.",
      "Heetch, accompagner la croissance internationale avec des systèmes de design et de développement évolutifs.",
      "Heetch, apoyamos el crecimiento internacional con sistemas de diseño y desarrollo escalables.",
    ),
    description: l(
      "As Heetch expanded across multiple markets, they needed a website capable of evolving with them. We partnered on design and development to create a flexible platform supporting growth across countries and audiences.",
      "Pour accompagner son expansion, Heetch avait besoin d’un site capable d’évoluer. Nous avons créé une plateforme flexible qui soutient sa croissance dans plusieurs pays et auprès de différents publics.",
      "Para acompañar su expansión, Heetch necesitaba una web capaz de evolucionar. Creamos una plataforma flexible que apoya su crecimiento en distintos países y para diferentes públicos.",
    ),
  },
  {
    _id: "socialclub",
    kind: "project",
    projectSlug: "socialclub",
    order: 11,
    media: media(
      homeAssets.imgRectangle9,
      348,
      540,
      "SocialClub mobile website",
      "Site mobile de SocialClub",
      "Web móvil de SocialClub",
    ),
    title: l(
      "SocialClub, building a digital presence for one of France’s leading branding agencies.",
      "SocialClub, construire la présence numérique d’une des principales agences de branding en France.",
      "SocialClub, construimos la presencia digital de una de las principales agencias de branding de Francia.",
    ),
    description: l(
      "SocialClub is known for shaping some of the country’s most recognized brands. We designed and developed their website, creating a platform that reflects their expertise while supporting their continued growth and visibility.",
      "SocialClub façonne certaines des marques les plus connues en France. Nous avons conçu et développé un site qui reflète son expertise et accompagne sa croissance et sa visibilité.",
      "SocialClub da forma a algunas de las marcas más reconocidas de Francia. Diseñamos y desarrollamos una web que refleja su experiencia y acompaña su crecimiento y visibilidad.",
    ),
  },
];
const names: Record<string, string> = {
  table22: "Table 22",
  "green-got": "Green Got",
  "mat-crepel": "Mat Crépel",
  "last-prisoner-project": "Last Prisoner Project",
  "carres-solidaires": "Carrés Solidaires",
  "exploro-tour": "Exploro Tour",
  velia: "Vélia",
  heetch: "Heetch",
  socialclub: "SocialClub",
};
const projects: Project[] = feed
  .filter((item) => item.kind === "project")
  .map((item) => ({
    _id: item._id,
    name: names[item._id],
    slug: item.projectSlug!,
    title: item.title,
    description: item.description,
    cover: item.media,
    blocks: [],
    order: item.order,
    seo: { noIndex: true },
  }));
const workImages = assets["4115-4616"];
const roseNews = feed.find((item) => item._id === "club-des-da")!;
for (const [slug, name, key, position] of [
  ["rose-island", "Rose Island", "imgRectangle4", 9],
  ["bond", "Bond", "imgRectangle3", 13],
  ["bilzig", "Bilzig", "imgBilzig031", 15],
] as const) {
  projects.push({
    _id: slug,
    name,
    slug,
    title: l(name, name, name),
    description:
      slug === "rose-island"
        ? roseNews.description
        : l(
            `Discover ${name} in images.`,
            `Découvrez ${name} en images.`,
            `Descubre ${name} en imágenes.`,
          ),
    cover: media(workImages[key], 348, 422, name),
    workPosition: position,
    blocks: [],
    order: position,
    seo: { noIndex: true },
  });
}
export const seed: SiteContent = {
  settings: {
    siteName: "También",
    callUrl: "https://calendly.com/alextourgis/30min",
    socials: [],
    hero: l(
      "También partners with ambitious founders to build high-performing brands and websites that become the first choice in their industry, through Branding, Website, and SEO.",
      "También accompagne les entrepreneurs ambitieux pour créer des marques et des sites performants qui deviennent une référence dans leur secteur, grâce au Branding, au Web et au SEO.",
      "También colabora con emprendedores ambiciosos para crear marcas y webs de alto rendimiento que se convierten en la primera opción de su sector, a través del Branding, la Web y el SEO.",
    ),
    cta: l(
      "Make your move today,",
      "Passez à l’action aujourd’hui,",
      "Da el primer paso hoy,",
    ),
    ctaSecondary: l(
      "before tomorrow even begins.",
      "avant même que demain commence.",
      "antes de que empiece mañana.",
    ),
    processIntro: l(
      "Great websites do more than look good.\nThey build trust, drive growth, and create opportunities.",
      "Un beau site ne suffit pas.\nIl doit inspirer confiance, soutenir la croissance et créer des opportunités.",
      "Una gran web hace más que verse bien.\nGenera confianza, impulsa el crecimiento y crea oportunidades.",
    ),
    processSubline: l(
      "Most projects range from €7k to €23k.",
      "La plupart des projets se situent entre 7 000 € et 23 000 €.",
      "La mayoría de los proyectos se sitúan entre 7.000 € y 23.000 €.",
    ),
    services: [
      [
        "Brand Identity",
        "Identité de marque",
        "Identidad de marca",
        "branding",
      ],
      ["Web Design", "Design web", "Diseño web", "web-design"],
      [
        "Webflow Development",
        "Développement Webflow",
        "Desarrollo Webflow",
        "webflow",
      ],
      [
        "Web App Development",
        "Applications web",
        "Aplicaciones web",
        "web-apps",
      ],
      ["SEO, GEO & AEO", "SEO, GEO et AEO", "SEO, GEO y AEO", "seo"],
      [
        "Handover & Training",
        "Livraison et formation",
        "Entrega y formación",
        "training",
      ],
    ].map(([en, fr, es, slug]) => ({
      name: l(en, fr, es),
      slug,
      description: l(en, fr, es),
    })),
    clients: [
      "Table 22",
      "Green Got",
      "Creative X",
      "SocialClub",
      "Mat Crépel",
      "Exploro Tour",
      "Last Prisoner Project",
      "Vélia",
      "Bond",
      "Carrés Solidaires",
      "Heetch",
    ].map((name, index) => ({
      name,
      icon: [
        studio.imgRectangle427322367,
        studio.imgRectangle427322369,
        studio.imgRectangle427322376,
        studio.imgRectangle427322370,
        studio.imgRectangle427322373,
        studio.imgRectangle427322371,
        studio.imgRectangle427322372,
        studio.imgRectangle427322374,
        studio.imgRectangle427322384,
        studio.imgRectangle427322385,
        studio.imgRectangle427322376,
      ][index],
    })),
    videos: [],
  },
  projects,
  feed,
  process: [
    {
      _key: "kickoff",
      title: l("Kickoff", "Lancement", "Inicio"),
      summary: l(
        "Align on goals, expectations, and the path forward.",
        "Aligner les objectifs, les attentes et la suite du projet.",
        "Alinear objetivos, expectativas y próximos pasos.",
      ),
      description: l(
        "Align on goals, expectations, and the path forward.",
        "Aligner les objectifs, les attentes et la suite du projet.",
        "Alinear objetivos, expectativas y próximos pasos.",
      ),
      time: l("Today", "Aujourd’hui", "Hoy"),
    },
    {
      _key: "strategy",
      title: l("Strategy", "Stratégie", "Estrategia"),
      summary: l(
        "Define the foundations before designing anything.",
        "Définir les fondations avant de commencer à designer.",
        "Definir las bases antes de diseñar.",
      ),
      description: l(
        "We uncover what makes your brand different, identify opportunities, and clarify your positioning. The result is a clear roadmap that guides every decision and ensures the website serves both your audience and business goals.",
        "Nous révélons ce qui rend votre marque unique, identifions les opportunités et clarifions votre positionnement. Une feuille de route guide chaque décision pour servir votre public et vos objectifs.",
        "Descubrimos qué hace diferente a tu marca, identificamos oportunidades y aclaramos tu posicionamiento. Una hoja de ruta guía cada decisión para servir a tu público y a tus objetivos.",
      ),
      time: l("Day 1", "Jour 1", "Día 1"),
      media: media(
        homeAssets.imgRectangle2,
        293,
        164,
        "Strategy conversation",
        "Discussion stratégique",
        "Conversación estratégica",
      ),
    },
    ...[
      [
        "branding",
        "Branding (Optional)",
        "Branding (optionnel)",
        "Branding (opcional)",
        "Shape a brand people remember and trust.",
        "Créer une marque mémorable qui inspire confiance.",
        "Crear una marca memorable que inspire confianza.",
        "2",
      ],
      [
        "architecture",
        "Architecture",
        "Architecture",
        "Arquitectura",
        "Structure content around how people actually think.",
        "Structurer le contenu selon la façon dont les gens pensent.",
        "Estructurar el contenido según cómo piensan las personas.",
        "2",
      ],
      [
        "design",
        "Design",
        "Design",
        "Diseño",
        "Create an experience people enjoy using and remembering.",
        "Créer une expérience agréable et mémorable.",
        "Crear una experiencia agradable y memorable.",
        "7",
      ],
      [
        "development",
        "Development",
        "Développement",
        "Desarrollo",
        "Build a website that’s fast, scalable, and easy to manage.",
        "Construire un site rapide, évolutif et facile à gérer.",
        "Crear una web rápida, escalable y fácil de gestionar.",
        "17",
      ],
      [
        "delivery",
        "Delivery",
        "Livraison",
        "Entrega",
        "Launch with confidence and room to grow.",
        "Lancer avec confiance et préparer la suite.",
        "Lanzar con confianza y espacio para crecer.",
        "45",
      ],
    ].map(([key, en, fr, es, den, dfr, des, day]) => ({
      _key: key,
      title: l(en, fr, es),
      summary: l(den, dfr, des),
      description: l(den, dfr, des),
      time: l("Day " + day, "Jour " + day, "Día " + day),
    })),
  ].map((step, index) => ({
    ...step,
    media: ("media" in step ? step.media : undefined) || {
      ...projects[[0, 0, 1, 2, 3, 4, 5][index]].cover,
      alt: l(
        "Temporary process illustration",
        "Illustration provisoire de cette étape",
        "Ilustración provisional de esta etapa",
      ),
    },
  })),
  testimonials: [],
  offers: [
    {
      _id: "launch",
      name: "Launch one-pager",
      price: "€6k–10k",
      weeks: "4–6",
      media: media(
        pricing.imgPricingLaunchOnePagerImage,
        471,
        292,
        "Launch one-pager website example",
      ),
      promise: l(
        "For founders getting their first serious website online.",
        "Pour les entrepreneurs qui lancent leur premier véritable site.",
        "Para emprendedores que lanzan su primera web profesional.",
      ),
      description: l(
        "A focused one-page website designed to establish credibility, communicate your value, and create momentum.",
        "Un site d’une page pour affirmer votre crédibilité, communiquer votre valeur et lancer votre dynamique.",
        "Una web de una página para generar credibilidad, comunicar tu valor y crear impulso.",
      ),
      includes: [
        l("Strategy workshop", "Atelier stratégique", "Taller de estrategia"),
        l("Website architecture", "Architecture du site", "Arquitectura web"),
        l("Custom design", "Design sur mesure", "Diseño a medida"),
        l("Development", "Développement", "Desarrollo"),
        l("CMS setup", "Configuration du CMS", "Configuración del CMS"),
        l("Basic SEO", "SEO de base", "SEO básico"),
      ],
    },
    {
      _id: "growth",
      name: "Startup Growth",
      price: "€10k–18k",
      weeks: "8–12",
      media: media(
        pricing.imgPricingStartupGrowthImage,
        471,
        292,
        "Table22 website",
      ),
      promise: l(
        "For brands ready to become the obvious choice.",
        "Pour les marques prêtes à devenir une évidence.",
        "Para marcas listas para convertirse en la opción evidente.",
      ),
      description: l(
        "A complete website experience designed to support growth, strengthen positioning, and convert visitors into customers.",
        "Une expérience web complète pour soutenir votre croissance, renforcer votre positionnement et convertir les visiteurs en clients.",
        "Una experiencia web completa para apoyar el crecimiento, reforzar el posicionamiento y convertir visitantes en clientes.",
      ),
      includes: [
        l("Strategy", "Stratégie", "Estrategia"),
        l("Website architecture", "Architecture du site", "Arquitectura web"),
        l("Custom design", "Design sur mesure", "Diseño a medida"),
        l("Development", "Développement", "Desarrollo"),
        l("CMS", "CMS", "CMS"),
        l("SEO foundations", "Fondations SEO", "Bases SEO"),
        l(
          "Copywriting guidance",
          "Accompagnement éditorial",
          "Orientación de contenidos",
        ),
        l(
          "Analytics setup",
          "Configuration des statistiques",
          "Configuración de analítica",
        ),
      ],
    },
    {
      _id: "experience",
      name: "Web Experience",
      price: "18k–23k+",
      weeks: "12–16",
      media: media(
        pricing.imgPricingWebExperienceImage,
        471,
        274,
        "Mat Crépel website",
      ),
      promise: l(
        "For brands that want to own their space.",
        "Pour les marques qui veulent s’imposer dans leur univers.",
        "Para marcas que quieren liderar su sector.",
      ),
      description: l(
        "A premium digital experience combining strategy, content, motion, and advanced web interactions.",
        "Une expérience numérique premium qui associe stratégie, contenu, animation et interactions avancées.",
        "Una experiencia digital premium que combina estrategia, contenido, movimiento e interacciones avanzadas.",
      ),
      includes: [
        l("Strategy workshop", "Atelier stratégique", "Taller de estrategia"),
        l("Website architecture", "Architecture du site", "Arquitectura web"),
        l("Custom design", "Design sur mesure", "Diseño a medida"),
        l("Development", "Développement", "Desarrollo"),
        l(
          "Advanced animations",
          "Animations avancées",
          "Animaciones avanzadas",
        ),
        l("CMS setup", "Configuration du CMS", "Configuración del CMS"),
        l("SEO foundations", "Fondations SEO", "Bases SEO"),
      ],
    },
    {
      _id: "brand",
      name: "Brand Foundation",
      price: "€4k–8k",
      weeks: "3–5",
      media: media(
        pricing.imgPricingBrandFoundationImage,
        471,
        292,
        "Vélia brand website",
      ),
      promise: l(
        "The starting point for ambitious ideas.",
        "Le point de départ des idées ambitieuses.",
        "El punto de partida de las ideas ambiciosas.",
      ),
      description: l(
        "Build a clear identity, positioning, and visual system before investing in growth.",
        "Construire une identité, un positionnement et un système visuel clairs avant d’investir dans la croissance.",
        "Crear una identidad, un posicionamiento y un sistema visual claros antes de invertir en crecimiento.",
      ),
      includes: [
        l(
          "Discovery workshop",
          "Atelier de découverte",
          "Taller de descubrimiento",
        ),
        l("Positioning", "Positionnement", "Posicionamiento"),
        l("Brand strategy", "Stratégie de marque", "Estrategia de marca"),
        l("Messaging foundations", "Messages clés", "Mensajes clave"),
        l("Visual identity", "Identité visuelle", "Identidad visual"),
        l("Logo system", "Système de logos", "Sistema de logos"),
        l("Typography", "Typographie", "Tipografía"),
        l("Brand guidelines", "Charte de marque", "Guía de marca"),
      ],
    },
  ],
  pages: [
    {
      _id: "studio",
      slug: "studio",
      title: l(
        "The internet is full of businesses with great products and forgettable websites. También exists to close that gap through strategy, design, and technology, creating digital experiences that people actually remember.",
        "Internet regorge d’entreprises aux produits remarquables et aux sites oubliables. También réunit stratégie, design et technologie pour créer des expériences numériques dont on se souvient.",
        "Internet está lleno de empresas con grandes productos y webs que se olvidan. También une estrategia, diseño y tecnología para crear experiencias digitales que las personas recuerdan.",
      ),
      description: l(
        "Strategy, design and technology.",
        "Stratégie, design et technologie.",
        "Estrategia, diseño y tecnología.",
      ),
      media: media(
        studio.imgStudioVideoPoster,
        336,
        572,
        "Alex, founder of Tambien",
        "Alex, fondateur de Tambien",
        "Alex, fundador de Tambien",
      ),
    },
    {
      _id: "event",
      slug: "event",
      videoUrl:
        "https://player.vimeo.com/progressive_redirect/playback/1234080464/rendition/720p/file.mp4%20%28720p%29.mp4?loc=external&signature=c6e90b27eeb6cfc8f0b2567923c189e06de4b4095d776e22225c4e7971aaf7af",
      title: l(
        "Creative events for people building what comes next",
        "Des événements créatifs pour celles et ceux qui construisent la suite",
        "Eventos creativos para quienes construyen lo que viene",
      ),
      description: l(
        "Throughout the year, we host intimate events across Europe for founders, designers, developers, and creative thinkers. From Webflow and digital design to AI and emerging technologies, each gathering is designed to spark meaningful conversations, share practical insights, and connect people who are shaping the future of the web. Whether you’re looking to learn, collaborate, or simply meet like-minded people, our events create the space for new ideas and opportunities to emerge.\n\nWe believe the best ideas rarely happen alone. That’s why every event is built around community, curiosity, and real conversations. No endless presentations, no corporate buzzwords. Just talented people sharing what they’re learning, building, and exploring together.",
        "Tout au long de l’année, nous organisons des rencontres à taille humaine en Europe pour les entrepreneurs, designers, développeurs et créatifs. De Webflow au design numérique, de l’IA aux technologies émergentes, chaque événement invite à échanger, partager des connaissances et rencontrer celles et ceux qui façonnent l’avenir du web. Pour apprendre, collaborer ou rencontrer des personnes qui partagent vos envies, nos événements font émerger de nouvelles idées et opportunités.\n\nLes meilleures idées naissent rarement seul. Chaque rencontre se construit autour de la communauté, de la curiosité et de vraies conversations. Pas de présentations interminables ni de jargon : des personnes talentueuses partagent ce qu’elles apprennent, créent et explorent.",
        "A lo largo del año organizamos encuentros cercanos por toda Europa para emprendedores, diseñadores, desarrolladores y creativos. Desde Webflow y diseño digital hasta IA y tecnologías emergentes, cada encuentro invita a conversar, compartir conocimientos y conectar con quienes dan forma al futuro de la web. Para aprender, colaborar o conocer a personas con intereses similares, nuestros eventos abren espacio a nuevas ideas y oportunidades.\n\nLas mejores ideas rara vez surgen en solitario. Cada encuentro gira en torno a la comunidad, la curiosidad y las conversaciones reales. Sin presentaciones interminables ni jerga: personas con talento comparten lo que aprenden, crean y exploran.",
      ),
      media: media(
        event.imgRectangle3,
        1084,
        688,
        "Creative community event",
        "Rencontre de la communauté créative",
        "Encuentro de la comunidad creativa",
      ),
    },
    {
      _id: "legals",
      slug: "legals",
      title: l("Website terms", "Mentions légales", "Aviso legal"),
      description: l(
        "Legal information",
        "Informations légales",
        "Información legal",
      ),
      blocks: [],
      seo: { noIndex: true },
    },
  ],
};
// French copy, approved brand name; the testimonials await source validation.
seed.settings.cta.fr = "Passez à l’action aujourd’hui,";
// Source quotations are kept verbatim in English pending editorial approval.
seed.testimonials = [
  {
    _id: "sam-bernstein",
    person: "Sam Bernstein",
    role: l("Table 22 CEO", "CEO de Table 22", "CEO de Table 22"),
    media: media(homeAssets.imgRectangle10, 471, 336, "Sam Bernstein"),
    quote: l(
      "Before Tomorrow helped us translate a complex business into a clear, compelling experience. The result wasn’t just a better website. It gave us a stronger foundation to communicate our vision, build trust, and support our next stage of growth.",
      "Before Tomorrow nous a aidés à traduire une activité complexe en une expérience claire et convaincante. Le résultat va au-delà d’un meilleur site : une base plus solide pour communiquer notre vision, inspirer confiance et accompagner notre prochaine étape de croissance.",
      "Before Tomorrow nos ayudó a traducir un negocio complejo en una experiencia clara y convincente. El resultado fue más que una web mejor: una base más sólida para comunicar nuestra visión, generar confianza y apoyar nuestra siguiente etapa de crecimiento.",
    ),
  },
  {
    _id: "mat-crepel-quote",
    person: "Mat Crépel",
    role: l(
      "Olympic snowboarder",
      "Snowboarder olympique",
      "Snowboarder olímpico",
    ),
    media: media(homeAssets.imgRectangle11, 471, 336, "Mat Crépel"),
    quote: l(
      "We needed a website that could bring together our story, our vision, and the ambition behind the business. Before Tomorrow understood that instantly, creating an experience that feels clear, distinctive, and perfectly aligned with where we’re heading.",
      "Nous avions besoin d’un site capable de réunir notre histoire, notre vision et nos ambitions. Before Tomorrow l’a immédiatement compris et a créé une expérience claire, singulière et parfaitement alignée avec notre direction.",
      "Necesitábamos una web que reuniera nuestra historia, nuestra visión y nuestras ambiciones. Before Tomorrow lo entendió al instante y creó una experiencia clara, distintiva y alineada con nuestro rumbo.",
    ),
  },
  {
    _id: "dhylan-samba",
    person: "Dhylan Samba",
    role: l(
      "Carrés Solidaires CEO",
      "CEO de Carrés Solidaires",
      "CEO de Carrés Solidaires",
    ),
    media: media(homeAssets.imgRectangle12, 471, 336, "Dhylan Samba"),
    quote: l(
      "Our mission is ambitious, but explaining it simply wasn’t easy. Before Tomorrow helped us clarify our story and turn it into a website that builds trust, creates credibility, and supports our growth every day.",
      "Notre mission est ambitieuse, mais l’expliquer simplement n’était pas facile. Before Tomorrow nous a aidés à clarifier notre histoire et à la transformer en un site qui inspire confiance, renforce notre crédibilité et soutient notre croissance au quotidien.",
      "Nuestra misión es ambiciosa, pero explicarla con sencillez no era fácil. Before Tomorrow nos ayudó a aclarar nuestra historia y convertirla en una web que genera confianza, refuerza nuestra credibilidad y apoya nuestro crecimiento cada día.",
    ),
  },
];
