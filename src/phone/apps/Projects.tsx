import { Link } from 'react-router-dom';
import { phoneCopy } from '../../data/phone';
import { projectGroups, projects, workCards, type ProjectKey } from '../../data/projects';
import { IotArt, MoreArt, PhoneDeckArt, RecruitArt, WhatsAppArt } from './Art';
import styles from './Apps.module.css';

const ART: Record<ProjectKey, () => JSX.Element> = {
  phonedeck: PhoneDeckArt,
  recruit: RecruitArt,
  whatsapp: WhatsAppArt,
  helpdesk: MoreArt,
  taskmgmt: MoreArt,
  globalauth: MoreArt,
  hrms: IotArt,
  ai: MoreArt,
};

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

function ProjectList({ onPick }: { onPick: (key: ProjectKey) => void }) {
  return (
    <div className={styles.list}>
      <h1 className={`${styles.rise} ${styles.h1}`}>Projects</h1>
      <p className={`${styles.rise} ${styles.lede}`} style={delay('0.06s')}>
        {phoneCopy.projectsIntro}
      </p>
      {projectGroups.map((group) => (
        <section key={group} className={styles.group} aria-label={group}>
          <h2 className={styles.groupTitle}>{group}</h2>
          {projects
            .filter((p) => p.group === group)
            .map((p) => (
              <button
                key={p.key}
                type="button"
                className={`${styles.pcard} ${styles.rise}`}
                style={delay(`${projects.indexOf(p) * 0.05}s`)}
                onClick={() => onPick(p.key)}
              >
                <span className={styles.pcardText}>
                  <span className={styles.pcardTitle}>{p.label}</span>
                  <span className={styles.pcardSub}>{phoneCopy.projectSubs[p.key]}</span>
                </span>
                <Chevron />
              </button>
            ))}
        </section>
      ))}
    </div>
  );
}

function ProjectDetail({ projectKey }: { projectKey: ProjectKey }) {
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
