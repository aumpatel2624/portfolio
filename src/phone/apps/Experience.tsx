import { experience } from '../../data/experience';
import { sections } from '../../data/sections';
import styles from './Apps.module.css';

export function Experience() {
  return (
    <div className={styles.col} style={{ gap: 22 }}>
      <h1 className={`${styles.rise} ${styles.h1}`}>{sections.experience}</h1>
      <div className={styles.timeline}>
        {experience.map((e, i) => (
          <div
            key={e.title}
            className={`${styles.rise} ${styles.entry}`}
            style={{ animationDelay: `${0.08 + i * 0.1}s` }}
          >
            <span className={styles.entryDot} aria-hidden="true" />
            <div className={styles.when}>{e.when}</div>
            <h2 className={styles.entryTitle}>{e.title}</h2>
            <p className={styles.lede}>{e.place}</p>
            <ul className={styles.bullets}>
              {e.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className={styles.meta}>{e.stack}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
