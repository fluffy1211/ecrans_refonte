# Workflow & Planning — Refonte lesecranspastoutletemps.fr

## Rôle de Claude

Tu es le développeur principal de ce projet. Gabriel te donne les directives, valide les rendus, et fournit les assets. Tu exécutes de façon autonome, tu ne perds pas de temps en explications théoriques, et tu respectes le planning ci-dessous à la lettre.

---

## Règles de fonctionnement

### Discipline de session

- **Au début de chaque session de travail**, rappeler à Gabriel :
  1. Quelle phase on attaque (numéro + nom)
  2. Ce qui a été fait à la session précédente
  3. Ce qui reste à faire dans la phase en cours
- **Ne jamais démarrer une nouvelle phase sans validation explicite de Gabriel** sur la phase précédente.
- **Ne jamais sauter une phase.** Si une phase est bloquée (ex. assets manquants), lister les blocages, proposer ce qu'on peut avancer en parallèle, et attendre.

### Discipline de code

- **Consulter les skills disponibles** avant chaque phase. Lire les `SKILL.md` pertinents. C'est obligatoire, pas optionnel.
- **Commits en français**, atomiques, préfixés par la phase : `[P1] init astro + tailwind`, `[P3] page accueil — hero + présentation`, etc.
- **Pas de lorem ipsum, pas de contenu placeholder en prod.** Si le contenu manque, mettre un commentaire `<!-- CONTENU MANQUANT : description -->` et le signaler comme blocage.
- **Pas de sur-ingénierie.** C'est un site vitrine de 6 pages. Pas de système de composants abstraits à 3 niveaux. Simple, lisible, maintenable.
- **Tester Lighthouse après chaque page terminée.** Si un score est sous la cible (Perf ≥95, SEO 100, A11y ≥95), corriger avant de passer à la suite.

### Discipline de communication

- **Réponses courtes et orientées action.** Pas de blabla. Gabriel préfère « voilà ce que j'ai fait / voilà ce qui bloque / voilà la prochaine étape ».
- **Si tu es bloqué sur un choix** (typo, couleur ambiguë, asset manquant, choix technique), poser la question une seule fois, clairement, avec les options, et attendre.
- **Recap de fin de session** : lister les fichiers créés/modifiés, ce qui est fait, ce qui reste, les blocages éventuels.

---

## Planning en 7 phases

Estimation totale : ~3-4 sessions de travail avec Claude Code.

---

### Phase 0 — Préparation (avant de coder)
**Durée estimée :** 15-20 min
**Objectif :** avoir tout ce qu'il faut pour démarrer sans interruption
**✅ TERMINÉE — 2026-05-08**

Checklist :
- [x] Lister et lire les skills disponibles (frontend, SEO, perf, etc.)
- [x] Aller sur https://www.lesecranspastoutletemps.fr/ via WebFetch
- [x] Aller sur https://www.lesecranspastoutletemps.fr/projet-réalisations via WebFetch
- [x] Relever la palette exacte — accent `#F8E71C`, texte `#1C1C1C` (fond et typos : placeholder)
- [~] Relever les typos — **placeholder Raleway/Nunito** (Wix ne les expose pas via WebFetch — à confirmer en DevTools)
- [x] Télécharger toutes les images du site Wix → `public/images/` (15 fichiers)
- [x] Télécharger le PDF de retours Académie Aix-Marseille → `public/docs/`
- [x] Contenu textuel extrait → `content-inventory.md`

**Livrable :** ✅ design-tokens partiels + `public/images/` + `public/docs/`
**Gate :** ✅ validé — Gabriel a dit « Met des placeholders, tu peux commencer »

---

### Phase 1 — Scaffolding technique
**Durée estimée :** 15-20 min
**Objectif :** projet Astro fonctionnel, buildable, déployable (même vide)
**✅ TERMINÉE — 2026-05-08 — commit `35fbe56`**

Actions :
- [x] Astro 5 + TypeScript strict (initialisé manuellement, dossier non-vide bloquait le CLI)
- [x] Installer et configurer Tailwind CSS (`@astrojs/tailwind`)
- [x] Installer `@astrojs/sitemap`
- [x] Créer le `tailwind.config.mjs` avec les design tokens de P0
- [x] Créer `Layout.astro` (HTML minimal, `<head>` propre, fonts Google, slot)
- [x] Créer `SEO.astro` (title, meta, OG, JSON-LD, canonical)
- [x] Créer `robots.txt` et configurer le sitemap
- [~] Fonts : placeholder Google Fonts (Raleway + Nunito) — **à remplacer quand typos Wix confirmées**
- [x] `npm run build` ✓
- [x] `astro check` : 0 erreurs, 0 warnings

**Livrable :** ✅ projet buildable
**Gate :** ✅ `npm run build` OK

---

