# Build pipeline & decision

## Decision: use `lightningcss`

NoyaFin360's build uses [`lightningcss`](https://lightningcss.dev/) (dev dependency) for bundling, minification, syntax validation and browser-target lowering, replacing the earlier hand-rolled regex minifier.

### Why

The project will grow to cover all of Jellyfin, so the build must be robust, not clever-but-fragile.

| Concern | Regex minifier (old) | lightningcss (new) |
|---|---|---|
| `@import` bundling | manual recursion | native, correct |
| Minification | string collapsing | AST-based, safe |
| Syntax validation | none (ships invalid CSS silently) | **fails the build on invalid CSS** (`errorRecovery: false`) |
| Selector safety | broke combinators around `:` (fixed by hand) | parser-correct, never fuses selectors |
| Strings / `url()` / comments | fragile | handled correctly |
| Old-engine compatibility | none | vendor prefixing + feature lowering via `targets` |

The old minifier had already produced one real bug (fusing `.layout-tv :focus-visible` into `.layout-tv:focus-visible`). A real parser removes that whole class of risk.

### Cost

- One dev dependency (`lightningcss`) plus its prebuilt native binary (installed via npm; verified working in this environment). 3 packages added, 0 vulnerabilities.
- Runs offline once installed; no impact on the shipped CSS beyond correctness and prefixing.

### Trade-offs considered

- **Keep the regex minifier:** rejected — fragility scales badly with the codebase.
- **PostCSS + cssnano + postcss-import:** capable, but heavier dependency tree and slower than lightningcss for the same result.
- **esbuild CSS:** fast, but weaker CSS-specific minification and no fine browser-target lowering.

lightningcss gives the best robustness-to-weight ratio for a large CSS-only theme.

## How it works

`npm run build` (`scripts/build.mjs`):

1. `bundle({ filename: 'src/theme.css', ... })` — resolves local `@import` starting from the entry.
2. Runs twice: readable (`minify: false`) and minified (`minify: true`).
3. `targets` lower/prefix modern syntax for a broad range of desktop, mobile web view and older Smart-TV / embedded engines.
4. `errorRecovery: false` makes malformed CSS **fail the build**.
5. Writes `dist/theme.css` and `dist/theme.min.css`.

## Outputs

- `dist/theme.css` — readable, bundled + prefixed.
- `dist/theme.min.css` — minified; the one-line install target used from jsDelivr.

Do not hand-edit `dist/`. Regenerate with `npm run build`.

## Compatibility note

`targets` handles prefixing and syntax lowering, but it does **not** polyfill missing features such as `:has()` or `backdrop-filter` on very old engines. Those remain enhancement-only with runtime fallbacks — see `platform-risks.md`.

## Re-evaluation triggers

Revisit this decision only if: lightningcss stops installing in the target CI/dev environments, the theme needs transforms lightningcss cannot express, or a lighter equivalent proves more reliable. Document any change here.
