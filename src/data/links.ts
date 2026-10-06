/**
 * Every outbound link. Anything still wrapped in [square brackets] is a placeholder: it renders
 * as a visible but inert link and fails `npm run build:prod` until filled in. See docs/PLACEHOLDERS.md.
 */
export const links = {
  email: 'aumpatelc36@gmail.com',
  github: 'https://github.com/aumpatel2624',
  linkedin: 'https://www.linkedin.com/in/aum-patel-945561222',
  resume: '/aum-patel-resume.pdf',
  smartbin: 'https://github.com/aumpatel2624/SmartBin',
  phonedeckRepo: '[repository link, public soon]',
} as const;

export const isPlaceholder = (value: string): boolean => /^\[.+\]$/.test(value.trim());

/** `mailto:` for real addresses, `undefined` while the email is still a placeholder. */
export const emailHref = (email: string): string | undefined =>
  isPlaceholder(email) ? undefined : `mailto:${email}`;

/** Accessible name for every resume link. */
export const resumeLabel = 'Download Aum Patel’s resume (PDF, opens in a new tab)';

/** Shown in the Resume window and sheet. */
export const resumeNote = 'My resume as a PDF: opens in a new tab and can be downloaded.';
