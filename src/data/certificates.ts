import { asset } from '../lib/asset';

/** Not a CV section: course completion badges, shown after the CV's Awards. */
export const certificatesHeading = 'Certificates';

const certificate = (slug: string, title: string, drawing: string, verifyId: string) => ({
  title,
  kind: 'Course completion badge',
  issuer: 'Claude Academy',
  issued: 'November 27, 2026',
  issuedIso: '2026-11-27',
  verifyUrl: `https://academy.claude.com/verify/${verifyId}`,
  pdf: asset(`certificates/${slug}.pdf`),
  /** Rendered from the PDF by `npm run certificates`. */
  image: asset(`images/certificate-${slug}.webp`),
  alt: `Claude Academy course completion badge for ${title}, presented to Aum Patel, issued November 27, 2026, with a drawing of ${drawing}.`,
});

export const certificates = [
  certificate(
    'claude-101',
    'Claude 101',
    'two overlapping speech bubbles',
    '4c764d0e24ae4f2b7264d03c9d204b4b',
  ),
  certificate(
    'ai-capabilities-and-limitations',
    'AI capabilities and limitations',
    'a balance scale',
    '0167ea891539843ccdf024cb5109f45a',
  ),
];

export const certificateImageSize = { width: 1200, height: 879 } as const;
