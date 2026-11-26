export interface Experience {
  title: string;
  /** Employer sub-line. */
  place: string;
  when: string;
  points: string[];
  /** Tech-stack line. */
  stack: string;
}

export const experience: Experience[] = [
  {
    title: 'Software Developer',
    place: 'Apidel Technologies, Vadodara, India',
    when: 'Jan 2026 – Present',
    points: [
      'Main developer of the task management platform, support ticketing backend and a single sign-on service connecting 6 internal applications.',
      'Built an 11-module in-house HR management system in under 3 weeks, on an internal starter, as its only human committer, using AI coding agents (Claude Code).',
      'Resolved 151 defects across 6 products and completed 4 security and access-control reviews.',
      'Produced role-based user guides for 4 internal products, illustrated with 3,000+ screenshots.',
      'Added Microsoft Graph email notifications, single logout and Redis query caching, and moved file storage from AWS S3 to Garage.',
    ],
    stack:
      'TypeScript, JavaScript, Node.js, Bun, Express, React, Vite, Tailwind CSS, MongoDB, Redis, RabbitMQ, Socket.IO, AWS S3, Garage, Microsoft Graph API, JWT, Zod, Swagger, Jest, GitLab',
  },
  {
    title: 'Co-founder (self-employed)',
    place: 'Vyaris, software agency, Vadodara',
    when: 'Jul 2026 – Present',
    points: [
      'Co-founded a six-person, bootstrapped agency offering web, mobile, e-commerce, ERP, CRM and AI automation services.',
      'Developed and tuned the company website: page performance, responsive images and AI crawler support.',
    ],
    stack: 'React, Vite, Tailwind CSS, Bun, Express, Nx, Supabase, Nginx, PM2, GitHub Actions',
  },
];
