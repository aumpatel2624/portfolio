import { ArtImage } from './ArtImage';
import styles from './DocumentsArt.module.css';

/** A stack of documents on a desk beside glasses and coffee */
export function DocumentsArt() {
  return (
    <div className={styles.art}>
      <ArtImage name="documents" />
    </div>
  );
}
