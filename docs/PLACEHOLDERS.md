# Placeholders to fill in

All content lives in `src/data/`. Anything in `[square brackets]` is a placeholder. Until filled,
links render as visible but inert, and `npm run build:prod` fails (`npm run check:placeholders`
lists what is left, warning only).

| Placeholder                      | File                                  | Notes                                                                                                                |
| -------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `[repository link, public soon]` | `src/data/links.ts` (`phonedeckRepo`) | Only fill once the repo is public; allowlisted in `scripts/check-placeholders.mjs`, so it does not fail `build:prod` |

To add more photos to the phone Photos app, append entries to `phonePhotos` in `src/data/phone.ts`.

## Open questions

| Question                                                       | Where               | Notes                                                                                                           |
| -------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| What is "Jev"? It was listed under AI tools in the Setup list. | `src/data/setup.ts` | Left off the page because it is ambiguous (possibly a typo). Tell us what it is, or confirm it should stay out. |
| Laptop specs (Lenovo LOQ)                                      | `src/data/setup.ts` | Not given, so the Daily laptop section lists only the model. Add CPU, RAM, storage if you want them shown.      |
