# Projet — Refonte du site « Les écrans pas tout le temps »

## Objectif

Refaire **from scratch** le site `lesecranspastoutletemps.fr`, actuellement hébergé sur **Wix Premium**, pour le migrer vers une stack moderne, performante, et SEO-friendly. Le but est de **se séparer définitivement de Wix** tout en :

1. **Conservant l'identité visuelle actuelle** (cohérence pour les propriétaires)
2. **Améliorant significativement le SEO** (le site actuel ne remonte sur aucune requête Google)
3. **Améliorant l'UX** (le site Wix actuel est lourd, peu structuré, pauvre en hiérarchie d'information)

---

## Contexte du site

- **Sujet :** Spectacle théâtral participatif et humoristique sur le thème (sérieux) des écrans
- **Format :** 30 min de spectacle + 30 min de débat avec participation active des élèves
- **Deux versions :** 6-9 ans / 9-12 ans
- **Artistes :** Béatrice (autrice, direction artistique, comédienne) & Samy (comédien)
- **Localisation :** Marseille (06 73 15 85 08, lesecranspastoutletemps@gmail.com)
- **Cibles commerciales :** Écoles, médiathèques, mairies, centres sociaux, comités d'entreprise, académies
- **Référence existante :** Académie d'Aix-Marseille (analyse PDF disponible)

---

## Stack technique imposée

- **Framework :** Astro (statique par défaut, parfait pour SEO + perf, faible empreinte JS)
- **Styling :** Tailwind CSS
- **Langue :** Français uniquement
- **Hébergement cible :** Cloudflare Pages ou Vercel (à décider, gratuit prioritaire)
- **Domaine :** `lesecranspastoutletemps.fr` (récupération depuis Wix prévue ultérieurement, hors scope dev)
- **Pas de CMS :** contenu en Markdown (`/src/content/`) ou en dur dans les composants. Les propriétaires ne modifient pas le site eux-mêmes.
- **Pas de framework JS lourd :** pas de React, pas de Next, pas de Vue. Astro + îlots minimaux uniquement si nécessaire.

**Justification :** Astro produit du HTML statique pur, ce qui maximise la vitesse, le SEO, et minimise le coût d'hébergement. Aucune base de données, aucun backend.

---

## Arborescence cible

```
/                           (Accueil)
/spectacle-6-9-ans          (Page dédiée 6-9 ans)
/spectacle-9-12-ans         (Page dédiée 9-12 ans)
/projet-realisations        (Projet & réalisations — existe déjà sur Wix)
/contact                    (Réservation / devis)
/a-propos                   (Béatrice & Samy)
/mentions-legales
```

**Important :** ne PAS créer plus de pages que ça. Garder une structure simple.

---

## Identité visuelle — fidélité maximale au site actuel

⚠️ **Contrainte forte : le design doit rester quasi-identique au site Wix actuel.** Les propriétaires (Béatrice & Samy) ne doivent pas être dépaysés. La refonte est **technique et SEO**, pas une refonte graphique. Toute amélioration visuelle est tolérée uniquement si elle reste invisible pour un œil non-averti.

### Méthode obligatoire avant de coder le moindre composant

1. **Aller sur https://www.lesecranspastoutletemps.fr/ et `/projet-réalisations`** via WebFetch (ou navigateur si dispo)
2. **Extraire et reproduire à l'identique** :
   - Palette de couleurs exacte (relever les hex via DevTools — fond, texte, accent jaune, surfaces, boutons, états hover/focus)
   - Familles de polices utilisées par Wix (relever via DevTools `computed style`) et trouver les équivalents libres les plus proches sur Google Fonts / Fontsource. Si l'équivalent exact n'existe pas, **demander à Gabriel** avant de trancher.
   - Tailles de police, line-height, letter-spacing des titres et du corps
   - Espacements verticaux entre sections, paddings, gouttières
   - Style et radius des boutons, des cartes, des séparateurs
   - Ratios d'images, layouts en grille, ordre exact des sections
   - Comportement responsive (où ça passe en colonne sur mobile)
3. **Ne RIEN inventer** sur la direction artistique. Si une décision est ambiguë, **demander à Gabriel** plutôt que choisir.

