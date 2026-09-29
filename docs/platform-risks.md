# Platform risks

Risks NoyaFin360 must design around. English · [Français](./platform-risks.fr.md)

Custom CSS only reaches clients that **render Jellyfin Web**. Native clients with their own UI ignore it entirely.

## Client rendering matrix

| Client / environment | Renders Jellyfin Web? | Custom CSS applies? | Key risks |
|---|---|---|---|
| Desktop browser (Chrome/Edge/Firefox/Safari) | Yes | Yes | Full support. Primary dev target. |
| iOS Safari / iOS web view | Yes | Yes | Safe areas (notch/home indicator); `100vh` bug; `-webkit-` prefixes; no true hover. |
| Android browser / web view | Yes | Yes | Wide range of engines; test low-end GPUs for blur cost. |
| iPad / tablet browser | Yes | Yes | Layout sits between phone and desktop; hover may or may not exist. |
| Android TV / Google TV (official app) | Native | **No** | Native UI; theme not applied. D-pad only. |
| Smart TV browser (embedded Jellyfin Web) | Yes | Yes | Weak GPU; blur/shadows expensive; D-pad focus is the only navigation. |
| WebOS (LG) app | Partial (web-based) | Partial | Material icons can render as corrupted glyphs; conservative CSS only. |
| Jellyfin Media Player | Yes (old Qt WebEngine) | Partial | **No `:has()`, no modern `backdrop-filter`, patchy `clamp()`/`gap`.** Must degrade gracefully. |
| Freebox / operator TV boxes | Depends on client | Only if it renders Jellyfin Web and exposes Custom CSS | Unknown/old engines; assume weakest capabilities; heavy fallbacks. |

## Risk categories

### 1. Focus & D-pad (TV, keyboard)
- Hover cannot be assumed. Every hover affordance needs a `:focus` / `:focus-visible` / `.show-focus` equivalent.
- TV focus states are functionality, not decoration. Scope strong focus rings to `.layout-tv` and keyboard focus to `:focus-visible`.
- Focus must never be clipped by `overflow: hidden` or a stacking context. Verify card scale-on-focus is not cut off.
- Focus target must stay large enough and high-contrast on a 10-foot display.

### 2. Safe areas (iOS, notched Android, some TVs)
- Respect `env(safe-area-inset-*)`. Never let controls hide under a notch or home indicator.
- Combine safe-area insets with the page gutter rather than replacing it.

### 3. Performance (TV, low-end mobile)
- Large persistent `backdrop-filter` / blur is expensive on TV and low-end phones. Keep blur radius modest, area small, and always provide a solid-color fallback.
- Animate only `transform` and `opacity`. Never animate layout properties or use `transition: all`.
- Avoid large persistent `box-shadow`/`filter` on many cards at once.

### 4. Engine capability gaps
- `:has()`: unsupported on Jellyfin Media Player's Qt engine and very old TVs. Use it for enhancement, not for anything load-bearing on those clients.
- `backdrop-filter`: needs a fallback background color everywhere.
- Feature-detect with `@supports` for `:has()`, `backdrop-filter`, and `aspect-ratio` where a missing feature would break layout.

### 5. Specificity & injection order
- Jellyfin's own rules sometimes use `!important` (e.g. `.skinHeader.semiTransparent { backdrop-filter: none !important }`). Overriding requires equal/greater specificity; document every `!important` NoyaFin360 adds.
- Per-user Custom CSS loads after server Custom CSS. Do not rely on load order beyond that.

### 6. Caching / updates
- jsDelivr and browser/app caches can hold the CSS up to ~1 week. Users may need a hard refresh (CTRL/CMD+F5) or a version-pinned URL after updates.

### 7. RTL & i18n
- The theme must not depend on visible text and must work LTR and RTL (Jellyfin ships `src/styles/rtl.scss`). Prefer logical properties (`margin-inline`, `padding-inline`, `inset-inline`) over left/right.

### 8. Legacy layout coexistence
- The same Custom CSS can load under the Legacy app. Structural rules that assume Modern DOM must be scoped (`.layout-*`, `:root:has(.MuiAppBar-root)`) so they never damage Legacy.

## Design consequences (baked into the token system)
- Blur is a token (`--nf-blur`) with a solid fallback token — never hard-coded.
- Motion is tokenised and disabled under `prefers-reduced-motion`.
- Focus ring is a token (`--nf-focus-ring`) applied through `:focus-visible` and `.layout-tv`.
- Gutters use `env(safe-area-inset-*)`.
- Logical properties are the default direction model.
