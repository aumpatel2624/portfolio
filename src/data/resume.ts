import { asset } from '../lib/asset';

/** Page images rendered from public/aum-patel-resume.pdf by `npm run resume`. */
export const resumePages = [1, 2].map((n) => asset(`images/resume-${n}.webp`));

export const resumePageSize = { width: 1600, height: 2263 } as const;
