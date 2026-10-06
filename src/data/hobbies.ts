export type HobbyKey = 'f1' | 'iot' | 'books';

export interface Hobby {
  key: HobbyKey;
  label: string;
  sub: string;
  title: string;
  /** One-line intro. Contains a placeholder until Aum fills it in. */
  intro: string;
  bullets: string[];
  link?: { label: string; href: string };
}

export const hobbies: Hobby[] = [
  {
    key: 'f1',
    label: 'Formula 1',
    sub: 'Race weekends',
    title: 'Formula 1',
    intro: 'Formula 1 is one of my hobbies. [One line on how you got into it.]',
    bullets: [
      'Favourite team: Red Bull',
      'Favourite driver: Max Verstappen',
      "Best race I've watched: 2016 Brazil Grand Prix",
    ],
  },
  {
    key: 'iot',
    label: 'IoT',
    sub: 'Tinkering',
    title: 'IoT',
    intro: 'I enjoy building with connected hardware, alongside my software work.',
    bullets: [
      'SmartBin: a waste-sorting prototype where a TensorFlow detection model tells an Arduino, over serial, how to sort.',
      'Boards I use: [for example ESP32, Raspberry Pi]',
      'Current build: [project]',
    ],
    link: { label: 'View SmartBin on GitHub →', href: 'https://github.com/aumpatel2624/SmartBin' },
  },
  {
    key: 'books',
    label: 'Books',
    sub: 'Reading',
    title: 'Books',
    intro: 'Reading books is one of my hobbies. [One line on what you read for.]',
    bullets: [
      'Reading now: Read People Like a Book and Psycho-Cybernetics',
      'All-time favourite: [title]',
      'Genre I keep coming back to: [genre]',
    ],
  },
];
