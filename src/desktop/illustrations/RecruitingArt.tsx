import styles from './RecruitingArt.module.css';

const DOC_LINES = [100, 88, 94, 60, 90, 72];
const CHIPS = [
  { text: '"name": "…"', delay: '0s' },
  { text: '"skills": [ … ]', delay: '0.5s' },
  { text: '"experience": …', delay: '1s' },
];

/** A resume being scanned and parsed into JSON fields. */
export function RecruitingArt() {
  return (
    <div className={styles.art} aria-hidden="true">
      <div className={styles.doc}>
        <div className={styles.title} />
        {DOC_LINES.map((w, i) => (
          <div key={i} className={styles.line} style={{ width: `${w}%` }} />
        ))}
        <span className={styles.scan} />
      </div>
      <div className={styles.arrow}>
        <span className={styles.gemini}>Gemini</span>
        <span className={styles.arrowGlyph}>→</span>
      </div>
      <div className={styles.chips}>
        {CHIPS.map((c) => (
          <span key={c.text} className={styles.chip} style={{ animationDelay: c.delay }}>
            {c.text}
          </span>
        ))}
      </div>
    </div>
  );
}
