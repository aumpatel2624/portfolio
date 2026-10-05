import styles from './F1Art.module.css';

/** A car circling a dashed oval track. */
export function F1Art() {
  return (
    <div className={styles.art} aria-hidden="true">
      <div className={styles.track}>
        <svg className={styles.ring} width="280" height="110" viewBox="0 0 280 110" fill="none">
          <ellipse cx="140" cy="55" rx="120" ry="42" stroke="#54413A" strokeWidth="12" />
        </svg>
        <svg className={styles.ring} width="280" height="110" viewBox="0 0 280 110" fill="none">
          <ellipse
            cx="140"
            cy="55"
            rx="120"
            ry="42"
            stroke="var(--acc, #ffb020)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        </svg>
        <div className={styles.car} />
      </div>
      <span className={styles.label}>formula 1</span>
      <div className={styles.lights}>
        <span style={{ background: '#E5604D' }} />
        <span style={{ background: '#FFD27A' }} />
        <span style={{ background: '#F6ECDC' }} />
      </div>
    </div>
  );
}
