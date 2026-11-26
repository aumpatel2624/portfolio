import { ResumeViewer } from '../../components/ResumeViewer';
import styles from './Apps.module.css';

export function Resume() {
  return (
    <div className={styles.col}>
      <h1 className={`${styles.rise} ${styles.h1}`}>Resume</h1>
      <ResumeViewer />
    </div>
  );
}
