/// <reference types="vitest/config" />
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/** Path the site is served under: `/` by default, `/portfolio/` for GitHub Pages. */
const base = `/${process.env.BASE_PATH ?? ''}/`.replace(/\/{2,}/g, '/');

/**
 * Static hosts without rewrites (GitHub Pages) need a real file per route to answer 200, and
 * serve 404.html for everything else. Each is a copy of the built index.html.
 */
function routePages(): Plugin {
  let outDir = 'dist';
  return {
    name: 'route-pages',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      for (const page of ['classic.html', 'work/phonedeck.html', '404.html']) {
        const target = resolve(outDir, page);
        mkdirSync(dirname(target), { recursive: true });
        copyFileSync(resolve(outDir, 'index.html'), target);
      }
    },
  };
}

export default defineConfig({
  base,
  plugins: [react(), routePages()],
  build: { target: 'es2022' },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: false,
  },
});
