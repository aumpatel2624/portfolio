import { experience } from '../../data/experience';
import styles from './Apps.module.css';

export function Experience() {
  return (
    <div className={styles.col} style={{ gap: 22 }}>
      <h1 className={`${styles.rise} ${styles.h1}`}>Experience</h1>
      <div className={styles.timeline}>
        {experience.map((e, i) => (
          <div
            key={e.title}
            className={`${styles.rise} ${styles.entry}`}
            style={{ animationDelay: `${0.08 + i * 0.1}s` }}
          >
            <span
              className={`${styles.entryDot} ${e.current ? '' : styles.entryDotPast}`}
              aria-hidden="true"
            />
            <div className={styles.when}>{e.when}</div>
            <h2 className={styles.entryTitle}>{e.title}</h2>
            <p className={styles.lede}>{e.desktop}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
