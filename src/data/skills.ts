export interface SkillGroup {
  title: string;
  items: string[];
  /** Optional line under the chips. */
  note?: string;
}

export const skills: SkillGroup[] = [
  {
    title: 'Programming',
    items: ['TypeScript', 'JavaScript', 'Java', 'Python', 'SQL'],
    note: 'Strong: TypeScript, JavaScript. Working knowledge: Java, Python, SQL.',
  },
  {
    title: 'AI and agents',
    items: ['Claude Agent SDK', 'Claude Code'],
    note: 'Multi-stage content pipelines with fact-check and human review.',
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Bun', 'Express', 'Spring Boot', 'Socket.IO', 'REST APIs', 'Swagger', 'Zod'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Vite', 'Tailwind CSS'],
  },
  {
    title: 'Databases',
    items: ['MongoDB', 'PostgreSQL', 'SQLite'],
  },
  {
    title: 'Queues and cache',
    items: ['Redis', 'RabbitMQ', 'BullMQ'],
  },
  {
    title: 'Cloud and storage',
    items: ['AWS (S3)', 'Garage'],
  },
  {
    title: 'DevOps',
    items: ['Git', 'GitLab CI/CD', 'GitHub Actions', 'Docker', 'PM2', 'Nginx'],
  },
  {
    title: 'Security',
    items: ['JWT authentication', 'Role-based access control', 'Helmet'],
  },
  {
    title: 'Environments',
    items: ['Linux', 'Windows'],
    note: 'Deep understanding of Linux, my preferred environment and one I rely on heavily.',
  },
];
