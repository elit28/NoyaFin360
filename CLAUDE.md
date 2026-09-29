# CLAUDE.md — NoyaFin360

This file is the operating contract for Claude Code when working in this repository.

## Mission

Build an original, premium cinematic interface for Jellyfin with excellent usability on desktop, mobile, tablet and TV.

Do not create a Netflix clone. Use modern streaming UX as reference only.

## Primary target

- Jellyfin 12
- Modern UI
- Jellyfin Web and clients embedding Jellyfin Web

Legacy support is secondary and must never degrade the Modern UI implementation.

## Languages

The theme itself must be language-independent.

Documentation must be available in English and French for user-facing documentation.

Never identify UI controls by visible English or French labels.

Forbidden conceptual approach:

```css
/* Never build selectors around text such as "Play" or "Lecture". */
```

Selectors must rely on stable classes, attributes, roles, DOM structure verified against Jellyfin, or other language-independent identifiers.

## Device targets

Every meaningful change must consider:

1. Desktop browser
2. iPhone / iOS
3. Android phone
4. Tablet / iPad
5. Android TV / Google TV
6. TV / D-pad navigation
7. Keyboard navigation

Do not assume hover exists.

TV focus states are first-class functionality, not an afterthought.

## Visual direction

- Dark cinematic foundation
- Artwork-first presentation
- Strong visual hierarchy
- Immersive backdrops
- Restrained glass / blur
- Refined gradients
- Premium spacing
- Smooth but subtle motion
- High readability
- Original identity

Avoid visual clutter and gratuitous effects.

## Engineering rules

Before using a Jellyfin selector:

1. Verify that it exists in the current Jellyfin 12 interface or source.
2. Record important selectors in `docs/jellyfin-selectors.md`.
3. Avoid selectors tied to fragile DOM depth.
4. Avoid hashed/generated classes unless unavoidable and documented.

### CSS

- Prefer CSS custom properties.
- Avoid `!important` unless Jellyfin specificity requires it.
- Document every necessary `!important`.
- Never use `transition: all`.
- Respect `prefers-reduced-motion`.
- Respect iOS safe areas.
- Check overflow, stacking contexts and z-index.
- Keep touch targets usable.
- Keep keyboard and D-pad focus visible.
- Use fallbacks for `backdrop-filter`.
- Avoid expensive persistent filters and shadows.

## Performance

Do not trade performance for decoration.

Prefer transforms and opacity for animation.

Avoid:
- large continuously animated blurs
- excessive backdrop filters
- layout-triggering animations
- unnecessarily deep selectors
- duplicated rules

## Architecture

Main source entry: `src/theme.css`.

Modules live inside `src/`.

Optional features belong in `addons/` and must never be required for the core theme.

Generated distributable files belong in `dist/`.

Do not hand-edit generated files when a build process exists.

## Work phases

### Phase 1 — Foundation
- inspect Jellyfin 12 Modern
- document selectors
- establish architecture
- create design tokens
- create base/reset layer

### Phase 2 — Core navigation
- app bar
- navigation
- home
- cards
- focus system

### Phase 3 — Content
- movie details
- show details
- seasons
- episodes
- search
- dialogs

### Phase 4 — Playback and responsive
- video player
- audio player
- mobile
- tablet
- TV

### Phase 5 — Extended areas
- Live TV
- admin
- plugins/add-ons where justified

### Phase 6 — Audit
- dead CSS
- conflicts
- responsive audit
- accessibility
- performance
- build/minification
- documentation

Do not jump directly to thousands of lines of CSS.

## Validation before each significant commit

Check:

- syntax
- selector validity
- obvious regressions
- desktop responsiveness
- mobile behavior
- TV focus behavior
- reduced-motion behavior
- duplicate rules

## Distribution goal

Stable releases must be installable with one line:

```css
@import url("https://cdn.jsdelivr.net/gh/elit28/NoyaFin360@main/dist/theme.min.css");
```

Tagged versions must also work:

```css
@import url("https://cdn.jsdelivr.net/gh/elit28/NoyaFin360@v1.0.0/dist/theme.min.css");
```

## Important

Do not copy another theme wholesale.

External Jellyfin themes may be studied for compatibility techniques and known selectors, but NoyaFin360 must retain its own architecture and visual identity.
