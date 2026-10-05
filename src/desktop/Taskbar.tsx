import { windowDefs, type WindowId } from '../data/windows';
import styles from './Taskbar.module.css';

interface Props {
  open: WindowId[];
  active: WindowId | null;
  startOpen: boolean;
  wallpaperName: string;
  time: string;
  onStart: () => void;
  onTask: (id: WindowId) => void;
  onWallpaper: () => void;
}

export function Taskbar({
  open,
  active,
  startOpen,
  wallpaperName,
  time,
  onStart,
  onTask,
  onWallpaper,
}: Props) {
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
        <button
          type="button"
          className={`${styles.tb} ${styles.wp}`}
          aria-label="Change wallpaper"
          onClick={onWallpaper}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="var(--acc)"
            strokeWidth="1.5"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="1.5" y="2.5" width="11" height="9" rx="1.5" />
            <path d="M2 10l3.2-3.4 2.4 2.4 1.8-1.8L12 10" />
          </svg>
          {wallpaperName}
        </button>
        <time className={styles.clock}>{time}</time>
      </div>
    </footer>
  );
}
