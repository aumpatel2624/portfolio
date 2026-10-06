import type { PhoneAppId } from '../data/phone';

/** Glyph paths (24px grid, stroked) and tile gradients for the home screen and dock. */
export const appIcons: Record<
  'about' | 'projects' | 'experience' | 'skills' | 'hobbies' | 'photos',
  {
    bg: string;
    d: string;
  }
> = {
  about: {
    bg: 'linear-gradient(160deg, var(--danger), #C45454)',
    d: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7',
  },
  projects: {
    bg: 'linear-gradient(160deg, #E39A1B, #B9740A)',
    d: 'M12 3l9 5-9 5-9-5 9-5z M3 12.5l9 5 9-5 M3 17l9 5 9-5',
  },
  experience: {
    bg: 'linear-gradient(160deg, #C0663F, #8F4527)',
    d: 'M3 8h18v12H3z M9 8V5h6v3 M3 13h18',
  },
  skills: {
    bg: 'linear-gradient(160deg, #3F8F8B, #2B6764)',
    d: 'M8 7l-5 5 5 5 M16 7l5 5-5 5 M14 4l-4 16',
  },
  hobbies: {
    bg: 'linear-gradient(160deg, #D6352B, #A02119)',
    d: 'M5 21V4 M5 4h14v9H5 M10 4v9 M15 4v9 M5 8.5h14',
  },
  photos: {
    bg: 'linear-gradient(160deg, #7A4B7A, #533253)',
    d: 'M3 5h18v14H3z M3 16l5-5 4 4 3-3 6 6 M16 9.5h.01',
  },
};

export const dockIcons: Record<
  'contact' | 'resume' | 'classic' | 'wallpaper',
  {
    bg: string;
    fg: string;
    d: string;
  }
> = {
  contact: {
    bg: 'linear-gradient(160deg, #5E8F5A, #3F6A3C)',
    fg: 'var(--text)',
    d: 'M3 5h18v14H3z M3 6.5l9 7 9-7',
  },
  resume: {
    bg: 'linear-gradient(160deg, #D9BE94, #B8956A)',
    fg: 'var(--bg)',
    d: 'M6 3h9l4 4v14H6z M15 3v4h4 M9 12h7 M9 16h7',
  },
  classic: {
    bg: 'linear-gradient(160deg, var(--border), var(--line))',
    fg: 'var(--text)',
    d: 'M3 4h18v16H3z M3 9h18 M6.5 6.5h.01 M9.5 6.5h.01',
  },
  wallpaper: {
    bg: 'linear-gradient(160deg, var(--accent), #1E40AF)',
    fg: 'var(--text)',
    d: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M12 2v2 M12 20v2 M2 12h2 M20 12h2 M5 5l1.5 1.5 M17.5 17.5L19 19 M5 19l1.5-1.5 M17.5 6.5L19 5',
  },
};

export type DockOpenId = Extract<PhoneAppId, 'contact' | 'resume'>;
