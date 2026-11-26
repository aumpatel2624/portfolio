import { awards, education, languages } from '../../data/education';
import { sections } from '../../data/sections';
import common from '../common.module.css';
import styles from './Education.module.css';

/** The CV's Education, Awards and Languages sections. */
export function Education() {
  return (
    <div className={styles.body}>
      <section className={`${common.rise} ${styles.group}`} style={{ animationDelay: '0.05s' }}>
        <h2 className={styles.heading}>{sections.education}</h2>
        {education.map((e) => (
          <div key={e.degree} className={styles.entry}>
            <div className={styles.when}>{e.when}</div>
            <h3 className={styles.title}>{e.degree}</h3>
            <p className={common.lede}>{e.school}</p>
          </div>
        ))}
      </section>
      <section className={`${common.rise} ${styles.group}`} style={{ animationDelay: '0.12s' }}>
        <h2 className={styles.heading}>{sections.awards}</h2>
        <ul className={common.bullets}>
          {awards.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>
      <section className={`${common.rise} ${styles.group}`} style={{ animationDelay: '0.19s' }}>
        <h2 className={styles.heading}>{sections.languages}</h2>
        <ul className={styles.chips}>
          {languages.map((l) => (
            <li key={l.name} className={`${common.chip} ${styles.chip}`}>
              {l.name}: {l.level}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
