# Phase 2 — Core navigation (plan)

English · [Français](./phase2-plan.fr.md)

Phase 1 (foundation, selectors, tokens, risks) is complete. Phase 2 builds the
core navigation and the focus system on top of the verified selectors. It does
**not** touch detail pages, playback, Live TV or admin (Phases 3–5).

## Scope

App bar/header · main navigation (drawer, tabs, user views) · home shell &
rails · cards · the focus system across all devices.

## Guardrails (every task)

- Use only selectors from `jellyfin-selectors.md`; if a new one is needed,
  verify it in the Jellyfin source first and record it there.
- No text-based selectors. Modern-only structural rules scoped via
  `:root:has(.MuiAppBar-root)`; device rules via `.layout-*`.
- Every hover state has a `:focus-visible` / `.show-focus` equivalent.
- Blur ships a solid fallback; motion is transform/opacity only and respects
  reduced motion.
- Validate on desktop, mobile (safe areas), and TV focus before each commit.

## Work items

### 2.1 — Header / app bar (`src/navigation.css`)
- Style `.MuiAppBar-root` transparent-at-top → glass-on-scroll
  (`.MuiAppBar-colorDefault`), using `--nf-surface-overlay` + blur + fallback.
- Map `--jf-palette-AppBar-transparentBg` / `-defaultBg` to NoyaFin360 tokens.
- Dense `.MuiToolbar-root` height aligned to `--nf-header-height`; padding via
  `.padded-left/.padded-right`.
- Header at `--nf-z-header`; ensure it never clips focused content below.

### 2.2 — Drawer & tabs
- `.MuiDrawer-paper` as an elevated glass surface (`--nf-surface-elevated`).
- Active nav item uses `--nf-brand-primary` / `--nf-brand-primary-soft`.
- `.emby-tabs` / `.emby-tab`: active indicator in brand, focus ring on TV.
- User-views nav: focusable, D-pad ordering intact.

### 2.3 — Home shell & rails (`src/home.css`)
- `.homeSectionsContainer` / `.verticalSection` spacing via `--nf-space-*` and
  `--nf-rail-gap`.
- `.sectionTitleContainer` / `.sectionTitle` typographic hierarchy (styled by
  node, never by text).
- `.emby-scroller` rails: edge fade, `--nf-content-max` alignment,
  `.emby-scrollbuttons` shown for pointer only.
- Backdrop layer (`.backdropContainer` / `.backdrop` / `.backdropImage`) with
  `--nf-gradient-backdrop`, sitting at `--nf-z-backdrop`.

### 2.4 — Cards (`src/cards.css`)
- `.card` / `.cardBox` / `.cardScalable`: radius `--nf-radius-md`, shadow
  `--nf-shadow-card`, artwork-first framing.
- `.cardImageContainer` / `.cardImage` / `.coveredImage`: clean cover fit.
- `.cardOverlayContainer` + `.cardOverlayButton*`: appear on hover **and**
  focus; identify buttons by class/icon, never label.
- `.cardText*` / `.cardFooter*`: restrained, legible metadata.
- `.cardIndicators`: brand-tinted badges.

### 2.5 — Focus system (cross-cutting)
- Card focus/hover scale via `.card.show-focus` / `.card:focus` using
  `--nf-focus-scale` (pointer) and `--nf-focus-scale-tv` (`.layout-tv`).
- Guarantee focus is never clipped (overflow/stacking audit on rails & cards).
- Verify keyboard tab order and D-pad traversal on a TV layout.

## Deliverables

- Populated `src/navigation.css`, `src/home.css`, `src/cards.css` (+ typography
  touches) with verified selectors only.
- Any new selectors appended to `jellyfin-selectors.md`.
- `npm run build` producing updated `dist/theme.css` + `dist/theme.min.css`.
- Before/after notes per device in the PR description.

## Exit criteria

Header, navigation, home rails and cards look premium and cohesive on desktop,
mobile and TV; focus is unmistakable and never clipped; no text/hashed
selectors; Legacy layout not degraded; build is clean.
