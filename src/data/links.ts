import { asset } from '../lib/asset';

/**
 * Every outbound link. Anything still wrapped in [square brackets] is a placeholder: it renders
 * as a visible but inert link and fails `npm run build:prod` until filled in. See docs/PLACEHOLDERS.md.
 */
export const links = {
  email: 'aumpatelc36@gmail.com',
  github: 'https://github.com/aumpatel2624',
  linkedin: 'https://www.linkedin.com/in/aum-patel-945561222',
  resume: asset('aum-patel-resume.pdf'),
  claudeAgents: 'https://github.com/aumpatel2624/claude-code-agents',
} as const;

/** Link text as the CV prints it. */
export const linkText = {
  github: 'github.com/aumpatel2624',
  linkedin: 'linkedin.com/in/aum-patel-945561222',
  claudeAgents: 'github.com/aumpatel2624/claude-code-agents',
} as const;

export const isPlaceholder = (value: string): boolean => /^\[.+\]$/.test(value.trim());

/** `mailto:` for real addresses, `undefined` while the email is still a placeholder. */
export const emailHref = (email: string): string | undefined =>
  isPlaceholder(email) ? undefined : `mailto:${email}`;

/** Accessible name for every resume download link. */
export const resumeLabel = 'Download Aum Patel’s resume (PDF)';

export const resumeOpenLabel = 'Open Aum Patel’s resume (PDF) in a new tab';
