import { aumWordmark, fullAscii } from '../ascii/art.generated';
import { AsciiArt } from '../ascii/AsciiArt';
import { AsciiWordmark } from '../ascii/AsciiWordmark';
import styles from './BootScreen.module.css';

/**
 * Boot splash: an ASCII wordmark over a dim ASCII portrait, a progress bar and the status line.
 * Fades itself out through CSS (bootOut at 1.95s); the Desktop unmounts it at 2.5s.
 */
export function BootScreen() {
  return (
    <div className={styles.boot} role="status" aria-label="Starting portfolio.exe">
      <AsciiArt art={fullAscii} size="lg" className={styles.backdrop} />
      <AsciiWordmark
        mark={aumWordmark}
        accentFrom={aumWordmark.accentFrom}
        label="aum."
        className={styles.logo}
      />
      <div className={styles.track} aria-hidden="true">
        <div className={styles.fill} />
      </div>
      <div className={styles.status} aria-hidden="true">
        starting portfolio.exe<span className={styles.caret}>_</span>
      </div>
    </div>
  );
}
