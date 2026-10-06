import { SkillIcon } from '../../components/SkillIcon';
import { setup } from '../../data/setup';
import styles from './Apps.module.css';

export function Setup() {
  return (
    <div className={styles.skills}>
      <h1 className={`${styles.rise} ${styles.h1}`}>Setup</h1>
      {setup.map((s, i) => (
        <section
          key={s.key}
          className={`${styles.rise} ${styles.group}`}
          style={{ animationDelay: `${(0.06 + i * 0.06).toFixed(2)}s` }}
          aria-labelledby={`setup-${s.key}`}
        >
          <h2 id={`setup-${s.key}`} className={styles.groupTitle}>
            {s.title}
          </h2>
          <p className={styles.setupText}>{s.summary}</p>
          {s.specs && (
            <dl className={styles.specs}>
              {s.specs.map((row) => (
                <div key={row.label} className={styles.spec}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <ul className={styles.chips} aria-label={s.itemsLabel ?? s.title}>
            {s.items.map((item) => (
              <li key={item.name} className={styles.chip}>
                <SkillIcon name={item.name} />
                {item.name}
                {item.planned && <span className={styles.planned}>planned</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
