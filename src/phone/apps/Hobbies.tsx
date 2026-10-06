import { hobbies, type HobbyKey } from '../../data/hobbies';
import { AiArt, RunningArt, SportsArt } from '../../desktop/illustrations/HobbyArt';
import { BooksArt, F1Art, IotArt } from './Art';
import artStyles from './Art.module.css';
import styles from './Apps.module.css';

const ART: Record<HobbyKey, () => JSX.Element> = {
  f1: F1Art,
  books: BooksArt,
  running: () => <RunningArt className={artStyles.art} />,
  ai: () => <AiArt className={artStyles.art} />,
  sports: () => <SportsArt className={artStyles.art} />,
  iot: IotArt,
};
const delay = (s: string) => ({ animationDelay: s });

export function Hobbies({
  selected,
  onSelect,
}: {
  selected: HobbyKey;
  onSelect: (key: HobbyKey) => void;
}) {
  const current = hobbies.find((h) => h.key === selected) ?? hobbies[0];
  const Art = current ? ART[current.key] : null;
  return (
    <div className={styles.col}>
      <h1 className={`${styles.rise} ${styles.h1}`}>Hobbies</h1>
      <div
        className={`${styles.rise} ${styles.segs}`}
        style={delay('0.06s')}
        role="group"
        aria-label="Hobbies"
      >
        {hobbies.map((h) => (
          <button
            key={h.key}
            type="button"
            className={`${styles.seg} ${h.key === selected ? styles.segOn : ''}`}
            aria-pressed={h.key === selected}
            onClick={() => onSelect(h.key)}
          >
            {h.label}
          </button>
        ))}
      </div>
      {current && Art && (
        <div className={styles.detail} key={current.key}>
          <Art />
          <h2 className={`${styles.rise} ${styles.h2}`} style={delay('0.08s')}>
            {current.title}
          </h2>
          {current.intro && (
            <p className={`${styles.rise} ${styles.lede}`} style={delay('0.14s')}>
              {current.intro}
            </p>
          )}
          {current.bullets.length > 0 && (
            <ul className={`${styles.rise} ${styles.bullets}`} style={delay('0.2s')}>
              {current.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          {current.link && (
            <a
              className={`${styles.rise} ${styles.link}`}
              style={delay('0.26s')}
              href={current.link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {current.link.label}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
