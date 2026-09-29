/**
 * NoyaFin360 build.
 *
 * Flattens src/theme.css by inlining local @import url("./...") statements
 * (depth-first, each file included once) and writes:
 *   - dist/theme.css      readable bundle
 *   - dist/theme.min.css  minified bundle (the one-line install target)
 *
 * Zero dependencies. Remote @import (http/https) are left untouched.
 * The minifier is conservative and assumes the source contains no
 * comment-like sequences inside string/url() literals (true for this repo).
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const ENTRY = resolve(ROOT, 'src/theme.css');
const DIST = resolve(ROOT, 'dist');

const LOCAL_IMPORT = /@import\s+url\(\s*["']\.\/([^"')]+)["']\s*\)\s*;?/g;

/** Recursively inline local @import statements starting at `file`. */
async function flatten(file, seen = new Set()) {
  const abs = resolve(file);
  if (seen.has(abs)) return '';
  seen.add(abs);

  const css = await readFile(abs, 'utf8');
  const baseDir = dirname(abs);
  let out = '';
  let last = 0;

  for (const m of css.matchAll(LOCAL_IMPORT)) {
    out += css.slice(last, m.index);
    const importedPath = resolve(baseDir, m[1]);
    out += `\n/* >>> ${m[1]} */\n`;
    out += await flatten(importedPath, seen);
    out += `\n/* <<< ${m[1]} */\n`;
    last = m.index + m[0].length;
  }
  out += css.slice(last);
  return out;
}

/** Conservative CSS minifier. */
function minify(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')        // strip comments
    .replace(/\s+/g, ' ')                      // collapse whitespace
    // Trim around structural tokens only. NOTE: ':' is deliberately excluded —
    // trimming it would fuse a descendant combinator before a pseudo-class
    // (".layout-tv :focus-visible" -> ".layout-tv:focus-visible"), changing meaning.
    .replace(/\s*([{};,])\s*/g, '$1')
    .replace(/;}/g, '}')                        // drop last semicolon in block
    .trim();
}

async function main() {
  const bundle = (await flatten(ENTRY)).trim() + '\n';
  const min = minify(bundle) + '\n';

  await mkdir(DIST, { recursive: true });
  await writeFile(resolve(DIST, 'theme.css'), bundle, 'utf8');
  await writeFile(resolve(DIST, 'theme.min.css'), min, 'utf8');

  const kb = (s) => (Buffer.byteLength(s, 'utf8') / 1024).toFixed(2);
  console.log(`NoyaFin360 build OK`);
  console.log(`  dist/theme.css     ${kb(bundle)} KB`);
  console.log(`  dist/theme.min.css ${kb(min)} KB`);
}

main().catch((err) => {
  console.error('NoyaFin360 build failed:', err);
  process.exitCode = 1;
});
