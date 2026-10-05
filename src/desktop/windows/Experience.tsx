import { experience } from '../../data/experience';
import common from '../common.module.css';
import styles from './Experience.module.css';

const ENTRY_DELAYS = ['0.05s', '0.15s', '0.25s'];
const DOT_DELAYS = ['0s', '0.4s'];

export function Experience() {
  return (
    <div className={styles.body}>
      <div className={styles.rail} aria-hidden="true" />
      {experience.map((e, i) => {
        const first = i === 0;
        const last = i === experience.length - 1;
        return (
          <div
            key={e.title}
            className={`${common.rise} ${styles.entry} ${first ? styles.first : last ? styles.last : styles.mid}`}
            style={{ animationDelay: ENTRY_DELAYS[i] }}
          >
            <span
              className={`${styles.dot} ${first ? styles.dotFirst : ''} ${e.current ? styles.dotLive : styles.dotPast}`}
              style={e.current ? { animationDelay: DOT_DELAYS[i] } : undefined}
              aria-hidden="true"
            />
            <div className={styles.when}>{e.when}</div>
            <h3 className={styles.title}>{e.title}</h3>
            <p className={common.lede}>{e.desktop}</p>
          </div>
        );
      })}
    </div>
  );
}
