export type WindowId =
  'about' | 'projects' | 'experience' | 'skills' | 'setup' | 'hobbies' | 'contact' | 'resume';

export interface WindowDef {
  id: WindowId;
  /** Desktop icon, start menu and taskbar label. */
  title: string;
  /** Path shown in the title bar. */
  path: string;
  /** Label used by the minimise and close buttons. */
  aria: string;
  kind: 'file' | 'folder';
  width: number;
  /** Offset from the centre of the windows layer, in px. */
  dx: number;
  dy: number;
}

export const WINDOW_IDS: WindowId[] = [
  'about',
  'projects',
  'experience',
  'skills',
  'setup',
  'hobbies',
  'contact',
  'resume',
];

export const windowDefs: Record<WindowId, WindowDef> = {
  about: {
    id: 'about',
    title: 'about.txt',
    path: '~/aum/about.txt',
    aria: 'about.txt',
    kind: 'file',
    width: 700,
    dx: -70,
    dy: -30,
  },
  projects: {
    id: 'projects',
    title: 'projects',
    path: '~/aum/projects/',
    aria: 'projects',
    kind: 'folder',
    width: 900,
    dx: 30,
    dy: 10,
  },
  experience: {
    id: 'experience',
    title: 'experience',
    path: '~/aum/experience/',
    aria: 'experience',
    kind: 'folder',
    width: 680,
    dx: -110,
    dy: 20,
  },
  skills: {
    id: 'skills',
    title: 'skills',
    path: '~/aum/skills/',
    aria: 'skills',
    kind: 'folder',
    width: 640,
    dx: 70,
    dy: -20,
  },
  setup: {
    id: 'setup',
    title: 'setup',
    path: '~/aum/setup/',
    aria: 'setup',
    kind: 'folder',
    width: 720,
    dx: -30,
    dy: 20,
  },
  hobbies: {
    id: 'hobbies',
    title: 'hobbies',
    path: '~/aum/hobbies/',
    aria: 'hobbies',
    kind: 'folder',
    width: 840,
    dx: 40,
    dy: -10,
  },
  contact: {
    id: 'contact',
    title: 'contact',
    path: '~/aum/contact/',
    aria: 'contact',
    kind: 'folder',
    width: 560,
    dx: 0,
    dy: 30,
  },
  resume: {
    id: 'resume',
    title: 'resume.pdf',
    path: '~/aum/resume.pdf',
    aria: 'resume.pdf',
    kind: 'file',
    width: 460,
    dx: 90,
    dy: 40,
  },
};
