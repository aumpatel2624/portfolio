export interface Language {
  name: string;
  level: string;
  native?: string;
  lang?: string;
}

export const profile = {
  name: 'Aum',
  location: 'Vadodara, India',
  role: 'AI Engineer',
  sticker: 'Open to UK · Europe ✱',
  availability: 'Available immediately',
  kicker: 'AI Engineer · Vadodara, India',
  typewriter: 'AI agents + pipelines + backend',
  meta: {
    title: 'Aum · AI Engineer',
    description:
      'Aum, an AI engineer in Vadodara, India, building AI agent pipelines with the Claude Agent SDK and Claude Code, and full-stack products in TypeScript and Node.js. Open to relocation (UK and Europe).',
  },
  desktop: {
    greeting: "Hi, I'm",
    intro:
      'AI engineer in Vadodara, India. I build full-stack products and AI agent tooling: pipelines on the Claude Agent SDK and Claude Code with research, fact-check and human review stages.',
    work: "I'm a Software Developer at Apidel Technologies and co-founder of Vyaris. I'm open to relocation (UK and Europe), require visa sponsorship and am available immediately.",
  },
  classic: {
    headline: ['AI engineer building ', 'agent pipelines', ' and ', 'full-stack products.'],
    intro:
      'I build AI pipelines using the Claude Agent SDK and Claude Code, with research, fact-check and human review stages, and internal business platforms in TypeScript and Node.js at Apidel Technologies.',
    mobileHeadline: ['AI engineer building ', 'agent pipelines and full-stack products.'],
    mobileIntro:
      'I build AI pipelines with the Claude Agent SDK and Claude Code, and internal business platforms in TypeScript and Node.js. Open to relocation (UK and Europe). Requires visa sponsorship. Available immediately.',
  },
  build: {
    heading: 'How I build',
    body: 'AI-assisted development with Claude Code, Codex and Antigravity, to cut the time from idea to finished product.',
    tools: ['Claude Code', 'Codex', 'Antigravity'],
    recently: 'Recently building with',
    firstmate: { label: 'Firstmate', href: 'https://github.com/kunchenguid/firstmate' },
  },
  profileCard: [
    { key: 'role', value: 'AI Engineer' },
    { key: 'now', value: 'Software Developer, Apidel' },
    { key: 'since', value: 'Jan 2026' },
    { key: 'stack', value: 'TypeScript · Node.js · React' },
    { key: 'data', value: 'MongoDB · PostgreSQL · SQLite' },
    { key: 'focus', value: 'Claude agent pipelines', accent: true },
    { key: 'based', value: 'Vadodara, India' },
    { key: 'open to', value: 'Relocation: UK · Europe' },
    { key: 'visa', value: 'Sponsorship required' },
    { key: 'start', value: 'Immediately' },
  ],
  languages: {
    heading: 'Languages',
    items: [
      { name: 'English', level: 'Fluent' },
      { name: 'Hindi', native: 'हिन्दी', lang: 'hi', level: 'Fluent' },
      { name: 'Gujarati', native: 'ગુજરાતી', lang: 'gu', level: 'Native' },
      { name: 'German', native: 'Deutsch', lang: 'de', level: 'Intermediate' },
      { name: 'Japanese', native: '日本語', lang: 'ja', level: 'Basic' },
    ] as readonly Language[],
  },
  marquee:
    'TypeScript + Node.js + Claude Agent SDK + Claude Code + React + MongoDB + PostgreSQL + Redis + RabbitMQ +',
  contact: {
    heading: "Let's talk about your next hire.",
    body: 'Looking for AI Engineer roles. Open to relocation (UK and Europe), requires visa sponsorship, available immediately.',
  },
  copyright: '© 2026 Aum',
  images: {
    portraitAlt: 'Aum smiling, standing at a railing in front of a small waterfall',
    fullAlt: 'Aum smiling at a railing in front of a waterfall',
  },
} as const;
