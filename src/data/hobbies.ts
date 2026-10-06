export type HobbyKey = 'f1' | 'books' | 'running' | 'ai' | 'sports' | 'iot';

export interface Hobby {
  key: HobbyKey;
  label: string;
  sub: string;
  title: string;
  /** One-line intro. Omitted when there is none to show. */
  intro?: string;
  bullets: string[];
  link?: { label: string; href: string };
}

export const hobbies: Hobby[] = [
  {
    key: 'f1',
    label: 'Formula 1',
    sub: 'Race weekends',
    title: 'Formula 1',
    intro: 'I enjoy watching Formula 1.',
    bullets: [
      'Favourite team: Red Bull',
      'Favourite driver: Max Verstappen',
      "Best race I've watched: 2016 Brazil Grand Prix",
    ],
  },
  {
    key: 'books',
    label: 'Books',
    sub: 'Reading',
    title: 'Books',
    intro: "I'm learning to read books.",
    bullets: [
      'Reading now: Read People Like a Book and Psycho-Cybernetics',
      'Building a habit of reading.',
    ],
  },
  {
    key: 'running',
    label: 'Running',
    sub: 'Just started',
    title: 'Running',
    intro: 'I just started running recently.',
    bullets: [],
  },
  {
    key: 'ai',
    label: 'AI use cases',
    sub: 'Beyond code',
    title: 'AI use cases',
    intro: 'I enjoy learning about AI use cases beyond only coding.',
    bullets: [],
  },
  {
    key: 'sports',
    label: 'Sports and esports',
    sub: 'Watching',
    title: 'Sports and esports',
    intro: "I'm not into any one specific sport.",
    bullets: ['I watch Valorant tournaments.', 'Football, recently, as a viewer.'],
  },
  {
    key: 'iot',
    label: 'IoT',
    sub: 'Tinkering',
    title: 'IoT',
    bullets: [
      'SmartBin: a waste-sorting prototype where a TensorFlow detection model tells an Arduino, over serial, how to sort.',
      'Boards I use: Arduino with a camera module',
      'College project: classification and detection, running an ML model on board.',
    ],
    link: { label: 'View SmartBin on GitHub →', href: 'https://github.com/aumpatel2624/SmartBin' },
  },
];
