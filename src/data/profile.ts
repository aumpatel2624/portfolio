/** Header lines and profile paragraph, in the CV's wording. The CV's phone number is left out. */
export const profile = {
  name: 'Aum Patel',
  role: 'AI Engineer',
  location: 'Vadodara, Gujarat, India',
  relocation: 'Open to relocation (UK and Europe)',
  visa: 'Requires visa sponsorship',
  availability: 'Available immediately',
  summary:
    'Software developer building full-stack products and AI agent tooling. At Apidel Technologies since January 2026, working on internal business platforms in TypeScript and Node.js. Builds AI pipelines using the Claude Agent SDK and Claude Code, with research, fact-check and human review stages. Looking for AI Engineer roles in the UK and Europe.',
  meta: {
    title: 'Aum Patel · AI Engineer',
    description:
      'Aum Patel, AI Engineer, Vadodara, Gujarat, India. Software developer building full-stack products and AI agent tooling.',
  },
  marquee:
    'TypeScript + Node.js + Claude Agent SDK + Claude Code + React + MongoDB + PostgreSQL + Redis + RabbitMQ +',
  /** Alt text for both photos. */
  photoAlt: 'Aum Patel',
} as const;

/** The CV's third header line. */
export const statusLine = [profile.relocation, profile.visa, profile.availability].join(' · ');
