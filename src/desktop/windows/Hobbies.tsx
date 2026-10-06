import { hobbies, type HobbyKey } from '../../data/hobbies';
import { BooksArt } from '../illustrations/BooksArt';
import { F1Art } from '../illustrations/F1Art';
import { IoTArt } from '../illustrations/IoTArt';
import common from '../common.module.css';
import styles from './Hobbies.module.css';

interface Props {
  selected: HobbyKey;
  onSelect: (key: HobbyKey) => void;
}

const ART: Record<HobbyKey, () => JSX.Element> = { f1: F1Art, iot: IoTArt, books: BooksArt };

export function Hobbies({ selected, onSelect }: Props) {
  const current = hobbies.find((h) => h.key === selected) ?? hobbies[0];
  const Art = current ? ART[current.key] : null;
  return (
    <div className={styles.body}>
      <div className={styles.list} role="group" aria-label="Hobbies">
        {hobbies.map((h) => {
          const sel = h.key === selected;
          return (
            <button
              key={h.key}
              type="button"
              className={`${common.plist} ${styles.item}`}
              aria-pressed={sel}
              onClick={() => onSelect(h.key)}
              style={{
                background: sel ? 'var(--surface-2)' : 'transparent',
                borderLeftColor: sel ? 'var(--acc)' : 'transparent',
              }}
            >
              <span className={styles.label}>{h.label}</span>
              <span className={styles.sub}>{h.sub}</span>
            </button>
          );
        })}
      </div>
      <div className={styles.pane}>
        {current && Art && (
          <div className={common.detail}>
            <Art />
            <h2 className={`${common.rise} ${common.h2}`} style={{ animationDelay: '0.08s' }}>
              {current.title}
            </h2>
            <p className={`${common.rise} ${common.lede}`} style={{ animationDelay: '0.14s' }}>
              {current.intro}
            </p>
            <ul className={`${common.rise} ${common.bullets}`} style={{ animationDelay: '0.2s' }}>
              {current.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            {current.link && (
              <a
                className={`${common.rise} ${common.link}`}
                href={current.link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ animationDelay: '0.26s' }}
              >
                {current.link.label}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
