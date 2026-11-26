export type WindowId =
  'about' | 'ai' | 'experience' | 'skills' | 'work' | 'education' | 'contact' | 'resume';

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

/** CV order. */
export const WINDOW_IDS: WindowId[] = [
  'about',
  'ai',
  'experience',
  'skills',
  'work',
  'education',
  'contact',
  'resume',
];

const def = (
  id: WindowId,
  title: string,
  kind: WindowDef['kind'],
  width: number,
  dx: number,
  dy: number,
): WindowDef => ({
  id,
  title,
  path: `~/aum/${title}${kind === 'folder' ? '/' : ''}`,
  aria: title,
  kind,
  width,
  dx,
  dy,
});

export const windowDefs: Record<WindowId, WindowDef> = {
  about: def('about', 'about.txt', 'file', 700, -70, -30),
  ai: def('ai', 'ai-engineering', 'folder', 900, 30, 10),
  experience: def('experience', 'experience', 'folder', 680, -110, 20),
  skills: def('skills', 'skills', 'folder', 640, 70, -20),
  work: def('work', 'work-projects', 'folder', 900, -30, 20),
  education: def('education', 'education', 'folder', 640, 40, -10),
  contact: def('contact', 'contact', 'folder', 560, 0, 30),
  resume: def('resume', 'resume.pdf', 'file', 760, 40, 0),
};
