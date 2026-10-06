import { AsciiDivider } from '../../ascii/AsciiDivider';
import { links, resumeLabel, resumeNote } from '../../data/links';
import { PlaceholderLink } from '../../lib/PlaceholderLink';
import common from '../common.module.css';
import styles from './Resume.module.css';

const SHIMMER = [
  { width: '100%', delay: '0s' },
  { width: '85%', delay: '0.3s' },
  { width: '92%', delay: '0.6s' },
  { width: '55%', delay: '0.9s' },
];

export function Resume() {
  return (
    <div className={styles.body}>
      <div className={`${common.rise} ${styles.sheet}`} aria-hidden="true">
        <div className={styles.title} />
        {SHIMMER.map((l) => (
          <div
            key={l.delay}
            className={styles.line}
            style={{ width: l.width, animationDelay: l.delay }}
          />
        ))}
      </div>
      <div className={styles.text}>
        <h2 className={`${common.rise} ${common.h2Sm}`} style={{ animationDelay: '0.08s' }}>
          Resume
        </h2>
        <p className={`${common.rise} ${common.lede}`} style={{ animationDelay: '0.14s' }}>
          {resumeNote}
        </p>
        <AsciiDivider pattern="[=]" className={styles.rule} />
        <PlaceholderLink
          href={links.resume}
          target="_blank"
          rel="noopener noreferrer"
          download
          aria-label={resumeLabel}
          className={`${common.btn} ${common.rise} ${styles.download}`}
          style={{ animationDelay: '0.2s' }}
        >
          Download PDF
        </PlaceholderLink>
      </div>
    </div>
  );
}
