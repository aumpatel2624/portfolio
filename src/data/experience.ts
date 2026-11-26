export interface Experience {
  when: string;
  title: string;
  /** Employer or school sub-line. */
  place: string;
  points: string[];
  current: boolean;
}

export const experience: Experience[] = [
  {
    when: 'Jan 2026 – Present',
    title: 'Software Developer, Apidel Technologies',
    place: 'Vadodara, India',
    points: [
      'Main developer of the task management platform, support ticketing backend and a single sign-on service connecting 6 internal applications.',
      'Built an 11-module in-house HR management system in under 3 weeks, on an internal starter, as its only human committer, using AI coding agents (Claude Code).',
      'Resolved 151 defects across 6 products and completed 4 security and access-control reviews.',
      'Produced role-based user guides for 4 internal products, illustrated with 3,000+ screenshots.',
      'Added Microsoft Graph email notifications, single logout and Redis query caching, and moved file storage from AWS S3 to Garage.',
    ],
    current: true,
  },
  {
    when: 'Jul 2026 – Present',
    title: 'Co-founder (self-employed), Vyaris',
    place: 'Software agency · Vadodara',
    points: [
      'Co-founded a six-person, bootstrapped agency offering web, mobile, e-commerce, ERP, CRM and AI automation services.',
      'Developed and tuned the company website: page performance, responsive images and AI crawler support.',
    ],
    current: true,
  },
  {
    when: '2021 – 2025',
    title: 'BTech, Computer Science and Technology (Cybersecurity and Cloud Computing)',
    place: 'Amity University Mumbai, Mumbai, India · CGPA 8.45/10',
    points: ['Runner-up, NIRMAN Hackathon (2023)'],
    current: false,
  },
];
