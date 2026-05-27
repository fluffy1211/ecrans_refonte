# Galerie Photos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter une section galerie (~30 photos) dans `/projet-realisations` avec composant `Gallery.astro` et lightbox modale accessible.

**Architecture:** Composant Gallery.astro reçoit un array `{ src, alt }[]`, render CSS columns masonry, JS vanilla pour la modale (focus trap, nav clavier, Esc). Intégration dans `projet-realisations.astro`.

**Tech Stack:** Astro, Tailwind CSS, cwebp (conversion), JS vanilla

---

### Task 1 : Conversion des 16 nouvelles photos en WebP

**Files:**
- Create: `public/images/gallery-07.webp` → `gallery-22.webp`

- [ ] Convertir les 16 photos uniques depuis `~/Pictures/ecrans/` :

```bash
SRC="/Users/gabriel/Pictures/ecrans"
DST="/Users/gabriel/Documents/code-perso/ecrans_refonte/public/images"
declare -A MAP=(
  ["WhatsApp Image 2026-05-20 at 11.31.11 (2).jpeg"]="gallery-07"
  ["WhatsApp Image 2026-05-20 at 11.31.11 (3).jpeg"]="gallery-08"
  ["WhatsApp Image 2026-05-20 at 11.31.11.jpeg"]="gallery-09"
  ["WhatsApp Image 2026-05-20 at 11.31.12 (1).jpeg"]="gallery-10"
  ["WhatsApp Image 2026-05-20 at 11.31.13 (2).jpeg"]="gallery-11"
  ["WhatsApp Image 2026-05-20 at 11.31.13 (3).jpeg"]="gallery-12"
  ["WhatsApp Image 2026-05-20 at 11.31.13.jpeg"]="gallery-13"
  ["WhatsApp Image 2026-05-20 at 11.31.14 (2).jpeg"]="gallery-14"
  ["WhatsApp Image 2026-05-20 at 11.31.14 (4).jpeg"]="gallery-15"
  ["WhatsApp Image 2026-05-20 at 11.31.15 (3).jpeg"]="gallery-16"
  ["WhatsApp Image 2026-05-20 at 11.31.15 (4).jpeg"]="gallery-17"
  ["WhatsApp Image 2026-05-20 at 11.31.15 (5).jpeg"]="gallery-18"
  ["WhatsApp Image 2026-05-20 at 11.31.16 (1).jpeg"]="gallery-19"
  ["WhatsApp Image 2026-05-20 at 11.31.16 (4).jpeg"]="gallery-20"
  ["WhatsApp Image 2026-05-20 at 11.31.17 (1).jpeg"]="gallery-21"
  ["WhatsApp Image 2026-05-20 at 11.31.17 (3).jpeg"]="gallery-22"
)
for src_name in "${!MAP[@]}"; do
  dst_name="${MAP[$src_name]}"
  cwebp -q 82 "$SRC/$src_name" -o "$DST/$dst_name.webp"
done
```

- [ ] Vérifier que 16 fichiers `.webp` sont créés dans `public/images/`
- [ ] `git add public/images/gallery-07.webp ... gallery-22.webp && git commit -m "[Post-P6] Galerie - ajout 16 nouvelles photos WebP (conversion depuis WhatsApp)"`

---

### Task 2 : Composant Gallery.astro

**Files:**
- Create: `src/components/Gallery.astro`

- [ ] Créer `src/components/Gallery.astro` avec grille CSS columns + modale JS :

(voir code complet dans l'implémentation)

- [ ] `git add src/components/Gallery.astro && git commit -m "[Post-P6] Galerie - composant Gallery.astro (grille masonry + lightbox focus trap)"`

---

### Task 3 : Intégration dans projet-realisations.astro

**Files:**
- Modify: `src/pages/projet-realisations.astro`

- [ ] Ajouter import `Gallery`, array `galleryPhotos` (30 photos avec alt), section "En images", supprimer CSS `:target` lightbox
- [ ] `git add src/pages/projet-realisations.astro && git commit -m "[Post-P6] Galerie - intégration dans /projet-realisations, suppression lightbox :target"`
