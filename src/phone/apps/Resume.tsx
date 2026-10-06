import { links, resumeLabel, resumeNote } from '../../data/links';
import { PlaceholderLink } from '../../lib/PlaceholderLink';
import styles from './Apps.module.css';

const LINES = [
  { width: '100%', delay: '0s' },
  { width: '85%', delay: '0.3s' },
  { width: '92%', delay: '0.6s' },
  { width: '55%', delay: '0.9s' },
  { width: '78%', delay: '1.2s' },
];

export function Resume() {
  return (
    <div className={styles.resume}>
      <h1 className={`${styles.rise} ${styles.h1}`}>Resume</h1>
      <div
        className={`${styles.rise} ${styles.sheet}`}
        style={{ animationDelay: '0.08s' }}
        aria-hidden="true"
      >
        <div className={styles.sheetTitle} />
        {LINES.map((l) => (
          <div
            key={l.delay}
            className={styles.sheetLine}
            style={{ width: l.width, animationDelay: l.delay }}
          />
        ))}
      </div>
      <p className={`${styles.rise} ${styles.lede}`} style={{ animationDelay: '0.14s' }}>
        {resumeNote}
      </p>
      <PlaceholderLink
        href={links.resume}
        target="_blank"
        rel="noopener noreferrer"
        download
        aria-label={resumeLabel}
        className={`${styles.btn} ${styles.rise} ${styles.download}`}
        style={{ animationDelay: '0.2s' }}
      >
        Download PDF
      </PlaceholderLink>
    </div>
  );
}
