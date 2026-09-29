# NoyaFin360 — Système de design

[English](./design-system.md) · Français

Le langage visuel définitif. Les tokens sont implémentés dans `src/variables.css` ; ce document en explique l'intention et les règles d'usage.

## Identité en une phrase

Une interface **cinématique, centrée sur l'affiche** : un canevas quasi-noir froid, des backdrops immersifs voilés de dégradés, un verre discret, et une signature periwinkle→indigo réchauffée par des accents champagne. Premium et calme — l'inverse du fouillis visuel, et pas un clone de Netflix.

## Principes de design

1. **L'artwork mène.** Affiches et backdrops sont les héros ; l'habillage s'efface.
2. **La profondeur par la lumière, pas les traits.** Élévation par surfaces superposées, dégradés et ombres douces ; bordures parcimonieuses.
3. **Mouvement calme.** Transitions courtes, uniquement transform/opacity ; rien ne boucle.
4. **Le focus est une fonctionnalité.** Chaque élément interactif est net au clavier et au D-pad.
5. **Un seul système, tous les écrans.** Les mêmes tokens s'adaptent du mobile à la TV via des échelles fluides et les classes de layout.
6. **Indépendant de la langue et du moteur.** Aucun sélecteur basé sur le texte ; dégradation gracieuse sur moteurs faibles.

## Deux dialectes, un seul système

NoyaFin360 parle deux dialectes liés qui partagent **un** jeu de tokens (couleurs, radii, typographie, boutons, inputs, focus, espacements, surfaces, feedback) :

- **Média** — immersif, cinématique, centré affiche : backdrops, verre discret, voiles en dégradé, mouvement piloté par le focus.
- **Admin / réglages** — sobre, structuré, niveau SaaS premium : surfaces opaques, tables/formulaires denses, mouvement minimal, **aucun** flou/backdrop cinéma.

Mêmes tokens, intensité et registre de mise en page différents. L'admin n'hérite jamais des effets média. Dans les deux cas : ne jamais masquer de fonctionnalité ; accessibilité et accès D-pad/clavier d'abord.

## Couleur

Le sombre est la fondation, et le thème principal est **dark-only** — il ne bascule jamais en clair selon `prefers-color-scheme` de l'OS. Une variante claire reste *possible* en opt-in futur (`:root[data-theme="light"]`) mais ne fait pas partie du thème principal. La rampe d'encre (`--nf-ink-1000` … `--nf-ink-400`) est un quasi-noir **froid et désaturé**, jamais `#000` pur, pour laisser respirer l'image.

| Rôle | Token | Usage |
|---|---|---|
| Canevas | `--nf-bg` | Fond de page |
| Surface | `--nf-surface` | Cartes, panneaux |
| Élevé | `--nf-surface-elevated` | Menus, popovers, cartes surélevées |
| Verre | `--nf-surface-overlay` | En-tête/tiroir sur le contenu (flou + fallback) |
| Voile | `--nf-surface-scrim` | Derrière dialogues/backdrops |
| Primaire | `--nf-brand-primary` | Focus, actions principales, nav active |
| Secondaire | `--nf-brand-secondary` | Notes, accents premium discrets |
| Texte | `--nf-text` / `-muted` / `-faint` | Hiérarchie du texte |

**Contraste :** le texte courant atteint WCAG AA sur chaque token de surface. Le champagne est réservé aux accents/grand texte, jamais au petit texte courant sur fond sombre.

## Typographie

Le thème est **indépendant de la police** — il hérite de la famille Jellyfin et ne fixe que l'échelle, la graisse, l'interligne et l'espacement. Une échelle fluide (`--nf-text-xs` … `--nf-text-hero`) via `clamp()` fait respirer les titres sur desktop/TV et les garde compacts sur mobile.

## Espacement & mise en page

- Échelle d'espacement base 4px (`--nf-space-1` … `--nf-space-16`).
- Gouttière de page consciente des safe areas (`--nf-gutter-inline-start/-end`).
- Largeur max `--nf-content-max` pour éviter l'étirement des rails en ultrawide/TV.
- Propriétés logiques (`*-inline`, `*-block`) partout pour le RTL.

## Rayons & élévation

- Échelle `--nf-radius-xs` … `--nf-radius-xl` + `--nf-radius-pill`. Cartes en `--nf-radius-md` ; overlays en `--nf-radius-lg`.
- Trois niveaux d'ombre (`sm` / `card` / `raised`) plus `--nf-shadow-focus`. Ombres douces et sombres ; pas de halos colorés par défaut.

## Verre & flou (fallback d'abord)

Les surfaces de verre utilisent `--nf-surface-overlay` + `backdrop-filter: blur(var(--nf-blur))`. Chaque règle de verre **doit** fournir un fallback opaque (`--nf-glass-fallback`) pour que les moteurs non compatibles (Jellyfin Media Player, vieilles TV) gardent une surface lisible. Flou discret : rayon modéré, petite surface, jamais plein écran permanent.

## Mouvement

- Durées : `fast` (140ms) pour les états, `normal` (220ms) pour les transitions, `slow` (360ms) pour les entrées.
- Easings : `standard` par défaut, `emphasized` pour le pop de focus/hover, `exit` pour les fermetures.
- **Seuls `transform`/`opacity` s'animent.** Jamais `transition: all`, jamais de propriétés de layout.
- Tout mouvement s'effondre sous `prefers-reduced-motion` (géré dans `accessibility.css`).

## Système de focus (TV & clavier, prioritaire)

- Clavier : `:focus-visible` peint `--nf-focus-ring-*` (dans `accessibility.css`).
- TV : `:root.layout-tv` épaissit l'anneau ; les cartes s'agrandissent via `--nf-focus-scale-tv`.
- Hooks : `.card.show-focus` / `.card:focus` de Jellyfin (vérifiés) pilotent le focus des cartes ; NoyaFin360 restyle la transformation et l'anneau, jamais la détection.
- Le focus ne doit jamais être rogné — les modules gardent le contexte d'empilement et l'overflow dégagés.

## Backdrops cinématiques

- `--nf-gradient-backdrop` : voile bas→haut pour la lisibilité des titres sur l'art (accueil/héros).
- `--nf-gradient-hero` : voile ancré à gauche pour les pages de détail.
- `--nf-gradient-brand` : voile de marque parcimonieux pour les rails/accents actifs.
- Backdrops en `--nf-z-backdrop` ; contenu au-dessus en `--nf-z-content`.

## Échelle de z-index

`backdrop (0) < content (10) < header (100) < drawer (200) < overlay (300) < dialog (400) < toast (500)` via `--nf-z-*`. Les modules doivent utiliser ces tokens, jamais des valeurs arbitraires.

## Correspondance avec les variables Jellyfin 12

Quand piloter un composant MUI natif coûte moins qu'un sélecteur profond, les modules mappent les tokens NoyaFin360 vers les variables `--jf-*` de Jellyfin (voir `jellyfin-selectors.md`), ex. `--jf-palette-primary-main: var(--nf-brand-primary)`. Ce mapping vit dans les couches composants (Phase 2+), pas dans le fichier de tokens.

## À faire / À éviter

**À faire :** utiliser les tokens ; tester le focus TV + les safe areas mobiles ; fournir des fallbacks de flou ; animer transform/opacity.
**À éviter :** coder en dur couleurs/flou ; sélecteurs par texte ; `transition: all` ; `!important` non documenté ; copier le look d'un autre thème.
