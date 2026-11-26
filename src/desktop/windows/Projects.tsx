import type { Project, ProjectArtName, ProjectKey } from '../../data/projects';
import { AiArt } from '../illustrations/AiArt';
import { DocumentsArt } from '../illustrations/DocumentsArt';
import { MoreArt } from '../illustrations/MoreArt';
import common from '../common.module.css';
import styles from './Projects.module.css';

interface Props {
  /** The CV section heading, above the list. */
  heading: string;
  projects: Project[];
  selected: ProjectKey;
  onSelect: (key: ProjectKey) => void;
}

const ART: Record<ProjectArtName, () => JSX.Element> = {
  ai: () => <AiArt className={common.art} />,
  documents: DocumentsArt,
  more: MoreArt,
};

/** List and detail window for one project section. */
export function Projects({ heading, projects, selected, onSelect }: Props) {
  const current = projects.find((p) => p.key === selected) ?? projects[0];
  const Art = current ? ART[current.art] : null;
  return (
    <div className={styles.body}>
      <div className={styles.list} role="group" aria-label={heading}>
        <h2 className={styles.groupHead}>{heading}</h2>
        {projects.map((p) => {
          const sel = p.key === selected;
          return (
            <button
              key={p.key}
              type="button"
              className={`${common.plist} ${styles.item}`}
              aria-pressed={sel}
              onClick={() => onSelect(p.key)}
              style={{
                background: sel ? 'var(--surface-2)' : 'transparent',
                borderLeftColor: sel ? 'var(--acc)' : 'transparent',
              }}
            >
              <span className={styles.label}>{p.title}</span>
              {p.context && <span className={styles.sub}>{p.context}</span>}
            </button>
          );
        })}
      </div>
      <div className={styles.pane}>
        {current && Art ? (
          <div className={common.detail} key={current.key}>
            <Art />
            <h3 className={`${common.rise} ${common.h2Sm}`} style={{ animationDelay: '0.08s' }}>
              {current.title}
            </h3>
            {current.context && <div className={styles.context}>{current.context}</div>}
            {current.summary && (
              <p className={`${common.rise} ${common.lede}`} style={{ animationDelay: '0.14s' }}>
                {current.summary}
              </p>
            )}
            {current.bullets.length > 0 && (
              <ul className={`${common.rise} ${common.bullets}`} style={{ animationDelay: '0.2s' }}>
                {current.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            {current.stack && (
              <div className={`${common.rise} ${common.stack}`} style={{ animationDelay: '0.26s' }}>
                {current.stack}
              </div>
            )}
            {current.link && (
              <a
                className={`${common.rise} ${common.link} ${styles.repo}`}
                href={current.link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ animationDelay: '0.32s' }}
              >
                {current.link.label}
              </a>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
