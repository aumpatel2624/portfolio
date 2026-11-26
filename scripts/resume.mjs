#!/usr/bin/env node
/**
 * Renders the pages of public/aum-patel-resume.pdf to the images the site shows inline. Needs
 * `pdftoppm` (poppler-utils) and `sharp`. Run `npm run resume` after replacing the PDF, check the
 * images show no phone number, and commit them. Only ever render the redacted public PDF.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const pub = join(resolve(dirname(fileURLToPath(import.meta.url)), '..'), 'public');
/** Wide enough to stay sharp when zoomed in on a phone. Keep in step with src/data/resume.ts. */
const WIDTH = 1600;
const tmp = mkdtempSync(join(tmpdir(), 'resume-'));

try {
  execFileSync('pdftoppm', [
    '-png',
    '-scale-to-x',
    String(WIDTH),
    '-scale-to-y',
    '-1',
    join(pub, 'aum-patel-resume.pdf'),
    join(tmp, 'page'),
  ]);
  for (const [i, file] of readdirSync(tmp).sort().entries()) {
    const out = join(pub, 'images', `resume-${i + 1}.webp`);
    const { width, height } = await sharp(join(tmp, file)).webp({ quality: 82 }).toFile(out);
    console.log(`wrote ${out} (${width}x${height})`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
