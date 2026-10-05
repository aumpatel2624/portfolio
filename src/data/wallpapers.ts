export interface Wallpaper {
  key: 'race' | 'paddock' | 'nook';
  name: string;
  quote: string;
  by: string;
}

/** Order matters: the first is the default and cycling wraps around. */
export const wallpapers: Wallpaper[] = [
  { key: 'race', name: 'Race day', quote: '[Your first quote goes here]', by: '[author]' },
  { key: 'paddock', name: 'Paddock night', quote: '[Your second quote goes here]', by: '[author]' },
  { key: 'nook', name: 'Reading nook', quote: '[Your third quote goes here]', by: '[author]' },
];
