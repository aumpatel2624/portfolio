# Aum's portfolio

A desktop-OS themed home (`/`), an iPhone-style phone OS (`/` below 768px), a classic one-page site
(`/classic`) and a PhoneDeck case study (`/work/phonedeck`). Vite, React 18, strict TypeScript, plain
CSS Modules, react-router-dom. Below 768px `/` renders the phone OS (`src/phone/`, lazy-loaded so
desktop visitors never download it), unless the build sets `VITE_FORCE_DESKTOP=true`
(see [Desktop-only deploys](#desktop-only-deploys)).

## Phone OS preview

To see the phone view on a desktop browser, narrow the window below 768px (or use the browser's
device toolbar, for example 390x844). The view stays at most 430px wide and centred, and it reacts live
as you resize. The dock's "Classic site" button leads to `/classic`.

## Run

```bash
npm install
npm run dev            # http://localhost:5173
npm run typecheck && npm run lint && npm test
npm run build          # dev build (placeholders allowed)
npm run build:prod     # fails while [placeholders] remain in src/data
npm run test:e2e       # Playwright smoke test (builds, then serves a preview)
npm run screenshots    # 390/768/1024/1440 screenshots (plus phone OS at 390) into shots/
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
`.env`) and `/` always renders the desktop, never the phone OS, on narrow screens. Windows,
taskbar and start menu are sized to fit phones. The flag is baked in at build, so rebuild after changing it:
`VITE_FORCE_DESKTOP=true npm run build`.

## Decisions

- Anonymised work cards on the classic page have no "Read case study" link: no such case studies exist.
- The classic header has a small "Desktop view" link at 768px and above. Phones no longer redirect from `/` to `/classic`; they get the phone OS, which links to the classic site from its dock.
- Phone OS: the artboard's fixed 390x844 positions flow instead, so it fits 360px and up. On screens shorter than 800px the page dots and the paddock traffic lights are hidden and the race-day cars sit on the dock, because they would otherwise run under the icon grid. Small secondary text uses `--muted` rather than `--faint` for AA contrast.
- Minimised windows unmount, as in the design; project and hobby selections persist.
- Window drag is not implemented (out of scope unless everything else is done).
- `sitemap.xml` is empty until the production domain is known.
- Desktop and phone use the Onyx palette (`src/styles/tokens.css`: `--bg`, `--surface`, `--text`, `--accent`, `--success`, `--danger` and friends). `--acc`/`--acc2` stay as aliases of accent and its soft glow, and the `--d-*` names alias the Onyx surfaces. The desktop accent switcher keeps its mechanism but its swatches are only the palette's own accents, `#3B82F6` and `#60A5FA`. `--faint` is decorative only. Project and hobby illustrations are photographs (`public/images/*.webp`, rendered by `ArtImage`) and keep their own colours.
- Mobile and case study colours were unified to the classic palette.
- Skill icons come from the CC0 `simple-icons` package (individual icons imported, mapped in `src/components/skillIcons.ts`). No icon is shown for skills without a brand icon: BullMQ, Groq and AWS (not in simple-icons v16, which dropped the AWS mark), and the generic concepts Structured outputs and Prompt design.
