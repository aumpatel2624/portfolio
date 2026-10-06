import type { ProjectKey } from './projects';

export type PhoneAppId =
  | 'about'
  | 'projects'
  | 'experience'
  | 'skills'
  | 'setup'
  | 'hobbies'
  | 'photos'
  | 'contact'
  | 'resume';

/** Home-screen grid, in order. Contact and Resume live in the dock. */
export const phoneHomeApps: { id: PhoneAppId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'setup', label: 'Setup' },
  { id: 'hobbies', label: 'Hobbies' },
  { id: 'photos', label: 'Photos' },
];

/** Title shown in the app header. */
export const phoneAppTitles: Record<PhoneAppId, string> = {
  about: 'about.txt',
  projects: 'projects',
  experience: 'experience',
  skills: 'skills',
  setup: 'setup',
  hobbies: 'hobbies',
  photos: 'photos',
  contact: 'contact',
  resume: 'resume.pdf',
};

/** Header title while a project is open. */
export const phoneProjectTitles: Record<ProjectKey, string> = {
  phonedeck: 'PhoneDeck',
  seokeywords: 'SEO Keyword Hunt',
  recruit: 'recruiting platform',
  whatsapp: 'WhatsApp panel',
  helpdesk: 'helpdesk',
  taskmgmt: 'task management',
  globalauth: 'global auth',
  hrms: 'HRMS',
  ai: 'AI integration',
};

export const phoneCopy = {
  projectsIntro: 'Systems I designed and built. Client work is anonymised.',
  projectSubs: {
    phonedeck: 'Remote launcher · case study',
    seokeywords: 'Keyword research CLI · Python',
    recruit: 'Gemini parsing · anonymised',
    whatsapp: 'LLM order parser · anonymised',
    helpdesk: 'Support ticketing · Apidel',
    taskmgmt: 'Graphics team · Apidel',
    globalauth: 'Unified login · Apidel',
    hrms: 'In progress · Apidel',
    ai: 'Across several products · Apidel',
  } satisfies Record<ProjectKey, string>,
  caseStudy: 'Read the full case study →',
  allProjects: 'All projects',
  home: 'Home',
  contactEyebrow: 'Contact',
  boot: 'starting portfolio.os',
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
