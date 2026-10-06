import type { ProjectKey } from './projects';

export type PhoneAppId =
  'about' | 'projects' | 'experience' | 'skills' | 'hobbies' | 'photos' | 'contact' | 'resume';

/** Home-screen grid, in order. Contact and Resume live in the dock. */
export const phoneHomeApps: { id: PhoneAppId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'hobbies', label: 'Hobbies' },
  { id: 'photos', label: 'Photos' },
];

/** Title shown in the app header. */
export const phoneAppTitles: Record<PhoneAppId, string> = {
  about: 'about.txt',
  projects: 'projects',
  experience: 'experience',
  skills: 'skills',
  hobbies: 'hobbies',
  photos: 'photos',
  contact: 'contact',
  resume: 'resume.pdf',
};

/** Header title while a project is open. */
export const phoneProjectTitles: Record<ProjectKey, string> = {
  phonedeck: 'PhoneDeck',
  recruit: 'recruiting platform',
  whatsapp: 'WhatsApp panel',
  more: 'also built',
};

export const phoneCopy = {
  projectsIntro: 'Systems I designed and built. Client work is anonymised.',
  projectSubs: {
    phonedeck: 'Remote launcher · case study',
    recruit: 'Gemini parsing · anonymised',
    whatsapp: 'LLM order parser · anonymised',
    more: 'Helpdesk · SSO · workflow',
  } satisfies Record<ProjectKey, string>,
  caseStudy: 'Read the full case study →',
  allProjects: 'All projects',
  home: 'Home',
  contactEyebrow: 'Contact',
  boot: 'starting portfolio.os',
  /** Placeholder tile in the Photos app. */
  morePhotos: '[add more photos]',
} as const;

export const phonePhotos = [
  {
    src: '/images/aum-portrait.jpg',
    alt: 'Aum smiling at a railing in front of a waterfall',
    label: 'portrait',
    objectPosition: '50% 14%',
  },
  {
    src: '/images/aum-full.jpg',
    alt: 'Aum standing by a waterfall under a cloudy sky',
    label: 'monsoon',
    objectPosition: '50% 40%',
  },
] as const;
