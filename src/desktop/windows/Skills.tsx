import { SkillIcon } from '../../components/SkillIcon';
import { skills } from '../../data/skills';
import common from '../common.module.css';
import styles from './Skills.module.css';

export function Skills() {
  return (
    <div className={styles.body}>
      {skills.map((group, i) => (
        <section
          key={group.title}
          className={`${common.rise} ${styles.group}`}
          style={{ animationDelay: `${0.05 + i * 0.1}s` }}
        >
          <h3 className={styles.heading}>{group.title}</h3>
          <ul className={styles.chips}>
            {group.desktop.map((s) => (
              <li key={s} className={`${common.chip} ${styles.chip}`}>
                <SkillIcon name={s} />
                {s}
              </li>
            ))}
          </ul>
          {group.note && <p className={styles.note}>{group.note}</p>}
        </section>
      ))}
    </div>
  );
}