### Repères visuels déjà relevés du site actuel

- **Accent principal :** jaune `#F8E71C` (présent dans le code SVG Wix — à valider en DevTools, certaines variantes peuvent exister)
- **Texte principal :** `#1C1C1C`
- **Wordmark :** « LES ECRANS PAS TOUT LE TEMPS ! » en majuscules, pas de logo iconographique
- **Sections de la page d'accueil dans leur ordre actuel — à reproduire à l'identique :**
  1. Hero (Béatrice & Samy + tagline « Les écrans pas tout le temps ! »)
  2. Présentation : « 2 spectacles participatifs à destination des enfants de 6 à 9 ans et de 9 à 12 ans »
  3. Vignettes équipe (Béatrice / Samy / scène / sticker)
  4. Description du spectacle (30 min + 30 min de débat, participation active)
  5. Galerie photos (6 visuels carrés)
  6. Témoignages « Ils ont aimé » (4 avis)
  7. Mention Béatrice HERRERO + lien vers l'analyse PDF Académie Aix-Marseille
  8. Bloc Contact (Marseille, téléphone, email)
  9. Footer copyright

### Photos et assets

- **Récupérer les images depuis le site Wix** (`static.wixstatic.com/...`) et les **re-héberger** sur le nouveau site
- Optimiser en WebP/AVIF avec fallback, mais **ne pas recadrer ni retoucher** sans accord
- Demander à Gabriel les versions haute résolution si possible (Wix sert souvent des images redimensionnées à la volée)
- Le PDF de retours de l'Académie d'Aix-Marseille doit être récupéré et rehébergé sur `/public/docs/`

---

## Exigences SEO (critiques)

Le site Wix actuel est invisible sur Google. La refonte doit corriger ça dès le déploiement.

### Pages — `<title>` et `<meta description>` à utiliser

| Route | Title | Meta description |
|---|---|---|
| `/` | Les écrans pas tout le temps – Spectacle écrans pour enfants 6-12 ans | Spectacle participatif et humoristique sur les écrans pour les enfants de 6 à 12 ans. Intervention en école, médiathèque, centre social. Béatrice & Samy. |
| `/spectacle-6-9-ans` | Spectacle 6-9 ans sur les écrans – Théâtre participatif en école | Un spectacle pédagogique de 30+30 min pour sensibiliser les 6-9 ans aux écrans, avec leur participation active. |
| `/spectacle-9-12-ans` | Spectacle 9-12 ans sur les écrans – Théâtre participatif en collège | Un spectacle pédagogique participatif pour aborder le numérique avec les CM1-6e. |
| `/projet-realisations` | Projet & réalisations – Les écrans pas tout le temps | Découvrez le projet pédagogique du spectacle, ses réalisations et les retours de l'Académie d'Aix-Marseille. |
| `/contact` | Réserver le spectacle Les écrans pas tout le temps – Contact | Réservez le spectacle pour votre école, médiathèque, ville ou comité d'entreprise. Devis sous 48h. |
| `/a-propos` | Béatrice & Samy – La compagnie derrière Les écrans pas tout le temps | Béatrice et Samy, le duo de théâtre à l'origine du spectacle participatif sur les écrans. |

### Mots-clés cibles prioritaires

- spectacle écrans enfants
- spectacle prévention écrans école
- intervention scolaire écrans
- spectacle participatif enfants 6 ans
- animation médiathèque écrans
- spectacle pédagogique écrans Marseille

### Données structurées (JSON-LD) requises

Implémenter dans `<head>` via un composant Astro réutilisable :

1. **`PerformingGroup`** sur `/` et `/a-propos` (Béatrice & Samy, comédiens)
2. **`WebSite`** sur `/` (avec `potentialAction` SearchAction si recherche un jour)
3. **`TheaterEvent`** ou **`Event`** sur `/spectacle-6-9-ans` et `/spectacle-9-12-ans` (description, audience, performer, organizer)
4. **`LocalBusiness`** sur `/contact` (Marseille, téléphone, email)
5. **`BreadcrumbList`** sur toutes les pages internes

### Hiérarchie HTML

