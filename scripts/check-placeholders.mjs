#!/usr/bin/env node
/**
 * Finds `[placeholder]` text left in string literals under src/data.
 * Warns by default; with --strict it exits 1 (used by `npm run build:prod`).
 */
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src/data');
const strict = process.argv.includes('--strict');
const literal = /'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g;
const marker = /\[[^\]\n]*[A-Za-z][^\]\n]*\]/g;

const found = [];
for (const file of (await readdir(dir)).filter((f) => f.endsWith('.ts'))) {
  const lines = (await readFile(join(dir, file), 'utf8')).split('\n');
  lines.forEach((line, i) => {
    if (line.trim().startsWith('//') || line.trim().startsWith('*')) return;
    for (const m of line.matchAll(literal)) {
      const text = m[1] ?? m[2] ?? m[3] ?? '';
      for (const p of text.match(marker) ?? []) found.push(`src/data/${file}:${i + 1}  ${p}`);
    }
  });
}

if (found.length === 0) {
  console.log('No placeholders left in src/data.');
} else {
  console.log(`${found.length} placeholder(s) still in src/data:\n  ${found.join('\n  ')}`);
  console.log('See docs/PLACEHOLDERS.md.');
  if (strict) process.exit(1);
}
