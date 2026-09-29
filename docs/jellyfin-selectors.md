# Jellyfin selector registry

This document records the Jellyfin selectors NoyaFin360 is allowed to rely on.

- **Verified against:** `jellyfin/jellyfin-web` tag `v12.0` (`package.json` version `12.0.0`), commit `0e83c6a`.
- **Method:** selectors were read directly from the v12.0 source (SCSS in `src/styles`, `src/components/cardbuilder/card.scss`, the MUI theme in `src/themes/_base`, and the React app in `src/apps/modern`). Nothing here is from memory.
- **Rule:** never add a selector from memory. Verify it in the current source before use, then record it here with its verified version.
- **Language rule:** none of these selectors depend on visible UI text (English or French). They are all classes, ids, attributes, roles or DOM structure.

## How the theme is applied

Jellyfin 12 injects custom CSS through `src/components/CustomCss.tsx`, which renders two `<style>` elements:

1. Server-wide CSS — Dashboard → General (Branding) → **Custom CSS** (`brandingOptions.CustomCss`).
2. Per-user CSS — Settings → Display → **Custom CSS** (`userSettings.customCss`).

The per-user block is injected **after** the server block, so per-user CSS wins on equal specificity. NoyaFin360 ships as a single `@import` line placed in either box (see `README.md`).

## The three UIs in Jellyfin 12

`src/apps/` contains three separate front-ends:

| App | Directory | Notes |
|---|---|---|
| **Modern** | `src/apps/modern` | Default on desktop and mobile in 12.0. React + MUI. **Primary target.** |
| **Legacy** | `src/apps/legacy` | The former default. Must not be broken, must not be prioritised over Modern. |
| **Dashboard** | `src/apps/dashboard` | Admin. Partly migrated to React. |

The layout mode (`layout-desktop` / `layout-mobile` / `layout-tv`) is orthogonal to the app and is set on `<html>` (see below).

## Layout detection (device-independent, no text)

`src/components/layoutManager.js` adds one of these classes to `document.documentElement` (`<html>`):

| Selector | Verified | Purpose | Notes |
|---|---|---|---|
| `.layout-desktop` | v12.0 | Desktop/pointer layout | On `<html>`. |
| `.layout-mobile` | v12.0 | Phone/touch layout | On `<html>`. |
| `.layout-tv` | v12.0 | TV / D-pad layout | On `<html>`. **Focus states are first-class here.** |

These are the primary, reliable device hooks. Do **not** rely on `@media (hover)` alone to detect TV.

## Modern-layout detection (structural, no text)

The Modern React shell renders a MUI AppBar (`src/apps/modern/AppLayout.tsx` → `OffsetAppBar` → `@mui/material/AppBar`). The presence of `.MuiAppBar-root` is a reliable structural signal that the Modern app is mounted. Scope Modern-only structural rules with:

```css
:root:has(.MuiAppBar-root) { /* Modern layout only */ }
```

`:has()` is supported by all Chromium/WebKit/Gecko engines from 2023 onward. It is **not** supported by Jellyfin Media Player's old Qt WebEngine (see `platform-risks.md`); rules that must degrade gracefully there should not depend on `:has()`.

## Design tokens exposed by Jellyfin 12 (MUI CSS variables)

The Modern theme is a MUI theme (`src/themes/_base/theme.ts`) emitted as CSS variables. These are stable, documented hooks and may be **read** or **overridden** by NoyaFin360. Verified in `src/themes/_base/_theme.scss` and across the SCSS:

| Variable | Purpose |
|---|---|
| `--jf-palette-background-default` | Page background |
| `--jf-palette-background-paper` | Surface (menus, dropdowns, cards) |
| `--jf-palette-background-paperChannel` | Paper as `R G B` channels (for `rgb(... / a)`) |
| `--jf-palette-primary-main` | Primary/brand color |
| `--jf-palette-primary-mainChannel` | Primary as `R G B` channels |
| `--jf-palette-primary-dark` / `--jf-palette-primary-light` | Primary variants |
| `--jf-palette-secondary-main` | Secondary/accent (defaults to primary) |
| `--jf-palette-text-primary` / `--jf-palette-text-secondary` | Text colors |
| `--jf-palette-action-hover` / `--jf-palette-action-focus` | Interaction overlays |
| `--jf-palette-action-selectedOpacity` | Selected-state opacity |
| `--jf-palette-divider` | Divider/border color |
| `--jf-palette-AppBar-defaultBg` | Header background when scrolled |
| `--jf-palette-AppBar-transparentBg` | Header background at top of page |
| `--jf-palette-AppBar-gradient` | Optional gradient over the header/detail ribbon |
| `--jf-palette-error-main` / `-light` / `-contrastText` | Error colors |
| `--jf-palette-FilledInput-bg` / `-borderColor` | Text field surfaces |
| `--jf-palette-SnackbarContent-bg` / `-color` | Toast/snackbar |
| `--jf-palette-Button-inheritContainedBg` / `-inheritContainedHoverBg` | Neutral buttons |
| `--jf-palette-common-white` | White |
| `--jf-card-borderRadius` | Card corner radius (default `0.2em`) |

