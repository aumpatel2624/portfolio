import { CertificateList } from '../../components/CertificateList';
import { certificatesHeading } from '../../data/certificates';
import { awards, education, languages } from '../../data/education';
import { sections } from '../../data/sections';
import styles from './Apps.module.css';

const delay = (s: string) => ({ animationDelay: s });

/** The CV's Education, Awards and Languages sections, with the certificates after Awards. */
export function Education() {
  return (
    <div className={styles.skills}>
      <h1 className={`${styles.rise} ${styles.h1}`}>{sections.education}</h1>
      {education.map((e) => (
        <div key={e.degree} className={`${styles.rise} ${styles.group}`} style={delay('0.06s')}>
          <div className={styles.when}>{e.when}</div>
          <h2 className={styles.entryTitle}>{e.degree}</h2>
          <p className={styles.lede}>{e.school}</p>
        </div>
      ))}
      <section className={`${styles.rise} ${styles.group}`} style={delay('0.12s')}>
        <h2 className={styles.groupTitle}>{sections.awards}</h2>
        <ul className={styles.bullets}>
          {awards.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>
      <section className={`${styles.rise} ${styles.group}`} style={delay('0.18s')}>
        <h2 className={styles.groupTitle}>{certificatesHeading}</h2>
        <CertificateList />
      </section>
      <section className={`${styles.rise} ${styles.group}`} style={delay('0.24s')}>
        <h2 className={styles.groupTitle}>{sections.languages}</h2>
        <ul className={styles.chips}>
          {languages.map((l) => (
            <li key={l.name} className={styles.chip}>
              {l.name}: {l.level}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
