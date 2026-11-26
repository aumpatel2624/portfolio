import { ResumeViewer } from '../../components/ResumeViewer';
import common from '../common.module.css';
import styles from './Resume.module.css';

export function Resume() {
  return (
    <div className={styles.body}>
      <h2 className={`${common.rise} ${styles.title}`}>Resume</h2>
      <ResumeViewer />
    </div>
  );
}
