# Les écrans pas tout le temps

Site vitrine du spectacle participatif de sensibilisation aux écrans pour les enfants de 6 à 12 ans.

- **Stack** : Astro 5 + Tailwind CSS + TypeScript
- **Hébergement** : Cloudflare Workers (auto-deploy sur `main`)
- **URL** : https://www.lesecranspastoutletemps.fr

---

## Prérequis

- Node.js 22.18+ (CI et déploiement sur Node 22)
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

Le build statique est généré dans `dist/`. `npm test` vérifie les métadonnées, le sitemap et la préparation des images ; `npm run astro -- check` vérifie les types.

## Déploiement

Le site se déploie automatiquement sur Cloudflare Workers à chaque push sur `main`.

Pour déployer manuellement :

```bash
npm run deploy
```

---

## Modifier le contenu

### Modifier le texte d'une page

1. Ouvrir le fichier `.astro` correspondant dans `src/pages/`
2. Éditer le texte directement dans le HTML
3. Commit et push - le site se redéploie automatiquement

| Page | Fichier |
|---|---|
| Accueil | `src/pages/index.astro` |
| Spectacle 6-9 ans | `src/pages/spectacle-6-9-ans.astro` |
| Spectacle 9-12 ans | `src/pages/spectacle-9-12-ans.astro` |
| Projet & réalisations | `src/pages/projet-realisations.astro` |
| À propos | `src/pages/a-propos.astro` |
| Contact | `src/pages/contact.astro` |
| Mentions légales | `src/pages/mentions-legales.astro` |

### Modifier le titre / description / meta d'une page

Chaque page appelle le composant `<Layout>` avec des props `title`, `description`, `jsonLd`.

```astro
<Layout
  title="Nouveau titre - Les écrans pas tout le temps"
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

Le module annonce les variantes WebP disponibles, avec la source originale comme fallback.

### Préparer les variantes WebP

Après avoir ajouté des images JPEG ou PNG, lancez :

```bash
npm run images:prepare
```

La préparation fait aussi partie de `npm run build`. Les variantes sont générées dans `.astro/image-variants/`, puis copiées dans `dist/images/` après le build ; les images versionnées dans `public/images/` restent inchangées. Le cache compare les empreintes du contenu source et des variantes, même si leurs dates sont identiques. Les JPEG/PNG sont prioritaires sur leurs dérivés WebP ; les images disponibles seulement en WebP sont conservées sans recompression. Une conversion échouée fait échouer le build.

Pour prévisualiser les variantes nouvellement générées, utiliser `npm run preview`, qui sert le build complet.

---

## SEO

### Données structurées (JSON-LD)

Les pages spectacle utilisent `spectacleMetadata` dans `src/lib/schema.ts` pour construire leur JSON-LD à partir de leur contenu. La compagnie est également définie dans ce module. Les types utilisés :
- `WebSite` - page d'accueil
- `PerformingGroup` - accueil, à propos, projet
- `Service` - pages spectacle
- `FAQPage` - pages spectacle
- `PerformingGroup` - contact
- `BreadcrumbList` - toutes les pages internes

### Sitemap

Un seul sitemap est publié sur `/sitemap.xml`, le chemin référencé par `public/robots.txt`. `scripts/sitemap.mjs` découvre les pages Astro statiques, hors pages d’erreur, pages déclarant `noindex` ou `noindex={true}` et routes dynamiques. Les routes dynamiques nécessiteraient une prise en charge explicite si elles étaient ajoutées au site.

Le `lastmod` utilise le dernier commit de la page ou des fichiers partagés (`src/components`, `src/layouts`, `src/lib`, `public`). Cette estimation est conservatrice : une modification partagée actualise toutes les pages. Sans historique Git, le sitemap omet cette date.

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
│   ├── optimize-images.mjs
│   ├── publish-images.mjs
│   └── sitemap.mjs
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## Contact technique

Gabriel Martin - gabrielmartin13009@gmail.com
