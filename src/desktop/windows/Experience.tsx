import { experience } from '../../data/experience';
import { sections } from '../../data/sections';
import common from '../common.module.css';
import styles from './Experience.module.css';

const ENTRY_DELAYS = ['0.05s', '0.15s'];
const DOT_DELAYS = ['0s', '0.4s'];

export function Experience() {
  return (
    <div className={styles.body}>
      <h2 className={styles.heading}>{sections.experience}</h2>
      <div className={styles.list}>
        <div className={styles.rail} aria-hidden="true" />
        {experience.map((e, i) => (
          <div
            key={e.title}
            className={`${common.rise} ${styles.entry}`}
            style={{ animationDelay: ENTRY_DELAYS[i] }}
          >
            <span
              className={styles.dot}
              style={{ animationDelay: DOT_DELAYS[i] }}
              aria-hidden="true"
            />
            <div className={styles.when}>{e.when}</div>
            <h3 className={styles.title}>{e.title}</h3>
            <p className={common.lede}>{e.place}</p>
            <ul className={common.bullets}>
              {e.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className={common.stack}>{e.stack}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
