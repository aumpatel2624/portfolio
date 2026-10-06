export const phonedeckCaseStudy = {
  kicker: 'Case study · Remote launcher',
  title: 'PhoneDeck',
  summary:
    'A Steam Deck-style Android launcher for a Windows laptop, over a Noise-encrypted WebSocket channel.',
  meta: [
    { label: 'Role', value: 'Solo: PRD, protocol, both apps, tests' },
    { label: 'Stack', value: 'TypeScript · Electron · Expo · C#' },
    { label: 'Status', value: 'Active · started Sept 2026' },
  ],
  problem:
    "I wanted my phone to act as a private app deck for one Windows laptop: hand-picked app cards and remote controls, where a tap sends an authenticated, encrypted request. The laptop can only act on cards it already stores, so a stolen phone or a stray packet can't run arbitrary commands.",
  architecture: [
    {
      name: 'Phone app',
      note: 'Expo and React Native: pair, deck, remote',
      accent: false,
      basis: 150,
    },
    { name: 'Encrypted channel', note: 'Noise IK + PSK over WebSocket', accent: false, basis: 150 },
    { name: 'Network guard', note: 'Tailscale-only listening option', accent: true, basis: 170 },
    {
      name: 'Laptop app',
      note: 'Electron tray, explicit Allow prompt to pair',
      accent: false,
      basis: 170,
    },
    {
      name: 'Windows helper',
      note: 'C#: list, launch, focus and close apps',
      accent: false,
      basis: 150,
    },
  ],
  architectureNote:
    'A shared protocol package holds framing, zod message schemas and QR pairing, so both apps speak one tested contract.',
  decisions: [
    {
      title: 'Noise IK handshake, tested against reference vectors',
      body: 'A custom Noise IK handshake with a pre-shared key, checked against external noiseprotocol test vectors and golden frames.',
    },
    {
      title: 'Property-based tests on the security boundary',
      body: 'fast-check fuzz tests on the protocol and the server edge, with 41 test files and CI on every pull request.',
    },
    {
      title: 'The laptop only acts on cards it already stores',
      body: 'Pairing needs an explicit Allow on the laptop, and a request can only trigger a stored card, never an arbitrary command.',
    },
    {
      title: 'Fakes for Windows, real-device evidence',
      body: 'An adapter layer with scripted fakes keeps tests fast, and an ADB toolkit captures end-to-end runs on a real phone.',
    },
  ],
  result:
    'About 15,600 lines of code across four packages, 41 test files, and 31 pull requests merged in four days.',
  next: 'Improve the UI and make PhoneDeck a more stable app.',
  talk: 'Want to talk about it?',
} as const;
