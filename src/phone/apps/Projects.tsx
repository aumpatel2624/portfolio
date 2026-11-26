import type { Project, ProjectKey } from '../../data/projects';
import { ProjectArt } from './Art';
import styles from './Apps.module.css';

const delay = (s: string) => ({ animationDelay: s });

function Chevron() {
  return (
    <svg
      width="10"
      height="16"
      viewBox="0 0 10 16"
      fill="none"
      stroke="var(--acc)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 2l6 6-6 6" />
    </svg>
  );
}

interface ListProps {
  /** The CV section heading. */
  heading: string;
  /** Second half of the heading, set smaller. */
  scope?: string;
  projects: Project[];
  onPick: (key: ProjectKey) => void;
}

function ProjectList({ heading, scope, projects, onPick }: ListProps) {
  return (
    <div className={styles.list}>
      <h1 className={`${styles.rise} ${styles.h1}`}>
        {heading}
        {scope && <span className={styles.scope}> · {scope}</span>}
      </h1>
      {projects.map((p, i) => (
        <button
          key={p.key}
          type="button"
          className={`${styles.pcard} ${styles.rise}`}
          style={delay(`${(i * 0.05).toFixed(2)}s`)}
          onClick={() => onPick(p.key)}
        >
          <span className={styles.pcardText}>
            <span className={styles.pcardTitle}>{p.title}</span>
            {p.context && <span className={styles.pcardSub}>{p.context}</span>}
          </span>
          <Chevron />
        </button>
      ))}
    </div>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className={styles.detail}>
      <ProjectArt name={project.art} />
      <h2 className={`${styles.rise} ${styles.h2}`} style={delay('0.08s')}>
        {project.title}
      </h2>
      {project.context && <div className={styles.when}>{project.context}</div>}
      {project.summary && (
        <p className={`${styles.rise} ${styles.lede}`} style={delay('0.14s')}>
          {project.summary}
        </p>
      )}
      {project.bullets.length > 0 && (
        <ul className={`${styles.rise} ${styles.bullets}`} style={delay('0.2s')}>
          {project.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {project.stack && (
        <div className={`${styles.rise} ${styles.meta}`} style={delay('0.26s')}>
          {project.stack}
        </div>
      )}
      {project.link && (
        <a
          className={`${styles.rise} ${styles.link}`}
          style={delay('0.32s')}
          href={project.link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.link.label}
        </a>
      )}
    </div>
  );
}

export function Projects({ selected, ...list }: ListProps & { selected: ProjectKey | null }) {
  const project = list.projects.find((p) => p.key === selected);
  // Re-keyed so the entrance animation replays when the project changes.
  return project ? (
    <ProjectDetail key={project.key} project={project} />
  ) : (
    <ProjectList {...list} />
  );
}
