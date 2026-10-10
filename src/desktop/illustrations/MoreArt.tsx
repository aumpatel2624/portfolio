import { ArtImage } from './ArtImage';
import styles from './MoreArt.module.css';

/** Laptop showing internal business tools and dashboards */
export function MoreArt() {
  return (
    <div className={styles.art}>
      <ArtImage name="more" alt="Laptop showing internal business tools and dashboards" />
    </div>
  );
}
