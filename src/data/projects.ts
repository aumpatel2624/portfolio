import { links } from './links';

export type ProjectKey =
  | 'phonedeck'
  | 'seokeywords'
  | 'recruit'
  | 'whatsapp'
  | 'helpdesk'
  | 'taskmgmt'
  | 'globalauth'
  | 'hrms'
  | 'ai';

export type ProjectGroup = 'Personal' | 'Apidel' | 'Client work';

/** Order the groups appear in the Projects window and app. */
export const projectGroups: ProjectGroup[] = ['Personal', 'Apidel', 'Client work'];

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
}

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
    key: 'seokeywords',
    group: 'Personal',
    label: 'SEO Keyword Hunt',
    sub: 'Keyword research CLI',
    title: 'SEO Keyword Hunt',
    summary:
      'Finds trending, long-tail SEO keyword candidates and ranks them, from free sources that need no API keys.',
    bullets: [
      'Pulls from Google Autocomplete (with modifier and alphabet expansion), Google Trends daily trending and Hacker News.',
      'Scores with an offline heuristic by default. Optionally TypeSafe Jev judges intent and SEO value, and any Jev error falls back to the heuristic.',
      'Includes seed lists for Vyaris. Python 3.9+, standard library only, tested with pytest.',
    ],
    stack: 'Python · CLI · Google Autocomplete · Google Trends · Hacker News · Jev',
  },
  {
    key: 'recruit',
    group: 'Client work',
    label: 'Recruiting platform',
    sub: 'Anonymised',
    title: 'Recruiting platform with Gemini parsing',
    summary: 'ATS, CRM and workforce modules for a staffing business. Client work, anonymised.',
    bullets: [
      'Gemini parses resumes and job descriptions into schema-constrained JSON.',
      'Retries on truncation and rate limits, per-user daily AI credits, every call audit-logged.',
      'Role-scoped dashboards, menu-level RBAC and an OWASP-oriented middleware stack.',
      'About 300 route definitions and 40 data models.',
    ],
    stack: 'Express · MongoDB · React · Bun · Nx · Playwright',
  },
  {
    key: 'whatsapp',
    group: 'Client work',
    label: 'WhatsApp panel',
    sub: 'Anonymised',
    title: 'WhatsApp panel with an LLM order parser',
    summary: 'A business messaging panel built on the Meta Cloud API. Client work, anonymised.',
    bullets: [
      'Bulk and campaign sends moved off the request path into RabbitMQ workers, with batching and a dead-letter queue.',
      'A separate service uses an LLM (Groq, Llama 3.3 70B) to turn free-text orders into catalog-matched structured orders.',
      'Shared inbox, template sync, Flows and RBAC.',
    ],
    stack: 'Express 5 · MongoDB · RabbitMQ · React 19 · Groq',
  },
  {
    key: 'helpdesk',
    group: 'Apidel',
    label: 'Helpdesk',
    sub: 'Support ticketing',
    title: 'Helpdesk',
    summary: 'A support ticketing software.',
    bullets: [],
    stack: '',
  },
  {
    key: 'taskmgmt',
    group: 'Apidel',
    label: 'Task management',
    sub: 'Graphics team',
    title: 'Task management',
    summary: 'A task management software for managing tasks for the graphics team.',
    bullets: [],
    stack: '',
  },
  {
    key: 'globalauth',
    group: 'Apidel',
    label: 'Global auth',
    sub: 'Unified login',
    title: 'Global auth',
    summary:
      'A unified authentication software: users log in once and access the internal software, including Helpdesk and Task management.',
    bullets: [],
    stack: '',
  },
  {
    key: 'hrms',
    group: 'Apidel',
    label: 'HRMS',
    sub: 'In progress',
    title: 'HRMS',
    summary:
      'Being built from scratch to replace a third-party HR software. A full HRMS with IoT integrations for access control and time attendance, by tapping an ID card.',
    bullets: [],
    stack: '',
  },
  {
    key: 'ai',
    group: 'Apidel',
    label: 'AI integration',
    sub: 'Across several products',
    title: 'AI integration',
    summary:
      'Development and integration of AI into several software products, to reduce the number of people doing the same repetitive tasks.',
    bullets: [],
    stack: '',
  },
];

/** Cards on the classic page and mobile layout. */
export interface WorkCard {
  key: 'phonedeck' | 'seokeywords' | 'recruit' | 'whatsapp';
  kind: string;
  badge: string;
  featured: boolean;
  title: string;
  summary: string;
  flow: string[];
  stack: string;
  /** Route of the full write-up. Absent until a case study exists. */
  href?: string;
  /** Repository link while public, otherwise the inert placeholder from links.ts. */
  repo?: string;
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
    key: 'seokeywords',
    kind: 'Keyword research CLI',
    badge: 'Personal',
    featured: false,
    title: 'SEO Keyword Hunt',
    summary:
      'Finds trending, long-tail SEO keyword candidates and ranks them, from free sources. Scoring is an offline heuristic, with optional Jev scoring that falls back to the heuristic on any error.',
    flow: ['Autocomplete · Trends · HN', 'Score', 'Ranked CSV'],
    stack: 'Python · CLI · Google Autocomplete · Google Trends · Hacker News · Jev',
    repo: links.seoKeywordHuntRepo,
  },
  {
    key: 'recruit',
    kind: 'Staffing platform',
    badge: 'Anonymised',
    featured: false,
    title: 'Recruiting platform with Gemini parsing',
    summary:
      'ATS, CRM and workforce modules for a staffing business, with AI parsing of resumes and job descriptions.',
    flow: ['React SPA', 'Express API', 'AI credits', 'Gemini'],
    stack: 'Express · MongoDB · React · Bun · Nx · Playwright',
  },
  {
    key: 'whatsapp',
    kind: 'Messaging platform',
    badge: 'Anonymised',
    featured: false,
    title: 'WhatsApp panel with an LLM order parser',
    summary:
      'Shared inbox, scheduled campaigns and queued bulk sends, plus a service that turns free-text orders into structured ones.',
    flow: ['Webhook', 'Queue', 'LLM parser', 'Orders'],
    stack: 'Express 5 · MongoDB · RabbitMQ · React 19 · Groq',
  },
];
