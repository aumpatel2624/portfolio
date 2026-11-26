import { links } from './links';

export type ProjectKey =
  'phonedeck' | 'content' | 'podcast' | 'agents' | 'hrms' | 'taskmgmt' | 'helpdesk' | 'sso';

export type ProjectGroup = 'Personal' | 'AI engineering' | 'Apidel';

/** Order the groups appear in the Projects window and app. */
export const projectGroups: ProjectGroup[] = ['Personal', 'AI engineering', 'Apidel'];

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  key: ProjectKey;
  group: ProjectGroup;
  /** Left-hand list in the Projects window. */
  label: string;
  sub: string;
  /** Detail pane. */
  title: string;
  summary: string;
  bullets: string[];
  stack: string;
  /** Public repository. */
  link?: ProjectLink;
}

const agentsRepo: ProjectLink = { label: 'View on GitHub →', href: links.claudeAgents };

export const projects: Project[] = [
  {
    key: 'phonedeck',
    group: 'Personal',
    label: 'PhoneDeck',
    sub: 'Remote launcher',
    title: 'PhoneDeck',
    summary:
      'A Steam Deck-style Android launcher for a Windows laptop, over a Noise-encrypted WebSocket channel.',
    bullets: [
      'Custom Noise IK handshake, checked against reference test vectors.',
      'Property-based fuzz tests on the protocol and server edge. 41 test files, CI on every PR.',
      'The laptop only acts on cards it stores, and pairing needs an explicit Allow.',
    ],
    stack: 'TypeScript · Electron · Expo · C# · ~15.6k lines · 31 PRs in 4 days',
  },
  {
    key: 'content',
    group: 'AI engineering',
    label: 'AI content generator',
    sub: 'Vyaris',
    title: 'AI content generator',
    summary: 'Claude Agent SDK pipelines for LinkedIn posts and blogs, built at Vyaris.',
    bullets: [
      '7 stages: topic ideation, research, drafting, fact-check, SEO, brand voice and compliance.',
      'Automatic revision, human review and daily generation limits.',
      'Built with Claude Code.',
    ],
    stack: 'Node.js · Express · React · MongoDB · Firecrawl',
  },
  {
    key: 'podcast',
    group: 'AI engineering',
    label: 'Podcast pipeline',
    sub: 'Personal project',
    title: 'Podcast knowledge pipeline',
    summary: 'A personal project that turns podcast episodes into a checked knowledge base.',
    bullets: [
      '58 episodes analysed.',
      'Across 49 in the knowledge base, 44,600+ extracted items each carry a transcript quote checked in code.',
      'A second-model pass fixed 7,100+ items and removed 1,100+.',
      'Built with Claude Code.',
    ],
    stack: 'Python · yt-dlp · faster-whisper · SQLite full-text search · headless Claude Code',
  },
  {
    key: 'agents',
    group: 'AI engineering',
    label: 'Claude Code agents',
    sub: 'Public on GitHub',
    title: 'Multi-agent development pipeline for Claude Code',
    summary:
      'XML-driven pipeline of 9 specialised agents that analyse project context, turn a request into an XML specification and route it to backend or frontend work.',
    bullets: [],
    stack: '',
    link: agentsRepo,
  },
  {
    key: 'hrms',
    group: 'Apidel',
    label: 'HR management',
    sub: '11 modules',
    title: 'HR management system',
    summary:
      'Brings the employee lifecycle, from recruitment and onboarding to leave, attendance, payroll and performance, into one system.',
    bullets: [
      'Delivered 11 modules, each with API, admin screens and seed data, between 10 and 28 September 2026.',
      'Added tests for payroll, tax and leave calculations.',
    ],
    stack:
      'Node.js · Express · MongoDB · Redis · React · Vite · Tailwind CSS · TanStack Query · Recharts',
  },
  {
    key: 'taskmgmt',
    group: 'Apidel',
    label: 'Task management',
    sub: 'Main developer',
    title: 'Task management platform',
    summary:
      'Helps creative and social media teams across several companies move work from requirements through assignment, two-stage quality review and publishing.',
    bullets: [
      'Role-based access control, real-time updates with Socket.IO and Swagger API documentation.',
      'Test suite of 700+ automated tests.',
    ],
    stack:
      'React · TypeScript · Vite · Tailwind CSS · shadcn/ui · Bun · Express · MongoDB · Socket.IO · Swagger',
  },
  {
    key: 'helpdesk',
    group: 'Apidel',
    label: 'Support ticketing',
    sub: 'Main backend developer',
    title: 'Support ticketing system',
    summary:
      'Lets teams raise, track and resolve support tickets with dashboards and reports; opens tickets automatically from server monitoring alerts.',
    bullets: [
      'Shared Redis caching cut database queries from 5 to 2 when five users reloaded a team board (in testing).',
      'Made all 26 screens usable on phones from 360px wide; backend suite of 480+ automated tests.',
    ],
    stack:
      'Node.js · Express · MongoDB · Redis · RabbitMQ · Socket.IO · S3-compatible storage · Zod · Jest · Swagger',
  },
  {
    key: 'sso',
    group: 'Apidel',
    label: 'Single sign-on',
    sub: 'Main developer',
    title: 'Single sign-on service',
    summary: 'A single sign-on service connecting 6 internal applications.',
    bullets: [],
    stack: '',
  },
];

/** Cards on the classic page and mobile layout. */
export interface WorkCard {
  key: 'phonedeck' | 'content' | 'podcast' | 'agents';
  kind: string;
  badge: string;
  featured: boolean;
  title: string;
  summary: string;
  flow: string[];
  stack: string;
  /** Route of the full write-up. Absent until a case study exists. */
  href?: string;
  /** Public repository. */
  link?: ProjectLink;
}

export const workCards: WorkCard[] = [
  {
    key: 'phonedeck',
    kind: 'Remote launcher',
    badge: 'Case study',
    featured: true,
    title: 'PhoneDeck',
    summary:
      'A Steam Deck-style Android launcher for a Windows laptop, over a Noise-encrypted WebSocket channel.',
    flow: ['Phone', 'Noise IK', 'Laptop', 'Windows'],
    stack: 'TypeScript · Electron · Expo · Noise protocol · C#',
    href: '/work/phonedeck',
  },
  {
    key: 'content',
    kind: 'AI content pipeline',
    badge: 'Vyaris',
    featured: false,
    title: 'AI content generator',
    summary:
      'Claude Agent SDK pipelines for LinkedIn posts and blogs with 7 stages, automatic revision, human review and daily generation limits.',
    flow: ['Research', 'Drafting', 'Fact-check', 'Human review'],
    stack: 'Node.js · Express · React · MongoDB · Firecrawl',
  },
  {
    key: 'podcast',
    kind: 'Knowledge pipeline',
    badge: 'Personal',
    featured: false,
    title: 'Podcast knowledge pipeline',
    summary:
      '58 episodes analysed. Across 49 in the knowledge base, 44,600+ extracted items each carry a transcript quote checked in code.',
    flow: ['Transcript', 'Extracted items', 'Quote check', 'Second-model pass'],
    stack: 'Python · yt-dlp · faster-whisper · SQLite · headless Claude Code',
  },
  {
    key: 'agents',
    kind: 'Agent tooling',
    badge: 'Public',
    featured: false,
    title: 'Multi-agent development pipeline for Claude Code',
    summary:
      'XML-driven pipeline of 9 specialised agents that analyse project context and route work to backend or frontend.',
    flow: ['Request', 'XML spec', 'Backend or frontend'],
    stack: 'Claude Code · XML',
    link: agentsRepo,
  },
];
