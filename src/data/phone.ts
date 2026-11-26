import type { ProjectKey } from './projects';

export type PhoneAppId =
  'about' | 'ai' | 'experience' | 'skills' | 'work' | 'education' | 'contact' | 'resume';

/** Home-screen grid, in CV order. Contact and Resume live in the dock. */
export const phoneHomeApps: { id: PhoneAppId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'ai', label: 'AI engineering' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work projects' },
  { id: 'education', label: 'Education' },
];

/** Title shown in the app header. */
export const phoneAppTitles: Record<PhoneAppId, string> = {
  about: 'about.txt',
  ai: 'ai-engineering',
  experience: 'experience',
  skills: 'skills',
  work: 'work-projects',
  education: 'education',
  contact: 'contact',
  resume: 'resume.pdf',
};

/** Header title while a project is open. */
export const phoneProjectTitles: Record<ProjectKey, string> = {
  content: 'content generator',
  podcast: 'podcast pipeline',
  agents: 'Claude Code agents',
  seo: 'SEO keyword tool',
  hrms: 'HR management',
  taskmgmt: 'task management',
  helpdesk: 'support ticketing',
};

export const phoneCopy = {
  allProjects: 'All projects',
  home: 'Home',
  boot: 'starting portfolio.os',
} as const;