- **Un seul `<h1>` par page**, contenant le mot-clé principal
- `<h2>` pour les sections, `<h3>` pour les sous-sections
- Toutes les images : `alt` descriptif et orienté contenu (ex. `alt="Béatrice en scène pendant le rap participatif avec les élèves"`), **jamais** de `alt` vide ni de noms de fichiers Wix.

### Performance (cibles Lighthouse)

- **Performance :** ≥ 95
- **SEO :** 100
- **Accessibilité :** ≥ 95
- **LCP < 1.5s** sur 4G
- Images en `WebP` (et fallback si besoin), `loading="lazy"` sauf pour le hero, `width`/`height` toujours définis pour éviter le CLS
- Pas de JS bloquant. Pas de Google Fonts en `<link>` synchrone — soit en local soit en `font-display: swap`.
- `sitemap.xml` généré automatiquement (intégration Astro `@astrojs/sitemap`)
- `robots.txt` propre, autorise tout sauf le routing technique éventuel

### Tracking minimaliste

- **Plausible** ou **Umami** (RGPD-friendly, pas de cookie banner) — à ajouter en option, demander à Gabriel
- **Pas** de Google Analytics par défaut
- **Google Search Console** : prévoir une balise meta de validation à coller (`google-site-verification`). Le site est déjà vérifié par `julialarchet@gmail.com` côté Wix — il faudra re-vérifier le nouveau domaine après migration.

---

## Exigences UX (améliorations vs Wix actuel)

Le site Wix actuel a plusieurs faiblesses à corriger :

