import { skills } from '../../data/skills';
import common from '../common.module.css';
import styles from './Skills.module.css';

const DELAYS = ['0.05s', '0.15s', '0.25s', '0.35s'];

export function Skills() {
  return (
    <div className={styles.body}>
      {skills.map((group, i) => (
        <section
          key={group.title}
          className={`${common.rise} ${styles.group}`}
          style={{ animationDelay: DELAYS[i] }}
        >
          <h3 className={styles.heading}>{group.title}</h3>
          <ul className={styles.chips}>
            {group.desktop.map((s) => (
              <li key={s} className={`${common.chip} ${styles.chip}`}>
                {s}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
