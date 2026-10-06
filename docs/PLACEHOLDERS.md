# Placeholders to fill in

All content lives in `src/data/`. Anything in `[square brackets]` is a placeholder. Until filled,
links render as visible but inert, and `npm run build:prod` fails (`npm run check:placeholders`
lists what is left, warning only).

| Placeholder                                | File                                  | Notes                                                   |
| ------------------------------------------ | ------------------------------------- | ------------------------------------------------------- |
| `[resume PDF link]`                        | `src/data/links.ts` (`resume`)        | Put the PDF in `public/` and use e.g. `/aum-resume.pdf` |
| `[ATTACH RESUME PDF: ...]`                 | `src/data/links.ts` (`resumeNote`)    | Replace with a short line                               |
| `[repository link, public soon]`           | `src/data/links.ts` (`phonedeckRepo`) | Only fill once the repo is public                       |
| `[YEAR]` (Vyaris start)                    | `src/data/experience.ts`              | e.g. `2024 – Present`                                   |
| `[CONFIRM]` (PhoneDeck next steps)         | `src/data/caseStudy.ts` (`next`)      | Confirm the line, drop the tag                          |
| F1 intro, team, driver, race               | `src/data/hobbies.ts` (`f1`)          |                                                         |
| IoT boards, current build                  | `src/data/hobbies.ts` (`iot`)         |                                                         |
| Books intro, reading now, favourite, genre | `src/data/hobbies.ts` (`books`)       |                                                         |
| Three wallpaper quotes and authors         | `src/data/wallpapers.ts`              |                                                         |
| `[add more photos]` (empty tile)           | `src/data/phone.ts` (`morePhotos`)    | Photos app on phones; add images to `phonePhotos`       |
