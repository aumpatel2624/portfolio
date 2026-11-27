#!/usr/bin/env node
/**
 * Renders each one-page PDF in public/certificates to the image the site shows. Needs `pdftoppm`
 * (poppler-utils) and `sharp`. Run `npm run certificates` after changing a PDF, check the images
 * and commit them.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const pub = join(resolve(dirname(fileURLToPath(import.meta.url)), '..'), 'public');
/** Keep in step with src/data/certificates.ts. */
const WIDTH = 1200;
const tmp = mkdtempSync(join(tmpdir(), 'certificates-'));

try {
  const pdfs = readdirSync(join(pub, 'certificates')).filter((f) => f.endsWith('.pdf'));
  for (const file of pdfs) {
    const slug = file.slice(0, -'.pdf'.length);
    execFileSync('pdftoppm', [
      '-png',
      '-singlefile',
      '-scale-to-x',
      String(WIDTH),
      '-scale-to-y',
      '-1',
      join(pub, 'certificates', file),
      join(tmp, slug),
    ]);
    const out = join(pub, 'images', `certificate-${slug}.webp`);
    const { width, height } = await sharp(join(tmp, `${slug}.png`))
      .webp({ quality: 82 })
      .toFile(out);
    console.log(`wrote ${out} (${width}x${height})`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
