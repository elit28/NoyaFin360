/**
 * NoyaFin360 build — powered by lightningcss.
 *
 * Why lightningcss (see docs/build.md for the full decision):
 *   - Real CSS parser: bundles @import, minifies, and VALIDATES syntax
 *     (build fails on malformed CSS instead of silently shipping it).
 *   - Browser-target lowering + vendor prefixing for the wide range of TV /
 *     mobile / embedded engines NoyaFin360 must support.
 *   - Replaces the previous hand-rolled regex minifier, which was fragile
 *     (it could fuse selectors around `:` and misparse strings/url()).
 *
 * Outputs:
 *   - dist/theme.css      readable, bundled + prefixed
 *   - dist/theme.min.css  minified (the one-line install target)
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundle } from 'lightningcss';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const ENTRY = resolve(ROOT, 'src/theme.css');
const DIST = resolve(ROOT, 'dist');

/** Encode a browser major version for lightningcss targets (major << 16). */
const v = (major) => major << 16;

/**
 * Conservative targets covering desktop browsers, iOS/Android web views, and
 * older Smart-TV / embedded engines. Kept broad on purpose so lightningcss
 * lowers/prefixes modern syntax rather than assuming evergreen engines.
 */
const targets = {
  chrome: v(87),
  edge: v(87),
  firefox: v(78),
  safari: (14 << 16) | (0 << 8),
  ios_saf: (14 << 16) | (0 << 8)
};

function build(minify) {
  const { code, warnings } = bundle({
    filename: ENTRY,
    minify,
    targets,
    errorRecovery: false // fail loudly on invalid CSS
  });
  if (warnings.length) {
    for (const w of warnings) console.warn('  warning:', w.message ?? w);
  }
  return code;
}

async function main() {
  const readable = build(false);
  const min = build(true);

  await mkdir(DIST, { recursive: true });
  await writeFile(resolve(DIST, 'theme.css'), readable);
  await writeFile(resolve(DIST, 'theme.min.css'), min);

  const kb = (buf) => (buf.length / 1024).toFixed(2);
  console.log('NoyaFin360 build OK (lightningcss)');
  console.log(`  dist/theme.css     ${kb(readable)} KB`);
  console.log(`  dist/theme.min.css ${kb(min)} KB`);
}

main().catch((err) => {
  console.error('NoyaFin360 build failed:', err.message ?? err);
  process.exitCode = 1;
});
