# También

Site de studio sur mesure : Next.js, ABC Diatype, Sanity et trois langues (FR / EN / ES).

## Organisation

- `web/` : site Next.js, composants, styles et intégration Sanity.
- `studio/` : Studio Sanity autonome et schémas de contenu.

Les dossiers préexistants `skritur`, `creativex` et les imports Fontdue ne font pas partie de ce repository.

## Démarrage

Node.js 24 ou supérieur.

```sh
npm --prefix web ci
npm --prefix studio ci
npm run dev
```

Dans un second terminal :

```sh
npm run studio
```

Site : http://localhost:3000/fr ; Studio : http://localhost:3333.

Studio hébergé : https://tambien-kxrtuoyl.sanity.studio. Les contenus Figma y sont importés en brouillons.

Sanity utilise le projet `kxrtuoyl` et le dataset `production`. Les fichiers `.env.local` restent hors de Git. Copier les `.env.example` pour configurer une autre machine.

## Édition

Le Studio contient les projets, pages, offres, cartes du feed, étapes du processus, services, témoignages et réglages généraux. Les textes FR / EN / ES sont édités ensemble ; images et mise en page sont communes.

Les projets acceptent une composition de blocs : texte, image, deux images, image et texte, vidéo, galerie, citation, grand texte, espacement et crédits. Les vidéos sont hébergées sur YouTube ou Vimeo.

Le site lit Sanity. Tant que le document singleton « Réglages du site » n’est pas publié, il utilise le contenu de démonstration provenant de Figma. Une fois ce document publié, les listes publiées de Sanity deviennent la source de vérité (une liste vide reste vide).

## Validation

```sh
npm run check
npm run typegen
npm run build
npm test
npm --prefix studio run build
```

Les tests navigateur vérifient plusieurs largeurs intermédiaires, les pages FR/EN/ES, le menu au clavier, les routes directes, les changements de langue et les erreurs 404.

## Déploiement

Portfolio : les 16 visuels de Figma sont présents, avec 12 projets identifiés et accessibles. Les positions 8, 10, 14 et 16 attendent encore leurs noms ; Figma utilise le titre provisoire « Table 22 ». Les projets supplémentaires de Sanity s’ajoutent à la grille, et son compteur suit le nombre de cartes affichées. `web/scripts/import-work-projects.mjs` ajoute uniquement les nouveaux projets en brouillon, sans remplacer les contenus édités.

Aperçu validé : https://tambien-ilkvtninf-alextourgis-6133.vercel.app/fr. Le projet Vercel `tambien` est dans l’espace personnel `alextourgis-6133`. Le code est sur la branche `codex/website-foundation`. Pour activer les déploiements Git automatiques, ajouter le compte GitHub También aux Login Connections de Vercel, puis connecter ce repository dans les réglages Git du projet.

Dans Vercel, importer `alextourgis-tambien/tambien` et choisir **Root Directory : web**. Utiliser les variables de `web/.env.example`, avec la vraie URL dans `NEXT_PUBLIC_SITE_URL`. Les branches produisent les aperçus ; `main` est la branche de production.

Le Studio est autonome : `npm --prefix studio run deploy`. Il nécessite une connexion locale via `sanity login`. Déployer les schémas avec `npm --prefix studio run schema:deploy`, puis régénérer les types.

Pour importer le contenu Figma en brouillons : `npm --prefix studio run seed`. Le script téléverse les images et crée les documents absents, sans remplacer les brouillons existants. Valider les textes, publier les services et projets avant les cartes du feed, puis publier les réglages du site en dernier. Les références des cartes signalent les projets encore en brouillon jusqu’à leur publication. Une vérification sans envoi est disponible avec `cd web && node scripts/seed-sanity.mjs --dry-run`.

Ajouter les origines exactes du site et du Studio dans les réglages CORS Sanity. Ne pas utiliser de wildcard avec des identifiants.

Pour la prévisualisation des brouillons, configurer un token de lecture serveur dans `SANITY_API_READ_TOKEN`, l’URL du Studio dans `NEXT_PUBLIC_SANITY_STUDIO_URL` et celle du site dans `SANITY_STUDIO_PREVIEW_URL`. Aucun secret ne doit porter le préfixe `NEXT_PUBLIC_`.

## Contenus à finaliser avant publication

- Destinations WhatsApp, YouTube, Tools et réseaux sociaux.
- Galeries et textes définitifs des projets : la grille reproduit les 16 visuels de Figma, avec les neuf projets identifiés et des libellés provisoires pour les autres. Les champs « Visuel de la grille Work » et « Position dans la grille Work » permettent de remplacer ces cartes dans Sanity.
- Témoignages qui citent « Before Tomorrow » : citations anglaises conservées, à valider avec les auteurs avant publication.
- Tarifs et durées : la fourchette de l’accueil, le calendrier et les offres restent à harmoniser ; « 18k–23k+ » est conservé tel que fourni.
- Vidéo Studio provisoire fournie par Alex intégrée (boucle muette de 10 secondes, lecture complète au clic). Liste YouTube avec sept liens et titres provisoires à remplacer ; informations légales à valider.
- Illustrations des étapes provisoires lorsque le champ média est vide ; renseigner les visuels définitifs dans chaque étape Sanity.

Le site de travail reste `noindex` et son sitemap est vide tant que `SITE_INDEXABLE` n’est pas `true`. Activer l’indexation seulement après validation du contenu. Les pages projets et légales ont aussi un réglage SEO indépendant.

## Modifications futures

Conserver les composants et tokens existants. La grille desktop s’appuie sur la référence Figma 1512 px, marges 30 et gouttières 20 ; les tailles utilisent des rem et une racine bornée. Les adaptations à deux colonnes et une colonne sont structurelles. ABC Diatype Regular / Medium / Bold est chargée localement via `next/font`.

Le chargement initial et les navigations utilisent un loader discret et un fondu blanc de 320 ms via React ViewTransition. Le scroll reste natif ; les ancres utilisent le lissage du navigateur, avec désactivation en mode « réduire les animations ». Aucun moteur de scroll ni boucle JavaScript supplémentaire n’est ajouté.

Images : les 48 sources raster locales sont en WebP (8,8 Mo au total au lieu de 115 Mo), avec une dimension maximale de 2 560 px. Les SVG restent vectoriels. Next.js génère les tailles adaptées, et les images Sanity sont également demandées en WebP. Les portraits et visuels informatifs ont des textes alternatifs ; les éléments décoratifs gardent un alt vide.
