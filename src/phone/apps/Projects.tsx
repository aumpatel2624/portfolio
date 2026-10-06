import { Link } from 'react-router-dom';
import { phoneCopy } from '../../data/phone';
import { alsoBuilt, projects, workCards, type ProjectKey } from '../../data/projects';
import { MoreArt, PhoneDeckArt, RecruitArt, WhatsAppArt } from './Art';
import styles from './Apps.module.css';

const ART: Record<Exclude<ProjectKey, 'more'>, () => JSX.Element> = {
  phonedeck: PhoneDeckArt,
  recruit: RecruitArt,
  whatsapp: WhatsAppArt,
};

const delay = (s: string) => ({ animationDelay: s });

function Chevron() {
  return (
    <svg
      width="10"
      height="16"
      viewBox="0 0 10 16"
      fill="none"
      stroke="var(--acc, #FFB020)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 2l6 6-6 6" />
    </svg>
  );
}

function ProjectList({ onPick }: { onPick: (key: ProjectKey) => void }) {
  return (
    <div className={styles.list}>
      <h1 className={`${styles.rise} ${styles.h1}`}>Projects</h1>
      <p className={`${styles.rise} ${styles.lede}`} style={delay('0.06s')}>
        {phoneCopy.projectsIntro}
      </p>
      {projects.map((p, i) => (
        <button
          key={p.key}
          type="button"
          className={`${styles.pcard} ${styles.rise}`}
          style={delay(`${i * 0.05}s`)}
          onClick={() => onPick(p.key)}
        >
          <span className={styles.pcardText}>
            <span className={styles.pcardTitle}>{p.label}</span>
            <span className={styles.pcardSub}>{phoneCopy.projectSubs[p.key]}</span>
          </span>
          <Chevron />
        </button>
      ))}
    </div>
  );
}

function ProjectDetail({ projectKey }: { projectKey: ProjectKey }) {
  if (projectKey === 'more') {
    return (
      <div className={styles.detail} style={{ gap: 18 }}>
        <MoreArt />
        <h2 className={`${styles.rise} ${styles.h2}`} style={delay('0.08s')}>
          Also built
        </h2>
        {alsoBuilt.map((item, i) => (
          <div
            key={item.title}
            className={`${styles.rise} ${styles.also}`}
            style={delay(`${0.14 + i * 0.06}s`)}
          >
            <h3 className={styles.h3}>{item.title}</h3>
            <p className={styles.lede}>{item.desktop}</p>
          </div>
        ))}
      </div>
    );
  }
  const project = projects.find((p) => p.key === projectKey);
  const href = workCards.find((c) => c.key === projectKey)?.href;
  const Art = ART[projectKey];
  if (!project) return null;
  return (
    <div className={styles.detail}>
      <Art />
      <h2 className={`${styles.rise} ${styles.h2}`} style={delay('0.08s')}>
        {project.title}
      </h2>
      <p className={`${styles.rise} ${styles.lede}`} style={delay('0.14s')}>
        {project.summary}
      </p>
      <ul className={`${styles.rise} ${styles.bullets}`} style={delay('0.2s')}>
        {project.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <div className={`${styles.rise} ${styles.meta}`} style={delay('0.26s')}>
        {project.stack}
      </div>
      {href && (
        <Link className={`${styles.rise} ${styles.link}`} style={delay('0.32s')} to={href}>
          {phoneCopy.caseStudy}
        </Link>
      )}
    </div>
  );
}

export function Projects({
  project,
  onPick,
}: {
  project: ProjectKey | null;
  onPick: (key: ProjectKey) => void;
}) {
  // Re-keyed so the entrance animation replays when the project changes.
  return project ? (
    <ProjectDetail key={project} projectKey={project} />
  ) : (
    <ProjectList onPick={onPick} />
  );
}
