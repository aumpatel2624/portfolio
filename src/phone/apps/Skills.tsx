import { skills } from '../../data/skills';
import styles from './Apps.module.css';

export function Skills() {
  return (
    <div className={styles.skills}>
      <h1 className={`${styles.rise} ${styles.h1}`}>Skills</h1>
      {skills.map((g, i) => (
        <section
          key={g.title}
          className={`${styles.rise} ${styles.group}`}
          style={{ animationDelay: `${0.06 + i * 0.08}s` }}
        >
          <h2 className={styles.groupTitle}>{g.title}</h2>
          <ul className={styles.chips}>
            {g.desktop.map((s) => (
              <li key={s} className={styles.chip}>
                {s}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
