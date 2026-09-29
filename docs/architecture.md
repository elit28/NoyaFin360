# Architecture

English · [Français](./architecture.fr.md)

## Goal

Keep NoyaFin360 modular, auditable and resilient to Jellyfin updates.

## Source layers (order = `src/theme.css`)

1. Design tokens — `src/variables.css` (the only place values are defined)
2. Global foundation — `src/base.css` (reset-lite, scoping baseline, background/text)
3. Typography
4. Navigation (app bar, drawer, tabs)
5. Home (sections, rails, backdrop)
6. Cards
7. Detail views (movie, series, season, episode)
8. Dialogs / forms
9. Playback (video + audio OSD)
10. Live TV
11. Administration
12. Responsive refinements (component-first, not patches)
13. Accessibility safeguards — **single source** for `prefers-reduced-motion` and global keyboard/D-pad focus visibility (not duplicated in `base.css`)

Later modules may refine earlier layers, never contradict tokens.

## Scope & dialects

NoyaFin360's mandatory final scope is every part of Jellyfin reachable by Custom
CSS (media, user settings, administration). Two dialects share one token set:
**media** (immersive/cinematic) and **admin** (sober, SaaS-grade — no cinematic
blur/backdrops). Never hide functionality. See `roadmap.md` for the coverage map
and `design-system.md` for the dialects.

## Scoping strategy (verified for Jellyfin 12)

The same Custom CSS can load under the Modern **or** Legacy app. To protect Legacy and native quirks:

- **Global-safe rules** (tokens, reduced-motion, focus) apply unscoped.
- **Modern-only structural rules** gate on the Modern React shell:
  ```css
  :root:has(.MuiAppBar-root) { /* Modern only */ }
  ```
- **Device rules** gate on the layout classes Jellyfin sets on `<html>`:
  `:root.layout-desktop`, `:root.layout-mobile`, `:root.layout-tv`.
- `:has()` is an enhancement, not a dependency — anything load-bearing on weak
  engines (Jellyfin Media Player, old TVs) must also work without it.

See `jellyfin-selectors.md` for the verified selector inventory and
`platform-risks.md` for the degradation rules.

## Selector discipline

- Only selectors recorded in `jellyfin-selectors.md` (verified against the
  current Jellyfin source) may be used.
- Prefer stable classes, `--jf-*` variables, `.layout-*`, MUI **root** classes.
- Never target emotion hashed classes, visible text, or deep positional chains.
- Document every necessary `!important`.

## Token → Jellyfin mapping

Component layers may map `--nf-*` tokens into Jellyfin's `--jf-*` variables to
steer native MUI components without deep selectors. This mapping lives in the
component modules, keeping `variables.css` Jellyfin-agnostic.

## Generated output

`npm run build` uses **lightningcss** to bundle `src/theme.css` (resolving
`@import`), validate syntax, prefix/lower for target engines, and write:

- `dist/theme.css` — readable, bundled + prefixed
- `dist/theme.min.css` — minified, the one-line install target

Invalid CSS fails the build. Do not hand-edit `dist/`. Rationale and
trade-offs: `build.md`.

## Rule

Keep ownership obvious. A component-specific fix belongs in that component's
module, never in an unrelated file merely because it overrides correctly.
