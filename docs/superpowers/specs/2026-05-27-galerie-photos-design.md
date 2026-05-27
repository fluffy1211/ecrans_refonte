# Spec : Galerie photos — /projet-realisations

**Date :** 2026-05-27  
**Statut :** Approuvé

---

## Objectif

Intégrer une galerie complète des photos disponibles dans la section `/projet-realisations`, avec modale lightbox accessible (focus trap, navigation clavier, Esc pour fermer).

---

## Assets

### Photos nouvelles (16 uniques depuis `~/Pictures/ecrans`)
Les 6 suivantes sont des doublons exacts (MD5) de photos déjà dans `public/images/` — à ignorer :
- `WhatsApp Image 2026-05-20 at 11.31.12 (3).jpeg` = `salle-dos-scene.jpg`
- `WhatsApp Image 2026-05-20 at 11.31.13 (1).jpeg` = `salle-vue-large.jpg`
- `WhatsApp Image 2026-05-20 at 11.31.11 (1).jpeg` = `salle-main-levee.jpg`
- `WhatsApp Image 2026-05-20 at 11.31.12.jpeg` = `scene-action.jpg`
- `WhatsApp Image 2026-05-20 at 11.31.14.jpeg` = `samy-portrait.jpg`
- `WhatsApp Image 2026-05-20 at 11.31.10.jpeg` = `scene-duo-accueil.jpg`

Les 16 restantes sont copiées dans `public/images/` sous les noms `gallery-07.webp` → `gallery-22.webp` (ordre alphabétique du nom WhatsApp d'origine, doublons sautés).

Conversion : `cwebp -q 82` (qualité 82, bon rapport qualité/poids pour du JPEG WhatsApp).

### Photos existantes incluses dans la galerie (14)
`gallery-01` → `gallery-06`, `scene-action`, `scene-duo-accueil`, `scene-duo-sourires`, `salle-dos-scene`, `salle-vue-large`, `salle-main-levee`, `en-scene`, `photo-ensemble` — toutes en `.webp`.

Exclus de la galerie : portraits bio (`beatrice-portrait`, `samy-portrait`, `portrait-samy`), visuels décoratifs (`deco-*`, `hero-illustration`, `sticker`), images hero contextuelles (`hero-beatrice-enfants`, `projet-hero`), og/icons.

**Total : ~30 photos.**

---

## Architecture

### Nouveau composant `src/components/Gallery.astro`

**Props :**
```ts
interface Props {
  photos: { src: string; alt: string }[];
}
```

**Rendu :**
- Grille CSS `columns-2 sm:columns-3 lg:columns-4` (masonry natif via CSS columns) avec `gap-2 sm:gap-3`
- Chaque photo : `<button>` avec `<img loading="lazy">`, déclenche la modale
- Modale : `<div role="dialog" aria-modal="true" aria-label="Galerie photos">` injectée en JS dans `<body>`

**Script vanilla JS (dans le composant, `<script>`) :**
- Ouvre la modale au clic sur photo
- Navigation ◄ ► (boutons + touches ArrowLeft/ArrowRight)
- Fermeture : bouton ✕ + touche Esc + clic sur overlay
- Focus trap : Tab/Shift+Tab reste dans la modale
- `aria-live="polite"` sur le compteur `1 / 30`
- Restaure le focus sur le bouton déclencheur à la fermeture

### Intégration dans `/projet-realisations.astro`

Nouvelle section `<!-- GALERIE PHOTOS -->` insérée **après** la section "Villes et lieux" et **avant** le CTA :

```html
<section class="bg-gray-50 border-t-4 border-accent py-14 sm:py-20" aria-label="Galerie photos">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <h2 class="font-heading font-black text-2xl sm:text-3xl text-text-main mb-8">
      En images
    </h2>
    <Gallery photos={galleryPhotos} />
  </div>
</section>
```

Le tableau `galleryPhotos` déclaré dans le frontmatter de la page (array de 30 objets `{ src, alt }`).

Le vieux CSS `:target` lightbox (`<style>` en bas de la page) est **supprimé**.

---

## Accessibilité

- Chaque `<button>` de photo : `aria-label="Voir photo X en grand"` (ou alt de l'image)
- Modale : `role="dialog"`, `aria-modal="true"`, `aria-label="Galerie photos"`
- Focus trap sur ✕ + ◄ + ► dans la modale
- Esc ferme la modale
- `prefers-reduced-motion` : désactive les transitions CSS

---

## Performances

- Toutes les images galerie en `.webp` (cwebp -q 82)
- `loading="lazy"` sur toutes les vignettes
- Pas de `<picture>` nécessaire (une seule source WebP suffit, navigateurs modernes)
- La modale charge l'image pleine taille à la demande (même `src` que la vignette, pas de variante HD distincte)

---

## Hors scope

- Filtres par catégorie
- Captions éditables
- Variantes d'images HD distinctes des vignettes
