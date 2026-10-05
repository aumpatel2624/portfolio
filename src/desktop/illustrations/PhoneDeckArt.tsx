import styles from './PhoneDeckArt.module.css';

const TILE_DELAYS = ['0s', '0.4s', '0.8s', '1.2s'];
const PACKET_DELAYS = ['0s', '0.8s', '1.6s'];

/** Phone ↔ encrypted channel ↔ laptop "Allow" prompt. */
export function PhoneDeckArt() {
  return (
    <div className={styles.art} aria-hidden="true">
      <div className={styles.phone}>
        {TILE_DELAYS.map((d) => (
          <div key={d} className={styles.tile} style={{ animationDelay: d }} />
        ))}
      </div>
      <div className={styles.channel}>
        <span className={styles.channelLabel}>noise ik · encrypted</span>
        {PACKET_DELAYS.map((d) => (
          <span key={d} className={styles.packet} style={{ animationDelay: d }} />
        ))}
      </div>
      <div className={styles.laptop}>
        <div className={styles.screen}>
          <div className={styles.line} style={{ width: '70%' }} />
          <div className={styles.line} style={{ width: '45%' }} />
          <div className={styles.allow}>Allow</div>
        </div>
        <div className={styles.base} />
      </div>
    </div>
  );
}
