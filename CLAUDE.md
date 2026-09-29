# CLAUDE.md — NoyaFin360

This file is the operating contract for Claude Code when working in this repository.

## Mission

Build an original, premium cinematic interface for Jellyfin with excellent usability on desktop, mobile, tablet and TV.

Do not create a Netflix clone. Use modern streaming UX as reference only.

## Scope — NoyaFin360 must cover all of Jellyfin

The final, mandatory goal is to give a coherent NoyaFin360 identity to **every part of Jellyfin that Custom CSS can reasonably reach** — not only the media browsing pages. Anything themable receives the identity; nothing themable is left with default Jellyfin styling.

Coverage includes, at minimum:

- **Media experience:** login, home, movies, shows, seasons, episodes, collections, music, search, media details, cast/crew, recommendations, Live TV, TV guide, video player, audio player.
- **User experience:** profile, user settings, display, playback, subtitles, notifications, devices and preferences.
- **Administration:** dashboard, users, libraries, plugins, network, playback, transcoding, devices, scheduled tasks, logs, branding, Live TV admin, metadata — and the shared UI primitives: forms, tables, menus, dropdowns, toggles, tabs, modals, alerts, snackbars, inputs.

Admin may be implemented in a later phase (see Work phases), but it is part of the **mandatory final scope**, not optional.

## Never hide functionality

NoyaFin360 must **never remove or hide a Jellyfin feature** to achieve a more minimal look. Functionality and accessibility come before aesthetics. Restyle, reposition or de-emphasise if needed — but every control must stay present, reachable, and usable on every input method.

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

### Dark-first and dark-only (main theme)

The main theme is **dark-only**. It must keep its cinematic dark identity on every device and must **never** switch to a light identity based on the OS `prefers-color-scheme: light`. The token architecture may keep a light variant *possible* for a future separate add-on (`:root[data-theme="light"]`), but the main theme never activates it automatically.

### Two coherent visual languages, one design system

NoyaFin360 speaks two related dialects that share **one** design system (colors, radii, typography, buttons, inputs, focus, spacing, surfaces, user feedback):

- **Media experience** — immersive, cinematic, artwork-first, spectacular yet elegant, oriented toward content consumption.
- **Admin / settings experience** — sober, structured, premium, highly legible, fast, modern; close to a premium SaaS dashboard.

Admin must **not** inherit the cinematic effects of the media pages: no massive blur, no cinema backdrop behind network settings, no large unnecessary animations. Same tokens, different intensity and layout register.

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

### Phase 5 — User experience & Live TV
- profile, user settings, display, playback, subtitles, notifications
- devices and preferences
- Live TV, TV guide

### Phase 6 — Administration (mandatory final scope)
Admin uses the **sober** dialect of the design system (no cinematic effects).
- **Full Dashboard audit first** — before writing admin CSS, audit the Jellyfin 12 Dashboard: enumerate every admin page and shared primitive (forms, tables, menus, dropdowns, toggles, tabs, modals, alerts, snackbars, inputs), verify selectors, and record them in `docs/jellyfin-selectors.md`. See `docs/roadmap.md`.
- dashboard, users, libraries, plugins, network, playback, transcoding
- devices, scheduled tasks, logs, branding, Live TV admin, metadata
- shared UI primitives (theme once, reuse everywhere)

### Phase 7 — Audit & release
- dead CSS
- conflicts
- responsive audit
- accessibility
- performance
- build/minification
- documentation

Do not jump directly to thousands of lines of CSS.

Full coverage map and per-area detail: `docs/roadmap.md`.

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
