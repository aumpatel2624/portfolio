import { asset } from '../lib/asset';
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
  content: 'content generator',
  podcast: 'podcast pipeline',
  agents: 'Claude Code agents',
  hrms: 'HR management',
  taskmgmt: 'task management',
  helpdesk: 'support ticketing',
  sso: 'single sign-on',
};

export const phoneCopy = {
  projectsIntro: "Projects I've built and worked on.",
  projectSubs: {
    phonedeck: 'Remote launcher · case study',
    content: 'Claude Agent SDK · Vyaris',
    podcast: 'Personal project',
    agents: 'Public on GitHub',
    hrms: '11 modules · Apidel',
    taskmgmt: 'Main developer · Apidel',
    helpdesk: 'Main backend developer · Apidel',
    sso: '6 internal apps · Apidel',
  } satisfies Record<ProjectKey, string>,
  caseStudy: 'Read the full case study →',
  allProjects: 'All projects',
  home: 'Home',
  contactEyebrow: 'Contact',
  boot: 'starting portfolio.os',
} as const;

export const phonePhotos = [
  {
    src: asset('images/aum-portrait.jpg'),
    alt: 'Aum smiling at a railing in front of a waterfall',
    label: 'portrait',
    objectPosition: '50% 14%',
  },
  {
    src: asset('images/aum-full.jpg'),
    alt: 'Aum standing by a waterfall under a cloudy sky',
    label: 'monsoon',
    objectPosition: '50% 40%',
  },
] as const;
