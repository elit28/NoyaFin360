# Compatibility

## Intended support

NoyaFin360 targets Jellyfin 12 Modern UI and Jellyfin Web based clients.

### Input methods

- Mouse
- Keyboard
- Touch
- TV remote / D-pad

### Form factors

- Mobile
- Tablet
- Desktop
- Large-screen TV

## Important limitation

Custom CSS support depends on the client.

A client that embeds or renders Jellyfin Web may inherit the theme. A native Jellyfin client with its own interface may not.

No platform should be marked as fully supported until tested and documented.

## Compatibility matrix

| Platform / client | Status | Notes |
|---|---|---|
| Jellyfin Web desktop (Modern) | Planned | Primary target (Jellyfin 12 Modern is default) |
| iOS web / WebView | Planned | Must test safe areas |
| Android web / WebView | Planned | |
| Smart TV browser (Jellyfin Web) | Planned | D-pad focus critical; watch blur cost |
| Android TV / Google TV (native app) | Not applicable | Native UI — Custom CSS not applied |
| WebOS (LG) app | Planned | Material-icon glyph risk; conservative CSS |
| Jellyfin Media Player | Limited | Old Qt engine: no `:has()`, weak `backdrop-filter` |
| Freebox / TV environments | Research required | Depends on client implementation |

Detailed, verified risks and degradation rules: [platform-risks.md](./platform-risks.md).
