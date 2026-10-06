# Placeholders to fill in

All content lives in `src/data/`. Anything in `[square brackets]` is a placeholder. Until filled,
links render as visible but inert, and `npm run build:prod` fails (`npm run check:placeholders`
lists what is left, warning only).

| Placeholder                        | File                                  | Notes                                                                  |
| ---------------------------------- | ------------------------------------- | ---------------------------------------------------------------------- |
| `[repository link, public soon]`   | `src/data/links.ts` (`phonedeckRepo`) | Only fill once the repo is public                                      |
| `[CONFIRM]` (PhoneDeck next steps) | `src/data/caseStudy.ts` (`next`)      | Confirm the line, drop the tag                                         |
| F1 intro                           | `src/data/hobbies.ts` (`f1`)          | Team, driver and best race are filled                                  |
| IoT boards, current build          | `src/data/hobbies.ts` (`iot`)         |                                                                        |
| Books intro, favourite, genre      | `src/data/hobbies.ts` (`books`)       | Reading now is filled (both titles). Favourite and genre not given yet |
| Three wallpaper quotes and authors | `src/data/wallpapers.ts`              |                                                                        |
| `[add more photos]` (empty tile)   | `src/data/phone.ts` (`morePhotos`)    | Photos app on phones; add images to `phonePhotos`                      |
