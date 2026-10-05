import { Link } from 'react-router-dom';
import { alsoBuilt, projects, type ProjectKey } from '../../data/projects';
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

const ART: Record<Exclude<ProjectKey, 'more'>, () => JSX.Element> = {
  phonedeck: PhoneDeckArt,
  recruit: RecruitingArt,
  whatsapp: WhatsAppArt,
};

export function Projects({ selected, onSelect }: Props) {
  const current = projects.find((p) => p.key === selected) ?? projects[0];
  return (
    <div className={styles.body}>
      <div className={styles.list} role="group" aria-label="Projects">
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
                background: sel ? '#2C201C' : 'transparent',
                borderLeftColor: sel ? 'var(--acc, #FFB020)' : 'transparent',
              }}
            >
              <span className={styles.label}>{p.label}</span>
              <span className={styles.sub}>{p.sub}</span>
            </button>
          );
        })}
      </div>
      <div className={styles.pane}>
        {current?.key === 'more' ? (
          <div className={styles.moreDetail}>
            <MoreArt />
            <h2 className={`${common.rise} ${common.h2Sm}`} style={{ animationDelay: '0.08s' }}>
              Also built
            </h2>
            {alsoBuilt.map((item, i) => (
              <div
                key={item.title}
                className={`${common.rise} ${styles.also}`}
                style={{ animationDelay: `${0.14 + i * 0.06}s` }}
              >
                <h3 className={styles.alsoTitle}>{item.title}</h3>
                <p className={common.lede}>{item.desktop}</p>
              </div>
            ))}
          </div>
        ) : current ? (
          <div className={common.detail}>
            {(() => {
              const Art = ART[current.key as Exclude<ProjectKey, 'more'>];
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
            <ul className={`${common.rise} ${common.bullets}`} style={{ animationDelay: '0.2s' }}>
              {current.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className={`${common.rise} ${common.stack}`} style={{ animationDelay: '0.26s' }}>
              {current.stack}
            </div>
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
