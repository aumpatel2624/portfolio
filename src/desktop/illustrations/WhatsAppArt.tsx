import styles from './WhatsAppArt.module.css';

/** Free-text chat messages turning into matched order fields. */
export function WhatsAppArt() {
  return (
    <div className={styles.art} aria-hidden="true">
      <div className={styles.messages}>
        <div className={styles.bubble}>2 kg rice and 1 oil please</div>
        <div className={styles.bubble} style={{ animationDelay: '1s' }}>
          deliver on friday
        </div>
      </div>
      <span className={styles.arrow}>→</span>
      <div className={styles.chips}>
        <span className={styles.chip} style={{ animationDelay: '2s' }}>
          2 items matched
        </span>
        <span className={styles.chip} style={{ animationDelay: '2.5s' }}>
          delivery: friday
        </span>
      </div>
      <span className={styles.caption}>illustration</span>
    </div>
  );
}
