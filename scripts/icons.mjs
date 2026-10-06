#!/usr/bin/env node
/**
 * Renders the site icons from public/favicon.svg (needs `sharp`, a devDependency):
 * favicon.ico (16/32/48), apple-touch-icon.png (180), icon-192.png and icon-512.png.
 * Run `npm run icons` after editing the SVG and commit the outputs.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const pub = join(resolve(dirname(fileURLToPath(import.meta.url)), '..'), 'public');
const svg = await readFile(join(pub, 'favicon.svg'), 'utf8');
// The OS rounds the Apple icon itself, so it gets a full-bleed square.
const square = svg.replace(' rx="14"', '');

const png = (source, size) =>
  sharp(Buffer.from(source), { density: 384 }).resize(size, size).png().toBuffer();

/** An .ico holding PNG images (supported since Vista). */
function ico(images) {
  const head = Buffer.alloc(6 + images.length * 16);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(images.length, 4);
  let offset = head.length;
  images.forEach(({ size, data }, i) => {
    const at = 6 + i * 16;
    head.writeUInt8(size, at);
    head.writeUInt8(size, at + 1);
    head.writeUInt16LE(1, at + 4);
    head.writeUInt16LE(32, at + 6);
    head.writeUInt32LE(data.length, at + 8);
    head.writeUInt32LE(offset, at + 12);
    offset += data.length;
  });
  return Buffer.concat([head, ...images.map((i) => i.data)]);
}

const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(async (size) => ({ size, data: await png(svg, size) })));
await writeFile(join(pub, 'favicon.ico'), ico(images));
await writeFile(join(pub, 'apple-touch-icon.png'), await png(square, 180));
await writeFile(join(pub, 'icon-192.png'), await png(svg, 192));
await writeFile(join(pub, 'icon-512.png'), await png(svg, 512));
console.log('Wrote favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png');