1. **CTA quasi inexistant.** Ajouter un CTA principal **« Réserver le spectacle »** visible dès le hero, puis répété en fin de chaque page, qui pointe vers `/contact`.
2. **Public cible peu adressé.** Créer des sections explicites pour chaque type de client (écoles, médiathèques, mairies, comités d'entreprise) avec leur vocabulaire métier.
3. **Pas de FAQ.** Ajouter une section FAQ sur `/spectacle-6-9-ans` et `/spectacle-9-12-ans` avec les questions évidentes : durée, âge, matériel requis, espace nécessaire, tarifs (ou « sur devis »), zones de tournée, modalités de réservation. Marquer la FAQ avec **JSON-LD `FAQPage`**.
4. **Avis dispersés.** Regrouper les témoignages dans une section dédiée avec citation propre, attribution si possible (« Enseignante CM2, Marseille »), et marquage **JSON-LD `Review`** ou **`AggregateRating`** uniquement si les sources sont vérifiables.
5. **Mobile.** Le site doit être pensé **mobile-first**. Beaucoup d'enseignants consultent depuis leur téléphone.
6. **Accessibilité.** Contrastes AA, navigation clavier, focus visibles, formulaire de contact avec `<label>` explicites, pas de carrousel auto-rotatif.

---

## Formulaire de contact

- Champs : Nom, Email, Type de structure (école / médiathèque / mairie / centre social / comité d'entreprise / autre), Ville, Date(s) souhaitée(s), Effectif estimé, Message
- **Pas de backend custom.** Utiliser **Formspree**, **Web3Forms**, ou un `mailto:` propre comme fallback. Demander à Gabriel sa préférence.
- Anti-spam : honeypot, pas de reCAPTCHA si possible (RGPD)
- Confirmation après envoi sur la même page, sans redirection externe

---

## Contraintes & non-objectifs

- ❌ **Pas de blog** pour l'instant (à envisager plus tard si besoin SEO)
- ❌ **Pas de système de réservation en ligne** (devis manuel par email)
- ❌ **Pas de paiement** intégré
- ❌ **Pas de multilingue**
- ❌ **Pas d'admin / CMS** — le contenu est édité par Gabriel via Markdown / commits Git
- ✅ Le site doit pouvoir être déployé via un simple `git push` sur la branche `main`
- ✅ Toutes les images doivent être servies depuis le domaine final, pas depuis `static.wixstatic.com`

---

## Skills Claude Code à utiliser systématiquement

Gabriel a installé des skills dans son environnement Claude Code. **Ne pas hésiter à les invoquer** dès que le contexte s'y prête — c'est explicitement encouragé. Au lancement de chaque tâche significative, parcourir le registre de skills disponibles et invoquer ceux qui s'appliquent.

Cas typiques où un skill devrait être consulté avant d'écrire du code :

- **Frontend / design system / composants Astro** → invoquer le skill frontend (ex. `frontend-design`) avant de poser le moindre composant visuel. Lire le `SKILL.md`, suivre ses conventions (tokens, patterns, contraintes), puis seulement coder.
- **SEO** → si un skill SEO existe, l'invoquer avant d'écrire les balises `<head>`, le JSON-LD, le sitemap, le robots.txt. Le contenu du présent document complète le skill, il ne le remplace pas.
- **Performance / Lighthouse / Web Vitals** → consulter avant les optimisations d'images, de fonts, de critical CSS.
- **Accessibilité** → invoquer pour les patterns d'accessibilité (focus visible, ARIA, contrastes, navigation clavier).
- **Markdown / contenu** → si un skill rédactionnel existe (FR, ton, longueur), s'en servir pour les textes des pages.

**Méthode :**
1. Au début d'une tâche, faire un `tool_search` ou lister les skills disponibles
2. Lire le `SKILL.md` de chaque skill pertinent **avant** de produire quoi que ce soit
3. Citer brièvement quels skills ont été utilisés dans le commit ou la réponse, pour que Gabriel puisse tracer

Si un skill et le présent document se contredisent, **le présent document fait foi** mais signaler la contradiction à Gabriel.

---

## Livrables attendus de Claude Code

1. **Initialisation du projet Astro + Tailwind** avec configuration TypeScript stricte
2. **Composants réutilisables** : `Layout.astro`, `SEO.astro` (titre/meta/JSON-LD/OG), `Header.astro`, `Footer.astro`, `Cta.astro`, `Faq.astro`, `Testimonial.astro`
3. **Toutes les pages listées** dans l'arborescence, avec contenu rédigé (à valider ensuite avec Béatrice)
4. **`sitemap.xml`**, **`robots.txt`**, **`favicon`**, **manifest** minimal
5. **Données structurées** sur chaque page, validées via [Schema.org Validator](https://validator.schema.org/)
6. **README.md** expliquant comment éditer le contenu, ajouter une page, ajouter une image, déployer
7. **`.github/workflows/`** avec un workflow CI minimal (build + check des liens cassés)

---

## Méthode de travail attendue

1. **Commencer par poser les questions critiques** avant de générer du code (typographies, fournisseur de formulaire, hébergeur cible si Gabriel n'a pas tranché, ton souhaité — plutôt institutionnel ou plutôt joyeux/théâtral)
2. **Itérer page par page** plutôt que tout générer d'un coup
3. **Demander les images / contenus** plutôt que d'inventer du faux contenu (lorem ipsum interdit en prod)
4. **Tester Lighthouse** à chaque étape clé et corriger avant d'avancer
5. **Commits atomiques et descriptifs** en français

---

## Informations utiles

- Coordonnées propriétaires : Béatrice (06 73 15 85 08, lesecranspastoutletemps@gmail.com)
- PDF de retours Aix-Marseille : présent sur le site Wix actuel, à récupérer et héberger sur le nouveau site (`/public/docs/retours-academie-aix-marseille.pdf`)
- Compte Search Console actuel : `julialarchet@gmail.com` (Béatrice)
- Gabriel n'est pas propriétaire du domaine ni du compte Wix : prévoir une procédure claire de récupération du domaine au moment de la mise en ligne (changement de NS / transfert de registrar)

---

## Note sur le pivot par rapport au plan SEO initial

Un kit SEO complet avait été préparé pour optimiser le site **dans Wix** (titles, meta, JSON-LD, alt text, annuaires culturels, sitemaps, etc.). Le travail pertinent (titles, meta, JSON-LD, mots-clés cibles, hiérarchie Hn, alt text) est **réutilisé tel quel dans cette refonte** ; ce qui devient caduc est uniquement la partie « comment cliquer dans Wix ». Les annuaires culturels (Offi.fr, Spectable, Agendaculturel.fr, Billetreduc, Que Faire à Paris) restent à soumettre **après** la mise en ligne du nouveau site.
