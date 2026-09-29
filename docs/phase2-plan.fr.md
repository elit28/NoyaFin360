# Phase 2 — Navigation principale (plan)

[English](./phase2-plan.md) · Français

La Phase 1 (fondation, sélecteurs, tokens, risques) est terminée. La Phase 2
construit la navigation principale et le système de focus au-dessus des
sélecteurs vérifiés. Elle **ne touche pas** aux pages de détail, à la lecture,
au Live TV ni à l'admin (Phases 3–5).

## Périmètre

App bar/en-tête · navigation principale (tiroir, onglets, vues utilisateur) ·
coquille d'accueil & rails · cartes · système de focus sur tous les appareils.

## Garde-fous (chaque tâche)

- N'utiliser que les sélecteurs de `jellyfin-selectors.md` ; si un nouveau est
  requis, le vérifier dans la source Jellyfin puis l'y consigner.
- Aucun sélecteur basé sur le texte. Règles structurelles Modern via
  `:root:has(.MuiAppBar-root)` ; règles par appareil via `.layout-*`.
- Chaque état hover a un équivalent `:focus-visible` / `.show-focus`.
- Le flou fournit un fallback opaque ; le mouvement est transform/opacity
  uniquement et respecte reduced motion.
- Valider sur desktop, mobile (safe areas) et focus TV avant chaque commit.

## Tâches

### 2.1 — En-tête / app bar (`src/navigation.css`)
- Styler `.MuiAppBar-root` transparent en haut → verre au scroll
  (`.MuiAppBar-colorDefault`), via `--nf-surface-overlay` + flou + fallback.
- Mapper `--jf-palette-AppBar-transparentBg` / `-defaultBg` vers les tokens NoyaFin360.
- Hauteur du `.MuiToolbar-root` dense alignée sur `--nf-header-height` ; padding
  via `.padded-left/.padded-right`.
- En-tête en `--nf-z-header` ; ne jamais rogner le contenu focalisé en dessous.

### 2.2 — Tiroir & onglets
- `.MuiDrawer-paper` en surface de verre élevée (`--nf-surface-elevated`).
- Élément de nav actif en `--nf-brand-primary` / `--nf-brand-primary-soft`.
- `.emby-tabs` / `.emby-tab` : indicateur actif en marque, anneau de focus sur TV.
- Nav des vues utilisateur : focusable, ordre D-pad intact.

### 2.3 — Coquille d'accueil & rails (`src/home.css`)
- Espacement `.homeSectionsContainer` / `.verticalSection` via `--nf-space-*` et
  `--nf-rail-gap`.
- Hiérarchie typographique `.sectionTitleContainer` / `.sectionTitle` (stylée par
  le nœud, jamais par le texte).
- Rails `.emby-scroller` : fondu de bord, alignement `--nf-content-max`,
  `.emby-scrollbuttons` visibles au pointeur seulement.
- Couche backdrop (`.backdropContainer` / `.backdrop` / `.backdropImage`) avec
  `--nf-gradient-backdrop`, en `--nf-z-backdrop`.

### 2.4 — Cartes (`src/cards.css`)
- `.card` / `.cardBox` / `.cardScalable` : rayon `--nf-radius-md`, ombre
  `--nf-shadow-card`, cadrage centré sur l'affiche.
- `.cardImageContainer` / `.cardImage` / `.coveredImage` : couverture propre.
- `.cardOverlayContainer` + `.cardOverlayButton*` : apparition au hover **et** au
  focus ; identifier les boutons par classe/icône, jamais par label.
- `.cardText*` / `.cardFooter*` : métadonnées sobres et lisibles.
- `.cardIndicators` : badges teintés marque.

### 2.5 — Système de focus (transversal)
- Agrandissement focus/hover des cartes via `.card.show-focus` / `.card:focus`
  avec `--nf-focus-scale` (pointeur) et `--nf-focus-scale-tv` (`.layout-tv`).
- Garantir que le focus n'est jamais rogné (audit overflow/empilement rails & cartes).
- Vérifier l'ordre de tabulation clavier et le parcours D-pad en layout TV.

## Livrables

- `src/navigation.css`, `src/home.css`, `src/cards.css` remplis (+ touches
  typographiques) avec sélecteurs vérifiés uniquement.
- Tout nouveau sélecteur ajouté à `jellyfin-selectors.md`.
- `npm run build` produisant `dist/theme.css` + `dist/theme.min.css` à jour.
- Notes avant/après par appareil dans la description de la PR.

## Critères de sortie

En-tête, navigation, rails d'accueil et cartes premium et cohérents sur desktop,
mobile et TV ; focus net et jamais rogné ; aucun sélecteur texte/haché ; layout
Legacy non dégradé ; build propre.
