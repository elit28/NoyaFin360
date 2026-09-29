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
| Jellyfin Web desktop | Planned | Primary target |
| iOS web / WebView | Planned | Must test safe areas |
| Android web / WebView | Planned | |
| Android TV / Google TV | Planned | D-pad focus critical |
| Freebox / TV environments | Research required | Depends on client implementation |