### Phase 2 — Header, Footer, CTA
**✅ TERMINÉE — 2026-05-08 — commit `8c9d5ab`**

- [x] `Header.astro` — wordmark, nav desktop, burger mobile (aria, ESC, focus-visible, skip-link)
- [x] `Footer.astro` — fond sombre, coordonnées, copyright, liens secondaires
- [x] `Cta.astro` — bouton réutilisable, variant `primary` (jaune) / `dark`
- [x] `Layout.astro` mis à jour (Header + Footer + main#main-content)
- [x] Navigation clavier + focus visible

**⚠️ À VALIDER :** "THÉÂTRE" dans le menu Wix pointe provisoirement vers `/spectacle-6-9-ans`. Clarifier avec Gabriel si lien unique ou autre structure.

---

### Phase 3 — Page d'accueil (`/`)
**✅ TERMINÉE — 2026-05-08 — commit `dba679b`**

Direction design retenue : théâtre éditorial noir/blanc/jaune.
- [x] Hero sombre + texture étoilée (deco-02.png, screen blend) + décalage jaune derrière l'image
- [x] Présentation 2 spectacles — cartes bordées avec hover dark
- [x] Vignettes équipe (Béatrice, Samy, scène, sticker) — fond sombre
- [x] Description 30+30 — section jaune vif, chiffres géants
- [x] Galerie 6 photos — fond sombre, grille serrée
- [x] Témoignages — bulles BD jaunes avec ombre portée noire, fond blanc
- [x] Mention Béatrice HERRERO + lien PDF Académie
- [x] Bloc contact — fond sombre + texture, coordonnées
- [x] JSON-LD : WebSite + PerformingGroup
- [x] `<title>` + `<meta>` + OG conformes

**⚠️ À VALIDER :** attributions des témoignages (nom/école/ville) — demander à Béatrice.

---

### Phase 4 — Pages secondaires
**✅ TERMINÉE — 2026-05-08 — commit `743ac70`**

- [x] `Faq.astro` — `<details>/<summary>` accessible, icône +/× animée CSS, JSON-LD FAQPage
- [x] `/spectacle-6-9-ans` — synopsis, infos pratiques, 3 photos, FAQ 8 questions, JSON-LD Event+FAQPage+Breadcrumb
- [x] `/spectacle-9-12-ans` — idem, cycle 3, synopsis différent
- [x] `/contact` — formulaire Web3Forms, honeypot, confirmation AJAX, JSON-LD LocalBusiness
- [x] `/projet-realisations` — +90 représentations, 4000 élèves, villes, galerie, lien PDF
- [x] `/a-propos` — bios Béatrice+Samy (à enrichir), JSON-LD PerformingGroup
- [x] `/mentions-legales` — éditeur, hébergeur Cloudflare, RGPD, noindex
- [x] BreadcrumbList JSON-LD sur toutes les pages

**⚠️ ACTIONS REQUISES avant P5 :**
- Gabriel : créer un compte web3forms.com et remplacer `YOUR_ACCESS_KEY` dans `src/pages/contact.astro`
- Béatrice : valider les synopses des spectacles (marqués `<!-- CONTENU À VALIDER -->`)
- Béatrice : enrichir les bios dans `/a-propos` (marquées `<!-- CONTENU MANQUANT -->`)
- Gabriel/Béatrice : portraits HD de Béatrice et Samy (Wix sert des thumbnails ~60px)
- Gabriel : confirmer les typographies via DevTools sur le site Wix (Raleway/Nunito sont des placeholders)

---

### Phase 5 — SEO final + qualité
**Durée estimée :** 20-30 min
**Objectif :** peaufiner tout ce qui est invisible mais critique
**✅ TERMINÉE (code) — 2026-05-08**

Actions :
- [x] Vérifier toutes les données structurées — JSON-LD dans la source (non injecté JS), valide schema.org. ⚠️ Event sans `startDate` = pas de rich results Google (normal pour spectacle sur-devis)
- [x] Vérifier tous les `alt` d'images — ✅ Tous descriptifs et orientés contenu
- [x] Vérifier le `sitemap.xml` — ✅ Corrigé : `/mentions-legales/` exclue du sitemap (noindex)
- [x] Vérifier `robots.txt` — ✅ OK (Allow: /, sitemap référencé)
- [x] Vérifier les Open Graph — ✅ Corrigé : og:image défaut → `hero-beatrice-enfants.jpg` (ancien `og-default.jpg` n'existait pas)
- [x] Vérifier les canonicals — ✅ Cohérents avec trailing slash (matching sitemap)
- [x] Tester les liens internes — ✅ Tous valides, aucune page orpheline
- [x] Audit accessibilité — ✅ aria-label sections, focus-visible, labels form, skip-to-content, aria-hidden déco, aria-current nav
- [x] Font Google non-bloquante — ✅ Corrigé : `media="print" onload` pattern (LCP)
- [~] Audit Lighthouse — Bloqué (nécessite navigateur, à faire après déploiement ou en dev local)
- [⏳] Ajouter `google-site-verification` — **Gabriel fournit le code depuis Search Console** → décommenter dans `Layout.astro`
- [⏳] Ajouter analytics — **Gabriel choisit** Plausible ou Umami

**⚠️ ACTIONS REQUISES avant P6 :**
- Gabriel : fournir le code `google-site-verification` depuis Search Console (décommenter 1 ligne dans `Layout.astro`)
- Gabriel : choisir analytics (Plausible / Umami / aucun)

**Livrable :** site 100% prêt techniquement, tous les checks passent
**Gate :** Gabriel fait un dernier tour complet et valide.

---

### Phase 6 — Déploiement + post-migration
**Durée estimée :** 15-20 min (hors DNS qui dépend de Béatrice)
**Objectif :** mettre en ligne

Actions :
- [ ] Déployer sur Cloudflare Pages ou Vercel (selon choix Gabriel)
- [ ] Configurer le domaine custom `lesecranspastoutletemps.fr` (instructions à fournir à Béatrice pour le changement de NS / transfert depuis Wix)
- [ ] Vérifier HTTPS + redirections www → non-www (ou l'inverse)
- [ ] Soumettre le nouveau sitemap dans Google Search Console
- [ ] Vérifier l'indexation (demander l'inspection d'URL sur les pages principales)
- [ ] Écrire le README.md : comment éditer le contenu, ajouter une image, déployer, structure du projet
- [ ] Créer le workflow GitHub Actions : build + check liens cassés

**Post-déploiement (à faire par Gabriel après mise en ligne) :**
- [ ] Soumettre sur les annuaires culturels : Offi.fr, Spectable, Agendaculturel.fr, Billetreduc, Que Faire à Paris
- [ ] Mettre à jour le lien du site sur les réseaux sociaux / signatures email de Béatrice & Samy
- [ ] Surveiller Search Console pendant 2-4 semaines (indexation, erreurs, requêtes)
- [ ] Résilier le forfait Wix Premium une fois le transfert de domaine confirmé

**Livrable :** site en ligne, README, CI
**Gate :** le site est accessible sur `lesecranspastoutletemps.fr` avec HTTPS.

---

## Résumé visuel du planning

```
P0  Préparation         ██░░░░░░░░░░░░░░  ~20min   → tokens + assets
P1  Scaffolding          ████░░░░░░░░░░░░  ~20min   → projet buildable
P2  Header/Footer/CTA      ████░░░░░░░░░░  ~20min   → éléments communs
P3  Page d'accueil            ████████░░░░  ~45min   → page principale
P4  Pages secondaires              ████████ ~45min   → toutes les pages
P5  SEO + qualité                    ██████ ~30min   → audit final
P6  Déploiement                        ████ ~20min   → en ligne
```

---

## Gestion des blocages

Si une phase est bloquée (ex. Gabriel n'a pas fourni un asset ou pris une décision), **ne pas rester inactif** :

| Blocage | Action |
|---|---|
| Images manquantes en haute résolution | Avancer avec les images Wix récupérées, signaler le manque |
| Choix typo non validé | Proposer le meilleur équivalent, marquer `/* TYPO À VALIDER */` |
| Choix fournisseur formulaire non fait | Implémenter un `mailto:` comme fallback, préparer l'intégration Formspree en commentaire |
| Choix hébergeur non fait | Préparer les deux configs (Cloudflare + Vercel), Gabriel tranchera au moment de P6 |
| Contenu textuel manquant pour une page | Écrire une proposition basée sur le contenu Wix existant, marquer `<!-- CONTENU À VALIDER -->` |
| PDF Académie non récupérable | Signaler, laisser un lien placeholder |

---

## Anti-dérive : ce qu'on ne fait PAS

Pour éviter de s'éloigner de l'objectif, voici ce qui est **explicitement hors scope** et ne doit jamais être abordé pendant le projet :

- ❌ Refonte graphique / nouveau design / « et si on essayait un autre style ? »
- ❌ Blog / CMS / système d'articles
- ❌ Système de réservation en ligne / calendrier interactif
- ❌ Multilingue
- ❌ Animations complexes / parallax / transitions de page
- ❌ Intégration de vidéo en autoplay
- ❌ Google Analytics (sauf si Gabriel le demande explicitement)
- ❌ Refactoring de la stack en cours de route (« et si on passait à Next ? »)
- ❌ Ajout de pages non listées dans l'arborescence du PROJECT.md
- ❌ Optimisation prématurée (cache headers, CDN tuning, etc. — ça viendra après si besoin)

**Si Gabriel demande quelque chose qui sort du scope**, accepter mais le taguer comme post-MVP et ne pas le faire dans la session en cours sauf si la phase actuelle est terminée et validée.
