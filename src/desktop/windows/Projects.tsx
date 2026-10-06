import { Link } from 'react-router-dom';
import { projectGroups, projects, type ProjectKey } from '../../data/projects';
import { KeywordArt } from '../illustrations/KeywordArt';
import { IoTArt } from '../illustrations/IoTArt';
import { MoreArt } from '../illustrations/MoreArt';
import { PhoneDeckArt } from '../illustrations/PhoneDeckArt';
import { RecruitingArt } from '../illustrations/RecruitingArt';
import { WhatsAppArt } from '../illustrations/WhatsAppArt';
import common from '../common.module.css';
import styles from './Projects.module.css';

interface Props {
  selected: ProjectKey;
  onSelect: (key: ProjectKey) => void;
}

const ART: Record<ProjectKey, () => JSX.Element> = {
  phonedeck: PhoneDeckArt,
  seokeywords: KeywordArt,
  recruit: RecruitingArt,
  whatsapp: WhatsAppArt,
  helpdesk: MoreArt,
  taskmgmt: MoreArt,
  globalauth: MoreArt,
  hrms: IoTArt,
  ai: MoreArt,
};

export function Projects({ selected, onSelect }: Props) {
  const current = projects.find((p) => p.key === selected) ?? projects[0];
  return (
    <div className={styles.body}>
      <div className={styles.list} role="group" aria-label="Projects">
        {projectGroups.map((group) => (
          <div key={group} role="group" aria-label={group} className={styles.group}>
            <span className={styles.groupHead}>{group}</span>
            {projects
              .filter((p) => p.group === group)
              .map((p) => {
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
                    <span className={styles.label}>{p.label}</span>
                    <span className={styles.sub}>{p.sub}</span>
                  </button>
                );
              })}
          </div>
        ))}
      </div>
      <div className={styles.pane}>
        {current ? (
          <div className={common.detail}>
            {(() => {
              const Art = ART[current.key];
              return <Art />;
            })()}
            <h2
              className={`${common.rise} ${current.key === 'phonedeck' ? common.h2 : common.h2Sm}`}
              style={{ animationDelay: '0.08s' }}
            >
              {current.title}
            </h2>
            <p className={`${common.rise} ${common.lede}`} style={{ animationDelay: '0.14s' }}>
              {current.summary}
            </p>
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
            {current.key === 'phonedeck' && (
              <Link
                className={`${common.rise} ${common.link}`}
                to="/work/phonedeck"
                style={{ animationDelay: '0.32s' }}
              >
                Read the full case study →
              </Link>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
