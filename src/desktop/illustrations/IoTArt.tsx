import styles from './IoTArt.module.css';

/** A board with pins, blinking LEDs and expanding signal rings. */
export function IoTArt() {
  return (
    <div className={styles.art} aria-hidden="true">
      {['0s', '0.8s', '1.6s'].map((d) => (
        <span key={d} className={styles.ping} style={{ animationDelay: d }} />
      ))}
      <div className={styles.board}>
        <span className={`${styles.pins} ${styles.left}`} />
        <span className={`${styles.pins} ${styles.right}`} />
        <span className={`${styles.pins} ${styles.top}`} />
        <span className={`${styles.pins} ${styles.bottom}`} />
        <span className={styles.name}>IoT</span>
        <div className={styles.leds}>
          <span
            style={{ background: 'var(--danger)', animation: 'ledBlink 1.2s steps(2) infinite' }}
          />
          <span
            style={{
              background: 'var(--acc)',
              animation: 'ledBlink 1.7s steps(2) infinite',
            }}
          />
          <span
            style={{ background: 'var(--text)', animation: 'ledBlink .9s steps(2) infinite' }}
          />
        </div>
      </div>
    </div>
  );
}
