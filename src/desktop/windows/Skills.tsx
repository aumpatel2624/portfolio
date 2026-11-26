import { SkillIcon } from '../../components/SkillIcon';
import { sections } from '../../data/sections';
import { skills } from '../../data/skills';
import common from '../common.module.css';
import styles from './Skills.module.css';

export function Skills() {
  return (
    <div className={styles.body}>
      <h2 className={styles.title}>{sections.skills}</h2>
      {skills.map((group, i) => (
        <section
          key={group.title}
          className={`${common.rise} ${styles.group}`}
          style={{ animationDelay: `${(0.05 + i * 0.06).toFixed(2)}s` }}
        >
          <h3 className={styles.heading}>{group.title}</h3>
          {group.rows.map((row) => (
            <div key={row.level ?? group.title} className={styles.row}>
              {row.level && <p className={styles.note}>{row.level}:</p>}
              <ul className={styles.chips}>
                {row.items.map((s) => (
                  <li key={s} className={`${common.chip} ${styles.chip}`}>
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
