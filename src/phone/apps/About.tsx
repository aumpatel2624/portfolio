import { asset } from '../../lib/asset';
import { emailHref, links, linkText } from '../../data/links';
import { profile, statusLine } from '../../data/profile';
import { sections } from '../../data/sections';
import { Typewriter } from '../../components/Typewriter';
import { PlaceholderLink } from '../../lib/PlaceholderLink';
import { PhonePhoto } from './PhonePhoto';
import styles from './Apps.module.css';

const delay = (s: string) => ({ animationDelay: s });

export function About({
  onProjects,
  onContact,
}: {
  onProjects: () => void;
  onContact: () => void;
}) {
  return (
    <div className={styles.col}>
      <div className={`${styles.rise} ${styles.photo}`}>
        <PhonePhoto
          src={asset('images/aum-portrait.jpg')}
          alt={profile.photoAlt}
          objectPosition="50% 12%"
        />
      </div>
      <div className={`${styles.rise} ${styles.pill}`} style={delay('0.1s')}>
        <span className={styles.pillDot} aria-hidden="true" />
        {statusLine}
      </div>
      <h1 className={`${styles.rise} ${styles.hello}`} style={delay('0.15s')}>
        {profile.name}
        <span className={styles.acc}>.</span>
      </h1>
      <div className={styles.prompt}>
        <span className={styles.acc}>$ </span>
        <Typewriter text={profile.role} />
      </div>
      <ul className={`${styles.rise} ${styles.header}`} style={delay('0.2s')}>
        <li>{profile.location}</li>
        <li>
          <PlaceholderLink href={emailHref(links.email)} className={styles.headerLink}>
            {links.email}
          </PlaceholderLink>
        </li>
        <li>
          <PlaceholderLink href={links.linkedin} className={styles.headerLink}>
            {linkText.linkedin}
          </PlaceholderLink>
        </li>
        <li>
          <PlaceholderLink href={links.github} className={styles.headerLink}>
            {linkText.github}
          </PlaceholderLink>
        </li>
      </ul>
      <section className={`${styles.rise} ${styles.group}`} style={delay('0.28s')}>
        <h2 className={styles.groupTitle}>{sections.profile}</h2>
        <p className={styles.intro}>{profile.summary}</p>
      </section>
      <div className={`${styles.rise} ${styles.actions}`} style={delay('0.36s')}>
        <button type="button" className={`${styles.btn} ${styles.primary}`} onClick={onProjects}>
          Open {sections.ai}
        </button>
        <button type="button" className={`${styles.btn} ${styles.secondary}`} onClick={onContact}>
          Contact
        </button>
      </div>
    </div>
  );
}
