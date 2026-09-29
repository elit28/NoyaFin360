# Risques par plateforme

Risques que NoyaFin360 doit anticiper. [English](./platform-risks.md) · Français

Le Custom CSS n'atteint que les clients qui **affichent Jellyfin Web**. Une application native avec sa propre interface l'ignore totalement.

## Matrice de rendu des clients

| Client / environnement | Affiche Jellyfin Web ? | Custom CSS appliqué ? | Risques principaux |
|---|---|---|---|
| Navigateur desktop (Chrome/Edge/Firefox/Safari) | Oui | Oui | Support complet. Cible de développement principale. |
| iOS Safari / web view iOS | Oui | Oui | Safe areas (encoche/barre) ; bug `100vh` ; préfixes `-webkit-` ; pas de vrai hover. |
| Navigateur / web view Android | Oui | Oui | Moteurs variés ; tester le coût du flou sur GPU faibles. |
| iPad / tablette | Oui | Oui | Entre le mobile et le desktop ; hover incertain. |
| Android TV / Google TV (app officielle) | Natif | **Non** | Interface native ; thème non appliqué. D-pad uniquement. |
| Navigateur de Smart TV (Jellyfin Web embarqué) | Oui | Oui | GPU faible ; flou/ombres coûteux ; navigation D-pad seule. |
| Application WebOS (LG) | Partiel (web) | Partiel | Icônes Material parfois corrompues ; CSS conservateur. |
| Jellyfin Media Player | Oui (ancien Qt WebEngine) | Partiel | **Pas de `:has()`, pas de `backdrop-filter` moderne, `clamp()`/`gap` incertains.** Dégradation requise. |
| Freebox / box opérateur | Selon le client | Seulement s'il affiche Jellyfin Web et expose le Custom CSS | Moteurs anciens/inconnus ; supposer le pire ; fallbacks lourds. |

## Catégories de risques

### 1. Focus & D-pad (TV, clavier)
- Le hover ne peut pas être supposé. Toute affordance hover doit avoir un équivalent `:focus` / `:focus-visible` / `.show-focus`.
- Le focus TV est une fonctionnalité, pas une décoration. Réserver les anneaux de focus forts à `.layout-tv` et le focus clavier à `:focus-visible`.
- Le focus ne doit jamais être coupé par un `overflow: hidden` ou un contexte d'empilement. Vérifier que l'agrandissement de carte au focus n'est pas rogné.
- La cible de focus doit rester grande et très contrastée sur un écran vu à distance.

### 2. Safe areas (iOS, Android à encoche, certaines TV)
- Respecter `env(safe-area-inset-*)`. Ne jamais laisser un contrôle passer sous l'encoche ou la barre d'accueil.
- Combiner les safe areas avec la gouttière de page plutôt que de la remplacer.

### 3. Performance (TV, mobile bas de gamme)
- Un `backdrop-filter` / flou permanent et large est coûteux sur TV et téléphones faibles. Rayon de flou modéré, surface réduite, et toujours un fallback couleur pleine.
- N'animer que `transform` et `opacity`. Jamais de propriétés de layout, jamais `transition: all`.
- Éviter les grandes `box-shadow`/`filter` permanentes sur de nombreuses cartes simultanément.

### 4. Limites des moteurs
- `:has()` : non supporté par le moteur Qt de Jellyfin Media Player et les vieilles TV. À utiliser pour de l'amélioration, jamais pour un élément structurant sur ces clients.
- `backdrop-filter` : nécessite partout un fallback couleur.
- Détecter avec `@supports` pour `:has()`, `backdrop-filter` et `aspect-ratio` quand l'absence casserait la mise en page.

### 5. Spécificité & ordre d'injection
- Jellyfin utilise parfois `!important` (ex. `.skinHeader.semiTransparent { backdrop-filter: none !important }`). Le surcharger exige une spécificité égale/supérieure ; documenter chaque `!important` ajouté par NoyaFin360.
- Le Custom CSS par utilisateur se charge après celui du serveur. Ne pas dépendre de l'ordre au-delà de ça.

### 6. Cache / mises à jour
- jsDelivr et les caches navigateur/app peuvent conserver le CSS jusqu'à ~1 semaine. Prévoir un rafraîchissement forcé (CTRL/CMD+F5) ou une URL figée par version.

### 7. RTL & i18n
- Le thème ne doit pas dépendre du texte visible et doit fonctionner en LTR et RTL (Jellyfin fournit `src/styles/rtl.scss`). Préférer les propriétés logiques (`margin-inline`, `padding-inline`, `inset-inline`).

### 8. Cohabitation avec le layout Legacy
- Le même Custom CSS peut se charger sous l'app Legacy. Les règles structurelles qui supposent le DOM Modern doivent être délimitées (`.layout-*`, `:root:has(.MuiAppBar-root)`) pour ne jamais abîmer Legacy.

## Conséquences de conception (intégrées au système de tokens)
- Le flou est un token (`--nf-blur`) avec un fallback couleur — jamais codé en dur.
- Le mouvement est tokenisé et désactivé sous `prefers-reduced-motion`.
- L'anneau de focus est un token (`--nf-focus-ring`) appliqué via `:focus-visible` et `.layout-tv`.
- Les gouttières utilisent `env(safe-area-inset-*)`.
- Les propriétés logiques sont le modèle de direction par défaut.
