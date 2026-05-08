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

Checklist :
- [ ] Lister et lire les skills disponibles (frontend, SEO, perf, etc.)
- [ ] Aller sur https://www.lesecranspastoutletemps.fr/ via WebFetch
- [ ] Aller sur https://www.lesecranspastoutletemps.fr/projet-réalisations via WebFetch
- [ ] Relever la palette exacte (hex de chaque couleur : fond, texte, accent, surfaces, hover)
- [ ] Relever les typos (familles, graisses, tailles) — proposer à Gabriel les équivalents Google Fonts les plus proches
- [ ] Télécharger toutes les images du site Wix (galerie, portraits, affiche, icônes, décorations)
- [ ] Télécharger le PDF de retours Académie Aix-Marseille
- [ ] Présenter à Gabriel un récap : « voici ce que j'ai relevé, voici les équivalents typo que je propose, voici les images récupérées — on valide ? »

**Livrable :** design-tokens documentés (couleurs, typos, espacements) + dossier `/public/images/` + `/public/docs/`
**Gate :** Gabriel valide les tokens et les assets avant de passer à P1.

---

### Phase 1 — Scaffolding technique
**Durée estimée :** 15-20 min
**Objectif :** projet Astro fonctionnel, buildable, déployable (même vide)

Actions :
- [ ] `npm create astro@latest` avec TypeScript strict
- [ ] Installer et configurer Tailwind CSS
- [ ] Installer `@astrojs/sitemap`
- [ ] Créer le `tailwind.config.mjs` avec les design tokens de P0
- [ ] Créer `Layout.astro` (HTML minimal, `<head>` propre, slot)
- [ ] Créer `SEO.astro` (composant props : title, description, og, jsonLd, canonical)
- [ ] Créer `robots.txt` et configurer le sitemap
- [ ] Configurer les fonts (auto-hébergement ou Fontsource, font-display: swap)
- [ ] Vérifier que `npm run build` passe sans erreur
- [ ] Vérifier que `npm run dev` affiche une page blanche propre

**Livrable :** projet buildable avec `Layout.astro`, `SEO.astro`, design tokens, fonts chargées
**Gate :** `npm run build` OK.

---

### Phase 2 — Header, Footer, CTA
**Durée estimée :** 15-20 min
**Objectif :** les éléments communs à toutes les pages, fidèles au design Wix

Actions :
- [ ] `Header.astro` — navigation identique au site actuel (liens, wordmark, responsive burger si besoin)
- [ ] `Footer.astro` — copyright, contact, email, fidèle au footer Wix actuel
- [ ] `Cta.astro` — bouton « Réserver le spectacle » réutilisable, style identique au site actuel
- [ ] Vérifier le responsive mobile-first (le header actuel est minimaliste, ne pas le compliquer)
- [ ] Navigation clavier + focus visible

**Livrable :** header + footer + CTA visibles sur la page de dev, identiques au site actuel
**Gate :** comparaison visuelle côte-à-côte avec le site Wix — Gabriel valide.

---

### Phase 3 — Page d'accueil (`/`)
**Durée estimée :** 30-45 min (page la plus dense)
**Objectif :** reproduire à l'identique la page d'accueil Wix, section par section

Sections dans l'ordre exact du site actuel :
- [ ] Hero (Béatrice & Samy + tagline)
- [ ] Présentation des 2 spectacles (6-9 ans / 9-12 ans)
- [ ] Vignettes équipe (photos Béatrice, Samy, scène, sticker)
- [ ] Description du spectacle (30+30 min, participation active)
- [ ] Galerie photos (6 visuels carrés)
- [ ] Témoignages « Ils ont aimé » (4 avis)
- [ ] Mention Béatrice HERRERO + lien vers PDF Académie
- [ ] Bloc Contact (Marseille, tel, email)
- [ ] JSON-LD : PerformingGroup + WebSite
- [ ] `<title>` + `<meta description>` + Open Graph conformes au tableau SEO du PROJECT.md
- [ ] Lighthouse ≥ cibles

**Livrable :** page `/` complète, identique visuellement au site actuel
**Gate :** Gabriel compare et valide. Lighthouse OK.

---

### Phase 4 — Pages secondaires
**Durée estimée :** 30-45 min
**Objectif :** créer les 5 pages restantes

Par ordre de priorité :
1. [ ] `/spectacle-6-9-ans` — description dédiée, FAQ, CTA réservation, JSON-LD Event + FAQPage
2. [ ] `/spectacle-9-12-ans` — idem, contenu adapté à la tranche d'âge
3. [ ] `/contact` — formulaire (Formspree/Web3Forms/mailto selon choix Gabriel), JSON-LD LocalBusiness
4. [ ] `/projet-realisations` — reproduire le contenu de la page Wix existante
5. [ ] `/a-propos` — Béatrice & Samy, JSON-LD PerformingGroup
6. [ ] `/mentions-legales` — texte standard (hébergeur, éditeur, RGPD minimal)

Pour chaque page :
- [ ] `<title>` + `<meta>` conformes au tableau SEO
- [ ] JSON-LD spécifique
- [ ] H1 unique contenant le mot-clé principal
- [ ] CTA « Réserver le spectacle » en fin de page
- [ ] BreadcrumbList JSON-LD
- [ ] Lighthouse ≥ cibles

**Livrable :** toutes les pages en place avec contenu, SEO, et données structurées
**Gate :** Gabriel valide page par page. Lighthouse OK sur chacune.

---

### Phase 5 — SEO final + qualité
**Durée estimée :** 20-30 min
**Objectif :** peaufiner tout ce qui est invisible mais critique

Actions :
- [ ] Vérifier toutes les données structurées via https://validator.schema.org/ (ou Rich Results Test)
- [ ] Vérifier tous les `alt` d'images (descriptifs, orientés contenu, pas de noms de fichiers)
- [ ] Vérifier le `sitemap.xml` généré (toutes les pages présentes, pas de route technique)
- [ ] Vérifier `robots.txt`
- [ ] Vérifier les Open Graph de chaque page (og:title, og:description, og:image)
- [ ] Vérifier les canonicals
- [ ] Tester les liens internes (aucun 404)
- [ ] Audit accessibilité : contrastes AA, labels de formulaire, navigation clavier complète, skip-to-content
- [ ] Audit Lighthouse final sur chaque page — capture des scores
- [ ] Ajouter la balise `google-site-verification` (Gabriel fournit le code depuis Search Console)
- [ ] Ajouter le script analytics (Plausible/Umami) si Gabriel a choisi

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
