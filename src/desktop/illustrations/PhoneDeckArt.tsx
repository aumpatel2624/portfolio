import { ArtImage } from './ArtImage';
import styles from './PhoneDeckArt.module.css';

/** A phone paired with a laptop over an encrypted channel */
export function PhoneDeckArt() {
  return (
    <div className={styles.art}>
      <ArtImage name="phone-deck" alt="A phone paired with a laptop over an encrypted channel" />
    </div>
  );
}
