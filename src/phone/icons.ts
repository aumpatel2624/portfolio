import type { PhoneAppId } from '../data/phone';

/**
 * Glyph paths for the home screen and dock tiles (24px grid, stroked). Every tile shares one
 * treatment (a surface tile with an accent-2 glyph, see `.tile`), so only the glyph differs.
 */
export const appIcons: Record<PhoneAppId | 'classic', string> = {
  about: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7',
  projects: 'M12 3l9 5-9 5-9-5 9-5z M3 12.5l9 5 9-5 M3 17l9 5 9-5',
  experience: 'M3 8h18v12H3z M9 8V5h6v3 M3 13h18',
  skills: 'M8 7l-5 5 5 5 M16 7l5 5-5 5 M14 4l-4 16',
  setup: 'M3 4h18v12H3z M8 20h8 M12 16v4',
  hobbies: 'M5 21V4 M5 4h14v9H5 M10 4v9 M15 4v9 M5 8.5h14',
  photos: 'M3 5h18v14H3z M3 16l5-5 4 4 3-3 6 6 M16 9.5h.01',
  contact: 'M3 5h18v14H3z M3 6.5l9 7 9-7',
  resume: 'M6 3h9l4 4v14H6z M15 3v4h4 M9 12h7 M9 16h7',
  classic: 'M3 4h18v16H3z M3 9h18 M6.5 6.5h.01 M9.5 6.5h.01',
};

export type DockOpenId = Extract<PhoneAppId, 'contact' | 'resume'>;
