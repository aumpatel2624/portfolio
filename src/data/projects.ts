import { links, linkText } from './links';

export type ProjectKey =
  'content' | 'podcast' | 'agents' | 'seo' | 'hrms' | 'taskmgmt' | 'helpdesk';

/** Which illustration sits above the detail view. */
export type ProjectArtName = 'ai' | 'documents' | 'more';

export interface Project {
  key: ProjectKey;
  title: string;
  /** The text after the "|" beside the title in the CV. */
  context?: string;
  /** Paragraph under the title. */
  summary?: string;
  bullets: string[];
  /** Tech-stack line. */
  stack?: string;
  link?: { label: string; href: string };
  art: ProjectArtName;
}

/** CV section "AI engineering". */
export const aiProjects: Project[] = [
  {
    key: 'content',
    title: 'AI content generator',
    context: 'Vyaris',
    summary:
      'Claude Agent SDK pipelines for LinkedIn posts and blogs with 7 stages (topic ideation, research, drafting, fact-check, SEO, brand voice, compliance), automatic revision, human review and daily generation limits.',
    bullets: [],
    stack: 'Node.js, Express, React, MongoDB, Firecrawl · Built with Claude Code',
    art: 'ai',
  },
  {
    key: 'podcast',
    title: 'Podcast knowledge pipeline',
    context: 'Personal project',
    summary:
      '58 episodes analysed. Across 49 in the knowledge base, 44,600+ extracted items each carry a transcript quote checked in code; a second-model pass fixed 7,100+ items and removed 1,100+.',
    bullets: [],
    stack:
      'Python, yt-dlp, faster-whisper, SQLite full-text search, headless Claude Code · Built with Claude Code',
    art: 'ai',
  },
  {
    key: 'agents',
    title: 'Multi-agent development pipeline for Claude Code',
    context: 'Public on GitHub',
    summary:
      'XML-driven pipeline of 9 specialised agents that analyse project context, turn a request into an XML specification and route it to backend or frontend work.',
    bullets: [],
    link: { label: linkText.claudeAgents, href: links.claudeAgents },
    art: 'ai',
  },
  {
    key: 'seo',
    title: 'SEO keyword research tool',
    summary: 'Python command-line tool using the standard library, tested with pytest.',
    bullets: [],
    art: 'ai',
  },
];

/** CV section "Selected work projects · Apidel Technologies (private, internal)". */
export const workProjects: Project[] = [
  {
    key: 'hrms',
    title: 'HR management system',
    bullets: [
      'Brings the employee lifecycle, from recruitment and onboarding to leave, attendance, payroll and performance, into one system.',
      'Delivered 11 modules, each with API, admin screens and seed data, between 10 and 28 September 2026.',
      'Added tests for payroll, tax and leave calculations.',
    ],
    stack: 'Node.js, Express, MongoDB, Redis, React, Vite, Tailwind CSS, TanStack Query, Recharts',
    art: 'documents',
  },
  {
    key: 'taskmgmt',
    title: 'Task management platform',
    context: 'Main developer',
    bullets: [
      'Helps creative and social media teams across several companies move work from requirements through assignment, two-stage quality review and publishing.',
      'Includes role-based access control, real-time updates with Socket.IO and Swagger API documentation.',
      'Test suite of 700+ automated tests.',
    ],
    stack:
      'React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Bun, Express, MongoDB, Socket.IO, Swagger',
    art: 'more',
  },
  {
    key: 'helpdesk',
    title: 'Support ticketing system',
    context: 'Main backend developer',
    bullets: [
      'Lets teams raise, track and resolve support tickets with dashboards and reports; opens tickets automatically from server monitoring alerts.',
      'Shared Redis caching cut database queries from 5 to 2 when five users reloaded a team board (in testing).',
      'Made all 26 screens usable on phones from 360px wide; backend suite of 480+ automated tests.',
    ],
    stack:
      'Node.js, Express, MongoDB, Redis, RabbitMQ, Socket.IO, S3-compatible storage, Zod, Jest, Swagger',
    art: 'more',
  },
];
