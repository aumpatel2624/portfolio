import { ArtImage } from './ArtImage';
import styles from './WhatsAppArt.module.css';

/** A WhatsApp order message turned into a matched order */
export function WhatsAppArt() {
  return (
    <div className={styles.art}>
      <ArtImage name="whatsapp" alt="A WhatsApp order message turned into a matched order" />
    </div>
  );
}
