# Placeholders to fill in

All content lives in `src/data/`. Anything in `[square brackets]` is a placeholder. Until filled,
links render as visible but inert, and `npm run build:prod` fails (`npm run check:placeholders`
lists what is left, warning only).

| Placeholder                      | File                                       | Notes                                                                                                                |
| -------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `[repository link, public soon]` | `src/data/links.ts` (`phonedeckRepo`)      | Only fill once the repo is public; allowlisted in `scripts/check-placeholders.mjs`, so it does not fail `build:prod` |
| `[repository link, public soon]` | `src/data/links.ts` (`seoKeywordHuntRepo`) | The SEO Keyword Hunt repo is private. Fill it once the repo is public; same allowlist entry as above                 |

To add more photos to the phone Photos app, append entries to `phonePhotos` in `src/data/phone.ts`.

## Open questions

| Question                  | Where               | Notes                                                                                                      |
| ------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------- |
| Laptop specs (Lenovo LOQ) | `src/data/setup.ts` | Not given, so the Daily laptop section lists only the model. Add CPU, RAM, storage if you want them shown. |
