# CLAUDE.md — Refonte lesecranspastoutletemps.fr

Lis **project.md** et **workflow.md** au début de chaque session avant de faire quoi que ce soit.

## Résumé du projet

Refonte from scratch de `lesecranspastoutletemps.fr` (Wix → Astro + Tailwind CSS).
Objectif : SEO + perf + UX, sans refonte graphique. Fidélité visuelle maximale au site Wix actuel.

## Décisions techniques arrêtées

- **Hébergeur :** Cloudflare Pages
- **Formulaire contact :** Web3Forms
- **Analytics :** aucun pour l'instant
- **Ton des textes :** identique au site Wix actuel
- **Favicon :** à traiter plus tard (hors scope P0-P1)

## Stack

Astro + Tailwind CSS + TypeScript strict. Pas de React/Next/Vue. Pas de CMS.

## Règles absolues

- Consulter les skills disponibles avant chaque phase (frontend-design, SEO, etc.)
- Commits en français, préfixés par la phase : `[P0]`, `[P1]`, etc.
- Pas de lorem ipsum. Si contenu manquant : `<!-- CONTENU MANQUANT : description -->`
- Ne jamais démarrer une nouvelle phase sans validation explicite de Gabriel
- Lighthouse cibles : Perf ≥95, SEO 100, A11y ≥95, LCP <1.5s
- Réponses courtes et orientées action

## Arborescence cible

`/` · `/spectacle-6-9-ans` · `/spectacle-9-12-ans` · `/projet-realisations` · `/contact` · `/a-propos` · `/mentions-legales`

## Phase en cours

→ **Phase 0 — Préparation** : tokens de design + inventaire textuel + assets

Voir workflow.md pour le planning complet (P0 → P6).
