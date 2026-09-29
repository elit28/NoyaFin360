# Architecture

[English](./architecture.md) · Français

## Objectif

Conserver NoyaFin360 modulaire, auditable et résistant aux mises à jour Jellyfin.

## Couches sources (ordre = `src/theme.css`)

1. Tokens de design — `src/variables.css` (seul endroit où les valeurs sont définies)
2. Fondation globale — `src/base.css` (reset léger, base de scoping, fond/texte)
3. Typographie
4. Navigation (app bar, tiroir, onglets)
5. Accueil (sections, rails, backdrop)
6. Cartes
7. Pages de détail (film, série, saison, épisode)
8. Dialogues / formulaires
9. Lecture (OSD vidéo + audio)
10. Live TV
11. Administration
12. Ajustements responsive (par composant, pas des rustines)
13. Accessibilité — **source unique** pour `prefers-reduced-motion` et la visibilité globale du focus clavier/D-pad (non dupliquée dans `base.css`)

Une couche tardive peut affiner une couche antérieure, jamais contredire les tokens.

## Périmètre & dialectes

Le périmètre final obligatoire de NoyaFin360 couvre toutes les parties de Jellyfin
accessibles au Custom CSS (média, réglages utilisateur, administration). Deux
dialectes partagent un même jeu de tokens : **média** (immersif/cinématique) et
**admin** (sobre, niveau SaaS — sans flou/backdrop cinéma). Ne jamais masquer de
fonctionnalité. Voir `roadmap.fr.md` pour la carte de couverture et
`design-system.fr.md` pour les dialectes.

## Stratégie de scoping (vérifiée pour Jellyfin 12)

Le même Custom CSS peut se charger sous l'app Modern **ou** Legacy. Pour protéger Legacy et les particularités natives :

- **Règles sûres globalement** (tokens, reduced-motion, focus) : sans scope.
- **Règles structurelles Modern uniquement** : conditionnées au shell React Modern :
  ```css
  :root:has(.MuiAppBar-root) { /* Modern uniquement */ }
  ```
- **Règles par appareil** : conditionnées aux classes de layout que Jellyfin place sur `<html>` :
  `:root.layout-desktop`, `:root.layout-mobile`, `:root.layout-tv`.
- `:has()` est une amélioration, pas une dépendance — tout ce qui est structurant sur
  moteurs faibles (Jellyfin Media Player, vieilles TV) doit aussi fonctionner sans.

Voir `jellyfin-selectors.md` pour l'inventaire vérifié et `platform-risks.fr.md`
pour les règles de dégradation.

## Discipline des sélecteurs

- Seuls les sélecteurs consignés dans `jellyfin-selectors.md` (vérifiés dans la
  source Jellyfin actuelle) sont autorisés.
- Préférer classes stables, variables `--jf-*`, `.layout-*`, classes **root** MUI.
- Jamais de classes hachées emotion, de texte visible, ni de chaînes positionnelles profondes.
- Documenter chaque `!important` nécessaire.

## Correspondance token → Jellyfin

Les couches composants peuvent mapper les tokens `--nf-*` vers les variables `--jf-*`
de Jellyfin pour piloter les composants MUI natifs sans sélecteurs profonds. Ce
mapping vit dans les modules composants, gardant `variables.css` agnostique.

## Sorties générées

`npm run build` utilise **lightningcss** pour bundler `src/theme.css` (résout les
`@import`), valider la syntaxe, préfixer/abaisser pour les moteurs cibles, et écrire :

- `dist/theme.css` — bundle lisible, préfixé
- `dist/theme.min.css` — minifié, cible de l'installation en une ligne

Un CSS invalide fait échouer le build. Ne pas éditer `dist/` à la main. Décision
et compromis : `build.md`.

## Règle

Garder la propriété évidente. Une correction spécifique à un composant appartient
au module de ce composant, jamais à un fichier sans rapport sous prétexte qu'il surcharge.
