import { profile } from '../../data/profile';
import styles from './Sticker.module.css';

export function Sticker() {
  return (
    <div className={styles.sticker}>
      <span className={styles.dot} />
      {profile.sticker}
    </div>
  );
}
