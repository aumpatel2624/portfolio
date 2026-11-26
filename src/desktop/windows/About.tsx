import { asset } from '../../lib/asset';
import { AsciiPhoto } from '../../ascii/AsciiPhoto';
import { avatarAscii } from '../../ascii/art.generated';
import { emailHref, links, linkText } from '../../data/links';
import { profile, statusLine } from '../../data/profile';
import { Typewriter } from '../../components/Typewriter';
import { sections } from '../../data/sections';
import type { WindowId } from '../../data/windows';
import { PlaceholderLink } from '../../lib/PlaceholderLink';
import common from '../common.module.css';
import styles from './About.module.css';

export function About({ onOpen }: { onOpen: (id: WindowId) => void }) {
  return (
    <div className={styles.body}>
      <div className={`${common.rise} ${styles.side}`} style={{ animationDelay: '0.1s' }}>
        <div className={styles.photo}>
          <AsciiPhoto
            src={asset('images/aum-portrait.jpg')}
            alt={profile.photoAlt}
            width={148}
            height={190}
            objectPosition="50% 12%"
            art={avatarAscii}
            size="md"
            mode="toggle"
          />
          <span className={styles.dot} aria-hidden="true" />
        </div>
      </div>

      <div className={styles.main}>
        <div className={`${common.rise} ${styles.pill}`} style={{ animationDelay: '0.15s' }}>
          <span className={styles.pillDot} aria-hidden="true" />
          {statusLine}
        </div>
        <h1 className={`${common.rise} ${styles.h1}`} style={{ animationDelay: '0.2s' }}>
          {profile.name}
          <span className={styles.acc}>.</span>
        </h1>
        <div className={styles.prompt}>
          <span className={styles.acc}>$ </span>
          <Typewriter text={profile.role} />
        </div>
        <ul className={`${common.rise} ${styles.header}`} style={{ animationDelay: '0.26s' }}>
          <li>{profile.location}</li>
          <li>
            <PlaceholderLink href={emailHref(links.email)} className={common.link}>
              {links.email}
            </PlaceholderLink>
          </li>
          <li>
            <PlaceholderLink href={links.linkedin} className={common.link}>
              {linkText.linkedin}
            </PlaceholderLink>
          </li>
          <li>
            <PlaceholderLink href={links.github} className={common.link}>
              {linkText.github}
            </PlaceholderLink>
          </li>
        </ul>
        <div className={`${common.rise} ${styles.profile}`} style={{ animationDelay: '0.34s' }}>
          <h2 className={styles.profileHead}>{sections.profile}</h2>
          <p className={styles.summary}>{profile.summary}</p>
        </div>
        <div className={`${common.rise} ${styles.actions}`} style={{ animationDelay: '0.42s' }}>
          <button
            type="button"
            className={`${common.btn} ${styles.primary}`}
            onClick={() => onOpen('ai')}
          >
            Open {sections.ai}
          </button>
          <button
            type="button"
            className={`${common.btn} ${styles.secondary}`}
            onClick={() => onOpen('contact')}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}
