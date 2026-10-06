export interface Wallpaper {
  key: 'blossom' | 'race' | 'paddock' | 'nook';
  name: string;
  /** Left out when the wallpaper carries no quote: the quote slot is hidden. */
  quote?: string;
  by?: string;
  /** A light photograph under the dark UI: labels drawn straight on it get a scrim. */
  light?: boolean;
}

/** Order matters: the first is the default and cycling wraps around. */
export const wallpapers: Wallpaper[] = [
  { key: 'blossom', name: 'Ink blossom', light: true },
  { key: 'race', name: 'Race day', quote: '[Your first quote goes here]', by: '[author]' },
  { key: 'paddock', name: 'Paddock night', quote: '[Your second quote goes here]', by: '[author]' },
  { key: 'nook', name: 'Reading nook', quote: '[Your third quote goes here]', by: '[author]' },
];
