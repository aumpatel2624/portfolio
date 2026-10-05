import { AsciiPhoto } from '../../ascii/AsciiPhoto';
import { avatarAscii } from '../../ascii/art.generated';
import { profile } from '../../data/profile';
import type { WindowId } from '../../data/windows';
import common from '../common.module.css';
import styles from './About.module.css';

export function About({ onOpen }: { onOpen: (id: WindowId) => void }) {
  return (
    <div className={styles.body}>
      <div className={`${common.rise} ${styles.side}`} style={{ animationDelay: '0.1s' }}>
        <div className={styles.photo}>
          <AsciiPhoto
            src="/images/aum-portrait.jpg"
            alt={profile.images.portraitAlt}
            width={148}
            height={190}
            objectPosition="50% 12%"
            art={avatarAscii}
            size="md"
            mode="toggle"
          />
          <span className={styles.dot} aria-hidden="true" />
        </div>
        <span className={styles.caption}>Aum · {profile.location}</span>
      </div>

      <div className={styles.main}>
        <div className={`${common.rise} ${styles.pill}`} style={{ animationDelay: '0.15s' }}>
          <span className={styles.pillDot} aria-hidden="true" />
          {profile.availability}
        </div>
        <h1 className={`${common.rise} ${styles.h1}`} style={{ animationDelay: '0.2s' }}>
          {profile.desktop.greeting} <span className={styles.acc}>{profile.name}.</span>
        </h1>
        <div className={styles.prompt}>
          <span className={styles.acc}>$ </span>
          <span className={styles.type}>{profile.typewriter}</span>
        </div>
        <p className={`${common.rise} ${styles.intro}`} style={{ animationDelay: '0.3s' }}>
          {profile.desktop.intro}
        </p>
        <p className={`${common.rise} ${styles.work}`} style={{ animationDelay: '0.38s' }}>
          {profile.desktop.work}
        </p>
        <div className={`${common.rise} ${styles.actions}`} style={{ animationDelay: '0.46s' }}>
          <button
            type="button"
            className={`${common.btn} ${styles.primary}`}
            onClick={() => onOpen('projects')}
          >
            Open projects
          </button>
          <button
            type="button"
            className={`${common.btn} ${styles.secondary}`}
            onClick={() => onOpen('contact')}
          >
            Contact me
          </button>
        </div>
      </div>
    </div>
  );
}
