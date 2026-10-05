export interface Experience {
  when: string;
  title: string;
  /** Classic page sub-line. */
  place: string;
  /** Desktop window body. */
  desktop: string;
  /** Classic page body. */
  classic: string;
  current: boolean;
}

export const experience: Experience[] = [
  {
    when: 'Jan 2026 – Present',
    title: 'Full Stack Engineer, Apidel Technologies',
    place: 'Vadodara, India',
    desktop:
      'Building internal products: a helpdesk API with SLA scheduling, a content-workflow platform, an SSO hub across six internal apps, and an HRMS.',
    classic:
      'Building internal products: a helpdesk API with SLA scheduling, a content-workflow platform, an SSO hub across six internal apps, and an HRMS.',
    current: true,
  },
  {
    when: '[YEAR] – Present',
    title: 'Co-founder, Vyaris',
    place: 'Software agency · six people · Vadodara',
    desktop:
      'Software agency of six people in Vadodara. Websites, CRMs, ERP and automation for mid-size businesses, built on React, Express and MongoDB.',
    classic:
      'Websites, CRMs, ERP and automation for mid-size businesses, built on React, Express and MongoDB.',
    current: true,
  },
  {
    when: 'Graduated 2025',
    title: 'B.Tech, Computer Science',
    place: 'Amity University Mumbai · CGPA 8.31',
    desktop:
      'Amity University Mumbai, CGPA 8.31. AWS Cloud Foundations and AWS Security Foundations certified.',
    classic: 'AWS Cloud Foundations and AWS Security Foundations certified.',
    current: false,
  },
];
