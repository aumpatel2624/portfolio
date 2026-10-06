# Aum's portfolio

A desktop-OS themed home (`/`), a classic one-page site (`/classic`) and a PhoneDeck case study
(`/work/phonedeck`). Vite, React 18, strict TypeScript, plain CSS Modules, react-router-dom.
Below 768px the desktop redirects to the classic layout, unless the build sets `VITE_FORCE_DESKTOP=true`
(see [Desktop-only deploys](#desktop-only-deploys)).

## Run

```bash
npm install
npm run dev            # http://localhost:5173
npm run typecheck && npm run lint && npm test
npm run build          # dev build (placeholders allowed)
npm run build:prod     # fails while [placeholders] remain in src/data
npm run test:e2e       # Playwright smoke test (builds, then serves a preview)
npm run screenshots    # 390/768/1024/1440 screenshots into shots/
```

If Playwright has no matching browser, set `PW_CHROMIUM_PATH` to a Chromium binary.

## Edit content

Everything is typed data in `src/data/`; components only render it. See
[docs/PLACEHOLDERS.md](docs/PLACEHOLDERS.md) for what is still to fill in.

## ASCII art

`npm run ascii` runs `scripts/ascii.mjs`, which crops `public/images/*.jpg`, converts them to
character grids at three densities and writes `src/ascii/art.generated.ts` (plus the `aum.` and
`404` wordmarks via figlet). The site ships only the finished strings, rendered in IBM Plex Mono
and scaled with container-query units. It appears in the boot screen, About window (toggle with
the photo), the Polaroid (hover reveals the photo), the classic profile card, dividers, footer,
the 404 page and the console. The real photos remain available everywhere.

## Deploy

`vercel.json` holds a static SPA rewrite. Import the repo in Vercel; build command `npm run build:prod`
once placeholders are filled (the config uses `npm run build` so previews work now).

## Desktop-only deploys

Set `VITE_FORCE_DESKTOP=true` at build time (see `.env.example`; copy to `.env.local`, never commit a
`.env`) and `/` always renders the desktop, with no redirect to `/classic` on narrow screens. Windows,
taskbar and start menu are sized to fit phones. The flag is baked in at build, so rebuild after changing it:
`VITE_FORCE_DESKTOP=true npm run build`.

## Decisions

- GitHub and LinkedIn stay placeholders as the spec lists them, even though the SmartBin URL is known.
- Anonymised work cards on the classic page have no "Read case study" link: no such case studies exist.
- The classic header has a small "Desktop view" link at 768px and above; narrower screens redirect `/` to `/classic`.
- Minimised windows unmount, as in the design; project and hobby selections persist.
- Window drag is not implemented (out of scope unless everything else is done).
- `sitemap.xml` is empty until the production domain is known.
- Mobile and case study colours were unified to the classic palette.
