import { SkillIcon } from '../../components/SkillIcon';
import { profile } from '../../data/profile';
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
          src="/images/aum-portrait.jpg"
          alt={profile.images.portraitAlt}
          objectPosition="50% 12%"
        />
      </div>
      <div className={`${styles.rise} ${styles.pill}`} style={delay('0.1s')}>
        <span className={styles.pillDot} aria-hidden="true" />
        {profile.availability}
      </div>
      <h1 className={`${styles.rise} ${styles.hello}`} style={delay('0.15s')}>
        {profile.desktop.greeting} <span className={styles.acc}>{profile.name}.</span>
      </h1>
      <div className={styles.prompt}>
        <span className={styles.acc}>$ </span>
        <span className={styles.type}>{profile.typewriter}</span>
      </div>
      <p className={`${styles.rise} ${styles.intro}`} style={delay('0.25s')}>
        {profile.desktop.intro}
      </p>
      <p className={`${styles.rise} ${styles.lede}`} style={delay('0.32s')}>
        {profile.desktop.work}
      </p>
      <section className={`${styles.rise} ${styles.group}`} style={delay('0.36s')}>
        <h2 className={styles.groupTitle}>{profile.build.heading}</h2>
        <p className={styles.lede} style={{ margin: 0 }}>
          {profile.build.body}
        </p>
        <ul className={styles.chips}>
          {profile.build.tools.map((t) => (
            <li key={t} className={styles.chip}>
              <SkillIcon name={t} />
              {t}
            </li>
          ))}
        </ul>
        <p className={styles.lede} style={{ margin: 0 }}>
          {profile.build.recently}{' '}
          <a
            className={styles.acc}
            href={profile.build.firstmate.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {profile.build.firstmate.label} ↗
          </a>
        </p>
      </section>
      <div className={`${styles.rise} ${styles.actions}`} style={delay('0.42s')}>
        <button type="button" className={`${styles.btn} ${styles.primary}`} onClick={onProjects}>
          Open projects
        </button>
        <button type="button" className={`${styles.btn} ${styles.secondary}`} onClick={onContact}>
          Contact me
        </button>
      </div>
    </div>
  );
}
