# Architecture

## Goal

Keep NoyaFin360 modular, auditable and resilient to Jellyfin updates.

## Layers

1. Design tokens — `src/variables.css`
2. Global foundation — `src/base.css`
3. Typography
4. Navigation
5. Home
6. Cards
7. Detail views
8. Dialogs/forms
9. Playback
10. Live TV
11. Administration
12. Responsive refinements
13. Accessibility safeguards

`src/theme.css` is the source entry point.

## Generated output

The build process must produce:

- `dist/theme.css`
- `dist/theme.min.css`

## Rule

Do not place component-specific fixes in unrelated files merely because they override correctly. Keep ownership obvious.
