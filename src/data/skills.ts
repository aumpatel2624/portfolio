export interface SkillGroup {
  title: string;
  /** Desktop and classic pages list the same skills in a slightly different order. */
  desktop: string[];
  classic: string[];
  /** Optional line under the chips. */
  note?: string;
}

export const skills: SkillGroup[] = [
  {
    title: 'Backend',
    desktop: ['Node.js', 'TypeScript', 'Express', 'Spring Boot', 'Bun', 'Socket.IO'],
    classic: ['Node.js', 'TypeScript', 'Express', 'Spring Boot', 'Bun', 'Socket.IO'],
  },
  {
    title: 'Data and queues',
    desktop: ['PostgreSQL', 'MongoDB', 'Redis', 'BullMQ', 'RabbitMQ'],
    classic: ['PostgreSQL', 'MongoDB', 'Redis', 'BullMQ', 'RabbitMQ'],
  },
  {
    title: 'AI',
    desktop: ['Gemini API', 'Groq', 'Structured outputs', 'Prompt design'],
    classic: ['Gemini API', 'Groq', 'Structured outputs', 'Prompt design'],
  },
  {
    title: 'Frontend and infra',
    desktop: ['React', 'Next.js', 'Electron', 'Docker', 'nginx', 'AWS'],
    classic: ['React', 'Docker', 'AWS', 'Next.js', 'Electron', 'nginx'],
  },
  {
    title: 'Environments',
    desktop: ['Linux', 'Windows'],
    classic: ['Linux', 'Windows'],
    note: 'Deep understanding of Linux, my preferred environment and one I rely on heavily.',
  },
];
