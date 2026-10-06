import { phonePhotos } from '../../data/phone';
import styles from './Apps.module.css';

export function Photos() {
  return (
    <div className={styles.col}>
      <h1 className={`${styles.rise} ${styles.h1}`}>Photos</h1>
      <div className={styles.grid}>
        {phonePhotos.map((p, i) => (
          <figure
            key={p.src}
            className={`${styles.rise} ${styles.shot}`}
            style={{ animationDelay: `${0.06 + i * 0.06}s` }}
          >
            <img
              className={styles.shotImg}
              src={p.src}
              alt={p.alt}
              width={173}
              height={231}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: p.objectPosition }}
            />
            <figcaption className={styles.meta}>{p.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
