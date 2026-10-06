import { SkillIcon } from '../../components/SkillIcon';
import { setup } from '../../data/setup';
import common from '../common.module.css';
import styles from './Setup.module.css';

export function Setup() {
  return (
    <div className={styles.body}>
      {setup.map((section, i) => (
        <section
          key={section.key}
          className={`${common.rise} ${styles.group}`}
          style={{ animationDelay: `${(0.05 + i * 0.07).toFixed(2)}s` }}
          aria-labelledby={`setup-${section.key}`}
        >
          <h3 id={`setup-${section.key}`} className={styles.heading}>
            {section.title}
          </h3>
          <p className={styles.summary}>{section.summary}</p>
          {section.specs && (
            <dl className={styles.specs}>
              {section.specs.map((s) => (
                <div key={s.label} className={styles.spec}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <ul className={styles.chips} aria-label={section.itemsLabel ?? section.title}>
            {section.items.map((item) => (
              <li key={item.name} className={`${common.chip} ${styles.chip}`}>
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
