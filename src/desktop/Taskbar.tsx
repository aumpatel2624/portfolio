import { windowDefs, type WindowId } from '../data/windows';
import styles from './Taskbar.module.css';

interface Props {
  open: WindowId[];
  active: WindowId | null;
  startOpen: boolean;
  time: string;
  onStart: () => void;
  onTask: (id: WindowId) => void;
}

export function Taskbar({ open, active, startOpen, time, onStart, onTask }: Props) {
  return (
    <footer className={styles.bar}>
      <div className={styles.left}>
        <button
          type="button"
          className={styles.start}
          aria-label="Start menu"
          aria-haspopup="menu"
          aria-expanded={startOpen}
          onClick={onStart}
        >
          aum.
        </button>
        {open.map((id) => (
          <button
            key={id}
            type="button"
            className={`${styles.tb} ${active === id ? styles.active : ''}`}
            aria-pressed={active === id}
            onClick={() => onTask(id)}
          >
            {windowDefs[id].title}
          </button>
        ))}
      </div>
      <div className={styles.right}>
        <time className={styles.clock}>{time}</time>
      </div>
    </footer>
  );
}
