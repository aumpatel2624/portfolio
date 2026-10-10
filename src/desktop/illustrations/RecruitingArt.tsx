import { ArtImage } from './ArtImage';
import styles from './RecruitingArt.module.css';

/** A resume being parsed into structured candidate data */
export function RecruitingArt() {
  return (
    <div className={styles.art}>
      <ArtImage name="recruiting" alt="A resume being parsed into structured candidate data" />
    </div>
  );
}
