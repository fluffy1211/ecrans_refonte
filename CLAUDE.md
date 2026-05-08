# CLAUDE.md — Refonte lesecranspastoutletemps.fr

Lis **project.md** et **workflow.md** au début de chaque session avant de faire quoi que ce soit.

## Résumé du projet

Refonte from scratch de `lesecranspastoutletemps.fr` (Wix → Astro + Tailwind CSS).
Objectif : SEO + perf + UX.

Site vitrine 6 pages pour un duo de théâtre participatif (Béatrice & Samy, Marseille) sur la thématique des écrans chez les enfants.

## Stack

Astro + Tailwind CSS + TypeScript strict. Pas de React/Next/Vue. Pas de CMS.

## Décisions techniques arrêtées

- **Hébergeur :** Cloudflare Pages (auto-deploy sur push `main`)
- **URL de staging :** `ecransrefonte.pages.dev`
- **Formulaire contact :** Web3Forms (clé : `587e8bb5-1715-4a5f-87e5-20512bd2566c`)
- **Analytics :** aucun pour l'instant
- **Typos :** Raleway + Nunito (placeholders — à confirmer via DevTools sur le site Wix)
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
| P6 Déploiement | 🔄 | Live sur staging, bascule domaine en attente |

## Actions en attente (bloquants Gabriel/Béatrice)

- [ ] **Gabriel** : fournir le code `google-site-verification` (Search Console) → décommenter dans `Layout.astro`
- [ ] **Gabriel** : décider analytics (Plausible / Umami / rien)
- [ ] **Gabriel** : bascule domaine (quand prêt — procédure dans workflow.md P6)
- [ ] **Béatrice** : valider les synopses des spectacles (`<!-- CONTENU À VALIDER -->`)
- [ ] **Béatrice** : enrichir les bios dans `/a-propos` (`<!-- CONTENU MANQUANT -->`)
- [ ] **Gabriel/Béatrice** : portraits HD (Wix ne sert que des thumbnails ~60px)

## Ce qui reste à coder (P6)

- [ ] `README.md` — comment éditer le contenu, ajouter une image, déployer
- [ ] GitHub Actions CI — build + check liens cassés

## Règles absolues

- Consulter les skills disponibles avant chaque phase (frontend-design, SEO, etc.)
- Commits en français, préfixés par la phase : `[P0]`, `[P1]`, etc.
- Pas de lorem ipsum. Si contenu manquant : `<!-- CONTENU MANQUANT : description -->`
- Ne jamais démarrer une nouvelle phase sans validation explicite de Gabriel
- Lighthouse cibles : Perf ≥95, SEO 100, A11y ≥95, LCP <1.5s
- Réponses courtes et orientées action
