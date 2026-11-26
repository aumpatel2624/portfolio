import { SkillIcon } from '../../components/SkillIcon';
import { sections } from '../../data/sections';
import { skills } from '../../data/skills';
import styles from './Apps.module.css';

export function Skills() {
  return (
    <div className={styles.skills}>
      <h1 className={`${styles.rise} ${styles.h1}`}>{sections.skills}</h1>
      {skills.map((g, i) => (
        <section
          key={g.title}
          className={`${styles.rise} ${styles.group}`}
          style={{ animationDelay: `${(0.06 + i * 0.06).toFixed(2)}s` }}
        >
          <h2 className={styles.groupTitle}>{g.title}</h2>
          {g.rows.map((row) => (
            <div key={row.level ?? g.title} className={styles.group}>
              {row.level && <p className={styles.note}>{row.level}:</p>}
              <ul className={styles.chips}>
                {row.items.map((s) => (
                  <li key={s} className={styles.chip}>
                    <SkillIcon name={s} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
