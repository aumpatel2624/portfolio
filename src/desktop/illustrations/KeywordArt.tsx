import styles from './KeywordArt.module.css';

/** Generic sample words and bar lengths. An illustration of a ranked list, not real output. */
const ROWS = [
  { word: 'sample keyword one', score: 92 },
  { word: 'sample keyword two', score: 74 },
  { word: 'sample keyword three', score: 58 },
  { word: 'sample keyword four', score: 41 },
];

/** A small ranked keyword list with score bars. */
export function KeywordArt() {
  return (
    <div className={`${styles.art}`} aria-hidden="true">
      <div className={styles.panel}>
        <span className={styles.caption}>illustration · sample words</span>
        {ROWS.map((r, i) => (
          <div key={r.word} className={`${styles.row} ${i === 0 ? styles.top : ''}`}>
            <span className={styles.word}>{r.word}</span>
            <span className={styles.track}>
              <span
                className={styles.bar}
                style={{ width: `${r.score}%`, animationDelay: `${i * 0.2}s` }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
