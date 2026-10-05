import { Link } from 'react-router-dom';
import { WINDOW_IDS, windowDefs, type WindowId } from '../data/windows';
import styles from './StartMenu.module.css';

interface Props {
  onOpen: (id: WindowId) => void;
  onWallpaper: () => void;
}

export function StartMenu({ onOpen, onWallpaper }: Props) {
  return (
    <nav className={styles.menu} aria-label="Start menu">
      <div className={styles.brand}>
        aum<span className={styles.dot}>.</span>
      </div>
      {WINDOW_IDS.map((id) => (
        <button key={id} type="button" className={styles.mi} onClick={() => onOpen(id)}>
          {windowDefs[id].title}
        </button>
      ))}
      <button type="button" className={`${styles.mi} ${styles.accent}`} onClick={onWallpaper}>
        change wallpaper
      </button>
      <div className={styles.rule} />
      <Link to="/classic" className={`${styles.mi} ${styles.accent}`}>
        Classic site →
      </Link>
    </nav>
  );
}
