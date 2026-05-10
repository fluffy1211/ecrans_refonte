# Les écrans pas tout le temps

Site vitrine du spectacle participatif de sensibilisation aux écrans pour les enfants de 6 à 12 ans.

- **Stack** : Astro 5 + Tailwind CSS + TypeScript
- **Hébergement** : Cloudflare Pages (auto-deploy sur `main`)
- **URL** : https://www.lesecranspastoutletemps.fr

---

## Prérequis

- Node.js 20+
- npm

## Installation

```bash
npm install
```

## Développement local

```bash
npm run dev
```

Le site est disponible sur http://localhost:4321

## Build

```bash
npm run build
```

Le build statique est généré dans `dist/`.

## Déploiement

Le site se déploie automatiquement sur Cloudflare Pages à chaque push sur `main`.

Pour déployer manuellement :

```bash
npm run deploy
```

---

## Modifier le contenu

### Modifier le texte d'une page

1. Ouvrir le fichier `.astro` correspondant dans `src/pages/`
2. Éditer le texte directement dans le HTML
3. Commit et push — le site se redéploie automatiquement

| Page | Fichier |
|---|---|
| Accueil | `src/pages/index.astro` |
| Spectacle 6-9 ans | `src/pages/spectacle-6-9-ans.astro` |
| Spectacle 9-12 ans | `src/pages/spectacle-9-12-ans.astro` |
| Projet & réalisations | `src/pages/projet-realisations.astro` |
| À propos | `src/pages/a-propos.astro` |
| Contact | `src/pages/contact.astro` |
| Zone d'intervention | `src/pages/zone-intervention.astro` |
| Mentions légales | `src/pages/mentions-legales.astro` |

### Modifier le titre / description / meta d'une page

Chaque page appelle le composant `<Layout>` avec des props `title`, `description`, `jsonLd`.

```astro
<Layout
  title="Nouveau titre — Les écrans pas tout le temps"
  description="Nouvelle meta description."
  jsonLd={[...]}
>
```

### Modifier la FAQ

La FAQ est un tableau `faqItems` en haut des pages spectacle :

```astro
const faqItems = [
  { q: "Question ?", a: "Réponse." },
];
```

---

## Ajouter une image

### Image dans une page

1. Placer le fichier dans `public/images/`
2. Utiliser le composant `<OptimizedImage>` :

```astro
import OptimizedImage from '@components/OptimizedImage.astro';

<OptimizedImage
  src="/images/mon-image.jpg"
  alt="Description de l'image"
  width="400"
  height="300"
  loading="lazy"
/>
```

Le composant sert automatiquement une version WebP avec fallback JPEG/PNG.

### Convertir les images en WebP

Après avoir ajouté des images JPEG ou PNG, lancez :

```bash
node scripts/optimize-images.mjs
```

Ce script génère les versions WebP et l'image Open Graph.

---

## SEO

### Données structurées (JSON-LD)

Chaque page contient son propre JSON-LD dans le frontmatter. Les types utilisés :
- `WebSite` — page d'accueil
- `PerformingGroup` — accueil, à propos, projet
- `Event` — pages spectacle
- `FAQPage` — pages spectacle
- `LocalBusiness` — contact
- `BreadcrumbList` — toutes les pages internes

### Sitemap

Généré automatiquement par `@astrojs/sitemap` à chaque build. Disponible sur `/sitemap-index.xml`.

### Robots

`public/robots.txt` autorise tous les crawlers et signale le sitemap.

---

## Structure du projet

```
├── public/
│   ├── images/          # Images (JPEG/PNG + WebP générés)
│   ├── docs/            # PDF (retours académie)
│   ├── robots.txt
│   ├── _headers         # Cloudflare headers
│   └── llms.txt         # Index pour les LLMs
├── src/
│   ├── components/      # Composants réutilisables
│   │   ├── SEO.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Cta.astro
│   │   ├── Faq.astro
│   │   └── OptimizedImage.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/           # Pages du site
│   └── env.d.ts
├── scripts/
│   └── optimize-images.mjs
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## Contact technique

Gabriel Martin — gabrielmartin13009@gmail.com
