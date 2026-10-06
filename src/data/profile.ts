export const profile = {
  name: 'Aum',
  location: 'Vadodara, India',
  role: 'Full Stack Engineer',
  employer: 'Apidel Technologies',
  since: 'Jan 2026',
  openTo: 'NL · FI · DE',
  sticker: 'Open to NL · FI · DE ✱',
  availability: 'Available for new roles',
  kicker: 'Full-stack engineer · Vadodara, India',
  typewriter: 'backend + queues + LLM products',
  desktop: {
    greeting: "Hi, I'm",
    intro:
      'Full-stack engineer in Vadodara, India. I build backends and LLM-powered products in Node.js and TypeScript: queues, role-based access, real-time updates and AI parsing.',
    work: "I work at Apidel Technologies and co-founded Vyaris. I'm looking for my next role and open to relocating to the Netherlands, Finland or Germany.",
  },
  classic: {
    headline: [
      'Full-stack engineer building ',
      'LLM-powered products',
      ' and ',
      'the systems behind them.',
    ],
    intro:
      "Node.js and TypeScript in production, with MongoDB, PostgreSQL, Redis and RabbitMQ behind it. I've integrated Gemini and Groq models into recruiting and messaging products, and I'm looking for my next role.",
    mobileHeadline: [
      'Full-stack engineer building ',
      'LLM-powered products and the systems behind them.',
    ],
    mobileIntro:
      "Node.js and TypeScript in production, with MongoDB, PostgreSQL, Redis and RabbitMQ behind it. I've integrated Gemini and Groq models into recruiting and messaging products. Open to relocating to the Netherlands, Finland or Germany.",
  },
  build: {
    heading: 'How I build',
    body: 'AI-assisted development with Claude Code, Codex and Antigravity, to cut the time from idea to finished product.',
    tools: ['Claude Code', 'Codex', 'Antigravity'],
    recently: 'Recently building with',
    firstmate: { label: 'Firstmate', href: 'https://github.com/kunchenguid/firstmate' },
  },
  profileCard: [
    { key: 'role', value: 'Full Stack Engineer' },
    { key: 'at', value: 'Apidel Technologies' },
    { key: 'since', value: 'Jan 2026' },
    { key: 'stack', value: 'Node.js · TypeScript · React' },
    { key: 'data', value: 'MongoDB · PostgreSQL · Redis · RabbitMQ' },
    { key: 'focus', value: 'LLM integration · queues', accent: true },
    { key: 'based', value: 'Vadodara, India' },
    { key: 'open to', value: 'NL · FI · DE' },
  ],
  marquee:
    'Node.js + TypeScript + MongoDB + PostgreSQL + Redis + RabbitMQ + React + Electron + LLMs +',
  contact: {
    heading: "Let's talk about your next hire.",
    body: 'Open to AI engineer and full-stack roles. Relocating to the Netherlands, Finland or Germany.',
  },
  copyright: '© 2026 Aum',
  images: {
    portraitAlt: 'Aum smiling, standing at a railing in front of a small waterfall',
    fullAlt: 'Aum smiling at a railing in front of a waterfall',
  },
} as const;
