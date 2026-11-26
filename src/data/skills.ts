export interface SkillRow {
  /** The CV splits programming languages by level. */
  level?: 'Strong' | 'Working knowledge';
  items: string[];
}

export interface SkillGroup {
  title: string;
  rows: SkillRow[];
}

export const skills: SkillGroup[] = [
  {
    title: 'Programming',
    rows: [
      { level: 'Strong', items: ['TypeScript', 'JavaScript'] },
      { level: 'Working knowledge', items: ['Java', 'Python', 'SQL'] },
    ],
  },
  {
    title: 'AI and agents',
    rows: [
      {
        items: [
          'Claude Agent SDK',
          'Claude Code',
          'multi-stage content pipelines with fact-check and human review',
        ],
      },
    ],
  },
  {
    title: 'Backend',
    rows: [
      {
        items: [
          'Node.js',
          'Bun',
          'Express',
          'Spring Boot',
          'Socket.IO',
          'REST APIs',
          'Swagger',
          'Zod',
        ],
      },
    ],
  },
  { title: 'Frontend', rows: [{ items: ['React', 'Vite', 'Tailwind CSS'] }] },
  { title: 'Databases', rows: [{ items: ['MongoDB', 'PostgreSQL', 'SQLite'] }] },
  { title: 'Queues and cache', rows: [{ items: ['Redis', 'RabbitMQ', 'BullMQ'] }] },
  { title: 'Cloud and storage', rows: [{ items: ['AWS (S3)', 'Garage'] }] },
  {
    title: 'DevOps',
    rows: [{ items: ['Git', 'GitLab CI/CD', 'GitHub Actions', 'Docker', 'PM2', 'Nginx'] }],
  },
  {
    title: 'Security',
    rows: [{ items: ['JWT authentication', 'role-based access control', 'Helmet'] }],
  },
];
