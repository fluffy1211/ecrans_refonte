# CLAUDE.md - Refonte lesecranspastoutletemps.fr

Lis **project.md** et **workflow.md** au début de chaque session avant de faire quoi que ce soit.

## Résumé du projet

Refonte from scratch de `lesecranspastoutletemps.fr` (Wix → Astro + Tailwind CSS).
Objectif : SEO + perf + UX.

Site vitrine 6 pages pour un duo de théâtre participatif (Béatrice & Samy, Marseille) sur la thématique des écrans chez les enfants.

## Stack

Astro + Tailwind CSS + TypeScript strict. Pas de React/Next/Vue. Pas de CMS.

## Décisions techniques arrêtées

- **Hébergeur :** Cloudflare Workers (auto-deploy sur push `main` via GitHub Actions + wrangler)
- **URL de staging :** `ecransrefonte.pages.dev`
- **Formulaire contact :** Web3Forms (clé : `587e8bb5-1715-4a5f-87e5-20512bd2566c`)
- **Analytics :** aucun pour l'instant
- **Typos :** Raleway + Nunito (placeholders - à confirmer via DevTools sur le site Wix)
- **Accent couleur :** `#F8E71C` (jaune), texte `#1C1C1C`
- **Favicon :** hors scope pour l'instant

## Arborescence (toutes les pages existent)

`/` · `/spectacle-6-9-ans` · `/spectacle-9-12-ans` · `/projet-realisations` · `/contact` · `/a-propos` · `/mentions-legales`

## État d'avancement

| Phase | Statut | Notes |
|---|---|---|
| P0 Préparation | ✅ | Assets récupérés, tokens partiels |
| P1 Scaffolding | ✅ | Astro 5, Tailwind, SEO.astro, Layout.astro |
| P2 Header/Footer/CTA | ✅ | Nav mobile, skip-link, focus-visible |
| P3 Page d'accueil | ✅ | Toutes sections + JSON-LD |
| P4 Pages secondaires | ✅ | Toutes pages + FAQ + formulaire + JSON-LD |
| P5 SEO final | ✅ | Canonical, OG, sitemap, a11y |
| P6 Déploiement | ✅ | Workers + DNS configuré, nameservers OVH→Cloudflare migrés, DNSSEC désactivé, SSL Full actif, Always Use HTTPS ON, apex + www attachés au Worker |
| Audit post-P6 | ✅ | Bug photo Samy corrigé, nav enrichie, section structures ajoutée sur la home, commentaires `À VALIDER` purgés du HTML servi |
| Polish contenu | ✅ | Tirets LLM supprimés, bulles témoignages simplifiées, fusion sections projet-realisations, suppression comités d'entreprise, répétitions "48h" allégées |
| Audit SEO 2026-08 | ✅ | Correction de régressions introduites par les commits SEO `ac5e120`→`47ac91f` : couche AVIF supprimée, contenu inventé purgé de `/contact`, sitemaps unifiés, schema nettoyé. Détail ci-dessous. |

## Actions en attente (bloquants Gabriel/Béatrice)

- [x] **Gabriel** : bascule domaine OVH → Cloudflare (nameservers + DNSSEC désactivé + apex/www attachés) - ~~fait 2026-05-11~~
- [x] **Gabriel** : fournir le code `google-site-verification` (Search Console) → décommenté dans `Layout.astro`
- [ ] **Gabriel** : décider analytics (Plausible / Umami / rien)
- [ ] **Béatrice** : valider les synopses des spectacles
- [ ] **Béatrice** : enrichir les bios dans `/a-propos`
- [ ] **Gabriel/Béatrice** : portraits HD (Wix ne sert que des thumbnails ~60px)

## Ce qui reste à coder (P6)

- [x] `README.md` - comment éditer le contenu, ajouter une image, déployer
- [x] GitHub Actions CI - build + check liens cassés
- [x] Lightbox `/projet-realisations` : vraie modale dans `Gallery.astro` (`role="dialog"`, focus trap, Escape, restauration du focus). Plus aucun `:target` dans le code - ~~fait `df40123`~~
- [ ] Galerie : les photos ne sont jamais redimensionnées (`gallery-05.webp` = 4032x3024 / 456 Ko, les autres ~2027x2866) alors que la lightbox plafonne à 1200 px. Plusieurs Mo à gagner sur `/projet-realisations` - **attend l'accord de Béatrice** (qualité de ses photos)

## Acquis de l'audit SEO 2026-08 (ne pas réintroduire)

Les commits `ac5e120`→`47ac91f` avaient introduit des régressions. Corrigées, mais
les pièges sont faciles à refaire :

- **Pas de couche AVIF.** Le script transcodait les WebP *déjà compressés*, donc
  doublement dégradés et systématiquement plus lourds (37/37 images, ex. deco-02
  268 Ko vs 52 Ko). Comme `<source type="image/avif">` passait en premier, c'est la
  version lourde qui était servie. Toute nouvelle couche AVIF doit partir des
  originaux et être comparée fichier par fichier au WebP avant d'être commitée.
- **Un seul sitemap** : `@astrojs/sitemap` (`sitemap-index.xml`). Le
  `src/pages/sitemap.xml.ts` custom a été supprimé (deux sources divergentes, ordre
  des éléments non conforme au XSD). `robots.txt`, `public/_headers` et
  `indexnow.yml` doivent rester alignés dessus.
- **Une page en `noindex` ne va jamais dans le sitemap** — c'est ce qui a déclenché
  l'alerte Search Console « Exclue par la balise noindex » sur `/mentions-legales/`.
  L'exclusion se fait via le `filter` de `@astrojs/sitemap`.
- **Pas de `FAQPage` sans FAQ visible** dans le HTML rendu : les guidelines Google
  l'interdisent (risque d'action manuelle). La home en avait une fantôme depuis P5.
- **La clé IndexNow est publique par conception** (le protocole exige qu'elle soit
  lisible à `/indexnow.txt`). Elle vit en clair dans `public/indexnow.txt` et
  `.github/workflows/indexnow.yml`, pas dans un secret GitHub. Le workflow échoue si
  les deux divergent.
- **`PerformingGroup` n'accepte pas `openingHoursSpecification`** (propriété de
  `LocalBusiness`/`Place`). Schema unique et partagé dans `src/lib/schema.ts`.
- **Node 22 partout** dans les workflows (requis par wrangler ^4.90).
- **Aucun chiffre, prix, durée ou témoignage inventé.** L'audit a dû purger de
  `/contact` un prix « à partir de 150€ », une durée « 45 min » contredisant les
  30+30 min du reste du site, et deux faux témoignages. Voir la règle ci-dessous.

## Règles absolues

- Consulter les skills disponibles avant chaque phase (frontend-design, SEO, etc.)
- Commits en français, préfixés par la phase : `[P0]`, `[P1]`, etc.
- Pas de lorem ipsum. Si contenu manquant : `<!-- CONTENU MANQUANT : description -->`
- **Ne jamais inventer de contenu factuel** : ni chiffre, ni prix, ni durée, ni
  témoignage, ni partenaire, ni caution institutionnelle. Réutiliser une formulation
  déjà validée ailleurs sur le site, ou laisser un `<!-- CONTENU MANQUANT -->`.
  Les faux avis sont par ailleurs sanctionnés par la DGCCRF.
- Ne jamais démarrer une nouvelle phase sans validation explicite de Gabriel
- Lighthouse cibles : Perf ≥95, SEO 100, A11y ≥95, LCP <1.5s
- Réponses courtes et orientées action
