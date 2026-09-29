# Roadmap & coverage map

English · [Français](./roadmap.fr.md)

NoyaFin360's mandatory final scope is to give a coherent identity to **every part of Jellyfin that Custom CSS can reach**. This file is the authoritative coverage map. Phases are delivered incrementally; nothing themable is out of scope.

## Two dialects, one design system

All areas share one design system (colors, radii, typography, buttons, inputs, focus, spacing, surfaces, feedback). Only the register differs:

- **Media** — immersive, cinematic, artwork-first.
- **Admin / settings** — sober, structured, premium SaaS-grade; no cinematic blur/backdrops/heavy motion.

Rule across everything: **never hide functionality**; accessibility and D-pad/keyboard reach come first.

## Phases

| Phase | Area | Dialect | Status |
|---|---|---|---|
| 1 | Foundation: selectors, tokens, design system, risks, build | — | **Done** |
| 2 | Core navigation: app bar, top nav, home backdrop, rails, cards, focus | Media | **In progress (desktop)** |
| 3 | Content: movie/series/season/episode details, collections, cast, recommendations, search, dialogs | Media | Planned |
| 4 | Playback & responsive: video player, audio player, mobile/tablet/TV refinement | Media | Planned |
| 5 | User experience & Live TV: profile, user settings (display, playback, subtitles, notifications), devices/preferences, Live TV, TV guide | Media + sober forms | Planned |
| 6 | Administration (mandatory): full Dashboard audit **first**, then all admin pages + shared primitives | Admin (sober) | Planned |
| 7 | Audit & release: dead CSS, conflicts, responsive/a11y/perf audit, docs, release | — | Planned |

## Coverage checklist

### Media experience
- [ ] Login
- [ ] Home
- [ ] Movies
- [ ] Shows
- [ ] Seasons
- [ ] Episodes
- [ ] Collections
- [ ] Music
- [ ] Search
- [ ] Media details
- [ ] Cast / crew
- [ ] Recommendations
- [ ] Live TV
- [ ] TV guide
- [ ] Video player
- [ ] Audio player

### User experience
- [ ] Profile
- [ ] User settings
- [ ] Display
- [ ] Playback
- [ ] Subtitles
- [ ] Notifications
- [ ] Devices & preferences

### Administration (sober dialect)
- [ ] Dashboard
- [ ] Users
- [ ] Libraries
- [ ] Plugins
- [ ] Network
- [ ] Playback
- [ ] Transcoding
- [ ] Devices
- [ ] Scheduled tasks
- [ ] Logs
- [ ] Branding
- [ ] Live TV admin
- [ ] Metadata

### Shared UI primitives (theme once, reuse everywhere)
- [ ] Forms
- [ ] Tables
- [ ] Menus
- [ ] Dropdowns
- [ ] Toggles
- [ ] Tabs
- [ ] Modals
- [ ] Alerts
- [ ] Snackbars
- [ ] Inputs

## Deferred to optional JS add-ons (not pure-CSS)

Some desired features have no target element in the Jellyfin 12 Modern DOM and
cannot be built in pure CSS. They are deferred to optional JavaScript add-ons
(never required by the core theme, per CLAUDE.md), documented here so intent is
not lost:

- **Retractable desktop icon sidebar.** Modern desktop has no left drawer
  (`AppDrawer` mounts only on non-desktop). CSS elevates the native top nav
  instead; a real sidebar needs JS to inject a drawer.
- **Home hero.** Jellyfin's home is sections/rails only — no hero element
  (logo/metadata/Play/More). CSS makes the home cinematic via the native
  backdrop + scrim; a real hero needs JS to build it from Jellyfin data (cf. the
  community "Media Bar" plugin).

## Phase 6 — Dashboard audit gate

Admin CSS must not be written before a dedicated audit:

1. Enumerate every Jellyfin 12 Dashboard route and shared primitive.
2. Verify each selector against the current source (`src/apps/dashboard`, MUI components, shared elements).
3. Record verified selectors in `docs/jellyfin-selectors.md` (admin section).
4. Confirm the sober dialect covers every primitive before per-page work.

Only then implement, primitives first, then pages.