NoyaFin360 keeps its own `--nf-*` token layer and maps into these `--jf-*` variables where it wants to steer native components without deep selectors.

## Stable structural selectors

### Header / app bar

| Selector | Verified | Purpose | Notes |
|---|---|---|---|
| `.skinHeader` | v12.0 | Skin header wrapper (shared shell) | `src/themes/_base/_theme.scss`. |
| `.skinHeader-withBackground` | v12.0 | Header with solid background | |
| `.skinHeader.semiTransparent` | v12.0 | Transparent header state | Base sets `backdrop-filter: none !important` here — override needs equal/greater specificity. |
| `.headerLeft` | v12.0 | Left header cluster | |
| `.MuiAppBar-root` | v12.0 (MUI) | Modern header (fixed) | Stable MUI **root** class. Also present: `.MuiAppBar-colorTransparent` (top), `.MuiAppBar-colorDefault` (scrolled), `.MuiPaper-elevation0/1`. |
| `.MuiToolbar-root` | v12.0 (MUI) | Toolbar inside the AppBar | `.MuiToolbar-dense` used (dense variant). Modern toolbar also carries `.padded-left.padded-right`. |
| `.padded-left` / `.padded-right` / `.padded-top` / `.padded-bottom` | v12.0 | Shared padding utilities | |

### Drawer / navigation

| Selector | Verified | Purpose | Notes |
|---|---|---|---|
| `.MuiDrawer-root` / `.MuiDrawer-paper` | v12.0 (MUI) | Modern navigation drawer | From `AppDrawer.tsx`. |
| `.mainDrawer` | v12.0 | Legacy/shared drawer | Present in shared shell. |
| `.emby-tabs` / `.emby-tab` | v12.0 | Tab strips (custom elements) | `src/elements`. |

### Home & sections

| Selector | Verified | Purpose | Notes |
|---|---|---|---|
| `.homeSectionsContainer` | v12.0 | Home sections wrapper | |
| `.verticalSection` | v12.0 | A titled row/section | |
| `.sectionTitleContainer` | v12.0 | Section header row | |
| `.sectionTitle` | v12.0 | Section heading text node | Style by node, never by its text. |
| `.emby-scroller` | v12.0 | Horizontal scroller wrapper | `src/elements`. |
| `.emby-scrollbuttons` | v12.0 | Scroller prev/next buttons | Relevant for pointer; hidden on touch. |
| `.itemsContainer` | v12.0 | Grid/row of cards | Shared across home, libraries, details. |

### Cards (from `src/components/cardbuilder/card.scss`, emitted by `cardBuilder.js`)

| Selector | Verified | Purpose | Notes |
|---|---|---|---|
| `.card` | v12.0 | Card root | Modifier classes describe shape, e.g. `.backdropCard`, `.portraitCard`, `.squareCard`. |
| `.cardBox` | v12.0 | Card frame | `.visualCardBox` variant exists. |
| `.cardScalable` | v12.0 | Scalable inner wrapper | Focus/hover scale is applied here. |
| `.cardPadder` (+ `-portrait`, `-square`, `-backdrop`, `-banner`, `-overflow*`) | v12.0 | Aspect-ratio spacer | Do not fight these; theme within them. |
| `.cardImageContainer` | v12.0 | Image container | |
| `.cardImage` | v12.0 | Card image | |
| `.coveredImage` / `.coveredImage-contain` | v12.0 | Image fit modes | |
| `.cardOverlayContainer` | v12.0 | Hover/focus overlay | |
| `.cardOverlayButton` (+ `-hover`, `-br`, `-centered`) | v12.0 | Overlay buttons | Identify by class, never by label. |
| `.cardOverlayFab-primary` | v12.0 | Primary overlay action | |
| `.cardText` (+ `-first`, `-secondary`, `-rightmargin`) | v12.0 | Card text lines | |
| `.cardFooter` (+ `-withlogo`) / `.innerCardFooter` / `.fullInnerCardFooter` | v12.0 | Card footers | |
| `.cardIndicators` | v12.0 | Badges (unplayed count, etc.) | |
| `.card.show-focus` | v12.0 | TV/keyboard focus scaling hook | `.card.show-focus:not(.show-animation) .cardBox` and `.card:focus` set the focus transform in base CSS. |
| `.card.show-animation:focus > .cardBox` | v12.0 | Focus scale (animated) | Base uses `transform: scale(1.07)`. |
| `.card-hoverable:focus-within`, `.card-hoverable:hover` | v12.0 | Hoverable card states | |
| `.defaultCardBackground1`–`5` | v12.0 | Placeholder card backgrounds | Set in `src/themes/dark/theme.scss`. |

