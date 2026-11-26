/** URL of a file in `public/`, under the build's base path (`/` locally, `/portfolio/` on Pages). */
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
