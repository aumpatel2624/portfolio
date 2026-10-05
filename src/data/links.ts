/**
 * Every outbound link. Anything still wrapped in [square brackets] is a placeholder: it renders
 * as a visible but inert link and fails `npm run build:prod` until filled in. See docs/PLACEHOLDERS.md.
 */
export const links = {
  email: '[your email]',
  github: '[GitHub URL]',
  linkedin: '[LinkedIn URL]',
  resume: '[resume PDF link]',
  smartbin: 'https://github.com/aumpatel2624/SmartBin',
  phonedeckRepo: '[repository link, public soon]',
} as const;

export const isPlaceholder = (value: string): boolean => /^\[.+\]$/.test(value.trim());

/** `mailto:` for real addresses, `undefined` while the email is still a placeholder. */
export const emailHref = (email: string): string | undefined =>
  isPlaceholder(email) ? undefined : `mailto:${email}`;

/** Shown in the Resume window until the PDF is linked. */
export const resumeNote = "[ATTACH RESUME PDF: link it here once it's ready.]";
