# NoyaFin360

> Premium cinematic interface for Jellyfin.  
> Interface cinématique premium pour Jellyfin.

**English** · [Français](./README.fr.md)

## Vision

NoyaFin360 is an original Jellyfin theme focused on a premium, cinematic and responsive experience across desktop, mobile, tablet and TV interfaces.

It is inspired by the usability standards of modern streaming platforms without copying the visual identity of Netflix, Apple TV+, Disney+, Plex or any other service.

## Targets

- Jellyfin 12 Modern UI
- Desktop browsers
- iPhone / iOS
- Android phones
- iPad / tablets
- Android TV / Google TV
- TV browsers and Jellyfin Web based clients
- Remote / D-pad navigation
- Keyboard, mouse and touch

> Compatibility depends on whether a Jellyfin client renders Jellyfin Web and supports Custom CSS. Native clients with a separate UI may not apply the theme.

## Principles

- Original visual identity
- FR/EN friendly layouts
- No selectors based on translated UI text
- Strong focus states for TV and keyboard navigation
- Responsive layouts from mobile to large TVs
- Performance-first animations
- Accessibility and `prefers-reduced-motion`
- Maintainable CSS architecture
- No mandatory add-on for the base theme

## Development status

Phase 1 (foundation) complete: Jellyfin 12 Modern UI analysed, selectors verified against `jellyfin-web@v12.0`, design tokens and design system defined, platform risks documented, build pipeline validated. Component styling (Phase 2+) has not started; not production-ready yet.

## Documentation

- [Architecture](./docs/architecture.md) · [FR](./docs/architecture.fr.md)
- [Design system](./docs/design-system.md) · [FR](./docs/design-system.fr.md)
- [Verified Jellyfin selectors](./docs/jellyfin-selectors.md)
- [Platform risks](./docs/platform-risks.md) · [FR](./docs/platform-risks.fr.md)
- [Compatibility](./docs/compatibility.md) · [FR](./docs/compatibility.fr.md)
- [Roadmap & coverage map](./docs/roadmap.md) · [FR](./docs/roadmap.fr.md)
- [Build pipeline & decision](./docs/build.md)
- [Phase 2 plan](./docs/phase2-plan.md) · [FR](./docs/phase2-plan.fr.md)

## Repository structure

```text
src/       Source CSS
addons/    Optional extensions
dist/      Built distributable files
docs/      Architecture and compatibility documentation
previews/  Screenshots and visual previews
scripts/   Build tooling
```

## Installation

When a stable build exists, installation will use a single Custom CSS import:

```css
@import url("https://cdn.jsdelivr.net/gh/elit28/NoyaFin360@main/dist/theme.min.css");
```

Version-pinned releases will also be supported.

## License

License selection is pending before the first public release.
