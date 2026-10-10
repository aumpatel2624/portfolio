import { ArtImage } from './ArtImage';
import styles from './IoTArt.module.css';

/** An IoT development board with sensors and wiring */
export function IoTArt() {
  return (
    <div className={styles.art}>
      <ArtImage name="iot" alt="An IoT development board with sensors and wiring" />
    </div>
  );
}
