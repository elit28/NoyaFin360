# NoyaFin360 — Design system

English · [Français](./design-system.fr.md)

The definitive visual language. Tokens are implemented in `src/variables.css`; this document explains intent and rules of use.

## Identity in one line

A **cinematic, artwork-first** interface: a cool near-black canvas, immersive gradient-scrimmed backdrops, restrained glass, and a distinctive periwinkle→indigo signature warmed by champagne accents. Premium and calm — the opposite of visual clutter, and not a Netflix clone.

## Design principles

1. **Artwork leads.** Posters and backdrops are the hero; chrome recedes.
2. **Depth through light, not lines.** Elevation via layered surfaces, gradients and soft shadow — sparing borders.
3. **Calm motion.** Short, transform/opacity-only transitions; nothing loops.
4. **Focus is a feature.** Every interactive element is unmistakable under keyboard and D-pad.
5. **One system, every screen.** The same tokens flex from phone to 10-foot TV via fluid scales and layout classes.
6. **Language- and engine-independent.** No text-based selectors; graceful degradation on weak engines.

## Color

Dark is the foundation. The ink ramp (`--nf-ink-1000` … `--nf-ink-400`) is a **cool desaturated** near-black, never pure `#000`, giving the picture room to breathe.

| Role | Token | Use |
|---|---|---|
| Canvas | `--nf-bg` | Page background |
| Surface | `--nf-surface` | Cards, panels |
| Elevated | `--nf-surface-elevated` | Menus, popovers, raised cards |
| Glass | `--nf-surface-overlay` | Header/drawer over content (blur, solid fallback) |
| Scrim | `--nf-surface-scrim` | Behind dialogs/backdrops |
| Primary | `--nf-brand-primary` | Focus, primary actions, active nav |
| Secondary | `--nf-brand-secondary` | Ratings, subtle premium highlights |
| Text | `--nf-text` / `-muted` / `-faint` | Text hierarchy |

**Contrast:** body text meets WCAG AA on every surface token. Champagne is for accents/large text only, never small body copy on dark.

## Typography

The theme is **font-independent** — it inherits Jellyfin's family and only sets scale, weight, leading and tracking. A fluid scale (`--nf-text-xs` … `--nf-text-hero`) uses `clamp()` so headings breathe on desktop/TV and stay compact on mobile. Hero titles use tight tracking; overlines use wide tracking.

## Spacing & layout

- 4px-based spacing scale (`--nf-space-1` … `--nf-space-16`).
- Page gutter is safe-area-aware (`--nf-gutter-inline-start/-end`), so content clears notches and rounded TV bezels.
- Content max width `--nf-content-max` keeps rails from over-stretching on ultrawide/TV.
- Logical properties (`*-inline`, `*-block`) everywhere for RTL support.

## Radii & elevation

- Radii scale `--nf-radius-xs` … `--nf-radius-xl` + `--nf-radius-pill`. Cards default to `--nf-radius-md`; overlays to `--nf-radius-lg`.
- Three shadow tiers (`sm` / `card` / `raised`) plus a dedicated `--nf-shadow-focus`. Shadows are soft and dark; no colored glows by default.

## Glass & blur (fallback-first)

Glass surfaces use `--nf-surface-overlay` + `backdrop-filter: blur(var(--nf-blur))`. Every glass rule **must** ship a solid fallback (`--nf-glass-fallback`) and be wrapped so unsupported engines (Jellyfin Media Player, old TVs) still get an opaque, legible surface. Blur is restrained: modest radius, small area, never full-screen persistent.

## Motion

- Durations: `fast` (140ms) for state, `normal` (220ms) for transitions, `slow` (360ms) for entrances.
- Easings: `standard` for most, `emphasized` for focus/hover pop, `exit` for dismissals.
- **Only `transform`/`opacity` animate.** Never `transition: all`, never layout properties.
- All motion collapses under `prefers-reduced-motion` (handled in `base.css`).

## Focus system (TV & keyboard, first-class)

- Keyboard: `:focus-visible` paints `--nf-focus-ring-*` (in `base.css`).
- TV: `:root.layout-tv` thickens the ring; cards scale via `--nf-focus-scale-tv`.
- Hooks: Jellyfin's `.card.show-focus` / `.card:focus` (verified) drive card focus; NoyaFin360 restyles the transform and ring, never the detection.
- Focus must never be clipped — component modules keep the focused element's stacking context and overflow clear.

## Cinematic backdrops

- `--nf-gradient-backdrop`: bottom-up scrim so titles stay legible over art (home/hero).
- `--nf-gradient-hero`: left-anchored scrim for detail pages.
- `--nf-gradient-brand`: sparing brand sheen for active rails/accents.
- Backdrops sit at `--nf-z-backdrop`; content above at `--nf-z-content`.

## Z-index scale

`backdrop (0) < content (10) < header (100) < drawer (200) < overlay (300) < dialog (400) < toast (500)` — via `--nf-z-*`. Component modules must use these tokens, never ad-hoc values, to avoid stacking bugs.

## Mapping into Jellyfin 12 variables

Where steering a native MUI component is cheaper than a deep selector, component modules map NoyaFin360 tokens into Jellyfin's `--jf-*` variables (see `jellyfin-selectors.md`), e.g. `--jf-palette-primary-main: var(--nf-brand-primary)`. This mapping lives in the component layers (Phase 2+), not in the token file, to keep tokens Jellyfin-agnostic.

## Do / Don't

**Do:** use tokens; test on TV focus + mobile safe areas; provide blur fallbacks; animate transform/opacity.
**Don't:** hard-code colors/blur; use text selectors; use `transition: all`; add `!important` without documenting it; copy another theme's look.