### Backdrop (immersive art)

| Selector | Verified | Purpose | Notes |
|---|---|---|---|
| `.backdropContainer` | v12.0 | Full-page backdrop layer | |
| `.backdropImage` | v12.0 | Backdrop image | |
| `.backdrop` | v12.0 | Backdrop element | Prime hook for cinematic gradients. |

### Item detail pages (movie / series / season / episode)

| Selector | Verified | Purpose | Notes |
|---|---|---|---|
| `.itemDetailPage` | v12.0 | Detail page root | `src/apps/modern/AppOverrides.scss`. |
| `.detailPageWrapperContainer` | v12.0 | Detail wrapper | |
| `.detailPagePrimaryContainer` | v12.0 | Primary info block | |
| `.detailPagePrimaryContent` | v12.0 | Primary content | |
| `.detailPageSecondaryContainer` | v12.0 | Secondary block | |
| `.detailPageCollabsible` | v12.0 | Collapsible sections | Spelling matches source (`Collabsible`). |
| `.detailRibbon` | v12.0 | Ribbon behind title | Themed in dark theme; hidden on TV (`.layout-tv .detailRibbon { background: none }`). |
| `.detailImageContainer` | v12.0 | Poster container | |
| `.itemBackdrop` | v12.0 | Item backdrop image | |
| `.nameContainer` / `.itemName` | v12.0 | Title block / title text | Style by node, not by text. |
| `.mainDetailButtons` | v12.0 | Primary action button row | Contains play/queue/favorite; target by container + button class/icon, never by label. |
| `.detailButton` (+ `.detailButtonHideonMobile`) | v12.0 | Detail action buttons | |

### Forms, dialogs, inputs (custom elements, `src/elements`)

| Selector | Verified | Purpose | Notes |
|---|---|---|---|
| `.emby-button` | v12.0 | Themed button | |
| `.emby-input` / `.emby-textarea` / `.emby-select` | v12.0 | Form controls | |
| `.emby-checkbox` | v12.0 | Checkbox | |
| `.emby-collapse` / `.emby-collapsible` / `.emby-collapsible-button` | v12.0 | Collapsibles | |
| `.MuiDialog-root` / `.MuiMenu-root` / `.MuiPopover-root` | v12.0 (MUI) | Modern dialogs/menus | Stable MUI root classes. `.dialog` (legacy) also present. |
| `.formDialog` | v12.0 | Legacy form dialog | `src/components/formdialog.scss`. |

### Video player OSD (`src/styles/videoosd.scss`)

| Selector | Verified | Purpose | Notes |
|---|---|---|---|
| `.videoOsdBottom` | v12.0 | Bottom OSD bar | |
| `.osdControls` | v12.0 | Transport controls container | Target buttons by container + icon/class, never by label. |
| `.osdHeader` | v12.0 | Top OSD bar | |
| `.osdTitle` | v12.0 | Now-playing title | |
| `.osdPoster` | v12.0 | OSD poster | |
| `.osdTimeText` | v12.0 | Time/position text | |

### Live TV / admin (Phase 5 scope)

| Selector | Verified | Purpose | Notes |
|---|---|---|---|
| `.adminSection` / `.userSection` | v12.0 | Dashboard sections | `AppOverrides.scss`. |
| `.libraryPage` / `.homePage` / `.withTabs` | v12.0 | Page-type roots | |

## Forbidden / fragile selectors

- **Emotion hashed classes** (`.css-1a2b3c`, `.MuiBox-root` styled hashes): generated per build, unstable. Never target them. Prefer MUI **root** classes (`.MuiAppBar-root`, `.MuiToolbar-root`, `.MuiButton-root`, `.MuiIconButton-root`, `.MuiDrawer-root`, `.MuiDialog-root`, `.MuiTabs-root`, `.MuiPaper-root`) which MUI keeps stable across patch releases.
- **Visible text** ("Play", "Lecture", "Search", "Recherche"): forbidden by the project contract.
- **Deep positional chains** (`div > div:nth-child(3) > span`): fragile against React re-renders. Prefer the semantic classes above.
- **Inline emotion `sx` output**: not addressable; style the nearest stable ancestor instead.

## Re-verification checklist (every Jellyfin bump)

1. `git -C jellyfin-web fetch --tags` and check out the new tag.
2. Confirm the `--jf-palette-*` variable list still matches this file (`grep -rhoE '\-\-jf-[a-zA-Z0-9-]+' src/`).
3. Confirm card classes still emitted by `src/components/cardbuilder/cardBuilder.js`.
4. Confirm `.layout-*` still set in `src/components/layoutManager.js`.
5. Confirm `.MuiAppBar-root` still mounts in `src/apps/modern/AppLayout.tsx`.
6. Update the "Verified against" header and any changed rows.
