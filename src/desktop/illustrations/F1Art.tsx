import { ArtImage } from './ArtImage';
import styles from './F1Art.module.css';

/** A Formula 1 car on track */
export function F1Art() {
  return (
    <div className={styles.art}>
      <ArtImage name="f1" alt="A Formula 1 car on track" />
    </div>
  );
}
